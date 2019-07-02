import React, { useContext, useState } from "react"
import { ModalContext, ModalProvider } from './Modal'
import ModalDictionary from './ModalDictionary'
import View from './View'

export default () => {
  return (
    <ModalProvider>
      <View />
    </ModalProvider>
  )
}
