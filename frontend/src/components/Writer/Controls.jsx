import React from 'react';

const Controls = ({ tone, setTone, length, setLength, context, setContext, onRewrite, isLoading }) => {
    const tones = ['Professional', 'Formal', 'Casual', 'Polite', 'Urgent'];
    const lengths = ['Short', 'Medium', 'Long'];
    const contexts = ['General', 'Job Application', 'Client Reply', 'Follow-up', 'Request', 'Apology'];

    return (
        <div className="glass-card">
            <div style={{ marginBottom: 'var(--space-lg)' }}>
                <span style={{ display: 'block', marginBottom: 'var(--space-sm)', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>TONE</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
                    {tones.map(t => (
                        <button
                            key={t}
                            onClick={() => setTone(t)}
                            className={tone === t ? 'btn-active' : 'btn-inactive'}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: 'var(--space-lg)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div>
                    <span style={{ display: 'block', marginBottom: 'var(--space-sm)', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>LENGTH</span>
                    <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                        {lengths.map(l => (
                            <button
                                key={l}
                                onClick={() => setLength(l)}
                                className={`btn-toggle ${length === l ? 'active' : ''}`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <span style={{ display: 'block', marginBottom: 'var(--space-sm)', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>CONTEXT</span>
                    <select
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        className="glass-input"
                        style={{ width: '100%', padding: 'var(--space-xs) var(--space-sm)' }}
                    >
                        {contexts.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            <button
                onClick={onRewrite}
                disabled={isLoading}
                style={{
                    width: '100%',
                    padding: 'var(--space-md)',
                    background: 'linear-gradient(to right, var(--primary), var(--primary-hover))',
                    color: 'white',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                    opacity: isLoading ? 0.7 : 1
                }}
            >
                {isLoading ? 'Rewriting...' : 'Rewrite with AI'}
            </button>
        </div>
    );
};

export default Controls;
