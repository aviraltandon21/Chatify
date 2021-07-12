import { combineReducers } from 'redux'

import { userReducer,colors_reducer } from './auth/reducers'
import { channelReducer } from './channels/reducers'

export default combineReducers({
  user: userReducer,
  channel: channelReducer,
  colors: colors_reducer
})