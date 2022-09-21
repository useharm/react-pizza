import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import React from 'react';
import { useState } from 'react';



export const SearchContext = React.createContext('');

function App() {
  
  const [searchValue, setSearchValue] = useState('');

  return (
      <div className="wrapper">
        <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <Header/>
      <div className="content">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='*' element={<NotFound />}/>
          <Route path='cart' element={<Cart />} />
        </Routes>
    </div>
    </SearchContext.Provider>
    </div>
  );
}

export default App;
