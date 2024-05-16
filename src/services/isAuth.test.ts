import { describe } from 'vitest'

import isAuth from './isAuth'

describe('isAuth', () => {
  test('isAuth returns true if token exists in localStorage', () => {
    localStorage.setItem('token', 'dummyToken')

    expect(isAuth()).toBe(true)
  })

  test('isAuth returns false if token does not exist in localStorage', () => {
    localStorage.clear()

    expect(isAuth()).toBe(false)
  })
})
