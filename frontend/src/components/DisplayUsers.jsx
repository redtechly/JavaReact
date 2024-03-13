import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import UserManagement from './UserMnagement'

const DisplayUsers = () => {
    const [users] = useState([
        'user1@example.com',
        'user2@example.com',
        'user3@example.com'
      ]);
  return (
    <div>
    <UserManagement/>
    <div className="usersPageContainer">
    <h2>Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user}>
              <td>{user}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
  )
}

export default DisplayUsers
