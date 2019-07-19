import React, { useContext, useEffect } from 'react'
import { Modal } from '../Modal'
import './style.scss'

const OreoModal = ({ children, ...props }) => {
	return (
		<Modal className="oreo" {...props}>
			{children}
		</Modal>
	)
}

export default OreoModal
