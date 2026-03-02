const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

const ticketRoutes = require("./routes/tickets.routes");
app.use("/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.send("Ticketing API is running");
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
