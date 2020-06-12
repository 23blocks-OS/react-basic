import React from 'react';
import {
    BrowserRouter as Router
} from 'react-router-dom';

import { render } from '@testing-library/react';

import Register from '../index';

it('should render register form', () => {
    const {getByTestId} = render(<Router><Register /></Router>);

    expect(getByTestId('register-form')).toBeTruthy();
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByTestId('name-input')).toBeTruthy();
    expect(getByTestId('confirm-password-input')).toBeTruthy();

})