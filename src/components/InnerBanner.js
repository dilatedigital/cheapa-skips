import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const InnerBanner = ({ title, content, image }) => {
  const { node } = image
  const imageData = getImage(node.localFile)
  //console.log(node)
  return (
    <div className="inner-banner">
      <div className="cs-container">
        <h1>{title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="inner-banner__content"
        />
      </div>
      <div className="inner-banner__img">
        <GatsbyImage image={imageData} alt={node.altText} />
      </div>
    </div>
  )
}

InnerBanner.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.object,
}

export default InnerBanner
