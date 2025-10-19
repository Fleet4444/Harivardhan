import React from 'react';
import { communityPosts, users } from '../data/mockData';
import { HeartIcon } from '../components/icons';

const CommunityWall: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 mb-20">
       <div>
        <h2 className="text-3xl font-bold text-brand-dark mb-2">Community Wall</h2>
        <p className="text-gray-600">See what your fellow learners are creating!</p>
      </div>

      {communityPosts.map(post => {
        const author = users.find(u => u.id === post.authorId);
        if (!author) return null;

        return (
          <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 flex items-center space-x-3">
              <img className="h-12 w-12 rounded-full object-cover" src={author.avatarUrl} alt={author.name} />
              <div>
                <p className="font-semibold text-brand-dark">{author.name}</p>
              </div>
            </div>
            <p className="px-4 pb-3 text-gray-700">{post.text}</p>
            <img className="w-full h-auto object-cover" src={post.imageUrl} alt="Community post" />
            <div className="p-4">
              <button className="flex items-center space-x-2 text-gray-500 hover:text-brand-primary transition-colors">
                <HeartIcon className="w-6 h-6" />
                <span className="font-semibold">{post.likes}</span>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default CommunityWall;