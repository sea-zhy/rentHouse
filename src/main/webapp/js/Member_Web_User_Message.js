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
    }

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
        var _page = op.page || self.sojPage, _ctid = self.ctid,
            _pageName = op.pageName || self.sojPageName || _page;
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
    });
})();;
APF.Namespace.register('ajk');
(function ($) {
    "use strict";
    ajk.Modal = ajk.inherit(ajk.Observer,function (op) {
        var self = this;
        self.op = $.extend({}, ajk.Modal._default, op);
        self.op.ie6 = /MSIE 6/.test(navigator.userAgent);
    });
    ajk.Modal._default = {
        modalClass: '', //className,多个类名空格分开
        con       : '', //conHtml
        hd        : '', //headerHtml
        title     : '', //titleText
        bd        : '', //bodyHtml
        ft        : '', //footerHtml
        width     : 560, //Number
        height    : '', //Number
        pos       : {top: undefined, left: undefined},//Number
        mask      : true, //true,false，遮罩层
        duration  : 200 //Number，动画持续时间
    };
    ajk.Modal.prototype._create = function () {
        var self = this,
            op = self.op;
        //生成节点
        op.modal = $('<div class="xf-modal"></div>');
        op.modalMask = $('<div class="modal-mask"></div>');
        op.modalIfr = $('<iframe class="modal-ifr"></iframe>');
        op.modalCover = $('<div class="modal-cover"></div>');
        //写入节点内容
        var shadow = $('<div class="shadow"></div>'),
            close = $('<a href="javascript:" class="md-close iconfont">&#xE073;</a>'),
            con = $('<div class="con"></div>').append($(op.con).show()),
            hd = $('<div class="hd"></div>').append($(op.hd).show()),
            bd = $('<div class="bd"></div>').append($(op.bd).show()),
            ft = $('<div class="ft"></div>').append($(op.ft).show());
        //插入节点
        !op.hd && op.title && hd.html('<h3 class="title">' + op.title + '</h3>');
        op.con || $().add((op.hd || op.title) && hd).add(op.bd && bd).add(op.ft && ft).appendTo(con);
        con.add(close).appendTo(op.modal);
        op.modalClass && op.modal.addClass(op.modalClass);
        con.css({width: op.width, height: op.height});
        op.modalCover.append(op.modal).appendTo('body');
        //关闭按钮事件
        close.on('click.modal', function () {
            self.close();
        });
        //是否添加遮罩层
        var docHeight = $(document).height();
        op.mask && op.modalMask.css({'height': docHeight}).appendTo('body');
        //ie6添加iframe
        op.ie6 && op.modalIfr.css({'height': docHeight}).appendTo('body');
    };
    /**
     * [center 弹出框居中函数]
     */
    ajk.Modal.prototype.center = function (node, duration) {
        var self = this,
            op = self.op,
            nodeWidth = node.outerWidth(),
            nodeHeight = node.outerHeight(),
            winHeight = $(window).height();
        //弹出内容超过一屏时，隐藏body滚动条，显示弹出框滚动条，ie6全部隐藏body滚动条
        if (op.ie6 || nodeHeight > winHeight) {
            $('html').css({'overflow': 'hidden'});
            op.modalCover.css({'overflow': 'auto'});
        } else {
            $('html').css({'overflow': ''});
            op.modalCover.css({'overflow': 'hidden'});
        }
        //未传入pos值，默认居中定位
        if (op.pos.top === undefined || op.pos.left === undefined) {
            var _left = -parseInt(nodeWidth / 2, 10),
                _top = -parseInt(nodeHeight / 2, 10);
            if (nodeHeight > winHeight) {
                _top = -parseInt(winHeight / 2, 10);
            }
            node.animate({'margin-top': _top, 'margin-left': _left}, duration);
        } else {
            node.animate(op.pos, duration);
        }
    };
    /**
     * [open 弹出框打开函数]
     * 可绑定函数 openBefore,openAfter
     */
    ajk.Modal.prototype.open = function () {
        var self = this, op = self.op, undefined = window.undefined;
        //计算位置
        function calpos(duration) {
            op.ie6 && op.modalCover.css({'top': $(window).scrollTop()});
            self.center(op.modal, duration);
        }

        if ($(self).trigger('openBefore') !== false) {
            //第一次弹出，则插入节点到body
            (op.modal === undefined) && self._create();
            calpos(0);
            op.modalCover.add(op.modalMask).add(op.modalIfr).css({'visibility': 'visible'});
            //绑定窗口resize事件
            $(window).off('resize.modal').on('resize.modal', function () {
                op.timer && clearTimeout(op.timer);
                op.timer = setTimeout(function () {
                    calpos(op.duration);
                }, 200);
            });
            $(self).trigger('openAfter');
        }
    };
    /**
     * [close 弹出框关闭函数]
     * 可绑定函数 closeBefore,closeAfter
     */
    ajk.Modal.prototype.close = function () {
        var self = this, op = self.op;
        if ($(self).trigger('closeBefore') !== false) {
            if (op.modal !== undefined) {
                op.modalCover.css({'overflow': 'hidden'}).add(op.modalMask).add(op.modalIfr).css({'visibility': 'hidden'});
                $('html').css({'overflow': ''});
                $(window).off('resize.modal');
                $(self).trigger('closeAfter');
            }
        }
    };
})(jQuery);
(function ($) {
  // 退出对话框
  var quitModal = new ajk.Modal({
    modalClass:'modal-custom quit_dialog',
    title:'提示',
    bd:$('.quit-content'),
    ft:$('.quit-btn'),
    width:'460',
    height:'239'
  });

  // 点击退出，退出提示框出现，用户确认是否退出
  $('.quit').on('click',function (e) {
    e.preventDefault();
    // e.stopPropagation();
    quitModal.open();
  });

  // 用户确认退出
  $('.quit-btn').find('.sure').on('click',function () {
    quitModal.close();
  });

  // 用户取消退出
  $('.quit-btn').find('.cancel').on('click',function () {
    quitModal.close();
  });

})(jQuery);
