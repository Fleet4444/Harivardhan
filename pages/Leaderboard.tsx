
import React from 'react';
import { leaderboardData } from '../data/mockData';
import { TrophyIcon } from '../components/icons';

const Leaderboard: React.FC = () => {
    const medalColors = ['text-yellow-400', 'text-gray-400', 'text-yellow-600'];

    return (
        <div className="max-w-4xl mx-auto mb-20">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-brand-dark mb-2">Monthly Leaderboard</h2>
                <p className="text-gray-600">See who's leading the SkillConnect community this month!</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-brand-dark text-white p-4">
                    <h3 className="text-lg font-semibold">Top Performers</h3>
                </div>
                <ul className="divide-y divide-gray-200">
                    {leaderboardData.map((entry, index) => (
                        <li key={entry.user.id} className={`p-4 flex items-center justify-between ${entry.rank <= 3 ? 'bg-brand-light/50' : ''}`}>
                            <div className="flex items-center space-x-4">
                                <span className={`text-xl font-bold w-8 text-center ${entry.rank <= 3 ? medalColors[entry.rank - 1] : 'text-gray-500'}`}>
                                    {entry.rank <= 3 ? <TrophyIcon className="w-6 h-6 mx-auto fill-current"/> : entry.rank}
                                </span>
                                <img src={entry.user.avatarUrl} alt={entry.user.name} className="w-12 h-12 rounded-full object-cover"/>
                                <div>
                                    <p className="font-semibold text-brand-dark">{entry.user.name}</p>
                                </div>
                            </div>
                            <div className="text-lg font-bold text-brand-primary">
                                {entry.points.toLocaleString()} pts
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="mt-8 p-6 bg-brand-teal/10 border-l-4 border-brand-teal rounded-r-lg">
                <h4 className="font-bold text-brand-dark text-lg mb-2">Super Good Rewards!</h4>
                <p className="text-brand-text-dark">The leaderboard resets on the first of every month. The top 3 users win exclusive rewards like free course vouchers, marketplace discounts, and a special profile badge for the next month. Keep learning and creating!</p>
            </div>
        </div>
    );
};

export default Leaderboard;
