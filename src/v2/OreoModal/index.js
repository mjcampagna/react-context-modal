import React, { useContext, useEffect } from 'react'
import { ModalContext } from '../Modal'
import './style.scss'

const OreoModal = ({ children, ...props }) => {
	const { closeModal } = useContext(ModalContext)

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

	const handleSubmit = () => {
		if (props.onSubmit) {
			props.onSubmit()
		}
		handleClose()
	}

	if (!children) {
		return null
	}

	return (
		<>
			<div className="modal-header oreo">
				{props.title}
			</div>
				{children}
			{props.actions && (
				<div className="modal-footer oreo">
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
		</>
	)
}

export default OreoModal
