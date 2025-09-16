
import React, { useState, useEffect } from 'react';
import { Question, Choice } from '../types';

interface QuizScreenProps {
    question: Question;
    onSelectChoice: (cluster: Choice['cluster']) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ question, onSelectChoice }) => {
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    
    const handleChoiceClick = (choice: Choice) => {
        setIsAnimatingOut(true);
        onSelectChoice(choice.cluster);
    };
    
    useEffect(() => {
        setIsAnimatingOut(false);
    }, [question]);

    const centerX = 50; // vw
    const centerY = 50; // vh
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3;
    const angleStep = (2 * Math.PI) / question.choices.length;

    return (
        <div className="w-full h-full relative">
            {/* Connection Lines */}
            {question.choices.map((_, index) => {
                const angle = angleStep * index - Math.PI / 2;
                const x = centerX + (Math.cos(angle) * radius / window.innerWidth * 100);
                const y = centerY + (Math.sin(angle) * radius / window.innerHeight * 100);
                const distance = Math.sqrt(Math.pow(x - centerX, 2) * (window.innerWidth/100)**2 + Math.pow(y - centerY, 2) * (window.innerHeight/100)**2);
                const lineAngle = Math.atan2((y-centerY)*(window.innerHeight/100), (x-centerX)*(window.innerWidth/100)) * 180 / Math.PI;

                return (
                    <div
                        key={`line-${question.id}-${index}`}
                        className={`absolute bg-white/50 h-1 transform-origin-left transition-all duration-500 ${isAnimatingOut ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`}
                        style={{
                            width: `${distance}px`,
                            left: `${centerX}vw`,
                            top: `${centerY}vh`,
                            transform: `rotate(${lineAngle}deg)`,
                            zIndex: 1,
                        }}
                    />
                );
            })}
            
            {/* Central Question Node */}
            <div 
              className={`absolute flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 to-red-500 rounded-full shadow-2xl transition-all duration-500 transform ${isAnimatingOut ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
              style={{
                width: '200px',
                height: '200px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10
              }}
            >
                <div className="text-5xl">❓</div>
                <div className="text-white p-3 text-center font-semibold">{question.text}</div>
            </div>

            {/* Choice Nodes */}
            {question.choices.map((choice, index) => {
                const angle = angleStep * index - Math.PI / 2;
                const x = centerX + (Math.cos(angle) * radius / window.innerWidth * 100);
                const y = centerY + (Math.sin(angle) * radius / window.innerHeight * 100);
                
                return (
                    <button
                        key={`${question.id}-${index}`}
                        onClick={() => handleChoiceClick(choice)}
                        className={`absolute w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex flex-col items-center justify-center cursor-pointer shadow-xl transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-500 ${isAnimatingOut ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
                        style={{
                            left: `${x}vw`,
                            top: `${y}vh`,
                            transform: 'translate(-50%, -50%)',
                            zIndex: 5,
                        }}
                    >
                        <div className="text-5xl">{choice.icon}</div>
                        <div className="text-white p-1 text-center text-sm font-medium">{choice.text}</div>
                    </button>
                );
            })}
        </div>
    );
};

export default QuizScreen;
