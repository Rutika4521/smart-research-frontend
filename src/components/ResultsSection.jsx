import React from 'react';
import { exportAllCategoriesPDF } from '../utils/pdfExport';

const CATEGORY_CONFIG = {
    foundational: {
        icon: '📚',
        gradient: 'linear-gradient(135deg, #1a2a4a 0%, #0f1e3a 100%)',
        accent: '#4a90d9',
        badge: '#2563eb',
    },
    active_development: {
        icon: '⚙️',
        gradient: 'linear-gradient(135deg, #1a3a2a 0%, #0f2a1a 100%)',
        accent: '#4ad9a0',
        badge: '#16a34a',
    },
    emerging: {
        icon: '🚀',
        gradient: 'linear-gradient(135deg, #2a1a4a 0%, #1a0f3a 100%)',
        accent: '#a04ad9',
        badge: '#7c3aed',
    },
};

const BADGE_LABELS = {
    foundational: 'PAST RESEARCH',
    active_development: 'CURRENT RESEARCH',
    emerging: 'FUTURE SCOPE',
};

export default function ResultsSection({ data, onSelectCategory }) {
    const handleExportAll = () => {
        try {
            exportAllCategoriesPDF(data.topic, data.categories);
        } catch (e) {
            console.error(e);
            alert("Error exporting PDF: " + e.message);
        }
    };

    return (
        <div className="results-container">
            {/* Header */}
            <div className="results-header">
                <h2 className="results-title">
                    Results for <span className="topic-highlight">"{data.topic}"</span>
                </h2>
                <p className="results-meta">
                    Analysed <strong>{data.total_papers}</strong> IEEE papers &nbsp;·&nbsp;
                    Click a category to explore in detail
                </p>

                {/* Export All button */}
                <button className="export-all-btn" onClick={handleExportAll}>
                    📄 Export Full Doc
                </button>
            </div>

            {/* 3 clickable cards */}
            <div className="category-cards-grid">
                {data.categories.map((cat) => {
                    const cfg = CATEGORY_CONFIG[cat.category] || CATEGORY_CONFIG.foundational;
                    return (
                        <button
                            key={cat.category}
                            className="category-option-card"
                            style={{ background: cfg.gradient }}
                            onClick={() => onSelectCategory(cat)}
                        >
                            <div
                                className="card-icon-wrap"
                                style={{ background: cfg.badge + '33' }}
                            >
                                <span className="card-icon">{cfg.icon}</span>
                            </div>
                            <div className="card-content">
                                <span
                                    className="card-badge"
                                    style={{ background: cfg.badge }}
                                >
                                    {BADGE_LABELS[cat.category]}
                                </span>
                                <h3
                                    className="card-title"
                                    style={{ color: cfg.accent }}
                                >
                                    {cat.label}
                                </h3>
                                <p className="card-desc">{cat.description}</p>
                                <div className="card-footer">
                                    <span
                                        className="paper-pill"
                                        style={{
                                            background: cfg.badge + '33',
                                            color: cfg.accent,
                                        }}
                                    >
                                        {cat.papers.length} papers
                                    </span>
                                    <span
                                        className="explore-arrow"
                                        style={{ color: cfg.accent }}
                                    >
                                        Explore →
                                    </span>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
