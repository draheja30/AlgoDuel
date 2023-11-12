import express, { json } from 'express';
import { auth } from 'express-openid-connect';
import morgan from 'morgan';
import cors from 'cors';
import { python, node } from 'compile-run';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Auth0 configuration
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3001',
    clientID: 'ifjd3TisWmTqtYxof5wyQqg2LwkGTlHs',
    issuerBaseURL: 'https://dev-040rb7jgqzzejfj7.us.auth0.com'
    };
// Auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Modified root route
app.get('/', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    // Redirect to the specified URL upon successful login
    res.redirect('http://localhost:5173');
  } else {
    // User not authenticated, show logged out message
    res.sendFile(join(__dirname, 'Home.html'));
  }
});

app.use(json()); // For parsing application/json
app.use(morgan('dev'));
app.use(cors());

// Endpoint to run code
app.post('/run-code', async (req, res) => {
    const { language, code } = req.body;

    try {
        let result;
        if (language === 'Python') {
            result = await python.runSource(code);
        } else if (language === 'Javascript') {
            result = await node.runSource(code);
        } else {
            return res.status(400).send({ error: 'Unsupported language' });
        }

        return res.send(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: 'Error executing code' });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
