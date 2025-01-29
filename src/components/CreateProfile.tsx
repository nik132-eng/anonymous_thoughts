import React, { useState } from 'react';
import { UserProfile } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

interface CreateProfileProps {
    onProfileCreated: (profile: UserProfile) => void;
}

const CreateProfile: React.FC<CreateProfileProps> = ({ onProfileCreated }) => {
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string|undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
      if (name.trim() === '') {
          setError("Name cannot be empty.")
          return;
      }
      const newProfile: UserProfile = {
        id: uuidv4(),
        name,
        profilePicture,
      };
        onProfileCreated(newProfile);
    };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
      if(file) {
            const reader = new FileReader();
          reader.onload = (e) => {
              setProfilePicture(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        }
  };

    return (
      <div className="container mx-auto p-4 flex justify-center items-center h-screen">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
             <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create Profile</h2>
             <form onSubmit={handleSubmit} className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    />
                  <input
                     type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                   className="mb-4"
                  />
                  {error && <p className='text-red-500'>{error}</p>}
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Profile</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProfile;