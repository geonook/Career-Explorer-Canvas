import React from 'react';
import { Scores } from '../types';
import { CLUSTER_NAMES } from '../constants';

interface ScorePanelProps {
    scores: Scores;
}

const ScorePanel: React.FC<ScorePanelProps> = ({ scores }) => {
    return (
        <div className="fixed top-5 right-5 bg-white/90 text-gray-800 p-5 rounded-2xl shadow-lg w-64 backdrop-blur-sm z-20">
            <h3 className="text-lg font-bold mb-3 text-center">Your Traits</h3>
            <div className="space-y-2">
                {Object.entries(scores).map(([key, value]) => {
                    if (value > 0) {
                        return (
                            <div key={key} className="text-sm">
                                <span className="font-semibold">{CLUSTER_NAMES[key as keyof Scores]}:</span>
                                <span className="ml-2">{'⭐'.repeat(value)}</span>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default ScorePanel;