import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import Filters from "../components/Filters";
import { Spaces as Table } from "../components/Tables";
import { fetchSpaces } from "../../redux/actions/spaces";
import { Redirect } from "react-router-dom";

const SpacesComp = ({allSpaces, match, history, fetchSpaces}) => {


    console.log(match, match.params.type)

    const { type, page } = match.params;
    
    if (!["pending","verified","all","rejected"].includes(type)) return <Redirect to="/spaces/pending/1"/>;// history.replace("pending");

    useEffect(()=>{
    
        //if (page == undefined) return history.replace(match.url+"/1")
        fetchSpaces(type, {}, page);

    },[type, page])


    console.log(allSpaces)
    const spaces = allSpaces[type];

    return <Fragment>
        <Filters total={spaces.total}/>
        <Table spaces={spaces.properties} pages={spaces.pages} actual={page}/>
    </Fragment>
}

const mapStateToProps = (state) => ({
    allSpaces: state.spaces
})

const mapDispatchToProps = (dispatch) => ({
    fetchSpaces: (type, filter, page) => dispatch(fetchSpaces(type,filter,page))
})


export default connect(mapStateToProps,mapDispatchToProps)(SpacesComp);