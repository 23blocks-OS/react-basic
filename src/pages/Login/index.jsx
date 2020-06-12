import React from 'react';

import LoginForm from './LoginForm';

export default function Login() {
    return (
        <div>
            <div style={{ width: '50%', margin: '100px auto 0 auto', textAlign: 'center', border: '1px solid #e4e4e4', padding: '20px' }}>
                <h2>Sign in</h2>
                <LoginForm />
            </div>
        </div>
    );
}