
import React, { useState, useCallback, useMemo } from 'react';
import { GameState, Scores } from './types';
import { QUESTIONS, INITIAL_SCORES } from './constants';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import ScorePanel from './components/ScorePanel';
import ProgressBar from './components/ProgressBar';

const App: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>(GameState.Start);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scores, setScores] = useState<Scores>(INITIAL_SCORES);

    const handleStartQuiz = useCallback(() => {
        setGameState(GameState.Quiz);
        setCurrentQuestionIndex(0);
        setScores(INITIAL_SCORES);
    }, []);

    const handleSelectChoice = useCallback((cluster: keyof Scores) => {
        setScores(prevScores => ({
            ...prevScores,
            [cluster]: prevScores[cluster] + 1,
        }));

        setTimeout(() => {
            if (currentQuestionIndex < QUESTIONS.length - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            } else {
                setGameState(GameState.Results);
            }
        }, 500);
    }, [currentQuestionIndex]);
    
    const currentQuestion = useMemo(() => QUESTIONS[currentQuestionIndex], [currentQuestionIndex]);

    return (
        <main className="font-sans bg-gradient-to-br from-indigo-400 to-purple-600 h-screen w-screen overflow-hidden relative text-white">
            {gameState === GameState.Start && <StartScreen onStart={handleStartQuiz} />}
            
            {gameState === GameState.Quiz && (
                <>
                    <ScorePanel scores={scores} />
                    <QuizScreen 
                        question={currentQuestion}
                        onSelectChoice={handleSelectChoice}
                    />
                    <ProgressBar 
                        current={currentQuestionIndex} 
                        total={QUESTIONS.length} 
                    />
                </>
            )}

            {gameState === GameState.Results && <ResultsScreen scores={scores} onRestart={handleStartQuiz} />}
        </main>
    );
};

export default App;
