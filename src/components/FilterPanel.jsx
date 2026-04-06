import React from 'react';

export default function FilterPanel({ filters, onChange }) {
    const handleChange = (key, value) => onChange({ ...filters, [key]: value });
    const currentYear = new Date().getFullYear();

    return (
        <div className="filter-panel">
            <div className="filter-group">
                <label className="filter-label">Start Year</label>
                <input
                    className="filter-input"
                    type="number"
                    min="2000"
                    max={filters.end_year}
                    value={filters.start_year}
                    onChange={(e) => handleChange('start_year', parseInt(e.target.value, 10))}
                />
            </div>
            <div className="filter-group">
                <label className="filter-label">End Year</label>
                <input
                    className="filter-input"
                    type="number"
                    min={filters.start_year}
                    max={currentYear}
                    value={filters.end_year}
                    onChange={(e) => handleChange('end_year', parseInt(e.target.value, 10))}
                />
            </div>
            <div className="filter-group">
                <label className="filter-label">Sort By</label>
                <select
                    className="filter-select"
                    value={filters.sort_by}
                    onChange={(e) => handleChange('sort_by', e.target.value)}
                >
                    <option value="relevance">Relevance</option>
                    <option value="date">Date</option>
                </select>
            </div>

        </div>
    );
}
