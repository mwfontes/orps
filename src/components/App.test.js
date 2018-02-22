import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  
    const app = shallow(<App />);
    
    it ('Renders the `App` correctly', () => {
      expect(app).toMatchSnapshot();
    });

    it ('Initializes the `scores` correctly', () => {
        expect(app.instance().winsOpponent).toEqual(0);
        expect(app.instance().winsPlayer).toEqual(0);
        expect(app.instance().winsDraws).toEqual(0);
        expect(app.instance().gameOver).toBe(false);
    });

    describe('Resets the game', () => {
        beforeAll(() => {
            app.instance().winsOpponent = 2;
            app.instance().winsPlayer = 1;
            app.instance().winsDraws = 1;
            app.instance().gameOver = true;
        });

        it('checks if the game is rolling', () => {
            expect(app.instance().winsOpponent).toEqual(2);
            expect(app.instance().winsPlayer).toEqual(1);
            expect(app.instance().winsDraws).toEqual(1);
            expect(app.instance().gameOver).toBe(true);
        });
    });
});