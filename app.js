// src/app.js
require("dotenv").config();
const express = require('express');
const authRoutes = require('./routes/AuthRoutes');
const postRoutes = require('./routes/PostRoutes');
const app = express();
const port = 3000

app.use(express.json());  // For parsing application/json
app.use('/api', authRoutes);
app.use('/api', postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
