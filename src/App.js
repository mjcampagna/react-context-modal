import React from "react"
import { ModalButton, ModalProvider } from './Modal'
import SampleModal from './SampleModal'

export default () => (
  <ModalProvider>
    <h1>React Context Modal</h1>
    <p>Here be modals.</p>

    <ModalButton content={
      <SampleModal />
    }>
      Open SampleModal
    </ModalButton>

  </ModalProvider>
)
