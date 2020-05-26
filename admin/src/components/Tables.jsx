import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Spaces = ({spaces, pages, actual}) => {
    if (!spaces || spaces.length == 0) return <h5>No hay usuarios</h5>
    return <Table>
        <Head>
            <Label>Fecha</Label>
            <WideLabel>Publicaciones</WideLabel>
        </Head>
        {
            spaces.map((space,i) => (
                <Row key={i}>
                    <Label>{space.createdAt || "12/4/20"}</Label>
                    <WideLabel>
                        <WideLabel>{space.title}{space.verified ? <Verified/> : null}</WideLabel>
                        <Link to={`/spaces/details/${space.id}`}>
                            <Details>Ver</Details>
                        </Link>
                    </WideLabel>
                </Row>
            ))
        }

        <PagesRow>
        {
            (new Array(pages)).fill(null).map((_,i) => (
                <Link key={i} to={`${i+1}`}>
                    <Page key={i} active={(actual == i+1)+""}>{i+1}</Page>
                </Link>
            ))
        }
        </PagesRow>
    </Table>
}

export const Users = ({users}) => {
    return <Table>
        <Head>
            <Label>Nombre</Label>
            <Label>Apellido</Label>
            <Label w={220}>Email</Label>
            <Label>Teléfono</Label>
        </Head>
        {
            (users || []).map((user,i) => (
                <Row key={i} bg={user.admin ? "#eff1ff" : "transparent"}>
                    <Label>{user.firstName}</Label>
                    <Label>{user.lastName}</Label>
                    <Label w={220}>{user.email}{user.emailVerified ? <Verified/> : null }</Label>
                    <Label>{user.phoneNumber}</Label>

                </Row>
            ))
        }
    </Table>
}


const Table = styled.div`
    margin-top: 24px;
    width: 100%;
`

const Label = styled.label`
    width: ${p => p.w || "120"}px;
    padding: 6px 6px;
    font-size: 12px;
    margin: 0px;
`


const WideLabel = styled(Label)`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-self: center;
    padding: 0px 6px;
    
    & > label {
        padding-left: 0px;
    }
`


const Row = styled.div`
    display: flex;
    flex-direction: row;
    padding: 6px 0px;
    align-items: center;
    border-bottom: solid 1px #DDD;
    background-color: ${p => p.bg || "transparent"};
`

const Head = styled(Row)`
    background-color: #DDD;
    font-weight: 600;
    padding: 4px 0px 3px;
    

    & label {
        padding: 0px 6px;
    }
`

const Details = styled.button`
    font-size: 12px;
    padding: 6px 24px;
    border-radius: 5px;
    background-color: #4a94e9;
    border: none;
    color: white;
    width: 80px;
    transition: background-color 300ms;

    &:hover {
        background-color: #2d2d55;
        border: none;
    }

    &:focus {
        outline: none;
        border: none;
    }

    &:active {
        border: none;
        outline: none; 
        background-color: #2d2d55;
    }
`

const Verified = styled.section`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #6abc61;
    margin: 0px;
    left: 4px;
    display: inline-block;
    position: relative;
`

const PagesRow =styled.div`
    display: flex;
    margin: 12px 0;
    width: 100%;
    justify-content: center;
`

const Page = styled.label`
    color: ${p => p.active == "true"? "#2d2d55" : "#4a94e9"};
    margin: 0 3px;
    padding: 0 12px;
    line-height: 36px;
    height: 36px;
    box-sizing: border-box;
    border-radius: 3px;
    transition: background-color 300ms, color 300ms;

    &:hover {
        
        background-color: ${p => p.active == "true"? "#2d2d55" : "#4a94e9"};

        color: white;
    }

`