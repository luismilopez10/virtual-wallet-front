
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import CollaboratorMenu from '../../components/colaboradorHistorial/collaboratorMenu';
import './CollaboratorMenu.css';

const { user } = useSelector((state: RootState) => state.logged);
const CollaboratorHome= () => {

   

    return (<div>
        <h1>Hola  desde la pagina principal</h1>
        <CollaboratorMenu/>

    </div>
        
    )
}

export default CollaboratorHome