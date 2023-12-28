import React from 'react'
import styled from 'styled-components'

interface SubmitButtonProps {
  isValid: boolean
  children: any
  type: string
}

const SubmitButtonWrapper = styled.button<SubmitButtonProps>`
  color: var(--text-primary-light);
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-top: 1rem;
  border-radius: 1.5rem;
  border-width: 2px;
  transition-duration: 300ms;
  transition-timing-function: linear;
  background: #246bfd;
  ${({ isValid }) => (isValid ? '' : 'filter: brightness(150%);')}
`
const SubmitButton = ({ isValid, children, type }: SubmitButtonProps) => {
  return (
    <SubmitButtonWrapper disabled={!isValid} isValid={isValid} type={type}>
      {children}
    </SubmitButtonWrapper>
  )
}

export default SubmitButton
