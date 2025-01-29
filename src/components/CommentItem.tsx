import React from 'react';
import { Comment, UserProfile } from '../types/types';

interface CommentItemProps {
    comment: Comment;
    userProfiles: UserProfile[];
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, userProfiles }) => {
  const getUserName = (userId: string): string => {
       const user = userProfiles.find((user) => user.id === userId);
     return user ? user.name : 'Unknown';
    };

  return (
      <div className="bg-gray-200 p-3 rounded-md mb-2 shadow-sm">
           <p className="text-sm text-gray-600 mb-1">
            {comment.date}
                <span className="font-semibold ml-2 text-gray-700">
                   by: {getUserName(comment.userId)}
                 </span>
            </p>
            {comment.text && <p className="text-gray-800">{comment.text}</p>}
          {comment.image && <img src={comment.image} alt="comment" className="mt-2 rounded-md max-w-full" />}
       </div>
  );
};

export default CommentItem;