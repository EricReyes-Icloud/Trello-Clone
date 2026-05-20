const boardReducer = (state, action) => {
  switch (action.type) {

    case "ADD_LIST":
      return {
        ...state,
        lists: [
          ...state.lists,
          {
            id: crypto.randomUUID(),
            title: action.payload.title,
            cards: []
          }
        ]
      };

    case "DELETE_LIST":
      return {
        ...state,
        lists: state.lists.filter(
          (list) => list.id !== action.payload.id
        ),
        pendingDeletion: {
          ...state.pendingDeletion,
          [action.payload.id]: state.lists.find(
            (list) => list.id === action.payload.id
          )
        }
      };

    case "RESTORE_LIST":
      if (!state.pendingDeletion[action.payload.id]) return state;
      return {
        ...state,
        lists: [...state.lists, state.pendingDeletion[action.payload.id]],
        pendingDeletion: Object.fromEntries(
          Object.entries(state.pendingDeletion).filter(
            ([id]) => id !== action.payload.id
          )
        )
      };

    case "CONFIRM_DELETION":
      return {
        ...state,
        pendingDeletion: Object.fromEntries(
          Object.entries(state.pendingDeletion).filter(
            ([id]) => id !== action.payload.id
          )
        )
      };

    case "EDIT_LIST":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.id
            ? { ...list, title: action.payload.title }
            : list
        )
      };

    case "ADD_CARD":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                cards: [
                  ...list.cards,
                  {
                    id: crypto.randomUUID(),
                    text: action.payload.text
                  }
                ]
              }
            : list
        )
      };

    case "DELETE_CARD":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                cards: list.cards.filter(
                  (card) => card.id !== action.payload.cardId
                )
              }
            : list
        )
      };

    case "EDIT_CARD":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                cards: list.cards.map((card) =>
                  card.id === action.payload.cardId
                    ? { ...card, text: action.payload.text }
                    : card
                )
              }
            : list
        )
      };

    default:
      return state;
  }
};

export default boardReducer;