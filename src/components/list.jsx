import Card from "./card";

function List({ title, cards }) {
  return (
    <div style={{
      background: "#f4f5f7",
      padding: "10px",
      width: "250px",
      borderRadius: "6px"
    }}>
      <h3>{title}</h3>

      {cards.map((card) => ( // Por cada tarjeta, renderiza un componente
        <Card key={card.id} text={card.text} />
      ))}
    </div>
  );
}

export default List;