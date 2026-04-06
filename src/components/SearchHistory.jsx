import React from 'react';

export default function SearchHistory({ history, onSearch, onClear }) {
    if (!history || history.length === 0) return null;

    return (
        <div className="history-container">
            <div className="history-header">
                <span className="history-title">Recent searches</span>
                <button className="history-clear" onClick={onClear}>Clear</button>
            </div>
            <div className="history-list">
                {history.map((item, i) => (
                    <button
                        key={i}
                        className="history-item"
                        onClick={() => onSearch(item)}
                    >
                        🕐 {item.topic || item}
                    </button>
                ))}
            </div>
        </div>
    );
}
