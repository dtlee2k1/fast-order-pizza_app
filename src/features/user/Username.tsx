import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export default function Username() {
  const username = useSelector((state: RootState) => state.user.username)
  return <h2 className='hidden text-sm font-semibold md:block'>{username}</h2>
}
