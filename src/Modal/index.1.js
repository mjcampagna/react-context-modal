import React, { createContext, useContext, useEffect, useState } from 'react'
import Portal from '../Portal'
import './style.css'

const Modal = ({ children }) => {
	const { closeModal } = useContext(ModalContext)

	useEffect(() => {
		if (children) {
			const originalOverflow = window.getComputedStyle(document.body).overflow
			document.body.style.overflow = 'hidden'
			return () => document.body.style.overflow = originalOverflow
		}
	}, [children])

	const handleClose = () => {
		closeModal()
	}

	if (children) {
		console.log(children.props)
		return (
			<Portal>
				<div className="component-modal">
					<div className="component-modal-background"></div>
					<div className="component-modal-inner">
						<div className="component-modal-exit" onClick={handleClose} />
						<div className="component-modal-card">
							<button className="component-modal-button--close" onClick={handleClose}>
								x
							</button>
							{children}
						</div>
					</div>
				</div>
			</Portal>
		)
	}
	return null
}

const ModalButton = ({ children, content, element = 'button' }) => {
	const { openModal } = useContext(ModalContext)
	const Button = element
	const handleClick = (e) => {
		e.preventDefault()
		openModal(content)
	}
  return (
    <Button
			className="component-modal-button--open"
      onClick={handleClick}
    >
			{children}
    </Button>
  )
}

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
	const [content, setContent] = useState(null)
	const openModal = content => setContent(content)
	const closeModal = () => setContent(null)
	
	return (
		<ModalContext.Provider value={{ openModal, closeModal }}>
			{children}
			<Modal>{content}</Modal>
		</ModalContext.Provider>
	)
}

export { ModalButton, ModalProvider }
