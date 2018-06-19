import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import 'jsdom-global/register';
require('raf').polyfill();
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import ScrollUpButton from '../react-scroll-up-button';
import {TinyButton } from '../react-scroll-up-button';
import {VerticleButton } from '../react-scroll-up-button';
import {CircleArrow } from '../react-scroll-up-button';
import { expect } from 'chai';

//Testing group
describe('Testing <ScrollUpButton/> Action scroll to assigned props top:', ()=>{
  let Component, ScrollTo_Stub;
  before(()=>{
    window.pageYOffset = 0
    //Render component
    Component = mount(<ScrollUpButton StopPosition={50}/>);

    ScrollTo_Stub = sinon.stub(window, 'scrollTo').callsFake((x,y)=>{
      window.pageXOffset = x;
      window.pageYOffset = y;
      Component.instance().HandleScroll(); // <-- call HandleScroll so the test can simulate the button being toggled
    });

  })
  after(()=>{
    ScrollTo_Stub.restore(); // <-- Restore the objects method
  })
  //did it scroll the page up
  it('did scroll the page to 50', (done) => {
    expect(Component.state().ToggleScrollUp).to.equal(''); // <-- Is the button hidden
    window.pageYOffset = 300 // <-- scroll window down to prepare for smulation
    Component.instance().HandleScroll(); // <-- call handleScroll since we scrolled the window down.
    expect(Component.state().ToggleScrollUp).to.equal('ScrollUpButton__Toggled'); // <-- Is the button visible
    Component.instance().HandleClick(); // <-- call HandleClick to start the scroll up simulation.
    //Well wait a little bit to let the simulation complete
    setTimeout(()=>{
      expect(ScrollTo_Stub.lastCall.args[1]).to.within(40,60); // <-- is pageYOffset between 40 and 60
      expect(Component.state().ToggleScrollUp).to.equal(''); // <-- Button should be hidden again
      done() // <-- since were asynchronous with setTimeout instruct chai that were done with the test.
    }, 500);
  });
});

//Testing group
describe('Testing <ScrollUpButton/> setup:', ()=>{
  //WAS componentDidMount called
  it('did call componentDidMount', () => {
    let DidMount = sinon.spy(ScrollUpButton.prototype, 'componentDidMount');
    let WillUnmount = sinon.spy(ScrollUpButton.prototype, 'componentWillUnmount');
    const wrapper = mount(<ScrollUpButton />);
    expect(DidMount.callCount).to.equal(1);
    wrapper.unmount();
    expect(WillUnmount.callCount).to.equal(1);
  });


  //Check the ShowAtPostion default
  it('prop defaults', ()=>{
    const wrapper = mount(<ScrollUpButton />);
    expect(wrapper.props().ShowAtPostion).to.equal(150);
    expect(wrapper.props().StopPosition).to.equal(0);
    expect(wrapper.props().ContainerClassName).to.equal('ScrollUpButton__Container');
    expect(wrapper.props().EasingType).to.equal('easeOutCubic');
    expect(wrapper.props().AnimationDuration).to.equal(500);
    expect(wrapper.props().TransitionClassName).to.equal('ScrollUpButton__Toggled');
    expect(wrapper.props().style).to.deep.equal({});
    expect(wrapper.props().ToggledStyle).to.deep.equal({});
  })

  //Check the ShowAtPostion assigned
  it('props assigned', ()=>{
    const wrapper = mount(<ScrollUpButton ShowAtPostion={200} StopPosition={100} ContainerClassName="NewClass" TransitionClassName="AnotherClass" EasingType="easeInOutBounce" AnimationDuration={1000}/>);
    expect(wrapper.props().ShowAtPostion).to.equal(200);
    expect(wrapper.props().StopPosition).to.equal(100);
    expect(wrapper.props().ContainerClassName).to.equal('NewClass');
    expect(wrapper.props().EasingType).to.equal('easeInOutBounce');
    expect(wrapper.props().AnimationDuration).to.equal(1000);
    expect(wrapper.props().TransitionClassName).to.equal('AnotherClass');
  })
});

//Testing group
describe('Testing <ScrollUpButton/> current state:', ()=>{
  // before each it test.
  //make sure window is scrolled to the top
  beforeEach(()=>{
    window.pageYOffset = 0
  });

  //Check the ToggleScrollUp state
  it('ToggleScrollUp should be any empty string', ()=>{
    const wrapper = mount(<ScrollUpButton />);
    expect(wrapper.state().ToggleScrollUp).to.equal('');
  })

  //Check the ToggleScrollUp state when scrolled down
  it('ToggleScrollUp should be ScrollUpButton__Toggled when scrolled down', ()=>{
    const wrapper = mount(<ScrollUpButton />);
    // Set the scroll position to 200 and trigger the event manually
    window.pageYOffset = 200
    wrapper.instance().HandleScroll();
    expect(wrapper.state().ToggleScrollUp).to.equal('ScrollUpButton__Toggled');
  })

  //Check the ToggleScrollUp state when scrolled down when children is passed
  it('ToggleScrollUp should be NewClass when scrolled down, with children', ()=>{
    const wrapper = mount(
      <ScrollUpButton>
        <span></span>
      </ScrollUpButton>
    );
    // Set the scroll position to 200 and trigger the event manually
    window.pageYOffset = 200
    wrapper.instance().HandleScroll();
    expect(wrapper.state().ToggleScrollUp).to.equal('ScrollUpButton__Toggled');
  })
});

//Testing group
describe('Testing <ScrollUpButton/> Action scroll to default top:', ()=>{
  let Component, ScrollTo_Stub;
  before(()=>{
    window.pageYOffset = 0
    //Render component
    Component = mount(<ScrollUpButton />);
    //Setup stub and replace scrollTo function with ours.
    // TypeError: Attempted to wrap scrollTo which is already stubbed
    ScrollTo_Stub = sinon.stub(window, 'scrollTo').callsFake((x,y)=>{
      window.pageXOffset = x;
      window.pageYOffset = y;
      Component.instance().HandleScroll(); // <-- call HandleScroll so the test can simulate the button being toggled
    });
  })
  after(()=>{
    ScrollTo_Stub.restore(); // <-- Restore the objects method
  })
  //did it scroll the page up
  it('did scroll the page to 0', (done) => {
    expect(Component.state().ToggleScrollUp).to.equal(''); // <-- Is the button hidden
    window.pageYOffset = 300 // <-- scroll window down to prepare for smulation
    Component.instance().HandleScroll(); // <-- call handleScroll since we scrolled the window down.
    expect(Component.state().ToggleScrollUp).to.equal('ScrollUpButton__Toggled'); // <-- Is the button visible
    Component.instance().HandleClick(); // <-- call HandleClick to start the scroll up simulation.
    //Well wait a little bit to let the simulation complete
    setTimeout(()=>{
      expect(ScrollTo_Stub.lastCall.args[1]).to.within(-10,10); // <-- is pageYOffset between -10 and 10
      expect(Component.state().ToggleScrollUp).to.equal(''); // <-- Button should be hidden again
      done() // <-- since were asynchronous with setTimeout instruct chai that were done with the test.
    }, 500);
  });
});

//Testing group
describe('Testing Themed Buttons:', (done)=>{
  let Component, ScrollTo_Stub;
  //did it scroll the page up
  it('did load TinyButton', (done) => {
    const wrapper = mount(<TinyButton />);
    expect(wrapper.find('svg').html()).to.equal('<svg viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" xml:space="preserve"><path d="M26.297 20.797l-2.594 2.578c-0.391 0.391-1.016 0.391-1.406 0l-8.297-8.297-8.297 8.297c-0.391 0.391-1.016 0.391-1.406 0l-2.594-2.578c-0.391-0.391-0.391-1.031 0-1.422l11.594-11.578c0.391-0.391 1.016-0.391 1.406 0l11.594 11.578c0.391 0.391 0.391 1.031 0 1.422z"></path></svg>');
    done();
  });

  it('did load CircleArrow', (done) => {
    const wrapper = mount(<CircleArrow />);
    expect(wrapper.find('svg').html()).to.equal('<svg viewBox="0 0 32 32"><path class="path1" d="M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z"></path></svg>');
    done();
  });

  it('did load VerticleButton', (done) => {
    const wrapper = mount(<VerticleButton />);
    console.log(wrapper.find('span').html())
    expect(wrapper.find('span').html()).to.equal('<span style="font-size: 23px; color: white;">UP →</span>');
    done();
  });
});