const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");

const { PORT } = process.env;
const app = express();
const routerCards = require("./routes/cards");
const routerUsers = require("./routes/users");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/aroundb");

app.use(requestLogger);
app.use(routerCards);
app.use(routerUsers);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Escuchando por el puerto ${PORT}`);
});
