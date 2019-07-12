import React, { useContext, useEffect, useState } from 'react'
import LoremIpsum from '../../LoremIpsum'
import { Modal, ModalContext } from '../Modal'
import OreoModal from '../OreoModal'

const SimpleModal = (props) => {
	return (
		<Modal
			closeOnOutsideClick
		>
			<LoremIpsum length={2} />
		</Modal>
	)
}

const ActionModal = (props) => {
	const { openModal } = useContext(ModalContext)
	const afterOpen = () => console.log('Fired after open.')
	const beforeClose = () => console.log('Fired before close.')
	const afterClose = () => console.log('Fired after close.')
	const onCancel = () => console.log('Modal canceled')
	const onSubmit = () => console.log('Modal submitted')

	return (
		<Modal
			actions={[
				'cancel',
				'submit',
			]}
			afterClose={afterClose}
			afterOpen={afterOpen}
			beforeClose={beforeClose}
			closeOnOutsideClick
			onCancel={onCancel}
			onCancelLabel="Cancel"
			onSubmit={onSubmit}
			onSubmitLabel="Submit"
			title="Lorem Ipsum"
		>
			<LoremIpsum length={3} />
			<button onClick={() => openModal(ModalDictionary('simple'))}>Simple Modal</button>
		</Modal>
	)
}

const ActionOreoModal = (props) => {
	const afterOpen = () => console.log('Fired after open.')
	const beforeClose = () => console.log('Fired before close.')
	const afterClose = () => console.log('Fired after close.')
	const onCancel = () => console.log('Modal canceled')
	const onSubmit = () => console.log('Modal submitted')

	return (
		<OreoModal
			actions={[
				'cancel',
				'submit',
			]}
			afterClose={afterClose}
			afterOpen={afterOpen}
			beforeClose={beforeClose}
			closeOnOutsideClick
			onCancel={onCancel}
			onCancelLabel="Cancel"
			onSubmit={onSubmit}
			onSubmitLabel="Submit"
			title="Lorem Ipsum"
		>
			<LoremIpsum length={3} />
		</OreoModal>
	)
}

const ModalDictionary = (modal) => {
	switch(modal) {
		case 'simple': {
			return <SimpleModal />
		}

		case 'action': {
			return <ActionModal />
		}

		case 'oreo': {
			return <ActionOreoModal />
		}

		default: {
			return null
		}
	}
}

export default ModalDictionary
