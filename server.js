import express, { json } from 'express';
import { python, node} from 'compile-run';
import morgan from 'morgan';
import cors from 'cors';
const app = express();

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

        return res.send(result.stdout);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: 'Error executing code' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
