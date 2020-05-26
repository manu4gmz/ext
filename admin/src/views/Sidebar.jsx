import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/users";
import { connect } from "react-redux";

const Sidebar = ({history, logout}) => (
    <Sidediv>
        <Header>Propiedades</Header>
        <List>
            <Link to="/spaces/pending/1">
                <Item>
                    Pendientes
                </Item>
            </Link>
            <Link to="/spaces/all/1">
                <Item>
                    Publicaciones
                </Item>
            </Link>
            <Link to="/spaces/verified/1">
                <Item>
                    Verificados
                </Item>
            </Link>
            <Disabled>Denunciar</Disabled>
        </List>
        <Header>Administración</Header>
        <List>
            <Link to="/users">
                <Item>
                    Usuarios
                </Item>
            </Link>
            <Item onClick={()=>logout(()=>history.replace("/login"))}>
                Logout
            </Item>
            <Disabled>Planes</Disabled>
            <Disabled>Publicidades</Disabled>
            <Disabled>Verificadores</Disabled>
            <Disabled>Administradores</Disabled>
            <Disabled>Roles</Disabled>
        </List>
    </Sidediv>
)

const mapDispatchToProps = (dispatch) => ({

    logout: (cb) => dispatch(logout(cb))
})

export default connect(null, mapDispatchToProps)(Sidebar);

const Sidediv = styled.div`
    height: calc( 100vh - 42px);
    background-color: #000944;
    width: 240px;
    overflow: hidden;
`

const List = styled.ul`
    list-style: none;
    padding: 0px;
    display: flex;
    flex-direction: column;
`

const Header = styled.h4`
    font-size: 14px;
    color: white;
    line-height: 42px;
    margin: 36px 24px 0;
    border-bottom: solid 1px #40436e;


`


const Item = styled.li`
    color: white;
    font-size: 14px;
    padding: 0 24px;
    transition: background-color 300ms;
    line-height: 42px;
    text-indent: 24px;
    text-decoration: none;

    &:hover {
        background-color: #2d2d55;
    }


    &:after {
        content: " ";
        width: 100%;
        display: block;
        border-bottom: solid 1px #40436e;
    }

`

const Disabled = styled(Item)`
    color: #5a5a92;

    &:hover {
        background-color: transparent;
    }

`
