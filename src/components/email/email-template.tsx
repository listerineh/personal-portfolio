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
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    overflow: 'hidden'
  }}>
    {/* Header with gradient */}
    <div style={{ 
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      padding: '40px 30px',
      textAlign: 'center'
    }}>
      <h1 style={{ 
        fontSize: '28px', 
        fontWeight: '700',
        margin: '0 0 8px 0',
        color: '#ffffff',
        letterSpacing: '-0.5px'
      }}>
        📬 New Contact Message
      </h1>
      <p style={{ 
        margin: '0',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '14px',
        fontWeight: '500'
      }}>
        Someone reached out through your portfolio
      </p>
    </div>

    {/* Content */}
    <div style={{ padding: '30px' }}>
      {/* Sender Info Card */}
      <div style={{ 
        backgroundColor: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ marginBottom: '12px' }}>
          <span style={{ 
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#6b7280'
          }}>
            From
          </span>
          <p style={{ 
            fontSize: '18px',
            fontWeight: '600',
            margin: '4px 0 0 0',
            color: '#111827'
          }}>
            {name}
          </p>
        </div>
        
        <div>
          <span style={{ 
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#6b7280'
          }}>
            Email
          </span>
          <p style={{ 
            fontSize: '16px',
            margin: '4px 0 0 0',
            color: '#3b82f6',
            fontWeight: '500'
          }}>
            <a href={`mailto:${email}`} style={{ 
              color: '#3b82f6',
              textDecoration: 'none'
            }}>
              {email}
            </a>
          </p>
        </div>
      </div>

      {/* Message Card */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px'
        }}>
          <span style={{ fontSize: '20px' }}>💬</span>
          <h2 style={{ 
            fontSize: '16px',
            fontWeight: '600',
            margin: '0',
            color: '#111827',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Message
          </h2>
        </div>
        
        <div style={{ 
          backgroundColor: '#ffffff',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <p style={{ 
            fontSize: '15px',
            lineHeight: '1.7',
            margin: '0',
            color: '#374151',
            whiteSpace: 'pre-wrap'
          }}>
            {message}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <a href={`mailto:${email}?subject=Re: Contact from Portfolio`} style={{
          display: 'inline-block',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          padding: '12px 32px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '14px',
          letterSpacing: '0.3px',
          transition: 'background-color 0.2s'
        }}>
          Reply to {name}
        </a>
      </div>
    </div>

    {/* Footer */}
    <div style={{ 
      backgroundColor: '#f9fafb',
      padding: '20px 30px',
      borderTop: '1px solid #e5e7eb',
      textAlign: 'center'
    }}>
      <p style={{ 
        margin: '0 0 8px 0',
        fontSize: '13px',
        color: '#6b7280',
        fontWeight: '500'
      }}>
        Sent via <strong style={{ color: '#3b82f6' }}>listerineh.dev</strong> contact form
      </p>
      <p style={{ 
        margin: '0',
        fontSize: '12px',
        color: '#9ca3af'
      }}>
        {new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
    </div>
  </div>
);

export default EmailTemplate;
