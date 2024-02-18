const ENDPOINT = "http://34.31.37.216"

const CREATE_USER_URL = '/createuser'
const SEND_ACTION_URL = '/sendaction'
const GET_STATE_DETAIL_URL = '/getstate'


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
