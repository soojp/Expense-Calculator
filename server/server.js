require("./config/mongoose.config");
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socket = require("socket.io");
const Category = require("./models/category.model");

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

require("./routes/category.routes")(app);
require("./routes/user.routes")(app);

const server = app.listen(PORT, () => console.log(`Server is up on ${PORT}`));

const io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("deleteCategory", (payload) => {
    Category.deleteOne({ _id: payload })
      .then((category) => {
        console.log("deleted --- " + JSON.stringify(category, null, 2));
        io.emit("categoryDeleted", category);
      })
      .catch((err) => console.log("err", err));
  });
  socket.on("disconnect", () => {
    console.log(`USER: left`);
  });
});
