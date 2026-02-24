import React from 'react';
import '../../index.css';

const Header = () => {
    return (
        <header className="glass animate-fade-in" style={{
            padding: 'var(--space-md) var(--space-xl)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                }}>G</div>
                <h1 style={{ fontSize: '1.25rem', margin: 0, background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    SmartWrite AI
                </h1>
            </div>
            <nav style={{ display: 'flex', gap: 'var(--space-lg)' }}>
                {/* <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Features</a> */}
                <a
                    href="#support"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    Support
                </a>
            </nav>
        </header>
    );
};

export default Header;
