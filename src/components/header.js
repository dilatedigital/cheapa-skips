import { graphql, useStaticQuery } from "gatsby"
import React, { useContext } from "react"
import Logo from "./Logo"
import Menu from "./Menu"
import Phone from "../images/phone-call.svg"
import Button from "./Button"
import Burger from "../images/burger.svg"
import { MenuContext } from "../context/MenuContext"
import MobileMenu from "./Menu/MobileMenu"

const Header = () => {
  const { wpMenu, wp } = useStaticQuery(graphql`
    {
      wpMenu(slug: { eq: "main-menu" }) {
        menuItems {
          nodes {
            key: id
            title: label
            connectedNode {
              node {
                uri
              }
            }
            parentId
            url
          }
        }
      }
      wp {
        siteGeneralSettings {
          siteSettingsFields {
            phone
            book_now_button_link {
              ... on WpPage {
                uri
              }
            }
          }
        }
      }
    }
  `)

  const { toggleMenu } = useContext(MenuContext)

  return (
    <header className="container-lg flex items-center pt-4 lg:pt-9 cs-header">
      <div className="max-w-logo-sm lg:max-w-full mr-auto xl:mr-0 cs-logo">
        <Logo />
      </div>

      <Menu menu={wpMenu} />
      <div className="mr-8">
        <a
          href={`tel:${wp.siteGeneralSettings.siteSettingsFields.phone}`}
          className="text-phone-header text-primary font-bold flex items-center"
        >
          <Phone className="mr-3" />
          {wp.siteGeneralSettings.siteSettingsFields.phone}
        </a>
      </div>
      <button
        onClick={toggleMenu}
        aria-label="Open Mobile Menu"
        className="menu-btn xl:hidden"
      >
        <Burger className="fill-current text-white" />
      </button>
      <Button
        link={
          wp.siteGeneralSettings.siteSettingsFields.book_now_button_link
            ? wp.siteGeneralSettings.siteSettingsFields.book_now_button_link
            : "/contact/"
        }
        outline={false}
        text="Book a Bin"
      />
      <MobileMenu menu={wpMenu} />
    </header>
  )
}

export default Header
