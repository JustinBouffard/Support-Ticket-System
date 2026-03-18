import TicketCard from "./TicketCard";

function TicketColumn({ title, columnClassName, tickets }) {
  return (
    <section className={`ticket-column ${columnClassName}`}>
      <h2 className="column-title">{title}</h2>
      <div className="column-body">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </section>
  );
}

export default TicketColumn;
