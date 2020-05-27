import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import { fetchSpace, enableSpace, disableSpace } from "../../redux/actions/spaces";

const excuses = [
    {
        short: "Imágenes inapropiadas",
        full: "La publicación del espacio ha sido rechazada ya que contiene imágenes que no se adecuan a los términos y condiciones.",
    },
    {
        short: "Nombre inapropiado",
        full: "La publicación del espacio ha sido rechazada ya que el titulo no es apropiado y no se adecua a los términos y condiciones."
    }
]

const Details = ({ match, history, space, fetchSpace, disableSpace, enableSpace }) => {
    useEffect(()=>{
        fetchSpace(match.params.id);
    },[]);

    const [ reason, setReason ] = useState("");

    const [ agreed, setAgreed ] = useState(null);

    function disable () {
        setReason("");
        setAgreed(null);
        disableSpace(match.params.id);
    }

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
        <Centered>

        {
            space.enabled ? 
            <Option onClick={disable}>Deshabilitar espacio</Option>
            : 
            <div>
                <h1>Confirmar espacio</h1>
                <p>¿Considera que este espacio es aducuado según los estándares de calidad de Espacio por Tiempo?</p>
                <Option onClick={()=>setAgreed(true)}>Si</Option> - <Option onClick={()=>setAgreed(false)}>No estoy de acuerdo</Option>
                {
                    agreed == true ? <Button onClick={()=>enableSpace(match.params.id)}>Confirmar</Button> : null
                }
            </div>
        }
        {
            agreed == false ?
            <div>
                {
                    excuses.map((excuse, i) => (
                        <Excuse onClick={()=>setReason(excuse.full)} key={i}>{excuse.short}...</Excuse>
                    ))
                }
                <Textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Escribe el motivo aquí"></Textarea>
                <Button onClick={disable}>Rechazar</Button>
            </div>
            : null
        }
        </Centered>
    </div>
}

const mapStateToProps = (state, ownProps) => ({
    space: state.spaces.space
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchSpace: (id) => dispatch(fetchSpace(id)),
    enableSpace: (id) => dispatch(enableSpace(id)),
    disableSpace: (id, reason) => dispatch(disableSpace(id, reason)),
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

const Centered = styled.div`
    width: 500px;
    margin: 24px auto 64px;
`

const Textarea = styled.textarea`
    width: 100%;
    display: block;
    padding: 12px;
    background-color: transparent;
    border: solid 1px #DDD;
    border-radius: 3px;

    &:focus {
        outline: none;
    }
`

const Button = styled.button`
    background-color: #4a94e9;
    height: 36px;
    line-height: 36px;
    border-radius: 50px;
    padding: 0 12px;
    color: white;
    border: none;
    transition: background-color 300ms;
    display: block;
    margin-top: 12px;

    &:hover {
        background-color: #000944;
    }

    &:active, &:focus {
        outline: none;
    }
`

const Option = styled.label`
    transition: color 300ms;

    &:hover {
        color: #AAA;
    }
`

const Excuse = styled.label`
    color: #AAA;
    transition: color 300ms;
    margin-right: 12px;
    &:hover {
        color: #555;
    }
`