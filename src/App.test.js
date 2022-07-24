import { render, screen, fireEvent } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import AddProduct from './components/AddProduct';
import App from './App';

/*test('open add car modal form', async () => {
  render(<App />);
  fireEvent.click(screen.getByText('Product Management'));
});*/

test('renders a snapshot', () => {
  const tree = TestRenderer.create
  (<AddProduct/>).toJSON();
  expect(tree).toMatchSnapshot();
});