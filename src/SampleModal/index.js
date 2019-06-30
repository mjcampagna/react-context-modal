import React, { useEffect, useRef, useState } from 'react'
import { ModalButton } from '../Modal'

const EmbeddedModal = (props) => {
	return (
		<ModalButton content={
			<p>This is a layered modal.</p>
		}>
			Another Modal
		</ModalButton>
	)
}

const SampleModal = (props) => {
	const [name, setName] = useState('')

	const handleChange = e => setName(e.target.value)

	useEffect(() => {
		props.passBack({
			name,
		})
	}, [name])

	return (
		<>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis lacus purus. Phasellus vitae lobortis nulla. Sed non porttitor risus. Proin at neque sed metus finibus sodales sed non arcu. Nulla at enim vulputate, consectetur nibh ac, maximus turpis. Mauris convallis lectus in purus auctor faucibus. Sed tincidunt, eros eget tempor convallis, lorem felis volutpat magna, suscipit vehicula tellus ipsum in ligula. Maecenas placerat scelerisque libero sit amet feugiat. In hac habitasse platea dictumst. Ut sit amet mauris et mauris aliquam vehicula sed at nunc.</p>

			<label style={{ display: 'block' }}>Your Name:</label>
			<input onChange={handleChange} type="text"></input>
		</>
	)
}

SampleModal.defaultProps = {
	beforeOpen: () => console.log('Fired before open.'),
	afterOpen: () => console.log('Fired after open.'),
	beforeClose: () => console.log('Fired before close.'),
	afterClose: () => console.log('Fired after close.'),
	closeOnOutsideClick: false,
	modalActions: [
		'cancel',
		<EmbeddedModal key="extra" />,
		'submit',
	],
	onCancel: () => console.log('Modal canceled'),
	onCancelLabel: 'Cancel',
	onSubmit: (data) => console.log('Modal submitted', data),
	onSubmitLabel: 'Submit',
}

export default SampleModal
