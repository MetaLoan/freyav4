import { apiClient } from './api/client';
import { AstroRequest, BirthData, AstroResponse } from './api/types';
import { DailyHoroscope, DimensionScore, TransitEvent, GuidanceItem } from '@/src/types/domain';

// --- Mapper Functions ---

function mapDimensions(scores: AstroResponse['slot']['scores']): DimensionScore[] {
    return [
        { category: 'Love', score: Math.round(scores.relationship), trend: 'stable', label: 'Relationship' },
        { category: 'Career', score: Math.round(scores.career), trend: 'up', label: 'Work' },
        { category: 'Wealth', score: Math.round(scores.finance), trend: 'stable', label: 'Finance' },
        { category: 'Health', score: Math.round(scores.health), trend: 'stable', label: 'Body' },
        { category: 'Spirit', score: Math.round(scores.spiritual), trend: 'up', label: 'Inner Self' },
    ];
}

// --- Helper ---

const stripMarkdown = (text?: string): string => {
    if (!text) return '';
    return text.replace(/\*\*/g, '');
};

function mapTransits(events: AstroResponse['slot']['events']): TransitEvent[] {
    return events.map(e => ({
        id: e.eventId,
        title: e.title,
        type: e.type === 'retrograde' ? 'retrograde' : 'aspect',
        planet: e.primaryPlanet,
        description: stripMarkdown(e.interpretation || 'Cosmic event'),
        impact: stripMarkdown(e.advice || 'Be mindful of this energy.'),
        startTime: e.startTime,
        endTime: e.endTime,
        intensity: e.intensity,
    }));
}

function mapGuidance(guidance: AstroResponse['slot']['guidance']): GuidanceItem[] {
    if (!guidance) return [];

    const dos: GuidanceItem[] = (guidance.dos || []).map((k, i) => ({
        id: `do-${i}`,
        type: 'do',
        keyword: stripMarkdown(k),
        icon: 'Check',
        reason: 'Cosmic alignment supports this.'
    }));

    const donts: GuidanceItem[] = (guidance.donts || []).map((k, i) => ({
        id: `dont-${i}`,
        type: 'dont',
        keyword: stripMarkdown(k),
        icon: 'X',
        reason: 'Planetary tension suggests avoiding this.'
    }));

    return [...dos, ...donts];
}

// --- Helper ---

function generateHeadline(slot: AstroResponse['slot']): string {
    // If we have a summary, try to keep it short or just use the first sentence
    if (slot.guidance?.summary) {
        const summary = stripMarkdown(slot.guidance.summary);
        return summary.split(/[.。!！]/)[0] || summary; // Just the first short piece
    }

    // Fallback: Pick the most significant event title
    if (slot.events && slot.events.length > 0) {
        const topEvent = [...slot.events].sort((a, b) => b.intensity - a.intensity)[0];
        return stripMarkdown(topEvent.title) || "The stars align.";
    }

    return "Trust the cosmic flow.";
}

// --- Main Service ---

export const getDailyHoroscope = async (birthData: BirthData, date: Date): Promise<DailyHoroscope> => {
    try {
        const req: AstroRequest = {
            birth: birthData,
            time: date.toISOString(),
            granularity: 'day',
            language: 'en' // Default to EN for now
        };

        const res = await apiClient.getAstro(req);
        const slot = res.slot;

        // Ensure we have at least 3 events for a "complete" look, using mocks if needed
        let events = slot.events || [];
        if (events.length < 3) {
            const mocks: any[] = [
                {
                    eventId: 'mock-1',
                    title: 'Mars Trine Jupiter',
                    type: 'aspect',
                    isPositive: true,
                    intensity: 0.9,
                    primaryPlanet: 'Mars',
                    interpretation: 'A surge of courage and optimistic action helps you conquer major obstacles today.',
                    startTime: new Date().toISOString(),
                    endTime: new Date(Date.now() + 86400000 * 3).toISOString(),
                },
                {
                    eventId: 'mock-2',
                    title: 'Mercury Square Pluto',
                    type: 'aspect',
                    isPositive: false,
                    intensity: 0.85,
                    primaryPlanet: 'Mercury',
                    interpretation: 'Deep psychological insights may emerge, but beware of power struggles in communication.',
                    startTime: new Date().toISOString(),
                    endTime: new Date(Date.now() + 86400000 * 2).toISOString(),
                },
                {
                    eventId: 'mock-3',
                    title: 'Venus Ingress Aries',
                    type: 'sign_change',
                    isPositive: true,
                    intensity: 0.7,
                    primaryPlanet: 'Venus',
                    interpretation: 'A fresh, passionate energy enters your relationships. Take the initiative in love.',
                    startTime: new Date().toISOString(),
                    endTime: new Date(Date.now() + 86400000 * 20).toISOString(),
                }
            ];
            events = [...events, ...mocks.slice(0, 3 - events.length)];
        }

        // Ensure guidance has items
        let guidanceItems = mapGuidance(slot.guidance);
        if (guidanceItems.length === 0) {
            guidanceItems = [
                { id: 'm-do-1', type: 'do', keyword: 'Mindful Solitude', icon: 'Sparkles', reason: 'Inner reflection today yields breakthroughs.' },
                { id: 'm-do-2', type: 'do', keyword: 'Creative Risk', icon: 'Zap', reason: 'The stars favor bold expression.' },
                { id: 'm-dont-1', type: 'dont', keyword: 'Impulsive Debt', icon: 'AlertTriangle', reason: 'Mercury tension warns against large contracts.' }
            ];
        }

        return {
            date: slot.startTime,
            sign: 'Sign',
            headline: "Try Ignore Chaos and Keep Real",
            overallScore: Math.round(slot.scores.overall),
            dimensions: mapDimensions(slot.scores),
            guidance: guidanceItems,
            transits: mapTransits(events),
            aiAnalysis: {
                general: stripMarkdown(slot.guidance?.summary) || "No specific guidance for today.",
                love: "AI analysis for Love is generating...",
                career: "AI analysis for Career is generating...",
            }
        };
    } catch (error) {
        console.error("Failed to fetch horoscope:", error);
        // Fallback or rethrow? For now rethrow to let UI handle error state
        throw error;
    }
};
