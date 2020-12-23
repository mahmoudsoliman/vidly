import React, { Component } from 'react'

export default class heartLike extends Component {
    state = {
        isLiked: false
    }

    handleHeartClicked = () => {
        if(this.state.isLiked){
            this.props.onDislike(this.props.id)
            this.setState({isLiked: false})
        }else{
            this.props.onLike(this.props.id)
            this.setState({isLiked: true})
        }
    }

    render() {
        return (
            <i className={this.state.isLiked? "fa fa-heart" : "fa fa-heart-o"} aria-hidden="true" onClick={this.handleHeartClicked}></i>
        )
    }
}
