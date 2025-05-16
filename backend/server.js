const express = require("express");
const connectDB = require("./db"); // adjust path as needed

const app = express();
connectDB();

// other middleware/routes
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
