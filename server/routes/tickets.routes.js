const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const authMiddleware = require("../middleware/auth");

router.use(authMiddleware);

// GET /api/tickets
router.get("/", async (req, res) => {
  try {
    let query = {};
    const { level, limit } = req.query;
    const allowedLevels = [1, 2, 3, 4];

    if (req.user.role !== "admin") {
      query.owner = req.user.userId;
    }

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
    // Authorization: non-admin users can only access their own tickets
    if (
      req.user.role !== "admin" &&
      ticket.owner.toString() !== req.user.userId
    ) {
      return res.status(403).json({ error: "Forbidden" });
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
    const ticket = await Ticket.create({
      ...req.body,
      owner: req.user.userId,
    });
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
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ error: "Not found" });

    if (
      req.user.role !== "admin" &&
      (!ticket.owner || ticket.owner.toString() !== req.user.userId)
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }

    Object.assign(ticket, req.body);
    await ticket.save();

    res.json(ticket);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update ticket: " + error.message });
  }
});

// DELETE /api/tickets/:id
router.delete("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ error: "Not found" });

    if (
      req.user.role !== "admin" &&
      (!ticket.owner || ticket.owner.toString() !== req.user.userId)
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }
    await ticket.deleteOne();
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete ticket: " + error.message });
  }
});

module.exports = router;
