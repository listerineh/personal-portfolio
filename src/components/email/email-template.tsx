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
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', color: '#333' }}>
    <div style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '20px', marginBottom: '20px' }}>
      <h1 style={{ fontSize: '24px', margin: '0 0 10px 0' }}>New Message from {name}</h1>
      <p style={{ margin: '0', color: '#666' }}>Email: {email}</p>
    </div>
    
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '4px' }}>
      <h2 style={{ fontSize: '18px', marginTop: '0' }}>Message:</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '0' }}>{message}</p>
    </div>
    
    <div style={{ marginTop: '20px', fontSize: '14px', color: '#999', textAlign: 'center' }}>
      <p>Sent via personal portfolio contact form</p>
    </div>
  </div>
);

export default EmailTemplate;