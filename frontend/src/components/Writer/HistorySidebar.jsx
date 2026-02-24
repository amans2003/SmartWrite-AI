import React from 'react';

const HistorySidebar = ({ history, onLoadHistory, onClearHistory, activeId }) => {
    return (
        <div className="glass-card history-sidebar">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                <h3 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>HISTORY</h3>
                <button
                    onClick={onClearHistory}
                    style={{ background: 'transparent', color: 'var(--error)', fontSize: '0.7rem', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                >
                    Clear
                </button>
            </div>

            <div className="history-list">
                {history.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', marginTop: 'var(--space-xl)' }}>
                        No previous chats found.
                    </p>
                ) : (
                    history.map((item) => (
                        <div
                            key={item.id}
                            className={`history-item ${activeId === item.id ? 'active' : ''}`}
                            onClick={() => onLoadHistory(item)}
                        >
                            <div className="history-item-header">
                                <span className="history-tag">{item.tone}</span>
                                <span className="history-date">{new Date(item.timestamp).toLocaleDateString()}</span>
                            </div>
                            <p className="history-preview">{item.inputText.substring(0, 60)}...</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HistorySidebar;
