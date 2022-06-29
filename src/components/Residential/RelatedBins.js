import React from "react"
import PropTypes from "prop-types"
import EachBin from "../Home/EachBin"

const RelatedBins = ({ title, bins, page }) => {
  //console.log(bins)
  return (
    <div className="recommended-bins">
      <h3 class="text-h3-sm lg:text-h3-lg max-w-725px mx-auto text-center">
        {title}
      </h3>
      {bins && (
        <div
          className={`skip-bins-container mt-14 md:grid md:grid-cols-2 md:gap-12 lg:grid-cols-3 xl:mt-11  ${
            page === "calcu" ? "xl:gap-y-44" : "xl:gap-y-17"
          }`}
        >
          {bins.map(bin => {
            return <EachBin key={bin.id} node={bin} />
          })}
        </div>
      )}
    </div>
  )
}

RelatedBins.propTypes = {
  title: PropTypes.string.isRequired,
  bins: PropTypes.array,
  page: PropTypes.string,
}

export default RelatedBins
