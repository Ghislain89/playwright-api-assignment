import { APIRequestContext, APIResponse, request } from '@playwright/test';
import { ApiResponse } from '../types/api.types';
import { safeJsonParse } from '../helpers/exception.helper';

export class ApiFixture {
    private api: APIRequestContext;

    constructor(requestContext: APIRequestContext) {
        this.api = requestContext;
    }

    async get(endpoint: string, params?: Record<string, any>) {
        const response = await this.api.get(endpoint, { params });
        return this.formatResponse(response);
    }

    async post(endpoint: string, data?: object) {
        const response = await this.api.post(endpoint, { data });
        return this.formatResponse(response);
    }

    async put(endpoint: string, data?: object) {
        const response = await this.api.put(endpoint, { data });
        return this.formatResponse(response);
    }

    async delete(endpoint: string) {
        const response = await this.api.delete(endpoint);
        return this.formatResponse(response);
    }

    private async formatResponse(response: APIResponse): Promise<ApiResponse> {
        const responseBody = await safeJsonParse(response);
        const statusCode = response.status();
        const headers = response.headers();
        
        return { headers, statusCode, responseBody, };
    }
}