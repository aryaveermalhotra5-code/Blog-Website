
import { useEffect, useState } from 'react';
import './App.css'
import { Header , Footer } from './components';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import authService from './appwrite/auth';
import { login , logout } from './feature/authSlice';


function App() {
const [loading , setLoading ] = useState(true)
const dispatch = useDispatch()

useEffect (() => {
  authService.currentStatus()
  .then((userData) => {
    if (userData) dispatch(login(userData))
    else  dispatch(logout())
  })                                               
  .finally( () => setLoading(false))
  }
 , [] )

  return !loading ? (
    <div>
      <Header />
      <main>
       TODO <Outlet />
      </main>
      <Footer />
    </div>
  ) :
 null
  
}

export default App
