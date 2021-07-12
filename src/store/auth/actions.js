import { SET_USER, CLEAR_USER,SET_COLORS } from './actionTypes'

export const setUser = user => ({
  type: SET_USER,
  payload: user,
})

export const clearUser = () => ({
  type: CLEAR_USER,
})


export const setColors = (primaryColor, secondaryColor) => {
  return {
    type: SET_COLORS,
    payload: {
      primaryColor,
      secondaryColor
    }
  };
};
