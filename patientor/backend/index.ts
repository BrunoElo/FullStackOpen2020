import express = require("express");

const app = express();

app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.json("hey");
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
