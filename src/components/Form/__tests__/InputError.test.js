import React from 'react';
import { render } from '@testing-library/react';

import InputError from '../InputError';

it('should render error', () => {
    let errors = {
        'name': 'error on name'
    }

    let name = 'name';

    let touched = {
        'name': true
    }

    const { getByTestId } = render(<InputError errors={errors} name={name} touched={touched} />);

    expect(getByTestId("error")).toBeTruthy();

});

it("shouldn't render error when name is not on errors", () => {
    let errors = {
        'test': 'error on test'
    }

    let name = 'name';

    let touched = {
        'test': true
    }

    const { queryByTestId } = render(<InputError errors={errors} name={name} touched={touched} />);

    expect(queryByTestId("error")).toBeNull();
})

it("shouldn't render error when field is not touched", () => {
    let errors = {
        'name': 'error on name'
    }

    let name = 'name';

    let touched = {
        'name': false
    }

    const { queryByTestId } = render(<InputError errors={errors} name={name} touched={touched} />);

    expect(queryByTestId("error")).toBeNull();
})