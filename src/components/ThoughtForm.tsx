import React from 'react';
import { Thought } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

interface ThoughtFormProps {
    topicId: string;
    userProfileId: string;
    onAddThought: (thought: Thought) => void;
}

const ThoughtForm: React.FC<ThoughtFormProps> = ({ topicId, userProfileId, onAddThought }) => {
  const handleAddThought = (e: React.FormEvent) => {
        e.preventDefault();
      const newThought: Thought = {
            id: uuidv4(),
            topicId: topicId,
            userId: userProfileId,
            comments: []
        };
      onAddThought(newThought);
    };

    return (
        <form onSubmit={handleAddThought} className='mt-2'>
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Thought</button>
        </form>
    );
};

export default ThoughtForm;