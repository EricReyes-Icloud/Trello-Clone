import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, undoAvailable = false, onUndo, onTimeout }) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, undoAvailable, onUndo }]);

    // Auto-dismiss after 5s, then call onTimeout if provided
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      if (onTimeout) onTimeout();
    }, 5000);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const triggerUndo = useCallback((id) => {
    setToasts((prev) => {
      const toast = prev.find((t) => t.id === id);
      if (toast?.onUndo) toast.onUndo();
      return prev.filter((t) => t.id !== id);
    });
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, triggerUndo }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
