import React from 'react';
import styled, { createGlobalStyle } from 'styled-components' // eslint-disable-line
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // eslint-disable-line
import { darcula as codeBlockStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'; // eslint-disable-line
import TweenFunctions from 'tween-functions';
import Select from 'react-select'; // eslint-disable-line
import NumericInput from 'react-numeric-input'; // eslint-disable-line
import './normalize.css'
import './CustomButton.css'

let ScrollUpButtons = []
const TweenOptions = Object.keys(TweenFunctions).map(tween => ({ value: tween, label: tween }))

if (process.env.NODE_ENV === 'development') {
  ScrollUpButtons = require('../../../src/react-scroll-up-button') // eslint-disable-line
} else {
  ScrollUpButtons = require('../../../dist/cjs/react-scroll-up-button') // eslint-disable-line
}

const CustomScrollUp = props => (
  <ScrollUpButtons.default
    {...props}
    ContainerClassName="AnyClassForContainer"
    TransitionClassName="AnyClassForTransition"
  >
    <span>Custom</span>
  </ScrollUpButtons.default>)

ScrollUpButtons.Custom = CustomScrollUp

export default class Example extends React.Component {
  constructor() {
    super();
    const { defaultProps } = ScrollUpButtons.default
    this.state = {
      currentBtn: 'default',
      EasingType: TweenOptions.filter(tween => tween.label === defaultProps.EasingType)[0],
      ShowAtPosition: defaultProps.ShowAtPosition,
      StopPosition: defaultProps.StopPosition,
      AnimationDuration: defaultProps.AnimationDuration,
      ShowAtPositionMaxValue: 3000,
    }
    this.EasingTypeOnChange = this.EasingTypeOnChange.bind(this)
    this.StopPositionOnChange = this.StopPositionOnChange.bind(this)
    this.ShowAtPositionOnChange = this.ShowAtPositionOnChange.bind(this)
    this.AnimationDurationOnChange = this.AnimationDurationOnChange.bind(this)
  }

  componentDidMount() {
    this.setState({ ShowAtPositionMaxValue: document.documentElement.offsetHeight - window.innerHeight - 1 })
  }

  EasingTypeOnChange(EasingType) {
    this.setState({ EasingType })
  }

  StopPositionOnChange(StopPosition) {
    this.setState({ StopPosition })
  }

  ShowAtPositionOnChange(ShowAtPosition) {
    const { StopPosition } = this.state
    const max = document.documentElement.offsetHeight - window.innerHeight - 1
    const min = StopPosition + 1
    if (ShowAtPosition > max) {
      this.setState({ ShowAtPosition: max })
      return
    }
    if (ShowAtPosition < min) {
      this.setState({ ShowAtPosition: min })
      return
    }
    this.setState({ ShowAtPosition })
  }

  AnimationDurationOnChange(AnimationDuration) {
    this.setState({ AnimationDuration })
  }

  handleClick(btn) {
    this.setState({ currentBtn: btn });
  }

  render() {
    const {
      currentBtn,
      EasingType,
      ShowAtPosition,
      StopPosition,
      AnimationDuration,
      ShowAtPositionMaxValue,
    } = this.state
    const { defaultProps } = ScrollUpButtons.default
    const EasingTypeProp = defaultProps.EasingType !== EasingType.value && `EasingType="${EasingType.value}"`
    const StopPositionProp = defaultProps.StopPosition !== StopPosition && `StopPosition={${StopPosition}}`
    const ShowAtPositionProp = defaultProps.ShowAtPosition !== ShowAtPosition && `ShowAtPosition={${ShowAtPosition}}`
    const AnimationDurationProp = defaultProps.AnimationDuration !== AnimationDuration && `AnimationDuration={${AnimationDuration}}`

    let ExampleProps = [
      EasingTypeProp,
      StopPositionProp,
      ShowAtPositionProp,
      AnimationDurationProp,
    ]
    ExampleProps = ExampleProps.filter(prop => prop)

    return (
      <Wrapper>
        <GlobalStyle />
        {Object.keys(ScrollUpButtons).map((btn) => {
          const CurBtn = ScrollUpButtons[btn]
          if (currentBtn === btn) {
            return (
              <CurBtn
                key={btn}
                EasingType={EasingType.value}
                ShowAtPosition={ShowAtPosition}
                StopPosition={StopPosition}
                AnimationDuration={AnimationDuration}
              />
            )
          }
          return null
        })}
        <br />
        <br />
        <Title><a href="https://github.com/dirtyredz/react-scroll-up-button">react-scroll-up-button</a></Title>
        <br />
        <br />
        <Description>
          An off-canvas button React component with pre styled buttons allowing &quot;Scroll To Top&quot; functionality.
        </Description>
        <p>
          Inspired by
          &nbsp;<a href="https://github.com/milosjanda/react-scroll-up">react-scroll-up</a>
          &nbsp;by milosjand, and
          &nbsp;<a href="https://github.com/negomi/react-burger-menu">react-burger-menu</a>
          &nbsp;by negomi.
        </p>
        <br />
        {Object.keys(ScrollUpButtons).map(btn => (
          <Button
            type="button"
            className={currentBtn === btn ? 'selected' : ''}
            disabled={currentBtn === btn}
            onClick={this.handleClick.bind(this, btn)} // eslint-disable-line react/jsx-no-bind
          >
            {btn}
          </Button>
        ))}
        <br />
        <Form>
          <FormChild>
            <MyLabel htmlFor="EasingType">EasingType:</MyLabel>
            <br />
            <Dropdown
              id="EasingType"
              className="select"
              classNamePrefix="select"
              defaultValue={EasingType}
              isSearchable
              onChange={this.EasingTypeOnChange}
              name="color"
              options={TweenOptions}
            />
            <br />
            <MyLabel htmlFor="StopPosition">StopPosition:</MyLabel>
            <br />
            <NumberInput
              id="StopPosition"
              onChange={this.StopPositionOnChange}
              min={0}
              max={ShowAtPosition - 1}
              value={StopPosition}
              style={false} // eslint-disable-line react/style-prop-object
            />
          </FormChild>
          <FormChild>
            <MyLabel htmlFor="ShowAtPosition">ShowAtPosition:</MyLabel>
            <br />
            <NumberInput
              id="ShowAtPosition"
              onChange={this.ShowAtPositionOnChange}
              min={StopPosition + 1}
              max={ShowAtPositionMaxValue}
              value={ShowAtPosition}
              style={false} // eslint-disable-line react/style-prop-object
            />
            <br />
            <MyLabel htmlFor="AnimationDuration">AnimationDuration:</MyLabel>
            <br />
            <NumberInput
              id="AnimationDuration"
              onChange={this.AnimationDurationOnChange}
              min={1}
              value={AnimationDuration}
              style={false} // eslint-disable-line react/style-prop-object
            />
          </FormChild>
        </Form>
        <br />
        <ScrollDown>Scroll Down</ScrollDown>
        <p>Too see the component</p>
        <CodeBlock>
          {Object.keys(ScrollUpButtons).map((btn) => {
            const str = `import React from "react";
import ${btn === 'default' || btn === 'Custom'
              ? 'ScrollUpButton'
              : `{${btn} as ScrollUpButton}`} from "react-scroll-up-button";${btn === 'Custom'
                ? `
import ./myCssFile.css;`
                : ''}

export default class Index extends React.Component {
  render() {
    return (
      <div>
        ${btn === 'Custom' ? `<ScrollUpButton
          ContainerClassName="AnyClassForContainer"
          TransitionClassName="AnyClassForTransition"${ExampleProps.length > 0
                ? `
          ${ExampleProps.map(prop => prop).join(`
          `)}}`
                : ''}
        >
          <MyCustomReactComponent />
        </ScrollUpButton>`
                : ExampleProps.length > 0 ? `<ScrollUpButton
          ${ExampleProps.map(prop => prop).join(`
          `)}
        />` : '<ScrollUpButton />'

        }
      </div>
    );
  }
}`

            const CustomCss = `.AnyClassForContainer {
  position: fixed;
  right: -100px;
  bottom: 150px;
  transition: right 0.5s;
  cursor: pointer;
  background-color: white;
  font-size: 20px;
  padding: 10px;
}

.AnyClassForTransition {
  right: 20px;
}`
            if (currentBtn === btn) {
              if (btn === 'Custom') {
                return (
                  <div>
                    <SyntaxHighlighter language="javascript" style={codeBlockStyle}>{str}</SyntaxHighlighter>
                    <SyntaxHighlighter language="css" style={codeBlockStyle}>{CustomCss}</SyntaxHighlighter>
                  </div>
                )
              }
              return <SyntaxHighlighter language="javascript" style={codeBlockStyle}>{str}</SyntaxHighlighter>
            }
            return null
          })}
        </CodeBlock>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background: #b30000;
  width: 100%;
  height:  2000px;
  text-align: center;
  min-width: 300px;

  & a{
    color: #f5f5f5;
    text-decoration: none;

    &:visited{
      color: #f5f5f5;
    }
    &:hover{
      color: #8a8a8a;
    }
  }
`
const Button = styled.button`
  display: inline-block;
  margin: 0.75em;
  padding: 1.35em 1.1em;
  background: #252525;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 800;
  border-top-left-radius: 20px 50px;
  border-top-right-radius: 20px 50px;
  border-bottom-right-radius: 20px 50px;
  border-bottom-left-radius: 20px 50px;
  cursor: pointer;
  border: none;

  &.selected{
    opacity: 0.6;
  }
  &:not(.selected):hover, &:not(.selected):focus{
    color: black;
  }
`

const Title = styled.h1`
  margin: 0;
  font-size: 4em;
`

const Description = styled.h2`
  max-width: 500px;
  margin: 1.2em auto 1em;
`

const ScrollDown = styled.h2`
  color: #00c1b1;
`

const CodeBlock = styled.div`
  max-width: 750px;
  margin: auto;
`
const Form = styled.div`
  text-align: left;
  width: 225px;
  margin: auto;
  display: flex;
  justify-content: center;
`

const FormChild = styled.div`
  padding: 20px;
`

const Dropdown = styled(Select)`
  width: 229px;
  display: inline-block;
`
const MyLabel = styled.label`
  display: inline-block;
  padding-top: 10px;
  padding-bottom: 5px;
  padding-left: 6px;
`

const NumberInput = styled(NumericInput)`
  border-top-left-radius: 20px 50px;
  border-top-right-radius: 20px 50px;
  border-bottom-right-radius: 20px 50px;
  border-bottom-left-radius: 20px 50px;
  padding-right: 3ex;
  box-sizing: border-box;
  font-size: inherit;
  height: 38px;
  border: none;
  padding-left: 10px;
  display: block;
  -webkit-appearance: none;
  line-height: normal;
  background: #252525;
  color: white;
`

const GlobalStyle = createGlobalStyle`
  .react-numeric-input {
    position: relative;
    display: inline-block;
  }
  .react-numeric-input b {
    position: absolute;
    right: 8px;
    width: 2.26ex;
    border-color: rgba(0, 0, 0, 0.1);
    border-style: solid;
    text-align: center;
    cursor: default;
    transition: all 0.1s ease 0s;
    background: rgba(247, 241, 241, 0.1);
    box-shadow: rgba(0,0,0,0.1) -1px -1px 3px inset, rgba(255,255,255,0.7) 1px 1px 3px inset;
    top: 2px;
    bottom: 50%;
    border-radius: 2px 2px 0px 0px;
    border-width: 1px 1px 0px;
  }
  .react-numeric-input b:last-child {
    top: 50%;
    bottom: 2px;
    border-radius: 0px 0px 2px 2px;
    border-width: 0px 1px 1px
  }
  .react-numeric-input i {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0px;
    height: 0px;
    border-width: 0px 0.6ex 0.6ex;
    border-color: transparent transparent rgba(241, 241, 241, 0.58);
    border-style: solid;
    margin: -0.3ex 0px 0px -0.56ex;
  }
  .react-numeric-input b:last-child > i {
    border-width: 0.6ex 0.6ex 0px;
    border-color: rgba(241, 241, 241, 0.58) transparent transparent;
  }

  .select > .select__control {
    background-color: #252525;
    border-color: #252525;
    border-top-left-radius: 20px 50px;
    border-top-right-radius: 20px 50px;
    border-bottom-right-radius: 20px 50px;
    border-bottom-left-radius: 20px 50px;
  }
  .select .select__single-value {
    color: white;
  }
`
