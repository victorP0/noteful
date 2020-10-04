import React from 'react';

export default class ErrorPage extends React.Component{
constructor(){
    super();
    this.state = {
        error:null
    }
}

static getDerivedStateFromError(error){
    console.error(error);
    return {error}
}

    render(){
        if (this.state.error){
        return (
            <div>
                <p>Something went wrong</p>
            </div>
        )
    }
    return this.props.children
}
}