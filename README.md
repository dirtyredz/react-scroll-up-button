[![npm version](https://badge.fury.io/js/react-scroll-up-button.svg)](https://badge.fury.io/js/react-scroll-up-button)
[![npm](https://img.shields.io/npm/l/express.svg)]()
[![npm](https://img.shields.io/badge/Demo-Live-green.svg)](http://dirtyredz.com/Projects/ReactScrollUpButton)

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
                <ScrollUpButton /> //Add this where ever you would like.
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
                <ScrollUpButton ContainerClassName="ScrollUpButton__Container" TransitionClassName: 'ScrollUpButton__Toggled'>
                    //Any JSX
                    //
                    //<span class="MyCustomButtonClass">UP</span>
                    //
                    //or
                    //
                    //<svg class="MyCustomButtonClass" viewBox="0 0 32 32" >
                    //  <path d="M19.196 23.429q0 0.232-0.179 0.411l-0.893 0.893q-0.179 0.179-0.411 0.179t-0.411-0.179l-7.018-7.018-7.018 7.018q-0.179 0.179-0.411 0.179t-0.411-0.179l-0.893-0.893q-0.179-0.179-0.179-0.411t0.179-0.411l8.321-8.321q0.179-0.179 0.411-0.179t0.411 0.179l8.321 8.321q0.179 0.179 0.179 0.411zM19.196 16.571q0 0.232-0.179 0.411l-0.893 0.893q-0.179 0.179-0.411 0.179t-0.411-0.179l-7.018-7.018-7.018 7.018q-0.179 0.179-0.411 0.179t-0.411-0.179l-0.893-0.893q-0.179-0.179-0.179-0.411t0.179-0.411l8.321-8.321q0.179-0.179 0.411-0.179t0.411 0.179l8.321 8.321q0.179 0.179 0.179 0.411z"></path>
                    //</svg>
                </ScrollUpButton>
            </div>
        );
    }
}
```
----

###Configuration:
```javascript
    {
        //Scroll position to stop at, 0 = top of page
        StopPosition: 0,
        //at what scroll position value to show the button
        TransitionBtnPosition: 150,
        //Easing option see : (https://www.npmjs.com/package/tween-functions) for available options
        EasingType: 'easeOutCubic',
        //MS duration of the scroll up event
        AnimationDuration: 500,
        //Class name applied to the container when NOT using the default view
        ContainerClassName: 'ScrollUpButton__Container',
        //Class name applied to the container to show the button when NOT using the default view
        TransitionClassName: 'ScrollUpButton__Toggled',
    }
```
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
    //Using css-modules
    <ScrollUpButton ContainerClassName={styles.ScrollUpButton__Container} TransitionClassName={styles.ScrollUpButton__Toggled}>
      <span class={styles.BTN}>UP &#8594;</span>
    </ScrollUpButton>
    //
    //or
    //No css loader/compiler
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
    //Using css-modules
    <ScrollUpButton ContainerClassName={styles.ScrollUpButton__Container} TransitionClassName={styles.ScrollUpButton__Toggled}>
      <span class={styles.BTN}>UP &#8594;</span>
    </ScrollUpButton>
    //
    //or
    //No css loader/compiler
    <ScrollUpButton ContainerClassName="ScrollUpButton__Container" TransitionClassName="ScrollUpButton__Toggled">
      <span class="BTN">UP &#8594;</span>
    </ScrollUpButton>
```
Circle_Arrow_Button | CSS:
```
    .BTN{
      padding-left: 1px;
    }
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
