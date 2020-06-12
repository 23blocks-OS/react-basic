import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Counties from '../index';

it('should render Counties component', () => {

    const { getByTestId } = render(<Counties />);

    expect(getByTestId("title")).toBeTruthy();
    expect(getByTestId("search-input")).toBeTruthy();

});

it('should render Table when search input changes', () => {
    const { getByTestId } = render(<Counties />);

    fireEvent.change(getByTestId("search-input"), { target: {value: 'test'} });

    setTimeout(() => {
        expect(getByTestId("table")).toBeTruthy();
    }, 600)

})