import { render, screen } from '@testing-library/react'
import { Project } from './Project'
import IProject from '../../../types/project'

test('Project renders with correct data', () => {
  const testData: IProject = {
    id: 1,
    name: 'имя проекта',
    description: 'описание проекта',
    urgency: 'срочность проекта',
    payment: 1000,
    pub_date: 123,
    customer_id: 1,
    customer: 'заказчик'
  }

  render(
    <Project key={1} project={testData}>
      <span>asc</span>
    </Project>
  )

  expect(screen.getByText(testData.name)).toBeInTheDocument()
  expect(screen.getByText(testData.description)).toBeInTheDocument()
  expect(screen.getByText(testData.urgency)).toBeInTheDocument()
})
