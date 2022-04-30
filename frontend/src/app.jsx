import { Route, Routes } from 'react-router-dom'
import Home from './pages'
import CustomerHome from './pages/customer'
import Purchase from './pages/customer/purchase'
import TraderHome from './pages/trader'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/customer/:id' element={<CustomerHome />}></Route>
        <Route path='/trader/:id' element={<TraderHome />}></Route>
        <Route path='/customer/purchase/:id' element={<Purchase />}></Route>
      </Routes>
    </div>
  )
}

export default App
