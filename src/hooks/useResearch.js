import { useState } from 'react';
import { searchResearch } from '../utils/api';

const HISTORY_KEY = 'srs_search_history';
const MAX_HISTORY = 10;

function loadHistory() {
    try {
        return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    } catch {
        return [];
    }
}

function saveHistory(history) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function useResearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState(loadHistory);

    async function search(topic, filters) {
        if (!topic.trim()) return;
        setLoading(true);
        setError(null);
        setResults(null);

        try {
            const data = await searchResearch(topic, filters);
            setResults(data);

            // Update history (deduplicate)
            setHistory(prev => {
                const filtered = prev.filter(h => h.topic.toLowerCase() !== topic.toLowerCase());
                const next = [{ topic, timestamp: new Date().toISOString(), filters }, ...filtered].slice(0, MAX_HISTORY);
                saveHistory(next);
                return next;
            });
        } catch (err) {
            const message =
                err?.response?.data?.detail ||
                err?.message ||
                'Something went wrong. Please try again.';
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    function clearHistory() {
        setHistory([]);
        saveHistory([]);
    }

    return { query, setQuery, results, loading, error, history, search, clearHistory };
}
