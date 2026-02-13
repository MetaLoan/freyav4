/**
 * API 数据结构定义
 * 对应后端 Go 结构体
 */

// --- 基础结构 ---

export interface BirthData {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second?: number;
    latitude: number;
    longitude: number;
    timezone: number;
}

// --- 五维运势 (/api/v2/astro) ---

export interface AstroRequest {
    birth: BirthData;
    time: string;       // ISO 8601
    granularity?: 'hour' | 'day' | 'week' | 'month' | 'year'; // default: day
    language?: 'zh' | 'en' | 'ru'; // default: en
}

export interface DimensionScores {
    overall: number;
    career: number;
    relationship: number;
    health: number;
    finance: number;
    spiritual: number;
}

export interface AstroEvent {
    eventId: string;
    type: 'aspect' | 'lunar_phase' | 'sign_change' | 'dignity' | 'retrograde' | 'transit_house' | 'void_of_course' | 'planetary_hour';
    title: string;
    isPositive: boolean;
    intensity: number; // 0-1
    primaryPlanet: string;
    primaryPlanetName: string;
    impact?: Partial<DimensionScores>;
    startTime: string; // ISO
    endTime: string;   // ISO
    exactTime?: string; // ISO
    interpretation?: string;
    advice?: string;
}

export interface AstroSlot {
    userId: string;
    startTime: string;
    endTime: string;
    granularity: string;
    scores: DimensionScores;
    events: AstroEvent[];
    delta?: {
        overall: number;
        dimensions: Partial<DimensionScores>;
        reason?: string;
    };
    guidance?: {
        summary: string;
        dos: string[];
        donts: string[];
        focus?: keyof DimensionScores;
    };
    // subSlots omitted for now until needed for charts
}

export interface AstroResponse {
    slot: AstroSlot;
    meta: {
        cached: boolean;
        computeTime: string;
        eventCount: number;
    };
}
