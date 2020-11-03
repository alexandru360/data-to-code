import React from 'react';
import HomePage from "../home-page";

export default class App extends React.Component {
    constructor() {
        super();
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
