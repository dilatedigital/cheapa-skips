import React from "react"
import PropTypes from "prop-types"
import CircleBg from "../../images/circle.svg"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Button from "../Button"

const EachBin = ({ node }) => {
  const imageData = getImage(node.featuredImage.node.localFile)
  console.log(node)
  return (
    <div className="each-bin">
      <div className="flex items-center justify-center h-bin-img">
        <CircleBg />
        <GatsbyImage image={imageData} alt={node.featuredImage.node.altText} />
      </div>
      <div className="bin-specs text-left mt-9">
        <h4 className="font-bold text-bin-title mb-15px">{node.title}</h4>
        <div className="flex">
          <div className="spec-name">Dimensions</div>
          <div className="spec-value">{node.skipBinSizesFields.dimensions}</div>
        </div>
        <div className="flex">
          <div className="spec-name">Trailer Loads</div>
          <div className="spec-value">
            {node.skipBinSizesFields.trailerLoads}
          </div>
        </div>
        <div className="flex">
          <div className="spec-name">Wheelie Bins</div>
          <div className="spec-value">
            {node.skipBinSizesFields.wheelieBins}
          </div>
        </div>
        <div className="mt-7.5">
          <Button text="Book Now" outline={true} link="/" />
        </div>
      </div>
    </div>
  )
}

EachBin.propTypes = {
  node: PropTypes.object.isRequired,
}

export default EachBin
