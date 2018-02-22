import React from 'react';
import { shallow } from 'enzyme';
import Commands from './Commands';
import Player from './Player';

describe('App', () => {
  
    const mockFN = jest.fn();
    const props = {draw: mockFN, restart: mockFN};
    const commands = shallow(<Commands {...props} />);
    const player = shallow(<Player name='You' playerChoosing={mockFN} />)
    
    it ('Renders the `App` correctly', () => {
      expect(commands).toMatchSnapshot();
    });

    it('Expects the score to exist and be 0', () => {
      expect(commands.state().score).toEqual([0,0]);
    });

    describe('Update scores', () => {
      
      beforeEach(() => {
        commands.instance().updateScore(1,0);
      });
      
      it('Checks if the new score is correct', () => {
        expect(commands.state().score).toEqual([1,0]);
      });
    });

    describe('Draw actions', () => {
      commands.find('.commands__btn-draw').simulate('click');
      it('Draw should be called', () => {
        expect(commands.instance().props.draw).toHaveBeenCalled();
      });
    });

    it('Should reset', () => {
      expect(commands.instance().props.restart).toHaveBeenCalled();
    });

});