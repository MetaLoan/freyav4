import { DailyHoroscope } from '../types/domain';

const mockData: DailyHoroscope = {
    date: new Date().toISOString(),
    sign: 'Scorpio',
    headline: 'Chaos is a ladder.',
    overallScore: 84,

    dimensions: [
        { category: 'Love', score: 92, trend: 'up', label: 'Passionate' },
        { category: 'Career', score: 65, trend: 'stable', label: 'Steady' },
        { category: 'Intellect', score: 88, trend: 'up', label: 'Sharp' },
        { category: 'Health', score: 70, trend: 'down', label: 'Rest Needed' },
        { category: 'Social', score: 45, trend: 'stable', label: 'Selective' },
    ],

    guidance: [
        { id: '1', type: 'do', keyword: 'Meditation', icon: 'Lotus', reason: 'Your mind is racing; find stillness to clarify your vision.' },
        { id: '2', type: 'dont', keyword: 'Impulse', icon: 'Zap', reason: 'Mars is squaring your Mercury. Think twice before you speak.' },
    ],

    transits: [
        {
            id: 't1',
            title: 'Mercury Retrograde',
            type: 'retrograde',
            planet: 'Mercury',
            description: 'Communication glitches expected.',
            impact: 'Revisit old projects, but delay signing new contracts. Your intuition is heightened, but logic may be foggy.',
        },
        {
            id: 't2',
            title: 'Moon in Scorpio',
            type: 'ingress',
            planet: 'Moon',
            sign: 'Scorpio',
            description: 'Emotional intensity peaks.',
            impact: 'You feel everything deeply today. Harness this energy for transformation, but beware of jealousy.',
        },
    ],

    aiAnalysis: {
        general: "The alignment of the stars suggests a time of introspection. Your ruling planet is enhancing your intuitive capabilities, but the external world may feel chaotic. Embrace the solitude.",
        love: "Venus trine Mars creates a harmonious flow between your desires and your actions. If you've been waiting to make a move, the energy supports bold but graceful steps.",
        career: "Mercury is entering your tenth house of career and public image today. Expect clear communication, but watch out for misunderstandings with authority figures.",
    },
};

export const getDailyHoroscope = async (date?: Date): Promise<DailyHoroscope> => {
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData);
        }, 800);
    });
};
