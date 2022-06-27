import { graphql, useStaticQuery } from "gatsby"
import React, { useContext, useEffect, useState } from "react"
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
            bookNowButtonLink {
              ... on WpPage {
                uri
              }
            }
          }
        }
      }
    }
  `)

  const [offset, setOffset] = useState(0)
  const [stickyClass, setStickyClass] = useState("")

  const { toggleMenu, closeMenu } = useContext(MenuContext)

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.onscroll = () => {
        setOffset(window.pageYOffset)
      }
    }
  }, [])

  //console.log(offset)

  offset > 200 ? setStickyClass("sticky-nav") : setStickyClass("")

  return (
    <>
      <header
        className={`container-lg flex items-center pt-4 lg:pt-9 cs-header ${stickyClass}`}
      >
        <div className="max-w-logo-sm lg:max-w-full mr-auto xl:mr-0 cs-logo">
          <Logo closeMenu={closeMenu} />
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
            wp.siteGeneralSettings.siteSettingsFields.bookNowButtonLink.uri
              ? wp.siteGeneralSettings.siteSettingsFields.bookNowButtonLink.uri
              : "/contact/"
          }
          outline={false}
          text="Book a Bin"
        />
        <MobileMenu menu={wpMenu} />
      </header>
    </>
  )
}

export default Header
