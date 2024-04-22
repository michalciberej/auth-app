import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.set('views', 'src/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.send('Homepage');
});

app.listen(3000, () => console.log('Server is running on port 3000'));
