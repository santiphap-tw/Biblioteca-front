import ReactDOM from 'react-dom';
import { renderHook } from '@testing-library/react-hooks';
import App from './App';


it('should have welcome message, item management, user management', async () => {

  const { result } = renderHook(() => App());

  const container = document.createElement('div');
  ReactDOM.render(result.current, container);

  expect(container.innerHTML).toMatch(/WelcomeMessage/);
  expect(container.innerHTML).toMatch(/ItemManagement/);
  expect(container.innerHTML).toMatch(/UserManagement/);
});
