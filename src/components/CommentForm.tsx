import React, { useState } from 'react';
import { Comment } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

interface CommentFormProps {
    userProfileId: string | undefined;
    onAddComment: (comment:Comment) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ userProfileId, onAddComment }) => {
    const [commentText, setCommentText] = useState('');
    const [commentImage, setCommentImage] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      if (!userProfileId) {
        console.error("User profile ID is not available.");
          return;
      }
      const newComment: Comment = {
            id: uuidv4(),
            userId: userProfileId,
            text: commentText,
            image: commentImage,
             date:new Date().toLocaleString()
        };
        onAddComment(newComment)
      setCommentText('');
       setCommentImage(undefined);
    };

 const handleCommentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const file = e.target.files?.[0];
       if (file) {
           const reader = new FileReader();
           reader.onload = (e) => {
             setCommentImage(e.target?.result as string);
           };
          reader.readAsDataURL(file);
       }
  };

    return (
      <form onSubmit={handleSubmit} className="mb-4">
          <textarea
              placeholder="Write your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
        <input
          type="file"
          accept="image/*"
          onChange={handleCommentImageChange}
            className="mb-2"
            />
        <button
              type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >Add Comment</button>
        </form>
    );
};

export default CommentForm;