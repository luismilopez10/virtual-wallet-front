import { signInWithEmailAndPassword, sendEmailVerification, User } from "firebase/auth";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logInInReducer } from "../../app/loggedInSlice";
import { auth } from "../../firebaseConfig";
import './Login.css';

const Login = () => {

  const adminEmail = 'admin@gmail.com';
  const errorMsgClassNameOn = 'login__error-message-on';
  const errorMsgClassNameOff = 'login__error-message-off';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorMsgClassName, setErrorMsgClassName] = useState(errorMsgClassNameOff);

  function sendEmail(currentUser: User) {
    sendEmailVerification(currentUser)
      .then(() => {
        // Correo enviado
      })
      .catch(() => {
        // Ocurrió un error
      })
  }

  const logInWithEmailAndPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          console.log(user);

          if (user.emailVerified) {
            dispatch(logInInReducer(user));

            if (user.email === adminEmail) {
              //  TODO: cambiar el navigate a la dirección correcta para Admin
              navigate('/inicio-admin');
            }else{
              //  TODO: cambiar el navigate a la dirección correcta para Colaborador
              navigate('/inicio-admin');
            }

          } else {
            setErrorMsg('Correo electrónico no verificado. Revise su bandeja de entrada.');
            setErrorMsgClassName(errorMsgClassNameOn);

            sendEmail(user);
          }

          console.log('**** user credentials ****');
          console.log(userCredential);
          console.log('**** user ***');
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log('*** Log in error ***');
          console.log(errorMessage);

          if (errorCode === "auth/user-not-found") {
            setErrorMsg("El correo ingresado no se encuentra registrado.");
            setPassword('');
          } else if (errorCode === "auth/wrong-password") {
            setErrorMsg("Contraseña incorrecta. Por favor inténtelo de nuevo.");
            setPassword('');
          } else if (errorCode === "auth/too-many-requests") {
            setErrorMsg("El acceso a esta cuenta se ha inhabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede volver a intentarlo más tarde.");
            setPassword('');
          }

          setErrorMsgClassName(errorMsgClassNameOn);
        });
    }
  }

  const signIn = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate('/signin');
  }

  return (
    <div className='login__body'>
      <div className="login__container">
        <form onSubmit={(e) => logInWithEmailAndPassword(e)}>
          <div className="title">Inicio de Sesión</div>
          <div className="input-box underline">
            <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div className="underline"></div>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div className="underline"></div>
          </div>
          <span className="option"><a href="#" onClick={(e) => { }}>Recuperar contraseña</a></span>
          <br />
          <span className={errorMsgClassName}>{errorMsg}</span>
          <div className="input-box button">
            <input type="submit" name="" value="Iniciar sesión" />
          </div>
          <span className="option"><a href="#" onClick={(e) => signIn(e)}>Registrarse</a></span>
        </form>
      </div>
    </div>
  )
}

export default Login

