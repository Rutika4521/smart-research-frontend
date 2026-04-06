import React from 'react';
import PaperPoint from './PaperPoint';

const CATEGORY_CONFIG = {
    foundational: {
        icon: '📚',
        iconClass: 'foundational',
        badge: 'Past Research',
        badgeClass: 'badge-foundational',
    },
    active_development: {
        icon: '🔬',
        iconClass: 'active',
        badge: 'Current Research',
        badgeClass: 'badge-active',
    },
    emerging: {
        icon: '🚀',
        iconClass: 'emerging',
        badge: 'Future Scope',
        badgeClass: 'badge-emerging',
    },
};

export default function CategoryCard({ categoryKey, data, animDelay = 0 }) {
    const config = CATEGORY_CONFIG[categoryKey] || CATEGORY_CONFIG.foundational;
    const points = data?.points || [];

    return (
        <div className="category-card" style={{ animationDelay: `${animDelay}s` }}>
            <div className="category-card-header">
                <div className={`cat-icon ${config.iconClass}`}>{config.icon}</div>
                <div className="cat-title-wrap">
                    <span className={`cat-badge ${config.badgeClass}`}>{config.badge}</span>
                    <div className="cat-label">{data?.label || config.badge}</div>
                    <div className="cat-description">{data?.description}</div>
                </div>
            </div>
            <div className="category-card-body">
                {points.length === 0 ? (
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>
                        No papers found for this category.
                    </p>
                ) : (
                    points.map((point, i) => (
                        <PaperPoint key={i} point={point} category={categoryKey} index={i} />
                    ))
                )}
            </div>
        </div>
    );
}
