import express from 'express';
import Debug from 'debug';
import dotenv from 'dotenv';
import cors from 'cors';
import route from './routes/UserRoute';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/api/v1', route);

dotenv.config();

const debug = Debug('http');
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  debug(`Server is running on PORT ${PORT}`);
});

export default server;
