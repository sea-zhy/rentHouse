var APF = {
    log: function(v) {
/*
*/
    }
};

APF.Namespace = {
    register: function(ns){
        var nsParts = ns.split(".");
        var root = window;
        for (var i = 0; i < nsParts.length; i++) {
            if (typeof root[nsParts[i]] == "undefined") {
                root[nsParts[i]] = new Object();
            }
            root = root[nsParts[i]];
        }
        return root;
    }
}

APF.Utils = {
    getWindowSize: function() {
        var myWidth = 0, myHeight = 0;
            if( typeof( window.innerWidth ) == 'number' ) {
            //Non-IE
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            //IE 4 compatible
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
        return {
            width: myWidth,
            height: myHeight
        };
    },

    getScroll: function() {
        var scrOfX = 0, scrOfY = 0;
        if( typeof( window.pageYOffset ) == 'number' ) {
            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }
        return {
            left: scrOfX,
            top: scrOfY
        };
    },

    // http://techpatterns.com/downloads/javascript_cookies.php
    setCookie: function(name, value, expires, path, domain, secure) {
        // set time, it's in milliseconds
        var today = new Date();
        today.setTime(today.getTime());
        /*
            if the expires variable is set, make the correct
            expires time, the current script below will set
            it for x number of days, to make it for hours,
            delete * 24, for minutes, delete * 60 * 24
        */
        if (expires) {
            expires = expires * 1000 * 60 * 60 * 24;
        }
        var expires_date = new Date(today.getTime() + (expires));

        document.cookie = name + "=" +escape(value) +
            ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "" ) +
            ((secure) ? ";secure" : "" );
    },

    // this fixes an issue with the old method, ambiguous values
    // with this test document.cookie.indexOf( name + "=" );
    getCookie: function(check_name) {
        // first we'll split this cookie up into name/value pairs
        // note: document.cookie only returns name=value, not the other components
        var a_all_cookies = document.cookie.split( ';' );
        var a_temp_cookie = '';
        var cookie_name = '';
        var cookie_value = '';
        var b_cookie_found = false; // set boolean t/f default f

        for (i = 0; i < a_all_cookies.length; i++) {
            // now we'll split apart each name=value pair
            a_temp_cookie = a_all_cookies[i].split( '=' );

            // and trim left/right whitespace while we're at it
            cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

            // if the extracted name matches passed check_name
            if (cookie_name == check_name) {
                b_cookie_found = true;
                // we need to handle case where cookie has no value but exists (no = sign, that is):
                if (a_temp_cookie.length > 1) {
                    cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
                }
                // note that in cases where cookie is initialized but no value, null is returned
                return cookie_value;
                break;
            }
            a_temp_cookie = null;
            cookie_name = '';
        }
        if (!b_cookie_found) {
            return null;
        }
    },

    // this deletes the cookie when called
    deleteCookie: function(name, path, domain) {
        if (this.getCookie(name)) {
            document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
        }
    },

    setScrollTop: function (n){
        if (document.body) {
            document.body.scrollTop = n;
            if(document.body.scrollTop == 0){
                if (document.documentElement) document.documentElement.scrollTop = n;
            }
        }else if (document.documentElement) {
            document.documentElement.scrollTop = n;
        }
    },

    getScrollTop: function (){
        return document.body ? document.body.scrollTop || document.documentElement.scrollTop : document.documentElement.scrollTop;
    },

    /*
    *
    * APF.Utils.gotoScrollTop(e, s); 这个函数可传两个参数
    * e 是滚动条滚动到什么地方(end)的缩写，如果不传默认是 0
    * s 是滚动条滚动的速度 ，参数值是默认滚动速度的倍数，比如想要加快滚动速度为默认2倍，输入2 ，如果想放慢速度
    *   到默认速度的一半，输入 0.5 。 如果不传默认是 1，就是默认速度。
    */
    gotoScrollTop: function (e, s){
        var t = APF.Utils.getScrollTop(), n = 0, c = 0;
        var s = s || 1;
        var e = e || 0;
        var i = t > e ? 1 : 0;
        (function() {
            t = APF.Utils.getScrollTop();
            n = i ? t - e : e - t;
            c = i ? t - n / 15 * s : t + 1 + n / 15 * s ;
            APF.Utils.setScrollTop( c );
            if (n <= 0 || t == APF.Utils.getScrollTop()) return;
            setTimeout(arguments.callee, 10);
        })();
    }
};
/*
    json2.js
    2015-05-03
    Public Domain.
    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
    See http://www.JSON.org/js.html
    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html
    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
    This file creates a global JSON object containing two methods: stringify
    and parse. This file is provides the ES5 JSON capability to ES3 systems.
    If a project might run on IE8 or earlier, then this file should be included.
    This file does nothing on ES5 systems.
        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.
            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.
            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.
            This method produces a JSON text from a JavaScript value.
            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value
            For example, this would serialize Dates as ISO strings.
                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 
                            ? '0' + n 
                            : n;
                    }
                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };
            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.
            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.
            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.
            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.
            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.
            Example:
            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'
            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'
            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date 
                    ? 'Date(' + this[key] + ')' 
                    : value;
            });
            // text is '["Date(---current time---)"]'
        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.
            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.
            Example:
            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.
            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });
            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });
    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint 
    eval, for, this 
*/

/*property
    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';
    
    var rx_one = /^[\],:{}\s]*$/,
        rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rx_four = /(?:^|:|,)(?:\s*\[)+/g,
        rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 
            ? '0' + n 
            : n;
    }
    
    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + '-' +
                        f(this.getUTCMonth() + 1) + '-' +
                        f(this.getUTCDate()) + 'T' +
                        f(this.getUTCHours()) + ':' +
                        f(this.getUTCMinutes()) + ':' +
                        f(this.getUTCSeconds()) + 'Z'
                : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap,
        indent,
        meta,
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string) 
            ? '"' + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string'
                    ? c
                    : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' 
            : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) 
                ? String(value) 
                : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                        : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap 
                                    ? ': ' 
                                    : ':'
                            ) + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap 
                                    ? ': ' 
                                    : ':'
                            ) + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                    : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return '\\u' +
                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (
                rx_one.test(
                    text
                        .replace(rx_two, '@')
                        .replace(rx_three, ']')
                        .replace(rx_four, '')
                )
            ) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());APF.Namespace.register('ajk');
(function($){
    /**
     * [inherit 方法：使得子构造函数继承父构造函数]
     * @param  {[fn]} [构造函数，最后一个参数为子构造函数，之前均为父构造函数，支持多父类继承]
     * @return {[fn]}             [经过继承之后的新构造函数]
     */
    ajk.inherit = function(){
        var splice = Array.prototype.splice,
            args = arguments;
        var childClass = args[ args.length -1 ];
        splice.apply(args,[-1,1]);

        var newConstructor = function(){
            for( var i=0; i<args.length; i++ ){
                if( args[i] ){
                    args[i].apply(this,arguments);
                }
            }
            childClass.apply(this,arguments);
        }
        for( var i=0; i<args.length; i++ ){
            if( args[i] ){
                $.extend( newConstructor.prototype, args[i].prototype);
            }
        }

        $.extend( newConstructor.prototype, childClass.prototype );
        return newConstructor
    }

    /**
     * [Observer 简单的事件观察的构造函数,每个注册的事件命名空间都是一个只增不减的数组]
     * @return {[对象]}             [包含事件触发、绑定、解除绑定的方法]
     */
    ajk.Observer = function(){
        this.ob = {};
    }

    /**
     * [on 按照事件类型挂载回调函数]
     * @param  {[type]}   eventNames [事件名称，可以多事件以空格分隔]
     * @param  {Function} callback   [回调函数]
     * @return {[type]}              [如果是单一事件则返回当前回调所在事件空间的 key 值，如果是多事件则是一个对象，事件名与key相对应 ]
     */
    ajk.Observer.prototype.on = function(eventNames,callback) {
        var _events = eventNames.split(' ');
        var _eventKeys = {};
        for( var i = 0; i < _events.length; i++ ){
            if( !this.ob[_events[i]] ){
                this.ob[_events[i]] = [];
            }
            var _key = this.ob[_events[i]].push(callback);
            _eventKeys[ _events[i] ] = _key - 1; // push 返回数组长度，key是 现有长度减一。
        }
        return _eventKeys;
    }

    /**
     * [off 解除绑回调函数]
     * @param  {[string]} eventName [事件名]
     * @param  {[array]} keys      [指定回调的 key 组成的数组，key会在绑定函数的时候（on方法）返回]
     * @return {[type]}           [description]
     */
    ajk.Observer.prototype.off = function(eventName,keys){
        if( keys !== undefined && !$.isArray(keys) ){
            keys = [keys]
        }
        for (var i = 0; i < this.ob[eventName].length; i++) {
            if( keys === undefined || $.inArray(i,keys) > -1 ){
                this.ob[eventName][i] = undefined;
            }
        }
    }

    /**
     * [trigger 事件触发]
     * @param  {[type]} eventName [事件名]
     * @param  {[type]} args      [希望传递给回调函数的 数组或arguments对象]
     * @return {[type]}           [description]
     */
    ajk.Observer.prototype.trigger = function(eventName,args){
        var r;
        if( !this.ob[eventName] ){
            return r;
        }
        var _arg = args||[];
        for( var i = 0; this.ob[eventName] && i < this.ob[eventName].length; i++ ){
            if( !this.ob[eventName][i] ){
                continue;
            }
            var _r = this.ob[eventName][i].apply(this, _arg);
            r = (r === false)? r:_r;
        }
        return r
    }

    /**
     * [once 只执行一次行为的绑定方法，事件执行后立即解除绑定]
     * @param  {[string]}   eventName [事件名]
     * @param  {Function} callback  [回调函数]
     * @return {[type]}             [description]
     */
    ajk.Observer.prototype.once = function(eventName,callback){
        var self = this;
        var key = self.on(eventName,function(){
            callback.apply(this,arguments);
            self.off(eventName,key[eventName]);
        });
    };

})(jQuery);

APF.Namespace.register('ajk');
(function(){
    var logger;
    var siteName = (function(){
        var hostData = document.location.host.match(/^(\w+)\.(\w+)\./);
        if( hostData ){
            return 'pc'
        }else{
            return 'unknown'
        }
    })();

    var rAf = function(callback) {
        window.setTimeout(callback, 1000 / 10);
    };

    ajk.Logger = logger = {
        sojSite:'',
        sojPage:'',
        sojPageName:'',
        errorSite:siteName
    };

    logger.setSite = function(site){
        this.sojSite = site||'';
    }
    logger.setPage = function(page){
        this.sojPage = page||'';
    }
    logger.setPageName = function(pagename){
        this.sojPageName = pagename||'';
    }
    logger.setCtid = function(ctid){
        this.ctid = ctid||'';
    }

    logger.config = {
        devLogURL: '//s.anjuke.test/ts.html?',
        logURL: '//m.anjuke.com/ts.html?',
        devSojURL: '//s.anjuke.test/stb',
        isDev: /dev|test/.test(document.domain),
        blackList: ['Player', 'baiduboxapphomepagetag', 'onTouchMoveInPage']
    };

    logger.isblack = function(str) {
        var self = this;
        var i,
            reg,
            length,
            blackList = self.config.blackList;
        if (typeof str !== 'string') { // 对于非字符串默认黑名单
            return true;
        }
        for (i = 0, length = blackList.length; i < length; i++) {
            reg = new RegExp(blackList[i], 'g');
            if (reg.test(str)) {
                return true;
            }
        };
    }

    logger.sendError = function(params) {
        var self = this;
        var errorinfo = 'tp=error&site='+self.errorSite+'&msg=',
            key,
            url,
            arr = [],
            image,
            msg;
        if (typeof params === 'string') {
            msg = params;
        }
        if (typeof params === 'object') {
            for (key in params) {
                if (params.hasOwnProperty(key)) {
                    arr.push(key + ':' + encodeURIComponent(JSON.stringify(params[key])));
                }
            }
            msg = arr.join(',');
        }
        if (self.isblack(msg)) {
            return false;
        }
        image = new Image();
        if (self.config.isDev) {
            url = self.config.devLogURL + errorinfo + msg;
        } else {
            url = self.config.logURL + errorinfo + msg;
        }
        image.src = url;
        return true;
    }

    var getScreen = function() {
        var sinfo = {};
        sinfo.w = $(window).width().toString();
        sinfo.h = $(window).height().toString();
        sinfo.r = (window.devicePixelRatio&&window.devicePixelRatio >= 2 ? 1 : 0).toString();
        getScreen = function() {
            return sinfo;
        };
        return sinfo;
    };

    logger.sendSoj = function(op) {
        var self = this;
        var _site = op.site || self.sojSite,
            soj = new SiteTracker(),
            t_params;
        if (op.customparam) {
            soj.setCustomParam(op.customparam);
        }
        if (self.config.isDev) {
            t_params = {
                'target_url': self.config.devSojURL
            }
        }
        var _page = op.page || self.sojPage, _ctid = self.ctid;
        var  _pageName = op.pageName || self.sojPageName || _page;
        soj.setPage(_page);
        soj.setPageName(_pageName);
        soj.setSite(_site);
        soj.setScreen(getScreen());
        soj.setNCtid(_ctid);
        soj.setReferer(op.r||document.referrer);
        if( op.NGuid ){
            soj.setNGuid( op.NGuid );
        }
        if( op.NUid ){
            soj.setNUid( op.NUid );
        }
        if(op.h){
            if(!t_params) t_params = {};
            t_params.h = op.h;
        }
        soj.track(t_params);
        // 58 统计
        try{
            if(!/npv/.test(_site)){
                var trackUrl = soj.getParams();
                delete trackUrl.cp;
                delete trackUrl.sc;
                window._trackURL = JSON.stringify(trackUrl);
                loadTrackjs()
            }
        }catch(e){

        }
        function loadTrackjs(){
             var s = document.createElement('script');
             s.type = 'text/javascript';
             s.async = true;
             s.src = '//tracklog.58.com/referrer_anjuke_pc.js?_=' + Math.random();
             var b = document.body;
             s.onload = function () {
                soj.setSite(_site+'-npv');
                soj.setPage(_page+"_tracklog");
                soj.setPageName(_pageName+"_tracklog");
                soj.track(t_params);
             }
             s.onerror = function () {
                soj.setSite(_site+'-npv');
                soj.setPage(_page+"_tracklog_error");
                soj.setPageName(_pageName+"_tracklog_error");
                soj.track(t_params);
             }
             b.appendChild(s);
        }

    }

    logger.track = function(p, cp, pn) {
        if (!pn) {
            pn = p;
        }
        if ($.isPlainObject(cp)) {
            cp = JSON.stringify(cp);
        }
        logger.sendSoj({
            site: 'anjuke-npv',
            page: p,
            pageName: pn,
            customparam: cp || ''
        });
    };

    logger.addLinkSoj = function(selector, attr, param) {
        $('body').on('click', selector, function(e) {

            var soj = $(this).data(attr || 'soj') || $(this).attr(attr || '_soj'), // 默认使用data，如果取不到，使用attr
                _soj = $.trim(soj), // 去空格
                href = $.trim($(this).attr('href')),
                _param = param || 'from', // 默认是from
                _target = $(this).attr('target'),//兼容各种target
                _hasTarget = _target !== undefined ,
                _href;

            if(!_soj){//如果没获取到soj直接退出让它自己执行自己的href
                return;
            }

            if (!href) { // 此处链接不做合法性检查
                return;
            }
            if (href.toLowerCase().indexOf('javascript') === 0) {
                return;
            }
            //if (!_soj) { // 如果无soj,直接跳转
            //    location.href = href;
            //    return ;
            //}
            e.preventDefault();
            e.stopPropagation();
            // 现在代码写的不规范，data-soj和_soj事件都有，火狐下会执行两次，后面已data-soj为准
            e.stopImmediatePropagation()
            href = href.replace(/(&from=(.)*$)|(\?from=(.)*$)/,''); //移除原本url中的from
            _href = (href.indexOf('?') !== -1)? href+'&'+_param+'='+_soj : href+'?'+_param+'='+_soj; //拼接url
            if(_hasTarget){  //是否含有target
               if(!/*@cc_on!@*/0){  //若非ie
                    var winoper = window.open(_href,_target);
                    winoper && winoper.focus();
               }else{
                    var _el = document.createElement('a');
                    _el.href = _href;
                    _el.target = _target;
                    $(_el).appendTo('body').get(0).click();
                    $(_el).remove();
               }
            }else{
               location.href = _href;
            }

        });
    }

    logger.Exposure = function(op) {
        var defaults = {
            site:'',
            trackTag: 'data-trace',
            delay: 50,
            page:'',
            pageName: '',
            NUid:'',
            NGuid:'',
            prefix: ''
        };
        this.ops = $.extend(defaults, op);
        this.domCache = []; // 保存内容
        this.pageViewHeight = $(window).height(); // 页面可视区域高度
        this.timer = null;
        this.dataCache = [];
        this.expStatus = false;
        this.init();
    };
    logger.Exposure.prototype = {
        constructor: logger.Exposure,
        add: function(list) {
            var _this = this;
            this.expStatus = true;
            list.each(function(index, el) {
                _this.domCache.push($(el));
            });
        },
        init: function() {
            var wd = $(window), self = this;
            wd.resize($.proxy(this.resize, this)); // resize
            wd.on('beforeunload', $.proxy(this.beforeunload, this));
            rAf(scroll);
            function scroll(){
                rAf(scroll);
                if (!self.expStatus) {
                    return;
                }
                clearTimeout(self.timer);
                if (self.domCache.length === 0) {
                    self.expStatus = false;
                    self.buildData();
                    return;
                }
                self.timer = setTimeout(function(){
                    $.proxy(self.addData, self)();
                }, self.ops.delay);
            }
        },
        resize: function() {
            this.pageViewHeight = $(window).height();
        },
        beforeunload: function() {
            this.buildData();
        },
        scroll: function() {
        },
        sendExp: function(result) {
            logger.sendSoj({
                'NGuid':this.ops.NGuid,
                'NUid':this.ops.NUid,
                'site':this.ops.site,
                'page':this.ops.prefix + this.ops.page,
                'pageName':this.ops.prefix + this.ops.pageName,
                'customparam':result
            });
        },
        addData: function() {
            var pageViewHeight = this.pageViewHeight,
                topY = $(window).scrollTop(),
                botY = topY + pageViewHeight,
                _this = this;
            if (this.domCache.length === 0) {
                return;
            }
            $.each(this.domCache, function(index, val) {
                var _topY,
                    attr;
                if (!val) {
                    return;
                }
                _topY = val.offset ? val.offset().top : 0;
                if (_topY > topY && _topY < botY) {
                    attr = val.attr(_this.ops.trackTag);
                    if (attr) {
                        _this.dataCache.push(attr);
                    }
                    delete _this.domCache[index];
                }
            });
            this.buildData();
        },
        buildData: function() {
            var _this = this,
                result = {},
                r = [],
                exp,
                key,
                length,
                i;
            /**
             * "{aa:'123'}"
             * 这种格式的数据JSON.parse解析不了，必须用eval才能转成json
             */
            if (this.dataCache.length === 0) { // 如果没有数据就不发送
                return;
            }
            exp = eval('([' + this.dataCache.join(',') + '])');
            this.dataCache = []; // 清除要发送的数据
            for (i = 0, length = exp.length; i < length; i++) {
                for (key in exp[i]) {
                    if (!result[key]) {
                        result[key] = [];
                    }
                    result[key].push(exp[i][key]);
                }
            }
            for (key in result) { // 不考虑兼容pc 此循环可以用JSON.stringify替换
                r.push('"' + key + '"' + ':[' + result[key].join(',') + ']');
            }
            this.sendExp('{"exposure":{' + r.join(',') + '}}');
            $.each(this.domCache, function(index, val) {
                if (!val) {
                    _this.domCache.splice(index, 1); // 删除已统计过的dom
                }
            });
        }
    };

    // 初始化 jserror
    window.onerror = function(msg, url, line) {
        logger.sendError({
            message: msg,
            url: url,
            line: line
        });
    }

    // 初始化 from
    $(function(){
        logger.addLinkSoj('a[_soj]');
        if(window.top !== window) {
            $('#trunk').hide();
        }
    });
})();;
APF.Namespace.register('ajk');
(function(){
    var DropDown;
    ajk.DropDown = DropDown = ajk.inherit(ajk.Observer,function(target,list,op){
        var self = this;
        self._op = $.extend({},{
            timer:500
        },op||{})

        self._target = target;
        self._list = list;
        self._timer;
        self.isOpen = false;
        self._bindEvent();
    });

    DropDown.prototype._bindEvent = function() {
        var self = this;

        var delayClose = function(){
            self._timer = setTimeout(function(){
                self.close();
            },self._op.timer);
        }

        self._target.on('mouseenter',function(){
            if( !self.isOpen ){
                self.open();
            }
        });

        self._target.on('mouseleave',function(){
            if( self.isOpen ){
                delayClose();
            }
        });

        self._list.on('mouseenter',function(){
            clearTimeout(self._timer);
        });

        self._list.on('mouseleave',function(){
            if( self.isOpen ){
                delayClose();
            }
        });

        self._list.on('click',function(){
            self.close();
        });
    };

    DropDown.prototype.open = function() {
        var self = this;
        if( self.trigger('open',arguments) !== false ){
            self.isOpen = true;
            self._list.show();
        }
    };

    DropDown.prototype.close = function() {
        var self = this;
        if( self.trigger('close',arguments) !== false ){
            self.isOpen = false;
            self._list.hide();
        }
    };
})();  /**
   * [DataCache 缓存数据对象 依赖 http://underscorejs.org/#isEqual ]
   * @param {[function]} source [数据来源，对于相同请求，只从来源请求获取一次]
   */
APF.Namespace.register('ajk');
(function($){
  ajk.DataCache = function(source){
      var self = this;
      self._cache = [];
      self.source = source;
  }

  ajk.DataCache.prototype.get = function(keys,callback) {
      var self = this,
          cacheDatas = [],
          newQuery = [],
          query = _.isArray(keys)?keys:[keys];

      /**
       * [doHandle 单个请求返回单一数据，多个请求(数组)，结果页返回数组]
       */
      var doHandle = function(rep,req){
          if( !_.isArray(keys) ){
              callback( rep[0], req[0] );
          }else{
              callback(rep,req);
          }
      }

      for( var i = 0; i < query.length; i++ ){
          var _cache = self.find(query[i]);
          if( _cache !== null ){
              cacheDatas[i] = _cache;
          }else{
              newQuery.push({
                  id:i,
                  query:query[i]
              });
          }
      }

      if( newQuery.length === 0 ){
          doHandle( cacheDatas, query );
          return
      }

      for( var j = 0,backed = 0; j < newQuery.length; j++ ){
          (function(){
              var _thisQuery = newQuery[j];
              self.source( _thisQuery.query ,function(data){
                  var da = self.add( _thisQuery.query ,data).data;
                  cacheDatas[ _thisQuery.id ] = da;
                  backed ++;
                  if( backed === newQuery.length ){
                      doHandle( cacheDatas, query );
                  }
              });
          })();
      }

  };

  ajk.DataCache.prototype.add = function(key,data){
      var self = this,
          newData = {
              key:key,
              data:data
          };
      self._cache.push(newData);
      return newData
  };

  ajk.DataCache.prototype.find = function(key) {
      var self = this,
          result = null,
          i = 0,
          len = self._cache.length;
      for( ; i < len ; i ++ ){
          if( _.isEqual( self._cache[i].key, key) ){
              result = self._cache[i].data;
              break;
          }
      }
      return result
  };
})(jQuery);//  本模块依赖于 jquery & underscore, ajk.DataCache
//  示例如下:
//  var auto = 
//      new ajk.Autocomplete($('#search-rent'),{
    //     hasCache : true,                         //是否有数据源缓存，相同的keyword不会重复请求。、、
    //     debouce  : 250 ,                         //反弹时间，在时间内的连续输入不会触发获取数据，直至时间内没有输入。
    //     insertDom:$('#search-rent').parent(),    //wrap appendTo的元素
    //     template : _.template($('#search-tpl').html()), //列表渲染模板
    //     itemSelector: 'li',                      //每条目的选择器
    //     keySelector : 'span',                    //关键字的选择器
    //     cursorClass : 'auto-grayback',           //hover条目时的class
    //     wrap        : '.auto-wrap',              //wrap 支持className（需加.）,jquery对象，或者html字符串
    //     emptyFetch  : false                      //value为空时是否请求
    //     dataSource: function(keyword,setData){  //数据源函数，也支持数组形式，keyword返回当前input的key，setData用以传入数据
    //         $.ajax({
    //             url: op.url,
    //             type: 'GET',
    //             dataType: 'jsonp',
    //             data: { kw: keyword  }
    //         }).done(function(data) {
    //             setData(data.list);
    //         });
    //     }
    // });
    // 可绑事件：
    // inputed  输入时触发，会返回当前keyword
    // selected 当条目被选择时触发，返回当前条目的jquery对象，原始数据和index
    // cursored 当条目被hover时触发，返回当前条目的jquery对象，原始数据和index
    // onfocus, onblur 当input被 focus, blur时触发
    // 方法：
    // show()   hide() 显示/隐藏 wrap
    // resetCursored() 重置cursor状态
    // cursor(optNum, isCal) cursor指定的index，若存在isCal且为true, 则cursor结果为当前cursor + optNum 
    //                       如 cursor(-1, true) 向前cursor一位  cursor(0) cursor第一个item
    // select($item)  以传入的$item触发selected
    // input(keyword) 以传入的keyword触发inputed

APF.Namespace.register('ajk');
(function($){
    ajk.Autocomplete = ajk.inherit(ajk.Observer,function(el,op){
        var _tpl = 
        '<ul class="auto-ul">'+
            '<% _.each(obj,function(item){ %>'+
                '<li>'+
                    '<span><%= item.keyword %></span><b>约<%= item.num %>套</b>'+
                '</li>'+
            '<%});%>'+
        '<ul>',
        _defaults = {
            dataSource     : function(){},
            debounce       : 250, 
            hasCache       : true, 
            insertDom      : $('body'), 
            template       : _.template( _tpl ), 
            itemSelector   : 'li',  
            keySelector    : 'span', 
            cursorClass    : 'auto-grayback', 
            wrap           : '.auto-wrap',
            emptyFetch     : false
        };
        this.op =$.extend({}, _defaults , op);
        this.op.wrapStyle = $.extend({}, _defaults.wrapStyle, op.wrapStyle);
        this.el = el;
        this._init();
    });

    ajk.Autocomplete.prototype._init = function(){
        this.wrap = null;
        this.sourceChecked = null;
        this.dataCenter = [];
        this.keyword = null;
        this._createWrap();
        this.resetCursored();
        this._checkSource();
        this._delay = false;
        if(this.op.hasCache){
            this.dataCache = new ajk.DataCache( this.sourceChecked );
        }
        this._bindEvent();
    }

    ajk.Autocomplete.prototype._createWrap = function(){
        if( this.op.wrap.constructor == jQuery){
            this.wrap = this.op.wrap.eq(0);
        }
        else if ( _.isString(this.op.wrap) ){
            var str = $.trim( this.op.wrap );
            var firstChar = str.substring(0,1);
            if( firstChar == '.'){
                this.wrap = $('<div class="'+ str.slice(1) + '"></div>');
            }
            else if( firstChar == '<'){
                this.wrap = $(str);
            }
            this.wrap.appendTo( this.op.insertDom );
        }
    }

    ajk.Autocomplete.prototype._bindEvent = function(){
        this._onKeyup();
        this._onMouseover();
        this._onClick();
        this._onFocus();
        this._onBlur();
        this._isEnterWrap();
        this._onMousedown();
    }

    ajk.Autocomplete.prototype._onKeyup = function(){
        var self = this;
        self.el.on('keyup',function(e){
            self._updateKeyword();
            switch(e.keyCode){
                case 35: // end
                case 36: // home
                case 16: // shift
                case 17: // ctrl
                case 18: // alt
                case 37: // left
                case 39: // right
                    break;
                case 40: //down
                    self.cursor(+1, true);
                    break;
                case 38: //up
                    self.cursor(-1, true);
                    break;
                case 13: //enter
                    if(self.cursorIndex != -1){
                        self.select(self.wrap.find(self.op.itemSelector).eq(self.cursorIndex));
                    }
                    break;
                default:
                    self._inputCheck(self.keyword);                  
                    break;
            }
        });
    }
    /*此处作用是鼠标不在下拉列表中的时候关闭延迟*/
    ajk.Autocomplete.prototype._isEnterWrap = function(){
        var self = this;
        self.wrap.on('mouseover',function(){
            self._delay = true;
        });
        self.wrap.on('mouseout',function(){
            self._delay = false;
        });

    }

    ajk.Autocomplete.prototype._onMouseover = function(){
        var self = this;
        self.wrap.on('mouseover',self.op.itemSelector,function(){
            self.cursorIndex = _index = $(this).index();
            self.cursor(_index);
        });
    }

    ajk.Autocomplete.prototype._onClick = function(){
        var self = this;
        self.wrap.on('click',self.op.itemSelector,function(){
            self.select($(this));
        });
    }
    ajk.Autocomplete.prototype._onFocus = function(){
        var self = this;
        self.el.on('focus',function(){
            self._updateKeyword();
            self._inputCheck(self.keyword);
            if(self.trigger('onfocus',arguments) !== false){
                self.el.css('border-color','#f60');
            }
        });
    }
    ajk.Autocomplete.prototype._onMousedown = function(){
        var self = this;
        self.wrap.on('mousedown', function(e){
            e.preventDefault();
            self.cancelBlur = true;
            //若非滚动条
            if( self.wrap.find(e.target).length > 0 ){
                delete self.cancelBlur;
            } 
        })
    }
    ajk.Autocomplete.prototype._onBlur = function(){
        var self = this;
        self.el.on('blur',function(){
            if(self.cancelBlur){
                delete self.cancelBlur;
                return;
            }
            if(self.trigger('onblur',arguments) !== false){
                self.el.css('border-color','#ccc');
                if(self._delay){
                    setTimeout(function(){
                        self.hide();
                    },150); 
                } else {
                    self.hide();
                }

            }
        });
    }
    ajk.Autocomplete.prototype._updateKeyword = function(keyword){ //更新keyword
        this.keyword = keyword || this.el.val();
    }

    ajk.Autocomplete.prototype._inputCheck = function(val){ //检查是否需要触发输入事件
        if( $.trim(val) === ''){
            this.trigger('empty');
            if( this.op.emptyFetch ) this.input(val);
        }
        else{
            this.input(val);
        }
    }

    ajk.Autocomplete.prototype._checkSource = function(){ //检查数据源，若为函数，增加debounce；也可以为数组
        var self = this;
        if($.isFunction(self.op.dataSource)){
            self.sourceChecked = _.debounce(self.op.dataSource, self.op.debounce);
        }else if($.isArray(self.op.dataSource)){
            self.sourceChecked = self.op.dataSource;
        }
     }

    ajk.Autocomplete.prototype._updateData = function(){ //获取数据，可以为异步函数，也可以为数组
        var self = this;
        if($.isFunction(self.sourceChecked)){ //若为异步函数
            if(self.op.hasCache) self.dataCache.get(self.keyword, _setData);
            else self.sourceChecked(self.keyword, _setData);
        }
        else if($.isArray(self.sourceChecked)){ //若为数组
            self.dataCenter = self.sourceChecked;
            self._render();
        }
        function _setData(data){
            self.dataCenter = data;
            self._render();
        }
    }

    ajk.Autocomplete.prototype._render = function(){   
        this.wrap.html(this.op.template(this.dataCenter));
        this.resetCursored();
        if(this.wrap.find(this.op.itemSelector).length > 0){
            this.show();
        }else{
            this.hide();
        }
    }

    ajk.Autocomplete.prototype.show = function(){
        this.wrap.show();
    }

    ajk.Autocomplete.prototype.hide = function(){
        this.wrap.hide();
    }

    ajk.Autocomplete.prototype.resetCursored = function(){ 
        this.cursorIndex = -1;
        this.wrap.find(this.op.itemSelector).removeClass(this.op.cursorClass);
    }
    
    ajk.Autocomplete.prototype.cursor = function(optNum ,isCal){ 
        var self    = this, _index, $item,itemObj = {},
            _isCal  = arguments[1] === undefined? false: arguments[1],
            _items  = self.wrap.find(self.op.itemSelector);
        if( !_isCal ){
            _index  = optNum;
        }
        else{
            _index  = self.cursorIndex + optNum;
            if(_index  > _items.length - 1){ _index = 0; }
            else if(_index < 0){ _index = _items.length - 1; }
        }
        $item   = _items.eq(_index);
        itemObj = {
            index : _index,
            item  : $item,
            data  : self.dataCenter[_index]
        };
        self.cursorIndex = _index;
        if( self.trigger('cursored',[itemObj]) !== false){
            _items.removeClass(self.op.cursorClass);
            $item.addClass(self.op.cursorClass);
        }

    }
    ajk.Autocomplete.prototype.select = function($item){ 
        var self    = this,
            _index  = $item.index(),
            itemObj = {
                index : _index,
                item  : $item,
                data  : self.dataCenter[_index]
            };
	var txt = this.trigger("beforeSelected", [itemObj]);
        var _kw = $item.find(self.op.keySelector).text();
        self.el.val(txt || _kw);
        if(this.trigger('selected',[itemObj]) !== false){
            self.hide();
        }
    }

    ajk.Autocomplete.prototype.input = function(keyword){ 
        if(this.trigger('inputed',arguments) !== false){
            self.keyword = keyword;
            this._updateData();
        }
    }

})(jQuery);
APF.Namespace.register('ajk.UserLogin');
(function(){
    var UserLogin;

    ajk.UserLogin = UserLogin = ajk.inherit(ajk.Observer,function(op){
        var self = this;
        self._op = $.extend({},{userbox:'#userbox'},op||{});
        self._userDate = null;
        self._init();
    });

    UserLogin.prototype._init = function() {
        var self = this;
        self.userbox = $(self._op.userbox);
        if( APF.Utils.getCookie('aQQ_ajkauthinfos') ){
            self._op.getUserInfo({},function(r){
                if( r.code === 0 ){
                    self._userDate = r.data;
                    self.updateUserInfo();
                }
                self._bindEvent();
            });
        }
        else{
            self._bindEvent();
        }
    };

    UserLogin.prototype._bindEvent = function() {
        var self = this;
        if( !self.isLogin() ){
            new ajk.DropDown($('.brokerlogin>.link'),$('.brokerlogin>ul'));
        }
        new ajk.DropDown($('.userlogin>.link'),$('.userlogin>ul'));
    };

    UserLogin.prototype.updateUserInfo = function(){
        var self = this;
        if( !self.isLogin() ){
            return
        }
        var content = self.getUserHtml();
        self.userbox.html( content );
    }

    UserLogin.prototype.isLogin = function(){
        return this._userDate && this._userDate.user_id;
    }

    UserLogin.prototype.getUserHtml = function(){
        var config = this._userDate;
        var menuList = config.menu_list;

        var dropDownContent = "";
        for( var i = 0, iLength = menuList.length; i < iLength; i++) {
            var items =  menuList[i];
            for(var j = 0, jLength = items.length; j < jLength; j++){
                dropDownContent = dropDownContent + '<li><a href="'+items[j].url+'">'+items[j].name+'</a></li>';
            }
            if(i < iLength-1){
                dropDownContent = dropDownContent + '<li class="hr"></li>';
            }
        }

        var html = ''
            +'<div class="userlogin userblock userblockfirst">'
            +    '<i class="icon icon-people"></i>'
            +    '<a class="link" href="'+ config.entry_url +'" rel="nofollow" title="'+config.user_name+'">'+config.user_name+'</a>'
            +    '<i class="triangle-down"></i>'
            +    '<ul>'+ dropDownContent +'</ul>'
            +'</div>';

        return html;
    }
})();;
(function($){
    $(function(){
        var hideLink = function(dom){
            var _this = dom;
            var timer = setTimeout(function(){
                _this.hide()
            },500);
            _this.data('hiddenTimer',timer);
        }

        $('#footer').on('click','[data-target]',function(e){
            e.preventDefault();
            var target = $(this).data('target');
            $('#'+target).toggle();
        });

        $('#footer').on('mouseout','[data-target]',function(){
            var target = $(this).data('target');
            hideLink($('#'+target))
        });

        $('#loan_link, #other_city, #map_link, #house_link, #seo_qa').hover(function(){
            var timer = $(this).data('hiddenTimer');
            clearTimeout(timer);
        },function(){
            hideLink($(this));
        });
    });
})(jQuery);APF.Namespace.register('ajk.pc');;
;(function($) {

    var sideBar;
    ajk.pc.sideBar = sideBar = function(op) {
        this._op = $.extend({}, {
            sideBarBox: $('.sidebar'),
            toTop: $('.sidebar-top'),
            sidebarNav: $('.sidebar-mod a'),
            minWidth: 1280,
            minTop: 400
        }, op || {});

        this.init();
    };

    sideBar.prototype.init = function() {
        var self = this;
        self.addLinkSoj('a[data-soj]');
        self.checkVisible();
        $(window).on('scroll resize', function() {
            self.checkVisible();
        });

        self._op.toTop.on('click',function(e) {

            self.sendSoj({
                site: 'anjuke-npv',
                pn: 'track_back_top_click'
            });
            $('html,body').animate({
                scrollTop: 0
            }, 100);
        });

        $('#sid_survey').on('click',function(){
            self.sendSoj({
                site: 'anjuke-npv',
                pn: 'track_survey_click'
            });
        })

    };

    sideBar.prototype.checkVisible = function() {
        var self = this,
            winWidth = $(window).width(),
            scrollTop = $(window).scrollTop();

        //sidebar 通栏是否显示
        if (winWidth > self._op.minWidth) {
            self._op.sideBarBox.show();
            self._op.sideBarBox.stop().animate({
                right: '0px'
            }, 100)
            self._op.toTop.removeClass('sd-top-sig');
        } else {
            self._op.sideBarBox.stop().animate({
                right: '-40px'
            }, 100)
            self._op.toTop.addClass('sd-top-sig');
        }

        if (scrollTop > self._op.minTop) {
            self._op.toTop.show();
        } else {
            self._op.toTop.hide();
        }

        self.slideNav();

    };

    sideBar.prototype.slideNav = function() {
        var self = this;
        self._op.sidebarNav.hover(
            function() {
                var hoverWidth = $(this).children('.sidebar-nav-hover').hasClass('sidebar-sao') ? '130px' : '90px';
                $(this).children('.sidebar-nav-hover').stop()
                    .animate({
                        width: hoverWidth
                    }, 100);
            },
            function() {
                $(this).children('.sidebar-nav-hover').stop()
                    .animate({
                        width: '0px'
                    }, 100)
            }
        )
    };

    sideBar.prototype.sendSoj = function(op){
        var self = this;
        if(ajk && ajk.Logger){

            ajk.Logger.sendSoj({
                page: op.pn,
                site: op.site,
                pageName: op.pn
            });

        }else if(J && J.site && J.site.trackEvent){

            J.site.trackEvent(op.pn);

        }

    };
    sideBar.prototype.addLinkSoj = function(selector, attr, param){
        $('body').on('click', selector, function(e) {

            var soj = $(this).data(attr || 'soj') || $(this).attr(attr || 'data-soj'), // 默认使用data，如果取不到，使用attr
                _soj = $.trim(soj), // 去空格
                href = $.trim($(this).attr('href')),
                _param = param || 'from', // 默认是from
                _target = $(this).attr('target'),//兼容各种target
                _hasTarget = _target !== undefined ,
                _href;

            if(!_soj){//如果没获取到soj直接退出让它自己执行自己的href
                return;
            }

            if (!href) { // 此处链接不做合法性检查
                return;
            }
            if (href.toLowerCase().indexOf('javascript') === 0) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();
            href = href.replace(/(&from=(.)*$)|(\?from=(.)*$)/,''); //移除原本url中的from
            _href = (href.indexOf('?') !== -1)? href+'&'+_param+'='+_soj : href+'?'+_param+'='+_soj; //拼接url
            if(_hasTarget){  //是否含有target
               if(!/*@cc_on!@*/0){  //若非ie
                    var winoper = window.open(_href,_target);
                    winoper && winoper.focus();
               }else{
                    var _el = document.createElement('a');
                    _el.href = _href;
                    _el.target = _target;
                    $(_el).appendTo('body').get(0).click();
                    $(_el).remove();
               }
            }else{
               location.href = _href;
            }

        });
    }

})(jQuery);$(function(){
    $('#navigation>li').hover(function(){
        $(this).addClass('hover');
    },function(){
        $(this).removeClass('hover');
    });

    // 下拉框箭头中间位置
    var arrows = $('.nav-triangle');
    arrows.each(function(i, v) {
        var _this = $(this);
        var parent = _this.parent().parent(), left = 0;
        parent && (left = (parent.width() - 14) / 2);
        _this.css('left',left);
    });

    var userBox = $('#user_box');
    userBox.hover(function(){
        userBox.addClass('hover');
    },function(){
        userBox.removeClass('hover');
    });
});;
function HistoryRecommend(op,param){
    $.ajax({
         url: op.url,
         type: 'GET',
         dataType: 'json',
         data: {
             city_id     : op.city_id,
             pro_id      : op.pro_id,
             trade_type  : op.trade_type,
             page        : op.page,
             pagesize    : op.pagesize,
             from        : op.from,
             showsoj     : op.showsoj,
             showprofile : op.showprofile,
             r           : op.r,
             pagename    : op.pagename
         }
    })
    .done(function(data) {
         if(data.status!="ok" || $(data.data).length <= 0){
              $('#historyRecom-content').hide();
              return false;
         }
         var tpl = _.template( $('#historyRecom-tpl').html() );
         var html = tpl(data.data);
         $('#historyRecom-content').show();
         $('#historyRecom-content').html(html);

        //加载点击滚动事件
        $('#historyRecom-content  ul').slick({
            slidesToShow: 5,
            slidesToScroll: 5,
            autoplay: false,
            autoplaySpeed: 2000,
            accessibility:false,
            draggable:false,
            arrows:true,
            vertical:false
        });

        // soj发曝光
        var list = data.data;
        var cp = $.extend(true,{}, param) , _proids = [];
        _.each(list,function(item){
            var _type = 1;
            var _str = item.id + '|' + item.broker_id + '|' + item.prop_id + '|' + item.hp_type;
            _proids.push(_str);
        });
        cp.proids = _proids.join(',');
        ajk.Logger.sendSoj({
            page: op.pagename,
            pageName: op.pagename,
            site:'anjuke-npv',
            customparam: JSON.stringify(cp)
        });

    });
};(function(){

    if(AJK.SeoRecommend.type == 0){
        var tag = 1;
        var parent_list = getByClassName('tab-'+tag);
        setEvent(parent_list, tag, 1);
    }else if(AJK.SeoRecommend.type == 1){
        var tag = 2;
        var parent_list = getByClassName('parent-'+tag);
        setListEvent(parent_list, tag);
    }

    function setListEvent(parent, tag){

        for(var i = 0; i < parent.length; i++){
            var v = parent[i];
            var cs = v.getElementsByTagName('ul');
            var ps = v.getElementsByTagName('li');
            if(cs.length){
                for(var j = 0; j < ps.length ; j++){
                    var tabLi = ps[j];
                    if(hasClass(tabLi,'tab-' + tag)){
                        (function(cs,ps,j,tabLi){
                            tabLi.onmouseover = function(){
                                for(var z = 0; z < cs.length ; z++){
                                    removeClass(cs[z], 'btn-show');
                                }
                                for(var z = 0; z < ps.length ; z++){
                                    removeClass(ps[z].getElementsByTagName('a')[0],'current-tab');
                                }
                                addClass(cs[j],'btn-show');
                                addClass(tabLi.getElementsByTagName('a')[0],'current-tab');
                            }
                        })(cs,ps,j,tabLi);
                    };
                }
                setListEvent(cs, tag+1);
            }
        }
    }

    function setEvent(parent, tag, isBut){

        if(parent.length){
            var child = new Array(), tempParent = parent[0].parentNode.getElementsByTagName('ul');
            for(var i = 0; i < tempParent.length; i++){
                hasClass(tempParent[i],'parent-'+(tag+1)) && child.push(tempParent[i]);
            }
            if(child.length){
                for(var i = 0; i < parent.length; i++){
                    var v = parent[i];
                    (function(child,parent,i,v,isBut){
                        v.onmouseover = function(){
                            for(var j = 0; j < child.length; j++){
                                removeClass(child[j],'btn-show');
                            }
                            for(var j = 0; j < parent.length; j++){
                                removeClass(parent[j].getElementsByTagName('a')[0],'current-tab');
                            }
                            addClass(child[i],'btn-show');
                            addClass(v.getElementsByTagName('a')[0],'btn-show');
                            if(isBut){
                                for(var k = 0; k < parent.length; k++){
                                    removeClass(parent[k].getElementsByTagName('a')[0],'cur');
                                }
                                addClass(v.getElementsByTagName('a')[0],'cur');
                            }
                        }
                    })(child,parent,i,v,isBut);
                }
                tag++;
                for(var z = 0; z < child.length; z++){
                    var arr = []
                    for(var n = 0; n < child[z].getElementsByTagName('li').length; n++){
                        hasClass(child[z].getElementsByTagName('li')[n],'tab-' + tag) && arr.push(child[z].getElementsByTagName('li')[n]);
                    }
                    setEvent(arr, tag, 0);
                }
            }
        }
    }

    function hasClass(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    function addClass(obj, cls) {
        if (!hasClass(obj, cls)) obj.className += " " + cls;
    }

    function removeClass(obj, cls) {
        if (hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, '');
        }
    }

    function getByClassName(className){
        if(document.getElementByClassName){
            return document.getElementByClassName(className)
        }
        var nodes=document.getElementsByTagName("*");
        var arr=[];
        for(var i=0;i<nodes.length;i++){
            if(hasClass(nodes[i],className)) arr.push(nodes[i]);
        }
        return arr;
    }
})();

;APF.Namespace.register("TrafficeLife");
;(function($) {
    TrafficeLife.Map = BaiduMap = function(argObj) {
        var self = this,
            mapOps = {
                minZoom : argObj.minZoom,
                maxZoom : argObj.maxZoom
            };
        if( argObj.bmapOps ) {
            mapOps = $.extend(mapOps, argObj.bmapOps);
        }
        if( argObj.initFirst ) {
            this.initFirst = argObj.initFirst;
        }
        this.map = new BMap.Map("bmap", mapOps);

        // 添加地图对象的属性
        this.common   = argObj.common;
        this.point    = new BMap.Point(argObj.common.point.lng, argObj.common.point.lat);
        this.radius   = argObj.radius || 2000; // 圆半径，单位：米
        this.capacity = argObj.capacity || 30;
        this.traffic  = {
            keyword : ["地铁","公交"],
            data    : {
                subway  : {
                    className : "ftr_subway",
                    data  : null
                },
                bus     : {
                    className : "ftr_bus",
                    data  : null
                }
            }
        };
        this.bank = {
            keyword  : ["银行"],
            data     : {
                bank : {
                    className : "ftr_bank",
                    data  : null
                }
                // ATM : {
                //     className : "ftr_ATM",
                //     data  : null
                // }
            }
        };
        this.community  = {
            keyword  : ["小区"],
            data     : {
                community : {
                    className : "ftr_community",
                    data  : null
                }
            }
        };
        this.xzl = {
            keyword  : ["写字楼"],
            data     : {
                xzl : {
                    className : "ftr_xzl",
                    data  : null
                }
            }
        };
        this.mall = {
            keyword  : ["商场"],
            data     : {
                mall : {
                    className : "ftr_mall",
                    data  : null
                }
            }
        };
        this.shool = {
            keyword  : ["学校"],
            data     : {
                shool : {
                    className : "ftr_shool",
                    data  : null
                }
            }
        };



        this.map.centerAndZoom(self.point, argObj.initScale);
        this.init();
    }

    // 添加覆盖物
    BaiduMap.prototype.addOverlays = function() {
        var self = this;

        // 添加小区坐标点
        function commonOverlay() {};
        commonOverlay.prototype = new BMap.Overlay();
        commonOverlay.prototype.initialize = function() {
            var $commonNode = this.$node = new CommonNode().node;
            $commonNode.children(".common_name").html(self.common.name);
            $commonNode.on("mouseover mouseout", function(e) {
                if(e.type === "mouseover") {
                } else if(e.type === "mouseout") {
                }
            });
            self.map.getPanes().labelPane.appendChild($commonNode[0]);
            return $commonNode[0];
        }
        commonOverlay.prototype.draw = function() {
            var pixel = self.map.pointToOverlayPixel(self.point);
            this.$node.css({
                "left" : pixel.x - 15 + "px",
                "top"  : pixel.y - 58 + "px"
            });
        }

        // 添加圆形覆盖物，半径单位：米
        var circle = new BMap.Circle(self.point, 1000, {
                strokeColor   : "#CCC297",
                fillColor     : "#CCC297",
                fillOpacity   : 0.5,
                strokeWeight  : 1,
                strokeOpacity : 0.5
        });


        self.map.addOverlay( circle );
        self.map.addOverlay( new commonOverlay() );

        // 添加缩放控件，绑定缩放方法
        $("#zoomout_btn").on("click", function(e) {
            self.map.setZoom(self.map.getZoom() + 1);
        });
        $("#zoomin_btn").on("click", function(e) {
            self.map.setZoom(self.map.getZoom() - 1);
        });
    }

    //
    BaiduMap.prototype.getSurroundData = function() {
        var self = this;
        var local =  new BMap.LocalSearch(self.point, {
            onSearchComplete : function(r) {
                self.setKind(r); // 解析获得的结果，存到对象里
                 if( 
                    self.traffic.data.subway.data   !== null &&
                    self.traffic.data.bus.data    !== null &&
                    self.bank.data.bank.data    !== null &&
                    self.community.data.community.data !== null &&
                    self.xzl.data.xzl.data    !== null &&
                    self.mall.data.mall.data    !== null &&
                    self.shool.data.shool.data     !== null  ) {          // 所有周边数据都取回时绑定类目切换方法
                    self.bindSwitchEvent();
                }
            }
        });
        local.setPageCapacity(self.capacity);
        local.searchNearby(self.traffic.keyword, self.point, self.radius);
        local.searchNearby(self.community.keyword, self.point, self.radius);
        local.searchNearby(self.bank.keyword, self.point, self.radius);
        local.searchNearby(self.xzl.keyword, self.point, self.radius);
        local.searchNearby(self.mall.keyword, self.point, self.radius);
        local.searchNearby(self.shool.keyword, self.point, self.radius);
    }

    // @r：local.searchNearby取回的结果对象
    BaiduMap.prototype.setKind = function(r) {
        var self = this;
        $.each(r, function() {
            var that = this,
                key  = {};
            switch(that.keyword) {
                case "地铁" :
                    key.type    = "traffic";
                    key.subType = "subway";
                    break;
                case "公交" :
                    key.type    = "traffic";
                    key.subType = "bus";
                    break;
                case "银行" :
                    key.type    = "bank";
                    key.subType = "bank";
                    break;
                case "小区" :
                    key.type    = "community";
                    key.subType = "community";
                    break;
                case "写字楼" :
                    key.type    = "xzl";
                    key.subType = "xzl";
                    break;
                case "商场" :
                    key.type    = "mall";
                    key.subType = "mall";
                    break;
                case "学校" :
                    key.type    = "shool";
                    key.subType = "shool";
                    break;
            }
            // var arr = that.getCityList(); // 百度地图提供的方法，获取到[]，不知道为啥，下面自己定义一个
            var arr = getCityListDIY(that);
            function getCityListDIY(r) {
                var result = [];
                $.each(r, function() {
                    var t = this;
                    if( t.push && t.length > 0 ) {
                        result = t;
                    }
                });
                return result;
            }
            // 删除超出范围的数据（翔叔说百度返回的数据可能会超出指定的距离，但我没发现，以防万一）ie678不支持indexOf，改用绘制时过滤
            $.each(arr, function() {
                if( this.point !== undefined && (self.map.getDistance(new BMap.Point(this.point.lng, this.point.lat), self.point)).toFixed(0) > self.radius ) {
                    if(arr.indexOf) {
                        arr.splice(arr.indexOf(this), 1);  
                    }
                }
            });
            //console.log(key.type);
            self[key.type]["data"][key.subType]["data"] = arr;
        });
    }

    //
    BaiduMap.prototype.setSurroundData = function(type) {
        var self = this;
        $.each(self[type]["data"], function() { // 遍历子类
            var that = this,
                className = that.className,
                data = that.data;
            $.each(data, function() { // 遍历子类的数组,绘制2000m内的数据
                if( this.point !== undefined &&
                    (self.map.getDistance(new BMap.Point(this.point.lng, this.point.lat), self.point)).toFixed(0) < self.radius 
                  ) {
                    addSurroundOverlay(this, className);
                }
            });
        });

        function addSurroundOverlay(obj, className) {

            function surroundOverlay(obj, className) {
                var that = this;
                this.p = new BMap.Point(obj.point.lng, obj.point.lat);
                this.d = (self.map.getDistance(that.p, self.point)).toFixed(0);
                this.o = obj;
                this.c = className;
            }
            surroundOverlay.prototype = new BMap.Overlay();
            surroundOverlay.prototype.initialize = function() {
                var $node = this.$node = new LayoutNode().node;
                // console.log($node);
                $node.addClass(this.c);
                
                $node.children(".layout_detail").children(".layout_title").html(this.o.title);
                $node.children(".layout_detail").children(".layout_title").attr('title',this.o.title);
                $node.children(".layout_detail").children(".distance_tag").children(".distance").html(this.d);
                $node.children(".layout_detail").children(".distance_address").html(this.o.address);
                self.map.getPanes().labelPane.appendChild($node[0]);
                return $node[0];
            }
            surroundOverlay.prototype.draw = function() {
                var pixel = self.map.pointToOverlayPixel( this.p );
                this.$node.css({
                    "left" : pixel.x - 15,
                    "top"  : pixel.y - 30
                });
            }
            self.map.addOverlay( new surroundOverlay(obj, className) );
            // var p = new BMap.Point(obj.point.lng, obj.point.lat);
            // self.map.addOverlay( new BMap.Marker(p) );
        }

    }

    // 绑定切换周边数据类型的方法
    BaiduMap.prototype.bindSwitchEvent = function() {
        var self = this;
        self.setSurroundData("traffic");
        $("#map_tag_wrap a").on("click", function(e) {
            self.map.clearOverlays();
            self.addOverlays(); 
            self.setSurroundData($(this).attr('id')); // 在地图上绘制周边

            //发送soj
            var pageName = $(this).attr('soj_code');
            ajk.Logger.sendSoj({
                page: pageName,
                pageName: pageName,
                site:'anjuke-npv'
            });

            // 切换标签的选中状态
            $(this).addClass("map_action");
            $(this).siblings("a").removeClass("map_action");
        });
    }

    BaiduMap.prototype.init = function(argObj) {
        var self = this;
        self.initFirst && self.initFirst(self);
        self.addOverlays();     // 地图上添加覆盖物
        self.getSurroundData(); // 获取并保存地图周边
    }

    // 创建小区节点
    function CommonNode() {
        this.node = $('' + 
                '<div class="common" id="common">' +
                    '<p class="common_name"></p>' +
                    '<i class="common_arrow_ico"></i>' +
                    '<i class="common_pos_ico"></i>' +
                '</div>' +
            '');
    }

    function LayoutNode() {
        this.node = $('' +
                '<div class="layout_wrap">' +
                    '<div class="layout_detail">' +
                        '<h5 class="layout_title" title=""></h5>' +
                        '<p class="distance_address"></p>' +
                        '<div class="distance_tag"><i></i><span class="distance"></span>m</div>'+
                        '<i class="layout_detail_down"></i>' +
                    '</div>' +
                '</div>' +
            '');
    }
    
})(jQuery);APF.Namespace.register('ajk.pc');;
(function($){
	var nocopy;
	ajk.pc.nocopy = nocopy = function(prm){
		var param = $.extend({
			clazz:'nocopy',
			nocopy_ctx:'受保护内容，不可复制。'
		},prm);
		this.clazz = param.clazz;
		this.nocopy_ctx = param.nocopy_ctx;
		this.alert();
	}

	nocopy.prototype.alert = function(){
		var self = this;
		$('.'+this.clazz).on('copy',function(e){
			e.stopPropagation();
			e.preventDefault();
			alert(self.nocopy_ctx);
		})
	}
})(jQuery);;(function ($){
    $('.brokercard-scoredetail')&&$('.brokercard-scoredetail').on('mouseenter mouseleave',function(){
        $(this).find('.brokercard-sd-tip').toggle();
    });
})(jQuery);;
(function($,N){
    N.ImageShow = function(op){
        this.ops = $.extend(op,{});
        this.dom={
            $open: $(this.ops.bindDom),
            $wrap: $('#allScreen'),
            $close: $('#allScreenClose'),
            $img: $('#allscreenImg')
        };
        this.bindEvent();
    };

    N.ImageShow.prototype = {
        contrustor:N.ImageShow,
        bindEvent: function () {
            this.close();
            this.show();
        },
        close:function () {
            var _this = this;
            this.dom.$close.click(function () {
                _this.dom.$wrap.hide();
            });
        },
        show:function () {
            var _this = this;
            this.dom.$open.click(function () {
                _this.dom.$img.attr('src',_this.ops.imgSrc);
                _this.dom.$wrap.show();
            });
        }
    };
})(jQuery,APF.Namespace.register('ajk.pc.common'));;APF.Namespace.register('ajk.ShopView');
(function($){
    var page = ajk.ShopView = function(setting){
        this.op = $.extend({
            body         : $('body'),
            fangItem     : $('.li-itemmod'),
            jisuanBtn    : $('.jisuan-btn'),
            jisuanTxt    : $('.jisuan-text p')
        },setting);
        this.initial();
    }

    page.prototype.initial = function(){
        var self = this;
        self.bindEvent();
        self.anchor();
    }

    page.prototype.bindEvent = function(){
        var self = this;
        self.op.body.on('mouseenter mouseleave','.li-itemmod',function(){
            $(this).toggleClass('li-over');
        });
        
        self.op.body.on('click','.li-itemmod',function(evt){
            var target = $(evt.srcElement || evt.target);
            if(!target.is('a')){
                var link = $.trim($(this).attr('link')) + '?from=' + $.trim($(this).attr('_soj'));
                //  var link = $.trim($(this).attr('link'));
                link && redirect(link);
            }
        });

        self.op.body.on('click','.li-itemmod address>a',function(evt){
            evt.stopPropagation();
        });
        function redirect(url){
            if(!/*@cc_on!@*/0){
                window.open(url,'_blank');
            }else{
                var a = document.createElement('a');
                a.href = url;
                a.target = '_blank';
                document.body.appendChild(a);
                a.click();
            }
        } 

        //预估月支出
        self.op.jisuanBtn.on('click',function(){
            self.op.jisuanTxt.toggle();
        });

        //相册图片滚动事件
        $('#picMove').slick({
            lazyLoad:'ondemand',//图片懒加载处理
            slidesToShow: 1,
            slidesToScroll: 1,
            accessibility:false,
            draggable:false,
            vertical:false,
            dots: false,
            infinite: true,
            speed: 300,
            arrows:false
        });
        //图片左右滑动
        if($('#picMove li').length > 1){
            $('#picMove li').on('click', function(){ 
                $('#picMove').slick('slickNext');
            });
            $('.picCon .switch-prev-dis').addClass('switch-prev');
            $('.picCon .switch-next-dis').addClass('switch-next');
            $('.picCon .switch-arrow').removeClass('switch-next-dis').removeClass('switch-prev-dis');
            $('.picCon .switch-next').on('click', function(){ 
                $('#picMove').slick('slickNext');
            });
            $('.picCon .switch-prev').on('click', function(){ 
                $('#picMove').slick('slickPrev');
            });
        }

    }


    //跟随导航
    page.prototype.anchor = function(){
        //所有元素
        var target, agent, targetIn, linkArray, linkArrayFix, docHeight;

        //所有需求数据
        var hasShow, tabArray, len, curIndex, isALinkSkip;

        //获取DOM元素
        function getElements() {
            target = $('#j-toolBarFix');
            agent = $(".brokerInfo");
            targetIn = $(".wrapper");
            //linkArray=targetIn&&targetIn.s(".left_tab").eq(0).s("a");
            linkArrayFix = $(".toolMenu a");
            //console.log(linkArrayFix);
            docHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
            curIndex = 0;
        }

        //绑定DOM事件
        function bindAction() {
            linkArrayFix.on('click',function(){
                isALinkSkip = true; 
                linkArrayFix.removeClass("now");   
                $(this).addClass("now");

                //send soj
                var pgname = $(this).attr('from_code');
                //console.log(pgname);
                ajk.Logger.sendSoj({
                    page: pgname,
                    pageName: pgname,
                    site:'anjuke-npv'
                });
            });
            
            //window scroll event
            if (targetIn.length) {
                if (window.addEventListener) {
                    window.addEventListener("scroll", scrollCheck, false);
                } else {
                    window.attachEvent("onscroll", scrollCheck);
                }
            }
        }

        //初始化tabArray,tabStateArray和tab选中状态[该函数执行条件：从左到右的tab链接所对应内容位置是从上到下的顺序]
        function initTabArray() {
            var top = document.body.scrollTop || document.documentElement.scrollTop;
            tabArray = [];
            linkArrayFix && linkArrayFix.each(function(i, v) {
                var mao_txt = $(v).attr('href');
                if($(mao_txt).length > 0){
                    tabArray[i] = $(mao_txt).offset().top - 30;
                }
            });
        }

        //初始化tab选中状态,并获取curIndex
        function InitPosition() {
            var place = location.href.match(/\#\w*/g);
            if (place) {
                linkArrayFix.each(function(i, v) {
                    if ($(v).attr("href") == place[0]) {
                        curIndex = i;
                        return;
                    }
                });
            }
            linkArrayFix.eq(curIndex).addClass("now");
            len = tabArray.length - 1;
        }

        //滚动触发锚点导航的显示和隐藏 [core function]
        function scrollCheck() {
            //锚点点击跳转就禁用scroll操作
            if (isALinkSkip) {
                isALinkSkip = false;
                return;
            }

            var top = document.body.scrollTop || document.documentElement.scrollTop;
            var curHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
            if (curHeight != docHeight) {
                docHeight = curHeight;
            }
            if (!hasShow) {
                if (top >= targetIn.offset().top) {
                    target.show();
                    hasShow = true;
                }
            } else {
                if (top < targetIn.offset().top) {
                    target.hide();
                    hasShow = false;
                }
                switchAnchorTab(top);
            }
        }

        //锚点导航tab切换 [core function]
        function switchAnchorTab(top) {
            if (curIndex < len && top >= tabArray[curIndex + 1]) {
                linkArrayFix.eq(curIndex).removeClass("now");
                linkArrayFix.eq(curIndex + 1).addClass("now");
                curIndex = curIndex + 1;
            } else if (curIndex > 0 && top < tabArray[curIndex]) {
                linkArrayFix.eq(curIndex).removeClass("now");
                linkArrayFix.eq(curIndex - 1).addClass("now");
                curIndex = curIndex - 1;
            }
        }

         
        if ($('#j-toolBarFix').length) {
            getElements();
            bindAction();
            initTabArray();
            InitPosition();
        } 
    }

})(jQuery);
