interface InputProps {
  id: string
  type: string
  name: string
  value?: string
  checked?: boolean
  onChange: (e: { target: { name: any; value: any } }) => void
}

const Input = (props: InputProps) => {
  return (
    <input
      checked={props?.checked}
      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm text-black outline-none duration-300 ease-linear focus:border-black focus:outline-0 active:border-black"
      id={props.id}
      name={props.name}
      type={props.type}
      value={props?.value}
      onChange={props.onChange}
    />
  )
}

export default Input
