import React, { useMemo, useState, useEffect } from 'react';
import { Scores, CareerCluster } from '../types';
import { CAREERS, CLUSTER_NAMES } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface ResultsScreenProps {
    scores: Scores;
    onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ scores, onRestart }) => {
    const [geminiDescription, setGeminiDescription] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const sortedClusters = useMemo(() => {
        return (Object.entries(scores) as [CareerCluster, number][])
            .filter(([, score]) => score > 0)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);
    }, [scores]);

    const topResult = sortedClusters[0];
    const otherResults = sortedClusters.slice(1);

    useEffect(() => {
        const generateDescription = async () => {
            if (!topResult) {
                setIsLoading(false);
                return;
            }

            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

                const topTraits = sortedClusters.map(([cluster, score]) =>
                    `${CLUSTER_NAMES[cluster]} (Score: ${score})`
                ).join(', ');

                const prompt = `You are a friendly and encouraging career counselor speaking to a young person. Their quiz results show their main traits are: ${topTraits}.

Based on these traits, write a personalized summary of about 50-70 words. Explain what this combination of traits might mean and encourage them to explore career paths related to ${CLUSTER_NAMES[topResult[0]]} and their other traits. Use a warm, positive tone.`;

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                });

                setGeminiDescription(response.text);
            } catch (e) {
                console.error(e);
                setError('Could not generate personalized insight. Please try again later.');
                setGeminiDescription('Your unique mix of traits opens up many possibilities! Whether it is helping others, being creative, or using technology, you have the potential to shine in fields you are passionate about.');
            } finally {
                setIsLoading(false);
            }
        };

        generateDescription();
    }, [sortedClusters, topResult]);

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-4">
             <div className="bg-white/95 text-gray-800 p-8 rounded-2xl shadow-2xl text-center backdrop-blur-md animate-fade-in-up">
                <h1 className="text-4xl font-bold mb-4">🎉 Your Results! 🎉</h1>
                <p className="text-lg text-gray-600 mb-8">Based on your choices, we've discovered your standout traits:</p>
                
                {topResult && (
                    <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <h2 className="text-xl text-gray-700 font-semibold mb-2">Your primary trait is:</h2>
                        <h3 className="text-3xl font-bold text-indigo-600 mb-3">{CLUSTER_NAMES[topResult[0]]}</h3>
                        <p className="text-2xl font-semibold text-gray-800">
                            {CAREERS[topResult[0]].join(' or ')}
                        </p>
                    </div>
                )}

                {otherResults.length > 0 && (
                     <div className="border-t-2 border-gray-200 pt-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Other directions you might enjoy:</h3>
                        <div className="space-y-4">
                            {otherResults.map(([cluster], index) => (
                                <div key={cluster} className="animate-fade-in-up" style={{ animationDelay: `${0.6 + index * 0.2}s` }}>
                                    <h4 className="text-2xl font-semibold text-purple-600">{CLUSTER_NAMES[cluster]}</h4>
                                    <p className="text-gray-600 text-lg">{CAREERS[cluster].join(', ')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                <div className="border-t-2 border-gray-200 pt-6 mt-6 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                    <h3 className="text-xl font-bold text-gray-700 mb-4">Personalized Insight</h3>
                    {isLoading && <p className="text-gray-600">🧠 Generating your personalized insight...</p>}
                    {error && !isLoading && <p className="text-red-500">{error}</p>}
                    {!isLoading && geminiDescription && (
                        <p className="text-gray-600 text-base text-left bg-gray-100 p-4 rounded-lg">
                            {geminiDescription}
                        </p>
                    )}
                </div>

                <button
                    onClick={onRestart}
                    className="mt-10 bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-all duration-300 text-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
                >
                    Play Again
                </button>
            </div>
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default ResultsScreen;