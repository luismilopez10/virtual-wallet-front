import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logOutInReducer } from './app/loggedInSlice';
import { RootState } from './app/store';
import Login from './pages/Login/Login';
import SignIn from './pages/Signin/SignIn';
import './App.css';
import './Nav.css';
import CollaboratorPayment from './components/CollaboratorPayment/CollaboratorPayment';

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
        <nav className='nav__container'>
            <Link to={goHome} className="nav__logo"></Link>
            <span className=''>Virtual Wallet</span>
          </nav>
        </header>
        :
        <header>
          <nav className='nav__container'>
            <Link to={goHome} className='nav__logo'></Link>
            <span className=''>Virtual Wallet</span>

            <ul className=''>
              <li className=''>
                <Link to='/' className=''>Inicio</Link>
              </li>
              <li className=''>
                <Link to='/' className=''>Transacciones</Link>
              </li>
              <li className=''>
                <Link to='/' className='' onClick={() => {logout()}}>Cerrar Sesión</Link>
              </li>
            </ul>
          </nav>
        </header>
      }
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/inicio-admin" element={<CollaboratorPayment/>} />
        <Route path="/inicio-colab" element={<></>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
