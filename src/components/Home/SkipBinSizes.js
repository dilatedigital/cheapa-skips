import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import EachBin from "./EachBin"

const SkipBinSizes = ({ title, content }) => {
  const { allWpBinSize } = useStaticQuery(query)
  //console.log(allWpBinSize)
  return (
    <section className="py-20 text-center px-15px skip-bin-sizes lg:py-52">
      <h3 className="text-h3-sm lg:text-h3-lg">{title}</h3>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="md:max-w-725px lg:mx-auto mt-2.5"
      />
      <div className="mt-14">
        {allWpBinSize.edges.map(bin => {
          return <EachBin key={bin.id} node={bin.node} />
        })}
      </div>
    </section>
  )
}

export const query = graphql`
  {
    allWpBinSize {
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
