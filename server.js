import express, { json } from 'express';
import { python, node} from 'compile-run';
import morgan from 'morgan';
import cors from 'cors';

import { auth } from 'express-openid-connect';

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:5173',
  clientID: 'zFg49KoSJoGr4DT3pv2On93a9KTCD2oI',
  issuerBaseURL: 'https://dev-040rb7jgqzzejfj7.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});




app.use(json()); // For parsing application/json

app.use(morgan('dev'));
app.use(cors());

app.post('/run-code', async (req, res) => {
    const { language, code } = req.body;

    try {
        let result;
        if (language === 'Python') {
            result = await python.runSource(code);
            console.log(code);
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
