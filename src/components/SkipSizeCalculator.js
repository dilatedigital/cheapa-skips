import React from "react"
import PropTypes from "prop-types"
import { useForm } from "react-hook-form"

const SkipSizeCalculator = ({ inPage }) => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <div
      class={`calculator-container cs-container ${
        inPage ? "mt-0" : "mt-12 lg:mt-42"
      }`}
    >
      {!inPage ? (
        <h2 className="text-h3-sm lg:text-h3-lg">Skip Size Calculator</h2>
      ) : (
        <h1>Skip Size Calculator</h1>
      )}
      <p className="mt-4">
        Use our simple skip size calculator to get a recommended skip based on
        your needs.
      </p>
      <div className="main-calculator">
        <form onSubmit={handleSubmit(onSubmit)}></form>
      </div>
    </div>
  )
}

SkipSizeCalculator.propTypes = {
  inPage: PropTypes.bool.isRequired,
}

export default SkipSizeCalculator
