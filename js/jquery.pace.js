if (jQuery('body').hasClass('hb-preloader')) {
    (function() {
        var t, e, n, r, s, o, i, a, u, c, l, p, h, g, d, f, m, y, v, w, P, b, S, k, q, L, x, R, T, E, M, j, A, N, O, _, F, C, U, W, X, D, H, I, z, G, B, J, K = [].slice,
            Q = {}.hasOwnProperty,
            V = function(t, e) {
                function n() {
                    this.constructor = t
                }
                for (var r in e) Q.call(e, r) && (t[r] = e[r]);
                return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
            },
            Y = [].indexOf || function(t) {
                for (var e = 0, n = this.length; n > e; e++)
                    if (e in this && this[e] === t) return e;
                return -1
            };
        for (w = {
                catchupTime: 500,
                initialRate: .03,
                minTime: 500,
                ghostTime: 500,
                maxProgressPerFrame: 10,
                easeFactor: 1.25,
                startOnPageLoad: !0,
                restartOnPushState: !0,
                restartOnRequestAfter: 500,
                target: "body",
                elements: {
                    checkInterval: 100,
                    selectors: ["body"]
                },
                eventLag: {
                    minSamples: 10,
                    sampleCount: 3,
                    lagThreshold: 3
                },
                ajax: {
                    trackMethods: ["GET"],
                    trackWebSockets: !0,
                    ignoreURLs: []
                }
            }, R = function() {
                var t;
                return null != (t = "undefined" != typeof performance && null !== performance ? "function" == typeof performance.now ? performance.now() : void 0 : void 0) ? t : +new Date
            }, E = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, v = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == E && (E = function(t) {
                return setTimeout(t, 50)
            }, v = function(t) {
                return clearTimeout(t)
            }), j = function(t) {
                var e, n;
                return e = R(), (n = function() {
                    var r;
                    return r = R() - e, r >= 33 ? (e = R(), t(r, function() {
                        return E(n)
                    })) : setTimeout(n, 33 - r)
                })()
            }, M = function() {
                var t, e, n;
                return n = arguments[0], e = arguments[1], t = 3 <= arguments.length ? K.call(arguments, 2) : [], "function" == typeof n[e] ? n[e].apply(n, t) : n[e]
            }, P = function() {
                var t, e, n, r, s, o, i;
                for (e = arguments[0], r = 2 <= arguments.length ? K.call(arguments, 1) : [], o = 0, i = r.length; i > o; o++)
                    if (n = r[o])
                        for (t in n) Q.call(n, t) && (s = n[t], null != e[t] && "object" == typeof e[t] && null != s && "object" == typeof s ? P(e[t], s) : e[t] = s);
                return e
            }, f = function(t) {
                var e, n, r, s, o;
                for (n = e = 0, s = 0, o = t.length; o > s; s++) r = t[s], n += Math.abs(r), e++;
                return n / e
            }, S = function(t, e) {
                var n, r, s;
                if (null == t && (t = "options"), null == e && (e = !0), s = document.querySelector("[data-pace-" + t + "]")) {
                    if (n = s.getAttribute("data-pace-" + t), !e) return n;
                    try {
                        return JSON.parse(n)
                    } catch (o) {
                        return r = o, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", r) : void 0
                    }
                }
            }, i = function() {
                function t() {}
                return t.prototype.on = function(t, e, n, r) {
                    var s;
                    return null == r && (r = !1), null == this.bindings && (this.bindings = {}), null == (s = this.bindings)[t] && (s[t] = []), this.bindings[t].push({
                        handler: e,
                        ctx: n,
                        once: r
                    })
                }, t.prototype.once = function(t, e, n) {
                    return this.on(t, e, n, !0)
                }, t.prototype.off = function(t, e) {
                    var n, r, s;
                    if (null != (null != (r = this.bindings) ? r[t] : void 0)) {
                        if (null == e) return delete this.bindings[t];
                        for (n = 0, s = []; n < this.bindings[t].length;) s.push(this.bindings[t][n].handler === e ? this.bindings[t].splice(n, 1) : n++);
                        return s
                    }
                }, t.prototype.trigger = function() {
                    var t, e, n, r, s, o, i, a, u;
                    if (n = arguments[0], t = 2 <= arguments.length ? K.call(arguments, 1) : [], null != (i = this.bindings) ? i[n] : void 0) {
                        for (s = 0, u = []; s < this.bindings[n].length;) a = this.bindings[n][s], r = a.handler, e = a.ctx, o = a.once, r.apply(null != e ? e : this, t), u.push(o ? this.bindings[n].splice(s, 1) : s++);
                        return u
                    }
                }, t
            }(), null == window.Pace && (window.Pace = {}), P(Pace, i.prototype), T = Pace.options = P({}, w, window.paceOptions, S()), G = ["ajax", "document", "eventLag", "elements"], D = 0, I = G.length; I > D; D++) _ = G[D], T[_] === !0 && (T[_] = w[_]);
        u = function(t) {
            function e() {
                return B = e.__super__.constructor.apply(this, arguments)
            }
            return V(e, t), e
        }(Error), e = function() {
            function t() {
                this.progress = 0
            }
            return t.prototype.getElement = function() {
                var t;
                if (null == this.el) {
                    if (t = document.querySelector(T.target), !t) throw new u;
                    this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != t.firstChild ? t.insertBefore(this.el, t.firstChild) : t.appendChild(this.el)
                }
                return this.el
            }, t.prototype.finish = function() {
                var t;
                return t = this.getElement(), t.className = t.className.replace("pace-active", ""), t.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done"
            }, t.prototype.update = function(t) {
                return this.progress = t, this.render()
            }, t.prototype.destroy = function() {
                try {
                    this.getElement().parentNode.removeChild(this.getElement())
                } catch (t) {
                    u = t
                }
                return this.el = void 0
            }, t.prototype.render = function() {
                var t, e;
                return null == document.querySelector(T.target) ? !1 : (t = this.getElement(), t.children[0].style.width = "" + this.progress + "%", (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (t.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? e = "99" : (e = this.progress < 10 ? "0" : "", e += 0 | this.progress), t.children[0].setAttribute("data-progress", "" + e)), this.lastRenderedProgress = this.progress)
            }, t.prototype.done = function() {
                return this.progress >= 100
            }, t
        }(), a = function() {
            function t() {
                this.bindings = {}
            }
            return t.prototype.trigger = function(t, e) {
                var n, r, s, o, i;
                if (null != this.bindings[t]) {
                    for (o = this.bindings[t], i = [], r = 0, s = o.length; s > r; r++) n = o[r], i.push(n.call(this, e));
                    return i
                }
            }, t.prototype.on = function(t, e) {
                var n;
                return null == (n = this.bindings)[t] && (n[t] = []), this.bindings[t].push(e)
            }, t
        }(), X = window.XMLHttpRequest, W = window.XDomainRequest, U = window.WebSocket, b = function(t, e) {
            var n, r, s, o;
            o = [];
            for (r in e.prototype) try {
                s = e.prototype[r], o.push(null == t[r] && "function" != typeof s ? t[r] = s : void 0)
            } catch (i) {
                n = i
            }
            return o
        }, L = [], Pace.ignore = function() {
            var t, e, n;
            return e = arguments[0], t = 2 <= arguments.length ? K.call(arguments, 1) : [], L.unshift("ignore"), n = e.apply(null, t), L.shift(), n
        }, Pace.track = function() {
            var t, e, n;
            return e = arguments[0], t = 2 <= arguments.length ? K.call(arguments, 1) : [], L.unshift("track"), n = e.apply(null, t), L.shift(), n
        }, O = function(t) {
            var e;
            if (null == t && (t = "GET"), "track" === L[0]) return "force";
            if (!L.length && T.ajax) {
                if ("socket" === t && T.ajax.trackWebSockets) return !0;
                if (e = t.toUpperCase(), Y.call(T.ajax.trackMethods, e) >= 0) return !0
            }
            return !1
        }, c = function(t) {
            function e() {
                var t, n = this;
                e.__super__.constructor.apply(this, arguments), t = function(t) {
                    var e;
                    return e = t.open, t.open = function(r, s) {
                        return O(r) && n.trigger("request", {
                            type: r,
                            url: s,
                            request: t
                        }), e.apply(t, arguments)
                    }
                }, window.XMLHttpRequest = function(e) {
                    var n;
                    return n = new X(e), t(n), n
                }, b(window.XMLHttpRequest, X), null != W && (window.XDomainRequest = function() {
                    var e;
                    return e = new W, t(e), e
                }, b(window.XDomainRequest, W)), null != U && T.ajax.trackWebSockets && (window.WebSocket = function(t, e) {
                    var r;
                    return r = null != e ? new U(t, e) : new U(t), O("socket") && n.trigger("request", {
                        type: "socket",
                        url: t,
                        protocols: e,
                        request: r
                    }), r
                }, b(window.WebSocket, U))
            }
            return V(e, t), e
        }(a), H = null, k = function() {
            return null == H && (H = new c), H
        }, N = function(t) {
            var e, n, r, s;
            for (s = T.ajax.ignoreURLs, n = 0, r = s.length; r > n; n++)
                if (e = s[n], "string" == typeof e) {
                    if (-1 !== t.indexOf(e)) return !0
                } else if (e.test(t)) return !0;
            return !1
        }, k().on("request", function(e) {
            var n, r, s, o, i;
            return o = e.type, s = e.request, i = e.url, N(i) ? void 0 : Pace.running || T.restartOnRequestAfter === !1 && "force" !== O(o) ? void 0 : (r = arguments, n = T.restartOnRequestAfter || 0, "boolean" == typeof n && (n = 0), setTimeout(function() {
                var e, n, i, a, u, c;
                if (e = "socket" === o ? s.readyState < 2 : 0 < (a = s.readyState) && 4 > a) {
                    for (Pace.restart(), u = Pace.sources, c = [], n = 0, i = u.length; i > n; n++) {
                        if (_ = u[n], _ instanceof t) {
                            _.watch.apply(_, r);
                            break
                        }
                        c.push(void 0)
                    }
                    return c
                }
            }, n))
        }), t = function() {
            function t() {
                var t = this;
                this.elements = [], k().on("request", function() {
                    return t.watch.apply(t, arguments)
                })
            }
            return t.prototype.watch = function(t) {
                var e, n, r, s;
                return r = t.type, e = t.request, s = t.url, N(s) ? void 0 : (n = "socket" === r ? new h(e) : new g(e), this.elements.push(n))
            }, t
        }(), g = function() {
            function t(t) {
                var e, n, r, s, o, i, a = this;
                if (this.progress = 0, null != window.ProgressEvent)
                    for (n = null, t.addEventListener("progress", function(t) {
                            return a.progress = t.lengthComputable ? 100 * t.loaded / t.total : a.progress + (100 - a.progress) / 2
                        }), i = ["load", "abort", "timeout", "error"], r = 0, s = i.length; s > r; r++) e = i[r], t.addEventListener(e, function() {
                        return a.progress = 100
                    });
                else o = t.onreadystatechange, t.onreadystatechange = function() {
                    var e;
                    return 0 === (e = t.readyState) || 4 === e ? a.progress = 100 : 3 === t.readyState && (a.progress = 50), "function" == typeof o ? o.apply(null, arguments) : void 0
                }
            }
            return t
        }(), h = function() {
            function t(t) {
                var e, n, r, s, o = this;
                for (this.progress = 0, s = ["error", "open"], n = 0, r = s.length; r > n; n++) e = s[n], t.addEventListener(e, function() {
                    return o.progress = 100
                })
            }
            return t
        }(), r = function() {
            function t(t) {
                var e, n, r, o;
                for (null == t && (t = {}), this.elements = [], null == t.selectors && (t.selectors = []), o = t.selectors, n = 0, r = o.length; r > n; n++) e = o[n], this.elements.push(new s(e))
            }
            return t
        }(), s = function() {
            function t(t) {
                this.selector = t, this.progress = 0, this.check()
            }
            return t.prototype.check = function() {
                var t = this;
                return document.querySelector(this.selector) ? this.done() : setTimeout(function() {
                    return t.check()
                }, T.elements.checkInterval)
            }, t.prototype.done = function() {
                return this.progress = 100
            }, t
        }(), n = function() {
            function t() {
                var t, e, n = this;
                this.progress = null != (e = this.states[document.readyState]) ? e : 100, t = document.onreadystatechange, document.onreadystatechange = function() {
                    return null != n.states[document.readyState] && (n.progress = n.states[document.readyState]), "function" == typeof t ? t.apply(null, arguments) : void 0
                }
            }
            return t.prototype.states = {
                loading: 0,
                interactive: 50,
                complete: 100
            }, t
        }(), o = function() {
            function t() {
                var t, e, n, r, s, o = this;
                this.progress = 0, t = 0, s = [], r = 0, n = R(), e = setInterval(function() {
                    var i;
                    return i = R() - n - 50, n = R(), s.push(i), s.length > T.eventLag.sampleCount && s.shift(), t = f(s), ++r >= T.eventLag.minSamples && t < T.eventLag.lagThreshold ? (o.progress = 100, clearInterval(e)) : o.progress = 100 * (3 / (t + 3))
                }, 50)
            }
            return t
        }(), p = function() {
            function t(t) {
                this.source = t, this.last = this.sinceLastUpdate = 0, this.rate = T.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = M(this.source, "progress"))
            }
            return t.prototype.tick = function(t, e) {
                var n;
                return null == e && (e = M(this.source, "progress")), e >= 100 && (this.done = !0), e === this.last ? this.sinceLastUpdate += t : (this.sinceLastUpdate && (this.rate = (e - this.last) / this.sinceLastUpdate), this.catchup = (e - this.progress) / T.catchupTime, this.sinceLastUpdate = 0, this.last = e), e > this.progress && (this.progress += this.catchup * t), n = 1 - Math.pow(this.progress / 100, T.easeFactor), this.progress += n * this.rate * t, this.progress = Math.min(this.lastProgress + T.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
            }, t
        }(), F = null, A = null, m = null, C = null, d = null, y = null, Pace.running = !1, q = function() {
            return T.restartOnPushState ? Pace.restart() : void 0
        }, null != window.history.pushState && (z = window.history.pushState, window.history.pushState = function() {
            return q(), z.apply(window.history, arguments)
        }), null != window.history.replaceState && (J = window.history.replaceState, window.history.replaceState = function() {
            return q(), J.apply(window.history, arguments)
        }), l = {
            ajax: t,
            elements: r,
            document: n,
            eventLag: o
        }, (x = function() {
            var t, n, r, s, o, i, a, u;
            for (Pace.sources = F = [], i = ["ajax", "elements", "document", "eventLag"], n = 0, s = i.length; s > n; n++) t = i[n], T[t] !== !1 && F.push(new l[t](T[t]));
            for (u = null != (a = T.extraSources) ? a : [], r = 0, o = u.length; o > r; r++) _ = u[r], F.push(new _(T));
            return Pace.bar = m = new e, A = [], C = new p
        })(), Pace.stop = function() {
            return Pace.trigger("stop"), Pace.running = !1, m.destroy(), y = !0, null != d && ("function" == typeof v && v(d), d = null), x()
        }, Pace.restart = function() {
            return Pace.trigger("restart"), Pace.stop(), Pace.start()
        }, Pace.go = function() {
            var t;
            return Pace.running = !0, m.render(), t = R(), y = !1, d = j(function(e, n) {
                var r, s, o, i, a, u, c, l, h, g, d, f, v, w, P, b;
                for (l = 100 - m.progress, s = d = 0, o = !0, u = f = 0, w = F.length; w > f; u = ++f)
                    for (_ = F[u], g = null != A[u] ? A[u] : A[u] = [], a = null != (b = _.elements) ? b : [_], c = v = 0, P = a.length; P > v; c = ++v) i = a[c], h = null != g[c] ? g[c] : g[c] = new p(i), o &= h.done, h.done || (s++, d += h.tick(e));
                return r = d / s, m.update(C.tick(e, r)), m.done() || o || y ? (m.update(100), Pace.trigger("done"), setTimeout(function() {
                    return m.finish(), Pace.running = !1, Pace.trigger("hide")
                }, Math.max(T.ghostTime, Math.max(T.minTime - (R() - t), 0)))) : n()
            })
        }, Pace.start = function(t) {
            P(T, t), Pace.running = !0;
            try {
                m.render()
            } catch (e) {
                u = e
            }
            return document.querySelector(".pace") ? (Pace.trigger("start"), Pace.go()) : setTimeout(Pace.start, 50)
        }, "function" == typeof define && define.amd ? define(function() {
            return Pace
        }) : "object" == typeof exports ? module.exports = Pace : T.startOnPageLoad && Pace.start()
    }).call(this);
}