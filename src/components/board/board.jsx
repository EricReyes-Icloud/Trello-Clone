import { useContext, useState, useRef, useEffect } from "react";
import { BoardContext } from "../../context/boardContext";
import List from "../lists/list";

function Board() {
  const { state, dispatch } = useContext(BoardContext);
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const addListInputRef = useRef(null);

  const handleAddList = () => {
    if (!newListTitle.trim()) return;

    dispatch({
      type: "ADD_LIST",
      payload: { title: newListTitle.trim() }
    });

    setNewListTitle("");
    setIsAddingList(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddList();
    } else if (e.key === "Escape") {
      setIsAddingList(false);
      setNewListTitle("");
    }
  };

  // Focus add list input when it appears
  useEffect(() => {
    if (isAddingList && addListInputRef.current) {
      addListInputRef.current.focus();
    }
  }, [isAddingList]);

  return (
    <div className="board">
      {state.lists.map((list) => (
        <List key={list.id} list={list} />
      ))}

      <div className="add-list-container">
        {isAddingList ? (
          <input
            ref={addListInputRef}
            type="text"
            className="add-list-input"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              setIsAddingList(false);
              setNewListTitle("");
            }}
            placeholder="Nombre de la lista"
            aria-label="Add new list"
            autoFocus
          />
        ) : (
          <button
            className="btn-add-list"
            onClick={() => setIsAddingList(true)}
          >
            + Añadir lista
          </button>
        )}
      </div>
    </div>
  );
}

export default Board;
