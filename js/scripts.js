/* jQuery InView */
jQuery(function(e) {
    e.belowthefold = function(t, o) {
        var r = e(window).height() + e(window).scrollTop();
        return r <= e(t).offset().top - o.threshold
    }, e.abovethetop = function(t, o) {
        var r = e(window).scrollTop();
        return r >= e(t).offset().top + e(t).height() - o.threshold
    }, e.rightofscreen = function(t, o) {
        var r = e(window).width() + e(window).scrollLeft();
        return r <= e(t).offset().left - o.threshold
    }, e.leftofscreen = function(t, o) {
        var r = e(window).scrollLeft();
        return r >= e(t).offset().left + e(t).width() - o.threshold
    }, e.inviewport = function(t, o) {
        return !(e.rightofscreen(t, o) || e.leftofscreen(t, o) || e.belowthefold(t, o) || e.abovethetop(t, o))
    }, e.extend(e.expr[":"], {
        "below-the-fold": function(t) {
            return e.belowthefold(t, {
                threshold: 0
            })
        },
        "above-the-top": function(t) {
            return e.abovethetop(t, {
                threshold: 0
            })
        },
        "left-of-screen": function(t) {
            return e.leftofscreen(t, {
                threshold: 0
            })
        },
        "right-of-screen": function(t) {
            return e.rightofscreen(t, {
                threshold: 0
            })
        },
        "in-viewport": function(t) {
            return e.inviewport(t, {
                threshold: 0
            })
        }
    })
});

/* jQuery Scroll To */
! function(a) {
    function b(a) {
        return "object" == typeof a ? a : {
            top: a,
            left: a
        }
    }
    var c = a.scrollTo = function(b, c, d) {
        a(window).scrollTo(b, c, d)
    };
    c.defaults = {
        axis: "xy",
        duration: parseFloat(a.fn.jquery) >= 1.3 ? 0 : 1,
        limit: !0
    }, c.window = function() {
        return a(window)._scrollable()
    }, a.fn._scrollable = function() {
        return this.map(function() {
            var b = this;
            if (b.nodeName && -1 == a.inArray(b.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"])) return b;
            var d = (b.contentWindow || b).document || b.ownerDocument || b;
            return /webkit/i.test(navigator.userAgent) || "BackCompat" == d.compatMode ? d.body : d.documentElement
        })
    }, a.fn.scrollTo = function(d, e, f) {
        return "object" == typeof e && (f = e, e = 0), "function" == typeof f && (f = {
            onAfter: f
        }), "max" == d && (d = 9e9), f = a.extend({}, c.defaults, f), e = e || f.duration, f.queue = f.queue && f.axis.length > 1, f.queue && (e /= 2), f.offset = b(f.offset), f.over = b(f.over), this._scrollable().each(function() {
            function g(a) {
                j.animate(l, e, f.easing, a && function() {
                    a.call(this, d, f)
                })
            }
            if (d) {
                var h, i = this,
                    j = a(i),
                    k = d,
                    l = {},
                    m = j.is("html,body");
                switch (typeof k) {
                    case "number":
                    case "string":
                        if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(k)) {
                            k = b(k);
                            break
                        }
                        if (k = a(k, this), !k.length) return;
                    case "object":
                        (k.is || k.style) && (h = (k = a(k)).offset())
                }
                a.each(f.axis.split(""), function(a, b) {
                    var d = "x" == b ? "Left" : "Top",
                        e = d.toLowerCase(),
                        n = "scroll" + d,
                        o = i[n],
                        p = c.max(i, b);
                    if (h) l[n] = h[e] + (m ? 0 : o - j.offset()[e]), f.margin && (l[n] -= parseInt(k.css("margin" + d)) || 0, l[n] -= parseInt(k.css("border" + d + "Width")) || 0), l[n] += f.offset[e] || 0, f.over[e] && (l[n] += k["x" == b ? "width" : "height"]() * f.over[e]);
                    else {
                        var q = k[e];
                        l[n] = q.slice && "%" == q.slice(-1) ? parseFloat(q) / 100 * p : q
                    }
                    f.limit && /^\d+$/.test(l[n]) && (l[n] = l[n] <= 0 ? 0 : Math.min(l[n], p)), !a && f.queue && (o != l[n] && g(f.onAfterFirst), delete l[n])
                }), g(f.onAfter)
            }
        }).end()
    }, c.max = function(b, c) {
        var d = "x" == c ? "Width" : "Height",
            e = "scroll" + d;
        if (!a(b).is("html,body")) return b[e] - a(b)[d.toLowerCase()]();
        var f = "client" + d,
            g = b.ownerDocument.documentElement,
            h = b.ownerDocument.body;
        return Math.max(g[e], h[e]) - Math.min(g[f], h[f])
    }
}(jQuery);

/* jQuery Isotope */
(function(t) {
    function e() {}

    function i(t) {
        function i(e) {
            e.prototype.option || (e.prototype.option = function(e) {
                t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
            })
        }

        function n(e, i) {
            t.fn[e] = function(n) {
                if ("string" == typeof n) {
                    for (var s = o.call(arguments, 1), a = 0, p = this.length; p > a; a++) {
                        var u = this[a],
                            h = t.data(u, e);
                        if (h)
                            if (t.isFunction(h[n]) && "_" !== n.charAt(0)) {
                                var f = h[n].apply(h, s);
                                if (void 0 !== f) return f
                            } else r("no such method '" + n + "' for " + e + " instance");
                        else r("cannot call methods on " + e + " prior to initialization; " + "attempted to call '" + n + "'")
                    }
                    return this
                }
                return this.each(function() {
                    var o = t.data(this, e);
                    o ? (o.option(n), o._init()) : (o = new i(this, n), t.data(this, e, o))
                })
            }
        }
        if (t) {
            var r = "undefined" == typeof console ? e : function(t) {
                console.error(t)
            };
            return t.bridget = function(t, e) {
                i(e), n(t, e)
            }, t.bridget
        }
    }
    var o = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : i(t.jQuery)
})(window),
function(t) {
    function e(e) {
        var i = t.event;
        return i.target = i.target || i.srcElement || e, i
    }
    var i = document.documentElement,
        o = function() {};
    i.addEventListener ? o = function(t, e, i) {
        t.addEventListener(e, i, !1)
    } : i.attachEvent && (o = function(t, i, o) {
        t[i + o] = o.handleEvent ? function() {
            var i = e(t);
            o.handleEvent.call(o, i)
        } : function() {
            var i = e(t);
            o.call(t, i)
        }, t.attachEvent("on" + i, t[i + o])
    });
    var n = function() {};
    i.removeEventListener ? n = function(t, e, i) {
        t.removeEventListener(e, i, !1)
    } : i.detachEvent && (n = function(t, e, i) {
        t.detachEvent("on" + e, t[e + i]);
        try {
            delete t[e + i]
        } catch (o) {
            t[e + i] = void 0
        }
    });
    var r = {
        bind: o,
        unbind: n
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", r) : "object" == typeof exports ? module.exports = r : t.eventie = r
}(this),
function(t) {
    function e(t) {
        "function" == typeof t && (e.isReady ? t() : r.push(t))
    }

    function i(t) {
        var i = "readystatechange" === t.type && "complete" !== n.readyState;
        if (!e.isReady && !i) {
            e.isReady = !0;
            for (var o = 0, s = r.length; s > o; o++) {
                var a = r[o];
                a()
            }
        }
    }

    function o(o) {
        return o.bind(n, "DOMContentLoaded", i), o.bind(n, "readystatechange", i), o.bind(t, "load", i), e
    }
    var n = t.document,
        r = [];
    e.isReady = !1, "function" == typeof define && define.amd ? (e.isReady = "function" == typeof requirejs, define("doc-ready/doc-ready", ["eventie/eventie"], o)) : t.docReady = o(t.eventie)
}(this),
function() {
    function t() {}

    function e(t, e) {
        for (var i = t.length; i--;)
            if (t[i].listener === e) return i;
        return -1
    }

    function i(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }
    var o = t.prototype,
        n = this,
        r = n.EventEmitter;
    o.getListeners = function(t) {
        var e, i, o = this._getEvents();
        if (t instanceof RegExp) {
            e = {};
            for (i in o) o.hasOwnProperty(i) && t.test(i) && (e[i] = o[i])
        } else e = o[t] || (o[t] = []);
        return e
    }, o.flattenListeners = function(t) {
        var e, i = [];
        for (e = 0; t.length > e; e += 1) i.push(t[e].listener);
        return i
    }, o.getListenersAsObject = function(t) {
        var e, i = this.getListeners(t);
        return i instanceof Array && (e = {}, e[t] = i), e || i
    }, o.addListener = function(t, i) {
        var o, n = this.getListenersAsObject(t),
            r = "object" == typeof i;
        for (o in n) n.hasOwnProperty(o) && -1 === e(n[o], i) && n[o].push(r ? i : {
            listener: i,
            once: !1
        });
        return this
    }, o.on = i("addListener"), o.addOnceListener = function(t, e) {
        return this.addListener(t, {
            listener: e,
            once: !0
        })
    }, o.once = i("addOnceListener"), o.defineEvent = function(t) {
        return this.getListeners(t), this
    }, o.defineEvents = function(t) {
        for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
        return this
    }, o.removeListener = function(t, i) {
        var o, n, r = this.getListenersAsObject(t);
        for (n in r) r.hasOwnProperty(n) && (o = e(r[n], i), -1 !== o && r[n].splice(o, 1));
        return this
    }, o.off = i("removeListener"), o.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e)
    }, o.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e)
    }, o.manipulateListeners = function(t, e, i) {
        var o, n, r = t ? this.removeListener : this.addListener,
            s = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (o = i.length; o--;) r.call(this, e, i[o]);
        else
            for (o in e) e.hasOwnProperty(o) && (n = e[o]) && ("function" == typeof n ? r.call(this, o, n) : s.call(this, o, n));
        return this
    }, o.removeEvent = function(t) {
        var e, i = typeof t,
            o = this._getEvents();
        if ("string" === i) delete o[t];
        else if (t instanceof RegExp)
            for (e in o) o.hasOwnProperty(e) && t.test(e) && delete o[e];
        else delete this._events;
        return this
    }, o.removeAllListeners = i("removeEvent"), o.emitEvent = function(t, e) {
        var i, o, n, r, s = this.getListenersAsObject(t);
        for (n in s)
            if (s.hasOwnProperty(n))
                for (o = s[n].length; o--;) i = s[n][o], i.once === !0 && this.removeListener(t, i.listener), r = i.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, i.listener);
        return this
    }, o.trigger = i("emitEvent"), o.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, o.setOnceReturnValue = function(t) {
        return this._onceReturnValue = t, this
    }, o._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, o._getEvents = function() {
        return this._events || (this._events = {})
    }, t.noConflict = function() {
        return n.EventEmitter = r, t
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
}.call(this),
    function(t) {
        function e(t) {
            if (t) {
                if ("string" == typeof o[t]) return t;
                t = t.charAt(0).toUpperCase() + t.slice(1);
                for (var e, n = 0, r = i.length; r > n; n++)
                    if (e = i[n] + t, "string" == typeof o[e]) return e
            }
        }
        var i = "Webkit Moz ms Ms O".split(" "),
            o = document.documentElement.style;
        "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
            return e
        }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
    }(window),
    function(t) {
        function e(t) {
            var e = parseFloat(t),
                i = -1 === t.indexOf("%") && !isNaN(e);
            return i && e
        }

        function i() {
            for (var t = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, e = 0, i = s.length; i > e; e++) {
                var o = s[e];
                t[o] = 0
            }
            return t
        }

        function o(t) {
            function o(t) {
                if ("string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                    var o = r(t);
                    if ("none" === o.display) return i();
                    var n = {};
                    n.width = t.offsetWidth, n.height = t.offsetHeight;
                    for (var h = n.isBorderBox = !(!u || !o[u] || "border-box" !== o[u]), f = 0, c = s.length; c > f; f++) {
                        var l = s[f],
                            d = o[l];
                        d = a(t, d);
                        var y = parseFloat(d);
                        n[l] = isNaN(y) ? 0 : y
                    }
                    var m = n.paddingLeft + n.paddingRight,
                        g = n.paddingTop + n.paddingBottom,
                        v = n.marginLeft + n.marginRight,
                        _ = n.marginTop + n.marginBottom,
                        I = n.borderLeftWidth + n.borderRightWidth,
                        L = n.borderTopWidth + n.borderBottomWidth,
                        z = h && p,
                        S = e(o.width);
                    S !== !1 && (n.width = S + (z ? 0 : m + I));
                    var b = e(o.height);
                    return b !== !1 && (n.height = b + (z ? 0 : g + L)), n.innerWidth = n.width - (m + I), n.innerHeight = n.height - (g + L), n.outerWidth = n.width + v, n.outerHeight = n.height + _, n
                }
            }

            function a(t, e) {
                if (n || -1 === e.indexOf("%")) return e;
                var i = t.style,
                    o = i.left,
                    r = t.runtimeStyle,
                    s = r && r.left;
                return s && (r.left = t.currentStyle.left), i.left = e, e = i.pixelLeft, i.left = o, s && (r.left = s), e
            }
            var p, u = t("boxSizing");
            return function() {
                if (u) {
                    var t = document.createElement("div");
                    t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style[u] = "border-box";
                    var i = document.body || document.documentElement;
                    i.appendChild(t);
                    var o = r(t);
                    p = 200 === e(o.width), i.removeChild(t)
                }
            }(), o
        }
        var n = t.getComputedStyle,
            r = n ? function(t) {
                return n(t, null)
            } : function(t) {
                return t.currentStyle
            },
            s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], o) : "object" == typeof exports ? module.exports = o(require("get-style-property")) : t.getSize = o(t.getStyleProperty)
    }(window),
    function(t, e) {
        function i(t, e) {
            return t[a](e)
        }

        function o(t) {
            if (!t.parentNode) {
                var e = document.createDocumentFragment();
                e.appendChild(t)
            }
        }

        function n(t, e) {
            o(t);
            for (var i = t.parentNode.querySelectorAll(e), n = 0, r = i.length; r > n; n++)
                if (i[n] === t) return !0;
            return !1
        }

        function r(t, e) {
            return o(t), i(t, e)
        }
        var s, a = function() {
            if (e.matchesSelector) return "matchesSelector";
            for (var t = ["webkit", "moz", "ms", "o"], i = 0, o = t.length; o > i; i++) {
                var n = t[i],
                    r = n + "MatchesSelector";
                if (e[r]) return r
            }
        }();
        if (a) {
            var p = document.createElement("div"),
                u = i(p, "div");
            s = u ? i : r
        } else s = n;
        "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
            return s
        }) : window.matchesSelector = s
    }(this, Element.prototype),
    function(t) {
        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function i(t) {
            for (var e in t) return !1;
            return e = null, !0
        }

        function o(t) {
            return t.replace(/([A-Z])/g, function(t) {
                return "-" + t.toLowerCase()
            })
        }

        function n(t, n, r) {
            function a(t, e) {
                t && (this.element = t, this.layout = e, this.position = {
                    x: 0,
                    y: 0
                }, this._create())
            }
            var p = r("transition"),
                u = r("transform"),
                h = p && u,
                f = !!r("perspective"),
                c = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "otransitionend",
                    transition: "transitionend"
                } [p],
                l = ["transform", "transition", "transitionDuration", "transitionProperty"],
                d = function() {
                    for (var t = {}, e = 0, i = l.length; i > e; e++) {
                        var o = l[e],
                            n = r(o);
                        n && n !== o && (t[o] = n)
                    }
                    return t
                }();
            e(a.prototype, t.prototype), a.prototype._create = function() {
                this._transn = {
                    ingProperties: {},
                    clean: {},
                    onEnd: {}
                }, this.css({
                    position: "absolute"
                })
            }, a.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, a.prototype.getSize = function() {
                this.size = n(this.element)
            }, a.prototype.css = function(t) {
                var e = this.element.style;
                for (var i in t) {
                    var o = d[i] || i;
                    e[o] = t[i]
                }
            }, a.prototype.getPosition = function() {
                var t = s(this.element),
                    e = this.layout.options,
                    i = e.isOriginLeft,
                    o = e.isOriginTop,
                    n = parseInt(t[i ? "left" : "right"], 10),
                    r = parseInt(t[o ? "top" : "bottom"], 10);
                n = isNaN(n) ? 0 : n, r = isNaN(r) ? 0 : r;
                var a = this.layout.size;
                n -= i ? a.paddingLeft : a.paddingRight, r -= o ? a.paddingTop : a.paddingBottom, this.position.x = n, this.position.y = r
            }, a.prototype.layoutPosition = function() {
                var t = this.layout.size,
                    e = this.layout.options,
                    i = {};
                e.isOriginLeft ? (i.left = this.position.x + t.paddingLeft + "px", i.right = "") : (i.right = this.position.x + t.paddingRight + "px", i.left = ""), e.isOriginTop ? (i.top = this.position.y + t.paddingTop + "px", i.bottom = "") : (i.bottom = this.position.y + t.paddingBottom + "px", i.top = ""), this.css(i), this.emitEvent("layout", [this])
            };
            var y = f ? function(t, e) {
                return "translate3d(" + t + "px, " + e + "px, 0)"
            } : function(t, e) {
                return "translate(" + t + "px, " + e + "px)"
            };
            a.prototype._transitionTo = function(t, e) {
                this.getPosition();
                var i = this.position.x,
                    o = this.position.y,
                    n = parseInt(t, 10),
                    r = parseInt(e, 10),
                    s = n === this.position.x && r === this.position.y;
                if (this.setPosition(t, e), s && !this.isTransitioning) return this.layoutPosition(), void 0;
                var a = t - i,
                    p = e - o,
                    u = {},
                    h = this.layout.options;
                a = h.isOriginLeft ? a : -a, p = h.isOriginTop ? p : -p, u.transform = y(a, p), this.transition({
                    to: u,
                    onTransitionEnd: {
                        transform: this.layoutPosition
                    },
                    isCleaning: !0
                })
            }, a.prototype.goTo = function(t, e) {
                this.setPosition(t, e), this.layoutPosition()
            }, a.prototype.moveTo = h ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function(t, e) {
                this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
            }, a.prototype._nonTransition = function(t) {
                this.css(t.to), t.isCleaning && this._removeStyles(t.to);
                for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
            }, a.prototype._transition = function(t) {
                if (!parseFloat(this.layout.options.transitionDuration)) return this._nonTransition(t), void 0;
                var e = this._transn;
                for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
                for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
                if (t.from) {
                    this.css(t.from);
                    var o = this.element.offsetHeight;
                    o = null
                }
                this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
            };
            var m = u && o(u) + ",opacity";
            a.prototype.enableTransition = function() {
                this.isTransitioning || (this.css({
                    transitionProperty: m,
                    transitionDuration: this.layout.options.transitionDuration
                }), this.element.addEventListener(c, this, !1))
            }, a.prototype.transition = a.prototype[p ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function(t) {
                this.ontransitionend(t)
            }, a.prototype.onotransitionend = function(t) {
                this.ontransitionend(t)
            };
            var g = {
                "-webkit-transform": "transform",
                "-moz-transform": "transform",
                "-o-transform": "transform"
            };
            a.prototype.ontransitionend = function(t) {
                if (t.target === this.element) {
                    var e = this._transn,
                        o = g[t.propertyName] || t.propertyName;
                    if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
                        var n = e.onEnd[o];
                        n.call(this), delete e.onEnd[o]
                    }
                    this.emitEvent("transitionEnd", [this])
                }
            }, a.prototype.disableTransition = function() {
                this.removeTransitionStyles(), this.element.removeEventListener(c, this, !1), this.isTransitioning = !1
            }, a.prototype._removeStyles = function(t) {
                var e = {};
                for (var i in t) e[i] = "";
                this.css(e)
            };
            var v = {
                transitionProperty: "",
                transitionDuration: ""
            };
            return a.prototype.removeTransitionStyles = function() {
                this.css(v)
            }, a.prototype.removeElem = function() {
                this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
            }, a.prototype.remove = function() {
                if (!p || !parseFloat(this.layout.options.transitionDuration)) return this.removeElem(), void 0;
                var t = this;
                this.on("transitionEnd", function() {
                    return t.removeElem(), !0
                }), this.hide()
            }, a.prototype.reveal = function() {
                delete this.isHidden, this.css({
                    display: ""
                });
                var t = this.layout.options;
                this.transition({
                    from: t.hiddenStyle,
                    to: t.visibleStyle,
                    isCleaning: !0
                })
            }, a.prototype.hide = function() {
                this.isHidden = !0, this.css({
                    display: ""
                });
                var t = this.layout.options;
                this.transition({
                    from: t.visibleStyle,
                    to: t.hiddenStyle,
                    isCleaning: !0,
                    onTransitionEnd: {
                        opacity: function() {
                            this.isHidden && this.css({
                                display: "none"
                            })
                        }
                    }
                })
            }, a.prototype.destroy = function() {
                this.css({
                    position: "",
                    left: "",
                    right: "",
                    top: "",
                    bottom: "",
                    transition: "",
                    transform: ""
                })
            }, a
        }
        var r = document.defaultView,
            s = r && r.getComputedStyle ? function(t) {
                return r.getComputedStyle(t, null)
            } : function(t) {
                return t.currentStyle
            };
        "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], n) : (t.Outlayer = {}, t.Outlayer.Item = n(t.EventEmitter, t.getSize, t.getStyleProperty))
    }(window),
    function(t) {
        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function i(t) {
            return "[object Array]" === f.call(t)
        }

        function o(t) {
            var e = [];
            if (i(t)) e = t;
            else if (t && "number" == typeof t.length)
                for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
            else e.push(t);
            return e
        }

        function n(t, e) {
            var i = l(e, t); - 1 !== i && e.splice(i, 1)
        }

        function r(t) {
            return t.replace(/(.)([A-Z])/g, function(t, e, i) {
                return e + "-" + i
            }).toLowerCase()
        }

        function s(i, s, f, l, d, y) {
            function m(t, i) {
                if ("string" == typeof t && (t = a.querySelector(t)), !t || !c(t)) return p && p.error("Bad " + this.constructor.namespace + " element: " + t), void 0;
                this.element = t, this.options = e({}, this.options), this.option(i);
                var o = ++v;
                this.element.outlayerGUID = o, _[o] = this, this._create(), this.options.isInitLayout && this.layout()
            }

            function g(t, i) {
                t.prototype[i] = e({}, m.prototype[i])
            }
            var v = 0,
                _ = {};
            return m.namespace = "outlayer", m.Item = y, m.prototype.options = {
                containerStyle: {
                    position: "relative"
                },
                isInitLayout: !0,
                isOriginLeft: !0,
                isOriginTop: !0,
                isResizeBound: !0,
                transitionDuration: "0.4s",
                hiddenStyle: {
                    opacity: 0,
                    transform: "scale(0.001)"
                },
                visibleStyle: {
                    opacity: 1,
                    transform: "scale(1)"
                }
            }, e(m.prototype, f.prototype), m.prototype.option = function(t) {
                e(this.options, t)
            }, m.prototype._create = function() {
                this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
            }, m.prototype.reloadItems = function() {
                this.items = this._itemize(this.element.children)
            }, m.prototype._itemize = function(t) {
                for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0, r = e.length; r > n; n++) {
                    var s = e[n],
                        a = new i(s, this);
                    o.push(a)
                }
                return o
            }, m.prototype._filterFindItemElements = function(t) {
                t = o(t);
                for (var e = this.options.itemSelector, i = [], n = 0, r = t.length; r > n; n++) {
                    var s = t[n];
                    if (c(s))
                        if (e) {
                            d(s, e) && i.push(s);
                            for (var a = s.querySelectorAll(e), p = 0, u = a.length; u > p; p++) i.push(a[p])
                        } else i.push(s)
                }
                return i
            }, m.prototype.getItemElements = function() {
                for (var t = [], e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].element);
                return t
            }, m.prototype.layout = function() {
                this._resetLayout(), this._manageStamps();
                var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
                this.layoutItems(this.items, t), this._isLayoutInited = !0
            }, m.prototype._init = m.prototype.layout, m.prototype._resetLayout = function() {
                this.getSize()
            }, m.prototype.getSize = function() {
                this.size = l(this.element)
            }, m.prototype._getMeasurement = function(t, e) {
                var i, o = this.options[t];
                o ? ("string" == typeof o ? i = this.element.querySelector(o) : c(o) && (i = o), this[t] = i ? l(i)[e] : o) : this[t] = 0
            }, m.prototype.layoutItems = function(t, e) {
                t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
            }, m.prototype._getItemsForLayout = function(t) {
                for (var e = [], i = 0, o = t.length; o > i; i++) {
                    var n = t[i];
                    n.isIgnored || e.push(n)
                }
                return e
            }, m.prototype._layoutItems = function(t, e) {
                function i() {
                    o.emitEvent("layoutComplete", [o, t])
                }
                var o = this;
                if (!t || !t.length) return i(), void 0;
                this._itemsOn(t, "layout", i);
                for (var n = [], r = 0, s = t.length; s > r; r++) {
                    var a = t[r],
                        p = this._getItemLayoutPosition(a);
                    p.item = a, p.isInstant = e || a.isLayoutInstant, n.push(p)
                }
                this._processLayoutQueue(n)
            }, m.prototype._getItemLayoutPosition = function() {
                return {
                    x: 0,
                    y: 0
                }
            }, m.prototype._processLayoutQueue = function(t) {
                for (var e = 0, i = t.length; i > e; e++) {
                    var o = t[e];
                    this._positionItem(o.item, o.x, o.y, o.isInstant)
                }
            }, m.prototype._positionItem = function(t, e, i, o) {
                o ? t.goTo(e, i) : t.moveTo(e, i)
            }, m.prototype._postLayout = function() {
                var t = this._getContainerSize();
                t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
            }, m.prototype._getContainerSize = h, m.prototype._setContainerMeasure = function(t, e) {
                if (void 0 !== t) {
                    var i = this.size;
                    i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
                }
            }, m.prototype._itemsOn = function(t, e, i) {
                function o() {
                    return n++, n === r && i.call(s), !0
                }
                for (var n = 0, r = t.length, s = this, a = 0, p = t.length; p > a; a++) {
                    var u = t[a];
                    u.on(e, o)
                }
            }, m.prototype.ignore = function(t) {
                var e = this.getItem(t);
                e && (e.isIgnored = !0)
            }, m.prototype.unignore = function(t) {
                var e = this.getItem(t);
                e && delete e.isIgnored
            }, m.prototype.stamp = function(t) {
                if (t = this._find(t)) {
                    this.stamps = this.stamps.concat(t);
                    for (var e = 0, i = t.length; i > e; e++) {
                        var o = t[e];
                        this.ignore(o)
                    }
                }
            }, m.prototype.unstamp = function(t) {
                if (t = this._find(t))
                    for (var e = 0, i = t.length; i > e; e++) {
                        var o = t[e];
                        n(o, this.stamps), this.unignore(o)
                    }
            }, m.prototype._find = function(t) {
                return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = o(t)) : void 0
            }, m.prototype._manageStamps = function() {
                if (this.stamps && this.stamps.length) {
                    this._getBoundingRect();
                    for (var t = 0, e = this.stamps.length; e > t; t++) {
                        var i = this.stamps[t];
                        this._manageStamp(i)
                    }
                }
            }, m.prototype._getBoundingRect = function() {
                var t = this.element.getBoundingClientRect(),
                    e = this.size;
                this._boundingRect = {
                    left: t.left + e.paddingLeft + e.borderLeftWidth,
                    top: t.top + e.paddingTop + e.borderTopWidth,
                    right: t.right - (e.paddingRight + e.borderRightWidth),
                    bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
                }
            }, m.prototype._manageStamp = h, m.prototype._getElementOffset = function(t) {
                var e = t.getBoundingClientRect(),
                    i = this._boundingRect,
                    o = l(t),
                    n = {
                        left: e.left - i.left - o.marginLeft,
                        top: e.top - i.top - o.marginTop,
                        right: i.right - e.right - o.marginRight,
                        bottom: i.bottom - e.bottom - o.marginBottom
                    };
                return n
            }, m.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, m.prototype.bindResize = function() {
                this.isResizeBound || (i.bind(t, "resize", this), this.isResizeBound = !0)
            }, m.prototype.unbindResize = function() {
                i.unbind(t, "resize", this), this.isResizeBound = !1
            }, m.prototype.onresize = function() {
                function t() {
                    e.resize(), delete e.resizeTimeout
                }
                this.resizeTimeout && clearTimeout(this.resizeTimeout);
                var e = this;
                this.resizeTimeout = setTimeout(t, 100)
            }, m.prototype.resize = function() {
                var t = l(this.element),
                    e = this.size && t;
                e && t.innerWidth === this.size.innerWidth || this.layout()
            }, m.prototype.addItems = function(t) {
                var e = this._itemize(t);
                return e.length && (this.items = this.items.concat(e)), e
            }, m.prototype.appended = function(t) {
                var e = this.addItems(t);
                e.length && (this.layoutItems(e, !0), this.reveal(e))
            }, m.prototype.prepended = function(t) {
                var e = this._itemize(t);
                if (e.length) {
                    var i = this.items.slice(0);
                    this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
                }
            }, m.prototype.reveal = function(t) {
                var e = t && t.length;
                if (e)
                    for (var i = 0; e > i; i++) {
                        var o = t[i];
                        o.reveal()
                    }
            }, m.prototype.hide = function(t) {
                var e = t && t.length;
                if (e)
                    for (var i = 0; e > i; i++) {
                        var o = t[i];
                        o.hide()
                    }
            }, m.prototype.getItem = function(t) {
                for (var e = 0, i = this.items.length; i > e; e++) {
                    var o = this.items[e];
                    if (o.element === t) return o
                }
            }, m.prototype.getItems = function(t) {
                if (t && t.length) {
                    for (var e = [], i = 0, o = t.length; o > i; i++) {
                        var n = t[i],
                            r = this.getItem(n);
                        r && e.push(r)
                    }
                    return e
                }
            }, m.prototype.remove = function(t) {
                t = o(t);
                var e = this.getItems(t);
                if (e && e.length) {
                    this._itemsOn(e, "remove", function() {
                        this.emitEvent("removeComplete", [this, e])
                    });
                    for (var i = 0, r = e.length; r > i; i++) {
                        var s = e[i];
                        s.remove(), n(s, this.items)
                    }
                }
            }, m.prototype.destroy = function() {
                var t = this.element.style;
                t.height = "", t.position = "", t.width = "";
                for (var e = 0, i = this.items.length; i > e; e++) {
                    var o = this.items[e];
                    o.destroy()
                }
                this.unbindResize(), delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace)
            }, m.data = function(t) {
                var e = t && t.outlayerGUID;
                return e && _[e]
            }, m.create = function(t, i) {
                function o() {
                    m.apply(this, arguments)
                }
                return Object.create ? o.prototype = Object.create(m.prototype) : e(o.prototype, m.prototype), o.prototype.constructor = o, g(o, "options"), e(o.prototype.options, i), o.namespace = t, o.data = m.data, o.Item = function() {
                    y.apply(this, arguments)
                }, o.Item.prototype = new y, s(function() {
                    for (var e = r(t), i = a.querySelectorAll(".js-" + e), n = "data-" + e + "-options", s = 0, h = i.length; h > s; s++) {
                        var f, c = i[s],
                            l = c.getAttribute(n);
                        try {
                            f = l && JSON.parse(l)
                        } catch (d) {
                            p && p.error("Error parsing " + n + " on " + c.nodeName.toLowerCase() + (c.id ? "#" + c.id : "") + ": " + d);
                            continue
                        }
                        var y = new o(c, f);
                        u && u.data(c, t, y)
                    }
                }), u && u.bridget && u.bridget(t, o), o
            }, m.Item = y, m
        }
        var a = t.document,
            p = t.console,
            u = t.jQuery,
            h = function() {},
            f = Object.prototype.toString,
            c = "object" == typeof HTMLElement ? function(t) {
                return t instanceof HTMLElement
            } : function(t) {
                return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName
            },
            l = Array.prototype.indexOf ? function(t, e) {
                return t.indexOf(e)
            } : function(t, e) {
                for (var i = 0, o = t.length; o > i; i++)
                    if (t[i] === e) return i;
                return -1
            };
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], s) : t.Outlayer = s(t.eventie, t.docReady, t.EventEmitter, t.getSize, t.matchesSelector, t.Outlayer.Item)
    }(window),
    function(t) {
        function e(t) {
            function e() {
                t.Item.apply(this, arguments)
            }
            return e.prototype = new t.Item, e.prototype._create = function() {
                this.id = this.layout.itemGUID++, t.Item.prototype._create.call(this), this.sortData = {}
            }, e.prototype.updateSortData = function() {
                if (!this.isIgnored) {
                    this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                    var t = this.layout.options.getSortData,
                        e = this.layout._sorters;
                    for (var i in t) {
                        var o = e[i];
                        this.sortData[i] = o(this.element, this)
                    }
                }
            }, e
        }
        "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
    }(window),
    function(t) {
        function e(t, e) {
            function i(t) {
                this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
            }
            return function() {
                function t(t) {
                    return function() {
                        return e.prototype[t].apply(this.isotope, arguments)
                    }
                }
                for (var o = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "resize"], n = 0, r = o.length; r > n; n++) {
                    var s = o[n];
                    i.prototype[s] = t(s)
                }
            }(), i.prototype.resizeVertical = function() {
                var e = t(this.isotope.element),
                    i = this.isotope.size && e;
                i && e.innerHeight === this.isotope.size.innerHeight || this.isotope.layout()
            }, i.prototype._getMeasurement = function() {
                this.isotope._getMeasurement.apply(this, arguments)
            }, i.prototype.getColumnWidth = function() {
                this.getSegmentSize("column", "Width")
            }, i.prototype.getRowHeight = function() {
                this.getSegmentSize("row", "Height")
            }, i.prototype.getSegmentSize = function(t, e) {
                var i = t + e,
                    o = "outer" + e;
                if (this._getMeasurement(i, o), !this[i]) {
                    var n = this.getFirstItemSize();
                    this[i] = n && n[o] || this.isotope.size["inner" + e]
                }
            }, i.prototype.getFirstItemSize = function() {
                var e = this.isotope.filteredItems[0];
                return e && e.element && t(e.element)
            }, i.prototype.layout = function() {
                this.isotope.layout.apply(this.isotope, arguments)
            }, i.prototype.getSize = function() {
                this.isotope.getSize(), this.size = this.isotope.size
            }, i.modes = {}, i.create = function(t, e) {
                function o() {
                    i.apply(this, arguments)
                }
                return o.prototype = new i, e && (o.options = e), o.prototype.namespace = t, i.modes[t] = o, o
            }, i
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
    }(window),
    function(t) {
        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function i(t) {
            return "[object Array]" === h.call(t)
        }

        function o(t) {
            var e = [];
            if (i(t)) e = t;
            else if (t && "number" == typeof t.length)
                for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
            else e.push(t);
            return e
        }

        function n(t, e) {
            var i = f(e, t); - 1 !== i && e.splice(i, 1)
        }

        function r(t, i, r, p, h) {
            function f(t, e) {
                return function(i, o) {
                    for (var n = 0, r = t.length; r > n; n++) {
                        var s = t[n],
                            a = i.sortData[s],
                            p = o.sortData[s];
                        if (a > p || p > a) {
                            var u = void 0 !== e[s] ? e[s] : e,
                                h = u ? 1 : -1;
                            return (a > p ? 1 : -1) * h
                        }
                    }
                    return 0
                }
            }
            var c = t.create("isotope", {
                layoutMode: "masonry",
                isJQueryFiltering: !0,
                sortAscending: !0
            });
            c.Item = p, c.LayoutMode = h, c.prototype._create = function() {
                this.itemGUID = 0, this._sorters = {}, this._getSorters(), t.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
                for (var e in h.modes) this._initLayoutMode(e)
            }, c.prototype.reloadItems = function() {
                this.itemGUID = 0, t.prototype.reloadItems.call(this)
            }, c.prototype._itemize = function() {
                for (var e = t.prototype._itemize.apply(this, arguments), i = 0, o = e.length; o > i; i++) {
                    var n = e[i];
                    n.id = this.itemGUID++
                }
                return this._updateItemsSortData(e), e
            }, c.prototype._initLayoutMode = function(t) {
                var i = h.modes[t],
                    o = this.options[t] || {};
                this.options[t] = i.options ? e(i.options, o) : o, this.modes[t] = new i(this)
            }, c.prototype.layout = function() {
                return !this._isLayoutInited && this.options.isInitLayout ? (this.arrange(), void 0) : (this._layout(), void 0)
            }, c.prototype._layout = function() {
                var t = this._getIsInstant();
                this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
            }, c.prototype.arrange = function(t) {
                this.option(t), this._getIsInstant(), this.filteredItems = this._filter(this.items), this._sort(), this._layout()
            }, c.prototype._init = c.prototype.arrange, c.prototype._getIsInstant = function() {
                var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
                return this._isInstant = t
            }, c.prototype._filter = function(t) {
                function e() {
                    f.reveal(n), f.hide(r)
                }
                var i = this.options.filter;
                i = i || "*";
                for (var o = [], n = [], r = [], s = this._getFilterTest(i), a = 0, p = t.length; p > a; a++) {
                    var u = t[a];
                    if (!u.isIgnored) {
                        var h = s(u);
                        h && o.push(u), h && u.isHidden ? n.push(u) : h || u.isHidden || r.push(u)
                    }
                }
                var f = this;
                return this._isInstant ? this._noTransition(e) : e(), o
            }, c.prototype._getFilterTest = function(t) {
                return s && this.options.isJQueryFiltering ? function(e) {
                    return s(e.element).is(t)
                } : "function" == typeof t ? function(e) {
                    return t(e.element)
                } : function(e) {
                    return r(e.element, t)
                }
            }, c.prototype.updateSortData = function(t) {
                this._getSorters(), t = o(t);
                var e = this.getItems(t);
                e = e.length ? e : this.items, this._updateItemsSortData(e)
            }, c.prototype._getSorters = function() {
                var t = this.options.getSortData;
                for (var e in t) {
                    var i = t[e];
                    this._sorters[e] = l(i)
                }
            }, c.prototype._updateItemsSortData = function(t) {
                for (var e = 0, i = t.length; i > e; e++) {
                    var o = t[e];
                    o.updateSortData()
                }
            };
            var l = function() {
                function t(t) {
                    if ("string" != typeof t) return t;
                    var i = a(t).split(" "),
                        o = i[0],
                        n = o.match(/^\[(.+)\]$/),
                        r = n && n[1],
                        s = e(r, o),
                        p = c.sortDataParsers[i[1]];
                    return t = p ? function(t) {
                        return t && p(s(t))
                    } : function(t) {
                        return t && s(t)
                    }
                }

                function e(t, e) {
                    var i;
                    return i = t ? function(e) {
                        return e.getAttribute(t)
                    } : function(t) {
                        var i = t.querySelector(e);
                        return i && u(i)
                    }
                }
                return t
            }();
            c.sortDataParsers = {
                parseInt: function(t) {
                    return parseInt(t, 10)
                },
                parseFloat: function(t) {
                    return parseFloat(t)
                }
            }, c.prototype._sort = function() {
                var t = this.options.sortBy;
                if (t) {
                    var e = [].concat.apply(t, this.sortHistory),
                        i = f(e, this.options.sortAscending);
                    this.filteredItems.sort(i), t !== this.sortHistory[0] && this.sortHistory.unshift(t)
                }
            }, c.prototype._mode = function() {
                var t = this.options.layoutMode,
                    e = this.modes[t];
                if (!e) throw Error("No layout mode: " + t);
                return e.options = this.options[t], e
            }, c.prototype._resetLayout = function() {
                t.prototype._resetLayout.call(this), this._mode()._resetLayout()
            }, c.prototype._getItemLayoutPosition = function(t) {
                return this._mode()._getItemLayoutPosition(t)
            }, c.prototype._manageStamp = function(t) {
                var e = this._mode();
                e.options.isOriginLeft = this.options.isOriginLeft, e.options.isOriginTop = this.options.isOriginTop, e._manageStamp(t)
            }, c.prototype._getContainerSize = function() {
                return this._mode()._getContainerSize()
            }, c.prototype.resize = function() {
                this._mode().resize()
            }, c.prototype.appended = function(t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i = this._filterRevealAdded(e);
                    this.filteredItems = this.filteredItems.concat(i)
                }
            }, c.prototype.prepended = function(t) {
                var e = this._itemize(t);
                if (e.length) {
                    var i = this.items.slice(0);
                    this.items = e.concat(i), this._resetLayout(), this._manageStamps();
                    var o = this._filterRevealAdded(e);
                    this.layoutItems(i), this.filteredItems = o.concat(this.filteredItems)
                }
            }, c.prototype._filterRevealAdded = function(t) {
                var e = this._noTransition(function() {
                    return this._filter(t)
                });
                return this.layoutItems(e, !0), this.reveal(e), t
            }, c.prototype.insert = function(t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i, o, n = e.length;
                    for (i = 0; n > i; i++) o = e[i], this.element.appendChild(o.element);
                    var r = this._filter(e);
                    for (this._noTransition(function() {
                            this.hide(r)
                        }), i = 0; n > i; i++) e[i].isLayoutInstant = !0;
                    for (this.arrange(), i = 0; n > i; i++) delete e[i].isLayoutInstant;
                    this.reveal(r)
                }
            };
            var d = c.prototype.remove;
            return c.prototype.remove = function(t) {
                t = o(t);
                var e = this.getItems(t);
                if (d.call(this, t), e && e.length)
                    for (var i = 0, r = e.length; r > i; i++) {
                        var s = e[i];
                        n(s, this.filteredItems)
                    }
            }, c.prototype._noTransition = function(t) {
                var e = this.options.transitionDuration;
                this.options.transitionDuration = 0;
                var i = t.call(this);
                return this.options.transitionDuration = e, i
            }, c
        }
        var s = t.jQuery,
            a = String.prototype.trim ? function(t) {
                return t.trim()
            } : function(t) {
                return t.replace(/^\s+|\s+$/g, "")
            },
            p = document.documentElement,
            u = p.textContent ? function(t) {
                return t.textContent
            } : function(t) {
                return t.innerText
            },
            h = Object.prototype.toString,
            f = Array.prototype.indexOf ? function(t, e) {
                return t.indexOf(e)
            } : function(t, e) {
                for (var i = 0, o = t.length; o > i; i++)
                    if (t[i] === e) return i;
                return -1
            };
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "isotope/js/item", "isotope/js/layout-mode"], r) : t.Isotope = r(t.Outlayer, t.getSize, t.matchesSelector, t.Isotope.Item, t.Isotope.LayoutMode)
    }(window),
    function(t) {
        function e(t, e) {
            var o = t.create("masonry");
            return o.prototype._resetLayout = function() {
                this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
                var t = this.cols;
                for (this.colYs = []; t--;) this.colYs.push(0);
                this.maxY = 0
            }, o.prototype.measureColumns = function() {
                if (this.getContainerWidth(), !this.columnWidth) {
                    var t = this.items[0],
                        i = t && t.element;
                    this.columnWidth = i && e(i).outerWidth || this.containerWidth
                }
                this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
            }, o.prototype.getContainerWidth = function() {
                var t = this.options.isFitWidth ? this.element.parentNode : this.element,
                    i = e(t);
                this.containerWidth = i && i.innerWidth
            }, o.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = t.size.outerWidth % this.columnWidth,
                    o = e && 1 > e ? "round" : "ceil",
                    n = Math[o](t.size.outerWidth / this.columnWidth);
                n = Math.min(n, this.cols);
                for (var r = this._getColGroup(n), s = Math.min.apply(Math, r), a = i(r, s), p = {
                        x: this.columnWidth * a,
                        y: s
                    }, u = s + t.size.outerHeight, h = this.cols + 1 - r.length, f = 0; h > f; f++) this.colYs[a + f] = u;
                return p
            }, o.prototype._getColGroup = function(t) {
                if (2 > t) return this.colYs;
                for (var e = [], i = this.cols + 1 - t, o = 0; i > o; o++) {
                    var n = this.colYs.slice(o, o + t);
                    e[o] = Math.max.apply(Math, n)
                }
                return e
            }, o.prototype._manageStamp = function(t) {
                var i = e(t),
                    o = this._getElementOffset(t),
                    n = this.options.isOriginLeft ? o.left : o.right,
                    r = n + i.outerWidth,
                    s = Math.floor(n / this.columnWidth);
                s = Math.max(0, s);
                var a = Math.floor(r / this.columnWidth);
                a -= r % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
                for (var p = (this.options.isOriginTop ? o.top : o.bottom) + i.outerHeight, u = s; a >= u; u++) this.colYs[u] = Math.max(p, this.colYs[u])
            }, o.prototype._getContainerSize = function() {
                this.maxY = Math.max.apply(Math, this.colYs);
                var t = {
                    height: this.maxY
                };
                return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
            }, o.prototype._getContainerFitWidth = function() {
                for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
                return (this.cols - t) * this.columnWidth - this.gutter
            }, o.prototype.resize = function() {
                var t = this.containerWidth;
                this.getContainerWidth(), t !== this.containerWidth && this.layout()
            }, o
        }
        var i = Array.prototype.indexOf ? function(t, e) {
            return t.indexOf(e)
        } : function(t, e) {
            for (var i = 0, o = t.length; o > i; i++) {
                var n = t[i];
                if (n === e) return i
            }
            return -1
        };
        "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : t.Masonry = e(t.Outlayer, t.getSize)
    }(window),
    function(t) {
        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function i(t, i) {
            var o = t.create("masonry"),
                n = o.prototype._getElementOffset,
                r = o.prototype.layout,
                s = o.prototype._getMeasurement;
            e(o.prototype, i.prototype), o.prototype._getElementOffset = n, o.prototype.layout = r, o.prototype._getMeasurement = s;
            var a = o.prototype.measureColumns;
            return o.prototype.measureColumns = function() {
                this.items = this.isotope.filteredItems, a.call(this)
            }, o
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], i) : i(t.Isotope.LayoutMode, t.Masonry)
    }(window),
    function(t) {
        function e(t) {
            var e = t.create("fitRows");
            return e.prototype._resetLayout = function() {
                this.x = 0, this.y = 0, this.maxY = 0
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize(), 0 !== this.x && t.size.outerWidth + this.x > this.isotope.size.innerWidth && (this.x = 0, this.y = this.maxY);
                var e = {
                    x: this.x,
                    y: this.y
                };
                return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += t.size.outerWidth, e
            }, e.prototype._getContainerSize = function() {
                return {
                    height: this.maxY
                }
            }, e
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : e(t.Isotope.LayoutMode)
    }(window),
    function(t) {
        function e(t) {
            var e = t.create("vertical", {
                horizontalAlignment: 0
            });
            return e.prototype._resetLayout = function() {
                this.y = 0
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
                    i = this.y;
                return this.y += t.size.outerHeight, {
                    x: e,
                    y: i
                }
            }, e.prototype._getContainerSize = function() {
                return {
                    height: this.y
                }
            }, e
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : e(t.Isotope.LayoutMode)
    }(window);

/* jQuery Easing */
window.Modernizr = function(e, t, n) {
        function r(e) {
            g.cssText = e
        }

        function a(e, t) {
            return typeof e === t
        }

        function i(e, t) {
            return !!~("" + e).indexOf(t)
        }

        function o(e, t) {
            for (var r in e) {
                var a = e[r];
                if (!i(a, "-") && g[a] !== n) return "pfx" == t ? a : !0
            }
            return !1
        }

        function u(e, t, r) {
            for (var i in e) {
                var o = t[e[i]];
                if (o !== n) return r === !1 ? e[i] : a(o, "function") ? o.bind(r || t) : o
            }
            return !1
        }

        function c(e, t, n) {
            var r = e.charAt(0).toUpperCase() + e.slice(1),
                i = (e + " " + E.join(r + " ") + r).split(" ");
            return a(t, "string") || a(t, "undefined") ? o(i, t) : (i = (e + " " + O.join(r + " ") + r).split(" "), u(i, t, n))
        }
        var s, l, f, d = "2.6.2",
            p = {},
            h = !0,
            m = t.documentElement,
            v = "modernizr",
            y = t.createElement(v),
            g = y.style,
            M = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
            b = "Webkit Moz O ms",
            E = b.split(" "),
            O = b.toLowerCase().split(" "),
            w = {},
            j = [],
            I = j.slice,
            C = function(e, n, r, a) {
                var i, o, u, c, s = t.createElement("div"),
                    l = t.body,
                    f = l || t.createElement("body");
                if (parseInt(r, 10))
                    for (; r--;) u = t.createElement("div"), u.id = a ? a[r] : v + (r + 1), s.appendChild(u);
                return i = ["&#173;", '<style id="s', v, '">', e, "</style>"].join(""), s.id = v, (l ? s : f).innerHTML += i, f.appendChild(s), l || (f.style.background = "", f.style.overflow = "hidden", c = m.style.overflow, m.style.overflow = "hidden", m.appendChild(f)), o = n(s, e), l ? s.parentNode.removeChild(s) : (f.parentNode.removeChild(f), m.style.overflow = c), !!o
            },
            S = {}.hasOwnProperty;
        f = a(S, "undefined") || a(S.call, "undefined") ? function(e, t) {
            return t in e && a(e.constructor.prototype[t], "undefined")
        } : function(e, t) {
            return S.call(e, t)
        }, Function.prototype.bind || (Function.prototype.bind = function(e) {
            var t = this;
            if ("function" != typeof t) throw new TypeError;
            var n = I.call(arguments, 1),
                r = function() {
                    if (this instanceof r) {
                        var a = function() {};
                        a.prototype = t.prototype;
                        var i = new a,
                            o = t.apply(i, n.concat(I.call(arguments)));
                        return Object(o) === o ? o : i
                    }
                    return t.apply(e, n.concat(I.call(arguments)))
                };
            return r
        }), w.csstransforms3d = function() {
            var e = !!c("perspective");
            return e && "webkitPerspective" in m.style && C("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(t) {
                e = 9 === t.offsetLeft && 3 === t.offsetHeight
            }), e
        };
        for (var x in w) f(w, x) && (l = x.toLowerCase(), p[l] = w[x](), j.push((p[l] ? "" : "no-") + l));
        return p.addTest = function(e, t) {
                if ("object" == typeof e)
                    for (var r in e) f(e, r) && p.addTest(r, e[r]);
                else {
                    if (e = e.toLowerCase(), p[e] !== n) return p;
                    t = "function" == typeof t ? t() : t, "undefined" != typeof h && h && (m.className += " " + (t ? "" : "no-") + e), p[e] = t
                }
                return p
            }, r(""), y = s = null,
            function(e, t) {
                function n(e, t) {
                    var n = e.createElement("p"),
                        r = e.getElementsByTagName("head")[0] || e.documentElement;
                    return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
                }

                function r() {
                    var e = y.elements;
                    return "string" == typeof e ? e.split(" ") : e
                }

                function a(e) {
                    var t = v[e[h]];
                    return t || (t = {}, m++, e[h] = m, v[m] = t), t
                }

                function i(e, n, r) {
                    if (n || (n = t), l) return n.createElement(e);
                    r || (r = a(n));
                    var i;
                    return i = r.cache[e] ? r.cache[e].cloneNode() : p.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), i.canHaveChildren && !d.test(e) ? r.frag.appendChild(i) : i
                }

                function o(e, n) {
                    if (e || (e = t), l) return e.createDocumentFragment();
                    n = n || a(e);
                    for (var i = n.frag.cloneNode(), o = 0, u = r(), c = u.length; c > o; o++) i.createElement(u[o]);
                    return i
                }

                function u(e, t) {
                    t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
                        return y.shivMethods ? i(n, e, t) : t.createElem(n)
                    }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/\w+/g, function(e) {
                        return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
                    }) + ");return n}")(y, t.frag)
                }

                function c(e) {
                    e || (e = t);
                    var r = a(e);
                    return y.shivCSS && !s && !r.hasCSS && (r.hasCSS = !!n(e, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), l || u(e, r), e
                }
                var s, l, f = e.html5 || {},
                    d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    p = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    h = "_html5shiv",
                    m = 0,
                    v = {};
                ! function() {
                    try {
                        var e = t.createElement("a");
                        e.innerHTML = "<xyz></xyz>", s = "hidden" in e, l = 1 == e.childNodes.length || function() {
                            t.createElement("a");
                            var e = t.createDocumentFragment();
                            return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
                        }()
                    } catch (n) {
                        s = !0, l = !0
                    }
                }();
                var y = {
                    elements: f.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
                    shivCSS: f.shivCSS !== !1,
                    supportsUnknownElements: l,
                    shivMethods: f.shivMethods !== !1,
                    type: "default",
                    shivDocument: c,
                    createElement: i,
                    createDocumentFragment: o
                };
                e.html5 = y, c(t)
            }(this, t), p._version = d, p._prefixes = M, p._domPrefixes = O, p._cssomPrefixes = E, p.testProp = function(e) {
                return o([e])
            }, p.testAllProps = c, p.testStyles = C, m.className = m.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (h ? " js " + j.join(" ") : ""), p
    }(this, this.document),
    function(e, t, n) {
        function r(e) {
            return "[object Function]" == v.call(e)
        }

        function a(e) {
            return "string" == typeof e
        }

        function i() {}

        function o(e) {
            return !e || "loaded" == e || "complete" == e || "uninitialized" == e
        }

        function u() {
            var e = y.shift();
            g = 1, e ? e.t ? h(function() {
                ("c" == e.t ? d.injectCss : d.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
            }, 0) : (e(), u()) : g = 0
        }

        function c(e, n, r, a, i, c, s) {
            function l(t) {
                if (!p && o(f.readyState) && (M.r = p = 1, !g && u(), f.onload = f.onreadystatechange = null, t)) {
                    "img" != e && h(function() {
                        E.removeChild(f)
                    }, 50);
                    for (var r in C[n]) C[n].hasOwnProperty(r) && C[n][r].onload()
                }
            }
            var s = s || d.errorTimeout,
                f = t.createElement(e),
                p = 0,
                v = 0,
                M = {
                    t: r,
                    s: n,
                    e: i,
                    a: c,
                    x: s
                };
            1 === C[n] && (v = 1, C[n] = []), "object" == e ? f.data = n : (f.src = n, f.type = e), f.width = f.height = "0", f.onerror = f.onload = f.onreadystatechange = function() {
                l.call(this, v)
            }, y.splice(a, 0, M), "img" != e && (v || 2 === C[n] ? (E.insertBefore(f, b ? null : m), h(l, s)) : C[n].push(f))
        }

        function s(e, t, n, r, i) {
            return g = 0, t = t || "j", a(e) ? c("c" == t ? w : O, e, t, this.i++, n, r, i) : (y.splice(this.i++, 0, e), 1 == y.length && u()), this
        }

        function l() {
            var e = d;
            return e.loader = {
                load: s,
                i: 0
            }, e
        }
        var f, d, p = t.documentElement,
            h = e.setTimeout,
            m = t.getElementsByTagName("script")[0],
            v = {}.toString,
            y = [],
            g = 0,
            M = "MozAppearance" in p.style,
            b = M && !!t.createRange().compareNode,
            E = b ? p : m.parentNode,
            p = e.opera && "[object Opera]" == v.call(e.opera),
            p = !!t.attachEvent && !p,
            O = M ? "object" : p ? "script" : "img",
            w = p ? "script" : O,
            j = Array.isArray || function(e) {
                return "[object Array]" == v.call(e)
            },
            I = [],
            C = {},
            S = {
                timeout: function(e, t) {
                    return t.length && (e.timeout = t[0]), e
                }
            };
        d = function(e) {
            function t(e) {
                var t, n, r, e = e.split("!"),
                    a = I.length,
                    i = e.pop(),
                    o = e.length,
                    i = {
                        url: i,
                        origUrl: i,
                        prefixes: e
                    };
                for (n = 0; o > n; n++) r = e[n].split("="), (t = S[r.shift()]) && (i = t(i, r));
                for (n = 0; a > n; n++) i = I[n](i);
                return i
            }

            function o(e, a, i, o, u) {
                var c = t(e),
                    s = c.autoCallback;
                c.url.split(".").pop().split("?").shift(), c.bypass || (a && (a = r(a) ? a : a[e] || a[o] || a[e.split("/").pop().split("?")[0]]), c.instead ? c.instead(e, a, i, o, u) : (C[c.url] ? c.noexec = !0 : C[c.url] = 1, i.load(c.url, c.forceCSS || !c.forceJS && "css" == c.url.split(".").pop().split("?").shift() ? "c" : n, c.noexec, c.attrs, c.timeout), (r(a) || r(s)) && i.load(function() {
                    l(), a && a(c.origUrl, u, o), s && s(c.origUrl, u, o), C[c.url] = 2
                })))
            }

            function u(e, t) {
                function n(e, n) {
                    if (e) {
                        if (a(e)) n || (f = function() {
                            var e = [].slice.call(arguments);
                            d.apply(this, e), p()
                        }), o(e, f, t, 0, s);
                        else if (Object(e) === e)
                            for (c in u = function() {
                                    var t, n = 0;
                                    for (t in e) e.hasOwnProperty(t) && n++;
                                    return n
                                }(), e) e.hasOwnProperty(c) && (!n && !--u && (r(f) ? f = function() {
                                var e = [].slice.call(arguments);
                                d.apply(this, e), p()
                            } : f[c] = function(e) {
                                return function() {
                                    var t = [].slice.call(arguments);
                                    e && e.apply(this, t), p()
                                }
                            }(d[c])), o(e[c], f, t, c, s))
                    } else !n && p()
                }
                var u, c, s = !!e.test,
                    l = e.load || e.both,
                    f = e.callback || i,
                    d = f,
                    p = e.complete || i;
                n(s ? e.yep : e.nope, !!l), l && n(l)
            }
            var c, s, f = this.yepnope.loader;
            if (a(e)) o(e, 0, f, 0);
            else if (j(e))
                for (c = 0; c < e.length; c++) s = e[c], a(s) ? o(s, 0, f, 0) : j(s) ? d(s) : Object(s) === s && u(s, f);
            else Object(e) === e && u(e, f)
        }, d.addPrefix = function(e, t) {
            S[e] = t
        }, d.addFilter = function(e) {
            I.push(e)
        }, d.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", f = function() {
            t.removeEventListener("DOMContentLoaded", f, 0), t.readyState = "complete"
        }, 0)), e.yepnope = l(), e.yepnope.executeStack = u, e.yepnope.injectJs = function(e, n, r, a, c, s) {
            var l, f, p = t.createElement("script"),
                a = a || d.errorTimeout;
            p.src = e;
            for (f in r) p.setAttribute(f, r[f]);
            n = s ? u : n || i, p.onreadystatechange = p.onload = function() {
                !l && o(p.readyState) && (l = 1, n(), p.onload = p.onreadystatechange = null)
            }, h(function() {
                l || (l = 1, n(1))
            }, a), c ? p.onload() : m.parentNode.insertBefore(p, m)
        }, e.yepnope.injectCss = function(e, n, r, a, o, c) {
            var s, a = t.createElement("link"),
                n = c ? u : n || i;
            a.href = e, a.rel = "stylesheet", a.type = "text/css";
            for (s in r) a.setAttribute(s, r[s]);
            o || (m.parentNode.insertBefore(a, m), h(n, 0))
        }
    }(this, document), Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0))
    }, jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function(e, t, n, r, a) {
            return jQuery.easing[jQuery.easing.def](e, t, n, r, a)
        },
        easeInQuad: function(e, t, n, r, a) {
            return r * (t /= a) * t + n
        },
        easeOutQuad: function(e, t, n, r, a) {
            return -r * (t /= a) * (t - 2) + n
        },
        easeInOutQuad: function(e, t, n, r, a) {
            return (t /= a / 2) < 1 ? r / 2 * t * t + n : -r / 2 * (--t * (t - 2) - 1) + n
        },
        easeInCubic: function(e, t, n, r, a) {
            return r * (t /= a) * t * t + n
        },
        easeOutCubic: function(e, t, n, r, a) {
            return r * ((t = t / a - 1) * t * t + 1) + n
        },
        easeInOutCubic: function(e, t, n, r, a) {
            return (t /= a / 2) < 1 ? r / 2 * t * t * t + n : r / 2 * ((t -= 2) * t * t + 2) + n
        },
        easeInQuart: function(e, t, n, r, a) {
            return r * (t /= a) * t * t * t + n
        },
        easeOutQuart: function(e, t, n, r, a) {
            return -r * ((t = t / a - 1) * t * t * t - 1) + n
        },
        easeInOutQuart: function(e, t, n, r, a) {
            return (t /= a / 2) < 1 ? r / 2 * t * t * t * t + n : -r / 2 * ((t -= 2) * t * t * t - 2) + n
        },
        easeInQuint: function(e, t, n, r, a) {
            return r * (t /= a) * t * t * t * t + n
        },
        easeOutQuint: function(e, t, n, r, a) {
            return r * ((t = t / a - 1) * t * t * t * t + 1) + n
        },
        easeInOutQuint: function(e, t, n, r, a) {
            return (t /= a / 2) < 1 ? r / 2 * t * t * t * t * t + n : r / 2 * ((t -= 2) * t * t * t * t + 2) + n
        },
        easeInSine: function(e, t, n, r, a) {
            return -r * Math.cos(t / a * (Math.PI / 2)) + r + n
        },
        easeOutSine: function(e, t, n, r, a) {
            return r * Math.sin(t / a * (Math.PI / 2)) + n
        },
        easeInOutSine: function(e, t, n, r, a) {
            return -r / 2 * (Math.cos(Math.PI * t / a) - 1) + n
        },
        easeInExpo: function(e, t, n, r, a) {
            return 0 == t ? n : r * Math.pow(2, 10 * (t / a - 1)) + n
        },
        easeOutExpo: function(e, t, n, r, a) {
            return t == a ? n + r : r * (-Math.pow(2, -10 * t / a) + 1) + n
        },
        easeInOutExpo: function(e, t, n, r, a) {
            return 0 == t ? n : t == a ? n + r : (t /= a / 2) < 1 ? r / 2 * Math.pow(2, 10 * (t - 1)) + n : r / 2 * (-Math.pow(2, -10 * --t) + 2) + n
        },
        easeInCirc: function(e, t, n, r, a) {
            return -r * (Math.sqrt(1 - (t /= a) * t) - 1) + n
        },
        easeOutCirc: function(e, t, n, r, a) {
            return r * Math.sqrt(1 - (t = t / a - 1) * t) + n
        },
        easeInOutCirc: function(e, t, n, r, a) {
            return (t /= a / 2) < 1 ? -r / 2 * (Math.sqrt(1 - t * t) - 1) + n : r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
        },
        easeInElastic: function(e, t, n, r, a) {
            var i = 1.70158,
                o = 0,
                u = r;
            if (0 == t) return n;
            if (1 == (t /= a)) return n + r;
            if (o || (o = .3 * a), u < Math.abs(r)) {
                u = r;
                var i = o / 4
            } else var i = o / (2 * Math.PI) * Math.asin(r / u);
            return -(u * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * a - i) * Math.PI / o)) + n
        },
        easeOutElastic: function(e, t, n, r, a) {
            var i = 1.70158,
                o = 0,
                u = r;
            if (0 == t) return n;
            if (1 == (t /= a)) return n + r;
            if (o || (o = .3 * a), u < Math.abs(r)) {
                u = r;
                var i = o / 4
            } else var i = o / (2 * Math.PI) * Math.asin(r / u);
            return u * Math.pow(2, -10 * t) * Math.sin(2 * (t * a - i) * Math.PI / o) + r + n
        },
        easeInOutElastic: function(e, t, n, r, a) {
            var i = 1.70158,
                o = 0,
                u = r;
            if (0 == t) return n;
            if (2 == (t /= a / 2)) return n + r;
            if (o || (o = .3 * a * 1.5), u < Math.abs(r)) {
                u = r;
                var i = o / 4
            } else var i = o / (2 * Math.PI) * Math.asin(r / u);
            return 1 > t ? -.5 * u * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * a - i) * Math.PI / o) + n : u * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t * a - i) * Math.PI / o) * .5 + r + n
        },
        easeInBack: function(e, t, n, r, a, i) {
            return void 0 == i && (i = 1.70158), r * (t /= a) * t * ((i + 1) * t - i) + n
        },
        easeOutBack: function(e, t, n, r, a, i) {
            return void 0 == i && (i = 1.70158), r * ((t = t / a - 1) * t * ((i + 1) * t + i) + 1) + n
        },
        easeInOutBack: function(e, t, n, r, a, i) {
            return void 0 == i && (i = 1.70158), (t /= a / 2) < 1 ? r / 2 * t * t * (((i *= 1.525) + 1) * t - i) + n : r / 2 * ((t -= 2) * t * (((i *= 1.525) + 1) * t + i) + 2) + n
        },
        easeInBounce: function(e, t, n, r, a) {
            return r - jQuery.easing.easeOutBounce(e, a - t, 0, r, a) + n
        },
        easeOutBounce: function(e, t, n, r, a) {
            return (t /= a) < 1 / 2.75 ? 7.5625 * r * t * t + n : 2 / 2.75 > t ? r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : 2.5 / 2.75 > t ? r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
        },
        easeInOutBounce: function(e, t, n, r, a) {
            return a / 2 > t ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, r, a) + n : .5 * jQuery.easing.easeOutBounce(e, 2 * t - a, 0, r, a) + .5 * r + n
        }
    });
// window.Modernizr=function(e,t,n){function r(e){b.cssText=e}function o(e,t){return r(S.join(e+";")+(t||""))}function a(e,t){return typeof e===t}function i(e,t){return!!~(""+e).indexOf(t)}function c(e,t){for(var r in e){var o=e[r];if(!i(o,"-")&&b[o]!==n)return"pfx"==t?o:!0}return!1}function s(e,t,r){for(var o in e){var i=t[e[o]];if(i!==n)return r===!1?e[o]:a(i,"function")?i.bind(r||t):i}return!1}function u(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),o=(e+" "+k.join(r+" ")+r).split(" ");return a(t,"string")||a(t,"undefined")?c(o,t):(o=(e+" "+T.join(r+" ")+r).split(" "),s(o,t,n))}function l(){p.input=function(n){for(var r=0,o=n.length;o>r;r++)j[n[r]]=!!(n[r]in E);return j.list&&(j.list=!(!t.createElement("datalist")||!e.HTMLDataListElement)),j}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),p.inputtypes=function(e){for(var r,o,a,i=0,c=e.length;c>i;i++)E.setAttribute("type",o=e[i]),r="text"!==E.type,r&&(E.value=x,E.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(o)&&E.style.WebkitAppearance!==n?(g.appendChild(E),a=t.defaultView,r=a.getComputedStyle&&"textfield"!==a.getComputedStyle(E,null).WebkitAppearance&&0!==E.offsetHeight,g.removeChild(E)):/^(search|tel)$/.test(o)||(r=/^(url|email)$/.test(o)?E.checkValidity&&E.checkValidity()===!1:E.value!=x)),P[e[i]]=!!r;return P}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d,f,m="2.8.3",p={},h=!0,g=t.documentElement,v="modernizr",y=t.createElement(v),b=y.style,E=t.createElement("input"),x=":)",w={}.toString,S=" -webkit- -moz- -o- -ms- ".split(" "),C="Webkit Moz O ms",k=C.split(" "),T=C.toLowerCase().split(" "),N={svg:"http://www.w3.org/2000/svg"},M={},P={},j={},$=[],D=$.slice,F=function(e,n,r,o){var a,i,c,s,u=t.createElement("div"),l=t.body,d=l||t.createElement("body");if(parseInt(r,10))for(;r--;)c=t.createElement("div"),c.id=o?o[r]:v+(r+1),u.appendChild(c);return a=["&#173;",'<style id="s',v,'">',e,"</style>"].join(""),u.id=v,(l?u:d).innerHTML+=a,d.appendChild(u),l||(d.style.background="",d.style.overflow="hidden",s=g.style.overflow,g.style.overflow="hidden",g.appendChild(d)),i=n(u,e),l?u.parentNode.removeChild(u):(d.parentNode.removeChild(d),g.style.overflow=s),!!i},z=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t)&&n(t).matches||!1;var r;return F("@media "+t+" { #"+v+" { position: absolute; } }",function(t){r="absolute"==(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).position}),r},A=function(){function e(e,o){o=o||t.createElement(r[e]||"div"),e="on"+e;var i=e in o;return i||(o.setAttribute||(o=t.createElement("div")),o.setAttribute&&o.removeAttribute&&(o.setAttribute(e,""),i=a(o[e],"function"),a(o[e],"undefined")||(o[e]=n),o.removeAttribute(e))),o=null,i}var r={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return e}(),L={}.hasOwnProperty;f=a(L,"undefined")||a(L.call,"undefined")?function(e,t){return t in e&&a(e.constructor.prototype[t],"undefined")}:function(e,t){return L.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=D.call(arguments,1),r=function(){if(this instanceof r){var o=function(){};o.prototype=t.prototype;var a=new o,i=t.apply(a,n.concat(D.call(arguments)));return Object(i)===i?i:a}return t.apply(e,n.concat(D.call(arguments)))};return r}),M.flexbox=function(){return u("flexWrap")},M.flexboxlegacy=function(){return u("boxDirection")},M.canvas=function(){var e=t.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))},M.canvastext=function(){return!(!p.canvas||!a(t.createElement("canvas").getContext("2d").fillText,"function"))},M.webgl=function(){return!!e.WebGLRenderingContext},M.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:F(["@media (",S.join("touch-enabled),("),v,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n},M.geolocation=function(){return"geolocation"in navigator},M.postmessage=function(){return!!e.postMessage},M.websqldatabase=function(){return!!e.openDatabase},M.indexedDB=function(){return!!u("indexedDB",e)},M.hashchange=function(){return A("hashchange",e)&&(t.documentMode===n||t.documentMode>7)},M.history=function(){return!(!e.history||!history.pushState)},M.draganddrop=function(){var e=t.createElement("div");return"draggable"in e||"ondragstart"in e&&"ondrop"in e},M.websockets=function(){return"WebSocket"in e||"MozWebSocket"in e},M.rgba=function(){return r("background-color:rgba(150,255,150,.5)"),i(b.backgroundColor,"rgba")},M.hsla=function(){return r("background-color:hsla(120,40%,100%,.5)"),i(b.backgroundColor,"rgba")||i(b.backgroundColor,"hsla")},M.multiplebgs=function(){return r("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(b.background)},M.backgroundsize=function(){return u("backgroundSize")},M.borderimage=function(){return u("borderImage")},M.borderradius=function(){return u("borderRadius")},M.boxshadow=function(){return u("boxShadow")},M.textshadow=function(){return""===t.createElement("div").style.textShadow},M.opacity=function(){return o("opacity:.55"),/^0.55$/.test(b.opacity)},M.cssanimations=function(){return u("animationName")},M.csscolumns=function(){return u("columnCount")},M.cssgradients=function(){var e="background-image:",t="gradient(linear,left top,right bottom,from(#9f9),to(white));",n="linear-gradient(left top,#9f9, white);";return r((e+"-webkit- ".split(" ").join(t+e)+S.join(n+e)).slice(0,-e.length)),i(b.backgroundImage,"gradient")},M.cssreflections=function(){return u("boxReflect")},M.csstransforms=function(){return!!u("transform")},M.csstransforms3d=function(){var e=!!u("perspective");return e&&"webkitPerspective"in g.style&&F("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t){e=9===t.offsetLeft&&3===t.offsetHeight}),e},M.csstransitions=function(){return u("transition")},M.fontface=function(){var e;return F('@font-face {font-family:"font";src:url("https://")}',function(n,r){var o=t.getElementById("smodernizr"),a=o.sheet||o.styleSheet,i=a?a.cssRules&&a.cssRules[0]?a.cssRules[0].cssText:a.cssText||"":"";e=/src/i.test(i)&&0===i.indexOf(r.split(" ")[0])}),e},M.generatedcontent=function(){var e;return F(["#",v,"{font:0/0 a}#",v,':after{content:"',x,'";visibility:hidden;font:3px/1 a}'].join(""),function(t){e=t.offsetHeight>=3}),e},M.video=function(){var e=t.createElement("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(r){}return n},M.audio=function(){var e=t.createElement("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(r){}return n},M.localstorage=function(){try{return localStorage.setItem(v,v),localStorage.removeItem(v),!0}catch(e){return!1}},M.sessionstorage=function(){try{return sessionStorage.setItem(v,v),sessionStorage.removeItem(v),!0}catch(e){return!1}},M.webworkers=function(){return!!e.Worker},M.applicationcache=function(){return!!e.applicationCache},M.svg=function(){return!!t.createElementNS&&!!t.createElementNS(N.svg,"svg").createSVGRect},M.inlinesvg=function(){var e=t.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==N.svg},M.smil=function(){return!!t.createElementNS&&/SVGAnimate/.test(w.call(t.createElementNS(N.svg,"animate")))},M.svgclippaths=function(){return!!t.createElementNS&&/SVGClipPath/.test(w.call(t.createElementNS(N.svg,"clipPath")))};for(var H in M)f(M,H)&&(d=H.toLowerCase(),p[d]=M[H](),$.push((p[d]?"":"no-")+d));return p.input||l(),p.addTest=function(e,t){if("object"==typeof e)for(var r in e)f(e,r)&&p.addTest(r,e[r]);else{if(e=e.toLowerCase(),p[e]!==n)return p;t="function"==typeof t?t():t,"undefined"!=typeof h&&h&&(g.className+=" "+(t?"":"no-")+e),p[e]=t}return p},r(""),y=E=null,function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=y.elements;return"string"==typeof e?e.split(" "):e}function o(e){var t=v[e[h]];return t||(t={},g++,e[h]=g,v[g]=t),t}function a(e,n,r){if(n||(n=t),l)return n.createElement(e);r||(r=o(n));var a;return a=r.cache[e]?r.cache[e].cloneNode():p.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!a.canHaveChildren||m.test(e)||a.tagUrn?a:r.frag.appendChild(a)}function i(e,n){if(e||(e=t),l)return e.createDocumentFragment();n=n||o(e);for(var a=n.frag.cloneNode(),i=0,c=r(),s=c.length;s>i;i++)a.createElement(c[i]);return a}function c(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return y.shivMethods?a(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(y,t.frag)}function s(e){e||(e=t);var r=o(e);return!y.shivCSS||u||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),l||c(e,r),e}var u,l,d="3.7.0",f=e.html5||{},m=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,h="_html5shiv",g=0,v={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",u="hidden"in e,l=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){u=!0,l=!0}}();var y={elements:f.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:d,shivCSS:f.shivCSS!==!1,supportsUnknownElements:l,shivMethods:f.shivMethods!==!1,type:"default",shivDocument:s,createElement:a,createDocumentFragment:i};e.html5=y,s(t)}(this,t),p._version=m,p._prefixes=S,p._domPrefixes=T,p._cssomPrefixes=k,p.mq=z,p.hasEvent=A,p.testProp=function(e){return c([e])},p.testAllProps=u,p.testStyles=F,p.prefixed=function(e,t,n){return t?u(e,t,n):u(e,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(h?" js "+$.join(" "):""),p}(this,this.document); // v2.8.3

/* jQuery Visible */
(function(d) {
    d.fn.visible = function(e, i) {
        var a = d(this).eq(0),
            f = a.get(0),
            c = d(window),
            g = c.scrollTop();
        c = g + c.height();
        var b = a.offset().top,
            h = b + a.height();
        a = e === true ? h : b;
        b = e === true ? b : h;
        return !!(i === true ? f.offsetWidth * f.offsetHeight : true) && b <= c && a >= g
    }
})(jQuery);

/* SuperFish */
;
! function(a, b) {
    "use strict";
    var c = function() {
        var c = {
                bcClass: "sf-breadcrumb",
                menuClass: "sf-js-enabled",
                anchorClass: "sf-with-ul",
                menuArrowClass: "sf-arrows"
            },
            d = function() {
                var b = /^(?![\w\W]*Windows Phone)[\w\W]*(iPhone|iPad|iPod)/i.test(navigator.userAgent);
                return b && a("html").css("cursor", "pointer").on("click", a.noop), b
            }(),
            e = function() {
                var a = document.documentElement.style;
                return "behavior" in a && "fill" in a && /iemobile/i.test(navigator.userAgent)
            }(),
            f = function() {
                return !!b.PointerEvent
            }(),
            g = function(a, b, d) {
                var e, f = c.menuClass;
                b.cssArrows && (f += " " + c.menuArrowClass), e = d ? "addClass" : "removeClass", a[e](f)
            },
            h = function(b, d) {
                return b.find("li." + d.pathClass).slice(0, d.pathLevels).addClass(d.hoverClass + " " + c.bcClass).filter(function() {
                    return a(this).children(d.popUpSelector).hide().show().length
                }).removeClass(d.pathClass)
            },
            i = function(a, b) {
                var d = b ? "addClass" : "removeClass";
                a.children("a")[d](c.anchorClass)
            },
            j = function(a) {
                var b = a.css("ms-touch-action"),
                    c = a.css("touch-action");
                c = c || b, c = "pan-y" === c ? "auto" : "pan-y", a.css({
                    "ms-touch-action": c,
                    "touch-action": c
                })
            },
            k = function(a) {
                return a.closest("." + c.menuClass)
            },
            l = function(a) {
                return k(a).data("sfOptions")
            },
            m = function() {
                var b = a(this),
                    c = l(b);
                clearTimeout(c.sfTimer), b.siblings().superfish("hide").end().superfish("show")
            },
            n = function(b) {
                b.retainPath = a.inArray(this[0], b.$path) > -1, this.superfish("hide"), this.parents("." + b.hoverClass).length || (b.onIdle.call(k(this)), b.$path.length && a.proxy(m, b.$path)())
            },
            o = function() {
                var b = a(this),
                    c = l(b);
                d ? a.proxy(n, b, c)() : (clearTimeout(c.sfTimer), c.sfTimer = setTimeout(a.proxy(n, b, c), c.delay))
            },
            p = function(b) {
                var c = a(this),
                    d = l(c),
                    e = c.siblings(b.data.popUpSelector);
                return d.onHandleTouch.call(e) === !1 ? this : void(e.length > 0 && e.is(":hidden") && (c.one("click.superfish", !1), "MSPointerDown" === b.type || "pointerdown" === b.type ? c.trigger("focus") : a.proxy(m, c.parent("li"))()))
            },
            q = function(b, c) {
                var g = "li:has(" + c.popUpSelector + ")";
                a.fn.hoverIntent && !c.disableHI ? b.hoverIntent(m, o, g) : b.on("mouseenter.superfish", g, m).on("mouseleave.superfish", g, o);
                var h = "MSPointerDown.superfish";
                f && (h = "pointerdown.superfish"), d || (h += " touchend.superfish"), e && (h += " mousedown.superfish"), b.on("focusin.superfish", "li", m).on("focusout.superfish", "li", o).on(h, "a", c, p)
            };
        return {
            hide: function(b) {
                if (this.length) {
                    var c = this,
                        d = l(c);
                    if (!d) return this;
                    var e = d.retainPath === !0 ? d.$path : "",
                        f = c.find("li." + d.hoverClass).add(this).not(e).removeClass(d.hoverClass).children(d.popUpSelector),
                        g = d.speedOut;
                    if (b && (f.show(), g = 0), d.retainPath = !1, d.onBeforeHide.call(f) === !1) return this;
                    f.stop(!0, !0).animate(d.animationOut, g, function() {
                        var b = a(this);
                        d.onHide.call(b)
                    })
                }
                return this
            },
            show: function() {
                var a = l(this);
                if (!a) return this;
                var b = this.addClass(a.hoverClass),
                    c = b.children(a.popUpSelector);
                return a.onBeforeShow.call(c) === !1 ? this : (c.stop(!0, !0).animate(a.animation, a.speed, function() {
                    a.onShow.call(c)
                }), this)
            },
            destroy: function() {
                return this.each(function() {
                    var b, d = a(this),
                        e = d.data("sfOptions");
                    return !!e && (b = d.find(e.popUpSelector).parent("li"), clearTimeout(e.sfTimer), g(d, e), i(b), j(d), d.off(".superfish").off(".hoverIntent"), b.children(e.popUpSelector).attr("style", function(a, b) {
                        if ("undefined" != typeof b) return b.replace(/display[^;]+;?/g, "")
                    }), e.$path.removeClass(e.hoverClass + " " + c.bcClass).addClass(e.pathClass), d.find("." + e.hoverClass).removeClass(e.hoverClass), e.onDestroy.call(d), void d.removeData("sfOptions"))
                })
            },
            init: function(b) {
                return this.each(function() {
                    var d = a(this);
                    if (d.data("sfOptions")) return !1;
                    var e = a.extend({}, a.fn.superfish.defaults, b),
                        f = d.find(e.popUpSelector).parent("li");
                    e.$path = h(d, e), d.data("sfOptions", e), g(d, e, !0), i(f, !0), j(d), q(d, e), f.not("." + c.bcClass).superfish("hide", !0), e.onInit.call(this)
                })
            }
        }
    }();
    a.fn.superfish = function(b, d) {
        return c[b] ? c[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? a.error("Method " + b + " does not exist on jQuery.fn.superfish") : c.init.apply(this, arguments)
    }, a.fn.superfish.defaults = {
        popUpSelector: "ul,.sf-mega",
        hoverClass: "sfHover",
        pathClass: "overrideThisToUse",
        pathLevels: 1,
        delay: 800,
        animation: {
            opacity: "show"
        },
        animationOut: {
            opacity: "hide"
        },
        speed: "normal",
        speedOut: "fast",
        cssArrows: !0,
        disableHI: !1,
        onInit: a.noop,
        onBeforeShow: a.noop,
        onShow: a.noop,
        onBeforeHide: a.noop,
        onHide: a.noop,
        onIdle: a.noop,
        onDestroy: a.noop,
        onHandleTouch: a.noop
    }
}(jQuery, window);

/* Equal Heights */
! function(t) {
    t.fn.equalHeights = function(e, h) {
        return tallest = e ? e : 0, this.each(function() {
            t(this).height() > tallest && (tallest = t(this).height())
        }), h && tallest > h && (tallest = h), this.each(function() {
            t(this).height(tallest).css("overflow", "auto")
        })
    }
}(jQuery);

/* ToolTip */
! function(t) {
    var e = function(t, e) {
        this.init("tooltip", t, e)
    };
    e.prototype = {
        constructor: e,
        init: function(e, i, o) {
            var n, s;
            this.type = e, this.$element = t(i), this.options = this.getOptions(o), this.enabled = !0, "click" == this.options.trigger ? this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)) : "manual" != this.options.trigger && (n = "hover" == this.options.trigger ? "mouseenter" : "focus", s = "hover" == this.options.trigger ? "mouseleave" : "blur", this.$element.on(n + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, t.proxy(this.leave, this))), this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        },
        getOptions: function(e) {
            return e = t.extend({}, t.fn[this.type].defaults, e, this.$element.data()), e.delay && "number" == typeof e.delay && (e.delay = {
                show: e.delay,
                hide: e.delay
            }), e
        },
        enter: function(e) {
            var i = t(e.currentTarget)[this.type](this._options).data(this.type);
            return i.options.delay && i.options.delay.show ? (clearTimeout(this.timeout), i.hoverState = "in", this.timeout = setTimeout(function() {
                "in" == i.hoverState && i.show()
            }, i.options.delay.show), void 0) : i.show()
        },
        leave: function(e) {
            var i = t(e.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout), i.options.delay && i.options.delay.hide ? (i.hoverState = "out", this.timeout = setTimeout(function() {
                "out" == i.hoverState && i.hide()
            }, i.options.delay.hide), void 0) : i.hide()
        },
        show: function() {
            var t, e, i, o, n, s, h;
            if (this.hasContent() && this.enabled) {
                switch (t = this.tip(), this.setContent(), this.options.animation && t.addClass("fade"), s = "function" == typeof this.options.placement ? this.options.placement.call(this, t[0], this.$element[0]) : this.options.placement, e = /in/.test(s), t.detach().css({
                        top: 0,
                        left: 0,
                        display: "block"
                    }).insertAfter(this.$element), i = this.getPosition(e), o = t[0].offsetWidth, n = t[0].offsetHeight, e ? s.split(" ")[1] : s) {
                    case "bottom":
                        h = {
                            top: i.top + i.height,
                            left: i.left + i.width / 2 - o / 2
                        };
                        break;
                    case "top":
                        h = {
                            top: i.top - n,
                            left: i.left + i.width / 2 - o / 2
                        };
                        break;
                    case "left":
                        h = {
                            top: i.top + i.height / 2 - n / 2,
                            left: i.left - o
                        };
                        break;
                    case "right":
                        h = {
                            top: i.top + i.height / 2 - n / 2,
                            left: i.left + i.width
                        }
                }
                t.offset(h).addClass(s).addClass("in")
            }
        },
        setContent: function() {
            var t = this.tip(),
                e = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
        },
        hide: function() {
            function e() {
                var e = setTimeout(function() {
                    i.off(t.support.transition.end).detach()
                }, 500);
                i.one(t.support.transition.end, function() {
                    clearTimeout(e), i.detach()
                })
            }
            var i = this.tip();
            return i.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? e() : i.detach(), this
        },
        fixTitle: function() {
            var t = this.$element;
            (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
        },
        hasContent: function() {
            return this.getTitle()
        },
        getPosition: function(e) {
            return t.extend({}, e ? {
                top: 0,
                left: 0
            } : this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            })
        },
        getTitle: function() {
            var t, e = this.$element,
                i = this.options;
            return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
        },
        tip: function() {
            return this.$tip = this.$tip || t(this.options.template)
        },
        validate: function() {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        enable: function() {
            this.enabled = !0
        },
        disable: function() {
            this.enabled = !1
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled
        },
        toggle: function(e) {
            var i = t(e.currentTarget)[this.type](this._options).data(this.type);
            i[i.tip().hasClass("in") ? "hide" : "show"]()
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = function(i) {
        return this.each(function() {
            var o = t(this),
                n = o.data("tooltip"),
                s = "object" == typeof i && i;
            n || o.data("tooltip", n = new e(this, s)), "string" == typeof i && n[i]()
        })
    }, t.fn.tooltip.Constructor = e, t.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover",
        title: "",
        delay: 0,
        html: !1
    }, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = i, this
    }
}(window.jQuery);

/* fitVids */
(function(e) {
    e.fn.fitVids = function(t) {
        var n = {
            customSelector: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var r = document.createElement("div"),
                i = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0],
                s = "­<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>";
            r.className = "fit-vids-style";
            r.id = "fit-vids-style";
            r.style.display = "none";
            r.innerHTML = s;
            i.parentNode.insertBefore(r, i)
        }
        if (t) {
            e.extend(n, t)
        }
        return this.each(function() {
            var t = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
            if (n.customSelector) {
                t.push(n.customSelector)
            }
            var r = e(this).find(t.join(","));
            r = r.not("object object");
            r.each(function() {
                var t = e(this);
                if (this.tagName.toLowerCase() === "embed" && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length) {
                    return
                }
                var n = this.tagName.toLowerCase() === "object" || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height(),
                    r = !isNaN(parseInt(t.attr("width"), 10)) ? parseInt(t.attr("width"), 10) : t.width(),
                    i = n / r;
                if (!t.attr("id")) {
                    var s = "fitvid" + Math.floor(Math.random() * 999999);
                    t.attr("id", s)
                }
                t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", i * 100 + "%");
                t.removeAttr("height").removeAttr("width")
            })
        })
    }
})(window.jQuery || window.Zepto);

/* Images Loaded */
(function(e) {
    function t() {}

    function n(e, t) {
        if (r) return t.indexOf(e);
        for (var n = t.length; n--;)
            if (t[n] === e) return n;
        return -1
    }
    var i = t.prototype,
        r = Array.prototype.indexOf ? !0 : !1;
    i._getEvents = function() {
        return this._events || (this._events = {})
    }, i.getListeners = function(e) {
        var t, n, i = this._getEvents();
        if ("object" == typeof e) {
            t = {};
            for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
        } else t = i[e] || (i[e] = []);
        return t
    }, i.getListenersAsObject = function(e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {}, t[e] = n), t || n
    }, i.addListener = function(e, t) {
        var i, r = this.getListenersAsObject(e);
        for (i in r) r.hasOwnProperty(i) && -1 === n(t, r[i]) && r[i].push(t);
        return this
    }, i.on = i.addListener, i.defineEvent = function(e) {
        return this.getListeners(e), this
    }, i.defineEvents = function(e) {
        for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
        return this
    }, i.removeListener = function(e, t) {
        var i, r, s = this.getListenersAsObject(e);
        for (r in s) s.hasOwnProperty(r) && (i = n(t, s[r]), -1 !== i && s[r].splice(i, 1));
        return this
    }, i.off = i.removeListener, i.addListeners = function(e, t) {
        return this.manipulateListeners(!1, e, t)
    }, i.removeListeners = function(e, t) {
        return this.manipulateListeners(!0, e, t)
    }, i.manipulateListeners = function(e, t, n) {
        var i, r, s = e ? this.removeListener : this.addListener,
            o = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)
            for (i = n.length; i--;) s.call(this, t, n[i]);
        else
            for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? s.call(this, i, r) : o.call(this, i, r));
        return this
    }, i.removeEvent = function(e) {
        var t, n = typeof e,
            i = this._getEvents();
        if ("string" === n) delete i[e];
        else if ("object" === n)
            for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
        else delete this._events;
        return this
    }, i.emitEvent = function(e, t) {
        var n, i, r, s = this.getListenersAsObject(e);
        for (i in s)
            if (s.hasOwnProperty(i))
                for (n = s[i].length; n--;) r = t ? s[i][n].apply(null, t) : s[i][n](), r === !0 && this.removeListener(e, s[i][n]);
        return this
    }, i.trigger = i.emitEvent, i.emit = function(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t)
    }, "function" == typeof define && define.amd ? define(function() {
        return t
    }) : e.EventEmitter = t
})(this),
function(e) {
    var t = document.documentElement,
        n = function() {};
    t.addEventListener ? n = function(e, t, n) {
        e.addEventListener(t, n, !1)
    } : t.attachEvent && (n = function(t, n, i) {
        t[n + i] = i.handleEvent ? function() {
            var t = e.event;
            t.target = t.target || t.srcElement, i.handleEvent.call(i, t)
        } : function() {
            var n = e.event;
            n.target = n.target || n.srcElement, i.call(t, n)
        }, t.attachEvent("on" + n, t[n + i])
    });
    var i = function() {};
    t.removeEventListener ? i = function(e, t, n) {
        e.removeEventListener(t, n, !1)
    } : t.detachEvent && (i = function(e, t, n) {
        e.detachEvent("on" + t, e[t + n]);
        try {
            delete e[t + n]
        } catch (i) {
            e[t + n] = void 0
        }
    });
    var r = {
        bind: n,
        unbind: i
    };
    "function" == typeof define && define.amd ? define(r) : e.eventie = r
}(this),
function(e) {
    function t(e, t) {
        for (var n in t) e[n] = t[n];
        return e
    }

    function n(e) {
        return "[object Array]" === a.call(e)
    }

    function i(e) {
        var t = [];
        if (n(e)) t = e;
        else if ("number" == typeof e.length)
            for (var i = 0, r = e.length; r > i; i++) t.push(e[i]);
        else t.push(e);
        return t
    }

    function r(e, n) {
        function r(e, n, o) {
            if (!(this instanceof r)) return new r(e, n);
            "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = i(e), this.options = t({}, this.options), "function" == typeof n ? o = n : t(this.options, n), o && this.on("always", o), this.getImages(), s && (this.jqDeferred = new s.Deferred);
            var h = this;
            setTimeout(function() {
                h.check()
            })
        }

        function a(e) {
            this.img = e
        }
        r.prototype = new e, r.prototype.options = {}, r.prototype.getImages = function() {
            this.images = [];
            for (var e = 0, t = this.elements.length; t > e; e++) {
                var n = this.elements[e];
                "IMG" === n.nodeName && this.addImage(n);
                for (var i = n.querySelectorAll("img"), r = 0, s = i.length; s > r; r++) {
                    var o = i[r];
                    this.addImage(o)
                }
            }
        }, r.prototype.addImage = function(e) {
            var t = new a(e);
            this.images.push(t)
        }, r.prototype.check = function() {
            function e(e, r) {
                return t.options.debug && h && o.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
            }
            var t = this,
                n = 0,
                i = this.images.length;
            this.hasAnyBroken = !1;
            for (var r = 0; i > r; r++) {
                var s = this.images[r];
                s.on("confirm", e), s.check()
            }
        }, r.prototype.progress = function(e) {
            this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emit("progress", this, e), this.jqDeferred && this.jqDeferred.notify(this, e)
        }, r.prototype.complete = function() {
            var e = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0, this.emit(e, this), this.emit("always", this), this.jqDeferred) {
                var t = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[t](this)
            }
        }, s && (s.fn.imagesLoaded = function(e, t) {
            var n = new r(this, e, t);
            return n.jqDeferred.promise(s(this))
        });
        var f = {};
        return a.prototype = new e, a.prototype.check = function() {
            var e = f[this.img.src];
            if (e) return this.useCached(e), void 0;
            if (f[this.img.src] = this, this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
            var t = this.proxyImage = new Image;
            n.bind(t, "load", this), n.bind(t, "error", this), t.src = this.img.src
        }, a.prototype.useCached = function(e) {
            if (e.isConfirmed) this.confirm(e.isLoaded, "cached was confirmed");
            else {
                var t = this;
                e.on("confirm", function(e) {
                    return t.confirm(e.isLoaded, "cache emitted confirmed"), !0
                })
            }
        }, a.prototype.confirm = function(e, t) {
            this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
        }, a.prototype.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, a.prototype.onload = function() {
            this.confirm(!0, "onload"), this.unbindProxyEvents()
        }, a.prototype.onerror = function() {
            this.confirm(!1, "onerror"), this.unbindProxyEvents()
        }, a.prototype.unbindProxyEvents = function() {
            n.unbind(this.proxyImage, "load", this), n.unbind(this.proxyImage, "error", this)
        }, r
    }
    var s = e.jQuery,
        o = e.console,
        h = o !== void 0,
        a = Object.prototype.toString;
    "function" == typeof define && define.amd ? define(["eventEmitter", "eventie"], r) : e.imagesLoaded = r(e.EventEmitter, e.eventie)
}(window);

/* HB Streams */
! function(t) {
    t.fn.extend({
        hb_stream: function(e) {
            function a(e, a) {
                var i = e.feed;
                if (!i) return !1;
                var n = "";
                n += "<ul>";
                for (var r = 0; r < i.entries.length; r++) {
                    var s = i.entries[r],
                        c = s.content;
                    n += "<li>" + c + "</li>"
                }
                n += "</ul>", t(a).html(n), t(a).find("li").each(function() {
                    pin_img_src = t(this).find("img").attr("src"), pin_url = "http://www.pinterest.com" + t(this).find("a").attr("href"), pin_desc = t(this).find("p:nth-child(2)").html(), pin_desc = pin_desc.replace("'", "`"), t(this).empty(), t(this).append("<a target='_blank' href='" + pin_url + "' title='" + pin_desc + "'><img src='" + pin_img_src + "' alt=''></a>"), t(this).find("img").width(), t(this).find("img").height()
                })
            }
            var i = {
                    username: "envato",
                    limit: 10,
                    social_network: "dribbble"
                },
                e = t.extend(i, e);
            return this.each(function() {
                var i = e,
                    n = t(this);
                if ("dribbble" == i.social_network && (n.append("<ul></ul>"), t.getJSON("https://api.dribbble.com/v1/users/" + i.username + "/shots?access_token=1c73ffb7859f2c1c37450789dce2369af5caa9e18c3df1fa30485cfad79081d8", function(e) {
                        t.each(e, function(e, a) {
                            if (e < i.limit) {
                                var r = a.title;
                                r = r.replace("'", "`");
                                var s = t("<img/>").attr({
                                        src: a.images.teaser,
                                        alt: r
                                    }),
                                    c = t("<a/>").attr({
                                        href: a.html_url,
                                        target: "_blank",
                                        title: r
                                    }),
                                    l = t(c).append(s),
                                    o = t("<li/>").append(l);
                                t("ul", n).append(o)
                            }
                        }), t("li img", n).each(function() {
                            var e = t(this).width(),
                                a = t(this).height();
                            t(this).addClass(a > e ? "portrait" : "landscape")
                        })
                    })), "pinterest" == i.social_network) {
                    var r = "http://pinterest.com/" + i.username + "/feed.rss",
                        s = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + encodeURIComponent(r);
                    s += "&num=" + i.limit, s += "&output=json_xml", t.getJSON(s, function(t) {
                        200 == t.responseStatus ? a(t.responseData, n) : console.log("Whoops. Wrong Pinterest Username.")
                    })
                }
                if ("flickr" == i.social_network && (n.append("<ul></ul>"), t.getJSON("https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&username=" + i.username + "&format=json&api_key=85145f20ba1864d8ff559a3971a0a033&jsoncallback=?", function() {
                        var e = i.username;
                        t.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&user_id=" + e + "&format=json&api_key=85145f20ba1864d8ff559a3971a0a033&per_page=" + i.limit + "&page=1&extras=url_sq&jsoncallback=?", function(e) {
                            t.each(e.photos.photo, function(e, a) {
                                var i = a.owner,
                                    r = a.title,
                                    s = a.url_sq,
                                    c = a.id,
                                    l = "http://www.flickr.com/photos/" + i + "/" + c,
                                    o = t("<img/>").attr({
                                        src: s,
                                        alt: r
                                    }),
                                    p = t("<a/>").attr({
                                        href: l,
                                        target: "_blank",
                                        title: r
                                    }),
                                    f = t(p).append(o),
                                    d = t("<li/>").append(f);
                                t("ul", n).append(d)
                            })
                        })
                    })), "instagram" == i.social_network) {
                    n.append("<ul></ul>");
                    var c = "1024641492.18869b6.ad837e373be44c3fb5dce9e27e0954d8";
                    r = "https://api.instagram.com/v1/users/search?q=" + i.username + "&access_token=" + c + "&count=1&callback=?", t.getJSON(r, function(e) {
                        t.each(e.data, function(e, a) {
                            var s = a.username;
                            if (s == i.username) {
                                var l = a.id;
                                "" != l && (r = "https://api.instagram.com/v1/users/" + l + "/media/recent/?access_token=" + c + "&count=" + i.limit + "&callback=?", t.getJSON(r, function(e) {
                                    t.each(e.data, function(e, a) {
                                        var i = a.images.thumbnail.url,
                                            r = a.link,
                                            s = "";
                                        null != a.caption && (s = a.caption.text);
                                        var c = t("<img/>").attr({
                                                src: i,
                                                alt: s
                                            }),
                                            l = t("<a/>").attr({
                                                href: r,
                                                target: "_blank",
                                                title: s
                                            }),
                                            o = t(l).append(c),
                                            p = t("<li/>").append(o);
                                        t("ul", n).append(p)
                                    })
                                }))
                            }
                        })
                    })
                }
            })
        }
    })
}(jQuery);

/* Typed JS */
! function(t) {
    "use strict";
    var s = function(s, e) {
        this.el = t(s), this.options = t.extend({}, t.fn.typed.defaults, e), this.isInput = this.el.is("input"), this.attr = this.options.attr, this.showCursor = this.isInput ? !1 : this.options.showCursor, this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text(), this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build()
    };
    s.prototype = {
        constructor: s,
        init: function() {
            var t = this;
            t.timeout = setTimeout(function() {
                for (var s = 0; s < t.strings.length; ++s) t.sequence[s] = s;
                t.shuffle && (t.sequence = t.shuffleArray(t.sequence)), t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos)
            }, t.startDelay)
        },
        build: function() {
            this.showCursor === !0 && (this.cursor = t('<span class="typed-cursor">' + this.cursorChar + "</span>"), this.el.after(this.cursor)), this.init()
        },
        typewrite: function(t, s) {
            if (this.stop !== !0) {
                var e = Math.round(70 * Math.random()) + this.typeSpeed,
                    o = this;
                o.timeout = setTimeout(function() {
                    var e = 0,
                        r = t.substr(s);
                    if ("^" === r.charAt(0)) {
                        var i = 1;
                        /^\^\d+/.test(r) && (r = /\d+/.exec(r)[0], i += r.length, e = parseInt(r)), t = t.substring(0, s) + t.substring(s + i)
                    }
                    if ("html" === o.contentType) {
                        var n = t.substr(s).charAt(0);
                        if ("<" === n || "&" === n) {
                            var a = "",
                                h = "";
                            for (h = "<" === n ? ">" : ";"; t.substr(s).charAt(0) !== h;) a += t.substr(s).charAt(0), s++;
                            s++, a += h
                        }
                    }
                    o.timeout = setTimeout(function() {
                        if (s === t.length) {
                            if (o.options.onStringTyped(o.arrayPos), o.arrayPos === o.strings.length - 1 && (o.options.callback(), o.curLoop++, o.loop === !1 || o.curLoop === o.loopCount)) return;
                            o.timeout = setTimeout(function() {
                                o.backspace(t, s)
                            }, o.backDelay)
                        } else {
                            0 === s && o.options.preStringTyped(o.arrayPos);
                            var e = t.substr(0, s + 1);
                            o.attr ? o.el.attr(o.attr, e) : o.isInput ? o.el.val(e) : "html" === o.contentType ? o.el.html(e) : o.el.text(e), s++, o.typewrite(t, s)
                        }
                    }, e)
                }, e)
            }
        },
        backspace: function(t, s) {
            if (this.stop !== !0) {
                var e = Math.round(70 * Math.random()) + this.backSpeed,
                    o = this;
                o.timeout = setTimeout(function() {
                    if ("html" === o.contentType && ">" === t.substr(s).charAt(0)) {
                        for (var e = "";
                            "<" !== t.substr(s).charAt(0);) e -= t.substr(s).charAt(0), s--;
                        s--, e += "<"
                    }
                    var r = t.substr(0, s);
                    o.attr ? o.el.attr(o.attr, r) : o.isInput ? o.el.val(r) : "html" === o.contentType ? o.el.html(r) : o.el.text(r), s > o.stopNum ? (s--, o.backspace(t, s)) : s <= o.stopNum && (o.arrayPos++, o.arrayPos === o.strings.length ? (o.arrayPos = 0, o.shuffle && (o.sequence = o.shuffleArray(o.sequence)), o.init()) : o.typewrite(o.strings[o.sequence[o.arrayPos]], s))
                }, e)
            }
        },
        shuffleArray: function(t) {
            var s, e, o = t.length;
            if (o)
                for (; --o;) e = Math.floor(Math.random() * (o + 1)), s = t[e], t[e] = t[o], t[o] = s;
            return t
        },
        reset: function() {
            var t = this;
            clearInterval(t.timeout);
            var s = this.el.attr("id");
            this.el.after('<span id="' + s + '"/>'), this.el.remove(), "undefined" != typeof this.cursor && this.cursor.remove(), t.options.resetCallback()
        }
    }, t.fn.typed = function(e) {
        return this.each(function() {
            var o = t(this),
                r = o.data("typed"),
                i = "object" == typeof e && e;
            r || o.data("typed", r = new s(this, i)), "string" == typeof e && r[e]()
        })
    }, t.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        shuffle: !1,
        backDelay: 500,
        loop: !1,
        loopCount: !1,
        showCursor: !0,
        cursorChar: "|",
        attr: null,
        contentType: "html",
        callback: function() {},
        preStringTyped: function() {},
        onStringTyped: function() {},
        resetCallback: function() {}
    }
}(window.jQuery);

/* Parallax */
! function(a) {
    "use strict";

    function l() {
        j = a.innerWidth || document.documentElement.clientWidth, k = a.innerHeight || document.documentElement.clientHeight
    }

    function o(a, b, c) {
        a.addEventListener ? a.addEventListener(b, c) : a.attachEvent("on" + b, function() {
            c.call(a)
        })
    }

    function p(b) {
        a.requestAnimationFrame(function() {
            "scroll" !== b.type && l();
            for (var a = 0, c = m.length; a < c; a++) "scroll" !== b.type && (m[a].coverImage(), m[a].clipContainer()), m[a].onScroll()
        })
    }
    Date.now || (Date.now = function() {
        return (new Date).getTime()
    }), a.requestAnimationFrame || function() {
        for (var b = ["webkit", "moz"], c = 0; c < b.length && !a.requestAnimationFrame; ++c) {
            var d = b[c];
            a.requestAnimationFrame = a[d + "RequestAnimationFrame"], a.cancelAnimationFrame = a[d + "CancelAnimationFrame"] || a[d + "CancelRequestAnimationFrame"]
        }
        if (/iP(ad|hone|od).*OS 6/.test(a.navigator.userAgent) || !a.requestAnimationFrame || !a.cancelAnimationFrame) {
            var e = 0;
            a.requestAnimationFrame = function(a) {
                var b = Date.now(),
                    c = Math.max(e + 16, b);
                return setTimeout(function() {
                    a(e = c)
                }, c - b)
            }, a.cancelAnimationFrame = clearTimeout
        }
    }();
    var j, k, b = function() {
            if (!a.getComputedStyle) return !1;
            var c, b = document.createElement("p"),
                d = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            (document.body || document.documentElement).insertBefore(b, null);
            for (var e in d) void 0 !== b.style[e] && (b.style[e] = "translate3d(1px,1px,1px)", c = a.getComputedStyle(b).getPropertyValue(d[e]));
            return (document.body || document.documentElement).removeChild(b), void 0 !== c && c.length > 0 && "none" !== c
        }(),
        c = navigator.userAgent.toLowerCase().indexOf("android") > -1,
        d = /iPad|iPhone|iPod/.test(navigator.userAgent) && !a.MSStream,
        e = !!a.opera,
        f = /Edge\/\d+/.test(navigator.userAgent),
        g = /Trident.*rv[ :]*11\./.test(navigator.userAgent),
        h = !!Function("/*@cc_on return document.documentMode===10@*/")(),
        i = document.all && !a.atob;
    l();
    var m = [],
        n = function() {
            function b(b, i) {
                var k, j = this;
                if (j.$item = b, j.defaults = {
                        type: "scroll",
                        speed: .5,
                        imgSrc: null,
                        imgWidth: null,
                        imgHeight: null,
                        enableTransform: !0,
                        elementInViewport: null,
                        zIndex: -100,
                        noAndroid: !1,
                        noIos: !0,
                        onScroll: null,
                        onInit: null,
                        onDestroy: null,
                        onCoverImage: null
                    }, k = JSON.parse(j.$item.getAttribute("data-jarallax") || "{}"), j.options = j.extend({}, j.defaults, k, i), !(c && j.options.noAndroid || d && j.options.noIos)) {
                    j.options.speed = Math.min(2, Math.max(-1, parseFloat(j.options.speed)));
                    var l = j.options.elementInViewport;
                    l && "object" == typeof l && void 0 !== l.length && (l = l[0]), !l instanceof Element && (l = null), j.options.elementInViewport = l, j.instanceID = a++, j.image = {
                        src: j.options.imgSrc || null,
                        $container: null,
                        $item: null,
                        width: j.options.imgWidth || null,
                        height: j.options.imgHeight || null,
                        useImgTag: d || c || e || g || h || f
                    }, j.initImg() && j.init()
                }
            }
            var a = 0;
            return b
        }();
    n.prototype.css = function(b, c) {
        if ("string" == typeof c) return a.getComputedStyle ? a.getComputedStyle(b).getPropertyValue(c) : b.style[c];
        c.transform && (c.WebkitTransform = c.MozTransform = c.transform);
        for (var d in c) b.style[d] = c[d];
        return b
    }, n.prototype.extend = function(a) {
        a = a || {};
        for (var b = 1; b < arguments.length; b++)
            if (arguments[b])
                for (var c in arguments[b]) arguments[b].hasOwnProperty(c) && (a[c] = arguments[b][c]);
        return a
    }, n.prototype.initImg = function() {
        var a = this;
        return null === a.image.src && (a.image.src = a.css(a.$item, "background-image").replace(/^url\(['"]?/g, "").replace(/['"]?\)$/g, "")), !(!a.image.src || "none" === a.image.src)
    }, n.prototype.init = function() {
        function g() {
            a.coverImage(), a.clipContainer(), a.onScroll(!0), a.options.onInit && a.options.onInit.call(a), setTimeout(function() {
                a.$item && a.css(a.$item, {
                    "background-image": "none",
                    "background-attachment": "scroll",
                    "background-size": "auto"
                })
            }, 0)
        }
        var a = this,
            c = {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                pointerEvents: "none"
            },
            d = {
                position: "fixed"
            };
        a.$item.setAttribute("data-jarallax-original-styles", a.$item.getAttribute("style")), "static" === a.css(a.$item, "position") && a.css(a.$item, {
            position: "relative"
        }), "auto" === a.css(a.$item, "z-index") && a.css(a.$item, {
            zIndex: 0
        }), a.image.$container = document.createElement("div"), a.css(a.image.$container, c), a.css(a.image.$container, {
            visibility: "hidden",
            "z-index": a.options.zIndex
        }), a.image.$container.setAttribute("id", "jarallax-container-" + a.instanceID), a.$item.appendChild(a.image.$container), a.image.useImgTag && b && a.options.enableTransform ? (a.image.$item = document.createElement("img"), a.image.$item.setAttribute("src", a.image.src), d = a.extend({
            "max-width": "none"
        }, c, d)) : (a.image.$item = document.createElement("div"), d = a.extend({
            "background-position": "50% 50%",
            "background-size": "100% auto",
            "background-repeat": "no-repeat no-repeat",
            "background-image": 'url("' + a.image.src + '")'
        }, c, d)), i && (d.backgroundAttachment = "fixed"), a.parentWithTransform = 0;
        for (var e = a.$item; null !== e && e !== document && 0 === a.parentWithTransform;) {
            var f = a.css(e, "-webkit-transform") || a.css(e, "-moz-transform") || a.css(e, "transform");
            f && "none" !== f && (a.parentWithTransform = 1, a.css(a.image.$container, {
                transform: "translateX(0) translateY(0)"
            })), e = e.parentNode
        }
        a.css(a.image.$item, d), a.image.$container.appendChild(a.image.$item), a.image.width && a.image.height ? g() : a.getImageSize(a.image.src, function(b, c) {
            a.image.width = b, a.image.height = c, g()
        }), m.push(a)
    }, n.prototype.destroy = function() {
        for (var a = this, b = 0, c = m.length; b < c; b++)
            if (m[b].instanceID === a.instanceID) {
                m.splice(b, 1);
                break
            } var d = a.$item.getAttribute("data-jarallax-original-styles");
        a.$item.removeAttribute("data-jarallax-original-styles"), "null" === d ? a.$item.removeAttribute("style") : a.$item.setAttribute("style", d), a.$clipStyles && a.$clipStyles.parentNode.removeChild(a.$clipStyles), a.image.$container.parentNode.removeChild(a.image.$container), a.options.onDestroy && a.options.onDestroy.call(a), delete a.$item.jarallax;
        for (var e in a) delete a[e]
    }, n.prototype.getImageSize = function(a, b) {
        if (a && b) {
            var c = new Image;
            c.onload = function() {
                b(c.width, c.height)
            }, c.src = a
        }
    }, n.prototype.clipContainer = function() {
        if (!i) {
            var a = this,
                b = a.image.$container.getBoundingClientRect(),
                c = b.width,
                d = b.height;
            if (!a.$clipStyles) {
                a.$clipStyles = document.createElement("style"), a.$clipStyles.setAttribute("type", "text/css"), a.$clipStyles.setAttribute("id", "#jarallax-clip-" + a.instanceID);
                (document.head || document.getElementsByTagName("head")[0]).appendChild(a.$clipStyles)
            }
            var f = ["#jarallax-container-" + a.instanceID + " {", "   clip: rect(0 " + c + "px " + d + "px 0);", "   clip: rect(0, " + c + "px, " + d + "px, 0);", "}"].join("\n");
            a.$clipStyles.styleSheet ? a.$clipStyles.styleSheet.cssText = f : a.$clipStyles.innerHTML = f
        }
    }, n.prototype.coverImage = function() {
        var a = this;
        if (a.image.width && a.image.height) {
            var c = a.image.$container.getBoundingClientRect(),
                d = c.width,
                e = c.height,
                f = c.left,
                g = a.image.width,
                h = a.image.height,
                i = a.options.speed,
                j = "scroll" === a.options.type || "scroll-opacity" === a.options.type,
                l = 0,
                m = 0,
                n = e,
                o = 0,
                p = 0;
            j && (l = i < 0 ? i * Math.max(e, k) : i * (e + k), i > 1 ? n = Math.abs(l - k) : i < 0 ? n = l / i + Math.abs(l) : n += Math.abs(k - e) * (1 - i), l /= 2), m = n * g / h, m < d && (m = d, n = m * h / g), a.bgPosVerticalCenter = 0, !(j && n < k) || b && a.options.enableTransform || (a.bgPosVerticalCenter = (k - n) / 2, n = k), j ? (o = f + (d - m) / 2, p = (k - n) / 2) : (o = (d - m) / 2, p = (e - n) / 2), b && a.options.enableTransform && a.parentWithTransform && (o -= f), a.parallaxScrollDistance = l, a.css(a.image.$item, {
                width: m + "px",
                height: n + "px",
                marginLeft: o + "px",
                marginTop: p + "px"
            }), a.options.onCoverImage && a.options.onCoverImage.call(a)
        }
    }, n.prototype.isVisible = function() {
        return this.isElementInViewport || !1
    }, n.prototype.onScroll = function(a) {
        var c = this;
        if (c.image.width && c.image.height) {
            var d = c.$item.getBoundingClientRect(),
                e = d.top,
                f = d.height,
                g = {
                    position: "absolute",
                    visibility: "visible",
                    backgroundPosition: "50% 50%"
                },
                h = d;
            if (c.options.elementInViewport && (h = c.options.elementInViewport.getBoundingClientRect()), c.isElementInViewport = h.bottom >= 0 && h.right >= 0 && h.top <= k && h.left <= j, a || c.isElementInViewport) {
                var l = Math.max(0, e),
                    m = Math.max(0, f + e),
                    n = Math.max(0, -e),
                    o = Math.max(0, e + f - k),
                    p = Math.max(0, f - (e + f - k)),
                    q = Math.max(0, -e + k - f),
                    r = 1 - 2 * (k - e) / (k + f),
                    s = 1;
                if (f < k ? s = 1 - (n || o) / f : m <= k ? s = m / k : p <= k && (s = p / k), "opacity" !== c.options.type && "scale-opacity" !== c.options.type && "scroll-opacity" !== c.options.type || (g.transform = "translate3d(0, 0, 0)", g.opacity = s), "scale" === c.options.type || "scale-opacity" === c.options.type) {
                    var t = 1;
                    c.options.speed < 0 ? t -= c.options.speed * s : t += c.options.speed * (1 - s), g.transform = "scale(" + t + ") translate3d(0, 0, 0)"
                }
                if ("scroll" === c.options.type || "scroll-opacity" === c.options.type) {
                    var u = c.parallaxScrollDistance * r;
                    b && c.options.enableTransform ? (c.parentWithTransform && (u -= e), g.transform = "translate3d(0, " + u + "px, 0)") : c.image.useImgTag ? g.top = u + "px" : (c.bgPosVerticalCenter && (u += c.bgPosVerticalCenter), g.backgroundPosition = "50% " + u + "px"), g.position = i ? "absolute" : "fixed"
                }
                c.css(c.image.$item, g), c.options.onScroll && c.options.onScroll.call(c, {
                    section: d,
                    beforeTop: l,
                    beforeTopEnd: m,
                    afterTop: n,
                    beforeBottom: o,
                    beforeBottomEnd: p,
                    afterBottom: q,
                    visiblePercent: s,
                    fromViewportCenter: r
                })
            }
        }
    }, o(a, "scroll", p), o(a, "resize", p), o(a, "orientationchange", p), o(a, "load", p);
    var q = function(a) {
        ("object" == typeof HTMLElement ? a instanceof HTMLElement : a && "object" == typeof a && null !== a && 1 === a.nodeType && "string" == typeof a.nodeName) && (a = [a]);
        var f, b = arguments[1],
            c = Array.prototype.slice.call(arguments, 2),
            d = a.length,
            e = 0;
        for (e; e < d; e++)
            if ("object" == typeof b || void 0 === b ? a[e].jarallax || (a[e].jarallax = new n(a[e], b)) : a[e].jarallax && (f = a[e].jarallax[b].apply(a[e].jarallax, c)), void 0 !== f) return f;
        return a
    };
    q.constructor = n;
    var r = a.jarallax;
    if (a.jarallax = q, a.jarallax.noConflict = function() {
            return a.jarallax = r, this
        }, "undefined" != typeof jQuery) {
        var s = function() {
            var b = arguments || [];
            Array.prototype.unshift.call(b, this);
            var c = q.apply(a, b);
            return "object" != typeof c ? c : this
        };
        s.constructor = n;
        var t = jQuery.fn.jarallax;
        jQuery.fn.jarallax = s, jQuery.fn.jarallax.noConflict = function() {
            return jQuery.fn.jarallax = t, this
        }
    }
    o(a, "DOMContentLoaded", function() {
        q(document.querySelectorAll("[data-jarallax], [data-jarallax-video]"))
    })
}(window);

var hb_gs = window.GreenSockGlobals = {};

/* TweenMax */
(window._gsQueue || (window._gsQueue = [])).push(function() {
        "use strict";
        window._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var s = [].slice,
                    r = function(t, e, s) {
                        i.call(this, t, e, s), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = r.prototype.render
                    },
                    n = 1e-10,
                    a = i._internals,
                    o = a.isSelector,
                    h = a.isArray,
                    l = r.prototype = i.to({}, .1, {}),
                    _ = [];
                r.version = "1.12.1", l.constructor = r, l.kill()._gc = !1, r.killTweensOf = r.killDelayedCallsTo = i.killTweensOf, r.getTweensOf = i.getTweensOf, r.lagSmoothing = i.lagSmoothing, r.ticker = i.ticker, r.render = i.render, l.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
                }, l.updateTo = function(t, e) {
                    var s, r = this.ratio;
                    e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                    for (s in t) this.vars[s] = t[s];
                    if (this._initted)
                        if (e) this._initted = !1;
                        else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                        var n = this._time;
                        this.render(0, !0, !1), this._initted = !1, this.render(n, !0, !1)
                    } else if (this._time > 0) {
                        this._initted = !1, this._init();
                        for (var a, o = 1 / (1 - r), h = this._firstPT; h;) a = h.s + h.c, h.c *= o, h.s = a - h.c, h = h._next
                    }
                    return this
                }, l.render = function(t, e, i) {
                    this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                    var s, r, o, h, l, u, p, f, c = this._dirty ? this.totalDuration() : this._totalDuration,
                        m = this._time,
                        d = this._totalTime,
                        g = this._cycle,
                        v = this._duration,
                        y = this._rawPrevTime;
                    if (t >= c ? (this._totalTime = c, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = v, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (s = !0, r = "onComplete"), 0 === v && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > y || y === n) && y !== t && (i = !0, y > n && (r = "onReverseComplete")), this._rawPrevTime = f = !e || t || y === t ? t : n)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== d || 0 === v && y > 0 && y !== n) && (r = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === v && (this._initted || !this.vars.lazy || i) && (y >= 0 && (i = !0), this._rawPrevTime = f = !e || t || y === t ? t : n)) : this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (h = v + this._repeatDelay, this._cycle = this._totalTime / h >> 0, 0 !== this._cycle && this._cycle === this._totalTime / h && this._cycle--, this._time = this._totalTime - this._cycle * h, this._yoyo && 0 !== (1 & this._cycle) && (this._time = v - this._time), this._time > v ? this._time = v : 0 > this._time && (this._time = 0)), this._easeType ? (l = this._time / v, u = this._easeType, p = this._easePower, (1 === u || 3 === u && l >= .5) && (l = 1 - l), 3 === u && (l *= 2), 1 === p ? l *= l : 2 === p ? l *= l * l : 3 === p ? l *= l * l * l : 4 === p && (l *= l * l * l * l), this.ratio = 1 === u ? 1 - l : 2 === u ? l : .5 > this._time / v ? l / 2 : 1 - l / 2) : this.ratio = this._ease.getRatio(this._time / v)), m === this._time && !i && g === this._cycle) return d !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _)), void 0;
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = m, this._totalTime = d, this._rawPrevTime = y, this._cycle = g, a.lazyTweens.push(this), this._lazy = t, void 0;
                        this._time && !s ? this.ratio = this._ease.getRatio(this._time / v) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== m && t >= 0 && (this._active = !0), 0 === d && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === v) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
                    this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._totalTime !== d || s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _)), this._cycle !== g && (e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || _)), r && (this._gc || (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || _), 0 === v && this._rawPrevTime === n && f !== n && (this._rawPrevTime = 0)))
                }, r.to = function(t, e, i) {
                    return new r(t, e, i)
                }, r.from = function(t, e, i) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new r(t, e, i)
                }, r.fromTo = function(t, e, i, s) {
                    return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new r(t, e, s)
                }, r.staggerTo = r.allTo = function(t, e, n, a, l, u, p) {
                    a = a || 0;
                    var f, c, m, d, g = n.delay || 0,
                        v = [],
                        y = function() {
                            n.onComplete && n.onComplete.apply(n.onCompleteScope || this, arguments), l.apply(p || this, u || _)
                        };
                    for (h(t) || ("string" == typeof t && (t = i.selector(t) || t), o(t) && (t = s.call(t, 0))), f = t.length, m = 0; f > m; m++) {
                        c = {};
                        for (d in n) c[d] = n[d];
                        c.delay = g, m === f - 1 && l && (c.onComplete = y), v[m] = new r(t[m], e, c), g += a
                    }
                    return v
                }, r.staggerFrom = r.allFrom = function(t, e, i, s, n, a, o) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, r.staggerTo(t, e, i, s, n, a, o)
                }, r.staggerFromTo = r.allFromTo = function(t, e, i, s, n, a, o, h) {
                    return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, r.staggerTo(t, e, s, n, a, o, h)
                }, r.delayedCall = function(t, e, i, s, n) {
                    return new r(e, 0, {
                        delay: t,
                        onComplete: e,
                        onCompleteParams: i,
                        onCompleteScope: s,
                        onReverseComplete: e,
                        onReverseCompleteParams: i,
                        onReverseCompleteScope: s,
                        immediateRender: !1,
                        useFrames: n,
                        overwrite: 0
                    })
                }, r.set = function(t, e) {
                    return new r(t, 0, e)
                }, r.isTweening = function(t) {
                    return i.getTweensOf(t, !0).length > 0
                };
                var u = function(t, e) {
                        for (var s = [], r = 0, n = t._first; n;) n instanceof i ? s[r++] = n : (e && (s[r++] = n), s = s.concat(u(n, e)), r = s.length), n = n._next;
                        return s
                    },
                    p = r.getAllTweens = function(e) {
                        return u(t._rootTimeline, e).concat(u(t._rootFramesTimeline, e))
                    };
                r.killAll = function(t, i, s, r) {
                    null == i && (i = !0), null == s && (s = !0);
                    var n, a, o, h = p(0 != r),
                        l = h.length,
                        _ = i && s && r;
                    for (o = 0; l > o; o++) a = h[o], (_ || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && (t ? a.totalTime(a._reversed ? 0 : a.totalDuration()) : a._enabled(!1, !1))
                }, r.killChildTweensOf = function(t, e) {
                    if (null != t) {
                        var n, l, _, u, p, f = a.tweenLookup;
                        if ("string" == typeof t && (t = i.selector(t) || t), o(t) && (t = s.call(t, 0)), h(t))
                            for (u = t.length; --u > -1;) r.killChildTweensOf(t[u], e);
                        else {
                            n = [];
                            for (_ in f)
                                for (l = f[_].target.parentNode; l;) l === t && (n = n.concat(f[_].tweens)), l = l.parentNode;
                            for (p = n.length, u = 0; p > u; u++) e && n[u].totalTime(n[u].totalDuration()), n[u]._enabled(!1, !1)
                        }
                    }
                };
                var f = function(t, i, s, r) {
                    i = i !== !1, s = s !== !1, r = r !== !1;
                    for (var n, a, o = p(r), h = i && s && r, l = o.length; --l > -1;) a = o[l], (h || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && a.paused(t)
                };
                return r.pauseAll = function(t, e, i) {
                    f(!0, t, e, i)
                }, r.resumeAll = function(t, e, i) {
                    f(!1, t, e, i)
                }, r.globalTimeScale = function(e) {
                    var s = t._rootTimeline,
                        r = i.ticker.time;
                    return arguments.length ? (e = e || n, s._startTime = r - (r - s._startTime) * s._timeScale / e, s = t._rootFramesTimeline, r = i.ticker.frame, s._startTime = r - (r - s._startTime) * s._timeScale / e, s._timeScale = t._rootTimeline._timeScale = e, e) : s._timeScale
                }, l.progress = function(t) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
                }, l.totalProgress = function(t) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
                }, l.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, l.duration = function(e) {
                    return arguments.length ? t.prototype.duration.call(this, e) : this._duration
                }, l.totalDuration = function(t) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                }, l.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, l.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, l.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, r
            }, !0), window._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var s = function(t) {
                        e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                        var i, s, r = this.vars;
                        for (s in r) i = r[s], a(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
                        a(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
                    },
                    r = 1e-10,
                    n = i._internals.isSelector,
                    a = i._internals.isArray,
                    o = [],
                    h = window._gsDefine.globals,
                    l = function(t) {
                        var e, i = {};
                        for (e in t) i[e] = t[e];
                        return i
                    },
                    _ = function(t, e, i, s) {
                        t._timeline.pause(t._startTime), e && e.apply(s || t._timeline, i || o)
                    },
                    u = o.slice,
                    p = s.prototype = new e;
                return s.version = "1.12.1", p.constructor = s, p.kill()._gc = !1, p.to = function(t, e, s, r) {
                    var n = s.repeat && h.TweenMax || i;
                    return e ? this.add(new n(t, e, s), r) : this.set(t, s, r)
                }, p.from = function(t, e, s, r) {
                    return this.add((s.repeat && h.TweenMax || i).from(t, e, s), r)
                }, p.fromTo = function(t, e, s, r, n) {
                    var a = r.repeat && h.TweenMax || i;
                    return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n)
                }, p.staggerTo = function(t, e, r, a, o, h, _, p) {
                    var f, c = new s({
                        onComplete: h,
                        onCompleteParams: _,
                        onCompleteScope: p,
                        smoothChildTiming: this.smoothChildTiming
                    });
                    for ("string" == typeof t && (t = i.selector(t) || t), n(t) && (t = u.call(t, 0)), a = a || 0, f = 0; t.length > f; f++) r.startAt && (r.startAt = l(r.startAt)), c.to(t[f], e, l(r), f * a);
                    return this.add(c, o)
                }, p.staggerFrom = function(t, e, i, s, r, n, a, o) {
                    return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, s, r, n, a, o)
                }, p.staggerFromTo = function(t, e, i, s, r, n, a, o, h) {
                    return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, s, r, n, a, o, h)
                }, p.call = function(t, e, s, r) {
                    return this.add(i.delayedCall(0, t, e, s), r)
                }, p.set = function(t, e, s) {
                    return s = this._parseTimeOrLabel(s, 0, !0), null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused), this.add(new i(t, 0, e), s)
                }, s.exportRoot = function(t, e) {
                    t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                    var r, n, a = new s(t),
                        o = a._timeline;
                    for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;) n = r._next, e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = n;
                    return o.add(a, 0), a
                }, p.add = function(r, n, o, h) {
                    var l, _, u, p, f, c;
                    if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t)) {
                        if (r instanceof Array || r && r.push && a(r)) {
                            for (o = o || "normal", h = h || 0, l = n, _ = r.length, u = 0; _ > u; u++) a(p = r[u]) && (p = new s({
                                tweens: p
                            })), this.add(p, l), "string" != typeof p && "function" != typeof p && ("sequence" === o ? l = p._startTime + p.totalDuration() / p._timeScale : "start" === o && (p._startTime -= p.delay())), l += h;
                            return this._uncache(!0)
                        }
                        if ("string" == typeof r) return this.addLabel(r, n);
                        if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                        r = i.delayedCall(0, r)
                    }
                    if (e.prototype.add.call(this, r, n), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                        for (f = this, c = f.rawTime() > r._startTime; f._timeline;) c && f._timeline.smoothChildTiming ? f.totalTime(f._totalTime, !0) : f._gc && f._enabled(!0, !1), f = f._timeline;
                    return this
                }, p.remove = function(e) {
                    if (e instanceof t) return this._remove(e, !1);
                    if (e instanceof Array || e && e.push && a(e)) {
                        for (var i = e.length; --i > -1;) this.remove(e[i]);
                        return this
                    }
                    return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
                }, p._remove = function(t, i) {
                    e.prototype._remove.call(this, t, i);
                    var s = this._last;
                    return s ? this._time > s._startTime + s._totalDuration / s._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                }, p.append = function(t, e) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
                }, p.insert = p.insertMultiple = function(t, e, i, s) {
                    return this.add(t, e || 0, i, s)
                }, p.appendMultiple = function(t, e, i, s) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s)
                }, p.addLabel = function(t, e) {
                    return this._labels[t] = this._parseTimeOrLabel(e), this
                }, p.addPause = function(t, e, i, s) {
                    return this.call(_, ["{self}", e, i, s], this, t)
                }, p.removeLabel = function(t) {
                    return delete this._labels[t], this
                }, p.getLabelTime = function(t) {
                    return null != this._labels[t] ? this._labels[t] : -1
                }, p._parseTimeOrLabel = function(e, i, s, r) {
                    var n;
                    if (r instanceof t && r.timeline === this) this.remove(r);
                    else if (r && (r instanceof Array || r.push && a(r)))
                        for (n = r.length; --n > -1;) r[n] instanceof t && r[n].timeline === this && this.remove(r[n]);
                    if ("string" == typeof i) return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);
                    if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
                    else {
                        if (n = e.indexOf("="), -1 === n) return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                        i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)), e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration()
                    }
                    return Number(e) + i
                }, p.seek = function(t, e) {
                    return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
                }, p.stop = function() {
                    return this.paused(!0)
                }, p.gotoAndPlay = function(t, e) {
                    return this.play(t, e)
                }, p.gotoAndStop = function(t, e) {
                    return this.pause(t, e)
                }, p.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var s, n, a, h, l, _ = this._dirty ? this.totalDuration() : this._totalDuration,
                        u = this._time,
                        p = this._startTime,
                        f = this._timeScale,
                        c = this._paused;
                    if (t >= _ ? (this._totalTime = this._time = _, this._reversed || this._hasPausedChild() || (n = !0, h = "onComplete", 0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > r && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = _ + 1e-4) : 1e-7 > t ? (this._totalTime = this._time = 0, (0 !== u || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (h = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, 0 === this._duration && this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t) : (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = 0, this._initted || (l = !0))) : this._totalTime = this._time = this._rawPrevTime = t, this._time !== u && this._first || i || l) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== u && t > 0 && (this._active = !0), 0 === u && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || o)), this._time >= u)
                            for (s = this._first; s && (a = s._next, !this._paused || c);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                        else
                            for (s = this._last; s && (a = s._prev, !this._paused || c);)(s._active || u >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                        this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || o)), h && (this._gc || (p === this._startTime || f !== this._timeScale) && (0 === this._time || _ >= this.totalDuration()) && (n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[h] && this.vars[h].apply(this.vars[h + "Scope"] || this, this.vars[h + "Params"] || o)))
                    }
                }, p._hasPausedChild = function() {
                    for (var t = this._first; t;) {
                        if (t._paused || t instanceof s && t._hasPausedChild()) return !0;
                        t = t._next
                    }
                    return !1
                }, p.getChildren = function(t, e, s, r) {
                    r = r || -9999999999;
                    for (var n = [], a = this._first, o = 0; a;) r > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a), t !== !1 && (n = n.concat(a.getChildren(!0, e, s)), o = n.length))), a = a._next;
                    return n
                }, p.getTweensOf = function(t, e) {
                    var s, r, n = this._gc,
                        a = [],
                        o = 0;
                    for (n && this._enabled(!0, !0), s = i.getTweensOf(t), r = s.length; --r > -1;)(s[r].timeline === this || e && this._contains(s[r])) && (a[o++] = s[r]);
                    return n && this._enabled(!1, !0), a
                }, p._contains = function(t) {
                    for (var e = t.timeline; e;) {
                        if (e === this) return !0;
                        e = e.timeline
                    }
                    return !1
                }, p.shiftChildren = function(t, e, i) {
                    i = i || 0;
                    for (var s, r = this._first, n = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
                    if (e)
                        for (s in n) n[s] >= i && (n[s] += t);
                    return this._uncache(!0)
                }, p._kill = function(t, e) {
                    if (!t && !e) return this._enabled(!1, !1);
                    for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1;) i[s]._kill(t, e) && (r = !0);
                    return r
                }, p.clear = function(t) {
                    var e = this.getChildren(!1, !0, !0),
                        i = e.length;
                    for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                    return t !== !1 && (this._labels = {}), this._uncache(!0)
                }, p.invalidate = function() {
                    for (var t = this._first; t;) t.invalidate(), t = t._next;
                    return this
                }, p._enabled = function(t, i) {
                    if (t === this._gc)
                        for (var s = this._first; s;) s._enabled(t, !0), s = s._next;
                    return e.prototype._enabled.call(this, t, i)
                }, p.duration = function(t) {
                    return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
                }, p.totalDuration = function(t) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var e, i, s = 0, r = this._last, n = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime, 0 > r._startTime && !r._paused && (s -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), n = 0), i = r._startTime + r._totalDuration / r._timeScale, i > s && (s = i), r = e;
                            this._duration = this._totalDuration = s, this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
                }, p.usesFrames = function() {
                    for (var e = this._timeline; e._timeline;) e = e._timeline;
                    return e === t._rootFramesTimeline
                }, p.rawTime = function() {
                    return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
                }, s
            }, !0), window._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
                var s = function(e) {
                        t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
                    },
                    r = 1e-10,
                    n = [],
                    a = new i(null, null, 1, 0),
                    o = s.prototype = new t;
                return o.constructor = s, o.kill()._gc = !1, s.version = "1.12.1", o.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
                }, o.addCallback = function(t, i, s, r) {
                    return this.add(e.delayedCall(0, t, s, r), i)
                }, o.removeCallback = function(t, e) {
                    if (t)
                        if (null == e) this._kill(null, t);
                        else
                            for (var i = this.getTweensOf(t, !1), s = i.length, r = this._parseTimeOrLabel(e); --s > -1;) i[s]._startTime === r && i[s]._enabled(!1, !1);
                    return this
                }, o.tweenTo = function(t, i) {
                    i = i || {};
                    var s, r, o, h = {
                        ease: a,
                        overwrite: i.delay ? 2 : 1,
                        useFrames: this.usesFrames(),
                        immediateRender: !1
                    };
                    for (r in i) h[r] = i[r];
                    return h.time = this._parseTimeOrLabel(t), s = Math.abs(Number(h.time) - this._time) / this._timeScale || .001, o = new e(this, s, h), h.onStart = function() {
                        o.target.paused(!0), o.vars.time !== o.target.time() && s === o.duration() && o.duration(Math.abs(o.vars.time - o.target.time()) / o.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || o, i.onStartParams || n)
                    }, o
                }, o.tweenFromTo = function(t, e, i) {
                    i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                        onComplete: this.seek,
                        onCompleteParams: [t],
                        onCompleteScope: this
                    }, i.immediateRender = i.immediateRender !== !1;
                    var s = this.tweenTo(e, i);
                    return s.duration(Math.abs(s.vars.time - t) / this._timeScale || .001)
                }, o.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var s, a, o, h, l, _, u = this._dirty ? this.totalDuration() : this._totalDuration,
                        p = this._duration,
                        f = this._time,
                        c = this._totalTime,
                        m = this._startTime,
                        d = this._timeScale,
                        g = this._rawPrevTime,
                        v = this._paused,
                        y = this._cycle;
                    if (t >= u ? (this._locked || (this._totalTime = u, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (a = !0, h = "onComplete", 0 === this._duration && (0 === t || 0 > g || g === r) && g !== t && this._first && (l = !0, g > r && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = p, t = p + 1e-4)) : 1e-7 > t ? (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== f || 0 === p && g !== r && (g > 0 || 0 > t && g >= 0) && !this._locked) && (h = "onReverseComplete", a = this._reversed), 0 > t ? (this._active = !1, 0 === p && g >= 0 && this._first && (l = !0), this._rawPrevTime = t) : (this._rawPrevTime = p || !e || t || this._rawPrevTime === t ? t : r, t = 0, this._initted || (l = !0))) : (0 === p && 0 > g && (l = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (_ = p + this._repeatDelay, this._cycle = this._totalTime / _ >> 0, 0 !== this._cycle && this._cycle === this._totalTime / _ && this._cycle--, this._time = this._totalTime - this._cycle * _, this._yoyo && 0 !== (1 & this._cycle) && (this._time = p - this._time), this._time > p ? (this._time = p, t = p + 1e-4) : 0 > this._time ? this._time = t = 0 : t = this._time))), this._cycle !== y && !this._locked) {
                        var T = this._yoyo && 0 !== (1 & y),
                            w = T === (this._yoyo && 0 !== (1 & this._cycle)),
                            x = this._totalTime,
                            b = this._cycle,
                            P = this._rawPrevTime,
                            S = this._time;
                        if (this._totalTime = y * p, y > this._cycle ? T = !T : this._totalTime += p, this._time = f, this._rawPrevTime = 0 === p ? g - 1e-4 : g, this._cycle = y, this._locked = !0, f = T ? 0 : p, this.render(f, e, 0 === p), e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || n), w && (f = T ? p + 1e-4 : -1e-4, this.render(f, !0, !1)), this._locked = !1, this._paused && !v) return;
                        this._time = S, this._totalTime = x, this._cycle = b, this._rawPrevTime = P
                    }
                    if (!(this._time !== f && this._first || i || l)) return c !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || n)), void 0;
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== c && t > 0 && (this._active = !0), 0 === c && this.vars.onStart && 0 !== this._totalTime && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || n)), this._time >= f)
                        for (s = this._first; s && (o = s._next, !this._paused || v);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = o;
                    else
                        for (s = this._last; s && (o = s._prev, !this._paused || v);)(s._active || f >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = o;
                    this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || n)), h && (this._locked || this._gc || (m === this._startTime || d !== this._timeScale) && (0 === this._time || u >= this.totalDuration()) && (a && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[h] && this.vars[h].apply(this.vars[h + "Scope"] || this, this.vars[h + "Params"] || n)))
                }, o.getActive = function(t, e, i) {
                    null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
                    var s, r, n = [],
                        a = this.getChildren(t, e, i),
                        o = 0,
                        h = a.length;
                    for (s = 0; h > s; s++) r = a[s], r.isActive() && (n[o++] = r);
                    return n
                }, o.getLabelAfter = function(t) {
                    t || 0 !== t && (t = this._time);
                    var e, i = this.getLabelsArray(),
                        s = i.length;
                    for (e = 0; s > e; e++)
                        if (i[e].time > t) return i[e].name;
                    return null
                }, o.getLabelBefore = function(t) {
                    null == t && (t = this._time);
                    for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
                        if (t > e[i].time) return e[i].name;
                    return null
                }, o.getLabelsArray = function() {
                    var t, e = [],
                        i = 0;
                    for (t in this._labels) e[i++] = {
                        time: this._labels[t],
                        name: t
                    };
                    return e.sort(function(t, e) {
                        return t.time - e.time
                    }), e
                }, o.progress = function(t) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
                }, o.totalProgress = function(t) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
                }, o.totalDuration = function(e) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                }, o.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, o.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, o.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, o.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, o.currentLabel = function(t) {
                    return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
                }, s
            }, !0),
            function() {
                var t = 180 / Math.PI,
                    e = [],
                    i = [],
                    s = [],
                    r = {},
                    n = function(t, e, i, s) {
                        this.a = t, this.b = e, this.c = i, this.d = s, this.da = s - t, this.ca = i - t, this.ba = e - t
                    },
                    a = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                    o = function(t, e, i, s) {
                        var r = {
                                a: t
                            },
                            n = {},
                            a = {},
                            o = {
                                c: s
                            },
                            h = (t + e) / 2,
                            l = (e + i) / 2,
                            _ = (i + s) / 2,
                            u = (h + l) / 2,
                            p = (l + _) / 2,
                            f = (p - u) / 8;
                        return r.b = h + (t - h) / 4, n.b = u + f, r.c = n.a = (r.b + n.b) / 2, n.c = a.a = (u + p) / 2, a.b = p - f, o.b = _ + (s - _) / 4, a.c = o.a = (a.b + o.b) / 2, [r, n, a, o]
                    },
                    h = function(t, r, n, a, h) {
                        var l, _, u, p, f, c, m, d, g, v, y, T, w, x = t.length - 1,
                            b = 0,
                            P = t[0].a;
                        for (l = 0; x > l; l++) f = t[b], _ = f.a, u = f.d, p = t[b + 1].d, h ? (y = e[l], T = i[l], w = .25 * (T + y) * r / (a ? .5 : s[l] || .5), c = u - (u - _) * (a ? .5 * r : 0 !== y ? w / y : 0), m = u + (p - u) * (a ? .5 * r : 0 !== T ? w / T : 0), d = u - (c + ((m - c) * (3 * y / (y + T) + .5) / 4 || 0))) : (c = u - .5 * (u - _) * r, m = u + .5 * (p - u) * r, d = u - (c + m) / 2), c += d, m += d, f.c = g = c, f.b = 0 !== l ? P : P = f.a + .6 * (f.c - f.a), f.da = u - _, f.ca = g - _, f.ba = P - _, n ? (v = o(_, P, g, u), t.splice(b, 1, v[0], v[1], v[2], v[3]), b += 4) : b++, P = m;
                        f = t[b], f.b = P, f.c = P + .4 * (f.d - P), f.da = f.d - f.a, f.ca = f.c - f.a, f.ba = P - f.a, n && (v = o(f.a, P, f.c, f.d), t.splice(b, 1, v[0], v[1], v[2], v[3]))
                    },
                    l = function(t, s, r, a) {
                        var o, h, l, _, u, p, f = [];
                        if (a)
                            for (t = [a].concat(t), h = t.length; --h > -1;) "string" == typeof(p = t[h][s]) && "=" === p.charAt(1) && (t[h][s] = a[s] + Number(p.charAt(0) + p.substr(2)));
                        if (o = t.length - 2, 0 > o) return f[0] = new n(t[0][s], 0, 0, t[-1 > o ? 0 : 1][s]), f;
                        for (h = 0; o > h; h++) l = t[h][s], _ = t[h + 1][s], f[h] = new n(l, 0, 0, _), r && (u = t[h + 2][s], e[h] = (e[h] || 0) + (_ - l) * (_ - l), i[h] = (i[h] || 0) + (u - _) * (u - _));
                        return f[h] = new n(t[h][s], 0, 0, t[h + 1][s]), f
                    },
                    _ = function(t, n, o, _, u, p) {
                        var f, c, m, d, g, v, y, T, w = {},
                            x = [],
                            b = p || t[0];
                        u = "string" == typeof u ? "," + u + "," : a, null == n && (n = 1);
                        for (c in t[0]) x.push(c);
                        if (t.length > 1) {
                            for (T = t[t.length - 1], y = !0, f = x.length; --f > -1;)
                                if (c = x[f], Math.abs(b[c] - T[c]) > .05) {
                                    y = !1;
                                    break
                                } y && (t = t.concat(), p && t.unshift(p), t.push(t[1]), p = t[t.length - 3])
                        }
                        for (e.length = i.length = s.length = 0, f = x.length; --f > -1;) c = x[f], r[c] = -1 !== u.indexOf("," + c + ","), w[c] = l(t, c, r[c], p);
                        for (f = e.length; --f > -1;) e[f] = Math.sqrt(e[f]), i[f] = Math.sqrt(i[f]);
                        if (!_) {
                            for (f = x.length; --f > -1;)
                                if (r[c])
                                    for (m = w[x[f]], v = m.length - 1, d = 0; v > d; d++) g = m[d + 1].da / i[d] + m[d].da / e[d], s[d] = (s[d] || 0) + g * g;
                            for (f = s.length; --f > -1;) s[f] = Math.sqrt(s[f])
                        }
                        for (f = x.length, d = o ? 4 : 1; --f > -1;) c = x[f], m = w[c], h(m, n, o, _, r[c]), y && (m.splice(0, d), m.splice(m.length - d, d));
                        return w
                    },
                    u = function(t, e, i) {
                        e = e || "soft";
                        var s, r, a, o, h, l, _, u, p, f, c, m = {},
                            d = "cubic" === e ? 3 : 2,
                            g = "soft" === e,
                            v = [];
                        if (g && i && (t = [i].concat(t)), null == t || d + 1 > t.length) throw "invalid Bezier data";
                        for (p in t[0]) v.push(p);
                        for (l = v.length; --l > -1;) {
                            for (p = v[l], m[p] = h = [], f = 0, u = t.length, _ = 0; u > _; _++) s = null == i ? t[_][p] : "string" == typeof(c = t[_][p]) && "=" === c.charAt(1) ? i[p] + Number(c.charAt(0) + c.substr(2)) : Number(c), g && _ > 1 && u - 1 > _ && (h[f++] = (s + h[f - 2]) / 2), h[f++] = s;
                            for (u = f - d + 1, f = 0, _ = 0; u > _; _ += d) s = h[_], r = h[_ + 1], a = h[_ + 2], o = 2 === d ? 0 : h[_ + 3], h[f++] = c = 3 === d ? new n(s, r, a, o) : new n(s, (2 * r + s) / 3, (2 * r + a) / 3, a);
                            h.length = f
                        }
                        return m
                    },
                    p = function(t, e, i) {
                        for (var s, r, n, a, o, h, l, _, u, p, f, c = 1 / i, m = t.length; --m > -1;)
                            for (p = t[m], n = p.a, a = p.d - n, o = p.c - n, h = p.b - n, s = r = 0, _ = 1; i >= _; _++) l = c * _, u = 1 - l, s = r - (r = (l * l * a + 3 * u * (l * o + u * h)) * l), f = m * i + _ - 1, e[f] = (e[f] || 0) + s * s
                    },
                    f = function(t, e) {
                        e = e >> 0 || 6;
                        var i, s, r, n, a = [],
                            o = [],
                            h = 0,
                            l = 0,
                            _ = e - 1,
                            u = [],
                            f = [];
                        for (i in t) p(t[i], a, e);
                        for (r = a.length, s = 0; r > s; s++) h += Math.sqrt(a[s]), n = s % e, f[n] = h, n === _ && (l += h, n = s / e >> 0, u[n] = f, o[n] = l, h = 0, f = []);
                        return {
                            length: l,
                            lengths: o,
                            segments: u
                        }
                    },
                    c = window._gsDefine.plugin({
                        propName: "bezier",
                        priority: -1,
                        version: "1.3.2",
                        API: 2,
                        global: !0,
                        init: function(t, e, i) {
                            this._target = t, e instanceof Array && (e = {
                                values: e
                            }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                            var s, r, n, a, o, h = e.values || [],
                                l = {},
                                p = h[0],
                                c = e.autoRotate || i.vars.orientToBezier;
                            this._autoRotate = c ? c instanceof Array ? c : [
                                ["x", "y", "rotation", c === !0 ? 0 : Number(c) || 0]
                            ] : null;
                            for (s in p) this._props.push(s);
                            for (n = this._props.length; --n > -1;) s = this._props[n], this._overwriteProps.push(s), r = this._func[s] = "function" == typeof t[s], l[s] = r ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]), o || l[s] !== h[0][s] && (o = l);
                            if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? _(h, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, o) : u(h, e.type, l), this._segCount = this._beziers[s].length, this._timeRes) {
                                var m = f(this._beziers, this._timeRes);
                                this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                            }
                            if (c = this._autoRotate)
                                for (this._initialRotations = [], c[0] instanceof Array || (this._autoRotate = c = [c]), n = c.length; --n > -1;) {
                                    for (a = 0; 3 > a; a++) s = c[n][a], this._func[s] = "function" == typeof t[s] ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)] : !1;
                                    s = c[n][2], this._initialRotations[n] = this._func[s] ? this._func[s].call(this._target) : this._target[s]
                                }
                            return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
                        },
                        set: function(e) {
                            var i, s, r, n, a, o, h, l, _, u, p = this._segCount,
                                f = this._func,
                                c = this._target,
                                m = e !== this._startRatio;
                            if (this._timeRes) {
                                if (_ = this._lengths, u = this._curSeg, e *= this._length, r = this._li, e > this._l2 && p - 1 > r) {
                                    for (l = p - 1; l > r && e >= (this._l2 = _[++r]););
                                    this._l1 = _[r - 1], this._li = r, this._curSeg = u = this._segments[r], this._s2 = u[this._s1 = this._si = 0]
                                } else if (this._l1 > e && r > 0) {
                                    for (; r > 0 && (this._l1 = _[--r]) >= e;);
                                    0 === r && this._l1 > e ? this._l1 = 0 : r++, this._l2 = _[r], this._li = r, this._curSeg = u = this._segments[r], this._s1 = u[(this._si = u.length - 1) - 1] || 0, this._s2 = u[this._si]
                                }
                                if (i = r, e -= this._l1, r = this._si, e > this._s2 && u.length - 1 > r) {
                                    for (l = u.length - 1; l > r && e >= (this._s2 = u[++r]););
                                    this._s1 = u[r - 1], this._si = r
                                } else if (this._s1 > e && r > 0) {
                                    for (; r > 0 && (this._s1 = u[--r]) >= e;);
                                    0 === r && this._s1 > e ? this._s1 = 0 : r++, this._s2 = u[r], this._si = r
                                }
                                o = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec
                            } else i = 0 > e ? 0 : e >= 1 ? p - 1 : p * e >> 0, o = (e - i * (1 / p)) * p;
                            for (s = 1 - o, r = this._props.length; --r > -1;) n = this._props[r], a = this._beziers[n][i], h = (o * o * a.da + 3 * s * (o * a.ca + s * a.ba)) * o + a.a, this._round[n] && (h = Math.round(h)), f[n] ? c[n](h) : c[n] = h;
                            if (this._autoRotate) {
                                var d, g, v, y, T, w, x, b = this._autoRotate;
                                for (r = b.length; --r > -1;) n = b[r][2], w = b[r][3] || 0, x = b[r][4] === !0 ? 1 : t, a = this._beziers[b[r][0]], d = this._beziers[b[r][1]], a && d && (a = a[i], d = d[i], g = a.a + (a.b - a.a) * o, y = a.b + (a.c - a.b) * o, g += (y - g) * o, y += (a.c + (a.d - a.c) * o - y) * o, v = d.a + (d.b - d.a) * o, T = d.b + (d.c - d.b) * o, v += (T - v) * o, T += (d.c + (d.d - d.c) * o - T) * o, h = m ? Math.atan2(T - v, y - g) * x + w : this._initialRotations[r], f[n] ? c[n](h) : c[n] = h)
                            }
                        }
                    }),
                    m = c.prototype;
                c.bezierThrough = _, c.cubicToQuadratic = o, c._autoCSS = !0, c.quadraticToCubic = function(t, e, i) {
                    return new n(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
                }, c._cssRegister = function() {
                    var t = window._gsDefine.globals.CSSPlugin;
                    if (t) {
                        var e = t._internals,
                            i = e._parseToProxy,
                            s = e._setPluginRatio,
                            r = e.CSSPropTween;
                        e._registerComplexSpecialProp("bezier", {
                            parser: function(t, e, n, a, o, h) {
                                e instanceof Array && (e = {
                                    values: e
                                }), h = new c;
                                var l, _, u, p = e.values,
                                    f = p.length - 1,
                                    m = [],
                                    d = {};
                                if (0 > f) return o;
                                for (l = 0; f >= l; l++) u = i(t, p[l], a, o, h, f !== l), m[l] = u.end;
                                for (_ in e) d[_] = e[_];
                                return d.values = m, o = new r(t, "bezier", 0, 0, u.pt, 2), o.data = u, o.plugin = h, o.setRatio = s, 0 === d.autoRotate && (d.autoRotate = !0), !d.autoRotate || d.autoRotate instanceof Array || (l = d.autoRotate === !0 ? 0 : Number(d.autoRotate), d.autoRotate = null != u.end.left ? [
                                    ["left", "top", "rotation", l, !1]
                                ] : null != u.end.x ? [
                                    ["x", "y", "rotation", l, !1]
                                ] : !1), d.autoRotate && (a._transform || a._enableTransforms(!1), u.autoRotate = a._target._gsTransform), h._onInitTween(u.proxy, d, a._tween), o
                            }
                        })
                    }
                }, m._roundProps = function(t, e) {
                    for (var i = this._overwriteProps, s = i.length; --s > -1;)(t[i[s]] || t.bezier || t.bezierThrough) && (this._round[i[s]] = e)
                }, m._kill = function(t) {
                    var e, i, s = this._props;
                    for (e in this._beziers)
                        if (e in t)
                            for (delete this._beziers[e], delete this._func[e], i = s.length; --i > -1;) s[i] === e && s.splice(i, 1);
                    return this._super._kill.call(this, t)
                }
            }(), window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
                var i, s, r, n, a = function() {
                        t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = a.prototype.setRatio
                    },
                    o = {},
                    h = a.prototype = new t("css");
                h.constructor = a, a.version = "1.12.1", a.API = 2, a.defaultTransformPerspective = 0, a.defaultSkewType = "compensated", h = "px", a.suffixMap = {
                    top: h,
                    right: h,
                    bottom: h,
                    left: h,
                    width: h,
                    height: h,
                    fontSize: h,
                    padding: h,
                    margin: h,
                    perspective: h,
                    lineHeight: ""
                };
                var l, _, u, p, f, c, m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                    d = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    g = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    v = /[^\d\-\.]/g,
                    y = /(?:\d|\-|\+|=|#|\.)*/g,
                    T = /opacity *= *([^)]*)/i,
                    w = /opacity:([^;]*)/i,
                    x = /alpha\(opacity *=.+?\)/i,
                    b = /^(rgb|hsl)/,
                    P = /([A-Z])/g,
                    S = /-([a-z])/gi,
                    k = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    R = function(t, e) {
                        return e.toUpperCase()
                    },
                    A = /(?:Left|Right|Width)/i,
                    C = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    O = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    D = /,(?=[^\)]*(?:\(|$))/gi,
                    M = Math.PI / 180,
                    z = 180 / Math.PI,
                    I = {},
                    E = document,
                    L = E.createElement("div"),
                    F = E.createElement("img"),
                    N = a._internals = {
                        _specialProps: o
                    },
                    X = navigator.userAgent,
                    U = function() {
                        var t, e = X.indexOf("Android"),
                            i = E.createElement("div");
                        return u = -1 !== X.indexOf("Safari") && -1 === X.indexOf("Chrome") && (-1 === e || Number(X.substr(e + 8, 1)) > 3), f = u && 6 > Number(X.substr(X.indexOf("Version/") + 8, 1)), p = -1 !== X.indexOf("Firefox"), /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(X) && (c = parseFloat(RegExp.$1)), i.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", t = i.getElementsByTagName("a")[0], t ? /^0.55/.test(t.style.opacity) : !1
                    }(),
                    Y = function(t) {
                        return T.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                    },
                    j = function(t) {
                        window.console && console.log(t)
                    },
                    B = "",
                    q = "",
                    V = function(t, e) {
                        e = e || L;
                        var i, s, r = e.style;
                        if (void 0 !== r[t]) return t;
                        for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], s = 5; --s > -1 && void 0 === r[i[s] + t];);
                        return s >= 0 ? (q = 3 === s ? "ms" : i[s], B = "-" + q.toLowerCase() + "-", q + t) : null
                    },
                    W = E.defaultView ? E.defaultView.getComputedStyle : function() {},
                    G = a.getStyle = function(t, e, i, s, r) {
                        var n;
                        return U || "opacity" !== e ? (!s && t.style[e] ? n = t.style[e] : (i = i || W(t)) ? n = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(P, "-$1").toLowerCase()) : t.currentStyle && (n = t.currentStyle[e]), null == r || n && "none" !== n && "auto" !== n && "auto auto" !== n ? n : r) : Y(t)
                    },
                    $ = N.convertToPixels = function(t, i, s, r, n) {
                        if ("px" === r || !r) return s;
                        if ("auto" === r || !s) return 0;
                        var o, h, l, _ = A.test(i),
                            u = t,
                            p = L.style,
                            f = 0 > s;
                        if (f && (s = -s), "%" === r && -1 !== i.indexOf("border")) o = s / 100 * (_ ? t.clientWidth : t.clientHeight);
                        else {
                            if (p.cssText = "border:0 solid red;position:" + G(t, "position") + ";line-height:0;", "%" !== r && u.appendChild) p[_ ? "borderLeftWidth" : "borderTopWidth"] = s + r;
                            else {
                                if (u = t.parentNode || E.body, h = u._gsCache, l = e.ticker.frame, h && _ && h.time === l) return h.width * s / 100;
                                p[_ ? "width" : "height"] = s + r
                            }
                            u.appendChild(L), o = parseFloat(L[_ ? "offsetWidth" : "offsetHeight"]), u.removeChild(L), _ && "%" === r && a.cacheWidths !== !1 && (h = u._gsCache = u._gsCache || {}, h.time = l, h.width = 100 * (o / s)), 0 !== o || n || (o = $(t, i, s, r, !0))
                        }
                        return f ? -o : o
                    },
                    Z = N.calculateOffset = function(t, e, i) {
                        if ("absolute" !== G(t, "position", i)) return 0;
                        var s = "left" === e ? "Left" : "Top",
                            r = G(t, "margin" + s, i);
                        return t["offset" + s] - ($(t, e, parseFloat(r), r.replace(y, "")) || 0)
                    },
                    Q = function(t, e) {
                        var i, s, r = {};
                        if (e = e || W(t, null))
                            if (i = e.length)
                                for (; --i > -1;) r[e[i].replace(S, R)] = e.getPropertyValue(e[i]);
                            else
                                for (i in e) r[i] = e[i];
                        else if (e = t.currentStyle || t.style)
                            for (i in e) "string" == typeof i && void 0 === r[i] && (r[i.replace(S, R)] = e[i]);
                        return U || (r.opacity = Y(t)), s = Pe(t, e, !1), r.rotation = s.rotation, r.skewX = s.skewX, r.scaleX = s.scaleX, r.scaleY = s.scaleY, r.x = s.x, r.y = s.y, xe && (r.z = s.z, r.rotationX = s.rotationX, r.rotationY = s.rotationY, r.scaleZ = s.scaleZ), r.filters && delete r.filters, r
                    },
                    H = function(t, e, i, s, r) {
                        var n, a, o, h = {},
                            l = t.style;
                        for (a in i) "cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (n = i[a]) || r && r[a]) && -1 === a.indexOf("Origin") && ("number" == typeof n || "string" == typeof n) && (h[a] = "auto" !== n || "left" !== a && "top" !== a ? "" !== n && "auto" !== n && "none" !== n || "string" != typeof e[a] || "" === e[a].replace(v, "") ? n : 0 : Z(t, a), void 0 !== l[a] && (o = new ue(l, a, l[a], o)));
                        if (s)
                            for (a in s) "className" !== a && (h[a] = s[a]);
                        return {
                            difs: h,
                            firstMPT: o
                        }
                    },
                    K = {
                        width: ["Left", "Right"],
                        height: ["Top", "Bottom"]
                    },
                    J = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                    te = function(t, e, i) {
                        var s = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                            r = K[e],
                            n = r.length;
                        for (i = i || W(t, null); --n > -1;) s -= parseFloat(G(t, "padding" + r[n], i, !0)) || 0, s -= parseFloat(G(t, "border" + r[n] + "Width", i, !0)) || 0;
                        return s
                    },
                    ee = function(t, e) {
                        (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
                        var i = t.split(" "),
                            s = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
                            r = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
                        return null == r ? r = "0" : "center" === r && (r = "50%"), ("center" === s || isNaN(parseFloat(s)) && -1 === (s + "").indexOf("=")) && (s = "50%"), e && (e.oxp = -1 !== s.indexOf("%"), e.oyp = -1 !== r.indexOf("%"), e.oxr = "=" === s.charAt(1), e.oyr = "=" === r.charAt(1), e.ox = parseFloat(s.replace(v, "")), e.oy = parseFloat(r.replace(v, ""))), s + " " + r + (i.length > 2 ? " " + i[2] : "")
                    },
                    ie = function(t, e) {
                        return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
                    },
                    se = function(t, e) {
                        return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * Number(t.substr(2)) + e : parseFloat(t)
                    },
                    re = function(t, e, i, s) {
                        var r, n, a, o, h = 1e-6;
                        return null == t ? o = e : "number" == typeof t ? o = t : (r = 360, n = t.split("_"), a = Number(n[0].replace(v, "")) * (-1 === t.indexOf("rad") ? 1 : z) - ("=" === t.charAt(1) ? 0 : e), n.length && (s && (s[i] = e + a), -1 !== t.indexOf("short") && (a %= r, a !== a % (r / 2) && (a = 0 > a ? a + r : a - r)), -1 !== t.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * r) % r - (0 | a / r) * r : -1 !== t.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * r) % r - (0 | a / r) * r)), o = e + a), h > o && o > -h && (o = 0), o
                    },
                    ne = {
                        aqua: [0, 255, 255],
                        lime: [0, 255, 0],
                        silver: [192, 192, 192],
                        black: [0, 0, 0],
                        maroon: [128, 0, 0],
                        teal: [0, 128, 128],
                        blue: [0, 0, 255],
                        navy: [0, 0, 128],
                        white: [255, 255, 255],
                        fuchsia: [255, 0, 255],
                        olive: [128, 128, 0],
                        yellow: [255, 255, 0],
                        orange: [255, 165, 0],
                        gray: [128, 128, 128],
                        purple: [128, 0, 128],
                        green: [0, 128, 0],
                        red: [255, 0, 0],
                        pink: [255, 192, 203],
                        cyan: [0, 255, 255],
                        transparent: [255, 255, 255, 0]
                    },
                    ae = function(t, e, i) {
                        return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 0 | 255 * (1 > 6 * t ? e + 6 * (i - e) * t : .5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) + .5
                    },
                    oe = function(t) {
                        var e, i, s, r, n, a;
                        return t && "" !== t ? "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ne[t] ? ne[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), s = t.charAt(3), t = "#" + e + e + i + i + s + s), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(m), r = Number(t[0]) % 360 / 360, n = Number(t[1]) / 100, a = Number(t[2]) / 100, i = .5 >= a ? a * (n + 1) : a + n - a * n, e = 2 * a - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = ae(r + 1 / 3, e, i), t[1] = ae(r, e, i), t[2] = ae(r - 1 / 3, e, i), t) : (t = t.match(m) || ne.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : ne.black
                    },
                    he = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
                for (h in ne) he += "|" + h + "\\b";
                he = RegExp(he + ")", "gi");
                var le = function(t, e, i, s) {
                        if (null == t) return function(t) {
                            return t
                        };
                        var r, n = e ? (t.match(he) || [""])[0] : "",
                            a = t.split(n).join("").match(g) || [],
                            o = t.substr(0, t.indexOf(a[0])),
                            h = ")" === t.charAt(t.length - 1) ? ")" : "",
                            l = -1 !== t.indexOf(" ") ? " " : ",",
                            _ = a.length,
                            u = _ > 0 ? a[0].replace(m, "") : "";
                        return _ ? r = e ? function(t) {
                            var e, p, f, c;
                            if ("number" == typeof t) t += u;
                            else if (s && D.test(t)) {
                                for (c = t.replace(D, "|").split("|"), f = 0; c.length > f; f++) c[f] = r(c[f]);
                                return c.join(",")
                            }
                            if (e = (t.match(he) || [n])[0], p = t.split(e).join("").match(g) || [], f = p.length, _ > f--)
                                for (; _ > ++f;) p[f] = i ? p[0 | (f - 1) / 2] : a[f];
                            return o + p.join(l) + l + e + h + (-1 !== t.indexOf("inset") ? " inset" : "")
                        } : function(t) {
                            var e, n, p;
                            if ("number" == typeof t) t += u;
                            else if (s && D.test(t)) {
                                for (n = t.replace(D, "|").split("|"), p = 0; n.length > p; p++) n[p] = r(n[p]);
                                return n.join(",")
                            }
                            if (e = t.match(g) || [], p = e.length, _ > p--)
                                for (; _ > ++p;) e[p] = i ? e[0 | (p - 1) / 2] : a[p];
                            return o + e.join(l) + h
                        } : function(t) {
                            return t
                        }
                    },
                    _e = function(t) {
                        return t = t.split(","),
                            function(e, i, s, r, n, a, o) {
                                var h, l = (i + "").split(" ");
                                for (o = {}, h = 0; 4 > h; h++) o[t[h]] = l[h] = l[h] || l[(h - 1) / 2 >> 0];
                                return r.parse(e, o, n, a)
                            }
                    },
                    ue = (N._setPluginRatio = function(t) {
                        this.plugin.setRatio(t);
                        for (var e, i, s, r, n = this.data, a = n.proxy, o = n.firstMPT, h = 1e-6; o;) e = a[o.v], o.r ? e = Math.round(e) : h > e && e > -h && (e = 0), o.t[o.p] = e, o = o._next;
                        if (n.autoRotate && (n.autoRotate.rotation = a.rotation), 1 === t)
                            for (o = n.firstMPT; o;) {
                                if (i = o.t, i.type) {
                                    if (1 === i.type) {
                                        for (r = i.xs0 + i.s + i.xs1, s = 1; i.l > s; s++) r += i["xn" + s] + i["xs" + (s + 1)];
                                        i.e = r
                                    }
                                } else i.e = i.s + i.xs0;
                                o = o._next
                            }
                    }, function(t, e, i, s, r) {
                        this.t = t, this.p = e, this.v = i, this.r = r, s && (s._prev = this, this._next = s)
                    }),
                    pe = (N._parseToProxy = function(t, e, i, s, r, n) {
                        var a, o, h, l, _, u = s,
                            p = {},
                            f = {},
                            c = i._transform,
                            m = I;
                        for (i._transform = null, I = e, s = _ = i.parse(t, e, s, r), I = m, n && (i._transform = c, u && (u._prev = null, u._prev && (u._prev._next = null))); s && s !== u;) {
                            if (1 >= s.type && (o = s.p, f[o] = s.s + s.c, p[o] = s.s, n || (l = new ue(s, "s", o, l, s.r), s.c = 0), 1 === s.type))
                                for (a = s.l; --a > 0;) h = "xn" + a, o = s.p + "_" + h, f[o] = s.data[h], p[o] = s[h], n || (l = new ue(s, h, o, l, s.rxp[h]));
                            s = s._next
                        }
                        return {
                            proxy: p,
                            end: f,
                            firstMPT: l,
                            pt: _
                        }
                    }, N.CSSPropTween = function(t, e, s, r, a, o, h, l, _, u, p) {
                        this.t = t, this.p = e, this.s = s, this.c = r, this.n = h || e, t instanceof pe || n.push(this.n), this.r = l, this.type = o || 0, _ && (this.pr = _, i = !0), this.b = void 0 === u ? s : u, this.e = void 0 === p ? s + r : p, a && (this._next = a, a._prev = this)
                    }),
                    fe = a.parseComplex = function(t, e, i, s, r, n, a, o, h, _) {
                        i = i || n || "", a = new pe(t, e, 0, 0, a, _ ? 2 : 1, null, !1, o, i, s), s += "";
                        var u, p, f, c, g, v, y, T, w, x, P, S, k = i.split(", ").join(",").split(" "),
                            R = s.split(", ").join(",").split(" "),
                            A = k.length,
                            C = l !== !1;
                        for ((-1 !== s.indexOf(",") || -1 !== i.indexOf(",")) && (k = k.join(" ").replace(D, ", ").split(" "), R = R.join(" ").replace(D, ", ").split(" "), A = k.length), A !== R.length && (k = (n || "").split(" "), A = k.length), a.plugin = h, a.setRatio = _, u = 0; A > u; u++)
                            if (c = k[u], g = R[u], T = parseFloat(c), T || 0 === T) a.appendXtra("", T, ie(g, T), g.replace(d, ""), C && -1 !== g.indexOf("px"), !0);
                            else if (r && ("#" === c.charAt(0) || ne[c] || b.test(c))) S = "," === g.charAt(g.length - 1) ? ")," : ")", c = oe(c), g = oe(g), w = c.length + g.length > 6, w && !U && 0 === g[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(R[u]).join("transparent")) : (U || (w = !1), a.appendXtra(w ? "rgba(" : "rgb(", c[0], g[0] - c[0], ",", !0, !0).appendXtra("", c[1], g[1] - c[1], ",", !0).appendXtra("", c[2], g[2] - c[2], w ? "," : S, !0), w && (c = 4 > c.length ? 1 : c[3], a.appendXtra("", c, (4 > g.length ? 1 : g[3]) - c, S, !1)));
                        else if (v = c.match(m)) {
                            if (y = g.match(d), !y || y.length !== v.length) return a;
                            for (f = 0, p = 0; v.length > p; p++) P = v[p], x = c.indexOf(P, f), a.appendXtra(c.substr(f, x - f), Number(P), ie(y[p], P), "", C && "px" === c.substr(x + P.length, 2), 0 === p), f = x + P.length;
                            a["xs" + a.l] += c.substr(f)
                        } else a["xs" + a.l] += a.l ? " " + c : c;
                        if (-1 !== s.indexOf("=") && a.data) {
                            for (S = a.xs0 + a.data.s, u = 1; a.l > u; u++) S += a["xs" + u] + a.data["xn" + u];
                            a.e = S + a["xs" + u]
                        }
                        return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
                    },
                    ce = 9;
                for (h = pe.prototype, h.l = h.pr = 0; --ce > 0;) h["xn" + ce] = 0, h["xs" + ce] = "";
                h.xs0 = "", h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null, h.appendXtra = function(t, e, i, s, r, n) {
                    var a = this,
                        o = a.l;
                    return a["xs" + o] += n && o ? " " + t : t || "", i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = s || "", o > 0 ? (a.data["xn" + o] = e + i, a.rxp["xn" + o] = r, a["xn" + o] = e, a.plugin || (a.xfirst = new pe(a, "xn" + o, e, i, a.xfirst || a, 0, a.n, r, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {
                        s: e + i
                    }, a.rxp = {}, a.s = e, a.c = i, a.r = r, a)) : (a["xs" + o] += e + (s || ""), a)
                };
                var me = function(t, e) {
                        e = e || {}, this.p = e.prefix ? V(t) || t : t, o[t] = o[this.p] = this, this.format = e.formatter || le(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
                    },
                    de = N._registerComplexSpecialProp = function(t, e, i) {
                        "object" != typeof e && (e = {
                            parser: i
                        });
                        var s, r, n = t.split(","),
                            a = e.defaultValue;
                        for (i = i || [a], s = 0; n.length > s; s++) e.prefix = 0 === s && e.prefix, e.defaultValue = i[s] || a, r = new me(n[s], e)
                    },
                    ge = function(t) {
                        if (!o[t]) {
                            var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                            de(t, {
                                parser: function(t, i, s, r, n, a, h) {
                                    var l = (window.GreenSockGlobals || window).com.greensock.plugins[e];
                                    return l ? (l._cssRegister(), o[s].parse(t, i, s, r, n, a, h)) : (j("Error: " + e + " js file not loaded."), n)
                                }
                            })
                        }
                    };
                h = me.prototype, h.parseComplex = function(t, e, i, s, r, n) {
                    var a, o, h, l, _, u, p = this.keyword;
                    if (this.multi && (D.test(i) || D.test(e) ? (o = e.replace(D, "|").split("|"), h = i.replace(D, "|").split("|")) : p && (o = [e], h = [i])), h) {
                        for (l = h.length > o.length ? h.length : o.length, a = 0; l > a; a++) e = o[a] = o[a] || this.dflt, i = h[a] = h[a] || this.dflt, p && (_ = e.indexOf(p), u = i.indexOf(p), _ !== u && (i = -1 === u ? h : o, i[a] += " " + p));
                        e = o.join(", "), i = h.join(", ")
                    }
                    return fe(t, this.p, e, i, this.clrs, this.dflt, s, this.pr, r, n)
                }, h.parse = function(t, e, i, s, n, a) {
                    return this.parseComplex(t.style, this.format(G(t, this.p, r, !1, this.dflt)), this.format(e), n, a)
                }, a.registerSpecialProp = function(t, e, i) {
                    de(t, {
                        parser: function(t, s, r, n, a, o) {
                            var h = new pe(t, r, 0, 0, a, 2, r, !1, i);
                            return h.plugin = o, h.setRatio = e(t, s, n._tween, r), h
                        },
                        priority: i
                    })
                };
                var ve = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective".split(","),
                    ye = V("transform"),
                    Te = B + "transform",
                    we = V("transformOrigin"),
                    xe = null !== V("perspective"),
                    be = N.Transform = function() {
                        this.skewY = 0
                    },
                    Pe = N.getTransform = function(t, e, i, s) {
                        if (t._gsTransform && i && !s) return t._gsTransform;
                        var r, n, o, h, l, _, u, p, f, c, m, d, g, v = i ? t._gsTransform || new be : new be,
                            y = 0 > v.scaleX,
                            T = 2e-5,
                            w = 1e5,
                            x = 179.99,
                            b = x * M,
                            P = xe ? parseFloat(G(t, we, e, !1, "0 0 0").split(" ")[2]) || v.zOrigin || 0 : 0;
                        for (ye ? r = G(t, Te, e, !0) : t.currentStyle && (r = t.currentStyle.filter.match(C), r = r && 4 === r.length ? [r[0].substr(4), Number(r[2].substr(4)), Number(r[1].substr(4)), r[3].substr(4), v.x || 0, v.y || 0].join(",") : ""), n = (r || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], o = n.length; --o > -1;) h = Number(n[o]), n[o] = (l = h - (h |= 0)) ? (0 | l * w + (0 > l ? -.5 : .5)) / w + h : h;
                        if (16 === n.length) {
                            var S = n[8],
                                k = n[9],
                                R = n[10],
                                A = n[12],
                                O = n[13],
                                D = n[14];
                            if (v.zOrigin && (D = -v.zOrigin, A = S * D - n[12], O = k * D - n[13], D = R * D + v.zOrigin - n[14]), !i || s || null == v.rotationX) {
                                var I, E, L, F, N, X, U, Y = n[0],
                                    j = n[1],
                                    B = n[2],
                                    q = n[3],
                                    V = n[4],
                                    W = n[5],
                                    $ = n[6],
                                    Z = n[7],
                                    Q = n[11],
                                    H = Math.atan2($, R),
                                    K = -b > H || H > b;
                                v.rotationX = H * z, H && (F = Math.cos(-H), N = Math.sin(-H), I = V * F + S * N, E = W * F + k * N, L = $ * F + R * N, S = V * -N + S * F, k = W * -N + k * F, R = $ * -N + R * F, Q = Z * -N + Q * F, V = I, W = E, $ = L), H = Math.atan2(S, Y), v.rotationY = H * z, H && (X = -b > H || H > b, F = Math.cos(-H), N = Math.sin(-H), I = Y * F - S * N, E = j * F - k * N, L = B * F - R * N, k = j * N + k * F, R = B * N + R * F, Q = q * N + Q * F, Y = I, j = E, B = L), H = Math.atan2(j, W), v.rotation = H * z, H && (U = -b > H || H > b, F = Math.cos(-H), N = Math.sin(-H), Y = Y * F + V * N, E = j * F + W * N, W = j * -N + W * F, $ = B * -N + $ * F, j = E), U && K ? v.rotation = v.rotationX = 0 : U && X ? v.rotation = v.rotationY = 0 : X && K && (v.rotationY = v.rotationX = 0), v.scaleX = (0 | Math.sqrt(Y * Y + j * j) * w + .5) / w, v.scaleY = (0 | Math.sqrt(W * W + k * k) * w + .5) / w, v.scaleZ = (0 | Math.sqrt($ * $ + R * R) * w + .5) / w, v.skewX = 0, v.perspective = Q ? 1 / (0 > Q ? -Q : Q) : 0, v.x = A, v.y = O, v.z = D
                            }
                        } else if (!(xe && !s && n.length && v.x === n[4] && v.y === n[5] && (v.rotationX || v.rotationY) || void 0 !== v.x && "none" === G(t, "display", e))) {
                            var J = n.length >= 6,
                                te = J ? n[0] : 1,
                                ee = n[1] || 0,
                                ie = n[2] || 0,
                                se = J ? n[3] : 1;
                            v.x = n[4] || 0, v.y = n[5] || 0, _ = Math.sqrt(te * te + ee * ee), u = Math.sqrt(se * se + ie * ie), p = te || ee ? Math.atan2(ee, te) * z : v.rotation || 0, f = ie || se ? Math.atan2(ie, se) * z + p : v.skewX || 0, c = _ - Math.abs(v.scaleX || 0), m = u - Math.abs(v.scaleY || 0), Math.abs(f) > 90 && 270 > Math.abs(f) && (y ? (_ *= -1, f += 0 >= p ? 180 : -180, p += 0 >= p ? 180 : -180) : (u *= -1, f += 0 >= f ? 180 : -180)), d = (p - v.rotation) % 180, g = (f - v.skewX) % 180, (void 0 === v.skewX || c > T || -T > c || m > T || -T > m || d > -x && x > d && false | d * w || g > -x && x > g && false | g * w) && (v.scaleX = _, v.scaleY = u, v.rotation = p, v.skewX = f), xe && (v.rotationX = v.rotationY = v.z = 0, v.perspective = parseFloat(a.defaultTransformPerspective) || 0, v.scaleZ = 1)
                        }
                        v.zOrigin = P;
                        for (o in v) T > v[o] && v[o] > -T && (v[o] = 0);
                        return i && (t._gsTransform = v), v
                    },
                    Se = function(t) {
                        var e, i, s = this.data,
                            r = -s.rotation * M,
                            n = r + s.skewX * M,
                            a = 1e5,
                            o = (0 | Math.cos(r) * s.scaleX * a) / a,
                            h = (0 | Math.sin(r) * s.scaleX * a) / a,
                            l = (0 | Math.sin(n) * -s.scaleY * a) / a,
                            _ = (0 | Math.cos(n) * s.scaleY * a) / a,
                            u = this.t.style,
                            p = this.t.currentStyle;
                        if (p) {
                            i = h, h = -l, l = -i, e = p.filter, u.filter = "";
                            var f, m, d = this.t.offsetWidth,
                                g = this.t.offsetHeight,
                                v = "absolute" !== p.position,
                                w = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + h + ", M21=" + l + ", M22=" + _,
                                x = s.x,
                                b = s.y;
                            if (null != s.ox && (f = (s.oxp ? .01 * d * s.ox : s.ox) - d / 2, m = (s.oyp ? .01 * g * s.oy : s.oy) - g / 2, x += f - (f * o + m * h), b += m - (f * l + m * _)), v ? (f = d / 2, m = g / 2, w += ", Dx=" + (f - (f * o + m * h) + x) + ", Dy=" + (m - (f * l + m * _) + b) + ")") : w += ", sizingMethod='auto expand')", u.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(O, w) : w + " " + e, (0 === t || 1 === t) && 1 === o && 0 === h && 0 === l && 1 === _ && (v && -1 === w.indexOf("Dx=0, Dy=0") || T.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf("gradient(" && e.indexOf("Alpha")) && u.removeAttribute("filter")), !v) {
                                var P, S, k, R = 8 > c ? 1 : -1;
                                for (f = s.ieOffsetX || 0, m = s.ieOffsetY || 0, s.ieOffsetX = Math.round((d - ((0 > o ? -o : o) * d + (0 > h ? -h : h) * g)) / 2 + x), s.ieOffsetY = Math.round((g - ((0 > _ ? -_ : _) * g + (0 > l ? -l : l) * d)) / 2 + b), ce = 0; 4 > ce; ce++) S = J[ce], P = p[S], i = -1 !== P.indexOf("px") ? parseFloat(P) : $(this.t, S, parseFloat(P), P.replace(y, "")) || 0, k = i !== s[S] ? 2 > ce ? -s.ieOffsetX : -s.ieOffsetY : 2 > ce ? f - s.ieOffsetX : m - s.ieOffsetY, u[S] = (s[S] = Math.round(i - k * (0 === ce || 2 === ce ? 1 : R))) + "px"
                            }
                        }
                    },
                    ke = N.set3DTransformRatio = function(t) {
                        var e, i, s, r, n, a, o, h, l, _, u, f, c, m, d, g, v, y, T, w, x, b, P, S = this.data,
                            k = this.t.style,
                            R = S.rotation * M,
                            A = S.scaleX,
                            C = S.scaleY,
                            O = S.scaleZ,
                            D = S.perspective;
                        if (!(1 !== t && 0 !== t || "auto" !== S.force3D || S.rotationY || S.rotationX || 1 !== O || D || S.z)) return Re.call(this, t), void 0;
                        if (p) {
                            var z = 1e-4;
                            z > A && A > -z && (A = O = 2e-5), z > C && C > -z && (C = O = 2e-5), !D || S.z || S.rotationX || S.rotationY || (D = 0)
                        }
                        if (R || S.skewX) y = Math.cos(R), T = Math.sin(R), e = y, n = T, S.skewX && (R -= S.skewX * M, y = Math.cos(R), T = Math.sin(R), "simple" === S.skewType && (w = Math.tan(S.skewX * M), w = Math.sqrt(1 + w * w), y *= w, T *= w)), i = -T, a = y;
                        else {
                            if (!(S.rotationY || S.rotationX || 1 !== O || D)) return k[ye] = "translate3d(" + S.x + "px," + S.y + "px," + S.z + "px)" + (1 !== A || 1 !== C ? " scale(" + A + "," + C + ")" : ""), void 0;
                            e = a = 1, i = n = 0
                        }
                        u = 1, s = r = o = h = l = _ = f = c = m = 0, d = D ? -1 / D : 0, g = S.zOrigin, v = 1e5, R = S.rotationY * M, R && (y = Math.cos(R), T = Math.sin(R), l = u * -T, c = d * -T, s = e * T, o = n * T, u *= y, d *= y, e *= y, n *= y), R = S.rotationX * M, R && (y = Math.cos(R), T = Math.sin(R), w = i * y + s * T, x = a * y + o * T, b = _ * y + u * T, P = m * y + d * T, s = i * -T + s * y, o = a * -T + o * y, u = _ * -T + u * y, d = m * -T + d * y, i = w, a = x, _ = b, m = P), 1 !== O && (s *= O, o *= O, u *= O, d *= O), 1 !== C && (i *= C, a *= C, _ *= C, m *= C), 1 !== A && (e *= A, n *= A, l *= A, c *= A), g && (f -= g, r = s * f, h = o * f, f = u * f + g), r = (w = (r += S.x) - (r |= 0)) ? (0 | w * v + (0 > w ? -.5 : .5)) / v + r : r, h = (w = (h += S.y) - (h |= 0)) ? (0 | w * v + (0 > w ? -.5 : .5)) / v + h : h, f = (w = (f += S.z) - (f |= 0)) ? (0 | w * v + (0 > w ? -.5 : .5)) / v + f : f, k[ye] = "matrix3d(" + [(0 | e * v) / v, (0 | n * v) / v, (0 | l * v) / v, (0 | c * v) / v, (0 | i * v) / v, (0 | a * v) / v, (0 | _ * v) / v, (0 | m * v) / v, (0 | s * v) / v, (0 | o * v) / v, (0 | u * v) / v, (0 | d * v) / v, r, h, f, D ? 1 + -f / D : 1].join(",") + ")"
                    },
                    Re = N.set2DTransformRatio = function(t) {
                        var e, i, s, r, n, a = this.data,
                            o = this.t,
                            h = o.style;
                        return a.rotationX || a.rotationY || a.z || a.force3D === !0 || "auto" === a.force3D && 1 !== t && 0 !== t ? (this.setRatio = ke, ke.call(this, t), void 0) : (a.rotation || a.skewX ? (e = a.rotation * M, i = e - a.skewX * M, s = 1e5, r = a.scaleX * s, n = a.scaleY * s, h[ye] = "matrix(" + (0 | Math.cos(e) * r) / s + "," + (0 | Math.sin(e) * r) / s + "," + (0 | Math.sin(i) * -n) / s + "," + (0 | Math.cos(i) * n) / s + "," + a.x + "," + a.y + ")") : h[ye] = "matrix(" + a.scaleX + ",0,0," + a.scaleY + "," + a.x + "," + a.y + ")", void 0)
                    };
                de("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType", {
                    parser: function(t, e, i, s, n, o, h) {
                        if (s._transform) return n;
                        var l, _, u, p, f, c, m, d = s._transform = Pe(t, r, !0, h.parseTransform),
                            g = t.style,
                            v = 1e-6,
                            y = ve.length,
                            T = h,
                            w = {};
                        if ("string" == typeof T.transform && ye) u = L.style, u[ye] = T.transform, u.display = "block", u.position = "absolute", E.body.appendChild(L), l = Pe(L, null, !1), E.body.removeChild(L);
                        else if ("object" == typeof T) {
                            if (l = {
                                    scaleX: se(null != T.scaleX ? T.scaleX : T.scale, d.scaleX),
                                    scaleY: se(null != T.scaleY ? T.scaleY : T.scale, d.scaleY),
                                    scaleZ: se(T.scaleZ, d.scaleZ),
                                    x: se(T.x, d.x),
                                    y: se(T.y, d.y),
                                    z: se(T.z, d.z),
                                    perspective: se(T.transformPerspective, d.perspective)
                                }, m = T.directionalRotation, null != m)
                                if ("object" == typeof m)
                                    for (u in m) T[u] = m[u];
                                else T.rotation = m;
                            l.rotation = re("rotation" in T ? T.rotation : "shortRotation" in T ? T.shortRotation + "_short" : "rotationZ" in T ? T.rotationZ : d.rotation, d.rotation, "rotation", w), xe && (l.rotationX = re("rotationX" in T ? T.rotationX : "shortRotationX" in T ? T.shortRotationX + "_short" : d.rotationX || 0, d.rotationX, "rotationX", w), l.rotationY = re("rotationY" in T ? T.rotationY : "shortRotationY" in T ? T.shortRotationY + "_short" : d.rotationY || 0, d.rotationY, "rotationY", w)), l.skewX = null == T.skewX ? d.skewX : re(T.skewX, d.skewX), l.skewY = null == T.skewY ? d.skewY : re(T.skewY, d.skewY), (_ = l.skewY - d.skewY) && (l.skewX += _, l.rotation += _)
                        }
                        for (xe && null != T.force3D && (d.force3D = T.force3D, c = !0), d.skewType = T.skewType || d.skewType || a.defaultSkewType, f = d.force3D || d.z || d.rotationX || d.rotationY || l.z || l.rotationX || l.rotationY || l.perspective, f || null == T.scale || (l.scaleZ = 1); --y > -1;) i = ve[y], p = l[i] - d[i], (p > v || -v > p || null != I[i]) && (c = !0, n = new pe(d, i, d[i], p, n), i in w && (n.e = w[i]), n.xs0 = 0, n.plugin = o, s._overwriteProps.push(n.n));
                        return p = T.transformOrigin, (p || xe && f && d.zOrigin) && (ye ? (c = !0, i = we, p = (p || G(t, i, r, !1, "50% 50%")) + "", n = new pe(g, i, 0, 0, n, -1, "transformOrigin"), n.b = g[i], n.plugin = o, xe ? (u = d.zOrigin, p = p.split(" "), d.zOrigin = (p.length > 2 && (0 === u || "0px" !== p[2]) ? parseFloat(p[2]) : u) || 0, n.xs0 = n.e = p[0] + " " + (p[1] || "50%") + " 0px", n = new pe(d, "zOrigin", 0, 0, n, -1, n.n), n.b = u, n.xs0 = n.e = d.zOrigin) : n.xs0 = n.e = p) : ee(p + "", d)), c && (s._transformType = f || 3 === this._transformType ? 3 : 2), n
                    },
                    prefix: !0
                }), de("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }), de("borderRadius", {
                    defaultValue: "0px",
                    parser: function(t, e, i, n, a) {
                        e = this.format(e);
                        var o, h, l, _, u, p, f, c, m, d, g, v, y, T, w, x, b = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            P = t.style;
                        for (m = parseFloat(t.offsetWidth), d = parseFloat(t.offsetHeight), o = e.split(" "), h = 0; b.length > h; h++) this.p.indexOf("border") && (b[h] = V(b[h])), u = _ = G(t, b[h], r, !1, "0px"), -1 !== u.indexOf(" ") && (_ = u.split(" "), u = _[0], _ = _[1]), p = l = o[h], f = parseFloat(u), v = u.substr((f + "").length), y = "=" === p.charAt(1), y ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), g = p.substr((c + "").length - (0 > c ? 1 : 0)) || "") : (c = parseFloat(p), g = p.substr((c + "").length)), "" === g && (g = s[i] || v), g !== v && (T = $(t, "borderLeft", f, v), w = $(t, "borderTop", f, v), "%" === g ? (u = 100 * (T / m) + "%", _ = 100 * (w / d) + "%") : "em" === g ? (x = $(t, "borderLeft", 1, "em"), u = T / x + "em", _ = w / x + "em") : (u = T + "px", _ = w + "px"), y && (p = parseFloat(u) + c + g, l = parseFloat(_) + c + g)), a = fe(P, b[h], u + " " + _, p + " " + l, !1, "0px", a);
                        return a
                    },
                    prefix: !0,
                    formatter: le("0px 0px 0px 0px", !1, !0)
                }), de("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function(t, e, i, s, n, a) {
                        var o, h, l, _, u, p, f = "background-position",
                            m = r || W(t, null),
                            d = this.format((m ? c ? m.getPropertyValue(f + "-x") + " " + m.getPropertyValue(f + "-y") : m.getPropertyValue(f) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                            g = this.format(e);
                        if (-1 !== d.indexOf("%") != (-1 !== g.indexOf("%")) && (p = G(t, "backgroundImage").replace(k, ""), p && "none" !== p)) {
                            for (o = d.split(" "), h = g.split(" "), F.setAttribute("src", p), l = 2; --l > -1;) d = o[l], _ = -1 !== d.indexOf("%"), _ !== (-1 !== h[l].indexOf("%")) && (u = 0 === l ? t.offsetWidth - F.width : t.offsetHeight - F.height, o[l] = _ ? parseFloat(d) / 100 * u + "px" : 100 * (parseFloat(d) / u) + "%");
                            d = o.join(" ")
                        }
                        return this.parseComplex(t.style, d, g, n, a)
                    },
                    formatter: ee
                }), de("backgroundSize", {
                    defaultValue: "0 0",
                    formatter: ee
                }), de("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }), de("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }), de("transformStyle", {
                    prefix: !0
                }), de("backfaceVisibility", {
                    prefix: !0
                }), de("userSelect", {
                    prefix: !0
                }), de("margin", {
                    parser: _e("marginTop,marginRight,marginBottom,marginLeft")
                }), de("padding", {
                    parser: _e("paddingTop,paddingRight,paddingBottom,paddingLeft")
                }), de("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function(t, e, i, s, n, a) {
                        var o, h, l;
                        return 9 > c ? (h = t.currentStyle, l = 8 > c ? " " : ",", o = "rect(" + h.clipTop + l + h.clipRight + l + h.clipBottom + l + h.clipLeft + ")", e = this.format(e).split(",").join(l)) : (o = this.format(G(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, n, a)
                    }
                }), de("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }), de("autoRound,strictUnits", {
                    parser: function(t, e, i, s, r) {
                        return r
                    }
                }), de("border", {
                    defaultValue: "0px solid #000",
                    parser: function(t, e, i, s, n, a) {
                        return this.parseComplex(t.style, this.format(G(t, "borderTopWidth", r, !1, "0px") + " " + G(t, "borderTopStyle", r, !1, "solid") + " " + G(t, "borderTopColor", r, !1, "#000")), this.format(e), n, a)
                    },
                    color: !0,
                    formatter: function(t) {
                        var e = t.split(" ");
                        return e[0] + " " + (e[1] || "solid") + " " + (t.match(he) || ["#000"])[0]
                    }
                }), de("borderWidth", {
                    parser: _e("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                }), de("float,cssFloat,styleFloat", {
                    parser: function(t, e, i, s, r) {
                        var n = t.style,
                            a = "cssFloat" in n ? "cssFloat" : "styleFloat";
                        return new pe(n, a, 0, 0, r, -1, i, !1, 0, n[a], e)
                    }
                });
                var Ae = function(t) {
                    var e, i = this.t,
                        s = i.filter || G(this.data, "filter"),
                        r = 0 | this.s + this.c * t;
                    100 === r && (-1 === s.indexOf("atrix(") && -1 === s.indexOf("radient(") && -1 === s.indexOf("oader(") ? (i.removeAttribute("filter"), e = !G(this.data, "filter")) : (i.filter = s.replace(x, ""), e = !0)), e || (this.xn1 && (i.filter = s = s || "alpha(opacity=" + r + ")"), -1 === s.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = s + " alpha(opacity=" + r + ")") : i.filter = s.replace(T, "opacity=" + r))
                };
                de("opacity,alpha,autoAlpha", {
                    defaultValue: "1",
                    parser: function(t, e, i, s, n, a) {
                        var o = parseFloat(G(t, "opacity", r, !1, "1")),
                            h = t.style,
                            l = "autoAlpha" === i;
                        return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o), l && 1 === o && "hidden" === G(t, "visibility", r) && 0 !== e && (o = 0), U ? n = new pe(h, "opacity", o, e - o, n) : (n = new pe(h, "opacity", 100 * o, 100 * (e - o), n), n.xn1 = l ? 1 : 0, h.zoom = 1, n.type = 2, n.b = "alpha(opacity=" + n.s + ")", n.e = "alpha(opacity=" + (n.s + n.c) + ")", n.data = t, n.plugin = a, n.setRatio = Ae), l && (n = new pe(h, "visibility", 0, 0, n, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), n.xs0 = "inherit", s._overwriteProps.push(n.n), s._overwriteProps.push(i)), n
                    }
                });
                var Ce = function(t, e) {
                        e && (t.removeProperty ? ("ms" === e.substr(0, 2) && (e = "M" + e.substr(1)), t.removeProperty(e.replace(P, "-$1").toLowerCase())) : t.removeAttribute(e))
                    },
                    Oe = function(t) {
                        if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                            this.t.setAttribute("class", 0 === t ? this.b : this.e);
                            for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Ce(i, e.p), e = e._next;
                            1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                        } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                    };
                de("className", {
                    parser: function(t, e, s, n, a, o, h) {
                        var l, _, u, p, f, c = t.getAttribute("class") || "",
                            m = t.style.cssText;
                        if (a = n._classNamePT = new pe(t, s, 0, 0, a, 2), a.setRatio = Oe, a.pr = -11, i = !0, a.b = c, _ = Q(t, r), u = t._gsClassPT) {
                            for (p = {}, f = u.data; f;) p[f.p] = 1, f = f._next;
                            u.setRatio(1)
                        }
                        return t._gsClassPT = a, a.e = "=" !== e.charAt(1) ? e : c.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), n._tween._duration && (t.setAttribute("class", a.e), l = H(t, _, Q(t), h, p), t.setAttribute("class", c), a.data = l.firstMPT, t.style.cssText = m, a = a.xfirst = n.parse(t, l.difs, a, o)), a
                    }
                });
                var De = function(t) {
                    if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                        var e, i, s, r, n = this.t.style,
                            a = o.transform.parse;
                        if ("all" === this.e) n.cssText = "", r = !0;
                        else
                            for (e = this.e.split(","), s = e.length; --s > -1;) i = e[s], o[i] && (o[i].parse === a ? r = !0 : i = "transformOrigin" === i ? we : o[i].p), Ce(n, i);
                        r && (Ce(n, ye), this.t._gsTransform && delete this.t._gsTransform)
                    }
                };
                for (de("clearProps", {
                        parser: function(t, e, s, r, n) {
                            return n = new pe(t, s, 0, 0, n, 2), n.setRatio = De, n.e = e, n.pr = -10, n.data = r._tween, i = !0, n
                        }
                    }), h = "bezier,throwProps,physicsProps,physics2D".split(","), ce = h.length; ce--;) ge(h[ce]);
                h = a.prototype, h._firstPT = null, h._onInitTween = function(t, e, o) {
                    if (!t.nodeType) return !1;
                    this._target = t, this._tween = o, this._vars = e, l = e.autoRound, i = !1, s = e.suffixMap || a.suffixMap, r = W(t, ""), n = this._overwriteProps;
                    var h, p, c, m, d, g, v, y, T, x = t.style;
                    if (_ && "" === x.zIndex && (h = G(t, "zIndex", r), ("auto" === h || "" === h) && this._addLazySet(x, "zIndex", 0)), "string" == typeof e && (m = x.cssText, h = Q(t, r), x.cssText = m + ";" + e, h = H(t, h, Q(t)).difs, !U && w.test(e) && (h.opacity = parseFloat(RegExp.$1)), e = h, x.cssText = m), this._firstPT = p = this.parse(t, e, null), this._transformType) {
                        for (T = 3 === this._transformType, ye ? u && (_ = !0, "" === x.zIndex && (v = G(t, "zIndex", r), ("auto" === v || "" === v) && this._addLazySet(x, "zIndex", 0)), f && this._addLazySet(x, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (T ? "visible" : "hidden"))) : x.zoom = 1, c = p; c && c._next;) c = c._next;
                        y = new pe(t, "transform", 0, 0, null, 2), this._linkCSSP(y, null, c), y.setRatio = T && xe ? ke : ye ? Re : Se, y.data = this._transform || Pe(t, r, !0), n.pop()
                    }
                    if (i) {
                        for (; p;) {
                            for (g = p._next, c = m; c && c.pr > p.pr;) c = c._next;
                            (p._prev = c ? c._prev : d) ? p._prev._next = p: m = p, (p._next = c) ? c._prev = p : d = p, p = g
                        }
                        this._firstPT = m
                    }
                    return !0
                }, h.parse = function(t, e, i, n) {
                    var a, h, _, u, p, f, c, m, d, g, v = t.style;
                    for (a in e) f = e[a], h = o[a], h ? i = h.parse(t, f, a, this, i, n, e) : (p = G(t, a, r) + "", d = "string" == typeof f, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || d && b.test(f) ? (d || (f = oe(f), f = (f.length > 3 ? "rgba(" : "rgb(") + f.join(",") + ")"), i = fe(v, a, p, f, !0, "transparent", i, 0, n)) : !d || -1 === f.indexOf(" ") && -1 === f.indexOf(",") ? (_ = parseFloat(p), c = _ || 0 === _ ? p.substr((_ + "").length) : "", ("" === p || "auto" === p) && ("width" === a || "height" === a ? (_ = te(t, a, r), c = "px") : "left" === a || "top" === a ? (_ = Z(t, a, r), c = "px") : (_ = "opacity" !== a ? 0 : 1, c = "")), g = d && "=" === f.charAt(1), g ? (u = parseInt(f.charAt(0) + "1", 10), f = f.substr(2), u *= parseFloat(f), m = f.replace(y, "")) : (u = parseFloat(f), m = d ? f.substr((u + "").length) || "" : ""), "" === m && (m = a in s ? s[a] : c), f = u || 0 === u ? (g ? u + _ : u) + m : e[a], c !== m && "" !== m && (u || 0 === u) && _ && (_ = $(t, a, _, c), "%" === m ? (_ /= $(t, a, 100, "%") / 100, e.strictUnits !== !0 && (p = _ + "%")) : "em" === m ? _ /= $(t, a, 1, "em") : "px" !== m && (u = $(t, a, u, m), m = "px"), g && (u || 0 === u) && (f = u + _ + m)), g && (u += _), !_ && 0 !== _ || !u && 0 !== u ? void 0 !== v[a] && (f || "NaN" != f + "" && null != f) ? (i = new pe(v, a, u || _ || 0, 0, i, -1, a, !1, 0, p, f), i.xs0 = "none" !== f || "display" !== a && -1 === a.indexOf("Style") ? f : p) : j("invalid " + a + " tween value: " + e[a]) : (i = new pe(v, a, _, u - _, i, 0, a, l !== !1 && ("px" === m || "zIndex" === a), 0, p, f), i.xs0 = m)) : i = fe(v, a, p, f, !0, null, i, 0, n)), n && i && !i.plugin && (i.plugin = n);
                    return i
                }, h.setRatio = function(t) {
                    var e, i, s, r = this._firstPT,
                        n = 1e-6;
                    if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                            for (; r;) {
                                if (e = r.c * t + r.s, r.r ? e = Math.round(e) : n > e && e > -n && (e = 0), r.type)
                                    if (1 === r.type)
                                        if (s = r.l, 2 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                        else if (3 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                else if (4 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                else if (5 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                else {
                                    for (i = r.xs0 + e + r.xs1, s = 1; r.l > s; s++) i += r["xn" + s] + r["xs" + (s + 1)];
                                    r.t[r.p] = i
                                } else - 1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
                                else r.t[r.p] = e + r.xs0;
                                r = r._next
                            } else
                                for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
                        else
                            for (; r;) 2 !== r.type ? r.t[r.p] = r.e : r.setRatio(t), r = r._next
                }, h._enableTransforms = function(t) {
                    this._transformType = t || 3 === this._transformType ? 3 : 2, this._transform = this._transform || Pe(this._target, r, !0)
                };
                var Me = function() {
                    this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                };
                h._addLazySet = function(t, e, i) {
                    var s = this._firstPT = new pe(t, e, 0, 0, this._firstPT, 2);
                    s.e = i, s.setRatio = Me, s.data = this
                }, h._linkCSSP = function(t, e, i, s) {
                    return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, s = !0), i ? i._next = t : s || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
                }, h._kill = function(e) {
                    var i, s, r, n = e;
                    if (e.autoAlpha || e.alpha) {
                        n = {};
                        for (s in e) n[s] = e[s];
                        n.opacity = 1, n.autoAlpha && (n.visibility = 1)
                    }
                    return e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), t.prototype._kill.call(this, n)
                };
                var ze = function(t, e, i) {
                    var s, r, n, a;
                    if (t.slice)
                        for (r = t.length; --r > -1;) ze(t[r], e, i);
                    else
                        for (s = t.childNodes, r = s.length; --r > -1;) n = s[r], a = n.type, n.style && (e.push(Q(n)), i && i.push(n)), 1 !== a && 9 !== a && 11 !== a || !n.childNodes.length || ze(n, e, i)
                };
                return a.cascadeTo = function(t, i, s) {
                    var r, n, a, o = e.to(t, i, s),
                        h = [o],
                        l = [],
                        _ = [],
                        u = [],
                        p = e._internals.reservedProps;
                    for (t = o._targets || o.target, ze(t, l, u), o.render(i, !0), ze(t, _), o.render(0, !0), o._enabled(!0), r = u.length; --r > -1;)
                        if (n = H(u[r], l[r], _[r]), n.firstMPT) {
                            n = n.difs;
                            for (a in s) p[a] && (n[a] = s[a]);
                            h.push(e.to(u[r], i, n))
                        } return h
                }, t.activate([a]), a
            }, !0),
            function() {
                var t = window._gsDefine.plugin({
                        propName: "roundProps",
                        priority: -1,
                        API: 2,
                        init: function(t, e, i) {
                            return this._tween = i, !0
                        }
                    }),
                    e = t.prototype;
                e._onInitAllProps = function() {
                    for (var t, e, i, s = this._tween, r = s.vars.roundProps instanceof Array ? s.vars.roundProps : s.vars.roundProps.split(","), n = r.length, a = {}, o = s._propLookup.roundProps; --n > -1;) a[r[n]] = 1;
                    for (n = r.length; --n > -1;)
                        for (t = r[n], e = s._firstPT; e;) i = e._next, e.pg ? e.t._roundProps(a, !0) : e.n === t && (this._add(e.t, t, e.s, e.c), i && (i._prev = e._prev), e._prev ? e._prev._next = i : s._firstPT === e && (s._firstPT = i), e._next = e._prev = null, s._propLookup[t] = o), e = i;
                    return !1
                }, e._add = function(t, e, i, s) {
                    this._addTween(t, e, i, i + s, e, !0), this._overwriteProps.push(e)
                }
            }(), window._gsDefine.plugin({
                propName: "attr",
                API: 2,
                version: "0.3.2",
                init: function(t, e) {
                    var i, s, r;
                    if ("function" != typeof t.setAttribute) return !1;
                    this._target = t, this._proxy = {}, this._start = {}, this._end = {};
                    for (i in e) this._start[i] = this._proxy[i] = s = t.getAttribute(i), r = this._addTween(this._proxy, i, parseFloat(s), e[i], i), this._end[i] = r ? r.s + r.c : e[i], this._overwriteProps.push(i);
                    return !0
                },
                set: function(t) {
                    this._super.setRatio.call(this, t);
                    for (var e, i = this._overwriteProps, s = i.length, r = 1 === t ? this._end : t ? this._proxy : this._start; --s > -1;) e = i[s], this._target.setAttribute(e, r[e] + "")
                }
            }), window._gsDefine.plugin({
                propName: "directionalRotation",
                API: 2,
                version: "0.2.0",
                init: function(t, e) {
                    "object" != typeof e && (e = {
                        rotation: e
                    }), this.finals = {};
                    var i, s, r, n, a, o, h = e.useRadians === !0 ? 2 * Math.PI : 360,
                        l = 1e-6;
                    for (i in e) "useRadians" !== i && (o = (e[i] + "").split("_"), s = o[0], r = parseFloat("function" != typeof t[i] ? t[i] : t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]()), n = this.finals[i] = "string" == typeof s && "=" === s.charAt(1) ? r + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0, a = n - r, o.length && (s = o.join("_"), -1 !== s.indexOf("short") && (a %= h, a !== a % (h / 2) && (a = 0 > a ? a + h : a - h)), -1 !== s.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * h) % h - (0 | a / h) * h : -1 !== s.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * h) % h - (0 | a / h) * h)), (a > l || -l > a) && (this._addTween(t, i, r, r + a, i), this._overwriteProps.push(i)));
                    return !0
                },
                set: function(t) {
                    var e;
                    if (1 !== t) this._super.setRatio.call(this, t);
                    else
                        for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
                }
            })._autoCSS = !0, window._gsDefine("easing.Back", ["easing.Ease"], function(t) {
                var e, i, s, r = window.GreenSockGlobals || window,
                    n = r.com.greensock,
                    a = 2 * Math.PI,
                    o = Math.PI / 2,
                    h = n._class,
                    l = function(e, i) {
                        var s = h("easing." + e, function() {}, !0),
                            r = s.prototype = new t;
                        return r.constructor = s, r.getRatio = i, s
                    },
                    _ = t.register || function() {},
                    u = function(t, e, i, s) {
                        var r = h("easing." + t, {
                            easeOut: new e,
                            easeIn: new i,
                            easeInOut: new s
                        }, !0);
                        return _(r, t), r
                    },
                    p = function(t, e, i) {
                        this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
                    },
                    f = function(e, i) {
                        var s = h("easing." + e, function(t) {
                                this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                            }, !0),
                            r = s.prototype = new t;
                        return r.constructor = s, r.getRatio = i, r.config = function(t) {
                            return new s(t)
                        }, s
                    },
                    c = u("Back", f("BackOut", function(t) {
                        return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
                    }), f("BackIn", function(t) {
                        return t * t * ((this._p1 + 1) * t - this._p1)
                    }), f("BackInOut", function(t) {
                        return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
                    })),
                    m = h("easing.SlowMo", function(t, e, i) {
                        e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
                    }, !0),
                    d = m.prototype = new t;
                return d.constructor = m, d.getRatio = function(t) {
                    var e = t + (.5 - t) * this._p;
                    return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
                }, m.ease = new m(.7, .7), d.config = m.config = function(t, e, i) {
                    return new m(t, e, i)
                }, e = h("easing.SteppedEase", function(t) {
                    t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
                }, !0), d = e.prototype = new t, d.constructor = e, d.getRatio = function(t) {
                    return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
                }, d.config = e.config = function(t) {
                    return new e(t)
                }, i = h("easing.RoughEase", function(e) {
                    e = e || {};
                    for (var i, s, r, n, a, o, h = e.taper || "none", l = [], _ = 0, u = 0 | (e.points || 20), f = u, c = e.randomize !== !1, m = e.clamp === !0, d = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1;) i = c ? Math.random() : 1 / u * f, s = d ? d.getRatio(i) : i, "none" === h ? r = g : "out" === h ? (n = 1 - i, r = n * n * g) : "in" === h ? r = i * i * g : .5 > i ? (n = 2 * i, r = .5 * n * n * g) : (n = 2 * (1 - i), r = .5 * n * n * g), c ? s += Math.random() * r - .5 * r : f % 2 ? s += .5 * r : s -= .5 * r, m && (s > 1 ? s = 1 : 0 > s && (s = 0)), l[_++] = {
                        x: i,
                        y: s
                    };
                    for (l.sort(function(t, e) {
                            return t.x - e.x
                        }), o = new p(1, 1, null), f = u; --f > -1;) a = l[f], o = new p(a.x, a.y, o);
                    this._prev = new p(0, 0, 0 !== o.t ? o : o.next)
                }, !0), d = i.prototype = new t, d.constructor = i, d.getRatio = function(t) {
                    var e = this._prev;
                    if (t > e.t) {
                        for (; e.next && t >= e.t;) e = e.next;
                        e = e.prev
                    } else
                        for (; e.prev && e.t >= t;) e = e.prev;
                    return this._prev = e, e.v + (t - e.t) / e.gap * e.c
                }, d.config = function(t) {
                    return new i(t)
                }, i.ease = new i, u("Bounce", l("BounceOut", function(t) {
                    return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                }), l("BounceIn", function(t) {
                    return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                }), l("BounceInOut", function(t) {
                    var e = .5 > t;
                    return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
                })), u("Circ", l("CircOut", function(t) {
                    return Math.sqrt(1 - (t -= 1) * t)
                }), l("CircIn", function(t) {
                    return -(Math.sqrt(1 - t * t) - 1)
                }), l("CircInOut", function(t) {
                    return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                })), s = function(e, i, s) {
                    var r = h("easing." + e, function(t, e) {
                            this._p1 = t || 1, this._p2 = e || s, this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0)
                        }, !0),
                        n = r.prototype = new t;
                    return n.constructor = r, n.getRatio = i, n.config = function(t, e) {
                        return new r(t, e)
                    }, r
                }, u("Elastic", s("ElasticOut", function(t) {
                    return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * a / this._p2) + 1
                }, .3), s("ElasticIn", function(t) {
                    return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2))
                }, .3), s("ElasticInOut", function(t) {
                    return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) + 1
                }, .45)), u("Expo", l("ExpoOut", function(t) {
                    return 1 - Math.pow(2, -10 * t)
                }), l("ExpoIn", function(t) {
                    return Math.pow(2, 10 * (t - 1)) - .001
                }), l("ExpoInOut", function(t) {
                    return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
                })), u("Sine", l("SineOut", function(t) {
                    return Math.sin(t * o)
                }), l("SineIn", function(t) {
                    return -Math.cos(t * o) + 1
                }), l("SineInOut", function(t) {
                    return -.5 * (Math.cos(Math.PI * t) - 1)
                })), h("easing.EaseLookup", {
                    find: function(e) {
                        return t.map[e]
                    }
                }, !0), _(r.SlowMo, "SlowMo", "ease,"), _(i, "RoughEase", "ease,"), _(e, "SteppedEase", "ease,"), c
            }, !0)
    }),
    function(t) {
        "use strict";
        var e = t.GreenSockGlobals || t;
        if (!e.TweenLite) {
            var i, s, r, n, a, o = function(t) {
                    var i, s = t.split("."),
                        r = e;
                    for (i = 0; s.length > i; i++) r[s[i]] = r = r[s[i]] || {};
                    return r
                },
                h = o("com.greensock"),
                l = 1e-10,
                _ = [].slice,
                u = function() {},
                p = function() {
                    var t = Object.prototype.toString,
                        e = t.call([]);
                    return function(i) {
                        return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
                    }
                }(),
                f = {},
                c = function(i, s, r, n) {
                    this.sc = f[i] ? f[i].sc : [], f[i] = this, this.gsClass = null, this.func = r;
                    var a = [];
                    this.check = function(h) {
                        for (var l, _, u, p, m = s.length, d = m; --m > -1;)(l = f[s[m]] || new c(s[m], [])).gsClass ? (a[m] = l.gsClass, d--) : h && l.sc.push(this);
                        if (0 === d && r)
                            for (_ = ("com.greensock." + i).split("."), u = _.pop(), p = o(_.join("."))[u] = this.gsClass = r.apply(r, a), n && (e[u] = p, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + i.split(".").join("/"), [], function() {
                                    return p
                                }) : "undefined" != typeof module && module.exports && (module.exports = p)), m = 0; this.sc.length > m; m++) this.sc[m].check()
                    }, this.check(!0)
                },
                m = t._gsDefine = function(t, e, i, s) {
                    return new c(t, e, i, s)
                },
                d = h._class = function(t, e, i) {
                    return e = e || function() {}, m(t, [], function() {
                        return e
                    }, i), e
                };
            m.globals = e;
            var g = [0, 0, 1, 1],
                v = [],
                y = d("easing.Ease", function(t, e, i, s) {
                    this._func = t, this._type = i || 0, this._power = s || 0, this._params = e ? g.concat(e) : g
                }, !0),
                T = y.map = {},
                w = y.register = function(t, e, i, s) {
                    for (var r, n, a, o, l = e.split(","), _ = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --_ > -1;)
                        for (n = l[_], r = s ? d("easing." + n, null, !0) : h.easing[n] || {}, a = u.length; --a > -1;) o = u[a], T[n + "." + o] = T[o + n] = r[o] = t.getRatio ? t : t[o] || new t
                };
            for (r = y.prototype, r._calcEnd = !1, r.getRatio = function(t) {
                    if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                    var e = this._type,
                        i = this._power,
                        s = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
                    return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : .5 > t ? s / 2 : 1 - s / 2
                }, i = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], s = i.length; --s > -1;) r = i[s] + ",Power" + s, w(new y(null, null, 1, s), r, "easeOut", !0), w(new y(null, null, 2, s), r, "easeIn" + (0 === s ? ",easeNone" : "")), w(new y(null, null, 3, s), r, "easeInOut");
            T.linear = h.easing.Linear.easeIn, T.swing = h.easing.Quad.easeInOut;
            var x = d("events.EventDispatcher", function(t) {
                this._listeners = {}, this._eventTarget = t || this
            });
            r = x.prototype, r.addEventListener = function(t, e, i, s, r) {
                r = r || 0;
                var o, h, l = this._listeners[t],
                    _ = 0;
                for (null == l && (this._listeners[t] = l = []), h = l.length; --h > -1;) o = l[h], o.c === e && o.s === i ? l.splice(h, 1) : 0 === _ && r > o.pr && (_ = h + 1);
                l.splice(_, 0, {
                    c: e,
                    s: i,
                    up: s,
                    pr: r
                }), this !== n || a || n.wake()
            }, r.removeEventListener = function(t, e) {
                var i, s = this._listeners[t];
                if (s)
                    for (i = s.length; --i > -1;)
                        if (s[i].c === e) return s.splice(i, 1), void 0
            }, r.dispatchEvent = function(t) {
                var e, i, s, r = this._listeners[t];
                if (r)
                    for (e = r.length, i = this._eventTarget; --e > -1;) s = r[e], s.up ? s.c.call(s.s || i, {
                        type: t,
                        target: i
                    }) : s.c.call(s.s || i)
            };
            var b = t.requestAnimationFrame,
                P = t.cancelAnimationFrame,
                S = Date.now || function() {
                    return (new Date).getTime()
                },
                k = S();
            for (i = ["ms", "moz", "webkit", "o"], s = i.length; --s > -1 && !b;) b = t[i[s] + "RequestAnimationFrame"], P = t[i[s] + "CancelAnimationFrame"] || t[i[s] + "CancelRequestAnimationFrame"];
            d("Ticker", function(t, e) {
                var i, s, r, o, h, _ = this,
                    p = S(),
                    f = e !== !1 && b,
                    c = 500,
                    m = 33,
                    d = function(t) {
                        var e, n, a = S() - k;
                        a > c && (p += a - m), k += a, _.time = (k - p) / 1e3, e = _.time - h, (!i || e > 0 || t === !0) && (_.frame++, h += e + (e >= o ? .004 : o - e), n = !0), t !== !0 && (r = s(d)), n && _.dispatchEvent("tick")
                    };
                x.call(_), _.time = _.frame = 0, _.tick = function() {
                    d(!0)
                }, _.lagSmoothing = function(t, e) {
                    c = t || 1 / l, m = Math.min(e, c, 0)
                }, _.sleep = function() {
                    null != r && (f && P ? P(r) : clearTimeout(r), s = u, r = null, _ === n && (a = !1))
                }, _.wake = function() {
                    null !== r ? _.sleep() : _.frame > 10 && (k = S() - c + 5), s = 0 === i ? u : f && b ? b : function(t) {
                        return setTimeout(t, 0 | 1e3 * (h - _.time) + 1)
                    }, _ === n && (a = !0), d(2)
                }, _.fps = function(t) {
                    return arguments.length ? (i = t, o = 1 / (i || 60), h = this.time + o, _.wake(), void 0) : i
                }, _.useRAF = function(t) {
                    return arguments.length ? (_.sleep(), f = t, _.fps(i), void 0) : f
                }, _.fps(t), setTimeout(function() {
                    f && (!r || 5 > _.frame) && _.useRAF(!1)
                }, 1500)
            }), r = h.Ticker.prototype = new h.events.EventDispatcher, r.constructor = h.Ticker;
            var R = d("core.Animation", function(t, e) {
                if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, j) {
                    a || n.wake();
                    var i = this.vars.useFrames ? Y : j;
                    i.add(this, i._time), this.vars.paused && this.paused(!0)
                }
            });
            n = R.ticker = new h.Ticker, r = R.prototype, r._dirty = r._gc = r._initted = r._paused = !1, r._totalTime = r._time = 0, r._rawPrevTime = -1, r._next = r._last = r._onUpdate = r._timeline = r.timeline = null, r._paused = !1;
            var A = function() {
                a && S() - k > 2e3 && n.wake(), setTimeout(A, 2e3)
            };
            A(), r.play = function(t, e) {
                return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
            }, r.pause = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!0)
            }, r.resume = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!1)
            }, r.seek = function(t, e) {
                return this.totalTime(Number(t), e !== !1)
            }, r.restart = function(t, e) {
                return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
            }, r.reverse = function(t, e) {
                return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
            }, r.render = function() {}, r.invalidate = function() {
                return this
            }, r.isActive = function() {
                var t, e = this._timeline,
                    i = this._startTime;
                return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t
            }, r._enabled = function(t, e) {
                return a || n.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
            }, r._kill = function() {
                return this._enabled(!1, !1)
            }, r.kill = function(t, e) {
                return this._kill(t, e), this
            }, r._uncache = function(t) {
                for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                return this
            }, r._swapSelfInParams = function(t) {
                for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
                return i
            }, r.eventCallback = function(t, e, i, s) {
                if ("on" === (t || "").substr(0, 2)) {
                    var r = this.vars;
                    if (1 === arguments.length) return r[t];
                    null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = p(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = s), "onUpdate" === t && (this._onUpdate = e)
                }
                return this
            }, r.delay = function(t) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
            }, r.duration = function(t) {
                return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, r.totalDuration = function(t) {
                return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
            }, r.time = function(t, e) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
            }, r.totalTime = function(t, e, i) {
                if (a || n.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var s = this._totalDuration,
                            r = this._timeline;
                        if (t > s && !i && (t = s), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? s - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                            for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), z.length && B())
                }
                return this
            }, r.progress = r.totalProgress = function(t, e) {
                return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
            }, r.startTime = function(t) {
                return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
            }, r.timeScale = function(t) {
                if (!arguments.length) return this._timeScale;
                if (t = t || l, this._timeline && this._timeline.smoothChildTiming) {
                    var e = this._pauseTime,
                        i = e || 0 === e ? e : this._timeline.totalTime();
                    this._startTime = i - (i - this._startTime) * this._timeScale / t
                }
                return this._timeScale = t, this._uncache(!1)
            }, r.reversed = function(t) {
                return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, r.paused = function(t) {
                if (!arguments.length) return this._paused;
                if (t != this._paused && this._timeline) {
                    a || t || n.wake();
                    var e = this._timeline,
                        i = e.rawTime(),
                        s = i - this._pauseTime;
                    !t && e.smoothChildTiming && (this._startTime += s, this._uncache(!1)), this._pauseTime = t ? i : null, this._paused = t, this._active = this.isActive(), !t && 0 !== s && this._initted && this.duration() && this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0)
                }
                return this._gc && !t && this._enabled(!0, !1), this
            };
            var C = d("core.SimpleTimeline", function(t) {
                R.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            r = C.prototype = new R, r.constructor = C, r.kill()._gc = !1, r._first = r._last = null, r._sortChildren = !1, r.add = r.insert = function(t, e) {
                var i, s;
                if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)
                    for (s = t._startTime; i && i._startTime > s;) i = i._prev;
                return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._timeline && this._uncache(!0), this
            }, r._remove = function(t, e) {
                return t.timeline === this && (e || t._enabled(!1, !0), t.timeline = null, t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), this._timeline && this._uncache(!0)), this
            }, r.render = function(t, e, i) {
                var s, r = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = t; r;) s = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = s
            }, r.rawTime = function() {
                return a || n.wake(), this._totalTime
            };
            var O = d("TweenLite", function(e, i, s) {
                    if (R.call(this, i, s), this.render = O.prototype.render, null == e) throw "Cannot tween a null target.";
                    this.target = e = "string" != typeof e ? e : O.selector(e) || e;
                    var r, n, a, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                        h = this.vars.overwrite;
                    if (this._overwrite = h = null == h ? U[O.defaultOverwrite] : "number" == typeof h ? h >> 0 : U[h], (o || e instanceof Array || e.push && p(e)) && "number" != typeof e[0])
                        for (this._targets = a = _.call(e, 0), this._propLookup = [], this._siblings = [], r = 0; a.length > r; r++) n = a[r], n ? "string" != typeof n ? n.length && n !== t && n[0] && (n[0] === t || n[0].nodeType && n[0].style && !n.nodeType) ? (a.splice(r--, 1), this._targets = a = a.concat(_.call(n, 0))) : (this._siblings[r] = q(n, this, !1), 1 === h && this._siblings[r].length > 1 && V(n, this, null, 1, this._siblings[r])) : (n = a[r--] = O.selector(n), "string" == typeof n && a.splice(r + 1, 1)) : a.splice(r--, 1);
                    else this._propLookup = {}, this._siblings = q(e, this, !1), 1 === h && this._siblings.length > 1 && V(e, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -l, this.render(-this._delay))
                }, !0),
                D = function(e) {
                    return e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
                },
                M = function(t, e) {
                    var i, s = {};
                    for (i in t) X[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!L[i] || L[i] && L[i]._autoCSS) || (s[i] = t[i], delete t[i]);
                    t.css = s
                };
            r = O.prototype = new R, r.constructor = O, r.kill()._gc = !1, r.ratio = 0, r._firstPT = r._targets = r._overwrittenProps = r._startAt = null, r._notifyPluginsOfEnabled = r._lazy = !1, O.version = "1.12.1", O.defaultEase = r._ease = new y(null, null, 1, 1), O.defaultOverwrite = "auto", O.ticker = n, O.autoSleep = !0, O.lagSmoothing = function(t, e) {
                n.lagSmoothing(t, e)
            }, O.selector = t.$ || t.jQuery || function(e) {
                return t.$ ? (O.selector = t.$, t.$(e)) : t.document ? t.document.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e
            };
            var z = [],
                I = {},
                E = O._internals = {
                    isArray: p,
                    isSelector: D,
                    lazyTweens: z
                },
                L = O._plugins = {},
                F = E.tweenLookup = {},
                N = 0,
                X = E.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1
                },
                U = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    "true": 1,
                    "false": 0
                },
                Y = R._rootFramesTimeline = new C,
                j = R._rootTimeline = new C,
                B = function() {
                    var t = z.length;
                    for (I = {}; --t > -1;) i = z[t], i && i._lazy !== !1 && (i.render(i._lazy, !1, !0), i._lazy = !1);
                    z.length = 0
                };
            j._startTime = n.time, Y._startTime = n.frame, j._active = Y._active = !0, setTimeout(B, 1), R._updateRoot = O.render = function() {
                var t, e, i;
                if (z.length && B(), j.render((n.time - j._startTime) * j._timeScale, !1, !1), Y.render((n.frame - Y._startTime) * Y._timeScale, !1, !1), z.length && B(), !(n.frame % 120)) {
                    for (i in F) {
                        for (e = F[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                        0 === e.length && delete F[i]
                    }
                    if (i = j._first, (!i || i._paused) && O.autoSleep && !Y._first && 1 === n._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || n.sleep()
                    }
                }
            }, n.addEventListener("tick", R._updateRoot);
            var q = function(t, e, i) {
                    var s, r, n = t._gsTweenID;
                    if (F[n || (t._gsTweenID = n = "t" + N++)] || (F[n] = {
                            target: t,
                            tweens: []
                        }), e && (s = F[n].tweens, s[r = s.length] = e, i))
                        for (; --r > -1;) s[r] === e && s.splice(r, 1);
                    return F[n].tweens
                },
                V = function(t, e, i, s, r) {
                    var n, a, o, h;
                    if (1 === s || s >= 4) {
                        for (h = r.length, n = 0; h > n; n++)
                            if ((o = r[n]) !== e) o._gc || o._enabled(!1, !1) && (a = !0);
                            else if (5 === s) break;
                        return a
                    }
                    var _, u = e._startTime + l,
                        p = [],
                        f = 0,
                        c = 0 === e._duration;
                    for (n = r.length; --n > -1;)(o = r[n]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (_ = _ || W(e, 0, c), 0 === W(o, _, c) && (p[f++] = o)) : u >= o._startTime && o._startTime + o.totalDuration() / o._timeScale > u && ((c || !o._initted) && 2e-10 >= u - o._startTime || (p[f++] = o)));
                    for (n = f; --n > -1;) o = p[n], 2 === s && o._kill(i, t) && (a = !0), (2 !== s || !o._firstPT && o._initted) && o._enabled(!1, !1) && (a = !0);
                    return a
                },
                W = function(t, e, i) {
                    for (var s = t._timeline, r = s._timeScale, n = t._startTime; s._timeline;) {
                        if (n += s._startTime, r *= s._timeScale, s._paused) return -100;
                        s = s._timeline
                    }
                    return n /= r, n > e ? n - e : i && n === e || !t._initted && 2 * l > n - e ? l : (n += t.totalDuration() / t._timeScale / r) > e + l ? 0 : n - e - l
                };
            r._init = function() {
                var t, e, i, s, r, n = this.vars,
                    a = this._overwrittenProps,
                    o = this._duration,
                    h = !!n.immediateRender,
                    l = n.ease;
                if (n.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
                    for (s in n.startAt) r[s] = n.startAt[s];
                    if (r.overwrite = !1, r.immediateRender = !0, r.lazy = h && n.lazy !== !1, r.startAt = r.delay = null, this._startAt = O.to(this.target, 0, r), h)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== o) return
                } else if (n.runBackwards && 0 !== o)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        i = {};
                        for (s in n) X[s] && "autoCSS" !== s || (i[s] = n[s]);
                        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && n.lazy !== !1, i.immediateRender = h, this._startAt = O.to(this.target, 0, i), h) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1)
                    } if (this._ease = l ? l instanceof y ? n.easeParams instanceof Array ? l.config.apply(l, n.easeParams) : l : "function" == typeof l ? new y(l, n.easeParams) : T[l] || O.defaultEase : O.defaultEase, this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null) && (e = !0);
                else e = this._initProps(this.target, this._propLookup, this._siblings, a);
                if (e && O._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), n.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = n.onUpdate, this._initted = !0
            }, r._initProps = function(e, i, s, r) {
                var n, a, o, h, l, _;
                if (null == e) return !1;
                I[e._gsTweenID] && B(), this.vars.css || e.style && e !== t && e.nodeType && L.css && this.vars.autoCSS !== !1 && M(this.vars, e);
                for (n in this.vars) {
                    if (_ = this.vars[n], X[n]) _ && (_ instanceof Array || _.push && p(_)) && -1 !== _.join("").indexOf("{self}") && (this.vars[n] = _ = this._swapSelfInParams(_, this));
                    else if (L[n] && (h = new L[n])._onInitTween(e, this.vars[n], this)) {
                        for (this._firstPT = l = {
                                _next: this._firstPT,
                                t: h,
                                p: "setRatio",
                                s: 0,
                                c: 1,
                                f: !0,
                                n: n,
                                pg: !0,
                                pr: h._priority
                            }, a = h._overwriteProps.length; --a > -1;) i[h._overwriteProps[a]] = this._firstPT;
                        (h._priority || h._onInitAllProps) && (o = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0)
                    } else this._firstPT = i[n] = l = {
                        _next: this._firstPT,
                        t: e,
                        p: n,
                        f: "function" == typeof e[n],
                        n: n,
                        pg: !1,
                        pr: 0
                    }, l.s = l.f ? e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(e[n]), l.c = "string" == typeof _ && "=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2)) : Number(_) - l.s || 0;
                    l && l._next && (l._next._prev = l)
                }
                return r && this._kill(r, e) ? this._initProps(e, i, s, r) : this._overwrite > 1 && this._firstPT && s.length > 1 && V(e, this, i, this._overwrite, s) ? (this._kill(i, e), this._initProps(e, i, s, r)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (I[e._gsTweenID] = !0), o)
            }, r.render = function(t, e, i) {
                var s, r, n, a, o = this._time,
                    h = this._duration,
                    _ = this._rawPrevTime;
                if (t >= h) this._totalTime = this._time = h, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (s = !0, r = "onComplete"), 0 === h && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > _ || _ === l) && _ !== t && (i = !0, _ > l && (r = "onReverseComplete")), this._rawPrevTime = a = !e || t || _ === t ? t : l);
                else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === h && _ > 0 && _ !== l) && (r = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === h && (this._initted || !this.vars.lazy || i) && (_ >= 0 && (i = !0), this._rawPrevTime = a = !e || t || _ === t ? t : l)) : this._initted || (i = !0);
                else if (this._totalTime = this._time = t, this._easeType) {
                    var u = t / h,
                        p = this._easeType,
                        f = this._easePower;
                    (1 === p || 3 === p && u >= .5) && (u = 1 - u), 3 === p && (u *= 2), 1 === f ? u *= u : 2 === f ? u *= u * u : 3 === f ? u *= u * u * u : 4 === f && (u *= u * u * u * u), this.ratio = 1 === p ? 1 - u : 2 === p ? u : .5 > t / h ? u / 2 : 1 - u / 2
                } else this.ratio = this._ease.getRatio(t / h);
                if (this._time !== o || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = o, this._rawPrevTime = _, z.push(this), this._lazy = t, void 0;
                        this._time && !s ? this.ratio = this._ease.getRatio(this._time / h) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === h) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || v))), n = this._firstPT; n;) n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s, n = n._next;
                    this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._time !== o || s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || v)), r && (this._gc || (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || v), 0 === h && this._rawPrevTime === l && a !== l && (this._rawPrevTime = 0)))
                }
            }, r._kill = function(t, e) {
                if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                e = "string" != typeof e ? e || this._targets || this.target : O.selector(e) || e;
                var i, s, r, n, a, o, h, l;
                if ((p(e) || D(e)) && "number" != typeof e[0])
                    for (i = e.length; --i > -1;) this._kill(t, e[i]) && (o = !0);
                else {
                    if (this._targets) {
                        for (i = this._targets.length; --i > -1;)
                            if (e === this._targets[i]) {
                                a = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], s = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : "all";
                                break
                            }
                    } else {
                        if (e !== this.target) return !1;
                        a = this._propLookup, s = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                    }
                    if (a) {
                        h = t || a, l = t !== s && "all" !== s && t !== a && ("object" != typeof t || !t._tempKill);
                        for (r in h)(n = a[r]) && (n.pg && n.t._kill(h) && (o = !0), n.pg && 0 !== n.t._overwriteProps.length || (n._prev ? n._prev._next = n._next : n === this._firstPT && (this._firstPT = n._next), n._next && (n._next._prev = n._prev), n._next = n._prev = null), delete a[r]), l && (s[r] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return o
            }, r.invalidate = function() {
                return this._notifyPluginsOfEnabled && O._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = this._lazy = !1, this._propLookup = this._targets ? {} : [], this
            }, r._enabled = function(t, e) {
                if (a || n.wake(), t && this._gc) {
                    var i, s = this._targets;
                    if (s)
                        for (i = s.length; --i > -1;) this._siblings[i] = q(s[i], this, !0);
                    else this._siblings = q(this.target, this, !0)
                }
                return R.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? O._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
            }, O.to = function(t, e, i) {
                return new O(t, e, i)
            }, O.from = function(t, e, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new O(t, e, i)
            }, O.fromTo = function(t, e, i, s) {
                return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new O(t, e, s)
            }, O.delayedCall = function(t, e, i, s, r) {
                return new O(e, 0, {
                    delay: t,
                    onComplete: e,
                    onCompleteParams: i,
                    onCompleteScope: s,
                    onReverseComplete: e,
                    onReverseCompleteParams: i,
                    onReverseCompleteScope: s,
                    immediateRender: !1,
                    useFrames: r,
                    overwrite: 0
                })
            }, O.set = function(t, e) {
                return new O(t, 0, e)
            }, O.getTweensOf = function(t, e) {
                if (null == t) return [];
                t = "string" != typeof t ? t : O.selector(t) || t;
                var i, s, r, n;
                if ((p(t) || D(t)) && "number" != typeof t[0]) {
                    for (i = t.length, s = []; --i > -1;) s = s.concat(O.getTweensOf(t[i], e));
                    for (i = s.length; --i > -1;)
                        for (n = s[i], r = i; --r > -1;) n === s[r] && s.splice(i, 1)
                } else
                    for (s = q(t).concat(), i = s.length; --i > -1;)(s[i]._gc || e && !s[i].isActive()) && s.splice(i, 1);
                return s
            }, O.killTweensOf = O.killDelayedCallsTo = function(t, e, i) {
                "object" == typeof e && (i = e, e = !1);
                for (var s = O.getTweensOf(t, e), r = s.length; --r > -1;) s[r]._kill(i, t)
            };
            var G = d("plugins.TweenPlugin", function(t, e) {
                this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = G.prototype
            }, !0);
            if (r = G.prototype, G.version = "1.10.1", G.API = 2, r._firstPT = null, r._addTween = function(t, e, i, s, r, n) {
                    var a, o;
                    return null != s && (a = "number" == typeof s || "=" !== s.charAt(1) ? Number(s) - i : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))) ? (this._firstPT = o = {
                        _next: this._firstPT,
                        t: t,
                        p: e,
                        s: i,
                        c: a,
                        f: "function" == typeof t[e],
                        n: r || e,
                        r: n
                    }, o._next && (o._next._prev = o), o) : void 0
                }, r.setRatio = function(t) {
                    for (var e, i = this._firstPT, s = 1e-6; i;) e = i.c * t + i.s, i.r ? e = Math.round(e) : s > e && e > -s && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next
                }, r._kill = function(t) {
                    var e, i = this._overwriteProps,
                        s = this._firstPT;
                    if (null != t[this._propName]) this._overwriteProps = [];
                    else
                        for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                    for (; s;) null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? (s._prev._next = s._next, s._prev = null) : this._firstPT === s && (this._firstPT = s._next)), s = s._next;
                    return !1
                }, r._roundProps = function(t, e) {
                    for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
                }, O._onPluginEvent = function(t, e) {
                    var i, s, r, n, a, o = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; o;) {
                            for (a = o._next, s = r; s && s.pr > o.pr;) s = s._next;
                            (o._prev = s ? s._prev : n) ? o._prev._next = o: r = o, (o._next = s) ? s._prev = o : n = o, o = a
                        }
                        o = e._firstPT = r
                    }
                    for (; o;) o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
                    return i
                }, G.activate = function(t) {
                    for (var e = t.length; --e > -1;) t[e].API === G.API && (L[(new t[e])._propName] = t[e]);
                    return !0
                }, m.plugin = function(t) {
                    if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                    var e, i = t.propName,
                        s = t.priority || 0,
                        r = t.overwriteProps,
                        n = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_roundProps",
                            initAll: "_onInitAllProps"
                        },
                        a = d("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                            G.call(this, i, s), this._overwriteProps = r || []
                        }, t.global === !0),
                        o = a.prototype = new G(i);
                    o.constructor = a, a.API = t.API;
                    for (e in n) "function" == typeof t[e] && (o[n[e]] = t[e]);
                    return a.version = t.version, G.activate([a]), a
                }, i = t._gsQueue) {
                for (s = 0; i.length > s; s++) i[s]();
                for (r in f) f[r].func || t.console.log("GSAP encountered missing dependency: com.greensock." + r)
            }
            a = !1
        }
    }(window);

window.GreenSockGlobals = window._gsQueue = null;