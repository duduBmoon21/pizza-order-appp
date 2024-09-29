import Footer from '../components/Footer'
import React from 'react';
import { HashRouter as Router, Route, Routes,Navigate  } from 'react-router-dom';
import Login from './Login';
import Header from '../components/Header';
import Dashboard from './Dashboard';
import Signup from './Signup';

function Home() {
  const user = localStorage.getItem("token");
  return (
     <>
        <Router>
        <Header />
            <Routes>
              {user && <Route path="/" exact element={<Dashboard />} />}
                {/* <Route path="/" element={<Login />} /> */}
                <Route path="/login" exact element={<Login />} />
                <Route path="/signup" exact element={<Signup />} />
                <Route path="/" element={<Navigate replace to="/login" />} />
            </Routes>
            <Footer />
        </Router>
    </>
  )
}

export default Home