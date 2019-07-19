import React, { useContext, useEffect } from 'react'
import { Modal } from '../Modal'
import './style.scss'

const OreoModal = ({ children, ...props }) => (
  <Modal className="oreo" {...props}>
    {children}
  </Modal>
)

export default OreoModal
