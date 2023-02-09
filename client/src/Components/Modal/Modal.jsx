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
import { AddIcon } from '@chakra-ui/icons'
import { useAddProductMutation } from '../../apis/api'
const OrderModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState(0)
  const [size, setSizeRoot] = useState([])
  const [color, setColorRoot] = useState([])
  const [addProduct, { error, isLoading, isSuccess,isError }] = useAddProductMutation()
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
    if(name !== '' && phone !== '' && email !== '' && amount !== 0 && size.length > 0 && color.length > 0){
         addProduct({ name: name, phone: phone, email: email, amount: amount,size: size, color: color })
    }
  }
  return (
    <>
      <ButtonGroup colorScheme={'green'} onClick={onOpen} size="sm" isAttached >
        <Button>Add Order</Button>
        <IconButton aria-label="Add to friends" icon={<AddIcon />} />
      </ButtonGroup>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Order</ModalHeader>
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
            <Tags setColorRoot={setColorRoot} setSizeRoot={setSizeRoot}></Tags>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button isLoading={isLoading} onClick={submit} colorScheme="green">
              Process
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default OrderModal

function Tags({ setSizeRoot, setColorRoot }) {
  const [colorArray, setColor] = useState([])
  const [sizeArray, setSize] = useState([])
  useEffect(() => {
    setColorRoot(colorArray)
  }, [colorArray])
  useEffect(() => {
    setSizeRoot(sizeArray)
  }, [sizeArray])
  const sizes = ['Small', 'Medium', 'Large']
  const colors = ['Blue', 'Pink', 'Yellow', 'Red']
  const addColor = (color) => {
    if (colorArray.indexOf(color) === -1) {
      const copy = [...colorArray]
      copy.push(color)
      setColor(copy)
    } else {
      const copy = [...colorArray]
      copy.splice(copy.indexOf(color), 1)
      setColor(copy)
    }
  }
  const addSize = (size) => {
    if (sizeArray.indexOf(size) === -1) {
      const copy = [...sizeArray]
      copy.push(size)
      setSize(copy)
    } else {
      const copy = [...sizeArray]
      copy.splice(copy.indexOf(size), 1)
      setSize(copy)
    }
  }
  return (
    <>
      <FormLabel fontSize={'xs'} mt={2}>
        Size
      </FormLabel>
      <HStack>
        {sizes.map((size, index) => {
          return (
            <Badge
              colorScheme={sizeArray.indexOf(size) !== -1 ? 'gray' : 'gray'}
              onClick={() => addSize(size)}
              variant={sizeArray.indexOf(size) !== -1 ? 'solid' : 'outline'}
              cursor={'pointer'}
              key={index}
            >
              {size}
            </Badge>
          )
        })}
      </HStack>
      <FormLabel fontSize={'xs'} mt={2}>
        Color
      </FormLabel>
      <HStack>
        {colors.map((color, index) => {
          return (
            <Badge
              onClick={() => addColor(color)}
              colorScheme={
                colorArray.indexOf(color) !== -1 ? color.toLowerCase() : 'gray'
              }
              variant={colorArray.indexOf(color) !== -1 ? 'solid' : 'outline'}
              cursor={'pointer'}
              key={index}
            >
              {color}
            </Badge>
          )
        })}
      </HStack>
    </>
  )
}
