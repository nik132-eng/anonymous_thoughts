export interface UserProfile {
    id: string;
    name: string;
    profilePicture?: string;
}

export interface Comment {
    id: string;
    userId: string;
    text?: string;
    image?: string;
    date: string;
}

export interface Thought {
    id: string;
    topicId: string;
    userId: string;
    comments: Comment[];
}

export interface Topic {
    id: string;
    title: string;
    thoughts: Thought[];
}