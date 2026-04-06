import React from 'react';

const LINK_CLASSES = {
    foundational: 'paper-link',
    active_development: 'paper-link active-link',
    emerging: 'paper-link emerging-link',
};

export default function PaperPoint({ point, category = 'foundational', index = 0 }) {
    const linkClass = LINK_CLASSES[category] || 'paper-link';
    const link = point.url || (point.doi ? `https://doi.org/${point.doi}` : null);

    return (
        <div className="paper-point" style={{ animationDelay: `${index * 0.06}s` }}>
            <p className="paper-point-summary">{point.summary}</p>
            <div className="paper-point-meta">
                {link ? (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                        title={point.paper_title}
                    >
                        <span>📄</span>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {point.paper_title}
                        </span>
                        <span style={{ flexShrink: 0 }}>↗</span>
                    </a>
                ) : (
                    <span className="paper-link" style={{ color: 'var(--text-muted)', cursor: 'default' }}>
                        📄 {point.paper_title}
                    </span>
                )}
                {point.year && <span className="year-badge">{point.year}</span>}
            </div>
            {point.authors && (
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                    👤 {point.authors}
                </div>
            )}
        </div>
    );
}
