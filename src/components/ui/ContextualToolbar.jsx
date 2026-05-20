import { useState, useRef, useEffect } from "react";

function ContextualToolbar({ onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleAction = (action) => {
    setIsOpen(false);
    if (action === "edit" && onEdit) onEdit();
    if (action === "delete" && onDelete) onDelete();
  };

  return (
    <div className="toolbar" ref={menuRef}>
      <button
        className="toolbar-trigger"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        aria-label="Card actions"
        aria-expanded={isOpen}
      >
        ⋮
      </button>
      {isOpen && (
        <div className="toolbar-menu" role="menu">
          <button
            className="toolbar-menu-item"
            role="menuitem"
            onClick={(e) => {
              e.stopPropagation();
              handleAction("edit");
            }}
          >
            Editar
          </button>
          <button
            className="toolbar-menu-item toolbar-menu-item--danger"
            role="menuitem"
            onClick={(e) => {
              e.stopPropagation();
              handleAction("delete");
            }}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default ContextualToolbar;
