const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

// GET /api/tickets
router.get("/", async (req, res) => {
  try {
    const { level, limit } = req.query;
    const allowedLevels = [1, 2, 3, 4];

    if (!limit) {
      return res.status(400).json({
        error: "Query parameter 'limit' is required",
      });
    }

    const parsedLimit = parseInt(limit);
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      return res.status(400).json({
        error: "Invalid limit parameter. Please provide a positive integer.",
      });
    }

    // Query to filter tickets by level
    let query = {};
    if (level) {
      const parsedLevel = parseInt(level);
      if (!allowedLevels.includes(parsedLevel)) {
        return res.status(400).json({
          error:
            "Invalid level parameter. Please provide a valid level (1, 2, 3, 4)",
        });
      }
      query.level = parsedLevel;
    }

    const tickets = await Ticket.find(query).limit(parsedLimit);
    res.json(tickets);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

// GET /api/tickets/:id
router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket was not found." });
    }
    res.json(ticket);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

// POST /api/tickets
router.post("/", async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create ticket: " + error.message });
  }
});

// PUT /api/tickets/:id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update ticket: " + error.message });
  }
});

// DELETE /api/tickets/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Ticket.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete ticket: " + error.message });
  }
});

module.exports = router;
