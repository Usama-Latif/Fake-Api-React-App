import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function UserList() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchId, setSearchId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleSearchChange = (event) => {
        setSearchId(event.target.value);
    };

    const handleSearchSubmit = () => {
        const user = users.find((user) => user.id.toString() === searchId);
        if (user) {
            setSelectedUser(user);
        } else {
            alert('User not found');
        }
    };

    const renderUserList = () => {
        return (
            <ul>
                {users.map((user) => (
                    <li key={user.id} onClick={() => handleUserClick(user)}>
                        {user.name}
                    </li>
                ))}
            </ul>
        );
    };

    const renderSelectedUser = () => {
        if (!selectedUser) return null;
        return (
            <div>
                <h2>{selectedUser.name}</h2>
                <p>Email: {selectedUser.email}</p>
                <p>Phone: {selectedUser.phone}</p>
            </div>
        );
    };

    return (
        <div>
            <h1>User List</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '1' }}>
                    {renderUserList()}
                    <input
                        type="text"
                        placeholder="Enter User ID"
                        value={searchId}
                        onChange={handleSearchChange}
                    />
                    <button onClick={handleSearchSubmit}>Search</button>
                </div>
                <div style={{ flex: '2' }}>{renderSelectedUser()}</div>
            </div>
        </div>
    );
};

export default UserList;
