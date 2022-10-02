import { onCurrentUserSubscriptionUpdate, Subscription } from "@stripe/firestore-stripe-payments"
import { User } from "firebase/auth"
import { useEffect, useState } from "react"
import payments from "../lib/stripe"

function useSubscription(user: User | null) {
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  useEffect(() => {
    if (!user) return

    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      const sub = snapshot.subscriptions.filter((s) => s.status === "active" || s.status === "trialing")[0]

      setSubscription(sub)
    })
  }, [user])

  return subscription
}

export default useSubscription