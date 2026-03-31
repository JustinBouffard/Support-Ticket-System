import { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import TicketColumn from "../components/TicketColumn";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("all");

  const handleFilterClick = (level) => {
    setSelectedLevel(level);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        let url = "http://localhost:3000/api/tickets?limit=100";

        if (selectedLevel !== "all") {
          url += `&level=${selectedLevel}`;
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }

        const data = await response.json();

        const mappedTickets = data.map((ticket) => ({
          id: ticket._id,
          title: ticket.subject,
          level: ticket.level,
          description: ticket.description,
          openedSince: formatDate(ticket.createdAt),
          status: ticket.status.toLowerCase().replace(" ", "-"),
          assignee: ticket.assignee?.name || "Unassigned",
          avatar: ticket.assignee?.avatarUrl || null,
        }));

        setTickets(mappedTickets);
        setError(null);
      } catch (err) {
        setError(err.message);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [selectedLevel]);

  const getTicketsByStatus = (status) =>
    tickets.filter((ticket) => ticket.status === status);

  if (loading)
    return (
      <div className="ticket-app">
        <p>Loading tickets...</p>
      </div>
    );
  if (error)
    return (
      <div className="ticket-app">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="ticket-app">
      <h1 className="app-heading">Browse Tickets</h1>

      <FilterBar selectedLevel={selectedLevel} onChange={handleFilterClick} />

      <div className="ticket-columns">
        <TicketColumn
          title="New or Unassigned"
          columnClassName="column-new"
          tickets={getTicketsByStatus("open")}
        />

        <TicketColumn
          title="In progress"
          columnClassName="column-in-progress"
          tickets={getTicketsByStatus("in-progress")}
        />

        <TicketColumn
          title="Closed"
          columnClassName="column-closed"
          tickets={getTicketsByStatus("resolved")}
        />
      </div>
    </div>
  );
}

export default Tickets;
