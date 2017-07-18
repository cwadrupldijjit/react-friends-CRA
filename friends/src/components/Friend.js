import React, { Component } from 'react';

class Friend extends Component {
    render() {
        const { city, state, country } = this.props.currentLocation;
        
        return (
            <li>
                <img src={ this.props.pictureUrl || 'https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yo/r/UlIqmHJn-SK.gif' } alt={`User avatar for ${this.props.name}`} className="profile-pic"/>
                
                <h3>{ this.props.name }</h3>
                
                {
                    city && state && country && (
                        <div className="location">
                            Location: { city }, { state }, { country }
                        </div>
                    )
                }
                
                {
                    this.props.status && (
                        <div className="status">
                            Status: { this.props.status }
                        </div>
                    )
                }
                
                <div className="num-friends">
                    Friends: { this.props.friendCount || 0 }
                </div>
            </li>
        );
    }
}

export { Friend };