import React, { useState } from 'react';

const OutputSection = ({ output, isLoading }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const textToCopy = output.subject
            ? `Subject: ${output.subject}\n\n${output.content}`
            : output.content;

        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (isLoading) {
        return (
            <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-md)' }}>
                <div className="loader"></div>
                <p style={{ color: 'var(--text-muted)' }}>Crafting your message...</p>
            </div>
        );
    }

    if (!output.content) {
        return (
            <div className="glass-card" style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', opacity: 0.5 }}>
                <p style={{ textAlign: 'center' }}>Your rewritten message will appear here</p>
            </div>
        );
    }

    return (
        <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--accent)' }}>AI Suggestion</h3>
                <button
                    onClick={handleCopy}
                    className="btn-copy"
                >
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
            </div>

            {output.subject && (
                <div style={{ marginBottom: 'var(--space-md)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>SUBJECT</span>
                    <div className="glass-input" style={{ marginTop: 'var(--space-xs)', fontWeight: 500 }}>
                        {output.subject}
                    </div>
                </div>
            )}

            <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>MESSAGE</span>
                <textarea
                    className="glass-input"
                    readOnly
                    style={{ width: '100%', height: 'calc(100% - 25px)', marginTop: 'var(--space-xs)', minHeight: '350px', background: 'transparent', border: 'none', padding: 0 }}
                    value={output.content}
                />
            </div>
        </div>
    );
};

export default OutputSection;
