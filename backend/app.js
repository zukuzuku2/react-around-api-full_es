const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const { PORT } = process.env;
const app = express();
const routerCards = require("./routes/cards");
const routerUsers = require("./routes/users");

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/aroundb");

app.use(routerCards);
app.use(routerUsers);

app.listen(PORT, () => {
  console.log(`Escuchando por el puerto ${PORT}`);
});
