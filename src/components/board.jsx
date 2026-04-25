import List from "./list";

function Board({ lists }) {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      {lists.map((list) => (
        <List 
          key={list.id} 
          title={list.title} 
          cards={list.cards} 
        />
      ))}
    </div>
  );
}

export default Board;