import './App.css';
import { Route,Routes } from 'react-router';

import Register from './pages/Register';
import Login from './pages/Login'
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import ViewEmployee from './pages/ViewEmployee';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Navbar/>
    <Routes>
      <Route path='/' element={ <ProtectedRoute component={Home}/> }  />
      <Route path='add' element={ <ProtectedRoute component={AddEmployee}/> }  />
      <Route path='view' element={ <ProtectedRoute component={ViewEmployee}/> }  />
      <Route path='/edit/:empID' element={ <ProtectedRoute component={EditEmployee}/>}  />
      <Route path='login' element={ <Login/> }  />
      <Route path='register' element={ <Register/> }  />
      <Route path='*' element={ <NotFound/> }  />


    </Routes>
    </div>
  );
}

export default App;
