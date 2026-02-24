import React from 'react';

const Footer = () => {
    return (
        <footer id="support" className="glass" style={{
            padding: 'var(--space-xl)',
            marginTop: 'var(--space-xl)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
        }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h3 style={{ color: 'var(--accent)', marginBottom: 'var(--space-md)' }}>Support & Developer Info</h3>
                <p style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 600, marginBottom: 'var(--space-xs)' }}>
                    Aman Singh
                </p>
                <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-sm)' }}>
                    Software Developer
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                        <span style={{ color: 'var(--primary)' }}>📞</span>
                        <a href="tel:+917439064694" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>+91 7439064694</a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                        <span style={{ color: 'var(--primary)' }}>✉️</span>
                        <a href="mailto:amaninternsingh2003@gmail.com" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>amaninternsingh2003@gmail.com</a>
                    </div>
                </div>
                <p style={{ marginTop: 'var(--space-lg)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    © 2026 SmartWrite AI. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
