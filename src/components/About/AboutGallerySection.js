import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const AboutGallerySection = ({ image1, image2, image3, image4 }) => {
  const imageData1 = getImage(image1.localFile)
  const imageData2 = getImage(image2.localFile)
  const imageData3 = getImage(image3.localFile)
  const imageData4 = getImage(image4.localFile)
  return (
    <section className="about-gallery">
      <div className="image-1">
        <GatsbyImage image={imageData1} alt={image1.altText} />
      </div>
      <div className="image-2-3">
        <GatsbyImage image={imageData2} alt={image2.altText} />
        <GatsbyImage image={imageData3} alt={image3.altText} />
      </div>
      <div className="image-4">
        <GatsbyImage image={imageData4} alt={image4.altText} />
      </div>
    </section>
  )
}

AboutGallerySection.propTypes = {
  image1: PropTypes.object.isRequired,
  image2: PropTypes.object.isRequired,
  image3: PropTypes.object.isRequired,
  image4: PropTypes.object.isRequired,
}

export default AboutGallerySection
