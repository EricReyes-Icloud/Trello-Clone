import { useContext, useState } from "react";
import { BoardContext } from "../../context/boardContext";
import List from "../lists/list";

function Board() {
  const { state, dispatch } = useContext(BoardContext);
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

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

  return (
    <div className="board">
      {state.lists.map((list) => (
        <List key={list.id} list={list} />
      ))}

      <div className="add-list-container">
        {isAddingList ? (
          <input
            type="text"
            className="add-list-input"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (!newListTitle.trim()) setIsAddingList(false);
            }}
            placeholder="Nombre de la lista"
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
