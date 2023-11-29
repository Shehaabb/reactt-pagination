import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './UserProfile.css'; 

function UserProfile() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useParams();

    useEffect(() => {
        async function fetchUser() {
            setIsLoading(true);
            try {
                const response = await fetch(`https://reqres.in/api/users/${userId}`);
                const data = await response.json();
                setUser(data.data);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser();
    }, [userId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }


    

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <div className="container">
                <div className="profile-card">
                    <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="profile-avatar" />
                    <div className="profile-info">
                        <h3>{`${user.first_name} ${user.last_name}`}</h3>
                        <p>{user.email}</p>
                        <Link to="/" className="btn btn-primary">Back to home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
