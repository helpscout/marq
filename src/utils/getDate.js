import { isNumber } from 'lodash'

const getDate = date => {
  if (!isNumber(date)) return false

  return new Date(date).toISOString().substring(0, 10)
}

export default getDate
