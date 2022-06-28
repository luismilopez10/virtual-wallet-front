

import { Auth } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import CollaboratorMenu from '../../components/colaboradorHistorial/collaboratorMenu';
import './CollaboratorHome.css';


const CollaboratorHome = () => {


    const { user } = useSelector((state: RootState) => state.logged);

    return (<div>
        <h1>Hola {user}</h1>
        <CollaboratorMenu />

    </div>

    )
}

export default CollaboratorHome