import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Login"
import Profile from "./Profile"
import Body from "./Body"

function App() {


  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
        </Route>
        <Route path="/login" element={<div>Login page</div>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
