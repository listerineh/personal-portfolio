import React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div style={{
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#111113',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px',
    overflow: 'hidden',
  }}>
    {/* Amber top accent bar */}
    <div style={{ height: '3px', background: '#f59e0b' }} />

    {/* Header */}
    <div style={{ padding: '36px 32px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <p style={{
        margin: '0 0 12px 0',
        fontSize: '10px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.3em',
        color: 'rgba(251,191,36,0.7)',
      }}>
        New Message
      </p>
      <h1 style={{
        fontSize: '22px',
        fontWeight: '700',
        margin: '0',
        color: '#ffffff',
        lineHeight: '1.2',
      }}>
        Contact from Portfolio
      </h1>
    </div>

    {/* Content */}
    <div style={{ padding: '28px 32px' }}>

      {/* Sender info */}
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '24px',
      }}>
        <div style={{ marginBottom: '16px' }}>
          <span style={{
            fontSize: '10px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.3)',
          }}>From</span>
          <p style={{ fontSize: '17px', fontWeight: '600', margin: '5px 0 0', color: '#ffffff' }}>
            {name}
          </p>
        </div>
        <div>
          <span style={{
            fontSize: '10px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.3)',
          }}>Email</span>
          <p style={{ fontSize: '15px', margin: '5px 0 0', fontWeight: '500' }}>
            <a href={`mailto:${email}`} style={{ color: '#f59e0b', textDecoration: 'none' }}>
              {email}
            </a>
          </p>
        </div>
      </div>

      {/* Message */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{
          fontSize: '10px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.3)',
          margin: '0 0 10px',
        }}>Message</p>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderLeft: '1px solid rgba(245,158,11,0.4)',
          borderRadius: '8px',
          padding: '18px 20px',
        }}>
          <p style={{
            fontSize: '15px',
            lineHeight: '1.75',
            margin: '0',
            color: 'rgba(255,255,255,0.75)',
            whiteSpace: 'pre-wrap',
          }}>
            {message}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', paddingTop: '4px' }}>
        <a href={`mailto:${email}?subject=Re: Contact from Portfolio`} style={{
          display: 'inline-block',
          backgroundColor: '#f59e0b',
          color: '#000000',
          padding: '12px 32px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '700',
          fontSize: '13px',
          letterSpacing: '0.05em',
        }}>
          Reply to {name}
        </a>
      </div>
    </div>

    {/* Footer */}
    <div style={{
      padding: '20px 32px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      textAlign: 'center',
    }}>
      <p style={{ margin: '0 0 6px', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
        Sent via <strong style={{ color: 'rgba(251,191,36,0.6)' }}>listerineh.dev</strong> contact form
      </p>
      <p style={{ margin: '0', fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
        {new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    </div>
  </div>
);

export default EmailTemplate;
