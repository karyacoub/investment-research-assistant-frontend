import React from "react";

type SentimentGaugeProps = {
  score: number; // -1 to 1
  label: string;
};

export const SentimentGauge: React.FC<SentimentGaugeProps> = (props: SentimentGaugeProps) => {
  // Single bar spanning from -1 to 1
  function calculateBarWidth(): string {
    const normalizedScore = Math.abs(props.score); // Normalize score to range [0, 1]
    const barWidth = (normalizedScore * 100) / 2; // Convert to percentage and normalize to half the width
    return barWidth.toFixed(2);
  }

  function getBarStyle(): React.CSSProperties {
    const barWidth = parseFloat(calculateBarWidth());

    let styles: React.CSSProperties = {
      width: `${barWidth}%`,
      borderTopLeftRadius: props.score >= 0 ? 0 : 4,
      borderBottomLeftRadius: props.score >= 0 ? 0 : 4,
      borderTopRightRadius: props.score >= 0 ? 4 : 0,
      borderBottomRightRadius: props.score >= 0 ? 4 : 0,
    };

    if (props.score >= 0) {
      styles.right = "50%";
    } else {
      styles.left = `${50 - barWidth}%`; // Adjust for left side
    }

    return styles
  }

  return <div className="sentiment-gauge__container">
      <div className="sentiment-gauge__header">
          <h5>Overall Sentiment</h5>
          <div className="sentiment-gauge__score-label">
              <span>{props.label} ({props.label})</span>
          </div>
      </div>
      <div className="sentiment-gauge__gauge">
          <div className="sentiment-gauge__bar-background" style={getBarStyle()}/>
      </div>
      <div className="sentiment-gauge__labels-container">
          <div className="sentiment-gauge__label-negative">Negative</div>
          <div className="sentiment-gauge__label-neutral">Neutral</div>
          <div className="sentiment-gauge__label-positive">Positive</div>
      </div>
    </div>;
};