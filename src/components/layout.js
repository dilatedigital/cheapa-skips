import React, { useContext } from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import { MenuContext } from "../context/MenuContext"
import Helmet from "react-helmet"

const Layout = ({ children }) => {
  const { isMenuOpen, isModalOpen } = useContext(MenuContext)
  return (
    <>
      <Helmet
        bodyAttributes={{ class: isMenuOpen || isModalOpen ? "menu-open" : "" }}
      >
        <meta
          name="google-site-verification"
          content="wieiCCQO9kfBI80J_hURjrC0B-Hx0qFh3WDFeD_ss6A"
        />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
