import { useState } from "react"

export const STATUS_CONSENTED = "CONSENTED"
export const STATUS_DISCONSENTED = "DISCONSENTED"
export const STATUS_UNSETTLED = "UNSETTLED"

const STATUS_KEY = 'COOKIE_CONSENTED_STATUS'

function parseStatus (value) {
  switch (value) {
    case STATUS_CONSENTED:
      return STATUS_CONSENTED
    case STATUS_DISCONSENTED:
      return STATUS_DISCONSENTED
    default:
      return STATUS_UNSETTLED
  }
}

function getStatusFromLocalStorage () {
  try {
    return parseStatus(localStorage.getItem(STATUS_KEY))
  } catch (error) {
    return STATUS_UNSETTLED
  }
}

function setStatusToLocalStorage (status) {
  localStorage.setItem(STATUS_KEY, parseStatus(status))
}

export function useConsentedStatus () {
  const [status, setStatusToState] = useState(() => getStatusFromLocalStorage())

  const setStatus = (status) => {
    const parsedStatus = parseStatus(status)
    setStatusToState(parsedStatus)
    setStatusToLocalStorage(parsedStatus)
  }

  return {
    status,
    setStatus
  }
}
