import { useContext, useState, useRef, useEffect } from "react";
import { BoardContext } from "../../context/boardContext";
import { useToast } from "../../context/ToastContext";
import ContextualToolbar from "../ui/ContextualToolbar";

function Card({ card, listId }) {
  const { dispatch } = useContext(BoardContext);
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(card.text);
  const [showSuccess, setShowSuccess] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  // Handle save with success feedback
  const handleSaveEdit = () => {
    if (!editText.trim()) return;

    dispatch({
      type: "EDIT_CARD",
      payload: { listId, cardId: card.id, text: editText.trim() }
    });

    // Show success feedback
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsEditing(false);
    }, 500);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditText(card.text);
    setIsEditing(false);
  };

  // Handle key events
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleCancelEdit();
    } else if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      handleSaveEdit();
    }
  };

  // Focus and resize textarea when entering edit mode
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
      resizeTextarea();
    }
  }, [isEditing]);

  const handleDeleteCard = () => {
    dispatch({
      type: "DELETE_CARD",
      payload: { listId, cardId: card.id }
    });

    addToast({
      message: "Tarjeta eliminada",
      undoAvailable: false
    });
  };

  return (
    <div className="card" onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <div>
          <textarea
            ref={textareaRef}
            className={`textarea-auto ${showSuccess ? 'feedback-success' : ''}`}
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value);
              resizeTextarea();
            }}
            onKeyDown={handleKeyDown}
            aria-label="Edit card text"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="edit-buttons">
            <button
              className="btn-save"
              onClick={handleSaveEdit}
              aria-label="Save"
            >
              Guardar
            </button>
            <button
              className="btn-cancel"
              onClick={handleCancelEdit}
              aria-label="Cancel"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="card-text">{card.text}</p>
          <ContextualToolbar
            onEdit={() => setIsEditing(true)}
            onDelete={handleDeleteCard}
          />
        </>
      )}
    </div>
  );
}

export default Card;
