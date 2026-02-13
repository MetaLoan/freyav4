import { AstroRequest, AstroResponse, BirthData } from './types';

const BASE_URL = 'https://freya-api.fly.dev/api';

class ApiClient {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        try {
            const response = await fetch(url, { ...options, headers });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`API Error: ${response.status} - ${errorBody}`);
            }

            return response.json();
        } catch (error) {
            console.error(`API Request Failed: ${endpoint}`, error);
            throw error;
        }
    }

    /**
     * 获取五维运势数据 (POST /v2/astro)
     */
    async getAstro(req: AstroRequest): Promise<AstroResponse> {
        return this.request<AstroResponse>('/v2/astro', {
            method: 'POST',
            body: JSON.stringify(req),
        });
    }

    /**
     * 健康检查
     */
    async healthCheck(): Promise<{ status: string }> {
        return this.request('/health');
    }
}

export const apiClient = new ApiClient();
