import React, { useState } from "react"
import { ModalButton, ModalProvider } from './Modal'
import LoremIpsum from './LoremIpsum'
import SampleModal from './SampleModal'

export default () => {
  const [name, setName] = useState(null)
  const handleName = (data) => {
    setName(data.name)
  }

  return (
    <ModalProvider>
      <h1>React Context Modal</h1>
      <p>Here be modals.</p>

      {name && <p>Hi, {name}!</p>}

      <ModalButton content={
        <SampleModal onSubmit={handleName} />
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
}
