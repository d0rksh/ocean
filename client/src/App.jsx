import { Box, Card, Heading, Modal, Text } from '@chakra-ui/react'
import './App.css'
import OrderModal from './Components/Modal/Modal'
import OrderTable from './Components/OrderTable/OrderTable'

function App() {
  return (
    <Box background={'gray.700'} height={'100%'} p={'10'} className="App">
        <Card background={'gray.800'} color={'white'} p={10}  height={'100%'} >
        <OrderModal></OrderModal>
        <OrderTable></OrderTable>
        </Card>
    </Box>
  )
}

export default App
