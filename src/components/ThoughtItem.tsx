import React, { useState } from 'react';
import { Thought, UserProfile } from '../types/types';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface ThoughtItemProps {
  thought: Thought;
    userProfileId: string | undefined;
  userProfiles: UserProfile[];
  onUpdateThought:(thought:Thought) => void;
}

const ThoughtItem: React.FC<ThoughtItemProps> = ({ thought, userProfileId, userProfiles,onUpdateThought }) => {
  const [showComments, setShowComments] = useState(false);

  const handleShowComment = () => {
        setShowComments(!showComments);
  };

 const handleUpdateComments = (newComment:any) => {
        thought.comments.push(newComment);
     onUpdateThought(thought);
    };

    const getUserName = (userId: string): string => {
        const user = userProfiles.find((user) => user.id === userId);
        return user ? user.name : 'Unknown';
    };

    return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
             <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">
                By: {getUserName(thought.userId)}
               </span>
                <button onClick={handleShowComment} className="font-semibold cursor-pointer text-blue-600 hover:text-blue-800">
                    {showComments ? 'Hide Comments' : 'Show Comments'}
                </button>
            </div>
          {showComments && (
              <div className="mt-4">
                <CommentForm userProfileId={userProfileId} onAddComment={handleUpdateComments} />
                <div className="mt-4">
                  {thought.comments.map((comment) => (
                      <CommentItem key={comment.id} comment={comment} userProfiles={userProfiles} />
                    ))}
                  </div>
              </div>
          )}
        </div>
    );
};

export default ThoughtItem;