import { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Profile</h1>
        <div className="profile-info">
          <div className="profile-field">
            <label>Name</label>
            <p>{user.name}</p>
          </div>
          <div className="profile-field">
            <label>Email</label>
            <p>{user.email}</p>
          </div>
          <div className="profile-field">
            <label>Role</label>
            <p className="role-badge">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
