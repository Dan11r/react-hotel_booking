const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');
const dotenv = require('dotenv');
const initDatabase = require('./start/initDatabase');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = config.get('port') ?? 8080;

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase();
    });
    await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.green('MongoDB connected.'));
    app.listen(PORT, () => console.log(chalk.green(`Server has been started on port ${PORT}...`)));
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start();