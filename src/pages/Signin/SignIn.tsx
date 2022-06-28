import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebaseConfig";
import './SignIn.css';

const SignIn = () => {

    const errorMsgClassNameOn = 'signin__error-message-on';
    const errorMsgClassNameOff = 'signin__error-message-off';

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [errorMsgClassName, setErrorMsgClassName] = useState(errorMsgClassNameOff);

    const signInForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password && email) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;

                    // console.log("****user****");
                    // console.log(user);

                    sendEmailVerification(user)
                        .then(() => {
                            // Correo enviado
                        })
                        .catch(() => {
                            // Ocurrió un error
                        });

                    alert('Registro exitoso. Por favor revise su correo electrónico e ingrese al link que encontrará en el mensaje para confirmar su correo.');

                    navigate('/login');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.log('*** sign in error code ***');
                    console.log(errorCode);
                    console.log('*** sign in error ***');
                    console.log(errorMessage);

                    switch (errorCode){
                        case "auth/weak-password":
                            setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
                            setPassword('');
                        
                        case "auth/email-already-in-use":
                            setErrorMsg("El correo ingresado ya se encuentra en uso.");
                            setPassword('');
                    }

                    setErrorMsgClassName(errorMsgClassNameOn);
                });
        }
    }

    return (
        <div className='signin__body'>
            <div className="signin__container">
                <form autoComplete="on" onSubmit={(e) => signInForm(e)}>
                    <div className="title">Registrarse</div>
                    <div className="input-box underline">
                        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <div className="underline"></div>
                    </div>
                    <br />
                    <span className={errorMsgClassName}>{errorMsg}</span>
                    <div className="input-box button">
                        <input type="submit" name="" value="Crear cuenta" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn