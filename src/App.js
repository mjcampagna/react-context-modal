import React from "react"
import { ModalButton, ModalProvider } from './Modal'
import SampleModal from './SampleModal'

export default () => (
  <ModalProvider>
    <h1>Welcome to React Parcel Micro App!</h1>
    <p>Hard to get more minimal than this React app.</p>

    <ModalButton content={
      <SampleModal />
    }>
      Open SampleModal
    </ModalButton>

  </ModalProvider>
)
