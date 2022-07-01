import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCollaborators } from '../../actions/collaborators/getAllCollaborators';
import { f } from '../../App';
import { RootState, useAppDispatch } from '../../app/store';
import { selectCollaboratorStateTypeFetchError, selectCollaboratorStateTypeState, selectCollaboratorStateTypeStatus } from '../../features/collaboratorSlice';
import { requestStatus } from '../../features/transaccionSlice';
import './CollaboratorMenu.css';


//TODO: mapear los datos de sesion y agregar los historiales desde la pag

const CollaboratorMenu = () => {
  const { user } = useSelector((state: RootState) => state.logged);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()


  useEffect(() => {
    const localStorageUser = localStorage.getItem("localStorageUser"); 
    if (user === null && localStorageUser === null) {
        navigate('/login');
    } 
    if (status === requestStatus.IDLE) {
      dispatch(getAllCollaborators())
    }
  }, [dispatch])

  const error = useSelector(selectCollaboratorStateTypeFetchError())
  const status = useSelector(selectCollaboratorStateTypeStatus())
  const getCollaborators = useSelector(selectCollaboratorStateTypeState())
  const currentCollaborator = getCollaborators.find((collaborator) => collaborator.email === user)

  return (
    <div className='expandable-container'>
      <input type="checkbox" id='check-input' className='check-input' />
      <label htmlFor="check-input" className='expandable'>
        <header className='header-container'>
          <div className='header'>
            <h4 className='title'>Hola {currentCollaborator?.email}</h4>
              <span className='sub-title'>Tu saldo es: ${f.format(currentCollaborator?.balance!)}</span>
          </div>
          <span className='icon'></span>
        </header>
        <p className='content'>
            <Link to='/ingresos' className='link__ingresos'>
                <button>Consultar Ingresos</button>
            </Link>
            <Link to='/egresos' className='link__egresos'>
                <button>Consultar Egresos</button>
            </Link>
        </p>
      </label>
    </div>







    // <div>
    //   <h1>Hola {currentCollaborator?.email}</h1>
    //   <div >
    //     <h1>Tu saldo es: ${currentCollaborator?.balance}</h1>
    //   </div>
    //   <br />
  
    // </div>
    
  )
};

export default CollaboratorMenu