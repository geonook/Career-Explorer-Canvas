
export enum GameState {
    Start = 'START',
    Quiz = 'QUIZ',
    Results = 'RESULTS',
}

export type CareerCluster = 'PH' | 'BT' | 'NO' | 'CR' | 'TE' | 'LE';

export type Choice = {
    text: string;
    icon: string;
    cluster: CareerCluster;
};

export type Question = {
    id: number;
    text: string;
    choices: Choice[];
};

export type Scores = Record<CareerCluster, number>;
