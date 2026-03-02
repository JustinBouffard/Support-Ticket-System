const express = require("express");
const router = express.Router();

const tickets = require("../data/tickets.data");

// GET /tickets
router.get("/", (req, res) => {
  let results = [...tickets];
  const { level, limit } = req.query;
  const allowedLevels = [1, 2, 3, 4];

  if (!limit) {
    return res.status(400).json({
      error: "Query parameter 'limit' is required",
    });
  }

  if (level) {
    parsedLevel = parseInt(level);
    if (!allowedLevels.includes(parsedLevel)) {
      return res
        .status(400)
        .json({ error: "Invalid level parameter. Allowed values: 1, 2, 3, 4" });
    }
    results = results.filter((t) => t.level === parsedLevel);
  }

  const parsedLimit = parseInt(limit);
  if (!isNaN(parsedLimit) && parsedLimit > 0) {
    results = results.slice(0, parsedLimit);
  } else {
    return res.status(400).json({
      error: "Invalid limit parameter. Must be a positive integer.",
    });
  }

  results = results.slice(0, parsedLimit);

  res.json(results);
});

// GET /tickets/assignees
router.get("/assignees", (req, res) => {
  const assigneesMap = new Map();

  tickets.forEach((ticket) => {
    const assignee = ticket.assignee;

    if (!assignee) return;

    if (!assigneesMap.has(assignee.id)) {
      assigneesMap.set(assignee.id, {
        id: assignee.id,
        name: assignee.name,
        avatarUrl: assignee.avatarUrl,
        ticketCount: 1,
      });
    } else {
      assigneesMap.get(assignee.id).ticketCount++;
    }
  });

  const results = Array.from(assigneesMap.values());
  res.json(results);
});

// GET /tickets/:id
// router.get("/:id", (req, res) => {
//   const ticket = tickets.find((t) => t.id === parseInt(req.params.id));

//   if (!ticket) {
//     return res.status(404).json({ error: "Ticket not found" });
//   }

//   res.json(ticket);
// });

// POST /tickets
// router.post("/", (req, res) => {
//   const { title } = req.body;

//   if (!title) {
//     return res.status(400).json({ error: "Title is required" });
//   }

//   const newTicket = {
//     id: tickets.length + 1,
//     title,
//   };

//   tickets.push(newTicket);

//   res.status(201).json(newTicket);
// });

module.exports = router;
