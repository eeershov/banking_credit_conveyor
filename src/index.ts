import express from "express";
import conveyorRoutes from './routes/conveyorRoutes.js';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Banking credit conveyor MVP1');
});


app.use('/conveyor', conveyorRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

