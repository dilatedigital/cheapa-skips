import React from "react"
import PropTypes from "prop-types"

const AfterFormCTA = ({ content }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className="container-lg after-form-cta"
    />
  )
}

AfterFormCTA.propTypes = {
  content: PropTypes.string.isRequired,
}

export default AfterFormCTA
