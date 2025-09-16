import React from 'react';

interface StartScreenProps {
    onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <button
                onClick={onStart}
                className="w-48 h-48 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-2xl transform hover:scale-110 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-yellow-300"
                aria-label="Start Quiz"
            >
                <span className="text-7xl">🌟</span>
                <span className="text-2xl tracking-wider">START</span>
            </button>
        </div>
    );
};

export default StartScreen;