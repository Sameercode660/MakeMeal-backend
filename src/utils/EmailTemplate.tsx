import * as React from 'react';

interface EmailTemplateProps {
  email: string
  otp: number
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  otp
}) => (
  <div>
    <h1>Welcome, {otp}!</h1>
  </div>
);
