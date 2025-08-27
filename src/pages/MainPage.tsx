import React from "react";
import { LLMApi } from "../api/LLMApi";
import type { ILLMResponse } from "../models/LLMModel";
import { SentimentGauge } from "../components/SentimentChart";
import DefaultArticleIcon from "../assets/default-article-icon.jpg";
import Logo from "../assets/logo.png";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { FormattingUtils } from "../utils/formattingUtils";

export const MainPage: React.FC = () => {
    const [prompt, setPrompt] = React.useState<string>("");
    const [response, setResponse] = React.useState<ILLMResponse | undefined>(undefined);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const mockEnabled: boolean = false; // Set to true to bypass LLM calls and use mock data for testing

    React.useEffect(() => {
        if (mockEnabled) {
            promptLLM();
        }
    }, []);

    function promptLLM() {
        const cleanedPrompt = prompt.trim();

        if (!mockEnabled && cleanedPrompt.length === 0) {
            return;
        }
        
        NProgress.start();
        setIsLoading(true);

        LLMApi.promptLLM(prompt, mockEnabled)
            .then(res => {
                setResponse(res);

                NProgress.done();

                setIsLoading(false);
            });
    }

    function renderSentimentGauge() {
        return response
            ? <SentimentGauge 
                score={response && response.news_highlights ? response.news_highlights.sentiment_score : 0} 
                label={response && response.news_highlights ? response.news_highlights.overall_sentiment : "N/A"} />
            : <div>-</div>;
    }

    function renderArticleImage(imageUrl?: string) {
        return imageUrl && !imageUrl.includes("example")
            ? <img src={imageUrl} alt="Article" className="top-article__image" /> 
            : <img src={DefaultArticleIcon as string} alt="Default Article" className="top-article__image" />;
    }

    function renderTopArticles() {
        if (!response || (response && response.news_highlights?.top_articles.length === 0)) {
            return <div>-</div>;
        } 

        return response.news_highlights!.top_articles.map((article, index) => (
            <div key={index} className="top-article">
                {renderArticleImage(article.banner_image)}
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="top-article__title">{article.title}</a>
            </div>
        ));
    }

    function renderSources() {
        if (!response) return <div>-</div>;
        
        return <>{response.sources.map((source, index) => (
                    <h6 key={index}>{source}</h6>
            ))}</>;
    }

    function renderPromptInput() {
        return mockEnabled
            ? <input type="text" 
                     id="main-page__prompt-input" 
                     placeholder="Mock mode has been enabled. Disable it to use this feature." 
                     disabled />
            : <input type="text" 
                     id="main-page__prompt-input" 
                     placeholder="e.g. How might Nvidia’s earnings affect semiconductor ETFs?" 
                     value={prompt} 
                     onChange={(e) => setPrompt(e.target.value)} 
                     disabled={isLoading}
                     />;
    }

    function getCurrencyString(value: number): string {
        return response ? FormattingUtils.formatCurrency(value) : "-";
    }

    function renderContent() {
        if (!response) {
            return <div id="main-page__no-content-container">
                <h2>Curious about a company or stock?</h2>
                <h3>Ask me, and I’ll build you a real-time research brief powered by live market data and the latest news.</h3>
            </div>;
        }

        return <div id="main-page__content-container">
            <div id="main-page__summary-container">
                <h6>AI-Powered Summary</h6>
                <div id="main-page__summary">
                    {response ? response.summary : "-"}
                </div>
            </div>

            <div id="main-page__cards-container">
                <div id="main-page__market-snapshot-container">
                    <div id="main-page__open-close-pvol-container">
                        <div id="main-page__symbol">
                            <h5>Symbol</h5>
                            {response && response.market_snapshot ? response.market_snapshot.symbol : "-"}
                        </div>
                        <div id="main-page__open">
                            <h5>Open</h5>
                            {response && response.market_snapshot ? getCurrencyString(response.market_snapshot.open) : "-"}
                        </div>
                        <div id="main-page__close">
                            <h5>Close</h5>
                            {response && response.market_snapshot ? getCurrencyString(response.market_snapshot.close) : "-"}
                        </div>
                        <div id="main-page__pvol">
                            <h5>Purchase Volume</h5>
                            {response && response.market_snapshot ? FormattingUtils.formatNumberWithCommas(response.market_snapshot.volume) : "-"}
                        </div>
                    </div>
                    <div id="main-page__date-container">
                        <h5>As of {response && response.market_snapshot ? response.market_snapshot.date : "-"}</h5>
                    </div>
                </div>
            </div>

            {renderSentimentGauge()}

            <div id="main-page__top-articles-container">
                <h5>Top Articles</h5>
                {renderTopArticles()}
            </div>

            <div id="main-page__sources-container">
                <h6>Sources: </h6>
                {renderSources()}
            </div>
        </div>
    }

    return <div id="main-page__container">
        <div id="main-page__header-container">
            <div id="main-page__header-logo">
                <img src={Logo} /> 
            </div>
            <h1 id="main-page__header-title">Stocks & News, Simplified.</h1>
        </div>

        <div id="main-page__greeting-container">
            <h3>Hi! I'm Ira, your investment research assistant!</h3>
        </div>

        <div id="main-page__prompt-input-container">
            <form id="main-page__prompt-form" onSubmit={(e) => { e.preventDefault(); promptLLM(); }}>
                {renderPromptInput()}
                <button id="main-page__prompt-submit" 
                        disabled={mockEnabled || isLoading}
                        onClick={promptLLM}
                        type="submit">
                    Prompt
                </button>
            </form>
        </div>

        {renderContent()}
    </div>;
};