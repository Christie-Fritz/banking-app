import React, { useContext } from 'react';
import { UserContext } from './context';
import Card from 'react-bootstrap/Card';

function AllData() {
  const ctx = useContext(UserContext);
  return (
    <Card>
      <Card.Body>
        Users
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Balance</th>
            </tr>
            {
              ctx.users.map((user, index) => <tr key={index}>
                <th>{user.name}</th>
                <th>{user.email}</th>
                <th>{user.password}</th>
                <th>{user.balance}</th>
              </tr>)
            }
            </thead>
        </table>
        <br />
        Submissions
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Data</th>
            </tr>
            {
              ctx.submissions?.map((submission, index) => <tr key={index}>
                <th>{submission.type}</th>
                <th>{JSON.stringify(submission.data)}</th>
              </tr>)
            }
          </thead>
        </table>
      </Card.Body>
    </Card>
  );
}

export default AllData;
