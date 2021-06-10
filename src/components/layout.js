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
      />
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
