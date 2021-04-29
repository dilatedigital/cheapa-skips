import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const WasteSection = ({ image, content }) => {
  //console.log(image)
  const imageData = getImage(image.localFile)
  return (
    <section className="waste-section cs-container">
      <div className="waste-section__image">
        <GatsbyImage image={imageData} alt={image.altText} />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="waste-section__content"
      />
    </section>
  )
}

WasteSection.propTypes = {
  image: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
}

export default WasteSection
