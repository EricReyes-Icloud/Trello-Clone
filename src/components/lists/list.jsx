import { useContext, useState } from "react";
import { BoardContext } from "../../context/boardContext";
import Card from "../cards/card";

function List({ list }) {
  const { dispatch } = useContext(BoardContext);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardText, setNewCardText] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(list.title);

  const handleAddCard = () => {
    if (!newCardText.trim()) return;

    dispatch({
      type: "ADD_CARD",
      payload: { listId: list.id, text: newCardText.trim() }
    });

    setNewCardText("");
    setIsAddingCard(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddCard();
    } else if (e.key === "Escape") {
      setIsAddingCard(false);
      setNewCardText("");
    }
  };

  const handleSaveTitle = () => {
    if (!editTitle.trim()) return;

    dispatch({
      type: "EDIT_LIST",
      payload: { id: list.id, title: editTitle.trim() }
    });
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveTitle();
    } else if (e.key === "Escape") {
      setEditTitle(list.title);
      setIsEditingTitle(false);
    }
  };

  const deleteList = () => {
    if (confirm("¿Eliminar esta lista?")) {
      dispatch({
        type: "DELETE_LIST",
        payload: { id: list.id }
      });
    }
  };

  return (
    <div className="list">
      <div className="list-header">
        {isEditingTitle ? (
          <input
            type="text"
            className="list-title-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleTitleKeyDown}
            onBlur={handleSaveTitle}
            autoFocus
          />
        ) : (
          <>
            <h3
              className="list-title"
              onClick={() => setIsEditingTitle(true)}
            >
              {list.title}
            </h3>
            <button className="btn-list-delete" onClick={deleteList}>
              ✕
            </button>
          </>
        )}
      </div>

      {list.cards.map((card) => (
        <Card key={card.id} card={card} listId={list.id} />
      ))}

      {isAddingCard ? (
        <input
          type="text"
          className="inline-input"
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (!newCardText.trim()) setIsAddingCard(false);
          }}
          placeholder="Escribe y presiona Enter"
          autoFocus
        />
      ) : (
        <button
          className="btn btn-add"
          onClick={() => setIsAddingCard(true)}
        >
          + Añadir tarjeta
        </button>
      )}
    </div>
  );
}

export default List;
