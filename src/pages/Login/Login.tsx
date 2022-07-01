import { signInWithEmailAndPassword, sendEmailVerification, User, browserLocalPersistence } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { adminEmail } from "../../App";
import { logInInReducer } from "../../app/loggedInSlice";
import { auth, firebaseConfig } from "../../firebaseConfig";
import './Login.css';
import { collaboratorType, selectCollaboratorStateTypeState, selectCollaboratorStateTypeStatus } from "../../features/collaboratorSlice";
import { requestStatus } from "../../features/transaccionSlice";
import { getAllCollaborators } from "../../actions/collaborators/getAllCollaborators";
import { useAppDispatch } from "../../app/store";
import { putCollaborator } from "../../actions/collaborators/putCollaborator";
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineMail } from 'react-icons/ai';

const Login = () => {

  // let currentUser: User | null = null;
  const localStorageUser = localStorage.getItem("localStorageUser");
  const errorMsgClassNameOn = 'login__error-message-on';
  const errorMsgClassNameOff = 'login__error-message-off';
  const goHome = localStorageUser === adminEmail ? '/inicio-admin' : '/inicio-colab';

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const status = useSelector(selectCollaboratorStateTypeStatus());
  const getCollaborators = useSelector(selectCollaboratorStateTypeState());

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorMsgClassName, setErrorMsgClassName] = useState(errorMsgClassNameOff);

  useEffect(() => {
    if (status === requestStatus.IDLE) {
      dispatch(getAllCollaborators());
    }

    const localStorageUser = localStorage.getItem("localStorageUser");
    if (localStorageUser !== null) {
      navigate(goHome);
    }
    // initializeApp(firebaseConfig);
    // auth.onAuthStateChanged((user) => {
    //   (currentUser = user)
    //   console.log(user);      
    // });
    // dispatch(logInInReducer(currentUser?.email));
    // console.log(currentUser);
    
  }, [dispatch]);

  function sendEmailVerif(currentUser: User) {
    sendEmailVerification(currentUser)
      .then(() => {
        // Correo enviado
      })
      .catch(() => {
        // Ocurrió un error
      })
  }

  const loginIfNotLogged = (currentUserState: collaboratorType) => {
    if (currentUserState.logged) {
      alert(`El usuario ${currentUserState.email} ya se encuentra logueado en otra sesión.`);
    }else{
      const updateCollaboratorlogged: collaboratorType = {
        email: currentUserState.email,
        name: currentUserState.name,
        balance: currentUserState.balance,
        contactsList: currentUserState.contactsList,
        logged: true
      }
      dispatch(logInInReducer(currentUserState.email));
      dispatch(putCollaborator(updateCollaboratorlogged));
      navigate('/inicio-colab');
    }
  }

  const logInWithEmailAndPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // auth.setPersistence(browserLocalPersistence)
      // .then(() => {
        if (email && password) {
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const currentUser = userCredential.user;
              const currentUserState = getCollaborators.filter(collaborator => collaborator.email === currentUser.email)[0];

              // console.log(currentUserState);

              if (currentUser.email === adminEmail) {
                dispatch(logInInReducer(currentUser.email));
                navigate('/inicio-admin');

              } else {

                if (currentUser.emailVerified) {
                  loginIfNotLogged(currentUserState);
                  localStorage.setItem("localStorageUser", currentUser.email!);
                } else {
                  setErrorMsg('El correo electrónico aún no ha sido verificado. Por favor verifíquelo e intente de nuevo.');
                  setErrorMsgClassName(errorMsgClassNameOn);

                  sendEmailVerif(currentUser);
                }
              }

              // console.log('**** user credentials ****');
              // console.log(userCredential);
              // console.log('**** user ***');
              // console.log(user);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;

              console.log('*** Log in error ***');
              console.log(errorMessage);

              switch (errorCode) {
                case "auth/user-not-found":
                  setErrorMsg("El correo ingresado no se encuentra registrado.");
                  setPassword('');
                  break;

                case "auth/wrong-password":
                  setErrorMsg("Contraseña incorrecta. Por favor inténtelo de nuevo.");
                  setPassword('');
                  break;

                case "auth/too-many-requests":
                  setErrorMsg("El acceso a esta cuenta se ha inhabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede volver a intentarlo más tarde.");
                  setPassword('');
                  break;
              }

              setErrorMsgClassName(errorMsgClassNameOn);
            });
        }
      // })
  }

  const signIn = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate('/signin');
  }

  const resetPassword = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate('/resetpassword');
  }

  return (
    <div className='login__body'>
      <div className="login__container">
        <form autoComplete="on" onSubmit={(e) => logInWithEmailAndPassword(e)}>
          <div className="title">Inicio de Sesión</div>
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
          <span className="option"><a href="" onClick={(e) => { resetPassword(e) }}>Recuperar contraseña</a></span>
          <br />
          <span className={errorMsgClassName}>{errorMsg}</span>
          <div className="input-box button">
            <input type="submit" name="" value="Iniciar sesión" />
          </div>
          <span className="option"><a href="" onClick={(e) => signIn(e)}>Registrarse</a></span>
        </form>
      </div>
    </div>
  )
}

export default Login

