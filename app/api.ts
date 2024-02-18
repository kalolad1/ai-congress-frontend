const ENDPOINT = "http://34.31.37.216"

const CREATE_USER_URL = '/createuser'
const SEND_ACTION_URL = '/sendaction'
const GET_STATE_DETAIL_URL = '/getstate'
const SAVE_CHAT = '/savechat'
const SEND_FEEDBACK = '/sendfeedback'
const OPTIMIZE = '/optimize'

export const createUser = async (name: string) => {
  return fetch(`${ENDPOINT}${CREATE_USER_URL}?name=${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const sendAction = async (userId: string, action: string) => {
  return fetch(`${ENDPOINT}${SEND_ACTION_URL}?user_id=${userId}&action=${action}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const getStateDetail = async (userId: string) => {
  return fetch(`${ENDPOINT}${GET_STATE_DETAIL_URL}?user_id=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const sendMessages = async (messages: string[]) => {
  const messagesAsParams = messages.map(encodeURIComponent).join('&');
  return fetch(`${ENDPOINT}${SAVE_CHAT}${messagesAsParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

export const sendFeedback = async (userId: string, feedback: string) => {
  return fetch(`${ENDPOINT}${SEND_FEEDBACK}?user_id=${userId}&feedback=${feedback}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const optimize = async () => {
  return fetch(`${ENDPOINT}${OPTIMIZE}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}