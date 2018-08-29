var bus = require('../index.js')
var assert = require('assert')

describe('on', function () {
    it('get origin function from bus.list()', function () {
        var fn1 = function () {}
        bus.on('channel1', fn1)
        var fn2 = bus.list().channel1[0]
        assert.equal(fn1, fn2)
    })
    it('register same channel and function', function () {
        var channel = 'channel2'
        var fn = function () {}
        bus.on(channel, fn)
        bus.on(channel,fn)
        assert.equal(bus.list()[channel].length, 1)
    })
    it('get same function from diffrent channel', function () {
        var fn = function () {}
        bus.on('channel3', fn)
        bus.on('channel4', fn)
        var fn1 = bus.list().channel3[0]
        var fn2 = bus.list().channel4[0]
        assert.equal(fn1, fn2)
    })
})

describe('emit', function () {
    it('without params', function () {
        var ch = 'p0'
        var tar = ''
        var fn = () => {
            tar = 'p0'
        }
        bus.on(ch, fn)
        bus.emit(ch)
        assert.equal('p0', tar)
    })
    it('with 1 paramter', function () {
        var ch = 'p1'
        var tar = ''
        var fn = (msg) => {
            tar = msg
        }
        bus.on(ch, fn)
        bus.emit(ch, 'p1')
        assert.equal('p1', tar)
    })
    it('with lot of params', function () {
        var ch = 'p8'
        var tar = ''
        var fn = (a, b, c, d) => {
            tar = a + b + c + d
        }
        bus.on(ch, fn)
        bus.emit(ch, '1', '3', '1', '4')
        assert.equal('1314', tar)
    })
})
describe('remove', function () {
    var fn1 = () => {}
    var fn2 = () => {}
    var fn3 = () => {}
    var ch = 'remove'
    bus.on(ch, fn1)
    bus.on(ch, fn2)
    bus.on(ch, fn3)
    it('remove one(right)', function () {
        bus.remove(ch, fn1)
        assert.equal(2, bus.list()[ch].length)
    })
    it('remove one(wrong)', function () {
        bus.remove(ch, () => {})
        assert.equal(2, bus.list()[ch].length)
    })
    it('remove all', function () {
        bus.remove(ch)
        assert.equal(undefined, bus.list()[ch])
    })
})
describe('clear', function () {
    it('clear', function () {
        console.log('before:', Object.keys(bus.list()).length);
        bus.clear() 
        console.log('after:', Object.keys(bus.list()).length);
        assert.equal(Object.keys(bus.list()).length, 0)
    })
})