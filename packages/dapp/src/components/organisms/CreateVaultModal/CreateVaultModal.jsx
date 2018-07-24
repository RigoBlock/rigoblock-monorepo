import CreateVaultForm from '../CreateVaultForm'
import React from 'react'
import Tab from '../../molecules/Tab'
import Title from '../../atoms/Title'

const header = () => <Title>Create Vault</Title>
const forms = [CreateVaultForm]

const CreateVaultModal = () => <Tab Header={header} forms={forms} />

export default CreateVaultModal
