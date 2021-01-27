import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Logo from "./Logo"
import Menu from "./Menu"
import Phone from "../images/phone-call.svg"
import Button from "./Button"

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
          }
        }
      }
    }
  `)

  return (
    <header className="container-lg flex items-center pt-9 cs-header">
      <Logo />
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
      <Button link="/" outline={false} text="Book a Bin" />
    </header>
  )
}

export default Header
