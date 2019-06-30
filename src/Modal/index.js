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

	useEffect(() => {
		if (children.props.afterOpen) {
			children.props.afterOpen()
		}
	}, [])

	const handleClose = () => {
		if (children.props.beforeClose) {
			children.props.beforeClose()
		}
		closeModal()
		if (children.props.afterClose) {
			children.props.afterClose()
		}
	}

	const handleCancel = () => {
		if (children.props.onCancel) {
			children.props.onCancel()
		}
		handleClose()
	}
	const handleSubmit = () => {
		if (children.props.onSubmit) {
			children.props.onSubmit()
		}
		handleClose()
	}

	if (!children) {
		return null
	}

	return (
		<Portal id="modals">
			<div className="component-modal">
				<div className="component-modal-background"></div>
				<div className="component-modal-inner">
					<div className="component-modal-exit" onClick={children.props.closeOnOutsideClick ? handleClose : undefined} />
					<div className="component-modal-card">
						{children}
						{children.props.modalActions && (
							<div className="component-modal-actions">
								{children.props.modalActions.map(action => {
									if (action === 'cancel') {
										return <button
											className="component-modal-button--cancel"
											key="modal-button--cancel"
											onClick={handleCancel}>
												{children.props.onCancelLabel || 'Cancel'}
											</button>
									} else
									if (action === 'submit') {
										return <button
											className="component-modal-button--submit"
											key="modal-button--submit"
											onClick={handleSubmit}>
												{children.props.onSubmitLabel || 'Submit'}
											</button>
									} else {
										return action
									}
								})}
							</div>
						)}
						<button className="component-modal-button--close" onClick={handleClose}>
							x
						</button>
					</div>
				</div>
			</div>
		</Portal>
	)
}

const ModalButton = ({ children, content, element = 'button' }) => {
	const { openModal } = useContext(ModalContext)
	const Button = element
	const handleClick = (e) => {
		e.preventDefault()
		if (content.props.beforeOpen) {
			content.props.beforeOpen()
		}
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
	const [modals, setModals] = useState([])
	const createRandomId = () => '_' + Math.random().toString(36).substr(2, 9)
	const openModal = nextModal => setModals([...modals, [createRandomId(), nextModal]])
	const closeModal = () => setModals([...modals.slice(0, -1)])
	
	return (
		<ModalContext.Provider value={{ openModal, closeModal }}>
			{children}
			{modals.map(modal => (
				<Modal key={modal[0]}>{modal[1]}</Modal>
			))}
		</ModalContext.Provider>
	)
}

export { ModalButton, ModalProvider }
