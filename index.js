const express = require("express");
require("dotenv").config();
const noteRouter = require("./routes/note.routes");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use("/", noteRouter);

console.log(process.env.POSTGRES_HOST);
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
