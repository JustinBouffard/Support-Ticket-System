const express = require("express");
const connectDB = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = 3000;

connectDB();

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

const ticketRoutes = require("./routes/tickets.routes");
app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.send("Ticketing API is running");
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// Start the server only after connecting to the database
(async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("Failed to start the server: ", e.message);
  }
})();
