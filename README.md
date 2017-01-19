[![npm version](https://badge.fury.io/js/react-scroll-up-button.svg)](https://badge.fury.io/js/react-scroll-up-button)
[![npm](https://img.shields.io/npm/l/express.svg)]()
[![npm](https://img.shields.io/badge/Demo-Live-green.svg)](http://dirtyredz.com/Projects/ReactScrollUpButton)
[![Build Status](https://travis-ci.org/dirtyredz/react-scroll-up-button.svg?branch=master)](https://travis-ci.org/dirtyredz/react-scroll-up-button)
[![Coverage Status](https://coveralls.io/repos/github/dirtyredz/react-scroll-up-button/badge.svg?branch=master)](https://coveralls.io/github/dirtyredz/react-scroll-up-button?branch=master)

# react-scroll-up-button
React Component for a fixed scroll to top button.
The button can use the default button, or can be customized to look like any button you want.
The component contains all the code neccassary to scroll to the top of the page (Or desired position) Utilizing Easing effects.



I am also adding many different style buttons that you can copy and paste into this component to quickly acheive a style you can appreciate and fits your websites look and feel.


## Install

```npm
npm install react-scroll-up-button
```

----

## Usage

###Default Button:   ![default_button](https://cloud.githubusercontent.com/assets/7119499/21240547/5c47751a-c2d1-11e6-9df8-5be7bbdd53de.png)

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

----

###Custom Button:
```jsx
import React from "react";
import ScrollUpButton from "react-scroll-up-button";

export default class Index extends React.Component {
    render() {
        return (
            <div>
                <ScrollUpButton ContainerClassName="ScrollUpButton__Container" TransitionClassName="ScrollUpButton__Toggled">
                    // Here you can add any react component or jsx
                    //ScrollButton will apply the classnames given to the container of whatever you put here.
                </ScrollUpButton>
            </div>
        );
    }
}
```
----

###Configuration:
```javascript
    <ScrollUpButton
      StopPosition={0} 
      TransitionBtnPosition={150} 
      EasingType='easeOutCubic' 
      AnimationDuration={500} 
      ContainerClassName='ScrollUpButton__Container'
      TransitionClassName='ScrollUpButton__Toggled'
    />
```
StopPosition -- PageYOffset in which you want the page to stop at when scrolling up.

TransitionBtnPosition -- PageYOffset position at which the button will show up.

EasingType -- Easing option see : (https://www.npmjs.com/package/tween-functions) for available options.

AnimationDuration -- Milisecond duration of scrolling up.

ContainerClassName -- Class name applied to the container when NOT using the default view.

TransitionClassName -- Class name applied to the container to show the button when NOT using the default view.
    
    
    
    
###Themed Buttons:
Click on a button to see its code.

Vertical Button | Circle Arrow Button
:---: | :---:
[![vertical_button](https://cloud.githubusercontent.com/assets/7119499/21249476/ea4a02ce-c303-11e6-9448-6f2b078bc8d1.png)](#vertical-button)  | [![circle_arrow_button](https://cloud.githubusercontent.com/assets/7119499/21251624/cf86fabc-c314-11e6-8f70-f6ec440ca187.png)](#circle-arrow-button)


----


####Vertical Button:
![vertical_button](https://cloud.githubusercontent.com/assets/7119499/21249476/ea4a02ce-c303-11e6-9448-6f2b078bc8d1.png)

Vertical_Button | React:
```
    <ScrollUpButton ContainerClassName="ScrollUpButton__Container" TransitionClassName="ScrollUpButton__Toggled">
      <span class="BTN">UP &#8594;</span>
    </ScrollUpButton>
```
Vertical_Button | CSS:
```
    .BTN{
      font-size: 23px;
    }
    .ScrollUpButton__Container{
      background-color: rgb(58, 56, 56);
      position: fixed;
      padding: 5px 10px;
      bottom: 60px;
      -webkit-transition: all 0.5s ease-in-out;
      transition: all 0.5s ease-in-out;
      -webkit-transition-property: opacity, right;
      transition-property: opacity, right;
      cursor: pointer;
      opacity: 0;
      right: -75px;
      transform: rotate(-90deg);
    }
    .ScrollUpButton__Toggled{
      opacity: 1;
      right: 10px;
    }
```

----

####Circle Arrow Button:
![circle_arrow_button](https://cloud.githubusercontent.com/assets/7119499/21251624/cf86fabc-c314-11e6-8f70-f6ec440ca187.png)

Circle_Arrow_Button | React:
```
    <ScrollUpButton ContainerClassName="ScrollUpButton__Container" TransitionClassName="ScrollUpButton__Toggled">
      <svg viewBox="0 0 32 32" >
        <path class="path1" d="M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z"></path>
      </svg>
    </ScrollUpButton>
```
Circle_Arrow_Button | CSS:
```
    .ScrollUpButton__Container{
      background-color: rgb(255, 255, 255);
      border-radius: 50%;
      border: 5px solid black;
      height: 50px;
      position: fixed;
      bottom: 20px;
      width: 50px;
      -webkit-transition: all 0.5s ease-in-out;
      transition: all 0.5s ease-in-out;
      -webkit-transition-property: opacity, right;
      transition-property: opacity, right;
      cursor: pointer;
      opacity: 0;
      right: -75px;
    }

    .ScrollUpButton__Toggled{
      opacity: 1;
      right: 20px;
    }
```

###More To Come Soon!!

----

###Credit
I was inspired by: https://github.com/milosjanda/react-scroll-up
With the base recource of the repo i was able to create my own in my style with additional functionality.
