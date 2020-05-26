import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = ({user}) => (
    <Header>
        <Logo src="/ext-api/us-central1/app/public/icons/logo.png"/>
        <label>Hola <strong>{user.firstName}</strong></label>
    </Header>
);

const mapStateToProps = (state) => ({
    user: state.users.logged
})


export default connect(mapStateToProps, null)(Navbar);

const Logo = styled.img`
    height: 29px;
    width: 86px;
    display: flex;
    margin-top: 7px;
`

const Header = styled.div`
    width: 100vw;
    height: 42px;
    background-color: #4a94e9;
    padding: 6px 36px 6px 25px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: white;

    box-sizing: border-box;
    align-items: center;

    & * {
        margin: 0px;
    }
`
