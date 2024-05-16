import { render, screen } from '@testing-library/react'
import Home from './index'

describe('ContactsPage component', () => {
  it('renders contact information', () => {
    render(<Home />)
    expect(screen.getByText('Лучшие проекты недели')).toBeInTheDocument()
  })
})
