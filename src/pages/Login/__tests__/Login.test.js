import React from 'react';
import {
    BrowserRouter as Router
} from 'react-router-dom';

import { render } from '@testing-library/react';

import Login from '../index';

it('should render login', () => {
    const {getByTestId} = render(<Router><Login /></Router>);

    expect(getByTestId('login-form')).toBeTruthy();
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();

})