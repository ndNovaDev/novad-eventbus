# novad-eventbus
🚌

## installation
> npm install novad-eventbus

## usage
```javascript
import bus from 'novad-eventbus'
// register:
bus.on('channel', () => {})

// emit
bus.emit('channel')

// remove specified function
bus.remove('channel',fn)

// remove all functiono in specified channel
bus.remove('channel')

// review all registed events
bus.list() //{a:[fn1, fn2...], channel1: [fn1, fn2...],...}

// clear all events
bus.clear()
```
