import React, { useEffect, useRef, useState } from 'react'
import LoremIpsum from '../../LoremIpsum'
import './style.scss'

const ModalFooter = (props) => {
	return (
		<footer className="component-modal-footer">
			Footer
		</footer>
	)
}

const ModalHeader = (props) => {
	return (
		<header className="component-modal-header">
			{props.title}
		</header>
	)
}

const SwoopModal = ({ children, ...props}) => {
	const childProps = children.props
	return (
		<>
			<ModalHeader
				title={childProps.title}
			/>
			{children}
			<ModalFooter
				actions={[
					'cancel',
					'submit',
				]}
			/>
		</>
	)
}

SwoopModal.defaultProps = {
	closeOnOutsideClick: false,
	// modalActions: [
	// 	'cancel',
	// 	<EmbeddedModal key="extra" />,
	// 	'submit',
	// ],
	onCancel: () => console.log('Modal canceled'),
	onCancelLabel: 'Cancel',
	onSubmit: (data) => console.log('Modal submitted', data),
	onSubmitLabel: 'Submit',
}

export default SwoopModal
