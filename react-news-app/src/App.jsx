import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import News from './components/News'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {

  return (
    <div className="container">
      <div className="news-app">
        <div className='news'>
          <Header />
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/categories/:category" element={<News />} />
            <Route path="/bookmarks" element={<News showBookmarksFromRoute={true} />} />
            <Route path="/contactus" element={<ContactUs />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  )
}
export default App
