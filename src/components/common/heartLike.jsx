import React, { Component } from 'react'

export default class heartLike extends Component {
    handleHeartClicked = () => {
        if(this.props.isLiked){
            this.props.onDislike(this.props.id)
        }else{
            this.props.onLike(this.props.id)
        }
    }

    render() {
        return (
            <i className={this.props.isLiked? "fa fa-heart" : "fa fa-heart-o"} aria-hidden="true" onClick={this.handleHeartClicked}></i>
        )
    }
}
