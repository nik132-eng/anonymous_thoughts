import React, { useState, useEffect } from "react";
import CreateProfile from "./components/CreateProfile";
import AddTopic from "./components/AddTopic";
import TopicComponent from "./components/Topic";
import type { UserProfile, Topic } from "./types/types";
import "./index.css";

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(
    () => {
      const savedProfile = localStorage.getItem("userProfile");
      return savedProfile ? JSON.parse(savedProfile) : undefined;
    }
  );

  const [topics, setTopics] = useState<Topic[]>(() => {
    const savedTopics = localStorage.getItem("topics");
    return savedTopics ? JSON.parse(savedTopics) : [];
  });

  const [userProfiles, setUserProfiles] = useState<UserProfile[]>(() => {
    const savedProfiles = localStorage.getItem("userProfiles");
    return savedProfiles ? JSON.parse(savedProfiles) : [];
  });

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      setUserProfiles((prevProfiles) => {
        if (!prevProfiles.find((profile) => profile.id === userProfile.id))
          return [...prevProfiles, userProfile];
        return prevProfiles;
      });
    }
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem("userProfiles", JSON.stringify(userProfiles));
  }, [userProfiles]);

  useEffect(() => {
    localStorage.setItem("topics", JSON.stringify(topics));
  }, [topics]);

  const handleProfileCreated = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const handleAddTopic = (newTopic: Topic) => {
    setTopics((prevTopics) => [...prevTopics, newTopic]);
  };
  const handleUpdateTopic = (newTopic: Topic) => {
    const index = topics.findIndex((topic) => topic.id === newTopic.id);
    if (index !== -1) {
      setTopics((prevTopics) => {
        prevTopics[index] = newTopic;
        return [...prevTopics];
      });
    }
  };

  const handleLogout = () => {
    setUserProfile(undefined);
  };

  if (!userProfile) {
    return <CreateProfile onProfileCreated={handleProfileCreated} />;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Anonymous Thoughts</h1>
        <div className="flex items-center">
          {userProfile.profilePicture && (
            <img
              src={userProfile.profilePicture}
              alt="Profile"
              className="w-8 h-8 rounded-full mr-2"
            />
          )}
          <span className="font-semibold text-gray-700 mr-2">
            {userProfile.name}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
      </div>
      <AddTopic onAddTopic={handleAddTopic} />
      <div className="mt-4">
        {topics.map((topic) => (
          <TopicComponent
            key={topic.id}
            topic={topic}
            userProfileId={userProfile.id}
            userProfiles={userProfiles}
            onUpdateTopic={handleUpdateTopic}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
