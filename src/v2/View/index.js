import React, { useContext } from 'react'
import { ModalContext } from '../Modal'
import ModalDictionary from '../ModalDictionary'
import OreoModal from '../OreoModal'

const StandaloneModal = (props) => {
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
			title="Standalone Modal"
		>
			<p>This modal opens without going through ModalDictionary.</p>
		</OreoModal>
	)
}

const View = (props) => {
	const { openModal } = useContext(ModalContext)

	const handleSimpleModal = (e) => {
    return openModal(ModalDictionary('simple'))
  }

	const handleActionModal = (e) => {
    return openModal(ModalDictionary('action'))
  }

	const handleOreoModal = (e) => {
    return openModal(ModalDictionary('oreo'))
  }

	const handleStandaloneModal = (e) => {
    return openModal(<StandaloneModal />)
  }

	return (
		<>
			<h1>React Context Modal</h1>
			<p>Here be modals.</p>

			<button onClick={handleSimpleModal}>Simple Modal</button>
			<button onClick={handleActionModal}>Action Modal</button>
			<button onClick={handleOreoModal}>Oreo Modal</button>
			<button onClick={handleStandaloneModal}>Standalone Modal</button>
		</>
	)
}

export default View
