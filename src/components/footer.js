import { graphql, Link, useStaticQuery } from "gatsby"
import React, { useContext } from "react"
import Logo from "./Logo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa"
import FooterCol from "./Footer/FooterCol"
import FooterCI from "./Footer/FooterCI"
import { ModalContext } from "../context/ModalContext"
import Modal from "react-modal"
import ModalContents from "./ModalContents"

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(24, 43, 51, 0.9)",
    zIndex: "50",
    overflow: "scroll",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "2px",
    maxWidth: "912px",
    width: "100%",
    minHeight: "500px",
    padding: "60px 0",
  },
}

const Footer = () => {
  const { isModalOpen, closeModal } = useContext(ModalContext)
  const data = useStaticQuery(graphql`
    {
      wp {
        themeFooterSettings {
          siteFooterFields {
            logo1 {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            logo2 {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
          }
        }
        siteGeneralSettings {
          siteSettingsFields {
            address {
              number
              suburb
              postalCode
              googleMapLink
            }
            companyName
            phone
            email
            facebook
            twitter
            youtube
          }
        }
      }
      hireABin: wpMenu(slug: { eq: "hire-a-bin" }) {
        name
        menuItems {
          nodes {
            connectedNode {
              node {
                uri
              }
            }
            label
            id
            url
          }
        }
      }
      company: wpMenu(slug: { eq: "company" }) {
        name
        menuItems {
          nodes {
            connectedNode {
              node {
                uri
              }
            }
            label
            id
            url
          }
        }
      }
    }
  `)

  const logo1ImageData = getImage(
    data.wp.themeFooterSettings.siteFooterFields.logo1.localFile
  )
  const logo2ImageData = getImage(
    data.wp.themeFooterSettings.siteFooterFields.logo2.localFile
  )

  //console.log(data.wp.siteGeneralSettings)

  return (
    <>
      <footer className="mt-auto container-lg px-15px pt-20 lg:pt-26 pb-12 cs-footer">
        <div className="cs-footer-upper">
          <div className="cs-logos">
            <div className="text-center lg:text-left">
              <Logo />
            </div>
            <div className="assocs-logo mt-7 flex md:mx-auto lg:mx-0">
              <div className="assocs-logo--1">
                <GatsbyImage
                  image={logo1ImageData}
                  alt={
                    data.wp.themeFooterSettings.siteFooterFields.logo1.altText
                  }
                />
              </div>
              <div className="assocs-logo--2">
                <GatsbyImage
                  image={logo2ImageData}
                  alt={
                    data.wp.themeFooterSettings.siteFooterFields.logo2.altText
                  }
                />
              </div>
            </div>
          </div>
          <div className="footer-menus mt-4 grid gap-y-4 gap-x-12 grid-cols-2 md:grid-cols-3">
            <FooterCol
              title={data.hireABin.name}
              menuItems={data.hireABin.menuItems}
            />
            <FooterCol
              title={data.company.name}
              menuItems={data.company.menuItems}
            />
            <FooterCol
              title={data.wp.siteGeneralSettings.siteSettingsFields.companyName}
              generalSiteFields={data.wp.siteGeneralSettings.siteSettingsFields}
            />
          </div>
          <FooterCI
            phone={data.wp.siteGeneralSettings.siteSettingsFields.phone}
            email={data.wp.siteGeneralSettings.siteSettingsFields.email}
          />
        </div>
        <div className="cs-footer-lower pt-8 text-center lg:text-left lg:flex lg:items-center lg:justify-between">
          <div className="cs-footer-lower--terms lg:order-2">
            <Link to="/terms-conditions">Terms and Conditions</Link>
          </div>
          <div className="cs-footer-lower--socmed my-8 text-lg flex justify-center lg:order-3">
            {data.wp.siteGeneralSettings.siteSettingsFields.facebook && (
              <a
                href={data.wp.siteGeneralSettings.siteSettingsFields.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            )}
            {data.wp.siteGeneralSettings.siteSettingsFields.twitter && (
              <a
                href={data.wp.siteGeneralSettings.siteSettingsFields.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            )}
            {data.wp.siteGeneralSettings.siteSettingsFields.youtube && (
              <a
                href={data.wp.siteGeneralSettings.siteSettingsFields.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            )}
          </div>
          <div className="cs-footer-lower--copy lg:order-1">
            <p>
              {`© ${new Date().getFullYear()} ${
                data.wp.siteGeneralSettings.siteSettingsFields.companyName
              }. All Rights Reserved.`}
            </p>
          </div>
        </div>
      </footer>
      <Modal
        isOpen={isModalOpen}
        style={modalStyles}
        contentLabel="Book a Bin"
        onRequestClose={closeModal}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
      >
        <ModalContents />
      </Modal>
    </>
  )
}

export default Footer
