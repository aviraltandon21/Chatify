import { SET_USER, CLEAR_USER,SET_COLORS } from './actionTypes'

const initialUserState = {
  isLoading: true,
  currentUser: null,
}

export const userReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        isLoading: false,
        currentUser: payload,
      }
    case CLEAR_USER:
      return {
        ...initialUserState,
        isLoading: false,
      }
    default:
      return state
  }
}

const initialColorsState = {
  primaryColor: "#4c3c4c",
  secondaryColor: "#eee"
};

export const colors_reducer = (state = initialColorsState, action) => {
  switch (action.type) {
    case SET_COLORS:
      return {
        primaryColor: action.payload.primaryColor,
        secondaryColor: action.payload.secondaryColor
      };
    default:
      return state;
  }
};