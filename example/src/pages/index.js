import React from 'react';
import styled from 'styled-components' // eslint-disable-line
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // eslint-disable-line
import { darcula as codeBlockStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'; // eslint-disable-line
import './normalize.css'
import './CustomButton.css'


let ScrollUpButtons = []

if (process.env.NODE_ENV === 'development') {
  ScrollUpButtons = require('../../../src/react-scroll-up-button') // eslint-disable-line
} else {
  ScrollUpButtons = require('../../../dist/cjs/react-scroll-up-button') // eslint-disable-line
}
const CustomScrollUp = () => (
  <ScrollUpButtons.default ContainerClassName="AnyClassForContainer" TransitionClassName="AnyClassForTransition">
    <span>Custom</span>
  </ScrollUpButtons.default>)

ScrollUpButtons.Custom = CustomScrollUp

export default class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      currentBtn: 'default',
    };
  }

  handleClick(btn) {
    this.setState({ currentBtn: btn });
  }

  render() {
    const { currentBtn } = this.state
    return (
      <Wrapper>
        <br />
        <br />
        <Title><a href="https://github.com/dirtyredz/react-scroll-up-button">react-scroll-up-button</a></Title>
        <br />
        <br />
        <Description>
          An off-canvas button React component with pre styled buttons allowing &quot;Scroll To Top&quot; functionality.
        </Description>
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
        {Object.keys(ScrollUpButtons).map((btn) => {
          const CurBtn = ScrollUpButtons[btn]
          if (currentBtn === btn) {
            return <CurBtn key={btn} />
          }
          return null
        })}
        <p>
          Inspired by
          &nbsp;<a href="https://github.com/milosjanda/react-scroll-up">react-scroll-up</a>
          &nbsp;by milosjand, and
          &nbsp;<a href="https://github.com/negomi/react-burger-menu">react-burger-menu</a>
          &nbsp;by negomi.
        </p>
        <br />
        <br />
        <ScrollDown>Scroll Down</ScrollDown>
        <p>Too see the component</p>
        <CodeBlock>
          {Object.keys(ScrollUpButtons).map((btn) => {
            let str = `import React from "react";
import {${btn} as ScrollUpButton} from "react-scroll-up-button";

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <ScrollUpButton />
      </div>
    );
  }
}`
            if (btn === 'Custom') {
              str = `import React from "react";
import ScrollUpButton from "react-scroll-up-button";
import ./myCssFile.css;

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <ScrollUpButton ContainerClassName="AnyClassForContainer" TransitionClassName="AnyClassForTransition">
          <MyCustomReactComponent />
        </ScrollUpButton>
      </div>
    );
  }
}`
            }
            if (btn === 'default') {
              str = `import React from "react";
import ScrollUpButton from "react-scroll-up-button";

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <ScrollUpButton />
      </div>
    );
  }
}`
            }
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
