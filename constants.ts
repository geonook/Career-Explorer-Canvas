import { Question, Scores, CareerCluster } from './types';

export const INITIAL_SCORES: Scores = {
    PH: 0,
    BT: 0,
    NO: 0,
    CR: 0,
    TE: 0,
    LE: 0,
};

export const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "Which sounds most fun?",
        choices: [
            { text: "Helping people", icon: "🤝", cluster: "PH" },
            { text: "Building things", icon: "🔨", cluster: "BT" },
            { text: "Caring for animals", icon: "🌿", cluster: "NO" }
        ]
    },
    {
        id: 2,
        text: "Where would you like to spend your day?",
        choices: [
            { text: "In a classroom", icon: "🏫", cluster: "PH" },
            { text: "In a workshop", icon: "🏭", cluster: "BT" },
            { text: "Outside in nature", icon: "🌳", cluster: "NO" }
        ]
    },
    {
        id: 3,
        text: "Which project would you pick?",
        choices: [
            { text: "A teaching poster", icon: "📝", cluster: "PH" },
            { text: "Build a model", icon: "🏗️", cluster: "BT" },
            { text: "Plant a garden", icon: "🌱", cluster: "NO" }
        ]
    },
    {
        id: 4,
        text: "Which club would you join?",
        choices: [
            { text: "Art & crafts", icon: "🎨", cluster: "CR" },
            { text: "Coding & robots", icon: "💻", cluster: "TE" },
            { text: "Sports team", icon: "⚽", cluster: "LE" }
        ]
    },
    {
        id: 5,
        text: "What do you like to use?",
        choices: [
            { text: "Paint & markers", icon: "🖍️", cluster: "CR" },
            { text: "Computers & gadgets", icon: "📱", cluster: "TE" },
            { text: "Clipboard & whistle", icon: "📋", cluster: "LE" }
        ]
    },
    {
        id: 6,
        text: "Which job looks exciting?",
        choices: [
            { text: "Teacher or nurse", icon: "👩‍🏫", cluster: "PH" },
            { text: "Engineer", icon: "👷", cluster: "BT" },
            { text: "Park ranger", icon: "🦌", cluster: "NO" }
        ]
    },
    {
        id: 7,
        text: "Which superpower would you want?",
        choices: [
            { text: "To heal others", icon: "💖", cluster: "PH" },
            { text: "Invent cool gadgets", icon: "⚙️", cluster: "TE" },
            { text: "Talk to animals", icon: "🗣️", cluster: "NO" }
        ]
    },
    {
        id: 8,
        text: "How do you solve a puzzle?",
        choices: [
            { text: "Follow instructions carefully", icon: "📖", cluster: "BT" },
            { text: "Try lots of creative ideas", icon: "💡", cluster: "CR" },
            { text: "Work with a team", icon: "👨‍👩‍👧‍👦", cluster: "LE" }
        ]
    },
    {
        id: 9,
        text: "What would you create for a school fair?",
        choices: [
            { text: "A beautiful painting", icon: "🖼️", cluster: "CR" },
            { text: "A working volcano model", icon: "🌋", cluster: "BT" },
            { text: "A video game about the school", icon: "🎮", cluster: "TE" }
        ]
    },
    {
        id: 10,
        text: "What's your favorite school subject?",
        choices: [
            { text: "Gym class", icon: "🤸", cluster: "LE" },
            { text: "Science", icon: "🔬", cluster: "TE" },
            { text: "Health class", icon: "❤️", cluster: "PH" }
        ]
    },
    {
        id: 11,
        text: "If you found a lost puppy, what's the first thing you'd do?",
        choices: [
            { text: "Calm it down and give it water", icon: "💧", cluster: "NO" },
            { text: "Make posters to find the owner", icon: "🎨", cluster: "CR" },
            { text: "Take it to a trusted adult or shelter", icon: "🏠", cluster: "PH" }
        ]
    },
    {
        id: 12,
        text: "Choose a weekend activity:",
        choices: [
            { text: "Leading friends on a hike", icon: "🗺️", cluster: "LE" },
            { text: "Fixing your bike", icon: "🔧", cluster: "BT" },
            { text: "Camping in a forest", icon: "🏕️", cluster: "NO" }
        ]
    }
];

export const CAREERS: Record<CareerCluster, string[]> = {
    PH: ['Teacher 👩‍🏫', 'Nurse 👩‍⚕️', 'Police Officer 👮'],
    BT: ['Builder 👷', 'Mechanic 🔧', 'Engineer 👨‍💻'],
    NO: ['Vet 🐾', 'Park Ranger 🌲', 'Farmer 👨‍🌾'],
    CR: ['Artist 👨‍🎨', 'Designer ✏️', 'Chef 👨‍🍳'],
    TE: ['Coder 👩‍💻', 'Game Tester 🎮', 'Robot Maker 🤖'],
    LE: ['Coach 🏃', 'Shop Owner 🏪', 'Pilot ✈️']
};

export const CLUSTER_NAMES: Record<CareerCluster, string> = {
    PH: "The Helper",
    BT: "The Builder/Tinkerer",
    NO: "The Nature Observer",
    CR: "The Creator",
    TE: "The Tech Explorer",
    LE: "The Leader/Organizer"
};