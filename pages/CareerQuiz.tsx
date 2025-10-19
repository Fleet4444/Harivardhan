
import React, { useState } from 'react';
import { quizQuestions } from '../data/mockData';
import { getCareerAdvice } from '../services/geminiService';
import { CareerQuizResult } from '../types';

const CareerQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<CareerQuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      fetchResults(newAnswers);
    }
  };

  const fetchResults = async (finalAnswers: string[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCareerAdvice(finalAnswers);
      setResults(data);
    } catch (err) {
      setError('Could not fetch career advice. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const restartQuiz = () => {
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setResults(null);
      setError(null);
      setIsLoading(false);
  };

  const isQuizFinished = currentQuestionIndex >= quizQuestions.length;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg mb-20">
      <h2 className="text-3xl font-bold text-center text-brand-dark mb-2">Find Your Calling</h2>
      <p className="text-center text-gray-600 mb-8">Answer a few questions to discover skills and careers that match your passion.</p>
      
      {isLoading ? (
        <div className="text-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Analyzing your results...</p>
        </div>
      ) : error ? (
        <div className="text-center p-8 bg-red-50 border-l-4 border-red-500">
            <p className="text-red-700 font-semibold">An Error Occurred</p>
            <p className="text-red-600 mt-2">{error}</p>
            <button onClick={restartQuiz} className="mt-4 bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors">
                Try Again
            </button>
        </div>
      ) : results ? (
        <div className="space-y-8 animate-fade-in-up">
            <div>
                <h3 className="text-2xl font-bold text-brand-dark border-b-2 border-brand-accent pb-2 mb-4">Suggested Careers</h3>
                <ul className="space-y-3 list-disc list-inside text-gray-700">
                    {results.suggestedCareers.map(career => <li key={career.title}><strong>{career.title}:</strong> {career.description}</li>)}
                </ul>
            </div>
            <div>
                <h3 className="text-2xl font-bold text-brand-dark border-b-2 border-brand-accent pb-2 mb-4">Recommended Skills on SkillConnect</h3>
                 <ul className="space-y-3 list-disc list-inside text-gray-700">
                    {results.recommendedSkills.map(skill => <li key={skill.skill}><strong>{skill.skill}:</strong> {skill.reason}</li>)}
                </ul>
            </div>
            <div>
                <h3 className="text-2xl font-bold text-brand-dark border-b-2 border-brand-accent pb-2 mb-4">Ethical Tips for Your Journey</h3>
                 <ul className="space-y-3 list-disc list-inside text-gray-700">
                    {results.ethicalTips.map(tip => <li key={tip.tip}><strong>{tip.tip}:</strong> {tip.explanation}</li>)}
                </ul>
            </div>
             <div className="text-center pt-4">
                <button onClick={restartQuiz} className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors">
                    Take Quiz Again
                </button>
            </div>
        </div>
      ) : !isQuizFinished ? (
        <div className="text-center">
            <div className="mb-6">
                 <p className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
                 <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-brand-secondary h-2.5 rounded-full" style={{width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`}}></div>
                </div>
            </div>
          <h3 className="text-xl font-semibold text-brand-dark mb-6">{quizQuestions[currentQuestionIndex].question}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quizQuestions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 bg-brand-light border-2 border-brand-secondary/50 rounded-lg hover:bg-brand-secondary/20 hover:border-brand-secondary transition-all duration-200"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CareerQuiz;
