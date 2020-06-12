import React from 'react';

import Form from './RegisterForm';

export default function Register() {
    return (
        <div>
            <div style={{ width: '50%', margin: '100px auto 0 auto', textAlign: 'center', border: '1px solid #e4e4e4', padding: '20px' }}>
                <h2>Sign up</h2>
                <Form />
            </div>
        </div>
    )
}