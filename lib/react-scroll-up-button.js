"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _tweenFunctions = require("tween-functions");

var _tweenFunctions2 = _interopRequireDefault(_tweenFunctions);

var _reactScrollUpButton = require("./react-scroll-up-button.css");

var _reactScrollUpButton2 = _interopRequireDefault(_reactScrollUpButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollUpButton = function (_React$Component) {
    _inherits(ScrollUpButton, _React$Component);

    function ScrollUpButton(props) {
        _classCallCheck(this, ScrollUpButton);

        var _this = _possibleConstructorReturn(this, (ScrollUpButton.__proto__ || Object.getPrototypeOf(ScrollUpButton)).call(this, props));

        _this.state = { ToggleScrollUp: '' };
        _this.Animation = { StartPosition: 0, CurrentAnimationTime: 0, StartTime: null, AnimationFrame: null };
        return _this;
    }

    _createClass(ScrollUpButton, [{
        key: "HandleScroll",
        value: function HandleScroll() {
            //window.pageYOffset = current scroll position
            //TransitionBtnPosition = position at which we want the button to show.
            if (window.pageYOffset > this.props.TransitionBtnPosition) {
                //styles.Toggled = the class name we want applied to transition the button in.
                if (this.props.children) {
                    this.setState({ ToggleScrollUp: this.props.TransitionClassName });
                } else {
                    this.setState({ ToggleScrollUp: _reactScrollUpButton2.default.Toggled });
                }
            } else {
                //remove the class name
                this.setState({ ToggleScrollUp: '' });
            }
        }
    }, {
        key: "HandleClick",
        value: function HandleClick() {
            this.StopScrollingFrame(); //Stoping all AnimationFrames
            this.Animation.StartPosition = window.pageYOffset; //current scroll position
            this.Animation.CurrentAnimationTime = 0;
            this.Animation.StartTime = null;
            //Start the scrolling animation.
            this.Animation.AnimationFrame = window.requestAnimationFrame(this.ScrollingFrame.bind(this));
        }
    }, {
        key: "ScrollingFrame",
        value: function ScrollingFrame(timestamp) {
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
                window.scrollTo(0, _tweenFunctions2.default[this.props.EasingType](this.Animation.CurrentAnimationTime, this.Animation.StartPosition, this.props.StopPosition, this.props.AnimationDuration));
                //Request another frame to be painted
                this.Animation.AnimationFrame = window.requestAnimationFrame(this.ScrollingFrame.bind(this));
            }
        }
    }, {
        key: "StopScrollingFrame",
        value: function StopScrollingFrame() {
            //Stop the Animation Frames.
            window.cancelAnimationFrame(this.Animation.AnimationFrame);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.HandleScroll(); // run HandleScroll() at mount incase we are already scrolled down
            window.addEventListener('scroll', this.HandleScroll.bind(this));
            window.addEventListener("wheel", this.StopScrollingFrame.bind(this), false); //Stop animation if user mouse wheels during animation.
            window.addEventListener("touchstart", this.StopScrollingFrame.bind(this), false); //Stop animation if user touches the screen during animation.
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            //Remove all events, since component is no longer mounted.
            window.removeEventListener('scroll', this.HandleScroll.bind(this));
            window.removeEventListener("wheel", this.StopScrollingFrame.bind(this), false);
            window.removeEventListener("touchstart", this.StopScrollingFrame.bind(this), false);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            if (this.props.children) {
                var childrenWithProps = _react2.default.Children.map(this.props.children, function (child) {
                    return _react2.default.cloneElement(child, {
                        class: _this2.className
                    });
                });
                return _react2.default.createElement(
                    "aside",
                    { className: this.props.ContainerClassName + " " + this.state.ToggleScrollUp, onClick: this.HandleClick.bind(this) },
                    childrenWithProps
                );
            } else {
                return _react2.default.createElement(
                    "aside",
                    { className: _reactScrollUpButton2.default.ScrollUp + " " + this.state.ToggleScrollUp, onClick: this.HandleClick.bind(this) },
                    _react2.default.createElement(
                        "svg",
                        { className: _reactScrollUpButton2.default.SVG, viewBox: "0 0 32 32" },
                        _react2.default.createElement("path", { d: "M19.196 23.429q0 0.232-0.179 0.411l-0.893 0.893q-0.179 0.179-0.411 0.179t-0.411-0.179l-7.018-7.018-7.018 7.018q-0.179 0.179-0.411 0.179t-0.411-0.179l-0.893-0.893q-0.179-0.179-0.179-0.411t0.179-0.411l8.321-8.321q0.179-0.179 0.411-0.179t0.411 0.179l8.321 8.321q0.179 0.179 0.179 0.411zM19.196 16.571q0 0.232-0.179 0.411l-0.893 0.893q-0.179 0.179-0.411 0.179t-0.411-0.179l-7.018-7.018-7.018 7.018q-0.179 0.179-0.411 0.179t-0.411-0.179l-0.893-0.893q-0.179-0.179-0.179-0.411t0.179-0.411l8.321-8.321q0.179-0.179 0.411-0.179t0.411 0.179l8.321 8.321q0.179 0.179 0.179 0.411z" })
                    )
                );
            }
        }
    }]);

    return ScrollUpButton;
}(_react2.default.Component);

exports.default = ScrollUpButton;

ScrollUpButton.propTypes = {
    StopPosition: _react2.default.PropTypes.number,
    TransitionBtnPosition: _react2.default.PropTypes.number.isRequired, // show button under this position,
    EasingType: _react2.default.PropTypes.oneOf(['linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint', 'easeOutQuint', 'easeInOutQuint', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInExpo', 'easeOutExpo', 'easeInOutExpo', 'easeInCirc', 'easeOutCirc', 'easeInOutCirc', 'easeInElastic', 'easeOutElastic', 'easeInOutElastic', 'easeInBack', 'easeOutBack', 'easeInOutBack', 'easeInBounce', 'easeOutBounce', 'easeInOutBounce']),
    AnimationDuration: _react2.default.PropTypes.number // seconds
};
ScrollUpButton.defaultProps = {
    ContainerClassName: 'ScrollUpButton__Container',
    StopPosition: 0,
    TransitionBtnPosition: 150,
    EasingType: 'easeOutCubic',
    AnimationDuration: 500,
    TransitionClassName: 'ScrollUpButton__Toggled'
};