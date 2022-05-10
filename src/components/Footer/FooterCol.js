import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const FooterCol = ({ title, menuItems, generalSiteFields }) => {
  let menuItemsLen
  //console.log(generalSiteFields)
  if (menuItems) {
    menuItemsLen = menuItems.nodes.length
  }
  console.log(menuItems)

  return (
    <div className="mt-8 lg:mt-0">
      <h5 className="mb-6 font-bold">{title}</h5>
      <ul>
        {menuItemsLen &&
          menuItems.nodes.map((menuItem, i) => {
            return (
              <li
                key={menuItem.id}
                className={menuItemsLen === i + 1 ? "mb-0" : "mb-4"}
              >
                {menuItem.connectedNode.node ? (
                  <Link to={menuItem.connectedNode.node.uri}>
                    {menuItem.label}
                  </Link>
                ) : (
                  <a href={menuItem.url}>{menuItem.label}</a>
                )}
              </li>
            )
          })}

        {generalSiteFields && generalSiteFields.address && (
          <li>
            <a
              href={generalSiteFields.address.googleMapLink}
              target="_blank"
              rel="noreferrer"
            >
              {generalSiteFields.address.number}
              <br />
              {`${generalSiteFields.address.suburb}, ${generalSiteFields.address.postalCode}`}
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}

FooterCol.propTypes = {
  title: PropTypes.string.isRequired,
  menuItems: PropTypes.object,
  generalSiteFields: PropTypes.object,
}

export default FooterCol
