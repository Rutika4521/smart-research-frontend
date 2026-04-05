import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
    timeout: 240000, // 4 minutes — IEEE fetch + Groq AI analysis
});

export async function searchResearch(topic, filters = {}) {
    const { start_year = 2015, end_year = 2024, sort_by = 'relevance'} = filters;
    const { data } = await api.post('/research', {
        topic,
        start_year,
        end_year,
        sort_by,
    });
    return data;
}

export default api;
