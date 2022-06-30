import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCollaborators } from '../../actions/collaborators/getAllCollaborators';
import { RootState, useAppDispatch } from '../../app/store';
import { selectCollaboratorStateTypeFetchError, selectCollaboratorStateTypeState, selectCollaboratorStateTypeStatus } from '../../features/collaboratorSlice';
import { requestStatus } from '../../features/transaccionSlice';


//TODO: mapear los datos de sesion y agregar los historiales desde la pag

const collaboratorMenu = () => {
  const { user } = useSelector((state: RootState) => state.logged);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()


  useEffect(() => {
    if (user === null) {
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
    <div>
      <h1>Hola {currentCollaborator?.email}</h1>
      <div >
        <h1>Tu saldo es: ${currentCollaborator?.balance}</h1>
      </div>
      <br />
  
    </div>
  )
};

export default collaboratorMenu