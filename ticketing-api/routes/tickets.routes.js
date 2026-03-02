const express = require("express");
const router = express.Router();

// Sample in-memory tickets
let tickets = [
  { id: 1, title: "Login issue" },
  { id: 2, title: "Payment not working" },
];

// GET /tickets
router.get("/", (req, res) => {
  res.json(tickets);
});

// GET /tickets/:id
router.get("/:id", (req, res) => {
  const ticket = tickets.find((t) => t.id === parseInt(req.params.id));

  if (!ticket) {
    return res.status(404).json({ error: "Ticket not found" });
  }

  res.json(ticket);
});

// POST /tickets
router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTicket = {
    id: tickets.length + 1,
    title,
  };

  tickets.push(newTicket);

  res.status(201).json(newTicket);
});

module.exports = router;
