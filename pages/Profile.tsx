import React from 'react';
import { User, VerificationStatus } from '../types';
import { products, certificatesData } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { AwardIcon, BadgeCheckIcon } from '../components/icons';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const userProducts = products.filter(p => p.sellerId === user.id);
  const userCertificates = certificatesData.filter(c => c.studentName === user.name);
  
  const coursesGoal = 5;
  const pointsGoal = 10000;

  const VerificationCard = () => {
    switch(user.verificationStatus) {
        case VerificationStatus.VERIFIED:
            return (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <div className="flex items-center">
                        <BadgeCheckIcon className="w-8 h-8 text-green-500 mr-4"/>
                        <div>
                            <h4 className="font-bold text-green-800">You are a Verified Seller!</h4>
                            <p className="text-sm text-green-700">Your badge is now visible on your products and profile.</p>
                        </div>
                    </div>
                </div>
            );
        case VerificationStatus.PENDING:
             return (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                     <h4 className="font-bold text-yellow-800">Verification Pending</h4>
                     <p className="text-sm text-yellow-700">Your application is under review. We'll notify you within 3-5 business days.</p>
                </div>
            );
        case VerificationStatus.REJECTED:
             return (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                     <h4 className="font-bold text-red-800">Verification Rejected</h4>
                     <p className="text-sm text-red-700 mb-2">Reason: {user.rejectionReason || 'Please check your email for details.'}</p>
                     <button className="text-sm font-semibold text-red-800 hover:underline">Re-apply Now</button>
                </div>
            );
        default: // NOT_APPLIED
             return (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-blue-800">Become a Verified Seller</h4>
                        <p className="text-sm text-blue-700">Build trust and sell more effectively.</p>
                    </div>
                    <button className="bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors text-sm flex-shrink-0">Apply Now</button>
                </div>
            );
    }
  }


  return (
    <div className="max-w-4xl mx-auto space-y-8 mb-20">
      {/* User Info Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <img className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover ring-4 ring-brand-secondary/50 p-1" src={user.avatarUrl} alt={user.name} />
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-3xl font-bold text-brand-dark">{user.name}</h2>
            <p className="text-md text-gray-600">Member since {new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
            <p className="mt-2 text-gray-700 max-w-md">{user.bio}</p>
          </div>
        </div>
      </div>
      
      {/* Stats and Progress */}
       <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-brand-dark mb-6">My Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <div className="flex justify-between items-end mb-1">
                    <label className="text-sm font-semibold text-gray-600">Courses Completed</label>
                    <p className="text-sm font-bold text-brand-primary">{user.achievements.coursesCompleted} / {coursesGoal}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-brand-primary h-2.5 rounded-full" style={{width: `${(user.achievements.coursesCompleted / coursesGoal) * 100}%`}}></div>
                </div>
            </div>
             <div>
                <div className="flex justify-between items-end mb-1">
                    <label className="text-sm font-semibold text-gray-600">Leaderboard Points</label>
                    <p className="text-sm font-bold text-brand-accent">{user.points.toLocaleString()} / {pointsGoal.toLocaleString()}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-brand-accent h-2.5 rounded-full" style={{width: `${(user.points / pointsGoal) * 100}%`}}></div>
                </div>
            </div>
        </div>
      </div>

      {/* Seller Verification */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
         <h3 className="text-2xl font-bold text-brand-dark mb-4">Seller Status</h3>
         <VerificationCard />
      </div>

      {/* My Certificates */}
      {userCertificates.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-brand-dark mb-4">My Certificates</h3>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {userCertificates.map(cert => (
                    <div key={cert.id} className="bg-white p-3 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
                        <AwardIcon className="w-12 h-12 text-brand-accent mx-auto mb-2"/>
                        <p className="text-sm font-semibold text-brand-dark leading-tight">{cert.courseTitle}</p>
                        <p className="text-xs text-gray-500 mt-1">{cert.completionDate}</p>
                    </div>
                ))}
            </div>
          </div>
      )}

      {/* My Products */}
      {userProducts.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-brand-dark mb-4">My Marketplace Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>
      )}
    </div>
  );
};

export default Profile;