import React, { Fragment, useEffect, useState } from "react";
import { Switch, Route, Redirect} from "react-router";
import Spaces from "./views/Spaces";
import Users from "./views/Users";
import Sidebar from "./views/Sidebar";
import Navbar from "./views/Navbar";
import styled from "styled-components";
import Details from "./views/Details";
import Login from "./views/Login";
import { connect } from "react-redux";
import { getUser } from "../redux/actions/users";


const App = ({getUser, user}) => {
    console.log(process.env.URL)
    useEffect(()=>{
        getUser();
    },[])

    return <div>
        { user.uid ? <Navbar/> : null }
        <Wide>
            <Switch>

                <Route path={"/login"} component={Login}/>

                { user.notLogged ? <Redirect to="/login"/> : null }
                {
                    user.uid ?
                    <Fragment>
                        <Sidebar/>
                        <Content>
                            <Switch>
                                <Route path="/spaces/details/:id" component={Details} />
                                <Route path="/spaces/:type/:page" component={Spaces} />
                                <Route path="/users" component={Users} />
                                <Redirect to="/spaces/pending/1"/>
                            </Switch>
                        </Content>
                    </Fragment> 
                    : null
                }
            
            </Switch>
                    
            
            
        </Wide>
    </div>
}

/*
<Fragment>
<Sidebar/>
<Content>
    <Filters></Filters>
    <Spaces></Spaces>
</Content>
</Fragment> 
<Redirect to="login" exact />
*/

const mapStateToProps = (state) => ({
    user: state.users.logged
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getUser: () => dispatch(getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

const Content = styled.div`
    flex: 1;
    padding: 36px;
    overflow-y: scroll;
    height: calc(100vh - 42px);
`

const Wide = styled.div`
    display: flex;
    flex-direction: row;
`