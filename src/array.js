'use strict';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement /*, fromIndex */) {
        if (this == null) {
            throw new TypeError("can't convert " + this + " to object");
        }
        var O = Object(this);

        var len = O.length >>> 0;

        if (len === 0) {
            return -1;
        }

        var n = (arguments.length > 1) ? ToInteger(arguments[1]) : 0;

        if (n >= len) {
            return -1;
        }

        var k;
        if (n >= 0) {
            k = n;
        }
        else {
            k = len - Math.abs(n);
            if (k < 0) {
                k = 0;
            }
        }

        while (k < len) {
            if (k in O) {
                if (searchElement === O[k]) {
                    return k;
                }
            }
            k++;
        }

        return -1;
    };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf = function(searchElement /*, fromIndex */) {
        if (this == null) {
            throw new TypeError("can't convert " + this + " to object");
        }
        var O = Object(this);

        var len = O.length >>> 0;

        if (len === 0) {
            return -1;
        }

        var n = (arguments.length > 1) ? ToInteger(arguments[1]) : (len - 1);

        var k = (n >= 0) ?
                    Math.min(n, len-1) :
                    (len - Math.abs(n));

        while (k >= 0) {
            if ((k in O) && (searchElement === O[k])) {
                return k;
            }
            k--;
        }

        return -1;
    };

}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
if (!Array.prototype.every) {
    Array.prototype.every = function(callbackfn /*, thisp */) {

        if (this == null) {
            throw new TypeError("can't convert " + this + " to object");
        }
        var O = Object(this);

        var len = O.length >>> 0;

        if (typeof callbackfn != "function") {
            throw new TypeError(callbackfn + " is not a function");
        }

        var T = arguments[1];

        var k = 0;

        while (k < len) {
            if ((k in O) && !callbackfn.call(T, O[k], k, O)) {
                return false;
            }
            k++;
        }

        return true;
    };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callbackfn /*, thisArg */) {

        if (this == null) {
            throw new TypeError("can't convert " + this + " to object");
        }
        var O = Object(this);

        var len = O.length >>> 0;

        if (typeof callbackfn != "function") {
            throw new TypeError(callbackfn + " is not a function");
        }

        var T = arguments[1];

        var k = 0;

        while (k < len) {
            if (k in O) {
                callbackfn.call(T, O[k], k, O);
            }
            k++;
        }

    };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
if (!Array.prototype.filter) {
    Array.prototype.filter = function(callbackfn /*, thisArg */) {

        if (this == null) {
            throw new TypeError("can't convert " + this + " to object");
        }
        var O = Object(this);

        var len = O.length >>> 0;

        if (typeof callbackfn != "function") {
            throw new TypeError(callbackfn + " is not a function");
        }

        var T = arguments[1];

        var A = new Array();

        var k = 0;

        var to = 0;

        while (k < len) {
            if (k in O) {
                if (callbackfn.call(T, kValue, k, O)) {
                    A[to++] = kValue;
                }
            }
            k++;
        }

        return A;
    };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
if (!Array.prototype.map) {
    Array.prototype.map = function(callbackfn /*, thisArg */) {

        if (this == null) {
            throw new TypeError("can't convert " + this + " to object");
        }
        var O = Object(this);

        var len = O.length >>> 0;

        if (typeof callbackfn != "function") {
            throw new TypeError(callbackfn + " is not a function");
        }

        var T = arguments[1];

        var A = new Array(len);

        var k = 0;

        while (k < len) {
            if (k in O) {
                A[k] = callbackfn.call(T, O[k], k, O);
            }
            k++;
        }

        return A;
    };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
if (!Array.prototype.some) {
    Array.prototype.some = function(callbackfn /*, thisArg */) {

        if (this == null) {
            throw new TypeError("can't convert " + this + " to object");
        }
        var O = Object(this);

        var len = O.length >>> 0;

        if (typeof callbackfn != "function") {
            throw new TypeError(callbackfn + " is not a function");
        }

        var T = arguments[1];

        var k = 0;

        while (k < len) {
            if ((k in O) && callbackfn.call(T, O[k], k, O)) {
                return true;
            }
            k++;
        }

        return false;
    };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function(callbackfn /*, initialValue */) {

        if (this == null) {
            throw new TypeError("can't convert " + this + " to object");
        }
        var O = Object(this);

        var len = O.length >>> 0;

        if (typeof callbackfn != "function") {
            throw new TypeError(callbackfn + " is not a function");
        }

        if (len === 0 && arguments.length < 2) {
            throw new TypeError('reduce of empty array with no initial value');
        }

        var k = 0;

        var accumulator;
        if (arguments.length > 1) {
            accumulator = arguments[1];
        }
        else {
            var kPresent = false;
            while ((!kPresent) && (k < len)) {
                kPresent = k in O;
                if (kPresent) {
                    accumulator = O[k];
                }
                k++;
            }
            if (!kPresent) {
                throw new TypeError('reduce of empty array with no initial value');
            }
        }

        while (k < len) {
            if (k in O) {
                accumulator = callbackfn.call(undefined, accumulator, O[k], k, O);
            }
            k++;
        }

        return accumulator;
    };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
if (!Array.prototype.reduceRight) {
    Array.prototype.reduceRight = function(callbackfn /*, initialValue */) {

        if (this == null) {
            throw new TypeError("can't convert " + this + " to object");
        }
        var O = Object(this);

        var len = O.length >>> 0;

        if (typeof callbackfn != "function") {
            throw new TypeError(callbackfn + " is not a function");
        }

        if (len === 0 && arguments.length < 2) {
            throw new TypeError('reduce of empty array with no initial value');
        }

        var k = len-1;

        var accumulator;
        if (arguments.length > 1) {
            accumulator = arguments[1];
        }
        else {
            var kPresent = false;
            while ((!kPresent) && (k >= 0)) {
                kPresent = k in O;
                if (kPresent) {
                    accumulator = O[k];
                }
                k--;
            }
            if (!kPresent) {
                throw new TypeError('reduce of empty array with no initial value');
            }
        }

        while (k >= 0) {
            if (k in O) {
                accumulator = callbackfn.call(undefined, accumulator, O[k], k, O);
            }
            k--;
        }

        return accumulator;
    };
}

// https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/from
if (!Array.from) {
    Array.from = (function () {
        var toStr = Object.prototype.toString;
        var isCallable = function (fn) {
            return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };

        var toInteger = function (value) {
            var number = Number(value);
            if (isNaN(number)) { return 0; }
            if (number === 0 || !isFinite(number)) { return number; }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}
