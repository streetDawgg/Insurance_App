import { useState } from 'react'
import Header from './components/header.jsx'
import Body from './components/Body.jsx'
import Dropdown from './components/Dropdown.jsx'
import Footer from './components/footer.jsx'

function App() {
  return (
    <div>
    <Header/>
    <Dropdown/>
    <Footer/>
    </div>
  );
}

export default App
