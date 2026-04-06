import React from 'react';
import { exportCategoryPDF } from '../utils/pdfExport';

const CATEGORY_ICONS = {
    foundational: '📚',
    active_development: '⚙️',
    emerging: '🚀',
};

const CATEGORY_COLORS = {
    foundational: { bg: '#1a2a4a', accent: '#4a90d9', badge: '#2563eb' },
    active_development: { bg: '#1a3a2a', accent: '#4ad9a0', badge: '#16a34a' },
    emerging: { bg: '#2a1a4a', accent: '#a04ad9', badge: '#7c3aed' },
};

export default function CategoryDetailPage({ category, topic, onBack }) {
    const colors = CATEGORY_COLORS[category.category] || CATEGORY_COLORS.foundational;
    const icon = CATEGORY_ICONS[category.category] || '📄';

    const handleExport = () => exportCategoryPDF(topic, category);

    return (
        <div className="detail-page">
            {/* Header bar */}
            <div className="detail-header" style={{ borderBottom: `2px solid ${colors.accent}` }}>
                <button className="back-btn" onClick={onBack}>
                    ← Back
                </button>
                <div className="detail-title-row">
                    <span className="detail-icon">{icon}</span>
                    <div>
                        <span className="detail-badge" style={{ background: colors.badge }}>
                            {category.label.toUpperCase()}
                        </span>
                        <h1 className="detail-heading">{category.label}</h1>
                        <p className="detail-subheading">{category.description}</p>
                    </div>
                </div>
                <button className="export-btn" onClick={handleExport}>
                    📄 Export PDF
                </button>
            </div>

            {/* Overview bullets */}
            {category.overview && category.overview.length > 0 && (
                <div className="detail-section overview-section" style={{ borderLeft: `4px solid ${colors.accent}` }}>
                    <h2 className="section-title">📋 Key Insights</h2>
                    <ul className="overview-bullets">
                        {category.overview.map((bullet, i) => (
                            <li key={i} className="overview-bullet">
                                <span className="bullet-dot" style={{ background: colors.accent }} />
                                {bullet}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Referenced papers */}
            <div className="detail-section papers-section">
                <h2 className="section-title">
                    📎 Referenced Papers
                    <span className="papers-count" style={{ background: colors.badge }}>
                        {category.papers.length}
                    </span>
                </h2>
                {category.papers.length === 0 ? (
                    <p className="no-papers">No papers found in this category.</p>
                ) : (
                    <ol className="papers-list">
                        {category.papers.map((paper, i) => (
                            <li key={i} className="paper-item">
                                <div className="paper-number" style={{ background: colors.badge }}>{i + 1}</div>
                                <div className="paper-info">
                                    <div className="paper-meta">
                                        {paper.year && <span className="paper-year">{paper.year}</span>}
                                        {paper.authors && (
                                            <span className="paper-authors">👤 {paper.authors}</span>
                                        )}
                                    </div>
                                    {paper.url ? (
                                        <a
                                            className="paper-title-link"
                                            href={paper.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {paper.paper_title}
                                            <span className="link-arrow"> ↗</span>
                                        </a>
                                    ) : (
                                        <span className="paper-title-text">{paper.paper_title}</span>
                                    )}
                                    {paper.summary && (
                                        <p className="paper-summary">{paper.summary}</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </div>
    );
}
