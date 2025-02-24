import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.listen(4004, () => {
  console.log("Listening on http://localhost:4004");
});
