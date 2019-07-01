import React, { useState } from "react"
import { ModalButton, ModalProvider } from './Modal'
import LoremIpsum from '../LoremIpsum'
import SampleModal from './SampleModal'
import SwoopModal from './SwoopModal'

export default () => {
  const [name, setName] = useState(null)
  const handleName = (data) => {
    setName(data.name)
  }

  const openModal = (modalName) => {
    switch (modalName) {
      case 'one':
        return (<p>This is Modal One.</p>)
      case 'two':
        return (<p>This is Modal Two.</p>)
      default: null
    }
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
      } style={{ marginRight: 12 }}>
      Open Long Modal
      </ModalButton>

      <ModalButton content={
        <SwoopModal>
          <LoremIpsum length={3} title="Lorem Ipsum ..." />
        </SwoopModal>
      }>
        Swoop Modal
      </ModalButton>

      <div>
        <p>Modals getting content via Switch function:</p>
        <ModalButton content={() => openModal('one')} style={{ marginRight: 12 }}>One</ModalButton>
        <ModalButton content={() => openModal('two')}>Two</ModalButton>
      </div>

    </ModalProvider>
  )
}
