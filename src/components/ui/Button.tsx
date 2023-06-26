interface ButtonProps {
  children: string
  onClick: any
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className="mt-4 rounded-md border-2 bg-[#246BFD] p-2 py-2 text-white duration-300 ease-linear hover:bg-[#246BFD]/80 focus:border-black focus:outline-0 active:bg-[#246BFD]/60 active:shadow-blue-900"
      type="submit"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
