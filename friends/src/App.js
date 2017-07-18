import React, { Component } from 'react';
import './App.css';

import { FriendsList } from './components/FriendsList';

class App extends Component {
    render() {
        return (
            <div>
                <h1>The <string>Facebook</string> Friend Machine</h1>
                
                <div className="friends">
                    <FriendsList />
                </div>
            </div>
        );
    }
}

export default App;
