import React from 'react';
import { certificatesData } from '../data/mockData';
import { AwardIcon } from '../components/icons';
import { User } from '../types';

interface CertificatesProps {
    user: User;
}

const Certificates: React.FC<CertificatesProps> = ({ user }) => {
  const userCertificates = certificatesData.filter(cert => cert.studentName === user.name);
  
  return (
    <div className="max-w-4xl mx-auto space-y-8 mb-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-brand-dark mb-2">My Certificates</h2>
        <p className="text-gray-600">A collection of all the skills you've mastered on SkillConnect.</p>
      </div>

      {userCertificates.length > 0 ? (
        <div className="space-y-6">
          {userCertificates.map((cert) => (
            <div key={cert.id} className="bg-white rounded-xl shadow-lg transform hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="bg-white rounded-md p-6 relative">
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-brand-accent rounded-tl-xl sm:w-16 sm:h-16"></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-brand-accent rounded-br-xl sm:w-16 sm:h-16"></div>

                     <div className="flex flex-col sm:flex-row justify-between items-start">
                         <div className="sm:pr-4">
                            <p className="text-sm font-semibold tracking-wider text-brand-primary uppercase">Certificate of Completion</p>
                            <h3 className="text-2xl sm:text-3xl font-bold text-brand-dark mt-2">{cert.courseTitle}</h3>
                            <p className="text-gray-500 mt-4">This certifies that</p>
                            <p className="text-xl sm:text-2xl font-semibold text-brand-secondary">{user.name}</p>
                            <p className="text-gray-500 mt-1">has successfully completed the course.</p>
                         </div>
                         <div className="mt-6 sm:mt-0 sm:ml-6 text-center flex-shrink-0 self-center sm:self-start">
                             <div className="w-28 h-28 bg-brand-light rounded-full flex flex-col items-center justify-center mx-auto border-4 border-brand-accent shadow-inner">
                                 <AwardIcon className="w-12 h-12 text-brand-accent mb-1 sm:w-16 sm:h-16"/>
                                 <p className="text-xs font-bold text-brand-dark">SKILLCONNECT</p>
                             </div>
                         </div>
                     </div>
                     <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
                         <div className="mb-2 sm:mb-0 text-center sm:text-left">
                            <p><span className="font-semibold">Instructor:</span> {cert.instructorName}</p>
                            <p><span className="font-semibold">Date:</span> {cert.completionDate}</p>
                         </div>
                         <p className="text-xs"><span className="font-semibold">ID:</span> {cert.id}</p>
                     </div>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md border-2 border-dashed border-gray-300">
          <AwardIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-brand-dark">No Certificates Yet!</h3>
          <p className="text-gray-600 mt-2 px-4">Complete your first course to earn a certificate and showcase your skills.</p>
          <button className="mt-6 bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors duration-200 transform hover:scale-105">
            Explore Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default Certificates;