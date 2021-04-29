import React, { useContext } from "react"
import ContactForm5 from "./Forms/ContactForm5"
import { ModalContext } from "../context/ModalContext"
import Close from "../images/ios-close.svg"

const ModalContents = () => {
  const { modalTitle, closeModal } = useContext(ModalContext)

  return (
    <div className="cs-home-form modal-content">
      <div className="modal-content__text">
        <h2>{`Book a ${modalTitle == null ? "bin" : modalTitle}`}</h2>
        <p>Fill out the form below to place a booking for a skip bin.</p>
      </div>

      <ContactForm5 isModal={true} />
      <Close className="close-modal" onClick={closeModal} />
    </div>
  )
}

export default ModalContents
