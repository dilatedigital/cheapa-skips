import React, { useContext } from "react"
import PropTypes from "prop-types"
import CircleBg from "../../images/circle.svg"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { ModalContext } from "../../context/ModalContext"

const EachBin = ({ node }) => {
  const imageData = getImage(node.featuredImage.node.localFile)

  const { openModal, setTitle, setSize } = useContext(ModalContext)

  const handleClick = alias => {
    openModal()
    setTitle(node.title)
    setSize(alias)
  }

  return (
    <div
      className="each-bin"
      onClick={() => handleClick(node.skipBinSizesFields.alias)}
      onKeyDown={() => handleClick(node.skipBinSizesFields.alias)}
      role="button"
      tabIndex="0"
    >
      <div className="flex items-center justify-center h-bin-img">
        <CircleBg />
        <GatsbyImage image={imageData} alt={node.featuredImage.node.altText} />
      </div>
      <div className="bin-specs text-left mt-9">
        <h4 className="font-bold text-bin-title mb-2">{node.title}</h4>
        <div className="flex border-b border-opacity-20 pb-2 mb-4">
          <div className="spec-name">Starting at</div>
          <div className="spec-value text-secondary">
            {`$ ${node.skipBinSizesFields.price}`}
          </div>
        </div>
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
          <div className="cs-btn cs-btn--outline">
            Enquire for personal quote
          </div>
        </div>
      </div>
    </div>
  )
}

EachBin.propTypes = {
  node: PropTypes.object.isRequired,
}

export default EachBin
