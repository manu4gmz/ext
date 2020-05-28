import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import { fetchSpace, enableSpace, disableSpace, verifySpace, unverifySpace } from "../../redux/actions/spaces";

const excuses = [
    {
        short: "Imágenes inapropiadas",
        full: "La publicación del espacio ha sido rechazada ya que contiene imágenes que no se adecuan a los términos y condiciones.",
    },
    {
        short: "Nombre inapropiado",
        full: "La publicación del espacio ha sido rechazada ya que el titulo no es apropiado y no se adecua a los términos y condiciones."
    },
    {
        short: "Ubicación no válida",
        full: "La publicación del espacio ha sido rechazada ya que la dirección definida no es válida."
    },
    {
        short: "Ubicación fuera de alcance",
        full: "La publicación del espacio ha sido rechazada ya que la dirección no entra dentro del rango definido para la misma"
    },
    {
        short: "Valores incompletos",
        full: "La publicación del espacio ha sido rechazada ya que tiene valores incompletos / inválidos."
    }
]

const Details = ({ match, history, space, fetchSpace, disableSpace, enableSpace, verifySpace, unverifySpace }) => {
    useEffect(()=>{
        fetchSpace(match.params.id);
    },[]);

    const [ reason, setReason ] = useState("");
    const [ agreed, setAgreed ] = useState(null);
    const [ verifyConfirmation, setVerifyConfirmation ] = useState(false);
    const [ unverifyConfirmation, setUnverifyConfirmation ] = useState(false);

    const created = space.createdAt ? new Date(space.createdAt) : null;
    const updated = space.createdAt ? new Date(space.updatedAt) : null;
    const phoneNumber = space.user && space.user.phoneNumber && space.user.phoneNumber.replace(/(\+| )/g,"");
    const phone = phoneNumber ? `+54 9 ${phoneNumber.slice(3,5)} ${phoneNumber.slice(5,9)} ${phoneNumber.slice(9,13)}` : "No tiene teléfono";


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
        <Row>
            <Left>Fecha creación</Left>
            <Right>{created ?  `${created.getDate()}-${created.getMonth()}-${created.getFullYear()} ${created.getHours()}:${created.getMinutes()}` : "No tiene fecha"}</Right>
        </Row>
        <Row>
            <Left>Última actualización</Left>
            <Right>{updated ?  `${updated.getDate()}-${updated.getMonth()}-${updated.getFullYear()} ${updated.getHours()}:${updated.getMinutes()}` : "No tiene fecha"}</Right>
        </Row>

        <CardRow>
        {
            space.user ? 
            <Card>
                <h2>Propietario</h2>
                <hr/>
                <p>{space.user.firstName} {space.user.lastName}</p>
                <p>{space.user.email || "No tiene email"}</p>
                <p>{phone}</p>
            </Card>
            : null
        }
        {
            space.enabled && !space.verified? 
            <Card>
                <h2>Verificar espacio</h2>
                <p>Si ya has entrado en contacto con el propietario y hallas corroborado sus características, verifica el espacio para que los usuarios de la aplicación puedan hallarlo mas fácilmente.</p>
                <Option onClick={()=>setVerifyConfirmation(true)}>Verificar</Option>
                {
                    verifyConfirmation ? <Button onClick={()=>verifySpace(match.params.id)}>Confirmar</Button> : null
                }
            </Card>
            : null
        }
        <Card>
        {
            space.enabled ? 
            <div>
                <h2>Deshabilitar espacio</h2>
                <p>Si ha habido un problema con este espacio que infrinja los términos y condiciones, deshabilítalo y hácelo saber al propietario.</p>
                <Option onClick={()=>setAgreed(false)}>Deshabilitar espacio</Option>
            </div>
            : 
            <div>
                <h2>Confirmar espacio</h2>
                {
                    space.rejected ? 
                    <p>Este espacio ha sido rechazado, ¿aun así considera que este espacio es aducuado según los estándares de calidad de Espacio por Tiempo?</p>
                    : 
                    <p>¿Considera que este espacio es aducuado según los estándares de calidad de Espacio por Tiempo?</p>
                }
                <Option onClick={()=>setAgreed(true)}>Si</Option>
                {
                    !space.rejected ?
                    <Option onClick={()=>setAgreed(false)}>No estoy de acuerdo</Option>
                    : null
                }
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
        </Card>
        {
            space.verified? 
            <Card>
                <h2>Anular verificado</h2>
                <p>Si hubo algún problema y debe removerle el verificado a un espacio</p>
                <Option onClick={()=>setUnverifyConfirmation(true)}>Anular verificado</Option>
                {
                    unverifyConfirmation ? <Button onClick={()=>unverifySpace(match.params.id)}>Confirmar</Button> : null
                }
            </Card>
            : null
        }
        </CardRow>

    </div>
}

const mapStateToProps = (state, ownProps) => ({
    space: state.spaces.space
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchSpace: (id) => dispatch(fetchSpace(id)),
    enableSpace: (id) => dispatch(enableSpace(id)),
    disableSpace: (id, reason) => dispatch(disableSpace(id, reason)),
    verifySpace: (id) => dispatch(verifySpace(id)),
    unverifySpace: (id) => dispatch(unverifySpace(id)),
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

const CardRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 24px 12px 64px;
    align-items: flex-start;

`

const Card = styled.div`
    flex: 1;
    margin: 12px;
    flex-direction: column;
    max-width: 420px;
    padding: 24px;
    border-radius: 6px;
    border: solid 1px #DDD;
    display: flex;
    box-shadow: 0px 3px 12px #0000002e;
    transition: box-shadow 300ms;

    &:hover {
        box-shadow: 0px 3px 24px #0000002e;

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
    min-height: 140px;

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
    font-weight: 500;
    color: #000944;
    &:hover {
        cursor: pointer;
        color: #5a5a92;
    }

    & ~ label:before {
        content: "-";
        margin: 0 6px;
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