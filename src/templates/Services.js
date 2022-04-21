import React, { useState, useMemo } from "react"
import { graphql } from "gatsby"
import InnerBanner from "../components/Residential/InnerBanner"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AboutOfferSection from "../components/About/AboutOfferSection"
import SearchForm from "../components/Forms/SearchForm"
import { ApolloProvider } from "@apollo/client"
import { client } from "../services/apollo"
import { debounce } from "lodash"
import PostCodeLists from "../components/PostCodeList"

const Services = ({ data: { wpPage } }) => {
  const [searchTerm, setSearchTerm] = useState(null)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  const setDebouncedSearchTermMemoized = useMemo(
    () => debounce(setDebouncedSearchTerm, 300),
    []
  )

  function handleSearchTermChange(newSearchTerm) {
    setSearchTerm(newSearchTerm)
  }

  function handleSubmit(e) {
    e.preventDefault()
    //console.log(searchTerm)
    setDebouncedSearchTermMemoized(searchTerm)
  }

  return (
    <Layout>
      <SEO
        title={wpPage.seo.title}
        description={wpPage.seo.metaDesc}
        image={
          wpPage.seo.opengraphImage
            ? wpPage.seo.opengraphImage.localFile.publicURL
            : null
        }
      />
      <InnerBanner
        title={wpPage.title}
        content={wpPage.content}
        image={wpPage.featuredImage}
        showBanner={false}
      />
      {/* <AboutOfferSection
        content={wpPage.servicesPageFields.afterBannerContent}
      /> */}
      <ApolloProvider client={client}>
        <SearchForm
          searchTerm={searchTerm}
          handleSearchTermChange={handleSearchTermChange}
          handleSubmit={handleSubmit}
        />
        <div className="relative">
          <PostCodeLists searchTerm={debouncedSearchTerm} />
        </div>
      </ApolloProvider>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      content
      seo {
        metaDesc
        title
        opengraphImage {
          localFile {
            publicURL
          }
        }
      }
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100)
            }
          }
        }
      }
      servicesPageFields {
        afterBannerContent
      }
    }
  }
`

export default Services
