const mongoose = require("mongoose");
require("dotenv").config();

const URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@dev-aws-api-shard-00-00.8pti2.mongodb.net:27017,dev-aws-api-shard-00-01.8pti2.mongodb.net:27017,dev-aws-api-shard-00-02.8pti2.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-bjrkdf-shard-0&authSource=admin&retryWrites=true&w=majority`;

// const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_NAME}.8pti2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((err) => {
    console.log(`database_connection_failed: ${err}`);
  });

const db = mongoose.connection;

db.on("open", () => {
  console.log("we're connected!");
});
