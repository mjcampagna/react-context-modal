import React, { createContext, Fragment, useContext, useEffect, useState } from 'react'
import Portal from '../../Portal'
import './style.scss'

const Modal = ({ children, className, ...props }) => {
	const { closeModal } = useContext(ModalContext)

	useEffect(() => {
		if (children) {
			const originalOverflow = window.getComputedStyle(document.body).overflow
			document.body.style.overflow = 'hidden'
			return () => document.body.style.overflow = originalOverflow
		}
	}, [children])

	useEffect(() => {
		window.addEventListener('keydown', handleEsc)
		return () => window.removeEventListener('keydown', handleEsc)
	}, [])

	useEffect(() => {
		if (props.afterOpen) {
			props.afterOpen()
		}
	}, [])

	const handleCancel = () => {
		if (props.onCancel) {
			props.onCancel()
		}
		handleClose()
	}

	const handleClose = () => {
		if (props.beforeClose) {
			props.beforeClose()
		}
		closeModal()
		if (props.afterClose) {
			props.afterClose()
		}
	}

	const handleEsc = (e) => {
		if (e.key === 'Escape') {
			e.preventDefault()
			handleCancel()
		}
	}

	const handleSubmit = async () => {
		let result = true
		try {
			if (props.onSubmit) {
				result = await props.onSubmit()
			}	
		}
		catch(error) {
			console.error(error)
		}
		finally {
			if (result !== false) {
				handleClose()
			}
		}
	}

	if (!children) {
		return null
	}

	return (
		<div
			className={
				['component-modal', className].filter(el => el != null).join(' ')
			}
		>
			<div className="modal-background"></div>
			<div className="modal-inner">
				<div
					className="modal-exit"
					onClick={props.closeOnOutsideClick ? handleClose : undefined}
				/>
				<div className="modal-card">
					{props.title && (
						<div className="modal-header">
							{props.title}
						</div>
					)}

					<div className="modal-main">
						{children}
					</div>

					{props.actions && (
						<div className="modal-footer">
							{props.actions.map(action => {
								if (action === 'cancel') {
									return <button
										className="modal-button--cancel"
										key="modal-button--cancel"
										onClick={handleCancel}>
											{props.onCancelLabel || 'Cancel'}
										</button>
								} else
								if (action === 'submit') {
									return <button
										className="modal-button--submit"
										key="modal-button--submit"
										onClick={handleSubmit}>
											{props.onSubmitLabel || 'Submit'}
										</button>
								} else {
									return action
								}
							})}
						</div>
					)}

					<button className="modal-button--close" onClick={handleClose}>
						<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" fill="currentColor" /></svg>
					</button>
				</div>
			</div>
		</div>
	)
}

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
	const [modals, setModals] = useState([])
	const closeModal = () => setModals([...modals.slice(0, -1)])
	const createRandomId = () => '_' + Math.random().toString(36).substr(2, 9)
	const openModal = nextModal => setModals([...modals, [createRandomId(), nextModal]])

	return (
		<ModalContext.Provider value={{ openModal, closeModal }}>
			{children}
			{modals.map(modal => (
				<Portal id="modals" key={modal[0]}>
					{modal[1]}
				</Portal>
			))}
		</ModalContext.Provider>
	)
}

export { Modal, ModalContext, ModalProvider }
