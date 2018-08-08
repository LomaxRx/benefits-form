import React from 'react';
import { mount } from 'enzyme';
import Status from  '../components/status';

describe('Status', () => {
  let props;
  let mountedStatus;
  const status = () => {
    if (!mountedStatus) {
      mountedStatus = mount(
        <Status {...props} />
      );
    }
    return mountedStatus;
  }

  beforeEach(() => {
    props = {
      message: null,
      code: null,
      text: null,
      dismiss: () => {},
      nextStep: () => {}
    };
    mountedStatus = undefined;
  });

  test('component does not display when no code is passed', () => {
    const div = status().find('div').first();

    expect(div.props().style.visibility).toBe('hidden');
  });


  describe('a post response has been received with a status', () => {
    beforeEach(() => {
      props.code = 201;
      props.text = '';
      props.message = ''
    });

    test('the status modal is visible', () => {
      const _status = status()
      const div = _status.find('div').first();
      expect(_status.state().show).toEqual(true);
      expect(div.props().style.visibility).toEqual('visible');
      expect(div.props().className).toEqual('modal fade show');
    });

    test('a dismiss or next step button is rendered', () => {
      const buttons = status().find('button');
      expect(buttons.length).toBe(1);
    });
  });


});
