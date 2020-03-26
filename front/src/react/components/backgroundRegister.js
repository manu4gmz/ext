import React, { useEffect, useState } from 'react';
import AddSpaceFormProgress from './AddSpaceFormProgress'
import Form from './Form';

const mailValidation = (val) => {
    while (val && val.length) {
        if (!val.includes("@")) break;
        const [mail, end] = val.split("@");
        if (mail.length < 3 || end.length < 4) break;
        if (!val.includes(".")) break;
        const [domain, com] = val.split(".");
        if (domain.length < 4 || com.length < 2) break;
        return null;
    }
    return "Este mail no es válido";
}

const fields = [
    ["Nombre y Apellido", "Pepe Grillo"],
    ["Email", "nombre@mail.com", mailValidation],
    ["contraseña", "********"],
]

const backgroundRegister = ({ onSubmit }) => {

    return (
        <Form
            onSubmit={onSubmit}
            fields={fields}
            sendText="Registrarse"
        />
    )
}

export default backgroundRegister

