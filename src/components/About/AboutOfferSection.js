import React from "react"
import PropTypes from "prop-types"

const AboutOfferSection = ({ content }) => {
  return (
    <section className="about-offer-section cs-container">
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="offer-content"
      />
    </section>
  )
}

AboutOfferSection.propTypes = {
  content: PropTypes.string.isRequired,
}

export default AboutOfferSection
