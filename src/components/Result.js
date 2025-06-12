import React from 'react';
import './result.css';

const Result = (props) => {
  return (
    <div className="result-container">
      <div className="result-date">
        {props.prediction.month} / {props.prediction.year}
      </div>

      <div className="result-main">
        <div className="crop-image">
          <img src={`/images/${props.prediction.cropface}`} alt="Crop" />
        </div>

        {props.prediction && (
          <div className="price-stats">
            <div><span>Average Price:</span> {props.prediction.avg_value} /quintal</div>
            <div><span>Min Price:</span> {props.prediction.min_value} /quintal</div>
            <div><span>Max Price:</span> {props.prediction.max_value} /quintal</div>
          </div>
        )}

        <div className="extremes">
          <div className="max-section">
            <h5>🌟 Maximum Price</h5>
            <p><strong>Month:</strong> {props.prediction.goldmonth}</p>
            <p><strong>Price:</strong> {props.prediction.maxlow} - {props.prediction.maxhigh} /quintal</p>
            <p><strong>Rainfall:</strong> Medium</p>
          </div>
          <div className="min-section">
            <h5>🔻 Minimum Price</h5>
            <p><strong>Month:</strong> {props.prediction.silvermonth}</p>
            <p><strong>Price:</strong> {props.prediction.minlow} - {props.prediction.minhigh} /quintal</p>
            <p><strong>Rainfall:</strong> Medium</p>
          </div>
        </div>
      </div>

      <p className="result-note">
        ⚠️ If there is variation in actual rainfall and expected rainfall, prediction may go wrong.
      </p>
    </div>
  );
};

export default Result;
