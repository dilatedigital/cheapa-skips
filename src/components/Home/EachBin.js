import React, { useContext } from "react"
import PropTypes from "prop-types"
import CircleBg from "../../images/circle.svg"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { ModalContext } from "../../context/ModalContext"
import { graphql, useStaticQuery } from "gatsby"

const EachBin = ({ node, extra }) => {
  const imageData = getImage(node.featuredImage.node.localFile)

  const { openModal, setTitle, setSize } = useContext(ModalContext)

  const handleClick = alias => {
    openModal()
    setTitle(node.title)
    setSize(alias)
  }

  const data = useStaticQuery(graphql`
    {
      wp {
        siteGeneralSettings {
          siteSettingsFields {
            each_bin_button_text
          }
        }
      }
    }
  `)

  return (
    <div
      className="each-bin"
      onClick={() => handleClick(node.skipBinSizesFields.alias)}
      onKeyDown={() => handleClick(node.skipBinSizesFields.alias)}
      role="button"
      tabIndex="0"
      id={node.skipBinSizesFields.alias}
    >
      {extra && (
        <div className="hidden recommended-bin-bg text-center font-bold text-white py-4 bg-secondary">
          Recommended
        </div>
      )}
      <div className={`${extra ? "each-bin-calcu" : ""} `}>
        <div
          className={`flex items-center justify-center h-bin-img ${
            extra ? "each-bin-mt" : ""
          }`}
        >
          <CircleBg />
          <GatsbyImage
            image={imageData}
            alt={node.featuredImage.node.altText}
          />
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
            <div className="spec-value">
              {node.skipBinSizesFields.dimensions}
            </div>
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
              {data.wp.siteGeneralSettings.siteSettingsFields
                .each_bin_button_text
                ? data.wp.siteGeneralSettings.siteSettingsFields
                    .each_bin_button_text
                : "Book Now"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

EachBin.propTypes = {
  node: PropTypes.object.isRequired,
  extra: PropTypes.bool,
}

export default EachBin
