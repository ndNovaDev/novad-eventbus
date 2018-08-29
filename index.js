var listeners = {}
module.exports = {
    emit: (e, ...params) => {
        var arr = listeners[e]
        if (arr) {
            arr.forEach(cb => {
                cb(...params)
            });
        }
    },
    on: (e, cb) => {
        if (listeners[e]) {
            if (listeners[e].indexOf(cb) == -1) {
                listeners[e].push(cb)
            }
        } else {
            listeners[e] = [cb]
        }
    },
    remove: (e, cb) => {
        var arr = listeners[e]
        if (!cb) {
            delete listeners[e]
        }
        if (arr && arr.length) {
            var index = arr.indexOf(cb)
            if (index != -1) {
                arr.splice(index, 1)
            }
        }
    },
    list: () => {
        return listeners
    },
    clear: () => {
        for (const key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                delete listeners[key]
            }
        }
    }
}