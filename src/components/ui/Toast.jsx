import { useEffect, useState } from "react";

function Toast({ id, message, undoAvailable, autoDismiss, onUndo, onDismiss }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onDismiss(id), 300);
    }, autoDismiss);

    return () => clearTimeout(timer);
  }, [id, autoDismiss, onDismiss]);

  const handleUndo = () => {
    onUndo(id);
    onDismiss(id);
  };

  if (exiting) return null;

  return (
    <div className="toast">
      <span className="toast-message">{message}</span>
      {undoAvailable && (
        <button className="btn btn-secondary toast-undo-btn" onClick={handleUndo}>
          Deshacer
        </button>
      )}
    </div>
  );
}

export function ToastContainer({ toasts, onDismiss, onUndo }) {
  return (
    <div className="toast-container" aria-live="polite">
      {[...toasts].reverse().map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          undoAvailable={toast.undoAvailable}
          autoDismiss={5000}
          onUndo={onUndo}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}
