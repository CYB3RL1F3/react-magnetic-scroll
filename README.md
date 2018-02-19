
# react-magnetic-scroll

A magic pagination component to navigate with magnetic scroll navigation


## Using the component :
1. Install the component :

 ```yarn add react-magnetic-scroll```

2. Import the component that way :

 ```import MagneticScroll from 'react-magnetic-scroll';```

3. Call the component by injecting options :

  * define pages :

  ```
  const page1 = (
    <div id="page1"><p>page 1</p></div>
  );
  const page2 = (
    <div id="page2"><p>page 2</p></div>
  );
  const page3 = (
    <div id="page3"><p>page 3</p></div>
  );

  const pages = [page1, page2, page3];
  ```

  * display magnetic scroll :

  ```
    <MagneticScroll pages={pages} {...props} />
  ```

  * scroll to page :

    * add 'ref' property
    * call scrollTo with the n° of page as argument

  ```
    <MagneticScroll
      ref={magneticScroll => { this.magneticScroll = magneticScroll; }}
      pages={{pages}}
      {...props}
    />
  ```

  ```
    const gotoPage = (page = 2) =>
      this.magneticScroll.scrollTo(page);
  ```

### how it works

__MagneticScroll__ uses an array of components, views, etc... and display them in "pages" that have similar width & height. On *scroll*, *keydown* & *touchmove* events, the natural scroll is blocked and the magnetic container autoscroll to the next page.

Values are expressed in viewheights (vh) and viewwidths (vw).

You don't need to wrap your pages. Pages are auto-wrapped by a component *MagneticPage*

### properties :

__REQUIRED__ :

* **pages** PropTypes.arrayOf(PropTypes.Node)

__OPTIONAL__ :

* **pageHeight** *PropTypes.number* (default = 100)
* **pageWidth** *PropTypes.number* (default = 100)
* **onPageChangeStart** *PropTypes.func* (default = void)
* **onPageChangeEnd** *PropTypes.func* (default = void)
* **onScrollUp** *PropTypes.func* (default = void)
* **onScrollDown** *PropTypes.func* (default = void)
* **easing** *PropTypes.string* (default = linear),
* **duration** *PropTypes.number* (default = 500)
* **delay* *PropTypes.number* (default = 0)

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

## Example App
It's often the case that you want to test your components out with an example app before publishing.

Included in this setup is a setup to do just that.

### Getting Started
1. `cd example/app && yarn`
2.  Within the example/app directory, you will find a setup that you can use to test your app.  Import your components from `components` and use them within the App.js file.
3. Run `npm run start` and navigate to `http://localhost:3000 to see your app`
