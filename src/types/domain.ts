export type TrendDirection = 'up' | 'down' | 'stable';

export interface DimensionScore {
    category: string;
    score: number; // 0-100
    trend: TrendDirection;
    label?: string; // Optional descriptive label (e.g., "High", "Low")
}

export interface TransitEvent {
    id: string;
    title: string;
    type: 'retrograde' | 'ingress' | 'aspect';
    planet: string;
    sign?: string;
    degree?: string;
    description: string; // Brief description for the ticker
    impact: string; // AI interpretation of personal impact
    startTime?: string;
    endTime?: string;
    intensity?: number;
}

export interface GuidanceItem {
    id: string;
    type: 'do' | 'dont';
    keyword: string;
    icon: string; // Lucide icon name or emoji
    reason: string; // "Why" - revealed on tap
}

export interface DailyHoroscope {
    date: string; // ISO date string
    sign: string; // User's sun sign

    // Section A: Headline
    headline: string; // "Chaos is a ladder."
    overallScore: number; // 0-100

    // Section B: Dimensions
    dimensions: DimensionScore[];

    // Section C: Guidance
    guidance: GuidanceItem[];

    // Section D: Transits
    transits: TransitEvent[];

    // AI Deep Dive (Mock content for bottom sheets)
    aiAnalysis: {
        general: string;
        love: string;
        career: string;
    };
}
