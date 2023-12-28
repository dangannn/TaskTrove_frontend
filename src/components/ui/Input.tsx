import styled from 'styled-components'

interface InputProps {
  id: string
  type: string
  name: string
  value?: string | number
  checked?: boolean
  onChange: (e: { target: { name: any; value: any } }) => void
}

const InputWrapper = styled.input`
  color: var(--text-primary);
  display: flex;
  padding: 0.75rem;
  margin-top: 0.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem;
  border-width: 1px;
  border-color: #e5e7eb;
  outline-style: none;
  width: 100%;
  height: 3rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition-duration: 300ms;
  transition-timing-function: linear;

  &:focus {
    border-color: var(--blue);
  }
`
const Input = (props: InputProps) => {
  return (
    <InputWrapper
      checked={props?.checked}
      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none duration-300 ease-linear focus:border-black focus:outline-0 active:border-black"
      id={props.id}
      name={props.name}
      type={props.type}
      value={props?.value}
      onChange={props?.onChange}
    />
  )
}

export default Input
