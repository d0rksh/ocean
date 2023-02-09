import React from 'react'
import {
  TableContainer,
  Table,
  Tr,
  Td,
  Th,
  Text,
  Tbody,
  Thead,
  Card,
  CircularProgress,
  Center,
  HStack,
  Badge,
  Avatar,
  VStack,
  Heading,
} from '@chakra-ui/react'
import {
  useDeleteProductsMutation,
  useFetchProductsQuery,
} from '../../apis/api'
import Update from '../Update/Update'

const OrderTable = (props) => {
  const { isLoading, data, error, isSuccess } = useFetchProductsQuery()
  const [deleteProduct, {}] = useDeleteProductsMutation()
  return (
    <Card mt={5}>
      <TableContainer >
        <Table color={'gray.800'}>
          <Thead background={'gray.200'}>
            <Tr>
              <Th>S.No</Th>
              <Th>Colour</Th>
              <Th>Size</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isSuccess && data.data.length
              ? data.data.map((item) => {
                  return (
                    <Tr key={item.id}>
                      <Td>
                        <Badge>{item.id}</Badge>
                      </Td>
                      <Td>{item.color}</Td>
                      <Td>{item.size}</Td>
                      <Td>
                        <HStack>
                          <Badge cursor={'pointer'}>
                            <Update
                              id={item.id}
                              aname={item.name}
                              aamount={item.amount}
                              aemail={item.email}
                              aphone={item.phone}
                            ></Update>
                          </Badge>
                          <Badge
                            onClick={() => {
                              deleteProduct({ id: item.id })
                            }}
                            cursor={'pointer'}
                            colorScheme={'red'}
                          >
                            DELETE
                          </Badge>
                        </HStack>
                      </Td>
                    </Tr>
                  )
                })
              : null}
          </Tbody>
        </Table>
        {isLoading && (
          <Center p={5}>
            <CircularProgress color="green" isIndeterminate></CircularProgress>
          </Center>
        )}
        {isSuccess && !isLoading && data.data.length === 0 && (
          <Center>
            <VStack p={3}>
              <Heading color={'gray'}>( '.' )</Heading>
              <Text color={'gray'}>no products</Text>
            </VStack>
          </Center>
        )}
      </TableContainer>
    </Card>
  )
}

export default OrderTable
