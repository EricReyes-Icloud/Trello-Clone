import { useContext, useState, useRef, useEffect } from "react";
import { BoardContext } from "../../context/boardContext";
import Card from "../cards/card";

function List({ list }) {
  const { dispatch } = useContext(BoardContext);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardText, setNewCardText] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(list.title);
  const titleInputRef = useRef(null);
  const addCardInputRef = useRef(null);

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

  const handleCancelTitle = () => {
    setEditTitle(list.title);
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveTitle();
    } else if (e.key === "Escape") {
      handleCancelTitle();
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

  // Focus and select all text when entering title edit mode
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  // Focus add card input when it appears
  useEffect(() => {
    if (isAddingCard && addCardInputRef.current) {
      addCardInputRef.current.focus();
    }
  }, [isAddingCard]);

  return (
    <div className="list">
      <div className="list-header">
        {isEditingTitle ? (
          <input
            ref={titleInputRef}
            type="text"
            className="list-title-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleTitleKeyDown}
            onBlur={handleCancelTitle}
            aria-label="Edit list title"
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
            <button 
              className="btn-list-delete" 
              onClick={deleteList}
              aria-label="Delete list"
            >
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
          ref={addCardInputRef}
          type="text"
          className="inline-input"
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setIsAddingCard(false);
            setNewCardText("");
          }}
          placeholder="Escribe y presiona Enter"
          aria-label="Add new card"
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
