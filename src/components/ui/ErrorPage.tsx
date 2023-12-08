import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()

  console.error(error)

  return (
    <div className="mt-40" id="error-page">
      <h1 className="text-center text-3xl font-bold">Oops!</h1>
      <p className="text-center">Sorry, an unexpected error has occurred.</p>
      <p className="text-center font-bold">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
