import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import UserManagement from './UserMnagement';

const DeleteUsers = () => {
  const [users, setUsers] = useState([
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
  ]);
  const [selectedUser, setSelectedUser] = useState('');

  // Handler for selecting a user from the dropdown
  const handleSelectUser = (event) => {
    setSelectedUser(event.target.value);
  };

  // Handler for deleting the selected user
  const handleDeleteUser = () => {
    setUsers(users.filter(user => user !== selectedUser));
    setSelectedUser('');
  };

  return (
    <div>
    <UserManagement/>
    <div className="deleteUsersContainer">
      <h2>Delete Users</h2>
      <div>
        <select value={selectedUser} onChange={handleSelectUser}>
          <option value="">Select user to delete</option>
          {users.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
        <Button variant="danger" onClick={handleDeleteUser} disabled={!selectedUser}>
          Delete
        </Button>
      </div>
    </div>
    </div>
  );
};

export default DeleteUsers;
