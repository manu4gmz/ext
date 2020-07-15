import React, { Component, useEffect, useState } from "react";

import SpaceForm from './Space';

import { connect } from 'react-redux'


export default ({ navigation }) => {
  return <SpaceForm navigation={navigation}/>
};
