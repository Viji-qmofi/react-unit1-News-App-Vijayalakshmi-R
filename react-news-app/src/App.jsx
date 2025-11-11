import { useState } from 'react'
import {Routes, Route} from 'react-router'
import './App.css'
import News from './components/News'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'



function App() {
 
  return (
    <div className="container">
      
        <Routes>
          
          <Route path="/" element={<News />} />
          
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      
      
    </div>
  )
}

export default App
