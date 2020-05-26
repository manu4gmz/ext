import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

export default ({title, total, query, onQuery}) => {


    //const [toDate,setToDate ] = useState()

    return <Wide>
        <Title>{title || "Publicaciones"} {total ? `(${total})` : null}</Title>
        <Label>Fecha desde</Label>
        <Input placeholder="dd/mm/aa"/>
        <Label>Fecha hasta</Label>
        <Input placeholder="dd/mm/aa"/>
        {
            typeof onQuery == "function" ? <Search value={query} onChange={ev => onQuery(ev.target.value)} placeholder="Buscar por zona, categoria, palabra clave, etc"/> : null
        }
    </Wide>
}

const Wide = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Title = styled.h3`
    flex: 1;
    flex-grow: 2;
    font-size: 22px;
    font-weight: 600;
`

const Input = styled.input`
    background-color: transparent;
    padding: 6px 24px;
    font-size: 12px;
    border-radius: 6px;
    border: solid 1px #555;
    width: 64px;
    box-sizing: content-box;

`

const Label = styled.label`
    margin: 0 12px;
    font-size: 12px;
`

const Search = styled(Input)`
    flex-grow: 1;
    margin-left: 48px;

    &:focus {
        border-color: #4a94e9;
        background-color: #e7f2ff;
        border-width: 1.5px;
        outline: transparent auto 0px;
    }
`
