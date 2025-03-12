import Add from './Add/Add'
import Home from './Home/Home'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'

export default function App(){
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/add' element={<Add/>} />
      </Routes>
    </Router>
  )
}