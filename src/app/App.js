import React from 'react';
import Login from "../security/login";
import HomePage from "../home-page";

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {isLoggedIn: false};
    }

    render() {
        if(this.state.isLoggedIn){
            return <HomePage />
        }else{
            return (
                <div>
                    <Login />
                </div>);
        }
    }
}
