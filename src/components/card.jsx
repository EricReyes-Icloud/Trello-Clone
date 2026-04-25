function Card({ text }) { // Introducimos props porque text viene desde afuera
  return (
    <div style={{ 
      background: "white", 
      padding: "8px", 
      marginBottom: "8px",
      borderRadius: "4px"
    }}>
      {text}
    </div>
  );
}

export default Card;