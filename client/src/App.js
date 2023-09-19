import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CustomerAccess from './pages/CustomerAccess'
import Home from './pages/Home'
import PageNotFound from './components/Utils/PageNotFound'

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<CustomerAccess />} />
          {localStorage.getItem('token') && (
            <Route path='/home/:id' element={<Home />} />
          )}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
