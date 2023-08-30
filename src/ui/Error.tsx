import { useRouteError } from 'react-router-dom'
import LinkButton from './LinkButton'

interface ErrorResponse {
  status: 404
  statusText: string
  internal: boolean
  data: string
  error: Error
}

function NotFound() {
  const error = useRouteError()

  return (
    <div className='p-6'>
      <h1>Something went wrong 😢</h1>
      <p className='font-bold italic'>
        {(error as ErrorResponse).data || (error as Error).message}
      </p>
      <LinkButton to='-1'>&larr; Go back</LinkButton>
    </div>
  )
}

export default NotFound
