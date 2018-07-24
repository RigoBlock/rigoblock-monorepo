import CreateVaultForm from '../CreateVaultForm'
import FormModal from '../../molecules/FormModal'
import React from 'react'
import Title from '../../atoms/Title'

const header = () => <Title>Create Vault</Title>
const form = () => <CreateVaultForm />

const CreateVaultModal = () => <FormModal Header={header} Form={form} />

export default CreateVaultModal
