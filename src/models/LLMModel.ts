interface Article {
    title: string;
    url: string;
    banner_image?: string;
}

export interface ILLMRequest {
    prompt: string;
    mock?: boolean;
}

export interface ILLMResponse {
    summary: string;
    market_snapshot?: {
        symbol: string;
        date: string; // Format: YYYY-mm-dd
        open: number;
        close: number;
        volume: number;
    };
    news_highlights?: {
        overall_sentiment: string;
        sentiment_score: number; // Score from -1 to 1
        top_articles: Article[];
    };
    sources: string[];
}