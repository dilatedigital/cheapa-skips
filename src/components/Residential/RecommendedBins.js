import React from "react"
import SkipBinSizes from "../Home/SkipBinSizes"
import PropTypes from "prop-types"

const RecommendedBins = ({ title, binType }) => {
  return (
    <div className="recommended-bins">
      <h3 class="text-h3-sm lg:text-h3-lg max-w-725px mx-auto text-center">
        {title}
      </h3>
      <SkipBinSizes binType={binType} />
    </div>
  )
}

RecommendedBins.propTypes = {
  title: PropTypes.string.isRequired,
  binType: PropTypes.string.isRequired,
}

export default RecommendedBins
