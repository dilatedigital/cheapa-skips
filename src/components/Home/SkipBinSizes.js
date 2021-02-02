import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import EachBin from "./EachBin"

const SkipBinSizes = ({ title, content }) => {
  const { allWpBinSize } = useStaticQuery(query)
  //console.log(allWpBinSize)
  return (
    <section className="py-20 text-center px-15px skip-bin-sizes xl:py-52">
      <h3 className="text-h3-sm lg:text-h3-lg">{title}</h3>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="md:max-w-725px lg:mx-auto mt-2.5"
      />
      <div className="skip-bins-container mt-14 md:grid md:grid-cols-2 md:gap-12 lg:grid-cols-3 xl:mt-11 xl:gap-y-17">
        {allWpBinSize.edges.map(bin => {
          return <EachBin key={bin.id} node={bin.node} />
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
                  gatsbyImageData(placeholder: TRACED_SVG)
                }
              }
            }
          }
          title
          skipBinSizesFields {
            dimensions
            trailerLoads
            wheelieBins
          }
          id
        }
      }
    }
  }
`

SkipBinSizes.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default SkipBinSizes
