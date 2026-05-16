import { useContext, useState } from "react";
import { BoardContext } from "../../context/boardContext";

function Card({ card, listId }) {
  const { dispatch } = useContext(BoardContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(card.text);

  const handleSaveEdit = () => {
    if (!editText.trim()) return;

    dispatch({
      type: "EDIT_CARD",
      payload: { listId, cardId: card.id, text: editText.trim() }
    });
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      setEditText(card.text);
      setIsEditing(false);
    }
  };

  const deleteCard = (e) => {
    e.stopPropagation();
    dispatch({
      type: "DELETE_CARD",
      payload: { listId, cardId: card.id }
    });
  };

  return (
    <div className="card" onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <input
          type="text"
          className="card-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSaveEdit}
          autoFocus
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <>
          <p className="card-text">{card.text}</p>
          <button className="card-delete" onClick={deleteCard}>
            Eliminar
          </button>
        </>
      )}
    </div>
  );
}

export default Card;
