import { Route, Routes } from 'react-router-dom'
import Homepage from './components/Homepage'
import StationDash from './components/StationDash'
import ManageStation from './components/ManageStation'
import Signup from './components/Signup'
import Login from './components/Login'
import UserBookings from './components/UserBookings'
import ChargingPoints from './components/ChargingPoints'
import UserDash from './components/UserDash'
import ListStations from './components/ListStations'
import BookSlot from './components/BookSlot'
import HomeCharging from './components/HomeCharging'
import Biddings from './components/Biddings'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/station-dash' element={<StationDash/>}></Route>
        <Route path='/user-dash' element={<UserDash/>}></Route>
        <Route path='/manage-station' element={<ManageStation/>}></Route>
        <Route path='/charge_point_data' element={<ChargingPoints/>}></Route>
        <Route path='/user-bookings' element={<UserBookings/>}></Route>
        <Route path='/list-stations' element={<ListStations/>}></Route>
        <Route path='/book-slot' element={<BookSlot/>}></Route>
        <Route path='/home-charging' element={<HomeCharging/>}></Route>
        <Route path='/biddings' element={<Biddings/>}></Route>
      </Routes>
    </>
  )
}

export default App
