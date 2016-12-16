import React from "react";
import TweenFunctions from "tween-functions";

import styles from './react-scroll-up-button.css';

export default class ScrollUpButton extends React.Component {
    constructor(props){
        super(props)
        this.state={ToggleScrollUp: ''};
        this.Animation = {StartPosition: 0, CurrentAnimationTime: 0, StartTime:null,AnimationFrame:null}
    }

    HandleScroll() {
        //window.pageYOffset = current scroll position
        //TransitionBtnPosition = position at which we want the button to show.
        if (window.pageYOffset > this.props.TransitionBtnPosition) {
            //styles.Toggled = the class name we want applied to transition the button in.
            if(this.props.children){
              this.setState({ToggleScrollUp: this.props.TransitionClassName});
            }else{
              this.setState({ToggleScrollUp: styles.Toggled});
            }

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
        this.Animation.AnimationFrame = window.requestAnimationFrame(this.ScrollingFrame.bind(this));
    }

    ScrollingFrame(timestamp) {
        //Retrieve timestamp from window.requestAnimationFrame
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
            window.scrollTo(0, TweenFunctions[this.props.EasingType](
                this.Animation.CurrentAnimationTime,
                this.Animation.StartPosition,
                this.props.StopPosition,
                this.props.AnimationDuration
            ));
            //Request another frame to be painted
            this.Animation.AnimationFrame = window.requestAnimationFrame(this.ScrollingFrame.bind(this));
        }
    }

    StopScrollingFrame() {
        //Stop the Animation Frames.
        window.cancelAnimationFrame(this.Animation.AnimationFrame);
    }
    componentDidMount() {
        this.HandleScroll(); // run HandleScroll() at mount incase we are already scrolled down
        window.addEventListener('scroll', this.HandleScroll.bind(this));
        window.addEventListener("wheel", this.StopScrollingFrame.bind(this), false);//Stop animation if user mouse wheels during animation.
        window.addEventListener("touchstart", this.StopScrollingFrame.bind(this), false);//Stop animation if user touches the screen during animation.
    }

    componentWillUnmount() {
        //Remove all events, since component is no longer mounted.
        window.removeEventListener('scroll', this.HandleScroll.bind(this));
        window.removeEventListener("wheel", this.StopScrollingFrame.bind(this), false);
        window.removeEventListener("touchstart", this.StopScrollingFrame.bind(this), false);
    }
    render() {
      if(this.props.children){
        const childrenWithProps = React.Children.map(this.props.children,
         (child) => React.cloneElement(child, {
           class: this.className
         })
        );
        return(
          <aside class={this.props.ContainerClassName + " " + this.state.ToggleScrollUp} onClick={this.HandleClick.bind(this)}>
            {childrenWithProps}
          </aside>
        );
      }else{
        return(
          <aside class={styles.ScrollUp + " " + this.state.ToggleScrollUp} onClick={this.HandleClick.bind(this)}>
              <svg class={styles.SVG} viewBox="0 0 32 32" >
                  <path d="M19.196 23.429q0 0.232-0.179 0.411l-0.893 0.893q-0.179 0.179-0.411 0.179t-0.411-0.179l-7.018-7.018-7.018 7.018q-0.179 0.179-0.411 0.179t-0.411-0.179l-0.893-0.893q-0.179-0.179-0.179-0.411t0.179-0.411l8.321-8.321q0.179-0.179 0.411-0.179t0.411 0.179l8.321 8.321q0.179 0.179 0.179 0.411zM19.196 16.571q0 0.232-0.179 0.411l-0.893 0.893q-0.179 0.179-0.411 0.179t-0.411-0.179l-7.018-7.018-7.018 7.018q-0.179 0.179-0.411 0.179t-0.411-0.179l-0.893-0.893q-0.179-0.179-0.179-0.411t0.179-0.411l8.321-8.321q0.179-0.179 0.411-0.179t0.411 0.179l8.321 8.321q0.179 0.179 0.179 0.411z"></path>
              </svg>
          </aside>
        );
      }
    }
}
ScrollUpButton.propTypes ={
  StopPosition: React.PropTypes.number,
  TransitionBtnPosition: React.PropTypes.number.isRequired, // show button under this position,
  EasingType: React.PropTypes.oneOf(['linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic',
      'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint',
      'easeOutQuint', 'easeInOutQuint', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInExpo', 'easeOutExpo',
      'easeInOutExpo', 'easeInCirc', 'easeOutCirc', 'easeInOutCirc', 'easeInElastic', 'easeOutElastic',
      'easeInOutElastic', 'easeInBack', 'easeOutBack', 'easeInOutBack', 'easeInBounce', 'easeOutBounce',
      'easeInOutBounce']),
  AnimationDuration: React.PropTypes.number // seconds
}
ScrollUpButton.defaultProps  = {
    ContainerClassName: 'ScrollUpButton__Container',
    StopPosition: 0,
    TransitionBtnPosition: 150,
    EasingType: 'easeOutCubic',
    AnimationDuration: 500,
    TransitionClassName: 'ScrollUpButton__Toggled',
}
