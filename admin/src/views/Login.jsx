import React, {useState,useEffect} from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { logUser } from "../../redux/actions/users";

const Login = ({getUser, logUser, history}) => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");    
    const [ error, setError ] = useState({msg: null, target: null});    

    function tryLogin() {
        logUser(email,password,()=>history.replace("/spaces/pending"), err => {
            if (err && err.target) setError(err);
        })
    }

    useEffect(()=>{
        setError({msg: null, target: null});
    }, [email, password])

    return <FullScreen>
        <Center>
            <h3>Hola <strong>Admin!</strong></h3>
            <p>Iniciá sesión con tu cuenta de administrador</p>
            <Input error={error.target == "email" ? error.msg : null } placeholder="Email" onChange={(ev)=>setEmail(ev.target.value)} value={email}/>
            {
                error.target == "email" ? <Error>{error.msg}</Error> : null
            }
            <Input type="password" error={error.target == "pass" ? error.msg : null }  placeholder="Contraseña" onChange={(ev)=>setPassword(ev.target.value)} value={password}/>
            {
                error.target == "pass" ? <Error>{error.msg}</Error> : null
            }
            {
                error.target == "all" ? <Error>{error.msg}</Error> : null
            }
            <Button className="disabled" onClick={tryLogin}>Iniciar sesión</Button>
        </Center>
    </FullScreen>
}

const mapStateToProps = (state, ownProps) => ({
    
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    logUser: (...params) => dispatch(logUser(...params)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);

const FullScreen = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url("/ext-api/us-central1/app/public/images/fondo.jpg");
    background-size: cover;

    &::after {
        content: " ";
        width: 100vw;
        height: 100vh;
        display: block;
        position: absolute;
        left: 0px;
        right: 0px;
        z-index: 1;
        background-color: #4388f2d1;
    }
`

const Input = styled.input`
    background-color: transparent;
    border: solid 1px ${p => p.error ? "rgb(255, 99, 71)" : "white"};
    padding: 6px 24px;
    border-radius: 24px;
    margin-top: 18px;
    color: ${p => p.error ? "rgb(255, 99, 71)" : "white"};
    font-size: 14px;

    &::placeholder {
        color: ${p => p.error ? "rgb(255, 99, 71)" : "white"};
        
    }

    &:focus {
        outline: transparent auto 0px;
    }
`

const Center = styled.div`
    width: 30vw;
    height: 400px;
    display: flex;
    box-sizing: content-box;
    width: 350px;
    z-index: 2;
    color: white;
    position: absolute;
    top: calc(50vh - 200px);
    left: calc(50vw - 175px);
    justify-content: center;
    flex-direction: column;
`

const Button = styled.button`
    background-color: transparent;
    border: solid 1.5px #1c3c84;
    color: #1c3c84;
    padding: 6px 18px;
    border-radius: 24px;
    margin-bottom: 24px;
    transition: background-color 300ms, color 300ms;
    margin-top: 24px;
    font-weight: 500;

    &:hover {
        background-color: #1c3c84;
        color: white;
    }

    &:focus {
        background-color: #1c3c84;
        color: white;
        outline: transparent auto 0px;
    }


    &.disabled:hover {
        background-color: transparent;
        color: #1c3c84;
    }
`

const Error = styled.p`
    margin: 6px 0px 0px;
    color: rgb(255, 99, 71);
    font-size: 14px;
    text-align: center;
`