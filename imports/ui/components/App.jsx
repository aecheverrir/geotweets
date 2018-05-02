import React from 'react';

export default class App extends React.Component{
    constructor(){
        super();
        this.state = {
            count: 0
        }
    }

    render(){
        return(
            <div>
                <h1> GeoTweets </h1>
            </div>
        )
    }
}

