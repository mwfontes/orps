import React from 'react';
import { shallow } from 'enzyme';
import Player from './Player';

describe('Player', () => {
    const name = 'You';
    const mockFN = jest.fn();
    const props = { parent: {gameOver: mockFN} }
    const player = shallow(<Player name={name} playerChoosing={mockFN} {...props} />);

    it ('Renders `Player` correctly', () => {
        expect(player).toMatchSnapshot();
    });

    it('Checks if the `name` property is passed correctly', () => {
        expect(player.find('.player__name').text()).toEqual(name);
    });

    it('Checks if the `className` property is correct', () => {
        expect(player.find('.player__name').hasClass('player__name--' + name.toLowerCase())).toBe(true);
    });

    describe('Setting and unsetting the `hand` for the `opponent`', () => {
        
        it('Check if the hand is the setted one', () => {
            player.instance().setHand(player.instance().getHands()[0]);
            expect(player.state().hand.value).toEqual(0);
        });
        
        it('Expects the hand to be `????` - with value -1', () => {
            player.instance().hideHands();
            expect(player.state().hand.value).toEqual(-1);
        });
    });
    

    it('Gets the number of available types of hands', () => {
        expect(player.instance().getHands().length).toBeGreaterThan(0);
    })
})