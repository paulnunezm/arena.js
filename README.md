# Arena.js
Arena.js is an easy to implement responsive slider library. 

### Setting up the slider in your HTML
- Grab the ```arena.css``` and ```arena.js``` files.
- Place the link reference to```arena.css``` in the before others stylesheets and the ```arena.js```
script before yours.
- Add the [JQuery](https://jquery.com/download/) and [GSAP TweenMax](https://greensock.com/gsap) dependencies
libraries before the ```arena.js```.
- Add ```<div id="arena"></div>``` to the container that will hold the slider.

- And you're good to go.

---
### Using the library
To use the library you just need to create a new Arena object with these options parameters:

```
var options = {
      imgPrefix:"mImage_",    // The image prefix if the image name are 'mImage_1, mImage_2,...'
      totalImages:4,
      imgFormat:'.png',
      imgPath:'images/',
  };
  
var arena = new Arena(options);

```

#####Other options that can be passed:

```
options = {
  transition: TRANSITION.FADE, // You can use the TRANSITION object to select between FADE or SLIDE transitions
  captions: {
    "Capition for slide 1",
    "",                       // An empty string leaves the slide without caption
    "Caption for slide 3"
  },
  debug: true;
}

```

### Styling
All these css selectors are available to customize the slider experience.

```
#arena_left_arrow, #arena_right_arrow {}
#arena_bullets {}
#arena_bullets li {}
#arena_bullets li:hover, #arena ul#arena_bullets li.active {}
.arena_caption{ } 
```