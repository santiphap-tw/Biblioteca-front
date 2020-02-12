import ReactDOM from 'react-dom';
import { renderHook } from '@testing-library/react-hooks';
import ItemManagement from './Items';


it('should show checkout button for an availalbe item', () => {
    const profileData = {
        "id": "222-2222",
        "password": "2222",
        "name": "Santiphap B.",
        "email": "santiphap.b@mail.com",
        "phone": "02-222-2222",
        "items": [
                {
                "title": "Movie C",
                "available": false,
                "year": 2020,
                "director": "Santiphap C.",
                "rating": 10
            }
        ]
    }
    const itemsData = [{
        "title": "Movie A",
        "available": true,
        "borrower": null,
        "year": 2020,
        "director": "Santiphap C.",
        "rating": 10
    }];
    const { result } = renderHook(() => ItemManagement({profile: profileData, items : itemsData,update : null}));
  
    const container = document.createElement('div');
    ReactDOM.render(result.current, container);
    expect(container.innerHTML).toMatch(/Check out/);
});

it('should show return button for item you checked out', () => {
    const profileData = {
        "id": "222-2222",
        "password": "2222",
        "name": "Santiphap B.",
        "email": "santiphap.b@mail.com",
        "phone": "02-222-2222",
        "items": [
                {
                "title": "Movie C",
                "available": false,
                "year": 2020,
                "director": "Santiphap C.",
                "rating": 10
            }
        ]
    }
    const itemsData = [{
        "title": "Movie C",
        "available": false,
        "borrower": {
            "id": "222-2222"
        },
        "year": 2020,
        "director": "Santiphap C.",
        "rating": 10
    }];
    const { result } = renderHook(() => ItemManagement({profile: profileData, items : itemsData,update : null}));
  
    const container = document.createElement('div');
    ReactDOM.render(result.current, container);
    expect(container.innerHTML).toMatch(/Return/);
});

it('should show not available button for item someone else checked out', () => {
    const profileData = {
        "id": "222-2222",
        "password": "2222",
        "name": "Santiphap B.",
        "email": "santiphap.b@mail.com",
        "phone": "02-222-2222",
        "items": [
                {
                "title": "Movie C",
                "available": false,
                "year": 2020,
                "director": "Santiphap C.",
                "rating": 10
            }
        ]
    }
    const itemsData = [{
        "title": "Movie C",
        "available": false,
        "borrower": {
            "id": "111-1111"
        },
        "year": 2020,
        "director": "Santiphap C.",
        "rating": 10
    }];
    const { result } = renderHook(() => ItemManagement({profile: profileData, items : itemsData,update : null}));
  
    const container = document.createElement('div');
    ReactDOM.render(result.current, container);
    expect(container.innerHTML).toMatch(/Not available/);
});

it('should show no button for available item when you are not logged in', () => {
    const profileData = null;
    const itemsData = [{
        "title": "Movie C",
        "available": true,
        "borrower": null,
        "year": 2020,
        "director": "Santiphap C.",
        "rating": 10
    }];
    const { result } = renderHook(() => ItemManagement({profile: profileData, items : itemsData,update : null}));
  
    const container = document.createElement('div');
    ReactDOM.render(result.current, container);
    expect(container.innerHTML).toMatch(/\<td\>\<\/td\>\<\/tr\>/);
});

it('should show not available button for not available item when you are not logged in', () => {
    const profileData = null;
    const itemsData = [{
        "title": "Movie C",
        "available": false,
        "borrower": {
            "id": "111-1111"
        },
        "year": 2020,
        "director": "Santiphap C.",
        "rating": 10
    }];
    const { result } = renderHook(() => ItemManagement({profile: profileData, items : itemsData,update : null}));
  
    const container = document.createElement('div');
    ReactDOM.render(result.current, container);
    expect(container.innerHTML).toMatch(/Not available/);
});