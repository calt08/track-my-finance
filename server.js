const express = require("express");

const PORT = 3000;
const app = express();

// Import Middlewares
const router = require("./routes/router");
const logger = require("./middlewares/logger");

// Setup database connection
require("./config/database");

// Global Middlewares
app.use(express.json());
app.use(logger);

// Routes
app.use("", router);

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});
