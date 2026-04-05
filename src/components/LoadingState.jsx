import React from 'react';

const STEPS = [
    { icon: '🔍', label: 'Searching IEEE Xplore…' },
    { icon: '🤖', label: 'Analysing with AI…' },
    { icon: '📊', label: 'Categorising papers…' },
];

export default function LoadingState() {
    const [step, setStep] = React.useState(0);

    React.useEffect(() => {
        const id = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 4000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="loading-container">
            <div className="loading-orb" />
            <p className="loading-text">{STEPS[step].icon} {STEPS[step].label}</p>
            <p className="loading-sub">This may take 15–30 seconds</p>
        </div>
    );
}
