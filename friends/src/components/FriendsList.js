import React, { Component } from 'react';
import { Friend } from './Friend';
import friends from './friends';

const getUniqueId = (() => {
    let count = 0;
    
    return () => ++count;
})();

class FriendsList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            query: '',
            filterField: 'name',
            orderBy: 'name',
            order: 'descending',
        };
        
        this.textFilters = [
            {
                text: 'Name',
                value: 'name',
            },
            {
                text: 'Address',
                value: 'current_location',
            },
            {
                text: '# Friends',
                value: 'friend_count',
            },
            {
                text: 'Status',
                value: 'status',
            },
        ];
    }
    
    render() {
        const friendList = friends
            .filter( friend => {
                let result = false;
                // eslint-disable-next-line
                if (typeof friend[this.state.filterField] == 'object' && friend[this.state.filterField] !== null) {
                    result = !!Object.keys(friend[this.state.filterField])
                        .find(key => String(friend[this.state.filterField][key]).toLowerCase().includes(this.state.query.toLowerCase()));
                } else if (!friend[this.state.filterField] && !this.state.query.length) {
                    result = true;
                } else {
                    result = String(friend[this.state.filterField])
                        .toLowerCase()
                        .includes(this.state.query.toLowerCase());
                }
                
                return result;
            })
            // eslint-disable-next-line 
            .sort(this.state.orderBy == 'name' ? this.sortByName : this.sortByFriends)
            .map(friend => (
                <Friend 
                    currentLocation={friend.current_location || {}}
                    friendCount={friend.friend_count}
                    key={friend.$$hashKey}
                    name={friend.name}
                    pictureUrl={friend.pic_square}
                    status={friend.status ? friend.status.message : ''}
                />
            ));
        const textFilterOptions = this.textFilters
            .map(option => <option value={option.value} key={getUniqueId()}>{option.text}</option>);
        
        return (
            <div>
                <form className="form-inline searchForm">
                    <div className="form-group">
                        <input type="text" value={this.state.query} className="form-control" placeholder="Search for Friends" onChange={this.handleChange.bind(this, 'query')}/>
                        
                        <select className="input-medium" onChange={this.handleChange.bind(this, 'filterField')} value={this.state.filterField}>
                            { textFilterOptions }
                        </select>
                        
                        <select className="input-medium" value={this.state.orderBy} onChange={this.handleChange.bind(this, 'orderBy')}>
                            <option value="name">Name</option>
                            <option value="friend_count"># Friends</option>
                        </select>
                        
                        <select className="input-medium" value={this.state.order} onChange={this.handleChange.bind(this, 'order')}>
                            <option value="descending">Descending</option>
                            <option value="ascending">Ascending</option>
                        </select>
                    </div>
                </form>
                
                <ul>
                    { friendList }
                </ul>
            </div>
        );
    }
    
    handleChange(field, event) {
        this.setState({ [field]: event.target.value });
    }
    
    // eslint-disable-next-line
    sortByFriends = (a, b) => (b.friend_count - a.friend_count) * (this.state.order == 'ascending' ? -1 : 1);
    
    // eslint-disable-next-line
    sortByName = (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()) * (this.state.order == 'ascending' ? -1 : 1);
    
    frindCityIncludesQuery = (field, friend, query) => friend.current_location[field].includes(query);
}

export { FriendsList };