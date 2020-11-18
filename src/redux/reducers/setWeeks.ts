const initialState = null;

export default (
  state: any = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "SET_WEEKS": {
      return action.payload;
    }
    default:
      return state;
  }
};
