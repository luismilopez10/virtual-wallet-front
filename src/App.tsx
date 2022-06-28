import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logOutInReducer } from './app/loggedInSlice';
import { RootState } from './app/store';
import Login from './pages/Login/Login';
import SignIn from './pages/Signin/SignIn';
import PasswordReset from './pages/Login/PasswordReset';
import './App.css';
import './Nav.css';
import CollaboratorHome from './pages/CollaboratorMenu/collaboratorHome';

export const adminEmail = 'admin@gmail.com';

function App() {

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.logged);

  const goHome = user !== null ? '/inicio' : '/login';

  const logout = () => {
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
                <Link to='/' className='nav__link'>Transacciones</Link>
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
      </Routes>
    </BrowserRouter>
  )
}

export default App