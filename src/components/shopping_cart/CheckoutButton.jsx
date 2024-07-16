import React from 'react'
import { useStripe } from '@stripe/react-stripe-js'
import style from './shoppingcart.module.css'

const CheckoutButton = ({sessionId}) => {
const stripe = useStripe()

const handleBuy = async () => {
    const { error } = await stripe.redirectToCheckout({sessionId})
    if(error){console.log('Error redirecting to checkout: ', error)}
}
  return (
    <button role='link' onClick={handleBuy} className={style.checkoutBtn}>Checkout</button>
  )
}

export default CheckoutButton