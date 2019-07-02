import React, { useContext, useEffect, useState } from 'react'
import LoremIpsum from '../../LoremIpsum'
import { Modal } from '../Modal'
import OreoModal from '../OreoModal'

const SimpleModal = (props) => {
	return (
		<Modal
			closeOnOutsideClick
		>
			<LoremIpsum length={3} />
		</Modal>
	)
}

const ActionModal = (props) => {
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
		<Modal
			closeOnOutsideClick
		>
			<OreoModal
				actions={[
					'cancel',
					'submit',
				]}
				afterClose={afterClose}
				afterOpen={afterOpen}
				beforeClose={beforeClose}
				onCancel={onCancel}
				onCancelLabel="Cancel"
				onSubmit={onSubmit}
				onSubmitLabel="Submit"
				title="Lorem Ipsum"
			>
				<LoremIpsum length={3} />
			</OreoModal>
		</Modal>
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
