import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { RootState, useAppDispatch } from './app/store';
import Login from './pages/Login/Login';
import SignIn from './pages/Signin/SignIn';
import PasswordReset from './pages/Login/PasswordReset';
import CollaboratorHome from './pages/CollaboratorMenu/CollaboratorHome';
import './App.css';
import './Nav.css';
import CollaboratorPayment from './components/CollaboratorPayment/CollaboratorPayment';
import CollaboratorIn from './components/colaboradorHistorial/CollaboratorIn';
import CollaboratorOut from './components/colaboradorHistorial/CollaboratorOut';
import CollaboratorTransaction from './components/colaboradorFormulario/CollaboratorTransaction';
import { getAllCollaborators } from './actions/collaborators/getAllCollaborators';
import { requestStatus } from './features/transaccionSlice';
import { selectCollaboratorStateTypeStatus } from './features/collaboratorSlice';
import NavbarAdmin from './components/Navbars/NavbarAdmin';
import NavbarColab from './components/Navbars/NavbarColab';
import { logInInReducer } from './app/loggedInSlice';

export const adminEmail = 'juan.velez993@gmail.com';

function App() {

  const { user } = useSelector((state: RootState) => state.logged);

  const dispatch = useAppDispatch();

  const status = useSelector(selectCollaboratorStateTypeStatus());

  useEffect(() => {
    if (status === requestStatus.IDLE) {
      dispatch(getAllCollaborators());
    }
    
    const localStorageUser = localStorage.getItem("localStorageUser");    
    if (localStorageUser) {
      dispatch(logInInReducer(localStorageUser));
    }
  }, [dispatch]);

  const goHome = user === adminEmail ? '/inicio-admin' : '/inicio-colab';

  return (
    <BrowserRouter>
      {user === null ?
        // Navbar antes de iniciar sesión
        <header>
          <nav className='nav nav__container'>
            <Link to={goHome}><img className="nav__logo" src='https://cdn-icons-png.flaticon.com/512/2722/2722120.png'></img></Link>
            <span className='navbar-brand'>Virtual Wallet</span>
          </nav>
        </header>
        :
        user === adminEmail ?
          <NavbarAdmin user={user} />
          :
          <NavbarColab user={user} />
      }
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/resetpassword" element={<PasswordReset />} />
        <Route path="/inicio-admin" element={<CollaboratorPayment />} />
        <Route path="/inicio-colab" element={<CollaboratorHome />} />
        <Route path="/ingresos" element={<CollaboratorIn />} />
        <Route path="/egresos" element={<CollaboratorOut />} />
        <Route path="/transaccion" element={<CollaboratorTransaction />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App