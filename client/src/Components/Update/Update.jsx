import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  FormLabel,
  Input,
  HStack,
  Badge,
  ButtonGroup,
  IconButton,
  Box,
  color,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { useAddProductMutation, useUpdateProductMutation } from '../../apis/api'
const Update = ({aname,aphone,aemail,aamount,id}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState(aname)
  const [phone, setPhone] = useState(aphone)
  const [email, setEmail] = useState(aemail)
  const [amount, setAmount] = useState(aamount)
  const [updateProduct, { error, isLoading,isError }] = useUpdateProductMutation()
  const inputs = [
    {
      name: 'Name',
      placeholder: 'enter your name',
      update: setName,
      value: name,
    },
    {
      name: 'Phone',
      placeholder: 'enter your phone',
      update: setPhone,
      value: phone,
    },
    {
      name: 'Email',
      placeholder: 'mail@example.com',
      update: setEmail,
      value: email,
    },
    {
      name: 'Amount',
      placeholder: '0.00',
      update: setAmount,
      value: amount,
    },
  ]
  const submit = () => {
    if(name !== '' && phone !== '' && email !== '' && amount !== 0 && id >= 0){
         updateProduct({ name: name, phone: phone, email: email, amount: amount,id:id})
    }
  }
  return (
    <>
      <Badge colorScheme={'blue'} onClick={onOpen} cursor={'pointer'}>Edit</Badge>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Order #{id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isError && error && <Alert status='error' ><AlertIcon />{error.data.data}</Alert>}
            {inputs.map(({ name, placeholder, update, value }, i) => {
              return (
                <Box key={i}>
                  <FormLabel fontSize={'xs'} mt={2}>
                    {name}
                  </FormLabel>
                  <Input
                    value={value}
                    onChange={(e) => {
                      update(e.target.value)
                    }}
                    placeholder={placeholder}
                  ></Input>
                </Box>
              )
            })}

          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button isLoading={isLoading} onClick={submit} colorScheme="green">
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Update

