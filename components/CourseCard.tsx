import React from 'react';
import { Course, User, VerificationStatus } from '../types';
import { users } from '../data/mockData';
import { BadgeCheckIcon } from './icons';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const instructor = users.find(u => u.id === course.instructorId);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col">
      <img className="h-48 w-full object-cover" src={course.imageUrl} alt={course.title} />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-brand-dark mb-1 pr-2">{course.title}</h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${
                course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
            }`}>
            {course.level}
            </span>
        </div>
        {instructor && (
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span>By {instructor.name}</span>
            {instructor.verificationStatus === VerificationStatus.VERIFIED && (
                <BadgeCheckIcon className="w-4 h-4 text-brand-secondary ml-1.5" title="Verified Instructor" />
            )}
          </div>
        )}
        <p className="text-gray-700 text-sm flex-grow">{course.description}</p>
        
        <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
           <div className="flex justify-between items-center mb-2">
              <span>{course.duration}</span>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <span>{course.rating} ({course.reviews} reviews)</span>
              </div>
           </div>
           <div className="text-right">
                <span className="text-xl font-bold text-brand-primary">₹{course.price.toFixed(0)}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;