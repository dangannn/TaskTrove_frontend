import { ROOT_ROUTE, AUTH_ROUTE, REGISTER_ROUTE } from './routes'

describe('Route Constants', () => {
  it('should have the correct values', () => {
    expect(ROOT_ROUTE).toBe('/')
    expect(AUTH_ROUTE).toBe('/auth')
    expect(REGISTER_ROUTE).toBe('/register')
  })
})
