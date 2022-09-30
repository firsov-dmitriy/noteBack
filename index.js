const express = require("express");
require("dotenv").config();
const noteRouter = require("./routes/note.routes");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", noteRouter);
app.use("/", app.response.send("App work"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
