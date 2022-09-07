"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.use(express.json());
app.get("/ping", (_req, res) => {
    res.json("hey");
});
const PORT = 3004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
