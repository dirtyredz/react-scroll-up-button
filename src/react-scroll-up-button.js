// _object-assign
import "babel-polyfill"
import React from "react";
import TweenFunctions from "tween-functions";
import PropTypes from 'prop-types';
import detectPassiveEvents from 'detect-passive-events';

class ScrollUpButton extends React.Component {
  constructor(props){
    super(props)
    this.state={ToggleScrollUp: ''};
    this.Animation = {StartPosition: 0, CurrentAnimationTime: 0, StartTime:null, AnimationFrame:null}
    this.HandleScroll = this.HandleScroll.bind(this)
    this.StopScrollingFrame = this.StopScrollingFrame.bind(this)
    this.ScrollingFrame = this.ScrollingFrame.bind(this)
    this.HandleClick = this.HandleClick.bind(this)
  }

  HandleScroll() {
    //window.pageYOffset = current scroll position
    //ShowAtPostion = position at which we want the button to show.
    if (window.pageYOffset > this.props.ShowAtPostion) {
      //styles.Toggled = the class name we want applied to transition the button in.
      this.setState({ToggleScrollUp: this.props.TransitionClassName});
    } else {
      //remove the class name
      this.setState({ToggleScrollUp: ''});
    }
  }

  HandleClick() {
    this.StopScrollingFrame();//Stoping all AnimationFrames
    this.Animation.StartPosition = window.pageYOffset;//current scroll position
    this.Animation.CurrentAnimationTime = 0;
    this.Animation.StartTime = null;
    //Start the scrolling animation.
    this.Animation.AnimationFrame = window.requestAnimationFrame(this.ScrollingFrame);
  }

  ScrollingFrame() {
    let timestamp = Math.floor(Date.now());
    //If StartTime has not been assigned a value, assign it the start timestamp.
    if (!this.Animation.StartTime) {
      this.Animation.StartTime = timestamp;
    }

    //set CurrentAnimationTime every iteration of ScrollingFrame()
    this.Animation.CurrentAnimationTime = timestamp - this.Animation.StartTime;
    //if we hit the StopPosition, StopScrollingFrame()
    if (window.pageYOffset <= this.props.StopPosition) {
      this.StopScrollingFrame();
    } else {
      //Otherwise continue ScrollingFrame to the StopPosition.
      //Does not support horizontal ScrollingFrame.
      //Let TweenFunctions handle the math to give us a new position based on AnimationDuration and EasingType type
      let YPos = TweenFunctions[this.props.EasingType](
        this.Animation.CurrentAnimationTime,
        this.Animation.StartPosition,
        this.props.StopPosition,
        this.props.AnimationDuration
      );
      if(YPos <= this.props.StopPosition){
        YPos = this.props.StopPosition
      }
      window.scrollTo(0, YPos);
      //Request another frame to be painted
      this.Animation.AnimationFrame = window.requestAnimationFrame(this.ScrollingFrame);
    }
  }

  StopScrollingFrame() {
    //Stop the Animation Frames.
    window.cancelAnimationFrame(this.Animation.AnimationFrame);
  }
  componentDidMount() {
    this.HandleScroll(); // run HandleScroll() at mount incase we are already scrolled down
    window.addEventListener('scroll', this.HandleScroll);
    window.addEventListener("wheel", this.StopScrollingFrame, detectPassiveEvents.hasSupport ? { passive : true } : false);//Stop animation if user mouse wheels during animation.
    window.addEventListener("touchstart", this.StopScrollingFrame, detectPassiveEvents.hasSupport ? { passive : true } : false);//Stop animation if user touches the screen during animation.
  }

  componentWillUnmount() {
    //Remove all events, since component is no longer mounted.
    window.removeEventListener('scroll', this.HandleScroll);
    window.removeEventListener("wheel", this.StopScrollingFrame, false);
    window.removeEventListener("touchstart", this.StopScrollingFrame, false);
  }
  render() {
    var styles={
      MainStyle: {
        backgroundColor: 'rgba(50, 50, 50, 0.5)',
        height: 50,
        position: 'fixed',
        bottom: 20,
        width: 50,
        WebkitTransition: 'all 0.5s ease-in-out',
        transition: 'all 0.5s ease-in-out',
        transitionProperty: 'opacity, right',
        cursor: 'pointer',
        opacity: 0,
        right: -50,
        zIndex: 1000,
      },
      SvgStyle: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        strokeWidth: 0,
        stroke: 'white',
        fill: 'white',
      },
      ToggledStyle: {
        opacity: 1,
        right: 20,
      }
    }
    if(this.props.children){
      const childrenWithProps = React.Children.map(this.props.children,
        (child) => React.cloneElement(child, {
          className: this.className
        })
      );
      return(
        <aside data-testid="react-scroll-up-button" style={Object.assign({}, this.props.style, this.state.ToggleScrollUp && this.props.ToggledStyle )} className={this.props.ContainerClassName + " " + this.state.ToggleScrollUp} onClick={this.HandleClick}>
          {childrenWithProps}
        </aside>
      );
    }else{
      return(
        <aside data-testid="react-scroll-up-button" className={this.props.ContainerClassName + " " + this.state.ToggleScrollUp} style={Object.assign({}, styles.MainStyle, this.props.style, this.state.ToggleScrollUp && styles.ToggledStyle, this.state.ToggleScrollUp && this.props.ToggledStyle)} onClick={this.HandleClick}>
          <svg viewBox="0 0 32 32" version="1.1"  xmlns="http://www.w3.org/2000/svg" x="0" y="0" xmlSpace="preserve" style={styles.SvgStyle}>
              <path transform="scale(1.4) translate(1,-5)" d="M19.196 23.429q0 0.232-0.179 0.411l-0.893 0.893q-0.179 0.179-0.411 0.179t-0.411-0.179l-7.018-7.018-7.018 7.018q-0.179 0.179-0.411 0.179t-0.411-0.179l-0.893-0.893q-0.179-0.179-0.179-0.411t0.179-0.411l8.321-8.321q0.179-0.179 0.411-0.179t0.411 0.179l8.321 8.321q0.179 0.179 0.179 0.411zM19.196 16.571q0 0.232-0.179 0.411l-0.893 0.893q-0.179 0.179-0.411 0.179t-0.411-0.179l-7.018-7.018-7.018 7.018q-0.179 0.179-0.411 0.179t-0.411-0.179l-0.893-0.893q-0.179-0.179-0.179-0.411t0.179-0.411l8.321-8.321q0.179-0.179 0.411-0.179t0.411 0.179l8.321 8.321q0.179 0.179 0.179 0.411z"></path>
          </svg>
        </aside>
      );
    }
  }
}
export default ScrollUpButton

export const TinyButton = (props)=>{
  var styles={
    MainStyle: {
      backgroundColor: 'rgb(87, 86, 86)',
      height: 30,
      position: 'fixed',
      bottom: 20,
      width: 30,
      WebkitTransition: 'all 0.5s ease-in-out',
      transition: 'all 0.5s ease-in-out',
      transitionProperty: 'opacity, right',
      cursor: 'pointer',
      opacity: 0,
      right: -75,
      zIndex: 1000,
      fill: '#292929',
      paddingBottom: 1,
      paddingLeft: 1,
      paddingRight: 1,
      transition: 'fill 0.5s linear'
    },
    ToggledStyle: {
      opacity: 1,
      right: 30,
    }
  }
  return (
    <ScrollUpButton {...props} style={Object.assign({}, styles.MainStyle, props.style)} ToggledStyle={Object.assign({}, styles.ToggledStyle, props.ToggledStyle)}>
      <svg viewBox="0 0 28 28" version="1.1"  xmlns="http://www.w3.org/2000/svg" x="0" y="0" xmlSpace="preserve">
        <path d="M26.297 20.797l-2.594 2.578c-0.391 0.391-1.016 0.391-1.406 0l-8.297-8.297-8.297 8.297c-0.391 0.391-1.016 0.391-1.406 0l-2.594-2.578c-0.391-0.391-0.391-1.031 0-1.422l11.594-11.578c0.391-0.391 1.016-0.391 1.406 0l11.594 11.578c0.391 0.391 0.391 1.031 0 1.422z"></path>
      </svg>
    </ScrollUpButton>
  );
}

export const CircleArrow = (props)=>{
  var styles={
    MainStyle: {
      backgroundColor: 'rgb(255, 255, 255)',
      borderRadius: '50%',
      border: '5px solid black',
      height: 50,
      position: 'fixed',
      bottom: 20,
      width: 50,
      WebkitTransition: 'all 0.5s ease-in-out',
      transition: 'all 0.5s ease-in-out',
      transitionProperty: 'opacity, right',
      cursor: 'pointer',
      opacity: 0,
      right: -75,
    },
    ToggledStyle: {
      opacity: 1,
      right: 20,
    }
  }
  return (
    <ScrollUpButton {...props} style={Object.assign({}, styles.MainStyle, props.style)} ToggledStyle={Object.assign({}, styles.ToggledStyle, props.ToggledStyle)}>
      <svg viewBox="0 0 32 32">
        <path className="path1" d="M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z"></path>
      </svg>
    </ScrollUpButton>
  );
}

export const VerticleButton = (props)=>{
  var styles={
    MainStyle: {
      backgroundColor: 'rgb(58, 56, 56)',
      position: 'fixed',
      bottom: 40,
      padding: "5px 10px",
      WebkitTransition: 'all 0.5s ease-in-out',
      transition: 'all 0.5s ease-in-out',
      transitionProperty: 'opacity, right',
      cursor: 'pointer',
      opacity: 0,
      right: -75,
      transform: "rotate(-90deg)"
    },
    ToggledStyle: {
      opacity: 1,
      right: 10,
    }
  }
  return (
    <ScrollUpButton {...props} style={Object.assign({}, styles.MainStyle, props.style)} ToggledStyle={Object.assign({}, styles.ToggledStyle, props.ToggledStyle)}>
      <span style={{fontSize: 23, color: "white"}}>UP &#8594;</span>
    </ScrollUpButton>
  );
}

ScrollUpButton.defaultProps  = {
  ContainerClassName: 'ScrollUpButton__Container',
  StopPosition: 0,
  ShowAtPostion: 150,
  EasingType: 'easeOutCubic',
  AnimationDuration: 500,
  TransitionClassName: 'ScrollUpButton__Toggled',
  style: {},
  ToggledStyle: {}
}
ScrollUpButton.propTypes ={
  StopPosition: PropTypes.number,
  ShowAtPostion: PropTypes.number.isRequired, // show button under this position,
  EasingType: PropTypes.oneOf(['linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic',
      'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint',
      'easeOutQuint', 'easeInOutQuint', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInExpo', 'easeOutExpo',
      'easeInOutExpo', 'easeInCirc', 'easeOutCirc', 'easeInOutCirc', 'easeInElastic', 'easeOutElastic',
      'easeInOutElastic', 'easeInBack', 'easeOutBack', 'easeInOutBack', 'easeInBounce', 'easeOutBounce',
      'easeInOutBounce']),
  AnimationDuration: PropTypes.number, // seconds
  style: PropTypes.object,
  ToggledStyle: PropTypes.object,
  ContainerClassName: PropTypes.string,
  TransitionClassName: PropTypes.string
}
