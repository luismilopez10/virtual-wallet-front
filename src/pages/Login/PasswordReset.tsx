import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { adminEmail } from '../../App';
import './PasswordReset.css';

const PasswordReset = () => {

    const errorMsgClassNameOn = 'passreset__error-message-on';
    const errorMsgClassNameOff = 'passreset__error-message-off';

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [errorMsgClassName, setErrorMsgClassName] = useState(errorMsgClassNameOff);


    const sendEmailResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email) {
            if (email !== adminEmail) {
                sendPasswordResetEmail(auth, email)
                    .then(() => {
                        alert('Por favor revise su bandeja de entrada.');
                        navigate('/login');
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;

                        switch (errorCode){
                            case "auth/user-not-found":                                
                                setErrorMsg('El correo ingresado no se encuentra registrado.');
                                setErrorMsgClassName(errorMsgClassNameOn);
                                break;
                        }
                    })
            } else {
                setErrorMsg('Por favor contacte al administrador de la aplicación para cambiar la contraseña de administrador');
                setErrorMsgClassName(errorMsgClassNameOn);
            }
        }
    }

    return (
        <div className='passreset__body'>
            <div className="passreset__container">
                <form onSubmit={(e) => { sendEmailResetPassword(e) }}>
                    <div className="title">Recuperar contraseña</div>
                    <div className="input-box underline">
                        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <div className="underline"></div>
                    </div>
                    <span className={errorMsgClassName}>{errorMsg}</span>
                    <div className="input-box button">
                        <input type="submit" name="" value="Recuperar contraseña" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PasswordReset