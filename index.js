const express = require("express");
const noteRouter = require("../server/routes/note.routes");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use("/", noteRouter);

// app.use(cors({}));
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
