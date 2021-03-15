import React, { useState, createContext } from "react"

export const ModalContext = createContext({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  modalTitle: null,
  setTitle: () => {},
  binSize: null,
  setSize: () => {},
})

export default props => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState(null)
  const [binSize, setBinSize] = useState(null)

  function openModal() {
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  function setTitle(title) {
    setModalTitle(title)
  }

  function setSize(size) {
    setBinSize(size)
  }

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        isModalOpen,
        modalTitle,
        setTitle,
        binSize,
        setSize,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  )
}
