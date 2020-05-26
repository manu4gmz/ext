import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import { fetchSpace } from "../../redux/actions/spaces";

const Details = ({ match, history, space, fetchSpace }) => {
    useEffect(()=>{
        fetchSpace(match.params.id);
    },[]);

    console.log(space.photos);

    return <div>
        <h2>{space.title}</h2>
        {
            space.photos && space.photos.length ? 
            <HorizontalScroll>
                {
                    space.photos.map((img, key) => (
                        <Image key={key} src={img}/>
                    ))
                }
            </HorizontalScroll> 
            : null
        }
        <Row>
            <Left>Descripción</Left>
            <Right>{space.description || "No tiene descripción"}</Right>
        </Row>
        <Row>
            <Left>Observaciones</Left>
            <Right>{space.observations || "No tiene observación"}</Right>
        </Row>
        <Row>
            <Left>Reglas de convivencia</Left>
            <Right>{space.rules || "No tiene reglas"}</Right>
        </Row>
        <Row>
            <Left>Precio</Left>
            {
                space.price ?
                <Right>{space.price}/hora { space.cleanup ? " + " + space.cleanup : ""}</Right>
                : null
            }
        </Row>
        <Row>
            <Left>Servicios</Left>
            <Right>
                <ul>
                    {
                        space.services && space.services.length ? 
                        space.services.map((service,i) => (
                            <li key={i}>{service}</li>
                        )) 
                        : null
                    }
                </ul>
            </Right>
        </Row>
        <Row>
            <Left>Ubicación</Left>
                <Right>{space.province}, {space.neighborhood} {space.streetNumber}{space.floor ? <label>{" "}- {space.floor} {space.apt}</label> : null}</Right>
        </Row>
        {
            space.location && space.location[0] && space.location[0].lng ?
            <iframe style={{width: "100%", border: "none", height: "300px"}} src={`http://maps.google.com/maps?q=${space.location[0].lat},${space.location[0].lng}&output=embed&z=17`}></iframe>
            : null
        }
        {
            space.user ? 
            <div>
                <hr />
                <h4>Propietario</h4>
                <p>{space.user.firstName} {space.user.lastName}</p>
                <p>{space.user.email || "No tiene email"}</p>
                <p>{space.user.phoneNumber || "No tiene teléfono"}</p>
            </div>
            : null
        }
    </div>
}

const mapStateToProps = (state, ownProps) => ({
    space: state.spaces.space
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchSpace: (id) => dispatch(fetchSpace(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);

const HorizontalScroll = styled.div`
    width: 100%;
    overflow-y: hidden;
    overflow-x: scroll;
    display: flex;
    margin-bottom: 24px;

    &:first-child {
        margin-left: 0px;
    }

`

const Image = styled.img`
    height: 240px;
    margin: 6px;
    border-radius: 3px;
`

const Row = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    border-bottom: solid 1px #DDD;
    padding: 12px 0;
    transition: background-color 300ms;

    &:hover {
        background-color: #f8f8f8;
    }
`

const Left = styled.div`
    width: 200px;
    font-weight: 500;
    margin-left: 12px;
`

const Right = styled.div`
    flex: 1;
    margin-left: 12px;

    & ul {
        margin-bottom: 0px;
    }
`