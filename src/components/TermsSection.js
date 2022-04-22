import React from "react"
import PropTypes from "prop-types"

const InnerBanner = ({ title, content }) => {
  //console.log(node)
  return (
    <div className="inner-banner">
      <div className="cs-container">
        <h1 className="mb-4 xl:mb-8">{title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="inner-banner__content"
        />
      </div>
    </div>
  )
}

InnerBanner.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default InnerBanner
