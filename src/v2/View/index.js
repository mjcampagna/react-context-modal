import React, { useContext } from 'react'
import { ModalContext } from '../Modal'
import ModalDictionary from '../ModalDictionary'

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

	return (
		<>
			<h1>React Context Modal</h1>
			<p>Here be modals.</p>

			<button onClick={handleSimpleModal}>Simple Modal</button>
			<button onClick={handleActionModal}>Action Modal</button>
			<button onClick={handleOreoModal}>Oreo Modal</button>
		</>
	)
}

export default View
