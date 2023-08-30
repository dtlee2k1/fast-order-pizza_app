/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react'
import { ActionFunctionArgs, Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import { OrderType } from '../../types/order.type'
import Button from '../../ui/Button'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { getCart, getTotalCartPrice } from '../cart/cartSlice'
import EmptyCart from '../cart/EmptyCart'
import { formatCurrency } from '../../utils/helpers'
import { fetchAddress } from '../user/userSlice'

interface FormErrors {
  phone?: string
}

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str)

function CreateOrder() {
  const [withPriority, setWithPriority] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const {
    username,
    address,
    position,
    status: addressStatus,
    error: addressError
  } = useSelector((state: RootState) => state.user)

  const isLoadingAddress = addressStatus === 'loading'

  const cart = useSelector(getCart)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? 0.2 * totalCartPrice : 0
  const totalPrice = totalCartPrice + priorityPrice

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const formErrors = useActionData() as FormErrors

  if (!cart.length) return <EmptyCart />

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>
      <Form method='POST'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label htmlFor='customer' className='sm:basis-40'>
            First Name
          </label>
          <input
            id='customer'
            className='input grow'
            type='text'
            name='customer'
            defaultValue={username}
            required
          />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label htmlFor='phone' className='sm:basis-40'>
            Phone number
          </label>
          <div className='grow'>
            <input id='phone' className='input w-full' type='tel' name='phone' required />
            {formErrors?.phone && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label htmlFor='address' className='sm:basis-40'>
            Address
          </label>
          <div className='grow'>
            <input
              id='address'
              className='input w-full'
              type='text'
              name='address'
              defaultValue={address}
              disabled={isLoadingAddress}
              required
            />

            {addressStatus === 'error' && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>{addressError}</p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className='absolute right-[3px] top-[50%] z-50 sm:right-[5px] sm:top-[5px]'>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(fetchAddress())
                }}
                disabled={isLoadingAddress}
                className='inline-block rounded-full bg-yellow-400 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed md:px-5 md:py-2.5'
              >
                Get position
              </button>
            </span>
          )}
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority'>Want to give your order priority?</label>
        </div>
        <div>
          <input hidden readOnly name='cart' value={JSON.stringify(cart)} />
          <input
            hidden
            readOnly
            name='position'
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type='primary'>
            {isSubmitting ? 'Placing order....' : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const order = {
    ...data,
    priority: data.priority === 'on',
    cart: JSON.parse(data.cart as string)
  } as OrderType

  const errors: FormErrors = {}
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you later.'

  if (Object.keys(errors).length > 0) return errors

  // if everything is okay, create new order and redirect
  const newOrder: OrderType = await createOrder(order)
  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder
