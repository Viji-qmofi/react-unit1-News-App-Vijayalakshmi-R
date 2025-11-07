import { useState } from 'react'
import {Routes, Route} from 'react-router'
import './App.css'
import News from './components/News'
import ContactUs from './components/ContactUs'


function App() {
 
  return (
    <div className="container">
      <div className="news-app">
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
