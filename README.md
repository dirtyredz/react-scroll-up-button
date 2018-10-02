[![npm version](https://badge.fury.io/js/react-scroll-up-button.svg)](https://badge.fury.io/js/react-scroll-up-button)
[![License](https://img.shields.io/npm/l/express.svg)]()
[![Demo](https://img.shields.io/badge/Demo-Live-green.svg)](https://react-scroll-up-button.com)
[![Build Status](https://travis-ci.org/dirtyredz/react-scroll-up-button.svg?branch=master)](https://travis-ci.org/dirtyredz/react-scroll-up-button)
[![Coverage Status](https://coveralls.io/repos/github/dirtyredz/react-scroll-up-button/badge.svg?branch=master)](https://coveralls.io/github/dirtyredz/react-scroll-up-button?branch=master)

# react-scroll-up-button
React Component for a fixed scroll to top button.
The button can use the default button, or can be customized to look like any button you want.
The component contains all the code neccassary to scroll to the top of the page (Or desired position) Utilizing Easing effects.



I am also adding many different style buttons that you can copy and paste into this component to quickly acheive a style you can appreciate and fits your websites look and feel.

## Demo

https://react-scroll-up-button.com


## Install

```npm
npm install react-scroll-up-button
```

----

## Usage

### Default Button:   ![default_button](https://user-images.githubusercontent.com/7119499/46116181-5e9c8e00-c1c0-11e8-97cc-b20e905f0e51.PNG)

```jsx
import React from "react";
import ScrollUpButton from "react-scroll-up-button"; //Add this line Here

export default class Index extends React.Component {
    render() {
        return (
            <div>
                <ScrollUpButton />
                //This is all you need to get the default view working
            </div>
        );
    }
}

```

Setting Custom Classes to the default button.
This will apply the class names you specify to the scroll-up-button.
```jsx
    <ScrollUpButton ContainerClassName="MyOverRideClass" TransitionClassName="MyOverRideTransitionedClass"/>
```

Setting inline styles to the default button.
This will apply the styles to the scroll-up-button.
```jsx
    <ScrollUpButton style={{width: 75}} ToggledStyle={{right: 100}}/>
```

----

### Custom Button:
```jsx
import React from "react";
import ScrollUpButton from "react-scroll-up-button";

export default class Index extends React.Component {
    render() {
        return (
            <div>
                <ScrollUpButton ContainerClassName="ScrollUpButton__Container" TransitionClassName="ScrollUpButton__Toggled">
                    // Here you can add any react component or jsx
                    // ScrollButton will apply the classnames given to the container of whatever you put here.
                    // Changing appearence this way will only work when importing the default ScrollUpButton, importing any of the specific buttons do not except children
                </ScrollUpButton>
            </div>
        );
    }
}
```
----

### Configuration:
```javascript
    <ScrollUpButton
      StopPosition={0}
      ShowAtPosition={150}
      EasingType='easeOutCubic'
      AnimationDuration={500}
      ContainerClassName='ScrollUpButton__Container'
      TransitionClassName='ScrollUpButton__Toggled'
      style={{}}
      ToggledStyle={{}}
    />
```
StopPosition -- PageYOffset in which you want the page to stop at when scrolling up.

ShowAtPosition -- PageYOffset position at which the button will show up.

EasingType -- Easing option see : (https://www.npmjs.com/package/tween-functions) for available options.

AnimationDuration -- Milisecond duration of scrolling up.

ContainerClassName -- Class name applied to the container when NOT using the default view.

TransitionClassName -- Class name applied to the container to show the button when NOT using the default view.

style -- style the container directly with inline styleing, can be used with any imported button.

ToggledStyle -- Style the toggled state of the container directly, can be used with any imported button.

----

### Themed Buttons:
Click on a button to see its code.

Vertical Button | Circle Arrow Button | Tiny Up Button
:---: | :---: | :---:
[![vertical_button](https://cloud.githubusercontent.com/assets/7119499/21249476/ea4a02ce-c303-11e6-9448-6f2b078bc8d1.png)](#vertical-button)  | [![circle_arrow_button](https://cloud.githubusercontent.com/assets/7119499/21251624/cf86fabc-c314-11e6-8f70-f6ec440ca187.png)](#circle-arrow-button) | [![tiny_up_button](https://user-images.githubusercontent.com/7119499/41563627-cb572f90-7315-11e8-8ae4-fae10b3642c3.PNG)](#tiny-up-button)


----


#### Vertical Button:
![vertical_button](https://cloud.githubusercontent.com/assets/7119499/21249476/ea4a02ce-c303-11e6-9448-6f2b078bc8d1.png)

Vertical_Button | React:
```
import React from "react";
import {VerticleButton as ScrollUpButton} from "react-scroll-up-button"; //Add this line Here

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <ScrollUpButton />
      </div>
    );
  }
}
```

----

#### Circle Arrow Button:
![circle_arrow_button](https://cloud.githubusercontent.com/assets/7119499/21251624/cf86fabc-c314-11e6-8f70-f6ec440ca187.png)

Circle_Arrow_Button | React:
```
import React from "react";
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button"; //Add this line Here

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <ScrollUpButton />
      </div>
    );
  }
}
```

#### Tiny Up Button:
![tiny_up_button](https://user-images.githubusercontent.com/7119499/41563627-cb572f90-7315-11e8-8ae4-fae10b3642c3.PNG)

Tiny_Up_Button | React:
```
import React from "react";
import {TinyButton as ScrollUpButton} from "react-scroll-up-button"; //Add this line Here

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <ScrollUpButton />
      </div>
    );
  }
}
```

### More To Come!!

----

### Credit
I was inspired by: https://github.com/milosjanda/react-scroll-up
With the base recource of the repo i was able to create my own in my style with additional functionality.
