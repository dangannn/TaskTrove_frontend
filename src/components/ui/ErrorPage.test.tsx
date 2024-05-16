import { describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import ErrorPage from './ErrorPage'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

describe('Error Page', () => {
  test('отображает начальное значение warning message', () => {
    const router = createMemoryRouter([{ path: '/', element: <ErrorPage /> }], {
      initialEntries: ['/']
    })
    render(
      <>
        <RouterProvider fallbackElement={<p>Loading...</p>} router={router} />
      </>
    )
    const warningMessage = screen.getByText('Sorry, an unexpected error has occurred.')
    expect(warningMessage).toBeInTheDocument()
  })
})
