import React from "react"
import PropTypes from "prop-types"
import { flatListToHierarchical } from "../utils/flatListToHierarchical"
import UniversalLink from "../utils/UniversalLink"
import ChevronDown from "../images/arrow-down.svg"

const Menu = ({ menu }) => {
  const menuItems = flatListToHierarchical(menu.menuItems.nodes)
  return (
    <ul className="hidden xl:flex menu max-w-menu-desktop w-full justify-between mr-auto">
      {menuItems.map(menuItem => {
        return (
          <li key={menuItem.key} className="flex items-center main-menu-item">
            <UniversalLink
              to={
                menuItem.connectedNode
                  ? menuItem.connectedNode.node.uri
                  : menuItem.url
              }
              className="text text-dark-green text-menu-item"
            >
              {menuItem.title}
            </UniversalLink>
            {menuItem.children.length > 0 && <ChevronDown className="ml-2" />}
            {menuItem.children.length > 0 && (
              <ul className="hidden submenu absolute bg-white shadow-2xl transition-all py-4 rounded-lg">
                {menuItem.children.map(subItem => {
                  return (
                    <li
                      key={subItem.key}
                      className="py-2 px-4 w-full hover:bg-light-grey"
                    >
                      <UniversalLink
                        to={
                          subItem.connectedNode
                            ? subItem.connectedNode.node.uri
                            : subItem.url
                        }
                      >
                        {subItem.title}
                      </UniversalLink>
                    </li>
                  )
                })}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}

Menu.propTypes = {
  menu: PropTypes.object.isRequired,
}

export default Menu
