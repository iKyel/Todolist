import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { workStore } from "../WorkStore";

interface UserProfile {
  data: {
    username: string;
    fullName: string;
  };
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [workItemTexts, setWorkItemTexts] = useState<string[]>([]);
  const userStore = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await userStore.getCurrentUserProfile();
        setProfile(userProfile);
        workStore.fetchWorkList();
      } catch (error) {
        console.error("Error fetching user profile:", error);

        // Narrow down the type of error
        if (error instanceof Error) {
          if (
            (error as any).response &&
            (error as any).response.status === 401
          ) {
            // Redirect to login page if authentication fails
            navigate("/login");
          }
        }
      }
    };

    fetchProfile();
  }, [userStore, navigate]);

  const handleLogout = async () => {
    try {
      await userStore.logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>
        <strong>Username:</strong> {profile.data.username}
      </p>
      <p>
        <strong>Full Name:</strong> {profile.data.fullName}
      </p>
      <p>
        <strong>Works:</strong>
        <ul>
          {workStore.workList.map((workItem) => (
            <li key={workItem._id}>{workItem.text}</li>
          ))}
        </ul>
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
