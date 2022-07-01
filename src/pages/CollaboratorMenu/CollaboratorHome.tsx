
import { Auth } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';
import CollaboratorMenu from '../../components/colaboradorHistorial/CollaboratorMenu';


const CollaboratorHome = () => {


    const { user } = useSelector((state: RootState) => state.logged);

    return (<div>
        
        <CollaboratorMenu />
        {/* <div>
            <Link to='/ingresos'>
                <button>Consultar Ingresos</button>
            </Link>
            <Link to='/egresos'>
                <button>Consultar Egresos</button>
            </Link>
        </div> */}

    </div>

    )
}

export default CollaboratorHome