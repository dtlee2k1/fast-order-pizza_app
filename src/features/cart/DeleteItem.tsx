import { useAppDispatch } from '../../store'
import Button from '../../ui/Button'
import { deleteItem } from './cartSlice'

interface DeleteItemProps {
  pizzaId: string | number
}

export default function DeleteItem({ pizzaId }: DeleteItemProps) {
  const dispatch = useAppDispatch()

  return (
    <Button type='small' onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  )
}
