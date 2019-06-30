import React from "react"
import { ModalButton, ModalProvider } from './Modal'
import LoremIpsum from './LoremIpsum'
import SampleModal from './SampleModal'

export default () => (
  <ModalProvider>
    <h1>React Context Modal</h1>
    <p>Here be modals.</p>

    <ModalButton content={
      <SampleModal />
    } style={{ marginRight: 12 }}>
      Open SampleModal
    </ModalButton>

    <ModalButton content={
      <LoremIpsum length={10} />
    }>
      Open Long Modal
    </ModalButton>

  </ModalProvider>
)
