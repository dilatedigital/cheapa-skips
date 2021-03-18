import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import EachBin from "./EachBin"

const SkipBinSizes = ({ title, content, binType, page }) => {
  let extraDiv = page ? true : false
  const { allWpBinSize, smallBins, largeBins } = useStaticQuery(query)
  let binSize
  if (binType === "small") {
    binSize = smallBins
  } else if (binType === "large") {
    binSize = largeBins
  } else {
    binSize = allWpBinSize
  }

  //console.log(allWpBinSize)
  return (
    <section
      className={`text-center px-15px skip-bin-sizes ${
        binType === "all" ? "py-20 xl:pt-52 xl:pb-42" : "py-0 xl:py-0"
      } `}
    >
      {title && <h3 className="text-h3-sm lg:text-h3-lg">{title}</h3>}
      {content && (
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="md:max-w-725px lg:mx-auto mt-2.5"
        />
      )}

      <div
        className={`skip-bins-container mt-14 md:grid md:grid-cols-2 md:gap-12 lg:grid-cols-3 xl:mt-11  ${
          page === "calcu" ? "xl:gap-y-44" : "xl:gap-y-17"
        }`}
      >
        {binSize.edges.map(bin => {
          return <EachBin key={bin.id} node={bin.node} extra={extraDiv} />
        })}
      </div>
    </section>
  )
}

export const query = graphql`
  {
    allWpBinSize(sort: { order: ASC, fields: date }) {
      edges {
        node {
          featuredImage {
            node {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(placeholder: TRACED_SVG, quality: 100)
                }
              }
            }
          }
          title
          skipBinSizesFields {
            dimensions
            trailerLoads
            wheelieBins
            price
            alias
          }
          id
        }
      }
    }
    smallBins: allWpBinSize(
      filter: { skipBinSizesFields: { size: { eq: "small" } } }
      sort: { fields: date, order: ASC }
    ) {
      edges {
        node {
          featuredImage {
            node {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(placeholder: TRACED_SVG, quality: 100)
                }
              }
            }
          }
          title
          skipBinSizesFields {
            dimensions
            trailerLoads
            wheelieBins
            price
            alias
          }
          id
        }
      }
    }
    largeBins: allWpBinSize(
      filter: { skipBinSizesFields: { size: { eq: "large" } } }
      sort: { fields: date, order: ASC }
    ) {
      edges {
        node {
          featuredImage {
            node {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(placeholder: TRACED_SVG, quality: 100)
                }
              }
            }
          }
          title
          skipBinSizesFields {
            dimensions
            trailerLoads
            wheelieBins
            price
            alias
          }
          id
        }
      }
    }
  }
`

SkipBinSizes.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  binType: PropTypes.string.isRequired,
  page: PropTypes.string,
}

export default SkipBinSizes
