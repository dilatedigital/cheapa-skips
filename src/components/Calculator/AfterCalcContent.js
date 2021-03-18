import React from "react"
import PropTypes from "prop-types"

const AfterCalcContent = ({ content }) => {
  return (
    <div className="cs-container">
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="after-calc-content"
      />
    </div>
  )
}

AfterCalcContent.propTypes = {
  content: PropTypes.string.isRequired,
}

export default AfterCalcContent
