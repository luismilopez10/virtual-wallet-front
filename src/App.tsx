import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logOutInReducer } from './app/loggedInSlice';
import { RootState, useAppDispatch } from './app/store';
import Login from './pages/Login/Login';
import SignIn from './pages/Signin/SignIn';
import PasswordReset from './pages/Login/PasswordReset';
import CollaboratorHome from './pages/CollaboratorMenu/CollaboratorHome';
import './App.css';
import './Nav.css';
import CollaboratorIn from './components/colaboradorHistorial/CollaboratorIn';
import CollaboratorOut from './components/colaboradorHistorial/CollaboratorOut';
import CollaboratorTransaction from './components/colaboradorFormulario/CollaboratorTransaction';
import { getAllCollaborators } from './actions/collaborators/getAllCollaborators';
import { requestStatus } from './features/transaccionSlice';
import { collaboratorType, selectCollaboratorStateTypeState, selectCollaboratorStateTypeStatus } from './features/collaboratorSlice';
import { putCollaborator } from './actions/collaborators/putCollaborator';

export const adminEmail = 'juan.velez993@gmail.com';

function App() {

  const { user } = useSelector((state: RootState) => state.logged);
  
  const dispatch = useAppDispatch();

  const status = useSelector(selectCollaboratorStateTypeStatus());
  const getCollaborators = useSelector(selectCollaboratorStateTypeState());

  useEffect(() => {
    if (status === requestStatus.IDLE) {
      dispatch(getAllCollaborators());
    }
  }, [dispatch]);

  const goHome = user !== null ? (user === adminEmail ? '/inicio-admin' : '/inicio-colab') : '/login';

  const logout = () => {
    if (user !== null) {
      const currentUserState = getCollaborators.filter(collaborator => collaborator.email === user)[0];

      const updateCollaboratorlogged: collaboratorType = {
        email: currentUserState.email,
        name: currentUserState.name,
        balance: currentUserState.balance,
        contactsList: currentUserState.contactsList,
        logged: false
      }
      
      dispatch(putCollaborator(updateCollaboratorlogged));
    }

    dispatch(logOutInReducer());
  }

  return (
    <BrowserRouter>
      {user === null ?
        <header>
        <nav className='nav nav__container'>
            <Link to={goHome}><img className="nav__logo" src='./src/assets/wallet-icon.png'></img></Link>
            <span className='navbar-brand'>Virtual Wallet</span>
          </nav>
        </header>
        :
        <header>
          <nav className='nav nav__container'>
            <Link to={goHome}><img className="nav__logo" src='./src/assets/wallet-icon.png'></img></Link>
            <span className='navbar-brand'>Virtual Wallet</span>

            <ul className='nav__list'>
              <li className='nav__item'>
                <Link to='/' className='nav__link'>Inicio</Link>
              </li>
              <li className='nav__item'>
                <Link to='/transaccion' className='nav__link'>Transacciones</Link>
              </li>
              <li className='nav__item'>
                <Link to='/' className='nav__link' onClick={() => {logout()}}>Cerrar Sesión</Link>
              </li>
            </ul>
          </nav>
        </header>
      }
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/resetpassword" element={<PasswordReset />} />
        <Route path="/inicio-admin" element={<></>} />
        <Route path="/inicio-colab" element={<CollaboratorHome/>} />
        <Route path="/ingresos" element={<CollaboratorIn/>} />
        <Route path="/egresos" element={<CollaboratorOut />} />
        <Route path="/transaccion" element={<CollaboratorTransaction />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App