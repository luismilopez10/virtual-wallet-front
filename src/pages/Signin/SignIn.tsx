import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebaseConfig";
import './SignIn.css';
import { postCollaborator } from '../../actions/collaborators/postCollaborator';
import { collaboratorType } from '../../features/collaboratorSlice';
import { useAppDispatch } from '../../app/store';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';

const SignIn = () => {

    const errorMsgClassNameOn = 'signin__error-message-on';
    const errorMsgClassNameOff = 'signin__error-message-off';
    const passwordRequisitesClassNameOn = 'password_requisites_message_on';
    const passwordRequisitesClassNameOff = 'password_requisites_message_off';
    const passwordPattern = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]{1,})(?=.*[^A-Za-z0-9]).{8,}";
    const emailPattern = "([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])";

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [errorMsgClassName, setErrorMsgClassName] = useState(errorMsgClassNameOff);
    const [passwordRequisitesClassName, setPasswordRequisitesClassName] = useState(passwordRequisitesClassNameOff);

    const signInForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setErrorMsgClassName(errorMsgClassNameOff);
        setPasswordRequisitesClassName(passwordRequisitesClassNameOff);

        if (password && email) {
            
            if (!password.match(passwordPattern)) {
                setErrorMsg("La contraseña no cumple con los requisitos.");
                setErrorMsgClassName(errorMsgClassNameOn);
                setPasswordRequisitesClassName(passwordRequisitesClassNameOn);

            } else if(password !== passwordConfirm) {
                setErrorMsg("Las contraseñas no coinciden.");
                setErrorMsgClassName(errorMsgClassNameOn);

            }else if (!email.match(emailPattern)) {
                setErrorMsg("El correo ingresado no es un correo válido.");
                setErrorMsgClassName(errorMsgClassNameOn);

            } else{                
                setErrorMsgClassName(errorMsgClassNameOff);
                setPasswordRequisitesClassName(passwordRequisitesClassNameOff);

                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
    
                        // console.log("****user****");
                        // console.log(user);
    
                        sendEmailVerification(user)
                            .then(() => {

                                const newCollaborator: collaboratorType = {
                                    email: user.email,
                                    name: user.displayName,
                                    balance: 1050000,
                                    contactsList: [],
                                    logged: false
                                }

                                setEmail('');
                                setPassword('');
                                setPasswordConfirm('');

                                alert('Registro exitoso. Por favor revise su bandeja de entrada para verificar su correo electrónico. Verifique su carpeta de spam o no deseados.');

                                dispatch(postCollaborator(newCollaborator));
            
                                navigate('/login');
                            })
                            .catch((error) => {
                                console.log("****error****");
                                console.log(error);
                            });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
    
                        console.log('*** sign in error code ***');
                        console.log(errorCode);
                        console.log('*** sign in error ***');
                        console.log(errorMessage);
    
                        switch (errorCode) {
                            case "auth/weak-password":
                                setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
                                setPassword('');
                                break;
    
                            case "auth/email-already-in-use":
                                setErrorMsg("El correo ingresado ya se encuentra en uso.");
                                setPassword('');
                                break;
                        }
    
                        setErrorMsgClassName(errorMsgClassNameOn);
                    });
            }
        }
    }

    return (
        <div className='signin__body'>
            <div className="signin__container">
                <form autoComplete="on" onSubmit={(e) => signInForm(e)}>
                    <div className="title">Registrarse</div>
                    <div className="input-box underline">
                        <div>
                            <AiOutlineMail />
                            <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <div className="underline"></div>
                        </div>
                    </div>
                    <div className="input-box">
                        <div>
                            <RiLockPasswordLine />
                            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <div className="underline"></div>
                        </div>
                    </div>
                    <div className="input-box">
                        <div>
                            <RiLockPasswordLine />
                            <input type="password" placeholder="Confirmar contraseña" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
                            <div className="underline"></div>
                        </div>
                    </div>
                    <br />
                    <div className={passwordRequisitesClassName}>
                        <h3>La contraseña debe contener:</h3>
                        <li>Mínimo 8 caracteres alfanuméricos</li>
                        <li>Al menos una mayúscula</li>
                        <li>Al menos un caracter especial</li>
                    </div>
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