import React, { Component } from "react";
import Drawer from "../components/Drawer"
import { connect, Provider } from "react-redux";



class DrawerContainer extends Component {
  constructor(props) {
    super(props);
  
    
  }

  render() {
    
    return (
        
      <Drawer />
    );
  }
}
export default connect(null, null)(DrawerContainer);