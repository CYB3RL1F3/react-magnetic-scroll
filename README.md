
# react-magnetic-scroll

A magic pagination component to navigate with magnetic scroll navigation
current version : 1.3.0

## Breaking changes

### From v1.2 to v1.3 :

* Now import *MagneticScroll* using braces { }
* Default import still available but deprecated and soon unavailable.

## Using the component :
1. Install the component :

 ```yarn add react-magnetic-scroll```

2. Import the component that way :

 ```import { MagneticScroll, MagneticPage } from 'react-magnetic-scroll';```

3. Call the component by injecting options :

  * define pages : use the MagneticPage component

  ```
  const page1 = (
    <MagneticPage id="page1">
      <div id="panda">
        <p>page 1</p>
      </div>
    </MagneticPage>
  );
  const page2 = (
    <MagneticPage id="page2">
      <div id="flying_fish">
        <p>page 2</p>
      </div>
    </MagneticPage>
  );
  const page3 = (
    <MagneticPage id="page2">
      <div id="birthdaycake">
        <p>page 3</p>
      </div>
    </MagneticPage>
  );

  const pages = [page1, page2, page3];
  ```
  Please note *id* property is __required__

  * display magnetic scroll :

  ```
    <MagneticScroll pages={pages} {...props} />
  ```

  * scroll to page :

    * add 'ref' property
    * add 'withRef' property
    * call scrollTo with the n° of page as argument

  ```
    <MagneticScroll
      ref={magneticScroll => { this.magneticScroll = magneticScroll; }}
      withRef
      pages={{pages}}
      {...props}
    />
  ```

  ```
    const gotoPage = (page = 2) =>
      this.magneticScroll.scrollTo(page);
  ```

### how it works

__MagneticScroll__ uses an array of components, views, etc... and display them in "magnetic pages" that have similar width & height. On *scroll*, *keydown* & *touchmove* events, the natural scroll is blocked and the magnetic container autoscroll to the next page.

Values are expressed in viewheights (vh) and viewwidths (vw).

You need to wrap your pages with a component *MagneticPage* that requires an ID and can handle hooks before and after scroll.

### properties :

__REQUIRED__ :

* **pages** PropTypes.arrayOf(PropTypes.Node)

__OPTIONAL__ :

* **pageHeight** *PropTypes.number* (default = 100)
* **pageWidth** *PropTypes.number* (default = 100)
* **onPageChangeStart** *PropTypes.func* (default = void)
* **onPageChangeEnd** *PropTypes.func* (default = void)
* **onScrollUpStart** *PropTypes.func* (default = void)
* **onScrollUpEnd** *PropTypes.func* (default = void)
* **onScrollDownStart** *PropTypes.func* (default = void)
* **onScrollDownEnd** *PropTypes.func* (default = void)
* **easing** *PropTypes.string* (default = linear),
* **duration** *PropTypes.number* (default = 500)
* **delay** *PropTypes.number* (default = 0)
* **disabled** *PropTypes.bool (default = false)

__EASING__ :

Values available :

* *linear*
* *easeInOut*
* *easeInQuad*
* *easeOutQuad*
* *easeInOutQuad*
* *easeInCubic*
* *easeOutCubic*
* *easeInOutCubic*
* *easeInCirc*
* *easeOutCirc*
* *easeInOutCirc*
* *easeInQuint*
* *easeOutQuint*
* *easeInOutQuint*
* *easeInExpo*
* *easeOutExpo*
* *easeInOutExpo*

__MagneticPage properties__ :

* **ID** : *PropTypes.string.isRequired*
* **onScrollUpStart** : *PropTypes.func* (default: void)
* **onScrollUpEnd** : *PropTypes.func* (default: void)
* **onScrollDownStart** : *PropTypes.func* (default: void)
* **onScrollDownEnd** : *PropTypes.func* (default: void)

__When are hooks triggered ?__

* *start* : on scroll from the current page
* *end* : on arriving on the current page (from the previous one)

## Example App
It's often the case that you want to test your components out with an example app before publishing.

Included in this setup is a setup to do just that.

### Getting Started
1. `cd example/app && yarn`
2.  Within the example/app directory, you will find a setup that you can use to test your app.  Import your components from `components` and use them within the App.js file.
3. Run `npm run start` and navigate to `http://localhost:3000 to see your app`
