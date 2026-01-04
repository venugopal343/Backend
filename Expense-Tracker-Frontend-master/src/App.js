import React, { useContext} from 'react'
import { BrowserRouter, Routes ,Route,Navigate} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Otpvalidate from './components/Otpvalidate'
import Logout from './components/Logout'
import { Toaster } from 'react-hot-toast'
import Home from './components/Home'
import Profile from './components/Profile'

import Adddata from './expcomponents/Adddata'
import DisplayExpenses from './expcomponents/DisplayExpenses'
import { Navbar,Container,Nav } from 'react-bootstrap'
import { Mycontext } from './context/Mycontext'
import UpdateExpense from './expcomponents/UpdateExpense'
const App = () => {

  const{token,setToken,setEmail,setRole} = useContext(Mycontext);
  return (
    <div>
      <BrowserRouter>

      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
              <Nav className="me-auto text-white">
          {    token ?
            (
            <>
            <Nav.Link href="/displayexp">Expense</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
            </>
            )
            :(
              <>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
              
              </>
     )} </Nav>
      </Container>
      </Navbar>

      <Toaster />
      <Routes>
        <Route path="/" element={ token ? <Navigate to="/displayexp" /> : <Navigate to="/home" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setToken={setToken}  setEmail={setEmail} setRole={setRole}/>} />
        <Route path="/logout" element={<Logout setToken={setToken}  setEmail={setEmail} setRole={setRole}/>} />
        <Route path="/otpval" element={<Otpvalidate />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/home" element={<Home />} />

        <Route path="/displayexp" element={<DisplayExpenses/>} />
        <Route path="/adddata" element={<Adddata/>} />
        <Route path="/updateexp" element={<UpdateExpense />} />




      </Routes>
     
      </BrowserRouter>
    </div>
  )
}

export default App
