import React, { createContext, useContext, useEffect, useState } from 'react'
import Portal from '../Portal'
import './style.scss'

const Modal = ({ children, ...props }) => {
	const { closeModal } = useContext(ModalContext)
	const [passedBackData, setPassedBackData] = useState({})
	const childProps = children.props

	useEffect(() => {
		if (children) {
			const originalOverflow = window.getComputedStyle(document.body).overflow
			document.body.style.overflow = 'hidden'
			return () => document.body.style.overflow = originalOverflow
		}
	}, [children])

	useEffect(() => {
		console.log('Passed back', passedBackData)
	}, [passedBackData])

	useEffect(() => {
		window.addEventListener('keydown', handleEsc)
		return () => window.removeEventListener('keydown', handleEsc)
	}, [])

	useEffect(() => {
		if (childProps.afterOpen) {
			childProps.afterOpen(passedBackData)
		}
	}, [])

	const handleClose = () => {
		if (childProps.beforeClose) {
			childProps.beforeClose(passedBackData)
		}
		closeModal()
		if (childProps.afterClose) {
			childProps.afterClose(passedBackData)
		}
	}

	const handleCancel = () => {
		if (childProps.onCancel) {
			childProps.onCancel(passedBackData)
		}
		handleClose()
	}

	const handleEsc = (e) => {
		if (e.key === 'Escape') {
			e.preventDefault()
			handleCancel()
		}
	}

	const handleSubmit = () => {
		if (childProps.onSubmit) {
			childProps.onSubmit(passedBackData)
		}
		handleClose()
	}

	if (!children) {
		return null
	}

	const childrenWithProps = React.Children.map(children, child => {
		if (typeof child.type === 'string') {
			return child
		}
		return React.cloneElement(child, { passBack: setPassedBackData })
	})

	return (
		<Portal id="modals">
			<div className="component-modal">
				<div className="modal-background"></div>
				<div className="modal-inner">
					<div className="modal-exit" onClick={childProps.closeOnOutsideClick ? handleClose : undefined} />
					<div className="modal-card">
						{childrenWithProps}
						{childProps.modalActions && (
							<div className="modal-actions">
								{childProps.modalActions.map(action => {
									if (action === 'cancel') {
										return <button
											className="modal-button--cancel"
											key="modal-button--cancel"
											onClick={handleCancel}>
												{childProps.onCancelLabel || 'Cancel'}
											</button>
									} else
									if (action === 'submit') {
										return <button
											className="modal-button--submit"
											key="modal-button--submit"
											onClick={handleSubmit}>
												{childProps.onSubmitLabel || 'Submit'}
											</button>
									} else {
										return action
									}
								})}
							</div>
						)}
						<button className="modal-button--close" onClick={handleClose}>
							<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" fill="#333" /></svg>
						</button>
					</div>
				</div>
			</div>
		</Portal>
	)
}

const ModalButton = ({ children, className, content, element = 'button', style }) => {
	const { openModal } = useContext(ModalContext)
	const Button = element
	const handleClick = (e) => {
		e.preventDefault()
		if (content.props && content.props.beforeOpen) {
			content.props.beforeOpen()
		}
		openModal(content)
	}
  return (
    <Button
			className={
				['component-modal-button--open', className].filter(el => el != null).join(' ')
			}
			onClick={handleClick}
			style={{ ...style }}
    >
			{children}
    </Button>
  )
}

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
	const [modals, setModals] = useState([])
	const createRandomId = () => '_' + Math.random().toString(36).substr(2, 9)
	const openModal = nextModal => {
		if (typeof nextModal === 'function') {
			return setModals([...modals, [createRandomId(), nextModal()]])
		} else {
			return setModals([...modals, [createRandomId(), nextModal]])
		}
	}
	// const openModal = nextModal => setModals([...modals, [createRandomId(), nextModal]])
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
