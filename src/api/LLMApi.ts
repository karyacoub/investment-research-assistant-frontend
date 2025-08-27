import Axios from 'axios';
import type { ILLMRequest, ILLMResponse } from '../models/LLMModel';

export class LLMApi {
    private static baseUrl: string = "http://127.0.0.1:8000";

    static async promptLLM(prompt: string, mock: boolean): Promise<ILLMResponse> {
        const requestUrl: string = `${this.baseUrl}/prompt`;
        const data: ILLMRequest = { prompt, mock };

        return Axios.post<ILLMResponse>(requestUrl, data)
            .then(response => response.data)
            .catch(error => {
                console.error("Error prompting LLM:", error);
                throw error;
            });
    }
}