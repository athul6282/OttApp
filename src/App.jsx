import './App.css';
import { useState } from "react";
import Home from './Pages/Home/Home';
import MovieDetails from './Pages/MovieDetails/MovieDetails';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer/Footer';
import Category from './Pages/Category/Category';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import Header from './components/Header/Header';
import { AuthProvider } from './contexts/AuthContext';


function App() {

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Routes>
          <Route path="/" element={<Home showSearch={showSearch}
            searchQuery={searchQuery} />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


        </Routes>
      </BrowserRouter>
      <Footer />
    </AuthProvider>
  )
}

export default App
