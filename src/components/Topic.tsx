import React from 'react';
import type { Topic, Thought, UserProfile } from '../types/types';
import ThoughtForm from './ThoughtForm';
import ThoughtItem from './ThoughtItem';

interface TopicProps {
    topic: Topic;
    userProfileId: string | undefined;
    userProfiles: UserProfile[];
  onUpdateTopic:(topic: Topic) => void;
}

const Topic: React.FC<TopicProps> = ({ topic, userProfileId, userProfiles, onUpdateTopic }) => {
  const handleAddThought = (newThought:Thought) => {
    topic.thoughts.push(newThought);
    onUpdateTopic(topic);
    };

 const handleUpdateThought = (newThought:Thought) => {
     const index = topic.thoughts.findIndex((thought) => thought.id === newThought.id);
        if (index !== -1) {
            topic.thoughts[index] = newThought;
           onUpdateTopic(topic);
     }
}

    return (
        <div className="bg-white shadow-md rounded-md p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">{topic.title}</h3>
          <ThoughtForm topicId={topic.id} userProfileId={userProfileId|| ''} onAddThought={handleAddThought} />
            <div className="mt-4">
                {topic.thoughts.map((thought) => (
                    <ThoughtItem key={thought.id} thought={thought} userProfileId={userProfileId} userProfiles={userProfiles} onUpdateThought={handleUpdateThought} />
                ))}
            </div>
        </div>
    );
};

export default Topic;