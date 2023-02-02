import express from "express";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

import conveyorRoutes from './routes/conveyorRoutes.js';

app.use('/conveyor', conveyorRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})


// POST: /conveyor/offers - расчёт возможных условий кредита. Request - LoanApplicationRequestDTO, response - List<LoanOfferDTO>
// POST: /conveyor/calculation - валидация присланных данных + скоринг данных + полный расчет параметров кредита. Request - ScoringDataDTO, response CreditDTO.