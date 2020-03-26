import React from "react";
import { connect } from "react-redux";

import BackgroundAllSpaces from "../components/backgroundAllSpaces";
import { fetchId } from "../../redux/actions/spaces"


// const AllSpaces = () => {
class AllSpaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espacios: [
        {
          id: 1,
          nombre: "Amplio espacio para usos multiples.",
          observaciones: "San Isidro - Buenos Aires - 120mtr2",
          precio: 750,
          imgUrl:
            "https://image.shutterstock.com/image-photo/female-ballet-student-performing-arts-260nw-1332840722.jpg",
          categories: "120 mtr2 -Baño privado-Aire Acondicionado.-Musica",
          descripcion:
            "Excelente espacio ubicado en zona centrica , la verdad es la mejor zona de todo san isidro. Esto es una descripcion extensa asi puedo ver si funciona bien el texto y todas sus propiedades , espero que la gente me entienda que lo que puse aca no esta bien",
          caracteristicas: [
            {
              nombre: "Wifi",
              cantidad: NaN,
              icono: require("../../public/icons/wifi-ne.png")
            },
            {
              nombre: "Baño",
              cantidad: 1,
              icono: require("../../public/icons/toiletes-ne.png")
            },
            {
              nombre: "Ducha",
              cantidad: 3,
              icono: require("../../public/icons/ducha-ne.png")
            }
          ],
          comentarios: [
            { user: "Pepe", comentario: "muy bueno" },
            { user: "Nachito", comentario: "He visto mejores" }
          ],
          verified: true
        },
        {
          id: 2,
          nombre: "Amplio espacio para usos multiples.",
          precio: 970,
          imgUrl:
            "https://http2.mlstatic.com/emprendimiento-nunez-2464-D_NQ_NP_945278-MLA32880901619_112019-F.webp",
          caracteristicas: [
            {
              nombre: "Ducha",
              cantidad: 1,
              icono: require("../../public/icons/ducha-ne.png")
            }
          ],
          descripcion:
            "Excelente espacio ubicado en zona centrica , la verdad Desde Mercado Libre, nunca te pediremos contraseñas, PIN o códigos de verificación a través de WhatsApp, teléfono, SMS o email.",
          comentarios: [],
          verified: false
        }
      ]
    };
    this.toggleLike = this.toggleLike.bind(this);
    this.sendId = this.sendId.bind(this);

  }

  toggleLike() {
    console.log("like", this.props.allSpaces)
  }
  sendId(id) {
    this.props.fetchId(id)
    return this.props.navigation.navigate('Root', { screen: `SingleView` })
  }

  render() {
    return (
      <BackgroundAllSpaces
        espacios={this.state.espacios}
        toggleLike={this.toggleLike}
        allSpaces={this.props.allSpaces}
        navigation={this.props.navigation}
        sendId={this.sendId}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

    allSpaces: state.spaces.allSpaces
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchId: (id) => (dispatch(fetchId(id)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSpaces);