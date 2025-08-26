import React from "react";
import { LLMApi } from "../api/LLMApi";
import type { ILLMResponse } from "../models/LLMModel";
import { SentimentGauge } from "../components/SentimentChart";
import DefaultArticleIcon from "../assets/default-article-icon.jpg";

export const MainPage: React.FC = () => {
    const [prompt, setPrompt] = React.useState<string>("");
    const [response, setResponse] = React.useState<ILLMResponse | undefined>(undefined);

    React.useEffect(() => {
        LLMApi.promptLLM("How is Capital One doing today?")
            .then(res => setResponse(res));
    }, []);

    function renderSentimentGauge() {
        return response
            ? <SentimentGauge 
                score={response.news_highlights.sentiment_score} 
                label={response.news_highlights.overall_sentiment} />
            : <div>Loading...</div>;
    }

    function renderArticleImage(imageUrl?: string) {
        return imageUrl 
            ? <img src={imageUrl} alt="Article" className="top-article__image" /> 
            : <img src={DefaultArticleIcon as string} alt="Default Article" className="top-article__image" />;
    }

    function renderTopArticles() {
        if (!response) return <div>Loading...</div>;

        return response.news_highlights.top_articles.map((article, index) => (
            <div key={index} className="top-article">

                {renderArticleImage(article.banner_image)}
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="top-article__title">{article.title}</a>
            </div>
        ));
    }

    function renderSources() {
        if (!response) return <div>Loading...</div>;
        
        return <>{response.sources.map((source, index) => (
                    <h6 key={index}>{source}</h6>
            ))}</>;
    }

    return <div id="main-page__container">
        <div id="main-page__header-container">
            <div id="main-page__header-logo">LOGO</div>
            <h1 id="main-page__header-title">Stocks & News, Simplified.</h1>
        </div>

        <div id="main-page__greeting-container">
            <h3>Hi! I'm Ira, your investment research assistant!</h3>
            <h5>Curious about a company or stock? Ask me, and I’ll build you a real-time research brief powered by live market data and the latest news.</h5>
        </div>

        <div id="main-page__prompt-input-container">
            <input type="text" id="main-page__prompt-input" placeholder="e.g. How might Nvidia’s earnings affect semiconductor ETFs?" />
        </div>

        <div id="main-page__content-container">
            <div id="main-page__summary-container">
                <h6>AI-Powered Summary</h6>
                <div id="main-page__summary">
                    {response ? response.summary : "Loading..."}
                </div>
            </div>

            <div id="main-page__cards-container">
                <div className="card-row">
                    {/* <Card title="Symbol" value={response ? response.market_snapshot.symbol : "Loading..."} /> */}
                    {/* TODO: Find somewhere to put the symbol */}
                </div>
                
                <div id="main-page__market-snapshot-container">
                    <div id="main-page__open-close-pvol-container">
                        <div id="main-page__open">
                            <h5>Open</h5>
                            {response ? response.market_snapshot.open : "Loading..."}
                        </div>
                        <div id="main-page__close">
                            <h5>Close</h5>
                            {response ? response.market_snapshot.close : "Loading..."}
                        </div>
                        <div id="main-page__pvol">
                            <h5>Purchase Volume</h5>
                            {response ? response.market_snapshot.volume : "Loading..."}
                        </div>
                    </div>
                    <div id="main-page__date-container">
                        <h5>As of {response ? response.market_snapshot.date : "Loading..."}</h5>
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
    </div>
};