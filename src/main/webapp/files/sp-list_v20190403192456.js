var APF = {
    log: function (a) {}
};
APF.Namespace = {
    register: function (d) {
        var c = d.split(".");
        var a = window;
        for (var b = 0; b < c.length; b++) {
            if (typeof a[c[b]] == "undefined") {
                a[c[b]] = new Object()
            }
            a = a[c[b]]
        }
        return a
    }
};
APF.Utils = {
    getWindowSize: function () {
        var b = 0,
            a = 0;
        if (typeof (window.innerWidth) == "number") {
            b = window.innerWidth;
            a = window.innerHeight
        } else {
            if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                b = document.documentElement.clientWidth;
                a = document.documentElement.clientHeight
            } else {
                if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                    b = document.body.clientWidth;
                    a = document.body.clientHeight
                }
            }
        }
        return {
            width: b,
            height: a
        }
    },
    getScroll: function () {
        var b = 0,
            a = 0;
        if (typeof (window.pageYOffset) == "number") {
            a = window.pageYOffset;
            b = window.pageXOffset
        } else {
            if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
                a = document.body.scrollTop;
                b = document.body.scrollLeft
            } else {
                if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement
                        .scrollTop)) {
                    a = document.documentElement.scrollTop;
                    b = document.documentElement.scrollLeft
                }
            }
        }
        return {
            left: b,
            top: a
        }
    },
    setCookie: function (c, e, a, h, d, g) {
        var b = new Date();
        b.setTime(b.getTime());
        if (a) {
            a = a * 1000 * 60 * 60 * 24
        }
        var f = new Date(b.getTime() + (a));
        document.cookie = c + "=" + escape(e) + ((a) ? ";expires=" + f.toGMTString() : "") + ((h) ? ";path=" +
            h : "") + ((d) ? ";domain=" + d : "") + ((g) ? ";secure" : "")
    },
    getCookie: function (a) {
        var f = document.cookie.split(";");
        var b = "";
        var d = "";
        var e = "";
        var c = false;
        for (i = 0; i < f.length; i++) {
            b = f[i].split("=");
            d = b[0].replace(/^\s+|\s+$/g, "");
            if (d == a) {
                c = true;
                if (b.length > 1) {
                    e = unescape(b[1].replace(/^\s+|\s+$/g, ""))
                }
                return e;
                break
            }
            b = null;
            d = ""
        }
        if (!c) {
            return null
        }
    },
    deleteCookie: function (a, c, b) {
        if (this.getCookie(a)) {
            document.cookie = a + "=" + ((c) ? ";path=" + c : "") + ((b) ? ";domain=" + b : "") +
                ";expires=Thu, 01-Jan-1970 00:00:01 GMT"
        }
    },
    setScrollTop: function (a) {
        if (document.body) {
            document.body.scrollTop = a;
            if (document.body.scrollTop == 0) {
                if (document.documentElement) {
                    document.documentElement.scrollTop = a
                }
            }
        } else {
            if (document.documentElement) {
                document.documentElement.scrollTop = a
            }
        }
    },
    getScrollTop: function () {
        return document.body ? document.body.scrollTop || document.documentElement.scrollTop : document.documentElement
            .scrollTop
    },
    gotoScrollTop: function (f, d) {
        var b = APF.Utils.getScrollTop(),
            h = 0,
            g = 0;
        var d = d || 1;
        var f = f || 0;
        var a = b > f ? 1 : 0;
        (function () {
            b = APF.Utils.getScrollTop();
            h = a ? b - f : f - b;
            g = a ? b - h / 15 * d : b + 1 + h / 15 * d;
            APF.Utils.setScrollTop(g);
            if (h <= 0 || b == APF.Utils.getScrollTop()) {
                return
            }
            setTimeout(arguments.callee, 10)
        })()
    }
};
if (typeof JSON !== "object") {
    JSON = {}
}(function () {
    var rx_one = /^[\],:{}\s]*$/,
        rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rx_four = /(?:^|:|,)(?:\s*\[)+/g,
        rx_escapable =
        /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        rx_dangerous =
        /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        return n < 10 ? "0" + n : n
    }

    function this_value() {
        return this.valueOf()
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(
                this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(
                this.getUTCSeconds()) + "Z" : null
        };
        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value
    }
    var gap, indent, meta, rep;

    function quote(string) {
        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string) ? '"' + string.replace(rx_escapable, function (a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
            case "string":
                return quote(value);
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
            case "null":
                return String(value);
            case "object":
                if (!value) {
                    return "null"
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null"
                    }
                    v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind +
                        "]" : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v
                }
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === "string") {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" :
                    "{" + partial.join(",") + "}";
                gap = mind;
                return v
        }
    }
    if (typeof JSON.stringify !== "function") {
        meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !==
                    "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": value
            })
        }
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}());
APF.Namespace.register("ajk");
(function (a) {
    ajk.inherit = function () {
        var f = Array.prototype.splice,
            c = arguments;
        var b = c[c.length - 1];
        f.apply(c, [-1, 1]);
        var e = function () {
            for (var g = 0; g < c.length; g++) {
                if (c[g]) {
                    c[g].apply(this, arguments)
                }
            }
            b.apply(this, arguments)
        };
        for (var d = 0; d < c.length; d++) {
            if (c[d]) {
                a.extend(e.prototype, c[d].prototype)
            }
        }
        a.extend(e.prototype, b.prototype);
        return e
    };
    ajk.Observer = function () {
        this.ob = {}
    };
    ajk.Observer.prototype.on = function (g, f) {
        var e = g.split(" ");
        var d = {};
        for (var b = 0; b < e.length; b++) {
            if (!this.ob[e[b]]) {
                this.ob[e[b]] = []
            }
            var c = this.ob[e[b]].push(f);
            d[e[b]] = c - 1
        }
        return d
    };
    ajk.Observer.prototype.off = function (b, d) {
        if (d !== undefined && !a.isArray(d)) {
            d = [d]
        }
        for (var c = 0; c < this.ob[b].length; c++) {
            if (d === undefined || a.inArray(c, d) > -1) {
                this.ob[b][c] = undefined
            }
        }
    };
    ajk.Observer.prototype.trigger = function (c, d) {
        var f;
        if (!this.ob[c]) {
            return f
        }
        var b = d || [];
        for (var e = 0; this.ob[c] && e < this.ob[c].length; e++) {
            if (!this.ob[c][e]) {
                continue
            }
            var g = this.ob[c][e].apply(this, b);
            f = (f === false) ? f : g
        }
        return f
    };
    ajk.Observer.prototype.once = function (c, e) {
        var b = this;
        var d = b.on(c, function () {
            e.apply(this, arguments);
            b.off(c, d[c])
        })
    }
})(jQuery);
APF.Namespace.register("ajk");
(function () {
    var logger;
    var siteName = (function () {
        var hostData = document.location.host.match(/^(\w+)\.(\w+)\./);
        if (hostData) {
            return "pc"
        } else {
            return "unknown"
        }
    })();
    var rAf = function (callback) {
        window.setTimeout(callback, 1000 / 10)
    };
    ajk.Logger = logger = {
        sojSite: "",
        sojPage: "",
        sojPageName: "",
        errorSite: siteName
    };
    logger.setSite = function (site) {
        this.sojSite = site || ""
    };
    logger.setPage = function (page) {
        this.sojPage = page || ""
    };
    logger.setPageName = function (pagename) {
        this.sojPageName = pagename || ""
    };
    logger.setCtid = function (ctid) {
        this.ctid = ctid || ""
    };
    logger.config = {
        devLogURL: "//s.anjuke.test/ts.html?",
        logURL: "//m.anjuke.com/ts.html?",
        devSojURL: "//s.anjuke.test/stb",
        isDev: /dev|test/.test(document.domain),
        blackList: ["Player", "baiduboxapphomepagetag", "onTouchMoveInPage"]
    };
    logger.isblack = function (str) {
        var self = this;
        var i, reg, length, blackList = self.config.blackList;
        if (typeof str !== "string") {
            return true
        }
        for (i = 0, length = blackList.length; i < length; i++) {
            reg = new RegExp(blackList[i], "g");
            if (reg.test(str)) {
                return true
            }
        }
    };
    logger.sendError = function (params) {
        var self = this;
        var errorinfo = "tp=error&site=" + self.errorSite + "&msg=",
            key, url, arr = [],
            image, msg;
        if (typeof params === "string") {
            msg = params
        }
        if (typeof params === "object") {
            for (key in params) {
                if (params.hasOwnProperty(key)) {
                    arr.push(key + ":" + encodeURIComponent(JSON.stringify(params[key])))
                }
            }
            msg = arr.join(",")
        }
        if (self.isblack(msg)) {
            return false
        }
        image = new Image();
        if (self.config.isDev) {
            url = self.config.devLogURL + errorinfo + msg
        } else {
            url = self.config.logURL + errorinfo + msg
        }
        image.src = url;
        return true
    };
    var getScreen = function () {
        var sinfo = {};
        sinfo.w = $(window).width().toString();
        sinfo.h = $(window).height().toString();
        sinfo.r = (window.devicePixelRatio && window.devicePixelRatio >= 2 ? 1 : 0).toString();
        getScreen = function () {
            return sinfo
        };
        return sinfo
    };
    logger.sendSoj = function (op) {
        var self = this;
        var _site = op.site || self.sojSite,
            soj = new SiteTracker(),
            t_params;
        if (op.customparam) {
            soj.setCustomParam(op.customparam)
        }
        if (self.config.isDev) {
            t_params = {
                target_url: self.config.devSojURL
            }
        }
        var _page = op.page || self.sojPage,
            _ctid = self.ctid;
        var _pageName = op.pageName || self.sojPageName || _page;
        soj.setPage(_page);
        soj.setPageName(_pageName);
        soj.setSite(_site);
        soj.setScreen(getScreen());
        soj.setNCtid(_ctid);
        soj.setReferer(op.r || document.referrer);
        if (op.NGuid) {
            soj.setNGuid(op.NGuid)
        }
        if (op.NUid) {
            soj.setNUid(op.NUid)
        }
        if (op.h) {
            if (!t_params) {
                t_params = {}
            }
            t_params.h = op.h
        }
        soj.track(t_params);
        try {
            if (!/npv/.test(_site)) {
                var trackUrl = soj.getParams();
                delete trackUrl.cp;
                delete trackUrl.sc;
                window._trackURL = JSON.stringify(trackUrl);
                loadTrackjs()
            }
        } catch (e) {}

        function loadTrackjs() {
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "//tracklog.58.com/referrer_anjuke_pc.js?_=" + Math.random();
            var b = document.body;
            s.onload = function () {
                soj.setSite(_site + "-npv");
                soj.setPage(_page + "_tracklog");
                soj.setPageName(_pageName + "_tracklog");
                soj.track(t_params)
            };
            s.onerror = function () {
                soj.setSite(_site + "-npv");
                soj.setPage(_page + "_tracklog_error");
                soj.setPageName(_pageName + "_tracklog_error");
                soj.track(t_params)
            };
            b.appendChild(s)
        }
    };
    logger.track = function (p, cp, pn) {
        if (!pn) {
            pn = p
        }
        if ($.isPlainObject(cp)) {
            cp = JSON.stringify(cp)
        }
        logger.sendSoj({
            site: "anjuke-npv",
            page: p,
            pageName: pn,
            customparam: cp || ""
        })
    };
    logger.addLinkSoj = function (selector, attr, param) {
        $("body").on("click", selector, function (e) {
            var soj = $(this).data(attr || "soj") || $(this).attr(attr || "_soj"),
                _soj = $.trim(soj),
                href = $.trim($(this).attr("href")),
                _param = param || "from",
                _target = $(this).attr("target"),
                _hasTarget = _target !== undefined,
                _href;
            if (!_soj) {
                return
            }
            if (!href) {
                return
            }
            if (href.toLowerCase().indexOf("javascript") === 0) {
                return
            }
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            href = href.replace(/(&from=(.)*$)|(\?from=(.)*$)/, "");
            _href = (href.indexOf("?") !== -1) ? href + "&" + _param + "=" + _soj : href + "?" + _param +
                "=" + _soj;
            if (_hasTarget) {
                if (!
                    /*@cc_on!@*/
                    0) {
                    var winoper = window.open(_href, _target);
                    winoper && winoper.focus()
                } else {
                    var _el = document.createElement("a");
                    _el.href = _href;
                    _el.target = _target;
                    $(_el).appendTo("body").get(0).click();
                    $(_el).remove()
                }
            } else {
                location.href = _href
            }
        })
    };
    logger.Exposure = function (op) {
        var defaults = {
            site: "",
            trackTag: "data-trace",
            delay: 50,
            page: "",
            pageName: "",
            NUid: "",
            NGuid: "",
            prefix: ""
        };
        this.ops = $.extend(defaults, op);
        this.domCache = [];
        this.pageViewHeight = $(window).height();
        this.timer = null;
        this.dataCache = [];
        this.expStatus = false;
        this.init()
    };
    logger.Exposure.prototype = {
        constructor: logger.Exposure,
        add: function (list) {
            var _this = this;
            this.expStatus = true;
            list.each(function (index, el) {
                _this.domCache.push($(el))
            })
        },
        init: function () {
            var wd = $(window),
                self = this;
            wd.resize($.proxy(this.resize, this));
            wd.on("beforeunload", $.proxy(this.beforeunload, this));
            rAf(scroll);

            function scroll() {
                rAf(scroll);
                if (!self.expStatus) {
                    return
                }
                clearTimeout(self.timer);
                if (self.domCache.length === 0) {
                    self.expStatus = false;
                    self.buildData();
                    return
                }
                self.timer = setTimeout(function () {
                    $.proxy(self.addData, self)()
                }, self.ops.delay)
            }
        },
        resize: function () {
            this.pageViewHeight = $(window).height()
        },
        beforeunload: function () {
            this.buildData()
        },
        scroll: function () {},
        sendExp: function (result) {
            logger.sendSoj({
                NGuid: this.ops.NGuid,
                NUid: this.ops.NUid,
                site: this.ops.site,
                page: this.ops.prefix + this.ops.page,
                pageName: this.ops.prefix + this.ops.pageName,
                customparam: result
            })
        },
        addData: function () {
            var pageViewHeight = this.pageViewHeight,
                topY = $(window).scrollTop(),
                botY = topY + pageViewHeight,
                _this = this;
            if (this.domCache.length === 0) {
                return
            }
            $.each(this.domCache, function (index, val) {
                var _topY, attr;
                if (!val) {
                    return
                }
                _topY = val.offset ? val.offset().top : 0;
                if (_topY > topY && _topY < botY) {
                    attr = val.attr(_this.ops.trackTag);
                    if (attr) {
                        _this.dataCache.push(attr)
                    }
                    delete _this.domCache[index]
                }
            });
            this.buildData()
        },
        buildData: function () {
            var _this = this,
                result = {},
                r = [],
                exp, key, length, i;
            if (this.dataCache.length === 0) {
                return
            }
            exp = eval("([" + this.dataCache.join(",") + "])");
            this.dataCache = [];
            for (i = 0, length = exp.length; i < length; i++) {
                for (key in exp[i]) {
                    if (!result[key]) {
                        result[key] = []
                    }
                    result[key].push(exp[i][key])
                }
            }
            for (key in result) {
                r.push('"' + key + '":[' + result[key].join(",") + "]")
            }
            this.sendExp('{"exposure":{' + r.join(",") + "}}");
            $.each(this.domCache, function (index, val) {
                if (!val) {
                    _this.domCache.splice(index, 1)
                }
            })
        }
    };
    window.onerror = function (msg, url, line) {
        logger.sendError({
            message: msg,
            url: url,
            line: line
        })
    };
    $(function () {
        logger.addLinkSoj("a[_soj]");
        if (window.top !== window) {
            $("#trunk").hide()
        }
    })
})();
APF.Namespace.register("ajk");
(function () {
    var a;
    ajk.DropDown = a = ajk.inherit(ajk.Observer, function (d, c, e) {
        var b = this;
        b._op = $.extend({}, {
            timer: 500
        }, e || {});
        b._target = d;
        b._list = c;
        b._timer;
        b.isOpen = false;
        b._bindEvent()
    });
    a.prototype._bindEvent = function () {
        var c = this;
        var b = function () {
            c._timer = setTimeout(function () {
                c.close()
            }, c._op.timer)
        };
        c._target.on("mouseenter", function () {
            if (!c.isOpen) {
                c.open()
            }
        });
        c._target.on("mouseleave", function () {
            if (c.isOpen) {
                b()
            }
        });
        c._list.on("mouseenter", function () {
            clearTimeout(c._timer)
        });
        c._list.on("mouseleave", function () {
            if (c.isOpen) {
                b()
            }
        });
        c._list.on("click", function () {
            c.close()
        })
    };
    a.prototype.open = function () {
        var b = this;
        if (b.trigger("open", arguments) !== false) {
            b.isOpen = true;
            b._list.show()
        }
    };
    a.prototype.close = function () {
        var b = this;
        if (b.trigger("close", arguments) !== false) {
            b.isOpen = false;
            b._list.hide()
        }
    }
})();
APF.Namespace.register("ajk");
(function (a) {
    ajk.DataCache = function (c) {
        var b = this;
        b._cache = [];
        b.source = c
    };
    ajk.DataCache.prototype.get = function (l, k) {
        var m = this,
            g = [],
            n = [],
            h = _.isArray(l) ? l : [l];
        var b = function (o, j) {
            if (!_.isArray(l)) {
                k(o[0], j[0])
            } else {
                k(o, j)
            }
        };
        for (var e = 0; e < h.length; e++) {
            var c = m.find(h[e]);
            if (c !== null) {
                g[e] = c
            } else {
                n.push({
                    id: e,
                    query: h[e]
                })
            }
        }
        if (n.length === 0) {
            b(g, h);
            return
        }
        for (var d = 0, f = 0; d < n.length; d++) {
            (function () {
                var j = n[d];
                m.source(j.query, function (p) {
                    var o = m.add(j.query, p).data;
                    g[j.id] = o;
                    f++;
                    if (f === n.length) {
                        b(g, h)
                    }
                })
            })()
        }
    };
    ajk.DataCache.prototype.add = function (c, e) {
        var b = this,
            d = {
                key: c,
                data: e
            };
        b._cache.push(d);
        return d
    };
    ajk.DataCache.prototype.find = function (f) {
        var d = this,
            c = null,
            e = 0,
            b = d._cache.length;
        for (; e < b; e++) {
            if (_.isEqual(d._cache[e].key, f)) {
                c = d._cache[e].data;
                break
            }
        }
        return c
    }
})(jQuery);
APF.Namespace.register("ajk");
(function (a) {
    ajk.Autocomplete = ajk.inherit(ajk.Observer, function (c, e) {
        var b =
            '<ul class="auto-ul"><% _.each(obj,function(item){ %><li><span><%= item.keyword %></span><b>绾�<%= item.num %>濂�</b></li><%});%><ul>',
            d = {
                dataSource: function () {},
                debounce: 250,
                hasCache: true,
                insertDom: a("body"),
                template: _.template(b),
                itemSelector: "li",
                keySelector: "span",
                cursorClass: "auto-grayback",
                wrap: ".auto-wrap",
                emptyFetch: false
            };
        this.op = a.extend({}, d, e);
        this.op.wrapStyle = a.extend({}, d.wrapStyle, e.wrapStyle);
        this.el = c;
        this._init()
    });
    ajk.Autocomplete.prototype._init = function () {
        this.wrap = null;
        this.sourceChecked = null;
        this.dataCenter = [];
        this.keyword = null;
        this._createWrap();
        this.resetCursored();
        this._checkSource();
        this._delay = false;
        if (this.op.hasCache) {
            this.dataCache = new ajk.DataCache(this.sourceChecked)
        }
        this._bindEvent()
    };
    ajk.Autocomplete.prototype._createWrap = function () {
        if (this.op.wrap.constructor == jQuery) {
            this.wrap = this.op.wrap.eq(0)
        } else {
            if (_.isString(this.op.wrap)) {
                var c = a.trim(this.op.wrap);
                var b = c.substring(0, 1);
                if (b == ".") {
                    this.wrap = a('<div class="' + c.slice(1) + '"></div>')
                } else {
                    if (b == "<") {
                        this.wrap = a(c)
                    }
                }
                this.wrap.appendTo(this.op.insertDom)
            }
        }
    };
    ajk.Autocomplete.prototype._bindEvent = function () {
        this._onKeyup();
        this._onMouseover();
        this._onClick();
        this._onFocus();
        this._onBlur();
        this._isEnterWrap();
        this._onMousedown()
    };
    ajk.Autocomplete.prototype._onKeyup = function () {
        var b = this;
        b.el.on("keyup", function (c) {
            b._updateKeyword();
            switch (c.keyCode) {
                case 35:
                case 36:
                case 16:
                case 17:
                case 18:
                case 37:
                case 39:
                    break;
                case 40:
                    b.cursor(+1, true);
                    break;
                case 38:
                    b.cursor(-1, true);
                    break;
                case 13:
                    if (b.cursorIndex != -1) {
                        b.select(b.wrap.find(b.op.itemSelector).eq(b.cursorIndex))
                    }
                    break;
                default:
                    b._inputCheck(b.keyword);
                    break
            }
        })
    };
    ajk.Autocomplete.prototype._isEnterWrap = function () {
        var b = this;
        b.wrap.on("mouseover", function () {
            b._delay = true
        });
        b.wrap.on("mouseout", function () {
            b._delay = false
        })
    };
    ajk.Autocomplete.prototype._onMouseover = function () {
        var b = this;
        b.wrap.on("mouseover", b.op.itemSelector, function () {
            b.cursorIndex = _index = a(this).index();
            b.cursor(_index)
        })
    };
    ajk.Autocomplete.prototype._onClick = function () {
        var b = this;
        b.wrap.on("click", b.op.itemSelector, function () {
            b.select(a(this))
        })
    };
    ajk.Autocomplete.prototype._onFocus = function () {
        var b = this;
        b.el.on("focus", function () {
            b._updateKeyword();
            b._inputCheck(b.keyword);
            if (b.trigger("onfocus", arguments) !== false) {
                b.el.css("border-color", "#f60")
            }
        })
    };
    ajk.Autocomplete.prototype._onMousedown = function () {
        var b = this;
        b.wrap.on("mousedown", function (c) {
            c.preventDefault();
            b.cancelBlur = true;
            if (b.wrap.find(c.target).length > 0) {
                delete b.cancelBlur
            }
        })
    };
    ajk.Autocomplete.prototype._onBlur = function () {
        var b = this;
        b.el.on("blur", function () {
            if (b.cancelBlur) {
                delete b.cancelBlur;
                return
            }
            if (b.trigger("onblur", arguments) !== false) {
                b.el.css("border-color", "#ccc");
                if (b._delay) {
                    setTimeout(function () {
                        b.hide()
                    }, 150)
                } else {
                    b.hide()
                }
            }
        })
    };
    ajk.Autocomplete.prototype._updateKeyword = function (b) {
        this.keyword = b || this.el.val()
    };
    ajk.Autocomplete.prototype._inputCheck = function (b) {
        if (a.trim(b) === "") {
            this.trigger("empty");
            if (this.op.emptyFetch) {
                this.input(b)
            }
        } else {
            this.input(b)
        }
    };
    ajk.Autocomplete.prototype._checkSource = function () {
        var b = this;
        if (a.isFunction(b.op.dataSource)) {
            b.sourceChecked = _.debounce(b.op.dataSource, b.op.debounce)
        } else {
            if (a.isArray(b.op.dataSource)) {
                b.sourceChecked = b.op.dataSource
            }
        }
    };
    ajk.Autocomplete.prototype._updateData = function () {
        var c = this;
        if (a.isFunction(c.sourceChecked)) {
            if (c.op.hasCache) {
                c.dataCache.get(c.keyword, b)
            } else {
                c.sourceChecked(c.keyword, b)
            }
        } else {
            if (a.isArray(c.sourceChecked)) {
                c.dataCenter = c.sourceChecked;
                c._render()
            }
        }

        function b(d) {
            c.dataCenter = d;
            c._render()
        }
    };
    ajk.Autocomplete.prototype._render = function () {
        this.wrap.html(this.op.template(this.dataCenter));
        this.resetCursored();
        if (this.wrap.find(this.op.itemSelector).length > 0) {
            this.show()
        } else {
            this.hide()
        }
    };
    ajk.Autocomplete.prototype.show = function () {
        this.wrap.show()
    };
    ajk.Autocomplete.prototype.hide = function () {
        this.wrap.hide()
    };
    ajk.Autocomplete.prototype.resetCursored = function () {
        this.cursorIndex = -1;
        this.wrap.find(this.op.itemSelector).removeClass(this.op.cursorClass)
    };
    ajk.Autocomplete.prototype.cursor = function (f, e) {
        var c = this,
            j, b, d = {},
            h = arguments[1] === undefined ? false : arguments[1],
            g = c.wrap.find(c.op.itemSelector);
        if (!h) {
            j = f
        } else {
            j = c.cursorIndex + f;
            if (j > g.length - 1) {
                j = 0
            } else {
                if (j < 0) {
                    j = g.length - 1
                }
            }
        }
        b = g.eq(j);
        d = {
            index: j,
            item: b,
            data: c.dataCenter[j]
        };
        c.cursorIndex = j;
        if (c.trigger("cursored", [d]) !== false) {
            g.removeClass(c.op.cursorClass);
            b.addClass(c.op.cursorClass)
        }
    };
    ajk.Autocomplete.prototype.select = function (e) {
        var d = this,
            g = e.index(),
            f = {
                index: g,
                item: e,
                data: d.dataCenter[g]
            };
        var c = this.trigger("beforeSelected", [f]);
        var b = e.find(d.op.keySelector).text();
        d.el.val(c || b);
        if (this.trigger("selected", [f]) !== false) {
            d.hide()
        }
    };
    ajk.Autocomplete.prototype.input = function (b) {
        if (this.trigger("inputed", arguments) !== false) {
            self.keyword = b;
            this._updateData()
        }
    }
})(jQuery);
APF.Namespace.register("ajk.UserLogin");
(function () {
    var a;
    ajk.UserLogin = a = ajk.inherit(ajk.Observer, function (c) {
        var b = this;
        b._op = $.extend({}, {
            userbox: "#userbox"
        }, c || {});
        b._userDate = null;
        b._init()
    });
    a.prototype._init = function () {
        var b = this;
        b.userbox = $(b._op.userbox);
        if (APF.Utils.getCookie("aQQ_ajkauthinfos")) {
            b._op.getUserInfo({}, function (c) {
                if (c.code === 0) {
                    b._userDate = c.data;
                    b.updateUserInfo()
                }
                b._bindEvent()
            })
        } else {
            b._bindEvent()
        }
    };
    a.prototype._bindEvent = function () {
        var b = this;
        if (!b.isLogin()) {
            new ajk.DropDown($(".brokerlogin>.link"), $(".brokerlogin>ul"))
        }
        new ajk.DropDown($(".userlogin>.link"), $(".userlogin>ul"))
    };
    a.prototype.updateUserInfo = function () {
        var b = this;
        if (!b.isLogin()) {
            return
        }
        var c = b.getUserHtml();
        b.userbox.html(c)
    };
    a.prototype.isLogin = function () {
        return this._userDate && this._userDate.user_id
    };
    a.prototype.getUserHtml = function () {
        var c = this._userDate;
        var k = c.menu_list;
        var b = "";
        for (var f = 0, d = k.length; f < d; f++) {
            var h = k[f];
            for (var e = 0, l = h.length; e < l; e++) {
                b = b + '<li><a href="' + h[e].url + '">' + h[e].name + "</a></li>"
            }
            if (f < d - 1) {
                b = b + '<li class="hr"></li>'
            }
        }
        var g =
            '<div class="userlogin userblock userblockfirst"><i class="icon icon-people"></i><a class="link" href="' +
            c.entry_url + '" rel="nofollow" title="' + c.user_name + '">' + c.user_name +
            '</a><i class="triangle-down"></i><ul>' + b + "</ul></div>";
        return g
    }
})();
(function (a) {
    a(function () {
        var b = function (c) {
            var e = c;
            var d = setTimeout(function () {
                e.hide()
            }, 500);
            e.data("hiddenTimer", d)
        };
        a("#footer").on("click", "[data-target]", function (d) {
            d.preventDefault();
            var c = a(this).data("target");
            a("#" + c).toggle()
        });
        a("#footer").on("mouseout", "[data-target]", function () {
            var c = a(this).data("target");
            b(a("#" + c))
        });
        a("#loan_link, #other_city, #map_link, #house_link, #seo_qa").hover(function () {
            var c = a(this).data("hiddenTimer");
            clearTimeout(c)
        }, function () {
            b(a(this))
        })
    })
})(jQuery);
APF.Namespace.register("ajk.pc");
(function ($) {
    var sideBar;
    ajk.pc.sideBar = sideBar = function (op) {
        this._op = $.extend({}, {
            sideBarBox: $(".sidebar"),
            toTop: $(".sidebar-top"),
            sidebarNav: $(".sidebar-mod a"),
            minWidth: 1280,
            minTop: 400
        }, op || {});
        this.init()
    };
    sideBar.prototype.init = function () {
        var self = this;
        self.addLinkSoj("a[data-soj]");
        self.checkVisible();
        $(window).on("scroll resize", function () {
            self.checkVisible()
        });
        self._op.toTop.on("click", function (e) {
            self.sendSoj({
                site: "anjuke-npv",
                pn: "track_back_top_click"
            });
            $("html,body").animate({
                scrollTop: 0
            }, 100)
        });
        $("#sid_survey").on("click", function () {
            self.sendSoj({
                site: "anjuke-npv",
                pn: "track_survey_click"
            })
        })
    };
    sideBar.prototype.checkVisible = function () {
        var self = this,
            winWidth = $(window).width(),
            scrollTop = $(window).scrollTop();
        if (winWidth > self._op.minWidth) {
            self._op.sideBarBox.show();
            self._op.sideBarBox.stop().animate({
                right: "0px"
            }, 100);
            self._op.toTop.removeClass("sd-top-sig")
        } else {
            self._op.sideBarBox.stop().animate({
                right: "-40px"
            }, 100);
            self._op.toTop.addClass("sd-top-sig")
        }
        if (scrollTop > self._op.minTop) {
            self._op.toTop.show()
        } else {
            self._op.toTop.hide()
        }
        self.slideNav()
    };
    sideBar.prototype.slideNav = function () {
        var self = this;
        self._op.sidebarNav.hover(function () {
            var hoverWidth = $(this).children(".sidebar-nav-hover").hasClass("sidebar-sao") ? "130px" :
                "90px";
            $(this).children(".sidebar-nav-hover").stop().animate({
                width: hoverWidth
            }, 100)
        }, function () {
            $(this).children(".sidebar-nav-hover").stop().animate({
                width: "0px"
            }, 100)
        })
    };
    sideBar.prototype.sendSoj = function (op) {
        var self = this;
        if (ajk && ajk.Logger) {
            ajk.Logger.sendSoj({
                page: op.pn,
                site: op.site,
                pageName: op.pn
            })
        } else {
            if (J && J.site && J.site.trackEvent) {
                J.site.trackEvent(op.pn)
            }
        }
    };
    sideBar.prototype.addLinkSoj = function (selector, attr, param) {
        $("body").on("click", selector, function (e) {
            var soj = $(this).data(attr || "soj") || $(this).attr(attr || "data-soj"),
                _soj = $.trim(soj),
                href = $.trim($(this).attr("href")),
                _param = param || "from",
                _target = $(this).attr("target"),
                _hasTarget = _target !== undefined,
                _href;
            if (!_soj) {
                return
            }
            if (!href) {
                return
            }
            if (href.toLowerCase().indexOf("javascript") === 0) {
                return
            }
            e.preventDefault();
            e.stopPropagation();
            href = href.replace(/(&from=(.)*$)|(\?from=(.)*$)/, "");
            _href = (href.indexOf("?") !== -1) ? href + "&" + _param + "=" + _soj : href + "?" + _param +
                "=" + _soj;
            if (_hasTarget) {
                if (!
                    /*@cc_on!@*/
                    0) {
                    var winoper = window.open(_href, _target);
                    winoper && winoper.focus()
                } else {
                    var _el = document.createElement("a");
                    _el.href = _href;
                    _el.target = _target;
                    $(_el).appendTo("body").get(0).click();
                    $(_el).remove()
                }
            } else {
                location.href = _href
            }
        })
    }
})(jQuery);
APF.Namespace.register("ajk.Filter");
(function (a) {
    ajk.Filter.Range = function (d, g, f, c) {
        a("body").on("click", function (h) {
            var j = a(h.srcElement || h.target);
            if (!j.is(g) && !j.is(f)) {
                j.is(c) ? b() && d.submit() : c.hide()
            }
        });
        g.add(f).on({
            "focus.text": function () {
                c.show()
            },
            "input keyup": function () {
                a(this).val(a(this).val().replace(/[^0-9]/g, ""));
                e()
            }
        });

        function e() {
            g.add(f).each(function () {
                a(this).val().length >= 3 ? a(this).css("width", a(this).val().length * 8 + "px") : a(
                    this).css("width", "24px")
            })
        }

        function b() {
            var h = parseInt(a.trim(g.val()), 10);
            var j = parseInt(a.trim(f.val()), 10);
            a.trim(g.val()) != "" && a.trim(f.val()) != "" && h > j && function () {
                var k = h;
                g.val(j);
                f.val(k);
                g.removeClass("focus");
                f.removeClass("focus")
            }();
            e();
            return true
        }
    }
})(jQuery);

    function c(q, k) {
        for (var o = 0; o < q.length; o++) {
            var l = q[o];
            var p = l.getElementsByTagName("ul");
            var r = l.getElementsByTagName("li");
            if (p.length) {
                for (var m = 0; m < r.length; m++) {
                    var n = r[m];
                    if (d(n, "tab-" + k)) {
                        (function (u, v, s, t) {
                            t.onmouseover = function () {
                                for (var j = 0; j < u.length; j++) {
                                    g(u[j], "btn-show")
                                }
                                for (var j = 0; j < v.length; j++) {
                                    g(v[j].getElementsByTagName("a")[0], "current-tab")
                                }
                                e(u[s], "btn-show");
                                e(t.getElementsByTagName("a")[0], "current-tab")
                            }
                        })(p, r, m, n)
                    }
                }
                c(p, k + 1)
            }
        }
    }

    function f(r, t, o) {
        if (r.length) {
            var j = new Array(),
                p = r[0].parentNode.getElementsByTagName("ul");
            for (var l = 0; l < p.length; l++) {
                d(p[l], "parent-" + (t + 1)) && j.push(p[l])
            }
            if (j.length) {
                for (var l = 0; l < r.length; l++) {
                    var s = r[l];
                    (function (y, w, u, n, x) {
                        n.onmouseover = function () {
                            for (var z = 0; z < y.length; z++) {
                                g(y[z], "btn-show")
                            }
                            for (var z = 0; z < w.length; z++) {
                                g(w[z].getElementsByTagName("a")[0], "current-tab")
                            }
                            e(y[u], "btn-show");
                            e(n.getElementsByTagName("a")[0], "btn-show");
                            if (x) {
                                for (var v = 0; v < w.length; v++) {
                                    g(w[v].getElementsByTagName("a")[0], "cur")
                                }
                                e(n.getElementsByTagName("a")[0], "cur")
                            }
                        }
                    })(j, r, l, s, o)
                }
                t++;
                for (var q = 0; q < j.length; q++) {
                    var m = [];
                    for (var k = 0; k < j[q].getElementsByTagName("li").length; k++) {
                        d(j[q].getElementsByTagName("li")[k], "tab-" + t) && m.push(j[q].getElementsByTagName("li")[
                            k])
                    }
                    f(m, t, 0)
                }
            }
        }
    }

    function d(k, j) {
        return k.className.match(new RegExp("(\\s|^)" + j + "(\\s|$)"))
    }

    function e(k, j) {
        if (!d(k, j)) {
            k.className += " " + j
        }
    }

    function g(l, j) {
        if (d(l, j)) {
            var k = new RegExp("(\\s|^)" + j + "(\\s|$)");
            l.className = l.className.replace(k, "")
        }
    }

    function b(m) {
        if (document.getElementByClassName) {
            return document.getElementByClassName(m)
        }
        var k = document.getElementsByTagName("*");
        var j = [];
        for (var l = 0; l < k.length; l++) {
            if (d(k[l], m)) {
                j.push(k[l])
            }
        }
        return j
    };
(function (b) {
    APF.Namespace.register("XF.Syrecomm");
    var a = XF.Syrecomm = function (d) {
        var c = this;
        c.op = b.extend({}, a._default, d);
        c._init()
    };
    a._default = {
        url: "",
        dataObj: {
            fromCode: "default"
        },
        contST: "",
        recTep: "",
        recInfo: ""
    };
    a.prototype._init = function () {
        var c = this,
            d = c.op;
        c._getInfo()
    };
    a.prototype._getInfo = function () {
        var c = this,
            e = c.op;
        e.cont = b(e.contST);
        e.Info = e.cont.find(e.recInfo);
        var d = _.template(b(e.recTep).html());
        b.ajax({
            url: e.url,
            type: "GET",
            dataType: "json",
            data: e.dataObj
        }).done(function (g) {
            if (g.data.length > 0) {
                for (var f = 0; f < g.data.length; f++) {
                    g.data[f].from = e.dataObj.fromCode
                }
                e.cont.show();
                e.Info.html(d(g.data)).show()
            }
        })
    }
})(jQuery);
(function (a) {
    ajk.Filter.Range(a("#area_range_form"), a("#from_area"), a("#to_area"), a("#arearange_search"));
    ajk.Filter.Range(a("#price_range_form"), a("#from_price"), a("#to_price"), a("#pricerange_search"));
    ajk.Filter.Range(a("#day_price_range_form"), a("#day_from_price"), a("#day_to_price"), a(
        "#day_pricerange_search"));
    ajk.Filter.Range(a("#month_price_range_form"), a("#month_from_price"), a("#month_to_price"), a(
        "#month_pricerange_search"))
})(jQuery);
APF.Namespace.register("ajk.SpList");
(function ($) {
    var page = ajk.SpList = function (setting) {
        this.op = $.extend({
            body: $("body"),
            listBox: $("#list-content"),
            recomHead: $("#sp-comhead")
        }, setting);
        this.initial()
    };
    page.prototype.initial = function () {
        var self = this;
        self.bindEvent()
    };
    page.prototype.bindEvent = function () {
        var self = this;
        self.op.body.on("mouseenter", ".list-item", function () {
            $(this).addClass("item-over")
        });
        self.op.body.on("mouseleave", ".list-item", function () {
            $(this).removeClass("item-over")
        });
        self.op.body.on("click", ".list-item", function (evt) {
            var target = $(evt.srcElement || evt.target);
            if (!target.is("a")) {
                if ($(this).attr("_soj")) {
                    var link = $.trim($(this).attr("link")) + "?from=" + $.trim($(this).attr("_soj"))
                } else {
                    var link = $.trim($(this).attr("link"))
                }
                link && redirect(link)
            }
        });
        self.op.body.on("click", ".list-item .address a", function (evt) {
            evt.stopPropagation()
        });

        function redirect(url) {
            if (!
                /*@cc_on!@*/
                0) {
                window.open(url, "_blank")
            } else {
                var a = document.createElement("a");
                a.href = url;
                a.target = "_blank";
                document.body.appendChild(a);
                a.click()
            }
        }
    };
    page.prototype.loadRecom = function (dataObj, param, pgname, url) {
        var tpl = _.template($("#spRecom-tpl").html()),
            self = this;
        $.ajax({
            url: url,
            data: dataObj,
            dataType: "JSON",
            success: function (data) {
                var list = data.data;
                var html = tpl(list);
                if (list.length) {
                    self.op.recomHead.show();
                    self.op.recomHead.after(html)
                } else {
                    return
                }
                var cp = $.extend(true, {}, param),
                    _proids = [];
                _.each(list, function (item) {
                    var _type = item.is_hp;
                    var _str = item.id + "|" + item.broker_id + "|" + item.prop_id + "|" +
                        _type;
                    _proids.push(_str)
                });
                cp.proids = _proids.join(",");
                ajk.Logger.sendSoj({
                    page: pgname,
                    pageName: pgname,
                    site: "anjuke-npv",
                    customparam: JSON.stringify(cp)
                })
            }
        })
    }
})(jQuery);