import React from "react"
import Layout from "../components/layout"
import getStripe from "../utils/stripejs"
import axios from "axios"

const TestProduct = () => {
  const buyOne = sku => {
    const skus = []
    skus.push(sku)
    const payload = {
      skus: skus,
    }
    performPurchase(payload)
  }

  const performPurchase = async payload => {
    const response = await axios.post("/api/create-checkout", payload)
    console.log("response", response)
    const stripe = await getStripe(response.data.publishableKey)

    const { error } = await stripe.redirectToCheckout({
      sessionId: response.data.sessionId,
    })

    if (error) {
      console.error(error)
    }
  }
  return <Layout></Layout>
}

export default TestProduct
