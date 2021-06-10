import React, { useContext, useState } from "react"
import PropTypes from "prop-types"
import { flatListToHierarchical } from "../../utils/flatListToHierarchical"
import { MenuContext } from "../../context/MenuContext"
import Close from "../../images/close.svg"
import MobileMenuLi from "./MobileMenuLi"

const MobileMenu = ({ menu }) => {
  const menuItems = flatListToHierarchical(menu.menuItems.nodes)

  menuItems.forEach((menuItem, index) => {
    menuItem.id = index
  })

  const [active, setActive] = useState(new Array(menuItems.length).fill(false))

  const { isMenuOpen, toggleMenu } = useContext(MenuContext)

  return (
    <div
      className={`mobile-menu-container ${
        isMenuOpen ? "mobile-menu-active" : "mobile-menu-inactive"
      }`}
    >
      <div className="close-btn-container">
        <button onClick={toggleMenu} aria-label="Close">
          <Close />
        </button>
      </div>
      <ul className="mobile-menu-ul">
        {menuItems.map(menuItem => {
          return (
            <MobileMenuLi
              key={menuItem.key}
              menuItem={menuItem}
              toggleMenu={toggleMenu}
              onClick={setActive}
              isOpen={active[menuItem.id]}
              totalMenuItems={menuItems.length}
            />
          )
        })}
      </ul>
    </div>
  )
}

MobileMenu.propTypes = {
  menu: PropTypes.object.isRequired,
}

export default MobileMenu
