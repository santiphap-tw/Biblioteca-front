import ReactDOM from 'react-dom';
import { renderHook } from '@testing-library/react-hooks';
import App from './App';
import UserManagement from './User';

it('should have welcome message, item management, and user management component', () => {
  const { result } = renderHook(() => App());

  const container = document.createElement('div');
  ReactDOM.render(result.current, container);

  expect(container.innerHTML).toMatch(/WelcomeMessage/);
  expect(container.innerHTML).toMatch(/ItemManagement/);
  expect(container.innerHTML).toMatch(/UserManagement/);
});

it('should show login form when no user', () => {
  const { result } = renderHook(() => UserManagement({profile: null,update : null}));

  const container = document.createElement('div');
  ReactDOM.render(result.current, container);

  expect(container.innerHTML).toMatch(/UserLogin/);
});

it('should show profile when have user', () => {
  const profile = {
    "id" : "111-1111",
    "name" : "Name",
    "email" : "Email",
    "phone" : "Phone"
  };
  const { result } = renderHook(() => UserManagement({profile: profile,update : null}));

  const container = document.createElement('div');
  ReactDOM.render(result.current, container);

  expect(container.innerHTML).toMatch(/UserProfile/);
});
