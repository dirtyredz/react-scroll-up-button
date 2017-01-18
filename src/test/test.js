
import { jsdom } from 'jsdom';

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('<!doctype html><html><body style="height:2000px"></body></html>');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});
global.navigator = {
  userAgent: 'node.js'
};

require('raf').polyfill()
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';
import ScrollUpButton from '../react-scroll-up-button';
import { expect } from 'chai';


//Testing group
describe('Testing <ScrollUpButton/> Action scroll to assigned props top:', ()=>{
  let Component, ScrollTo_Stub;
  before(()=>{
    window.pageYOffset = 0
    //Render component
    Component = mount(<ScrollUpButton StopPosition={50}/>);

    ////////////////////////////////
    // Fix for NodeJS 7.4, without this line the test worked on NodeJS 6.9
    // without window.scrollTo I would get the TypeError message below
    // TypeError: Attempted to wrap scrollTo which is already stubbed
    window.scrollTo = null;
    // I only need to assign this value here once, even though I stub window.scrollTo at the bottom of the page
    // Any advice would be much appeciated on explaining this behavior.
    // The only thing I can suspect is nodeJS for some reason does something to the window obj or jsdom is failing to invoce the proper function in NodeJS 7.4
    ////////////////////////////////

    //Settup stub and replace scrollTo function with ours.
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
    expect(Component.state().ToggleScrollUp).to.equal(true); // <-- Is the button visible
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
describe('Testing <ScrollUpButton/> settup:', ()=>{
  //it test a single requirment inside the test group
  //WAS componentDidMount called
  it('did call componentDidMount', () => {
    sinon.spy(ScrollUpButton.prototype, 'componentDidMount');
    const wrapper = mount(<ScrollUpButton />);
    expect(ScrollUpButton.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  //it test a single requirment inside the test group
  //Check the ShowAtPostion default
  it('prop defaults', ()=>{
    const wrapper = mount(<ScrollUpButton />);
    expect(wrapper.props().ShowAtPostion).to.equal(150);
    expect(wrapper.props().StopPosition).to.equal(0);
    expect(wrapper.props().ContainerClassName).to.equal('ScrollUpButton__Container');
    expect(wrapper.props().EasingType).to.equal('easeOutCubic');
    expect(wrapper.props().AnimationDuration).to.equal(500);
    expect(wrapper.props().TransitionClassName).to.equal('ScrollUpButton__Toggled');
  })

  //it test a single requirment inside the test group
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

  //it test a single requirment inside the test group
  //Check the ToggleScrollUp state
  it('ToggleScrollUp should be any empty string', ()=>{
    const wrapper = mount(<ScrollUpButton />);
    expect(wrapper.state().ToggleScrollUp).to.equal('');
  })

  //it test a single requirment inside the test group
  //Check the ToggleScrollUp state when scrolled down
  it('ToggleScrollUp should be true when scrolled down', ()=>{
    const wrapper = mount(<ScrollUpButton />);
    // Set the scroll position to 200 and trigger the event manually
    window.pageYOffset = 200
    wrapper.instance().HandleScroll();
    expect(wrapper.state().ToggleScrollUp).to.equal(true);
  })

  //it test a single requirment inside the test group
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
    //Settup stub and replace scrollTo function with ours.
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
    expect(Component.state().ToggleScrollUp).to.equal(true); // <-- Is the button visible
    Component.instance().HandleClick(); // <-- call HandleClick to start the scroll up simulation.
    //Well wait a little bit to let the simulation complete
    setTimeout(()=>{
      expect(ScrollTo_Stub.lastCall.args[1]).to.within(-10,10); // <-- is pageYOffset between -10 and 10
      expect(Component.state().ToggleScrollUp).to.equal(''); // <-- Button should be hidden again
      done() // <-- since were asynchronous with setTimeout instruct chai that were done with the test.
    }, 500);
  });
});
