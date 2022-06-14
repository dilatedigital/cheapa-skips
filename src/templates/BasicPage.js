import { graphql } from "gatsby"
import React from "react"
import ContactForm6 from "../components/Forms/ContactForm6"
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
      <div className="h-screen">
        <h4>Cheapa SKips</h4>
      </div>
      <ContactForm6 />
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
