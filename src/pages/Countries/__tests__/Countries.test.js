import React from 'react';
import { render, fireEvent, cleanup, waitForElement } from '@testing-library/react';
import Counties from '../index';
import { setApiKey } from '../../../api/api';

afterEach(cleanup);

it('should render Counties component', () => {
  const { getByTestId } = render(<Counties />);
  expect(getByTestId('title')).toBeTruthy();
  expect(getByTestId('search-input')).toBeTruthy();
});

it('should render Table when search input changes', async () => {
  const { getByTestId } = render(<Counties />);
  fireEvent.change(getByTestId('search-input'), { target: { value: 'test' } });
  expect.assertions(1);
  const table = await waitForElement(() => getByTestId('table'));
  expect(table).toBeTruthy();
});

it('should render at least 1 County as result', async () => {
  setApiKey();
  const wrapper = render(<Counties />);
  const search = 'a';
  fireEvent.change(wrapper.getByTestId('search-input'), {
    target: { value: search },
  });
  expect.assertions(1);

  const resultsTable = await waitForElement(() =>
    wrapper.getAllByTestId('table-row')
  );
  expect(resultsTable.length).toBeGreaterThan(0);
});
