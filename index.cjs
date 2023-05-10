// default config:
const defaultConfig = {
  scalingStart: 400, // px
  scalingFinish: 1240, // px

  ratio: {
    from: 1.2,
    to: 1.25,
  },

  base: {
    from: 16, // px
    to: 18, // px
    lineHeight: 1.6,
  },

  steps: {
    sm: [-1, 1.6],
    h3: [1, 1.4],
    h2: [2, 1.3],
    h1: [3, 1.2],
  },
}

module.exports = function (config = {}) {
  const { scalingStart, scalingFinish, base, ratio, steps, extraSizes } = {
    ...defaultConfig,
    ...config,
  }

  /********************************** helpers **********************************/
  const toRem = (value) => parseFloat((value / 16).toFixed(3))
  const vwRound = (value) => parseFloat(value.toFixed(2))

  const generateClampValue = (startValue, finishValue) => {
    const changeRate = (finishValue - startValue) / (scalingFinish - scalingStart)
    const relativeChange = 100 * changeRate
    const preferred = finishValue - scalingFinish * changeRate

    // prettier-ignore
    return `clamp(${toRem(startValue)}rem, ${toRem(preferred)}rem + ${vwRound(relativeChange)}vw, ${toRem(finishValue)}rem)`
  }

  /********************************** construct sizes from settings **********************************/
  // add base and extra sizes
  const sizes = { base, ...extraSizes }

  // generate and add the typescale sizes
  Object.entries(steps).forEach(([key, value]) => {
    const lineHeight = value[1] || base.lineHeight // use the base line height if none specified
    const scaleStep = value[0]

    const minSize = base.from * ratio.from ** scaleStep
    const maxSize = base.to * ratio.to ** scaleStep

    sizes[key] = { from: minSize, to: maxSize, lineHeight }
  })
  /********************************** generate the fluid utility classes **********************************/
  const utilities = {}

  Object.entries(sizes).forEach(([key, value]) => {
    utilities[`.fluid-${key}`] = {
      fontSize: generateClampValue(value.from, value.to),
      lineHeight: value.lineHeight,
    }
  })

  /********************************** add the classes to tailwind **********************************/
  const plugin = require('tailwindcss/plugin')
  return plugin(function ({ addUtilities }) {
    addUtilities(utilities)
  })
  /****************************************************************************************************/
}
