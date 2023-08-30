import { ActionFunctionArgs, useFetcher } from 'react-router-dom'
import Button from '../../ui/Button'
import { updateOrder } from '../../services/apiRestaurant'

export default function UpdateOrder() {
  const fetcher = useFetcher()

  return (
    <fetcher.Form method='PATCH' className='text-right'>
      <Button type='primary'>Make priority</Button>
    </fetcher.Form>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params }: ActionFunctionArgs) {
  if (!params.orderId) return
  const data = { priority: true }
  await updateOrder(params.orderId, data)
  return null
}
