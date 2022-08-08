const mongoose = require("mongoose");
const mongoEndpoint = "mongodb://localhost/";
const dbName = "categories";

mongoose
  .connect(mongoEndpoint + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to the ${dbName} db`))
  .catch((err) => console.log("ERROR IN CONNECTION TO DB ", err));
