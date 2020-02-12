import ReactDOM from 'react-dom';
import { renderHook } from '@testing-library/react-hooks';
import UserManagement from './User';

it('should show login form when no user', () => {
    const { result } = renderHook(() => UserManagement({profile: null,update : null}));
  
    const container = document.createElement('div');
    ReactDOM.render(result.current, container);
  
    expect(container.innerHTML).toMatch(/UserLogin/);
});
  
it('should show profile when have user', () => {
    const profile = {
      "id" : "111-1111",
      "name" : "Santiphap",
      "email" : "santiphap@mail",
      "phone" : "01-111-1111"
    };
    const { result } = renderHook(() => UserManagement({profile: profile,update : null}));
  
    const container = document.createElement('div');
    ReactDOM.render(result.current, container);
  
    expect(container.innerHTML).toMatch(/UserProfile/);
    expect(container.innerHTML).toMatch(/111-1111/);
    expect(container.innerHTML).toMatch(/Santiphap/);
    expect(container.innerHTML).toMatch(/santiphap@mail/);
    expect(container.innerHTML).toMatch(/01-111-1111/);
});