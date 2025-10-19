import React, { useState, useMemo } from 'react';
import { courses, users } from '../data/mockData';
import { Course, SkillLevel } from '../types';
import CourseCard from '../components/CourseCard';

interface DashboardProps {
  searchTerm: string;
}

const Dashboard: React.FC<DashboardProps> = ({ searchTerm }) => {
  const [activeFilter, setActiveFilter] = useState<SkillLevel | 'All'>('All');

  const filters: (SkillLevel | 'All')[] = ['All', SkillLevel.BEGINNER, SkillLevel.INTERMEDIATE, SkillLevel.ADVANCED];

  const filteredCourses = useMemo(() => {
    let tempCourses = courses;

    // Filter by skill level
    if (activeFilter !== 'All') {
      tempCourses = tempCourses.filter(course => course.level === activeFilter);
    }

    // Filter by search term
    if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        tempCourses = tempCourses.filter(course => {
            const instructor = users.find(u => u.id === course.instructorId);
            return (
                course.title.toLowerCase().includes(lowercasedTerm) ||
                course.description.toLowerCase().includes(lowercasedTerm) ||
                (instructor && instructor.name.toLowerCase().includes(lowercasedTerm))
            );
        });
    }

    return tempCourses;
  }, [activeFilter, searchTerm]);

  return (
    <div className="space-y-8 mb-20">
      <div>
        <h2 className="text-3xl font-bold text-brand-dark mb-2">Explore Skills</h2>
        <p className="text-gray-600">Find the perfect skill to learn from local experts.</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
              activeFilter === filter
                ? 'bg-brand-primary text-white shadow'
                : 'bg-white text-brand-dark hover:bg-gray-100'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
            ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md border-2 border-dashed border-gray-300">
            <h3 className="text-xl font-semibold text-brand-dark">No Courses Found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;