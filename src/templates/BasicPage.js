import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"

const BasicPage = ({
  data: {
    wpPage: { title, content },
  },
}) => {
  return (
    <Layout>
      <div className="container mx-auto mt-8 h-screen">
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      title
      content
    }
  }
`

export default BasicPage
