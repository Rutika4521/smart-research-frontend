import React from 'react';

export default function SearchBar({ value, onChange, onSearch, loading }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim()) onSearch(value.trim());
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="search-wrapper">
                <span className="search-icon">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                </span>
                <input
                    className="search-input"
                    type="text"
                    placeholder="e.g. quantum computing, AI in healthcare…"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={loading}
                />
                <button className="search-btn" type="submit" disabled={loading || !value.trim()}>
                    {loading ? <span className="search-spin" /> : null}
                    {loading ? 'Searching…' : 'Search'}
                </button>
            </div>
        </form>
    );
}
