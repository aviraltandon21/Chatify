import { SET_CHANNEL, SET_PRIVATE_CHANNEL } from './actionTypes'

export const setChannel = channel => ({
  type: SET_CHANNEL,
  payload: channel,
})

export const setPrivateChannel = isChannelPrivate => ({
  type: SET_PRIVATE_CHANNEL,
  payload: {
    isChannelPrivate,
  },
})

