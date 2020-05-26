import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import Filters from "../components/Filters";
import { Users as Table } from "../components/Tables";
import { fetchUsers } from "../../redux/actions/users";

const UsersComp = ({users, match, history, fetchUsers}) => {

    const [query, setQuery] = useState("");

    useEffect(()=>{

        fetchUsers(query);

    },[query]);


    return <Fragment>
        <Filters title="Usuarios" query={query} onQuery={setQuery}/>
        <Table users={users}/>
    </Fragment>
}

const mapStateToProps = (state) => ({
    users: state.users.all
})

const mapDispatchToProps = (dispatch) => ({
    fetchUsers: (q) => dispatch(fetchUsers(q))
})


export default connect(mapStateToProps,mapDispatchToProps)(UsersComp);