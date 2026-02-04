import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'shrinkwrap-api' });
});

app.listen(PORT, () => {
  console.log(`ShrinkWrap API listening on http://localhost:${PORT}`);
});
