import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';

import PopupComponent from './PopupComponent';

describe('PopupComponent', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter>
                <PopupComponent/>
            </MemoryRouter>,
            div,
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
