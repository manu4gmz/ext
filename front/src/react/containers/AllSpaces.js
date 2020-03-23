import React from 'react'
import { connect } from 'react-redux'

import BackgroundAllSpaces from '../components/backgroundAllSpaces'

const AllSpaces = () => {
    const espacios = [
        {
            nombre: "Amplio para usos multiples.",
            observaciones: "120 mtr2 -Baño privado-Aire Acondicionado.-Musica",
            precio: 750,
            imgUrl: "https://image.shutterstock.com/image-photo/female-ballet-student-performing-arts-260nw-1332840722.jpg",
            categories: "120 mtr2 -Baño privado-Aire Acondicionado.-Musica",
            descripcion: "Excelente espacio ubicado en zona centrica , la verdad es la mejor zona de todo san isidro. Esto es una descripcion extensa asi puedo ver si funciona bien el texto y todas sus propiedades , espero que la gente me entienda que lo que puse aca no esta bien",
            caracteristicas: [{ nombre: "Wifi", icono: require("../../public/icons/wifi-ne.png") }, { nombre: "baños", icono: require("../../public/icons/toiletes-ne.png") }],
            comentarios: [{ user: "Pepe", comentario: "muy bueno" }, { user: "Nachito", comentario: "He visto mejores" }]
        }, {
            nombre: "Emprendimiento Nuñez 2464.",
            precio: 1300,
            imgUrl: "https://http2.mlstatic.com/emprendimiento-nunez-2464-D_NQ_NP_945278-MLA32880901619_112019-F.webp",
            caracteristicas: [{ nombre: "Ducha", icono: require("../../public/icons/ducha-ne.png") }],
            descripcion: "Excelente espacio ubicado en zona centrica , la verdad Desde Mercado Libre, nunca te pediremos contraseñas, PIN o códigos de verificación a través de WhatsApp, teléfono, SMS o email.",
        }
    ]
    return (
        <BackgroundAllSpaces espacios={espacios} />
    )
}

export default connect(null, null)(AllSpaces)
