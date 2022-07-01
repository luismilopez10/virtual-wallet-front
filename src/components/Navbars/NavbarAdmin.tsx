import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { putCollaborator } from '../../actions/collaborators/putCollaborator';
import { adminEmail } from '../../App';
import { logOutInReducer } from '../../app/loggedInSlice';
import { useAppDispatch } from '../../app/store';
import { collaboratorType, selectCollaboratorStateTypeState } from '../../features/collaboratorSlice';

const NavbarAdmin = (props: { user: string | null; }) => {

    const dispatch = useAppDispatch();
    
    const goHome = props.user !== null ? (props.user === adminEmail ? '/inicio-admin' : '/inicio-colab') : '/login';
    
    const getCollaborators = useSelector(selectCollaboratorStateTypeState());

    const logout = () => {
        dispatch(logOutInReducer());
        localStorage.removeItem("localStorageUser");
    }

    return (
        <header>
            <nav className='nav nav__container'>
                <Link to={goHome}><img className="nav__logo" src='https://cdn-icons-png.flaticon.com/512/2722/2722120.png'></img></Link>
                <span className='navbar-brand'>Virtual Wallet</span>

                <ul className='nav__list'>
                    {/* <li className='nav__item'>
                        <Link to={'/'} className='nav__link'>Inicio</Link>
                    </li> */}
                    <li className='nav__item'>
                        <Link to={goHome} className='nav__link'>Pagar Nómina</Link>
                    </li>
                    <li className='nav__item'>
                        <Link to='/login' className='nav__link' onClick={() => { logout() }}>Cerrar Sesión</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default NavbarAdmin