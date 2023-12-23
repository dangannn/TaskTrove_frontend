import jwt_decode from 'jwt-decode'

const extractUserIdFromToken = () => {
  try {
    const token = localStorage.getItem('token') || ''
    const decodedToken = jwt_decode(token)
    const userId = decodedToken.user_id

    return userId
  } catch (error) {
    console.log('Invalid token')

    return null
  }
}
const customerId = extractUserIdFromToken()

export default customerId
