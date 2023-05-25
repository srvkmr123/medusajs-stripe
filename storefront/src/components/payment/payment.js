import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useCart } from "medusa-react"
import React, { useMemo } from "react"
import PaymentForm from "./payment-form"

const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_API_KEY || "pk_test_51NBAkLSJRwyLvzazu59Jfl4G8PqTGEEutN3nIwosIdRhhd9jcka0nExIRVpJD69EEbsswqRq9JjV5dzOMiiDO8ce00y0dZCbj5"
const stripePromise = loadStripe(STRIPE_KEY)

const Payment = ({ handleSubmit, setLoading }) => {
  const { cart } = useCart()

  const stripeSession = useMemo(() => {
    if (cart.payment_sessions) {
      return cart.payment_sessions.find(s => s.provider_id === "stripe")
    }

    return null
  }, [cart.payment_sessions])

  if (!stripeSession) {
    return null
  }

  const options = {
    client_secret: stripeSession.data.client_secret,
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm
        session={stripeSession}
        handleSubmit={handleSubmit}
        setLoading={setLoading}
      />
    </Elements>
  )
}

export default Payment
