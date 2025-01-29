import React, { useState } from 'react';
import { Topic } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

interface AddTopicProps {
    onAddTopic: (topic: Topic) => void;
}

const AddTopic: React.FC<AddTopicProps> = ({ onAddTopic }) => {
  const [topicTitle, setTopicTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      const newTopic: Topic = {
            id: uuidv4(),
            title: topicTitle,
            thoughts: [],
        };
      onAddTopic(newTopic);
        setTopicTitle('');
    };

  return (
        <form onSubmit={handleSubmit} className="flex mb-4">
            <input
                type="text"
                placeholder="Add Topic Name..."
                value={topicTitle}
                onChange={(e) => setTopicTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Topic</button>
        </form>
    );
};

export default AddTopic;