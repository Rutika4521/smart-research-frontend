import React, { useState, useRef, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import LoadingState from './components/LoadingState';
import ResultsSection from './components/ResultsSection';
import CategoryDetailPage from './components/CategoryDetailPage';
import { useResearch } from './hooks/useResearch';

const DEFAULT_FILTERS = {
    start_year: 2015,
    end_year: 2024,
    sort_by: 'relevance',
};

// ── Views: 'home' | 'results' | 'detail'
export default function App() {
    const [view, setView] = useState('home');          // current page
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [historyOpen, setHistoryOpen] = useState(false);
    const historyRef = useRef(null);

    const { query, setQuery, results, loading, error, history, search, clearHistory } =
        useResearch();

    // Close history dropdown when clicking outside
    useEffect(() => {
        function handler(e) {
            if (historyRef.current && !historyRef.current.contains(e.target)) {
                setHistoryOpen(false);
            }
        }
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSearch = (topic) => {
        setSelectedCategory(null);
        setView('home'); // will flip to results once data arrives
        search(topic, filters).then ? null : null; // search triggers loading → results
    };

    // When results arrive, flip to results view
    useEffect(() => {
        if (results && !loading) setView('results');
    }, [results, loading]);

    const handleSelectCategory = (cat) => {
        setSelectedCategory(cat);
        setView('detail');
    };

    const handleBackToResults = () => {
        setSelectedCategory(null);
        setView('results');
    };

    const handleClearSearch = () => {
        setQuery('');
        setView('home');
    };

    const handleHistorySearch = (item) => {
        setHistoryOpen(false);
        setSelectedCategory(null);
        setQuery(item.topic || item);
        search(item.topic || item, item.filters || filters);
    };

    return (
        <div className="app">

            {/* ═══════ TOP NAVBAR ═══════ */}
            <nav className="top-nav">
                <button className="nav-logo" onClick={handleClearSearch}>
                    🔬 <span>Smart Research</span>
                </button>

                <div className="nav-right">
                    {/* Clear search — only when not on home */}
                    {view !== 'home' && (
                        <button className="clear-btn" onClick={handleClearSearch}>
                            ✕ New Search
                        </button>
                    )}

                    {/* History dropdown */}
                    <div className="history-wrapper" ref={historyRef}>
                        <button
                            className={`history-toggle ${historyOpen ? 'active' : ''}`}
                            onClick={() => setHistoryOpen((o) => !o)}
                            title="Search history"
                        >
                            🕐 History
                            {history.length > 0 && (
                                <span className="history-badge">{history.length}</span>
                            )}
                        </button>

                        {historyOpen && (
                            <div className="history-dropdown">
                                <div className="history-drop-header">
                                    <span>Recent Searches</span>
                                    {history.length > 0 && (
                                        <button
                                            className="history-clear-btn"
                                            onClick={() => { clearHistory(); setHistoryOpen(false); }}
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>
                                {history.length === 0 ? (
                                    <p className="history-empty">No searches yet</p>
                                ) : (
                                    <ul className="history-items">
                                        {history.map((item, i) => (
                                            <li key={i}>
                                                <button
                                                    className="history-pick"
                                                    onClick={() => handleHistorySearch(item)}
                                                >
                                                    🔍 {item.topic || item}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* ═══════ HOME VIEW ═══════ */}
            {view === 'home' && (
                <main className="home-view">
                    <div className="hero-content">
                        <h1 className="hero-title">Explore the Research Landscape</h1>
                        <p className="hero-subtitle">
                            Enter any research topic to get AI-categorized insights from IEEE Xplore
                            <br />— foundational work, active development, and emerging opportunities.
                        </p>
                        <SearchBar
                            value={query}
                            onChange={setQuery}
                            onSearch={handleSearch}
                            loading={loading}
                        />
                        <FilterPanel filters={filters} onChange={setFilters} />
                    </div>

                    {loading && <LoadingState />}

                    {error && !loading && (
                        <div className="error-banner">
                            <span>⚠</span>
                            <span><strong>Error:</strong> {error}</span>
                        </div>
                    )}
                </main>
            )}

            {/* ═══════ RESULTS VIEW — 3 cards ═══════ */}
            {view === 'results' && results && (
                <main className="page-view">
                    {loading && <LoadingState />}
                    {error && !loading && (
                        <div className="error-banner">
                            <span>⚠</span>
                            <span><strong>Error:</strong> {error}</span>
                        </div>
                    )}
                    {!loading && !error && (
                        <ResultsSection data={results} onSelectCategory={handleSelectCategory} />
                    )}
                </main>
            )}

            {/* ═══════ DETAIL VIEW ═══════ */}
            {view === 'detail' && selectedCategory && (
                <main className="page-view">
                    <CategoryDetailPage
                        category={selectedCategory}
                        topic={results?.topic || query}
                        onBack={handleBackToResults}
                    />
                </main>
            )}
        </div>
    );
}
