const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();

// Import Middlewares
const userRouter = require("./routes/user");
const logger = require("./middlewares/logger");

// Setup database connection
require("./config/database");

// Global Middlewares
app.use(express.json());
app.use(logger);

// Routes
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
