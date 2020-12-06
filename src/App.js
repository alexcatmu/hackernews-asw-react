import './App.css';
import React from "react";
import {MyNavbar} from './components/MyNavbar'
import {Routes} from "./routes";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div style={{ background: '#f6f6ef', margin: '0 200px 0 200px'}}>
        <header style={{background: '#ff6600'}}>
            <MyNavbar/>
        </header>
        <BrowserRouter>
            <Routes></Routes>
        </BrowserRouter>
        <footer style={{borderTop: '2px solid black'}}>
            GitHub | FAQ | Support | API | Security | Lists | Bookmarklet | Legal | Apply to YC | Contact
        </footer>
    </div>
  );
}

export default App;
