function TicketCard({ ticket }) {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h3 className="ticket-title">
          {ticket.title} - Level {ticket.level}
        </h3>
      </div>
      <p className="ticket-description">
        <span className="ticket-label">Description:</span> {ticket.description}
      </p>
      <div className="ticket-footer">
        <div className="ticket-opened">
          <span className="ticket-label">Opened since:</span>
          <span className="ticket-opened-date">{ticket.openedSince}</span>
        </div>
        <div className="ticket-meta">
          <span className={`status-badge status-${ticket.status}`}>
            {ticket.status === "resolved" ? "closed" : ticket.status}
          </span>
          {ticket.assignee === "Unassigned" ? (
            <span className="ticket-assignee">{ticket.assignee}</span>
          ) : (
            <>
              <span className="ticket-assignee">{ticket.assignee}</span>
              {ticket.avatar && (
                <img
                  src={ticket.avatar}
                  alt={ticket.assignee}
                  onError={(e) => {
                    e.currentTarget.src = "/default-avatar.png";
                  }}
                  className="ticket-avatar"
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
