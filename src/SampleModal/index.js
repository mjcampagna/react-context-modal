import React from 'react'
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
	return (
		<>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis lacus purus. Phasellus vitae lobortis nulla. Sed non porttitor risus. Proin at neque sed metus finibus sodales sed non arcu. Nulla at enim vulputate, consectetur nibh ac, maximus turpis. Mauris convallis lectus in purus auctor faucibus. Sed tincidunt, eros eget tempor convallis, lorem felis volutpat magna, suscipit vehicula tellus ipsum in ligula. Maecenas placerat scelerisque libero sit amet feugiat. In hac habitasse platea dictumst. Ut sit amet mauris et mauris aliquam vehicula sed at nunc.</p>
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
	onSubmit: () => console.log('Modal submitted'),
	onSubmitLabel: 'Submit',
}

export default SampleModal
