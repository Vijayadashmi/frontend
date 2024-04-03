import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import AddPortfolio from './components/AddPortfolio';
import ViewPortfolio from './components/ViewPortfolio';

import UserAuth from './UserAuth';
import { AppProvider } from "./AppContext";
import {Toaster} from 'react-hot-toast';
import ManagePortfolio from './components/ManagePortfolio';
import UpdatePortfolio from './components/UpdatePortfolio';

function App() {
  return (
    <div>
      <BrowserRouter >
      

      <AppProvider>
      <Navbar />
     <Routes >
     <Route path="/" element={ <Home /> } />
          <Route path="signup" element={ <Signup /> } />
          <Route path="login" element={ <Login />} />
          <Route path="addportfolio" element={ <AddPortfolio />} />
          <Route path="updateportfolio" element={ <UpdatePortfolio />} />
          <Route path="viewportfolio/:id" element={ <ViewPortfolio  />} />
          <Route path="manageportfolio" element={ <UserAuth> <ManagePortfolio /> </UserAuth> } />  
     </Routes>
     </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
