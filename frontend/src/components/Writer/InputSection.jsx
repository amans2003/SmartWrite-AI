import React from 'react';

const InputSection = ({ value, onChange }) => {
    return (
        <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--space-sm)', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Paste your raw message
            </label>
            <textarea
                className="glass-input"
                style={{ width: '100%', minHeight: '300px', resize: 'vertical', fontSize: '1rem', lineHeight: '1.6' }}
                placeholder="Type or paste your informal email or message here..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default InputSection;
