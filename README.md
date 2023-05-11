# tailwind-fluid

generate tailwindcss utility classes for fluid font sizes.

this plugin will generate a fluid [typescale ratio](https://typescale.com/) for you and lets you add
extra custom sizes if needed.

it is generally recommended to have a slightly lower ratio for smaller screens and a higher ratio
for larger screens.

## usage:

- use any of the `fluid-SIZE` utility classes to turn the fontsize into a fluid value (using
  clamp()).

```html
<p class="fluid-base">this text will scale from 16px to 18px (from 400px vw to 1240px vw)</p>
```

## config:

install the package and add it to you tailwind config under the plugin section with your desired
settings.

```js
// these are the default settings:
plugins: [
    require('tailwind-fluid')({
    scalingStart: 400, // (px) -> viewport width to start the scaling process
    scalingFinish: 1240, // (px) -> viewport width to rech final size

    // set the typescale ratio for the lower end and the final size.
    ratio: {
        from: 1.2, // -> this ratio will be applied at the start size
        to: 1.25, // -> this ratio will be applied at the final size
    },

    // set the base font size and line height. this will be used to generate the typescale sizes.
    base: {
        from: 16, // (px) -> base font size at the start size
        to: 18, // (px) -> base font size at the final size
        lineHeight: 1.6, // (unitless) -> base line height
    },

    // add the desired steps in the typescale. the key will be used in the class name.
    // if you need some smaller steps, you can also use float values for the step.
    // for example {sm: [-0.5, 1.6], xs: [-1, 1.6] ...}
    steps: {
        sm: [-1, 1.6], // format is the following - NAME: [STEP, LINEHEIGHT]
        h3: [1, 1.4],
        h2: [2, 1.3],
        h1: [3, 1.2],
    }
    // the following extra sizes are not part of the default config. add as many as you need.
    // extra sizes are not part of the typescale and just simple fluid sizes:
    extraSizes: {
        lead: { from: 16.5, to: 18, lineHeight: 1.7 },
        serif: { from: 17, to: 19, lineHeight: 1.6 },
      },
    ),
]
```

with these settings you would have the following utility classes generated:

- `.fluid-base`, `.fluid-sm`, `.fluid-h3`, `.fluid-h2`, `.fluid-h1`, `.fluid-lead`, `.fluid-serif`
