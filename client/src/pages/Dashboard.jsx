import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3000/api/tickets?limit=100",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }

        const data = await response.json();
        setTickets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "Open").length;
  const resolvedTickets = tickets.filter((t) => t.status === "Resolved").length;

  if (loading)
    return (
      <div className="ticket-app">
        <p>Loading...</p>
      </div>
    );
  if (tickets.length === 0 && !loading)
    return (
      <div className="ticket-app">
        <p>No tickets found.</p>
      </div>
    );

  return (
    <div className="ticket-app">
      <div className="dashboard-welcome">
        <h1>Welcome, {user?.name || "User"}</h1>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>{totalTickets}</h3>
            <p>Total Tickets</p>
          </div>
          <div className="stat-card">
            <h3>{openTickets}</h3>
            <p>Open</p>
          </div>
          <div className="stat-card">
            <h3>{resolvedTickets}</h3>
            <p>Resolved</p>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Link
            to="/tickets"
            style={{
              fontSize: "16px",
              color: "#111",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Browse Tickets →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
