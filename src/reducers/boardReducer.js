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