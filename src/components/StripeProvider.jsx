import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51PUU2fCPQhVEdQret0DVjqcb2nvOowdhUiazpzqKlMXFqYYvuDpOJuRukDzQAX4aAA6NUDgYfFnSqgMmYV9bQzhd00LVJ4A3il')


const StripeProvider = ({children}) => {
  return (
   <Elements stripe={stripePromise}>{children}</Elements>
  )
}

export default StripeProvider