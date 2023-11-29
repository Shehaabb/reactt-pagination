import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UserProfile from './UserProfile'; 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
function App() {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  async function getPage(page = 1) {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`);
    const data = await response.json();
    setUsers(data.data);
    setTotalPages(data.total_pages);
  }

  useEffect(() => {
    getPage();
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <div className="p-5">
          <div className="header">
            <h1>Users List</h1>
          </div>
          <div id="container">
            {users.map(user => (
              <div className="user-card card" style={{ width: '18rem' }} key={user.id}>
                <img src={user.avatar} className="card-img-top p-0" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                  <p className="card-text">{user.email}</p>
                  <Link to={`/user/${user.id}`} className="btn btn-primary">Read More</Link>
                </div>
              </div>
            ))}
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination p-5">
              {[...Array(totalPages).keys()].map(i => (
                <li className="page-item" key={i}>
                  <Link to={`/?page=${i + 1}`} className="page-link" onClick={() => getPage(i + 1)}>
                    {i + 1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      } />
      <Route path="/user/:userId" element={<UserProfile />} />
    </Routes>
  );
}

export default App;
