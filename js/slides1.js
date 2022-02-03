if (window.pluginsAttached) {
    alert("Attention: plugins.js library is attached twice and needs to be removed. The slides.min.js already contains both of scripts.");
} else {
    window.pluginsAttached = 1;
}
(function ($) {
    $.extend($, {
        cacheImage: function (src, options) {
            if (typeof src === "object") {
                $.each(src, function () {
                    $.cacheImage(String(this), options);
                });
                return;
            }
            var image = new Image();
            options = options || {};
            $.each(["load", "error", "abort"], function () {
                var e = String(this);
                if (typeof options[e] === "function") {
                    $(image).bind(e, options[e]);
                }
                if (typeof options.complete === "function") {
                    $(image).bind(e, options.complete);
                }
            });
            image.src = src;
            return image;
        },
    });
    $.extend($.fn, {
        cacheImage: function (options) {
            return this.each(function () {
                $.cacheImage(this.src, options);
            });
        },
    });
})(jQuery);
$.fn.redraw = function () {
    $(this).each(function () {
        var redraw = this.offsetHeight;
    });
};
!(function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? (module.exports = a) : a(jQuery);
})(function (a) {
    function b(b) {
        var g = b || window.event,
            h = i.call(arguments, 1),
            j = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0;
        if (
            ((b = a.event.fix(g)),
                (b.type = "mousewheel"),
                "detail" in g && (m = -1 * g.detail),
                "wheelDelta" in g && (m = g.wheelDelta),
                "wheelDeltaY" in g && (m = g.wheelDeltaY),
                "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX),
                "axis" in g && g.axis === g.HORIZONTAL_AXIS && ((l = -1 * m), (m = 0)),
                (j = 0 === m ? l : m),
                "deltaY" in g && ((m = -1 * g.deltaY), (j = m)),
                "deltaX" in g && ((l = g.deltaX), 0 === m && (j = -1 * l)),
                0 !== m || 0 !== l)
        ) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                (j *= q), (m *= q), (l *= q);
            } else {
                if (2 === g.deltaMode) {
                    var r = a.data(this, "mousewheel-page-height");
                    (j *= r), (m *= r), (l *= r);
                }
            }
            if (
                ((n = Math.max(Math.abs(m), Math.abs(l))),
                    (!f || f > n) && ((f = n), d(g, n) && (f /= 40)),
                    d(g, n) && ((j /= 40), (l /= 40), (m /= 40)),
                    (j = Math[j >= 1 ? "floor" : "ceil"](j / f)),
                    (l = Math[l >= 1 ? "floor" : "ceil"](l / f)),
                    (m = Math[m >= 1 ? "floor" : "ceil"](m / f)),
                    k.settings.normalizeOffset && this.getBoundingClientRect)
            ) {
                var s = this.getBoundingClientRect();
                (o = b.clientX - s.left), (p = b.clientY - s.top);
            }
            return (
                (b.deltaX = l),
                (b.deltaY = m),
                (b.deltaFactor = f),
                (b.offsetX = o),
                (b.offsetY = p),
                (b.deltaMode = 0),
                h.unshift(b, j, l, m),
                e && clearTimeout(e),
                (e = setTimeout(c, 200)),
                (a.event.dispatch || a.event.handle).apply(this, h)
            );
        }
    }
    function c() {
        f = null;
    }
    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0;
    }
    var e,
        f,
        g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        i = Array.prototype.slice;
    if (a.event.fixHooks) {
        for (var j = g.length; j;) {
            a.event.fixHooks[g[--j]] = a.event.mouseHooks;
        }
    }
    var k = (a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function () {
            if (this.addEventListener) {
                for (var c = h.length; c;) {
                    this.addEventListener(h[--c], b, !1);
                }
            } else {
                this.onmousewheel = b;
            }
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this));
        },
        teardown: function () {
            if (this.removeEventListener) {
                for (var c = h.length; c;) {
                    this.removeEventListener(h[--c], b, !1);
                }
            } else {
                this.onmousewheel = null;
            }
            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height");
        },
        getLineHeight: function (b) {
            var c = a(b),
                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16;
        },
        getPageHeight: function (b) {
            return a(b).height();
        },
        settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
    });
    a.fn.extend({
        mousewheel: function (a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
        },
        unmousewheel: function (a) {
            return this.unbind("mousewheel", a);
        },
    });
});
$.fn.removeClassByPrefix = function (prefix) {
    this.each(function (i, el) {
        var classes = el.className.split(" ").filter(function (c) {
            return c.lastIndexOf(prefix, 0) !== 0;
        });
        el.className = $.trim(classes.join(" "));
    });
    return this;
};
!(function ($, e) {
    var t = {};
    (t.eventName = "resizeEnd"),
        (t.delay = 250),
        (t.poll = function () {
            var n = $(this),
                a = n.data(t.eventName);
            a.timeoutId && window.clearTimeout(a.timeoutId),
                (a.timeoutId = window.setTimeout(function () {
                    n.trigger(t.eventName);
                }, t.delay));
        }),
        ($.event.special[t.eventName] = {
            setup: function () {
                var e = $(this);
                e.data(t.eventName, {}), e.on("resize", t.poll);
            },
            teardown: function () {
                var n = $(this),
                    a = n.data(t.eventName);
                a.timeoutId && window.clearTimeout(a.timeoutId), n.removeData(t.eventName), n.off("resize", t.poll);
            },
        }),
        ($.fn[t.eventName] = function (e, n) {
            return arguments.length > 0 ? this.on(t.eventName, null, e, n) : this.trigger(t.eventName);
        });
})(jQuery, this);
(function (a) {
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define(["jquery"], a);
    } else {
        a(jQuery);
    }
})(function (f) {
    var p = "left",
        o = "right",
        e = "up",
        x = "down",
        c = "in",
        z = "out",
        m = "none",
        s = "auto",
        l = "swipe",
        t = "pinch",
        A = "tap",
        j = "doubletap",
        b = "longtap",
        y = "hold",
        D = "horizontal",
        u = "vertical",
        i = "all",
        r = 10,
        g = "start",
        k = "move",
        h = "end",
        q = "cancel",
        a = "ontouchstart" in window,
        v = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
        d = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
        B = "TouchSwipe";
    var n = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,
        triggerOnTouchEnd: true,
        triggerOnTouchLeave: false,
        allowPageScroll: "auto",
        fallbackToMouseEvents: true,
        excludedElements: "label, button, input, select, textarea, a, .noSwipe",
    };
    f.fn.swipe = function (G) {
        var F = f(this),
            E = F.data(B);
        if (E && typeof G === "string") {
            if (E[G]) {
                return E[G].apply(this, Array.prototype.slice.call(arguments, 1));
            } else {
                f.error("Method " + G + " does not exist on jQuery.swipe");
            }
        } else {
            if (!E && (typeof G === "object" || !G)) {
                return w.apply(this, arguments);
            }
        }
        return F;
    };
    f.fn.swipe.defaults = n;
    f.fn.swipe.phases = { PHASE_START: g, PHASE_MOVE: k, PHASE_END: h, PHASE_CANCEL: q };
    f.fn.swipe.directions = { LEFT: p, RIGHT: o, UP: e, DOWN: x, IN: c, OUT: z };
    f.fn.swipe.pageScroll = { NONE: m, HORIZONTAL: D, VERTICAL: u, AUTO: s };
    f.fn.swipe.fingers = { ONE: 1, TWO: 2, THREE: 3, ALL: i };
    function w(E) {
        if (E && E.allowPageScroll === undefined && (E.swipe !== undefined || E.swipeStatus !== undefined)) {
            E.allowPageScroll = m;
        }
        if (E.click !== undefined && E.tap === undefined) {
            E.tap = E.click;
        }
        if (!E) {
            E = {};
        }
        E = f.extend({}, f.fn.swipe.defaults, E);
        return this.each(function () {
            var G = f(this);
            var F = G.data(B);
            if (!F) {
                F = new C(this, E);
                G.data(B, F);
            }
        });
    }
    function C(a4, av) {
        var az = a || d || !av.fallbackToMouseEvents,
            J = az ? (d ? (v ? "MSPointerDown" : "pointerdown") : "touchstart") : "mousedown",
            ay = az ? (d ? (v ? "MSPointerMove" : "pointermove") : "touchmove") : "mousemove",
            U = az ? (d ? (v ? "MSPointerUp" : "pointerup") : "touchend") : "mouseup",
            S = az ? null : "mouseleave",
            aD = d ? (v ? "MSPointerCancel" : "pointercancel") : "touchcancel";
        var ag = 0,
            aP = null,
            ab = 0,
            a1 = 0,
            aZ = 0,
            G = 1,
            aq = 0,
            aJ = 0,
            M = null;
        var aR = f(a4);
        var Z = "start";
        var W = 0;
        var aQ = null;
        var T = 0,
            a2 = 0,
            a5 = 0,
            ad = 0,
            N = 0;
        var aW = null,
            af = null;
        try {
            aR.bind(J, aN);
            aR.bind(aD, a9);
        } catch (ak) {
            f.error("events not supported " + J + "," + aD + " on jQuery.swipe");
        }
        this.enable = function () {
            aR.bind(J, aN);
            aR.bind(aD, a9);
            return aR;
        };
        this.disable = function () {
            aK();
            return aR;
        };
        this.destroy = function () {
            aK();
            aR.data(B, null);
            return aR;
        };
        this.option = function (bc, bb) {
            if (av[bc] !== undefined) {
                if (bb === undefined) {
                    return av[bc];
                } else {
                    av[bc] = bb;
                }
            } else {
                f.error("Option " + bc + " does not exist on jQuery.swipe.options");
            }
            return null;
        };
        function aN(bd) {
            if (aB()) {
                return;
            }
            if (f(bd.target).closest(av.excludedElements, aR).length > 0) {
                return;
            }
            var be = bd.originalEvent ? bd.originalEvent : bd;
            var bc,
                bb = a ? be.touches[0] : be;
            Z = g;
            if (a) {
                W = be.touches.length;
            } else {
                bd.preventDefault();
            }
            ag = 0;
            aP = null;
            aJ = null;
            ab = 0;
            a1 = 0;
            aZ = 0;
            G = 1;
            aq = 0;
            aQ = aj();
            M = aa();
            R();
            if (!a || W === av.fingers || av.fingers === i || aX()) {
                ai(0, bb);
                T = at();
                if (W == 2) {
                    ai(1, be.touches[1]);
                    a1 = aZ = au(aQ[0].start, aQ[1].start);
                }
                if (av.swipeStatus || av.pinchStatus) {
                    bc = O(be, Z);
                }
            } else {
                bc = false;
            }
            if (bc === false) {
                Z = q;
                O(be, Z);
                return bc;
            } else {
                if (av.hold) {
                    af = setTimeout(
                        f.proxy(function () {
                            aR.trigger("hold", [be.target]);
                            if (av.hold) {
                                bc = av.hold.call(aR, be, be.target);
                            }
                        }, this),
                        av.longTapThreshold
                    );
                }
                ao(true);
            }
            return null;
        }
        function a3(be) {
            var bh = be.originalEvent ? be.originalEvent : be;
            if (Z === h || Z === q || am()) {
                return;
            }
            var bd,
                bc = a ? bh.touches[0] : bh;
            var bf = aH(bc);
            a2 = at();
            if (a) {
                W = bh.touches.length;
            }
            if (av.hold) {
                clearTimeout(af);
            }
            Z = k;
            if (W == 2) {
                if (a1 == 0) {
                    ai(1, bh.touches[1]);
                    a1 = aZ = au(aQ[0].start, aQ[1].start);
                } else {
                    aH(bh.touches[1]);
                    aZ = au(aQ[0].end, aQ[1].end);
                    aJ = ar(aQ[0].end, aQ[1].end);
                }
                G = a7(a1, aZ);
                aq = Math.abs(a1 - aZ);
            }
            if (W === av.fingers || av.fingers === i || !a || aX()) {
                aP = aL(bf.start, bf.end);
                al(be, aP);
                ag = aS(bf.start, bf.end);
                ab = aM();
                aI(aP, ag);
                if (av.swipeStatus || av.pinchStatus) {
                    bd = O(bh, Z);
                }
                if (!av.triggerOnTouchEnd || av.triggerOnTouchLeave) {
                    var bb = true;
                    if (av.triggerOnTouchLeave) {
                        var bg = aY(this);
                        bb = E(bf.end, bg);
                    }
                    if (!av.triggerOnTouchEnd && bb) {
                        Z = aC(k);
                    } else {
                        if (av.triggerOnTouchLeave && !bb) {
                            Z = aC(h);
                        }
                    }
                    if (Z == q || Z == h) {
                        O(bh, Z);
                    }
                }
            } else {
                Z = q;
                O(bh, Z);
            }
            if (bd === false) {
                Z = q;
                O(bh, Z);
            }
        }
        function L(bb) {
            var bc = bb.originalEvent;
            if (a) {
                if (bc.touches.length > 0) {
                    F();
                    return true;
                }
            }
            if (am()) {
                W = ad;
            }
            a2 = at();
            ab = aM();
            if (ba() || !an()) {
                Z = q;
                O(bc, Z);
            } else {
                if (av.triggerOnTouchEnd || (av.triggerOnTouchEnd == false && Z === k)) {
                    bb.preventDefault();
                    Z = h;
                    O(bc, Z);
                } else {
                    if (!av.triggerOnTouchEnd && a6()) {
                        Z = h;
                        aF(bc, Z, A);
                    } else {
                        if (Z === k) {
                            Z = q;
                            O(bc, Z);
                        }
                    }
                }
            }
            ao(false);
            return null;
        }
        function a9() {
            W = 0;
            a2 = 0;
            T = 0;
            a1 = 0;
            aZ = 0;
            G = 1;
            R();
            ao(false);
        }
        function K(bb) {
            var bc = bb.originalEvent;
            if (av.triggerOnTouchLeave) {
                Z = aC(h);
                O(bc, Z);
            }
        }
        function aK() {
            aR.unbind(J, aN);
            aR.unbind(aD, a9);
            aR.unbind(ay, a3);
            aR.unbind(U, L);
            if (S) {
                aR.unbind(S, K);
            }
            ao(false);
        }
        function aC(bf) {
            var be = bf;
            var bd = aA();
            var bc = an();
            var bb = ba();
            if (!bd || bb) {
                be = q;
            } else {
                if (bc && bf == k && (!av.triggerOnTouchEnd || av.triggerOnTouchLeave)) {
                    be = h;
                } else {
                    if (!bc && bf == h && av.triggerOnTouchLeave) {
                        be = q;
                    }
                }
            }
            return be;
        }
        function O(bd, bb) {
            var bc = undefined;
            if (I() || V()) {
                bc = aF(bd, bb, l);
            } else {
                if ((P() || aX()) && bc !== false) {
                    bc = aF(bd, bb, t);
                }
            }
            if (aG() && bc !== false) {
                bc = aF(bd, bb, j);
            } else {
                if (ap() && bc !== false) {
                    bc = aF(bd, bb, b);
                } else {
                    if (ah() && bc !== false) {
                        bc = aF(bd, bb, A);
                    }
                }
            }
            if (bb === q) {
                a9(bd);
            }
            if (bb === h) {
                if (a) {
                    if (bd.touches.length == 0) {
                        a9(bd);
                    }
                } else {
                    a9(bd);
                }
            }
            return bc;
        }
        function aF(be, bb, bd) {
            var bc = undefined;
            if (bd == l) {
                aR.trigger("swipeStatus", [bb, aP || null, ag || 0, ab || 0, W, aQ]);
                if (av.swipeStatus) {
                    bc = av.swipeStatus.call(aR, be, bb, aP || null, ag || 0, ab || 0, W, aQ);
                    if (bc === false) {
                        return false;
                    }
                }
                if (bb == h && aV()) {
                    aR.trigger("swipe", [aP, ag, ab, W, aQ]);
                    if (av.swipe) {
                        bc = av.swipe.call(aR, be, aP, ag, ab, W, aQ);
                        if (bc === false) {
                            return false;
                        }
                    }
                    switch (aP) {
                        case p:
                            aR.trigger("swipeLeft", [aP, ag, ab, W, aQ]);
                            if (av.swipeLeft) {
                                bc = av.swipeLeft.call(aR, be, aP, ag, ab, W, aQ);
                            }
                            break;
                        case o:
                            aR.trigger("swipeRight", [aP, ag, ab, W, aQ]);
                            if (av.swipeRight) {
                                bc = av.swipeRight.call(aR, be, aP, ag, ab, W, aQ);
                            }
                            break;
                        case e:
                            aR.trigger("swipeUp", [aP, ag, ab, W, aQ]);
                            if (av.swipeUp) {
                                bc = av.swipeUp.call(aR, be, aP, ag, ab, W, aQ);
                            }
                            break;
                        case x:
                            aR.trigger("swipeDown", [aP, ag, ab, W, aQ]);
                            if (av.swipeDown) {
                                bc = av.swipeDown.call(aR, be, aP, ag, ab, W, aQ);
                            }
                            break;
                    }
                }
            }
            if (bd == t) {
                aR.trigger("pinchStatus", [bb, aJ || null, aq || 0, ab || 0, W, G, aQ]);
                if (av.pinchStatus) {
                    bc = av.pinchStatus.call(aR, be, bb, aJ || null, aq || 0, ab || 0, W, G, aQ);
                    if (bc === false) {
                        return false;
                    }
                }
                if (bb == h && a8()) {
                    switch (aJ) {
                        case c:
                            aR.trigger("pinchIn", [aJ || null, aq || 0, ab || 0, W, G, aQ]);
                            if (av.pinchIn) {
                                bc = av.pinchIn.call(aR, be, aJ || null, aq || 0, ab || 0, W, G, aQ);
                            }
                            break;
                        case z:
                            aR.trigger("pinchOut", [aJ || null, aq || 0, ab || 0, W, G, aQ]);
                            if (av.pinchOut) {
                                bc = av.pinchOut.call(aR, be, aJ || null, aq || 0, ab || 0, W, G, aQ);
                            }
                            break;
                    }
                }
            }
            if (bd == A) {
                if (bb === q || bb === h) {
                    clearTimeout(aW);
                    clearTimeout(af);
                    if (Y() && !H()) {
                        N = at();
                        aW = setTimeout(
                            f.proxy(function () {
                                N = null;
                                aR.trigger("tap", [be.target]);
                                if (av.tap) {
                                    bc = av.tap.call(aR, be, be.target);
                                }
                            }, this),
                            av.doubleTapThreshold
                        );
                    } else {
                        N = null;
                        aR.trigger("tap", [be.target]);
                        if (av.tap) {
                            bc = av.tap.call(aR, be, be.target);
                        }
                    }
                }
            } else {
                if (bd == j) {
                    if (bb === q || bb === h) {
                        clearTimeout(aW);
                        N = null;
                        aR.trigger("doubletap", [be.target]);
                        if (av.doubleTap) {
                            bc = av.doubleTap.call(aR, be, be.target);
                        }
                    }
                } else {
                    if (bd == b) {
                        if (bb === q || bb === h) {
                            clearTimeout(aW);
                            N = null;
                            aR.trigger("longtap", [be.target]);
                            if (av.longTap) {
                                bc = av.longTap.call(aR, be, be.target);
                            }
                        }
                    }
                }
            }
            return bc;
        }
        function an() {
            var bb = true;
            if (av.threshold !== null) {
                bb = ag >= av.threshold;
            }
            return bb;
        }
        function ba() {
            var bb = false;
            if (av.cancelThreshold !== null && aP !== null) {
                bb = aT(aP) - ag >= av.cancelThreshold;
            }
            return bb;
        }
        function ae() {
            if (av.pinchThreshold !== null) {
                return aq >= av.pinchThreshold;
            }
            return true;
        }
        function aA() {
            var bb;
            if (av.maxTimeThreshold) {
                if (ab >= av.maxTimeThreshold) {
                    bb = false;
                } else {
                    bb = true;
                }
            } else {
                bb = true;
            }
            return bb;
        }
        function al(bb, bc) {
            if (av.allowPageScroll === m || aX()) {
                bb.preventDefault();
            } else {
                var bd = av.allowPageScroll === s;
                switch (bc) {
                    case p:
                        if ((av.swipeLeft && bd) || (!bd && av.allowPageScroll != D)) {
                            bb.preventDefault();
                        }
                        break;
                    case o:
                        if ((av.swipeRight && bd) || (!bd && av.allowPageScroll != D)) {
                            bb.preventDefault();
                        }
                        break;
                    case e:
                        if ((av.swipeUp && bd) || (!bd && av.allowPageScroll != u)) {
                            bb.preventDefault();
                        }
                        break;
                    case x:
                        if ((av.swipeDown && bd) || (!bd && av.allowPageScroll != u)) {
                            bb.preventDefault();
                        }
                        break;
                }
            }
        }
        function a8() {
            var bc = aO();
            var bb = X();
            var bd = ae();
            return bc && bb && bd;
        }
        function aX() {
            return !!(av.pinchStatus || av.pinchIn || av.pinchOut);
        }
        function P() {
            return !!(a8() && aX());
        }
        function aV() {
            var be = aA();
            var bg = an();
            var bd = aO();
            var bb = X();
            var bc = ba();
            var bf = !bc && bb && bd && bg && be;
            return bf;
        }
        function V() {
            return !!(av.swipe || av.swipeStatus || av.swipeLeft || av.swipeRight || av.swipeUp || av.swipeDown);
        }
        function I() {
            return !!(aV() && V());
        }
        function aO() {
            return W === av.fingers || av.fingers === i || !a;
        }
        function X() {
            return aQ[0].end.x !== 0;
        }
        function a6() {
            return !!av.tap;
        }
        function Y() {
            return !!av.doubleTap;
        }
        function aU() {
            return !!av.longTap;
        }
        function Q() {
            if (N == null) {
                return false;
            }
            var bb = at();
            return Y() && bb - N <= av.doubleTapThreshold;
        }
        function H() {
            return Q();
        }
        function ax() {
            return (W === 1 || !a) && (isNaN(ag) || ag < av.threshold);
        }
        function a0() {
            return ab > av.longTapThreshold && ag < r;
        }
        function ah() {
            return !!(ax() && a6());
        }
        function aG() {
            return !!(Q() && Y());
        }
        function ap() {
            return !!(a0() && aU());
        }
        function F() {
            a5 = at();
            ad = event.touches.length + 1;
        }
        function R() {
            a5 = 0;
            ad = 0;
        }
        function am() {
            var bb = false;
            if (a5) {
                var bc = at() - a5;
                if (bc <= av.fingerReleaseThreshold) {
                    bb = true;
                }
            }
            return bb;
        }
        function aB() {
            return !!(aR.data(B + "_intouch") === true);
        }
        function ao(bb) {
            if (bb === true) {
                aR.bind(ay, a3);
                aR.bind(U, L);
                if (S) {
                    aR.bind(S, K);
                }
            } else {
                aR.unbind(ay, a3, false);
                aR.unbind(U, L, false);
                if (S) {
                    aR.unbind(S, K, false);
                }
            }
            aR.data(B + "_intouch", bb === true);
        }
        function ai(bc, bb) {
            var bd = bb.identifier !== undefined ? bb.identifier : 0;
            aQ[bc].identifier = bd;
            aQ[bc].start.x = aQ[bc].end.x = bb.pageX || bb.clientX;
            aQ[bc].start.y = aQ[bc].end.y = bb.pageY || bb.clientY;
            return aQ[bc];
        }
        function aH(bb) {
            var bd = bb.identifier !== undefined ? bb.identifier : 0;
            var bc = ac(bd);
            bc.end.x = bb.pageX || bb.clientX;
            bc.end.y = bb.pageY || bb.clientY;
            return bc;
        }
        function ac(bc) {
            for (var bb = 0; bb < aQ.length; bb++) {
                if (aQ[bb].identifier == bc) {
                    return aQ[bb];
                }
            }
        }
        function aj() {
            var bb = [];
            for (var bc = 0; bc <= 5; bc++) {
                bb.push({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, identifier: 0 });
            }
            return bb;
        }
        function aI(bb, bc) {
            bc = Math.max(bc, aT(bb));
            M[bb].distance = bc;
        }
        function aT(bb) {
            if (M[bb]) {
                return M[bb].distance;
            }
            return undefined;
        }
        function aa() {
            var bb = {};
            bb[p] = aw(p);
            bb[o] = aw(o);
            bb[e] = aw(e);
            bb[x] = aw(x);
            return bb;
        }
        function aw(bb) {
            return { direction: bb, distance: 0 };
        }
        function aM() {
            return a2 - T;
        }
        function au(be, bd) {
            var bc = Math.abs(be.x - bd.x);
            var bb = Math.abs(be.y - bd.y);
            return Math.round(Math.sqrt(bc * bc + bb * bb));
        }
        function a7(bb, bc) {
            var bd = (bc / bb) * 1;
            return bd.toFixed(2);
        }
        function ar() {
            if (G < 1) {
                return z;
            } else {
                return c;
            }
        }
        function aS(bc, bb) {
            return Math.round(Math.sqrt(Math.pow(bb.x - bc.x, 2) + Math.pow(bb.y - bc.y, 2)));
        }
        function aE(be, bc) {
            var bb = be.x - bc.x;
            var bg = bc.y - be.y;
            var bd = Math.atan2(bg, bb);
            var bf = Math.round((bd * 180) / Math.PI);
            if (bf < 0) {
                bf = 360 - Math.abs(bf);
            }
            return bf;
        }
        function aL(bc, bb) {
            var bd = aE(bc, bb);
            if (bd <= 45 && bd >= 0) {
                return p;
            } else {
                if (bd <= 360 && bd >= 315) {
                    return p;
                } else {
                    if (bd >= 135 && bd <= 225) {
                        return o;
                    } else {
                        if (bd > 45 && bd < 135) {
                            return x;
                        } else {
                            return e;
                        }
                    }
                }
            }
        }
        function at() {
            var bb = new Date();
            return bb.getTime();
        }
        function aY(bb) {
            bb = f(bb);
            var bd = bb.offset();
            var bc = { left: bd.left, right: bd.left + bb.outerWidth(), top: bd.top, bottom: bd.top + bb.outerHeight() };
            return bc;
        }
        function E(bb, bc) {
            return bb.x > bc.left && bb.x < bc.right && bb.y > bc.top && bb.y < bc.bottom;
        }
    }
});
/*! Sharrre.com -  beta 1.3.5 by Julien Hany License: MIT http://en.wikipedia.org/wiki/MIT_License or GPLv2 http://en.wikipedia.org/wiki/GNU_General_Public_License */
(function (g, i, j, b) {
    var h = "sharrre",
        f = {
            className: "sharrre",
            share: { googlePlus: false, facebook: false, twitter: false, digg: false, delicious: false, stumbleupon: false, linkedin: false, pinterest: false },
            shareTotal: 0,
            template: "",
            title: "",
            url: j.location.href,
            text: j.title,
            urlCurl: "sharrre.php",
            count: {},
            total: 0,
            shorterTotal: true,
            enableHover: true,
            enableCounter: true,
            enableTracking: false,
            hover: function () { },
            hide: function () { },
            click: function () { },
            render: function () { },
            buttons: {
                googlePlus: { url: "", urlCount: false, size: "medium", lang: "en-US", annotation: "" },
                facebook: { url: "", urlCount: false, action: "like", layout: "button_count", width: "", send: "false", faces: "false", colorscheme: "", font: "", lang: "en_US" },
                twitter: { url: "", urlCount: false, count: "horizontal", hashtags: "", via: "", related: "", lang: "en" },
                digg: { url: "", urlCount: false, type: "DiggCompact" },
                delicious: { url: "", urlCount: false, size: "medium" },
                stumbleupon: { url: "", urlCount: false, layout: "1" },
                linkedin: { url: "", urlCount: false, counter: "" },
                pinterest: { url: "", media: "", description: "", layout: "horizontal" },
            },
        },
        c = {
            googlePlus: "",
            facebook:
                "https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27{url}%27&callback=?",
            twitter: "http://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",
            digg: "http://services.digg.com/2.0/story.getInfo?links={url}&type=javascript&callback=?",
            delicious: "http://feeds.delicious.com/v2/json/urlinfo/data?url={url}&callback=?",
            stumbleupon: "",
            linkedin: "http://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",
            pinterest: "http://api.pinterest.com/v1/urls/count.json?url={url}&callback=?",
        },
        l = {
            googlePlus: function (m) {
                var n = m.options.buttons.googlePlus;
                g(m.element)
                    .find(".buttons")
                    .append('<div class="button googleplus"><div class="g-plusone" data-size="' + n.size + '" data-href="' + (n.url !== "" ? n.url : m.options.url) + '" data-annotation="' + n.annotation + '"></div></div>');
                i.___gcfg = { lang: m.options.buttons.googlePlus.lang };
                var o = 0;
                if (typeof gapi === "undefined" && o == 0) {
                    o = 1;
                    (function () {
                        var p = j.createElement("script");
                        p.type = "text/javascript";
                        p.async = true;
                        p.src = "//apis.google.com/js/plusone.js";
                        var q = j.getElementsByTagName("script")[0];
                        q.parentNode.insertBefore(p, q);
                    })();
                } else {
                    gapi.plusone.go();
                }
            },
            facebook: function (m) {
                var n = m.options.buttons.facebook;
                g(m.element)
                    .find(".buttons")
                    .append(
                        '<div class="button facebook"><div id="fb-root"></div><div class="fb-like" data-href="' +
                        (n.url !== "" ? n.url : m.options.url) +
                        '" data-send="' +
                        n.send +
                        '" data-layout="' +
                        n.layout +
                        '" data-width="' +
                        n.width +
                        '" data-show-faces="' +
                        n.faces +
                        '" data-action="' +
                        n.action +
                        '" data-colorscheme="' +
                        n.colorscheme +
                        '" data-font="' +
                        n.font +
                        '" data-via="' +
                        n.via +
                        '"></div></div>'
                    );
                var o = 0;
                if (typeof FB === "undefined" && o == 0) {
                    o = 1;
                    (function (t, p, u) {
                        var r,
                            q = t.getElementsByTagName(p)[0];
                        if (t.getElementById(u)) {
                            return;
                        }
                        r = t.createElement(p);
                        r.id = u;
                        r.src = "//connect.facebook.net/" + n.lang + "/all.js#xfbml=1";
                        q.parentNode.insertBefore(r, q);
                    })(j, "script", "facebook-jssdk");
                } else {
                    FB.XFBML.parse();
                }
            },
            twitter: function (m) {
                var n = m.options.buttons.twitter;
                g(m.element)
                    .find(".buttons")
                    .append(
                        '<div class="button twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="' +
                        (n.url !== "" ? n.url : m.options.url) +
                        '" data-count="' +
                        n.count +
                        '" data-text="' +
                        m.options.text +
                        '" data-via="' +
                        n.via +
                        '" data-hashtags="' +
                        n.hashtags +
                        '" data-related="' +
                        n.related +
                        '" data-lang="' +
                        n.lang +
                        '">Tweet</a></div>'
                    );
                var o = 0;
                if (typeof twttr === "undefined" && o == 0) {
                    o = 1;
                    (function () {
                        var q = j.createElement("script");
                        q.type = "text/javascript";
                        q.async = true;
                        q.src = "//platform.twitter.com/widgets.js";
                        var p = j.getElementsByTagName("script")[0];
                        p.parentNode.insertBefore(q, p);
                    })();
                } else {
                    g.ajax({ url: "//platform.twitter.com/widgets.js", dataType: "script", cache: true });
                }
            },
            digg: function (m) {
                var n = m.options.buttons.digg;
                g(m.element)
                    .find(".buttons")
                    .append('<div class="button digg"><a class="DiggThisButton ' + n.type + '" rel="nofollow external" href="http://digg.com/submit?url=' + encodeURIComponent(n.url !== "" ? n.url : m.options.url) + '"></a></div>');
                var o = 0;
                if (typeof __DBW === "undefined" && o == 0) {
                    o = 1;
                    (function () {
                        var q = j.createElement("SCRIPT"),
                            p = j.getElementsByTagName("SCRIPT")[0];
                        q.type = "text/javascript";
                        q.async = true;
                        q.src = "//widgets.digg.com/buttons.js";
                        p.parentNode.insertBefore(q, p);
                    })();
                }
            },
            delicious: function (o) {
                if (o.options.buttons.delicious.size == "tall") {
                    var p = "width:50px;",
                        n = "height:35px;width:50px;font-size:15px;line-height:35px;",
                        m = "height:18px;line-height:18px;margin-top:3px;";
                } else {
                    var p = "width:93px;",
                        n = "float:right;padding:0 3px;height:20px;width:26px;line-height:20px;",
                        m = "float:left;height:20px;line-height:20px;";
                }
                var q = o.shorterTotal(o.options.count.delicious);
                if (typeof q === "undefined") {
                    q = 0;
                }
                g(o.element)
                    .find(".buttons")
                    .append(
                        '<div class="button delicious"><div style="' +
                        p +
                        'font:12px Arial,Helvetica,sans-serif;cursor:pointer;color:#666666;display:inline-block;float:none;height:20px;line-height:normal;margin:0;padding:0;text-indent:0;vertical-align:baseline;"><div style="' +
                        n +
                        'background-color:#fff;margin-bottom:5px;overflow:hidden;text-align:center;border:1px solid #ccc;border-radius:3px;">' +
                        q +
                        '</div><div style="' +
                        m +
                        'display:block;padding:0;text-align:center;text-decoration:none;width:50px;background-color:#7EACEE;border:1px solid #40679C;border-radius:3px;color:#fff;"><img src="http://www.delicious.com/static/img/delicious.small.gif" height="10" width="10" alt="Delicious" /> Add</div></div></div>'
                    );
                g(o.element)
                    .find(".delicious")
                    .on("click", function () {
                        o.openPopup("delicious");
                    });
            },
            stumbleupon: function (m) {
                var n = m.options.buttons.stumbleupon;
                g(m.element)
                    .find(".buttons")
                    .append('<div class="button stumbleupon"><su:badge layout="' + n.layout + '" location="' + (n.url !== "" ? n.url : m.options.url) + '"></su:badge></div>');
                var o = 0;
                if (typeof STMBLPN === "undefined" && o == 0) {
                    o = 1;
                    (function () {
                        var p = j.createElement("script");
                        p.type = "text/javascript";
                        p.async = true;
                        p.src = "//platform.stumbleupon.com/1/widgets.js";
                        var q = j.getElementsByTagName("script")[0];
                        q.parentNode.insertBefore(p, q);
                    })();
                    s = i.setTimeout(function () {
                        if (typeof STMBLPN !== "undefined") {
                            STMBLPN.processWidgets();
                            clearInterval(s);
                        }
                    }, 500);
                } else {
                    STMBLPN.processWidgets();
                }
            },
            linkedin: function (m) {
                var n = m.options.buttons.linkedin;
                g(m.element)
                    .find(".buttons")
                    .append('<div class="button linkedin"><script type="in/share" data-url="' + (n.url !== "" ? n.url : m.options.url) + '" data-counter="' + n.counter + '"></script></div>');
                var o = 0;
                if (typeof i.IN === "undefined" && o == 0) {
                    o = 1;
                    (function () {
                        var p = j.createElement("script");
                        p.type = "text/javascript";
                        p.async = true;
                        p.src = "//platform.linkedin.com/in.js";
                        var q = j.getElementsByTagName("script")[0];
                        q.parentNode.insertBefore(p, q);
                    })();
                } else {
                    i.IN.init();
                }
            },
            pinterest: function (m) {
                var n = m.options.buttons.pinterest;
                g(m.element)
                    .find(".buttons")
                    .append(
                        '<div class="button pinterest"><a href="http://pinterest.com/pin/create/button/?url=' +
                        (n.url !== "" ? n.url : m.options.url) +
                        "&media=" +
                        n.media +
                        "&description=" +
                        n.description +
                        '" class="pin-it-button" count-layout="' +
                        n.layout +
                        '">Pin It</a></div>'
                    );
                (function () {
                    var o = j.createElement("script");
                    o.type = "text/javascript";
                    o.async = true;
                    o.src = "//assets.pinterest.com/js/pinit.js";
                    var p = j.getElementsByTagName("script")[0];
                    p.parentNode.insertBefore(o, p);
                })();
            },
        },
        d = {
            googlePlus: function () { },
            facebook: function () {
                fb = i.setInterval(function () {
                    if (typeof FB !== "undefined") {
                        FB.Event.subscribe("edge.create", function (m) {
                            _gaq.push(["_trackSocial", "facebook", "like", m]);
                        });
                        FB.Event.subscribe("edge.remove", function (m) {
                            _gaq.push(["_trackSocial", "facebook", "unlike", m]);
                        });
                        FB.Event.subscribe("message.send", function (m) {
                            _gaq.push(["_trackSocial", "facebook", "send", m]);
                        });
                        clearInterval(fb);
                    }
                }, 1000);
            },
            twitter: function () {
                tw = i.setInterval(function () {
                    if (typeof twttr !== "undefined") {
                        twttr.events.bind("tweet", function (m) {
                            if (m) {
                                _gaq.push(["_trackSocial", "twitter", "tweet"]);
                            }
                        });
                        clearInterval(tw);
                    }
                }, 1000);
            },
            digg: function () { },
            delicious: function () { },
            stumbleupon: function () { },
            linkedin: function () {
                function m() {
                    _gaq.push(["_trackSocial", "linkedin", "share"]);
                }
            },
            pinterest: function () { },
        },
        a = {
            googlePlus: function (m) {
                i.open("https://plus.google.com/share?hl=" + m.buttons.googlePlus.lang + "&url=" + encodeURIComponent(m.buttons.googlePlus.url !== "" ? m.buttons.googlePlus.url : m.url), "", "toolbar=0, status=0, width=900, height=500");
            },
            facebook: function (m) {
                i.open("http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(m.buttons.facebook.url !== "" ? m.buttons.facebook.url : m.url) + "&t=" + m.text + "", "", "toolbar=0, status=0, width=900, height=500");
            },
            twitter: function (m) {
                i.open(
                    "https://twitter.com/intent/tweet?text=" +
                    encodeURIComponent(m.text) +
                    "&url=" +
                    encodeURIComponent(m.buttons.twitter.url !== "" ? m.buttons.twitter.url : m.url) +
                    (m.buttons.twitter.via !== "" ? "&via=" + m.buttons.twitter.via : ""),
                    "",
                    "toolbar=0, status=0, width=650, height=360"
                );
            },
            digg: function (m) {
                i.open(
                    "http://digg.com/tools/diggthis/submit?url=" + encodeURIComponent(m.buttons.digg.url !== "" ? m.buttons.digg.url : m.url) + "&title=" + m.text + "&related=true&style=true",
                    "",
                    "toolbar=0, status=0, width=650, height=360"
                );
            },
            delicious: function (m) {
                i.open("http://www.delicious.com/save?v=5&noui&jump=close&url=" + encodeURIComponent(m.buttons.delicious.url !== "" ? m.buttons.delicious.url : m.url) + "&title=" + m.text, "delicious", "toolbar=no,width=550,height=550");
            },
            stumbleupon: function (m) {
                i.open("http://www.stumbleupon.com/badge/?url=" + encodeURIComponent(m.buttons.delicious.url !== "" ? m.buttons.delicious.url : m.url), "stumbleupon", "toolbar=no,width=550,height=550");
            },
            linkedin: function (m) {
                i.open("https://www.linkedin.com/cws/share?url=" + encodeURIComponent(m.buttons.delicious.url !== "" ? m.buttons.delicious.url : m.url) + "&token=&isFramed=true", "linkedin", "toolbar=no,width=550,height=550");
            },
            pinterest: function (m) {
                i.open(
                    "http://pinterest.com/pin/create/button/?url=" +
                    encodeURIComponent(m.buttons.pinterest.url !== "" ? m.buttons.pinterest.url : m.url) +
                    "&media=" +
                    encodeURIComponent(m.buttons.pinterest.media) +
                    "&description=" +
                    m.buttons.pinterest.description,
                    "pinterest",
                    "toolbar=no,width=700,height=300"
                );
            },
        };
    function k(n, m) {
        this.element = n;
        this.options = g.extend(true, {}, f, m);
        this.options.share = m.share;
        this._defaults = f;
        this._name = h;
        this.init();
    }
    k.prototype.init = function () {
        var m = this;
        if (this.options.urlCurl !== "") {
            c.googlePlus = this.options.urlCurl + "?url={url}&type=googlePlus";
            c.stumbleupon = this.options.urlCurl + "?url={url}&type=stumbleupon";
        }
        g(this.element).addClass(this.options.className);
        if (typeof g(this.element).data("title") !== "undefined") {
            this.options.title = g(this.element).attr("data-title");
        }
        if (typeof g(this.element).data("url") !== "undefined") {
            this.options.url = g(this.element).data("url");
        }
        if (typeof g(this.element).data("text") !== "undefined") {
            this.options.text = g(this.element).data("text");
        }
        g.each(this.options.share, function (n, o) {
            if (o === true) {
                m.options.shareTotal++;
            }
        });
        if (m.options.enableCounter === true) {
            g.each(this.options.share, function (n, p) {
                if (p === true) {
                    try {
                        m.getSocialJson(n);
                    } catch (o) { }
                }
            });
        } else {
            if (m.options.template !== "") {
                this.options.render(this, this.options);
            } else {
                this.loadButtons();
            }
        }
        g(this.element).hover(
            function () {
                if (g(this).find(".buttons").length === 0 && m.options.enableHover === true) {
                    m.loadButtons();
                }
                m.options.hover(m, m.options);
            },
            function () {
                m.options.hide(m, m.options);
            }
        );
        g(this.element).click(function () {
            m.options.click(m, m.options);
            return false;
        });
    };
    k.prototype.loadButtons = function () {
        var m = this;
        g(this.element).append('<div class="buttons"></div>');
        g.each(m.options.share, function (n, o) {
            if (o == true) {
                l[n](m);
                if (m.options.enableTracking === true) {
                    d[n]();
                }
            }
        });
    };
    k.prototype.getSocialJson = function (o) {
        var m = this,
            p = 0,
            n = c[o].replace("{url}", encodeURIComponent(this.options.url));
        if (this.options.buttons[o].urlCount === true && this.options.buttons[o].url !== "") {
            n = c[o].replace("{url}", this.options.buttons[o].url);
        }
        if (n != "" && m.options.urlCurl !== "") {
            g.getJSON(n, function (r) {
                if (typeof r.count !== "undefined") {
                    var q = r.count + "";
                    q = q.replace("\u00c2\u00a0", "");
                    p += parseInt(q, 10);
                } else {
                    if (r.data && r.data.length > 0 && typeof r.data[0].total_count !== "undefined") {
                        p += parseInt(r.data[0].total_count, 10);
                    } else {
                        if (typeof r[0] !== "undefined") {
                            p += parseInt(r[0].total_posts, 10);
                        } else {
                            if (typeof r[0] !== "undefined") {
                            }
                        }
                    }
                }
                m.options.count[o] = p;
                m.options.total += p;
                m.renderer();
                m.rendererPerso();
            }).error(function () {
                m.options.count[o] = 0;
                m.rendererPerso();
            });
        } else {
            m.renderer();
            m.options.count[o] = 0;
            m.rendererPerso();
        }
    };
    k.prototype.rendererPerso = function () {
        var m = 0;
        for (e in this.options.count) {
            m++;
        }
        if (m === this.options.shareTotal) {
            this.options.render(this, this.options);
        }
    };
    k.prototype.renderer = function () {
        var n = this.options.total,
            m = this.options.template;
        if (this.options.shorterTotal === true) {
            n = this.shorterTotal(n);
        }
        if (m !== "") {
            m = m.replace("{total}", n);
            g(this.element).html(m);
        } else {
            g(this.element).html('<div class="box"><a class="count" href="#">' + n + "</a>" + (this.options.title !== "" ? '<a class="share" href="#">' + this.options.title + "</a>" : "") + "</div>");
        }
    };
    k.prototype.shorterTotal = function (m) {
        if (m >= 1000000) {
            m = (m / 1000000).toFixed(2) + "M";
        } else {
            if (m >= 1000) {
                m = (m / 1000).toFixed(1) + "k";
            }
        }
        return m;
    };
    k.prototype.openPopup = function (m) {
        a[m](this.options);
        if (this.options.enableTracking === true) {
            var n = {
                googlePlus: { site: "Google", action: "+1" },
                facebook: { site: "facebook", action: "like" },
                twitter: { site: "twitter", action: "tweet" },
                digg: { site: "digg", action: "add" },
                delicious: { site: "delicious", action: "add" },
                stumbleupon: { site: "stumbleupon", action: "add" },
                linkedin: { site: "linkedin", action: "share" },
                pinterest: { site: "pinterest", action: "pin" },
            };
            _gaq.push(["_trackSocial", n[m].site, n[m].action]);
        }
    };
    k.prototype.simulateClick = function () {
        var m = g(this.element).html();
        g(this.element).html(m.replace(this.options.total, this.options.total + 1));
    };
    k.prototype.update = function (m, n) {
        if (m !== "") {
            this.options.url = m;
        }
        if (n !== "") {
            this.options.text = n;
        }
    };
    g.fn[h] = function (n) {
        var m = arguments;
        if (n === b || typeof n === "object") {
            return this.each(function () {
                if (!g.data(this, "plugin_" + h)) {
                    g.data(this, "plugin_" + h, new k(this, n));
                }
            });
        } else {
            if (typeof n === "string" && n[0] !== "_" && n !== "init") {
                return this.each(function () {
                    var o = g.data(this, "plugin_" + h);
                    if (o instanceof k && typeof o[n] === "function") {
                        o[n].apply(o, Array.prototype.slice.call(m, 1));
                    }
                });
            }
        }
    };
})(jQuery, window, document);
$.fn.nextOrFirst = function (selector) {
    var next = this.next(selector);
    return next.length ? next : this.prevAll(selector).last();
};
$.fn.prevOrLast = function (selector) {
    var prev = this.prev(selector);
    return prev.length ? prev : this.nextAll(selector).last();
};
(function ($, e, b) {
    var c = "hashchange",
        h = document,
        f,
        g = $.event.special,
        i = h.documentMode,
        d = "on" + c in e && (i === b || i > 7);
    function a(j) {
        j = j || location.href;
        return "#" + j.replace(/^[^#]*#?(.*)$/, "$1");
    }
    $.fn[c] = function (j) {
        return j ? this.bind(c, j) : this.trigger(c);
    };
    $.fn[c].delay = 50;
    g[c] = $.extend(g[c], {
        setup: function () {
            if (d) {
                return false;
            }
            $(f.start);
        },
        teardown: function () {
            if (d) {
                return false;
            }
            $(f.stop);
        },
    });
    f = (function () {
        var j = {},
            p,
            m = a(),
            k = function (q) {
                return q;
            },
            l = k,
            o = k;
        j.start = function () {
            p || n();
        };
        j.stop = function () {
            p && clearTimeout(p);
            p = b;
        };
        function n() {
            var r = a(),
                q = o(m);
            if (r !== m) {
                l((m = r), q);
                $(e).trigger(c);
            } else {
                if (q !== m) {
                    location.href = location.href.replace(/#.*/, "") + q;
                }
            }
            p = setTimeout(n, $.fn[c].delay);
        }
        return j;
    })();
})(jQuery, this);
+(function () {
    var scrollHandlerFn;
    var clickHandlerFn;
    var keyHandlerFn;
    var touchStartFn;
    var touchMoveFn;
    var disposeFn;
    function offset(element) {
        var offset = { top: 0, left: 0 };
        if (!element.offsetParent) {
            return offset;
        }
        do {
            offset.left += element.offsetLeft;
            offset.top += element.offsetTop;
        } while ((element = element.offsetParent));
        return offset;
    }
    function ZoomService() {
        this._activeZoom = this._initialScrollPosition = this._initialTouchPosition = this._touchMoveListener = null;
        this._document = document;
        this._window = window;
        this._body = document.body;
    }
    ZoomService.prototype.listen = function () {
        document.body.addEventListener(
            "click",
            function (event) {
                if (event.target.getAttribute("data-action") === "zoom") {
                    this._zoom(event);
                }
            }.bind(this)
        );
    };
    ZoomService.prototype._zoom = function (e) {
        var target = e.target;
        if (!target || target.tagName != "IMG") {
            return;
        }
        if (this._body.classList.contains("zoom-overlay-open")) {
            return;
        }
        if (e.metaKey || e.ctrlKey) {
            return window.open(e.target.getAttribute("data-original") || e.target.currentSrc || e.target.src, "_blank");
        }
        this._activeZoomClose(true);
        this._activeZoom = new Zoom(target);
        this._activeZoom.zoomImage();
        scrollHandlerFn = this._scrollHandler.bind(this);
        clickHandlerFn = this._clickHandler.bind(this);
        keyHandlerFn = this._keyHandler.bind(this);
        touchStartFn = this._touchStart.bind(this);
        this._window.addEventListener("scroll", scrollHandlerFn);
        this._document.addEventListener("click", clickHandlerFn);
        this._document.addEventListener("keyup", keyHandlerFn);
        this._document.addEventListener("touchstart", touchStartFn);
        e.stopPropagation();
    };
    ZoomService.prototype._activeZoomClose = function (forceDispose) {
        if (!this._activeZoom) {
            return;
        }
        if (forceDispose) {
            this._activeZoom.dispose();
        } else {
            this._activeZoom.close();
        }
        this._window.removeEventListener("scroll", scrollHandlerFn);
        this._document.removeEventListener("click", clickHandlerFn);
        this._document.removeEventListener("keyup", keyHandlerFn);
        this._document.removeEventListener("touchstart", touchStartFn);
        this._activeZoom = null;
    };
    ZoomService.prototype._scrollHandler = function (e) {
        if (this._initialScrollPosition === null) {
            this._initialScrollPosition = window.scrollY;
        }
        var deltaY = this._initialScrollPosition - window.scrollY;
        if (Math.abs(deltaY) >= 40) {
            this._activeZoomClose();
        }
    };
    ZoomService.prototype._keyHandler = function (e) {
        if (e.keyCode == 27) {
            this._activeZoomClose();
        }
    };
    ZoomService.prototype._clickHandler = function (e) {
        e.stopPropagation();
        e.preventDefault();
        this._activeZoomClose();
    };
    ZoomService.prototype._touchStart = function (e) {
        this._initialTouchPosition = e.touches[0].pageY;
        touchMoveFn = this._touchMove.bind(this);
        e.target.addEventListener("touchmove", touchMoveFn);
    };
    ZoomService.prototype._touchMove = function (e) {
        if (Math.abs(e.touches[0].pageY - this._initialTouchPosition) > 10) {
            this._activeZoomClose();
            e.target.removeEventListener("touchmove", touchMoveFn);
        }
    };
    function Zoom(img) {
        this._fullHeight = this._fullWidth = this._overlay = this._targetImageWrap = null;
        this._targetImage = img;
        this._body = document.body;
    }
    Zoom.OFFSET = 80;
    Zoom._MAX_WIDTH = 2560;
    Zoom._MAX_HEIGHT = 4096;
    Zoom.prototype.zoomImage = function () {
        var img = document.createElement("img");
        img.onload = function () {
            this._fullHeight = Number(img.height);
            this._fullWidth = Number(img.width);
            this._zoomOriginal();
        }.bind(this);
        img.src = this._targetImage.currentSrc || this._targetImage.src;
    };
    Zoom.prototype._zoomOriginal = function () {
        this._targetImageWrap = document.createElement("div");
        this._targetImageWrap.className = "zoom-img-wrap";
        this._targetImageWrap.style.position = "absolute";
        this._targetImageWrap.style.top = offset(this._targetImage).top + "px";
        this._targetImageWrap.style.left = offset(this._targetImage).left + "px";
        this._targetImageClone = this._targetImage.cloneNode();
        this._targetImageClone.style.visibility = "hidden";
        this._targetImage.style.width = this._targetImage.offsetWidth + "px";
        this._targetImage.parentNode.replaceChild(this._targetImageClone, this._targetImage);
        document.body.appendChild(this._targetImageWrap);
        this._targetImageWrap.appendChild(this._targetImage);
        this._targetImage.classList.add("zoom-img");
        this._targetImage.setAttribute("data-action", "zoom-out");
        this._overlay = document.createElement("div");
        this._overlay.className = "zoom-overlay";
        document.body.appendChild(this._overlay);
        this._calculateZoom();
        this._triggerAnimation();
    };
    Zoom.prototype._calculateZoom = function () {
        this._targetImage.offsetWidth;
        var originalFullImageWidth = this._fullWidth;
        var originalFullImageHeight = this._fullHeight;
        var scrollTop = window.scrollY;
        var maxScaleFactor = originalFullImageWidth / this._targetImage.width;
        var viewportHeight = window.innerHeight - Zoom.OFFSET;
        var viewportWidth = window.innerWidth - Zoom.OFFSET;
        var imageAspectRatio = originalFullImageWidth / originalFullImageHeight;
        var viewportAspectRatio = viewportWidth / viewportHeight;
        if (originalFullImageWidth < viewportWidth && originalFullImageHeight < viewportHeight) {
            this._imgScaleFactor = maxScaleFactor;
        } else {
            if (imageAspectRatio < viewportAspectRatio) {
                this._imgScaleFactor = (viewportHeight / originalFullImageHeight) * maxScaleFactor;
            } else {
                this._imgScaleFactor = (viewportWidth / originalFullImageWidth) * maxScaleFactor;
            }
        }
    };
    Zoom.prototype._triggerAnimation = function () {
        this._targetImage.offsetWidth;
        var imageOffset = offset(this._targetImage);
        var scrollTop = window.scrollY;
        var viewportY = scrollTop + window.innerHeight / 2;
        var viewportX = window.innerWidth / 2;
        var imageCenterY = imageOffset.top + this._targetImage.height / 2;
        var imageCenterX = imageOffset.left + this._targetImage.width / 2;
        this._translateY = viewportY - imageCenterY;
        this._translateX = viewportX - imageCenterX;
        this._targetImage.style.webkitTransform = "scale3d(" + this._imgScaleFactor + "," + this._imgScaleFactor + "," + this._imgScaleFactor + ")";
        this._targetImageWrap.style.webkitTransform = "translate(" + this._translateX + "px, " + this._translateY + "px) translateZ(0)";
        this._targetImage.style.msTransform = "scale3d(" + this._imgScaleFactor + "," + this._imgScaleFactor + "," + this._imgScaleFactor + ")";
        this._targetImageWrap.style.msTransform = "translate(" + this._translateX + "px, " + this._translateY + "px) translateZ(0)";
        this._targetImage.style.transform = "scale3d(" + this._imgScaleFactor + "," + this._imgScaleFactor + "," + this._imgScaleFactor + ")";
        this._targetImageWrap.style.transform = "translate(" + this._translateX + "px, " + this._translateY + "px) translateZ(0)";
        this._body.classList.add("zoom-overlay-open");
    };
    Zoom.prototype.close = function () {
        this._body.classList.remove("zoom-overlay-open");
        this._body.classList.add("zoom-overlay-transitioning");
        this._targetImage.style.webkitTransform = "";
        this._targetImageWrap.style.webkitTransform = "";
        this._targetImage.style.msTransform = "";
        this._targetImageWrap.style.msTransform = "";
        this._targetImage.style.transform = "";
        this._targetImageWrap.style.transform = "";
        if (!"transition" in document.body.style) {
            return this.dispose();
        }
        disposeFn = this.dispose.bind(this);
        this._targetImage.addEventListener("transitionend", disposeFn);
        this._targetImage.addEventListener("webkitTransitionEnd", disposeFn);
    };
    Zoom.prototype.dispose = function () {
        if (this._targetImageWrap && this._targetImageWrap.parentNode) {
            this._targetImage.classList.remove("zoom-img");
            this._targetImage.setAttribute("data-action", "zoom");
            this._targetImageClone.parentNode.replaceChild(this._targetImage, this._targetImageClone);
            this._targetImageWrap.parentNode.removeChild(this._targetImageWrap);
            this._overlay.parentNode.removeChild(this._overlay);
            this._body.classList.remove("zoom-overlay-transitioning");
        }
        this._targetImage.removeEventListener("transitionend", disposeFn);
        this._targetImage.removeEventListener("webkitTransitionEnd", disposeFn);
    };
    $(function () {
        if (!window.isMobile || window.enableMobileZoom) {
            new ZoomService().listen();
        }
    });
})();
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    var t = document.documentElement,
        e = window,
        i = function (i, r) {
            var s = "x" === r ? "Width" : "Height",
                n = "scroll" + s,
                o = "client" + s,
                a = document.body;
            return i === e || i === t || i === a ? Math.max(t[n], a[n]) - (e["inner" + s] || t[o] || a[o]) : i[n] - i["offset" + s];
        },
        r = _gsScope._gsDefine.plugin({
            propName: "scrollTo",
            API: 2,
            version: "1.7.5",
            init: function (t, r, s) {
                return (
                    (this._wdw = t === e),
                    (this._target = t),
                    (this._tween = s),
                    "object" != typeof r && (r = { y: r }),
                    (this.vars = r),
                    (this._autoKill = r.autoKill !== !1),
                    (this.x = this.xPrev = this.getX()),
                    (this.y = this.yPrev = this.getY()),
                    null != r.x ? (this._addTween(this, "x", this.x, "max" === r.x ? i(t, "x") : r.x, "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : (this.skipX = !0),
                    null != r.y ? (this._addTween(this, "y", this.y, "max" === r.y ? i(t, "y") : r.y, "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : (this.skipY = !0),
                    !0
                );
            },
            set: function (t) {
                this._super.setRatio.call(this, t);
                var r = this._wdw || !this.skipX ? this.getX() : this.xPrev,
                    s = this._wdw || !this.skipY ? this.getY() : this.yPrev,
                    n = s - this.yPrev,
                    o = r - this.xPrev;
                this._autoKill &&
                    (!this.skipX && (o > 7 || -7 > o) && i(this._target, "x") > r && (this.skipX = !0),
                        !this.skipY && (n > 7 || -7 > n) && i(this._target, "y") > s && (this.skipY = !0),
                        this.skipX && this.skipY && (this._tween.kill(), this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))),
                    this._wdw ? e.scrollTo(this.skipX ? r : this.x, this.skipY ? s : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)),
                    (this.xPrev = this.x),
                    (this.yPrev = this.y);
            },
        }),
        s = r.prototype;
    (r.max = i),
        (s.getX = function () {
            return this._wdw ? (null != e.pageXOffset ? e.pageXOffset : null != t.scrollLeft ? t.scrollLeft : document.body.scrollLeft) : this._target.scrollLeft;
        }),
        (s.getY = function () {
            return this._wdw ? (null != e.pageYOffset ? e.pageYOffset : null != t.scrollTop ? t.scrollTop : document.body.scrollTop) : this._target.scrollTop;
        }),
        (s._kill = function (t) {
            return t.scrollTo_x && (this.skipX = !0), t.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, t);
        });
}),
    _gsScope._gsDefine && _gsScope._gsQueue.pop()();
(function (t, e) {
    var i = (t.GreenSockGlobals = t.GreenSockGlobals || t);
    if (!i.TweenLite) {
        var s,
            n,
            r,
            a,
            o,
            l = function (t) {
                var e,
                    s = t.split("."),
                    n = i;
                for (e = 0; s.length > e; e++) {
                    n[s[e]] = n = n[s[e]] || {};
                }
                return n;
            },
            h = l("com.greensock"),
            _ = 1e-10,
            u = function (t) {
                var e,
                    i = [],
                    s = t.length;
                for (e = 0; e !== s; i.push(t[e++])) { }
                return i;
            },
            m = function () { },
            f = (function () {
                var t = Object.prototype.toString,
                    e = t.call([]);
                return function (i) {
                    return null != i && (i instanceof Array || ("object" == typeof i && !!i.push && t.call(i) === e));
                };
            })(),
            c = {},
            p = function (s, n, r, a) {
                (this.sc = c[s] ? c[s].sc : []), (c[s] = this), (this.gsClass = null), (this.func = r);
                var o = [];
                (this.check = function (h) {
                    for (var _, u, m, f, d = n.length, v = d; --d > -1;) {
                        (_ = c[n[d]] || new p(n[d], [])).gsClass ? ((o[d] = _.gsClass), v--) : h && _.sc.push(this);
                    }
                    if (0 === v && r) {
                        for (
                            u = ("com.greensock." + s).split("."),
                            m = u.pop(),
                            f = l(u.join("."))[m] = this.gsClass = r.apply(r, o),
                            a &&
                            ((i[m] = f),
                                "function" == typeof define && define.amd
                                    ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + s.split(".").pop(), [], function () {
                                        return f;
                                    })
                                    : s === e && "undefined" != typeof module && module.exports && (module.exports = f)),
                            d = 0;
                            this.sc.length > d;
                            d++
                        ) {
                            this.sc[d].check();
                        }
                    }
                }),
                    this.check(!0);
            },
            d = (t._gsDefine = function (t, e, i, s) {
                return new p(t, e, i, s);
            }),
            v = (h._class = function (t, e, i) {
                return (
                    (e = e || function () { }),
                    d(
                        t,
                        [],
                        function () {
                            return e;
                        },
                        i
                    ),
                    e
                );
            });
        d.globals = i;
        var g = [0, 0, 1, 1],
            T = [],
            y = v(
                "easing.Ease",
                function (t, e, i, s) {
                    (this._func = t), (this._type = i || 0), (this._power = s || 0), (this._params = e ? g.concat(e) : g);
                },
                !0
            ),
            w = (y.map = {}),
            P = (y.register = function (t, e, i, s) {
                for (var n, r, a, o, l = e.split(","), _ = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --_ > -1;) {
                    for (r = l[_], n = s ? v("easing." + r, null, !0) : h.easing[r] || {}, a = u.length; --a > -1;) {
                        (o = u[a]), (w[r + "." + o] = w[o + r] = n[o] = t.getRatio ? t : t[o] || new t());
                    }
                }
            });
        for (
            r = y.prototype,
            r._calcEnd = !1,
            r.getRatio = function (t) {
                if (this._func) {
                    return (this._params[0] = t), this._func.apply(null, this._params);
                }
                var e = this._type,
                    i = this._power,
                    s = 1 === e ? 1 - t : 2 === e ? t : 0.5 > t ? 2 * t : 2 * (1 - t);
                return 1 === i ? (s *= s) : 2 === i ? (s *= s * s) : 3 === i ? (s *= s * s * s) : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : 0.5 > t ? s / 2 : 1 - s / 2;
            },
            s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
            n = s.length;
            --n > -1;

        ) {
            (r = s[n] + ",Power" + n), P(new y(null, null, 1, n), r, "easeOut", !0), P(new y(null, null, 2, n), r, "easeIn" + (0 === n ? ",easeNone" : "")), P(new y(null, null, 3, n), r, "easeInOut");
        }
        (w.linear = h.easing.Linear.easeIn), (w.swing = h.easing.Quad.easeInOut);
        var b = v("events.EventDispatcher", function (t) {
            (this._listeners = {}), (this._eventTarget = t || this);
        });
        (r = b.prototype),
            (r.addEventListener = function (t, e, i, s, n) {
                n = n || 0;
                var r,
                    l,
                    h = this._listeners[t],
                    _ = 0;
                for (null == h && (this._listeners[t] = h = []), l = h.length; --l > -1;) {
                    (r = h[l]), r.c === e && r.s === i ? h.splice(l, 1) : 0 === _ && n > r.pr && (_ = l + 1);
                }
                h.splice(_, 0, { c: e, s: i, up: s, pr: n }), this !== a || o || a.wake();
            }),
            (r.removeEventListener = function (t, e) {
                var i,
                    s = this._listeners[t];
                if (s) {
                    for (i = s.length; --i > -1;) {
                        if (s[i].c === e) {
                            return s.splice(i, 1), void 0;
                        }
                    }
                }
            }),
            (r.dispatchEvent = function (t) {
                var e,
                    i,
                    s,
                    n = this._listeners[t];
                if (n) {
                    for (e = n.length, i = this._eventTarget; --e > -1;) {
                        (s = n[e]), s && (s.up ? s.c.call(s.s || i, { type: t, target: i }) : s.c.call(s.s || i));
                    }
                }
            });
        var k = t.requestAnimationFrame,
            A = t.cancelAnimationFrame,
            S =
                Date.now ||
                function () {
                    return new Date().getTime();
                },
            x = S();
        for (s = ["ms", "moz", "webkit", "o"], n = s.length; --n > -1 && !k;) {
            (k = t[s[n] + "RequestAnimationFrame"]), (A = t[s[n] + "CancelAnimationFrame"] || t[s[n] + "CancelRequestAnimationFrame"]);
        }
        v("Ticker", function (t, e) {
            var i,
                s,
                n,
                r,
                l,
                h = this,
                u = S(),
                f = e !== !1 && k,
                c = 500,
                p = 33,
                d = "tick",
                v = function (t) {
                    var e,
                        a,
                        o = S() - x;
                    o > c && (u += o - p), (x += o), (h.time = (x - u) / 1000), (e = h.time - l), (!i || e > 0 || t === !0) && (h.frame++, (l += e + (e >= r ? 0.004 : r - e)), (a = !0)), t !== !0 && (n = s(v)), a && h.dispatchEvent(d);
                };
            b.call(h),
                (h.time = h.frame = 0),
                (h.tick = function () {
                    v(!0);
                }),
                (h.lagSmoothing = function (t, e) {
                    (c = t || 1 / _), (p = Math.min(e, c, 0));
                }),
                (h.sleep = function () {
                    null != n && (f && A ? A(n) : clearTimeout(n), (s = m), (n = null), h === a && (o = !1));
                }),
                (h.wake = function () {
                    null !== n ? h.sleep() : h.frame > 10 && (x = S() - c + 5),
                        (s =
                            0 === i
                                ? m
                                : f && k
                                    ? k
                                    : function (t) {
                                        return setTimeout(t, 0 | (1000 * (l - h.time) + 1));
                                    }),
                        h === a && (o = !0),
                        v(2);
                }),
                (h.fps = function (t) {
                    return arguments.length ? ((i = t), (r = 1 / (i || 60)), (l = this.time + r), h.wake(), void 0) : i;
                }),
                (h.useRAF = function (t) {
                    return arguments.length ? (h.sleep(), (f = t), h.fps(i), void 0) : f;
                }),
                h.fps(t),
                setTimeout(function () {
                    f && 5 > h.frame && h.useRAF(!1);
                }, 1500);
        }),
            (r = h.Ticker.prototype = new h.events.EventDispatcher()),
            (r.constructor = h.Ticker);
        var R = v("core.Animation", function (t, e) {
            if (
                ((this.vars = e = e || {}),
                    (this._duration = this._totalDuration = t || 0),
                    (this._delay = Number(e.delay) || 0),
                    (this._timeScale = 1),
                    (this._active = e.immediateRender === !0),
                    (this.data = e.data),
                    (this._reversed = e.reversed === !0),
                    B)
            ) {
                o || a.wake();
                var i = this.vars.useFrames ? q : B;
                i.add(this, i._time), this.vars.paused && this.paused(!0);
            }
        });
        (a = R.ticker = new h.Ticker()),
            (r = R.prototype),
            (r._dirty = r._gc = r._initted = r._paused = !1),
            (r._totalTime = r._time = 0),
            (r._rawPrevTime = -1),
            (r._next = r._last = r._onUpdate = r._timeline = r.timeline = null),
            (r._paused = !1);
        var C = function () {
            o && S() - x > 2000 && a.wake(), setTimeout(C, 2000);
        };
        C(),
            (r.play = function (t, e) {
                return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
            }),
            (r.pause = function (t, e) {
                return null != t && this.seek(t, e), this.paused(!0);
            }),
            (r.resume = function (t, e) {
                return null != t && this.seek(t, e), this.paused(!1);
            }),
            (r.seek = function (t, e) {
                return this.totalTime(Number(t), e !== !1);
            }),
            (r.restart = function (t, e) {
                return this.reversed(!1)
                    .paused(!1)
                    .totalTime(t ? -this._delay : 0, e !== !1, !0);
            }),
            (r.reverse = function (t, e) {
                return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1);
            }),
            (r.render = function () { }),
            (r.invalidate = function () {
                return (this._time = this._totalTime = 0), (this._initted = this._gc = !1), (this._rawPrevTime = -1), (this._gc || !this.timeline) && this._enabled(!0), this;
            }),
            (r.isActive = function () {
                var t,
                    e = this._timeline,
                    i = this._startTime;
                return !e || (!this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t);
            }),
            (r._enabled = function (t, e) {
                return (
                    o || a.wake(), (this._gc = !t), (this._active = this.isActive()), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
                );
            }),
            (r._kill = function () {
                return this._enabled(!1, !1);
            }),
            (r.kill = function (t, e) {
                return this._kill(t, e), this;
            }),
            (r._uncache = function (t) {
                for (var e = t ? this : this.timeline; e;) {
                    (e._dirty = !0), (e = e.timeline);
                }
                return this;
            }),
            (r._swapSelfInParams = function (t) {
                for (var e = t.length, i = t.concat(); --e > -1;) {
                    "{self}" === t[e] && (i[e] = this);
                }
                return i;
            }),
            (r._callback = function (t) {
                var e = this.vars;
                e[t].apply(e[t + "Scope"] || e.callbackScope || this, e[t + "Params"] || T);
            }),
            (r.eventCallback = function (t, e, i, s) {
                if ("on" === (t || "").substr(0, 2)) {
                    var n = this.vars;
                    if (1 === arguments.length) {
                        return n[t];
                    }
                    null == e ? delete n[t] : ((n[t] = e), (n[t + "Params"] = f(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i), (n[t + "Scope"] = s)), "onUpdate" === t && (this._onUpdate = e);
                }
                return this;
            }),
            (r.delay = function (t) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), (this._delay = t), this) : this._delay;
            }),
            (r.duration = function (t) {
                return arguments.length
                    ? ((this._duration = this._totalDuration = t),
                        this._uncache(!0),
                        this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0),
                        this)
                    : ((this._dirty = !1), this._duration);
            }),
            (r.totalDuration = function (t) {
                return (this._dirty = !1), arguments.length ? this.duration(t) : this._totalDuration;
            }),
            (r.time = function (t, e) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time;
            }),
            (r.totalTime = function (t, e, i) {
                if ((o || a.wake(), !arguments.length)) {
                    return this._totalTime;
                }
                if (this._timeline) {
                    if ((0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming)) {
                        this._dirty && this.totalDuration();
                        var s = this._totalDuration,
                            n = this._timeline;
                        if ((t > s && !i && (t = s), (this._startTime = (this._paused ? this._pauseTime : n._time) - (this._reversed ? s - t : t) / this._timeScale), n._dirty || this._uncache(!1), n._timeline)) {
                            for (; n._timeline;) {
                                n._timeline._time !== (n._startTime + n._totalTime) / n._timeScale && n.totalTime(n._totalTime, !0), (n = n._timeline);
                            }
                        }
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), z.length && $());
                }
                return this;
            }),
            (r.progress = r.totalProgress = function (t, e) {
                return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration();
            }),
            (r.startTime = function (t) {
                return arguments.length ? (t !== this._startTime && ((this._startTime = t), this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime;
            }),
            (r.endTime = function (t) {
                return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale;
            }),
            (r.timeScale = function (t) {
                if (!arguments.length) {
                    return this._timeScale;
                }
                if (((t = t || _), this._timeline && this._timeline.smoothChildTiming)) {
                    var e = this._pauseTime,
                        i = e || 0 === e ? e : this._timeline.totalTime();
                    this._startTime = i - ((i - this._startTime) * this._timeScale) / t;
                }
                return (this._timeScale = t), this._uncache(!1);
            }),
            (r.reversed = function (t) {
                return arguments.length
                    ? (t != this._reversed && ((this._reversed = t), this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this)
                    : this._reversed;
            }),
            (r.paused = function (t) {
                if (!arguments.length) {
                    return this._paused;
                }
                var e,
                    i,
                    s = this._timeline;
                return (
                    t != this._paused &&
                    s &&
                    (o || t || a.wake(),
                        (e = s.rawTime()),
                        (i = e - this._pauseTime),
                        !t && s.smoothChildTiming && ((this._startTime += i), this._uncache(!1)),
                        (this._pauseTime = t ? e : null),
                        (this._paused = t),
                        (this._active = this.isActive()),
                        !t && 0 !== i && this._initted && this.duration() && this.render(s.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, !0, !0)),
                    this._gc && !t && this._enabled(!0, !1),
                    this
                );
            });
        var D = v("core.SimpleTimeline", function (t) {
            R.call(this, 0, t), (this.autoRemoveChildren = this.smoothChildTiming = !0);
        });
        (r = D.prototype = new R()),
            (r.constructor = D),
            (r.kill()._gc = !1),
            (r._first = r._last = r._recent = null),
            (r._sortChildren = !1),
            (r.add = r.insert = function (t, e) {
                var i, s;
                if (
                    ((t._startTime = Number(e || 0) + t._delay),
                        t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale),
                        t.timeline && t.timeline._remove(t, !0),
                        (t.timeline = t._timeline = this),
                        t._gc && t._enabled(!0, !0),
                        (i = this._last),
                        this._sortChildren)
                ) {
                    for (s = t._startTime; i && i._startTime > s;) {
                        i = i._prev;
                    }
                }
                return i ? ((t._next = i._next), (i._next = t)) : ((t._next = this._first), (this._first = t)), t._next ? (t._next._prev = t) : (this._last = t), (t._prev = i), (this._recent = t), this._timeline && this._uncache(!0), this;
            }),
            (r._remove = function (t, e) {
                return (
                    t.timeline === this &&
                    (e || t._enabled(!1, !0),
                        t._prev ? (t._prev._next = t._next) : this._first === t && (this._first = t._next),
                        t._next ? (t._next._prev = t._prev) : this._last === t && (this._last = t._prev),
                        (t._next = t._prev = t.timeline = null),
                        t === this._recent && (this._recent = this._last),
                        this._timeline && this._uncache(!0)),
                    this
                );
            }),
            (r.render = function (t, e, i) {
                var s,
                    n = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = t; n;) {
                    (s = n._next),
                        (n._active || (t >= n._startTime && !n._paused)) &&
                        (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)),
                        (n = s);
                }
            }),
            (r.rawTime = function () {
                return o || a.wake(), this._totalTime;
            });
        var I = v(
            "TweenLite",
            function (e, i, s) {
                if ((R.call(this, i, s), (this.render = I.prototype.render), null == e)) {
                    throw "Cannot tween a null target.";
                }
                this.target = e = "string" != typeof e ? e : I.selector(e) || e;
                var n,
                    r,
                    a,
                    o = e.jquery || (e.length && e !== t && e[0] && (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))),
                    l = this.vars.overwrite;
                if (((this._overwrite = l = null == l ? Q[I.defaultOverwrite] : "number" == typeof l ? l >> 0 : Q[l]), (o || e instanceof Array || (e.push && f(e))) && "number" != typeof e[0])) {
                    for (this._targets = a = u(e), this._propLookup = [], this._siblings = [], n = 0; a.length > n; n++) {
                        (r = a[n]),
                            r
                                ? "string" != typeof r
                                    ? r.length && r !== t && r[0] && (r[0] === t || (r[0].nodeType && r[0].style && !r.nodeType))
                                        ? (a.splice(n--, 1), (this._targets = a = a.concat(u(r))))
                                        : ((this._siblings[n] = K(r, this, !1)), 1 === l && this._siblings[n].length > 1 && J(r, this, null, 1, this._siblings[n]))
                                    : ((r = a[n--] = I.selector(r)), "string" == typeof r && a.splice(n + 1, 1))
                                : a.splice(n--, 1);
                    }
                } else {
                    (this._propLookup = {}), (this._siblings = K(e, this, !1)), 1 === l && this._siblings.length > 1 && J(e, this, null, 1, this._siblings);
                }
                (this.vars.immediateRender || (0 === i && 0 === this._delay && this.vars.immediateRender !== !1)) && ((this._time = -_), this.render(-this._delay));
            },
            !0
        ),
            E = function (e) {
                return e && e.length && e !== t && e[0] && (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType));
            },
            O = function (t, e) {
                var i,
                    s = {};
                for (i in t) {
                    G[i] || (i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i) || !(!F[i] || (F[i] && F[i]._autoCSS)) || ((s[i] = t[i]), delete t[i]);
                }
                t.css = s;
            };
        (r = I.prototype = new R()),
            (r.constructor = I),
            (r.kill()._gc = !1),
            (r.ratio = 0),
            (r._firstPT = r._targets = r._overwrittenProps = r._startAt = null),
            (r._notifyPluginsOfEnabled = r._lazy = !1),
            (I.version = "1.17.0"),
            (I.defaultEase = r._ease = new y(null, null, 1, 1)),
            (I.defaultOverwrite = "auto"),
            (I.ticker = a),
            (I.autoSleep = 120),
            (I.lagSmoothing = function (t, e) {
                a.lagSmoothing(t, e);
            }),
            (I.selector =
                t.$ ||
                t.jQuery ||
                function (e) {
                    var i = t.$ || t.jQuery;
                    return i ? ((I.selector = i), i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e);
                });
        var z = [],
            N = {},
            L = (I._internals = { isArray: f, isSelector: E, lazyTweens: z }),
            F = (I._plugins = {}),
            U = (L.tweenLookup = {}),
            j = 0,
            G = (L.reservedProps = {
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
                lazy: 1,
                onOverwrite: 1,
                callbackScope: 1,
            }),
            Q = { none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, true: 1, false: 0 },
            q = (R._rootFramesTimeline = new D()),
            B = (R._rootTimeline = new D()),
            M = 30,
            $ = (L.lazyRender = function () {
                var t,
                    e = z.length;
                for (N = {}; --e > -1;) {
                    (t = z[e]), t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), (t._lazy = !1));
                }
                z.length = 0;
            });
        (B._startTime = a.time),
            (q._startTime = a.frame),
            (B._active = q._active = !0),
            setTimeout($, 1),
            (R._updateRoot = I.render = function () {
                var t, e, i;
                if ((z.length && $(), B.render((a.time - B._startTime) * B._timeScale, !1, !1), q.render((a.frame - q._startTime) * q._timeScale, !1, !1), z.length && $(), a.frame >= M)) {
                    M = a.frame + (parseInt(I.autoSleep, 10) || 120);
                    for (i in U) {
                        for (e = U[i].tweens, t = e.length; --t > -1;) {
                            e[t]._gc && e.splice(t, 1);
                        }
                        0 === e.length && delete U[i];
                    }
                    if (((i = B._first), (!i || i._paused) && I.autoSleep && !q._first && 1 === a._listeners.tick.length)) {
                        for (; i && i._paused;) {
                            i = i._next;
                        }
                        i || a.sleep();
                    }
                }
            }),
            a.addEventListener("tick", R._updateRoot);
        var K = function (t, e, i) {
            var s,
                n,
                r = t._gsTweenID;
            if ((U[r || (t._gsTweenID = r = "t" + j++)] || (U[r] = { target: t, tweens: [] }), e && ((s = U[r].tweens), (s[(n = s.length)] = e), i))) {
                for (; --n > -1;) {
                    s[n] === e && s.splice(n, 1);
                }
            }
            return U[r].tweens;
        },
            H = function (t, e, i, s) {
                var n,
                    r,
                    a = t.vars.onOverwrite;
                return a && (n = a(t, e, i, s)), (a = I.onOverwrite), a && (r = a(t, e, i, s)), n !== !1 && r !== !1;
            },
            J = function (t, e, i, s, n) {
                var r, a, o, l;
                if (1 === s || s >= 4) {
                    for (l = n.length, r = 0; l > r; r++) {
                        if ((o = n[r]) !== e) {
                            o._gc || (o._kill(null, t, e) && (a = !0));
                        } else {
                            if (5 === s) {
                                break;
                            }
                        }
                    }
                    return a;
                }
                var h,
                    u = e._startTime + _,
                    m = [],
                    f = 0,
                    c = 0 === e._duration;
                for (r = n.length; --r > -1;) {
                    (o = n[r]) === e ||
                        o._gc ||
                        o._paused ||
                        (o._timeline !== e._timeline
                            ? ((h = h || V(e, 0, c)), 0 === V(o, h, c) && (m[f++] = o))
                            : u >= o._startTime && o._startTime + o.totalDuration() / o._timeScale > u && (((c || !o._initted) && 2e-10 >= u - o._startTime) || (m[f++] = o)));
                }
                for (r = f; --r > -1;) {
                    if (((o = m[r]), 2 === s && o._kill(i, t, e) && (a = !0), 2 !== s || (!o._firstPT && o._initted))) {
                        if (2 !== s && !H(o, e)) {
                            continue;
                        }
                        o._enabled(!1, !1) && (a = !0);
                    }
                }
                return a;
            },
            V = function (t, e, i) {
                for (var s = t._timeline, n = s._timeScale, r = t._startTime; s._timeline;) {
                    if (((r += s._startTime), (n *= s._timeScale), s._paused)) {
                        return -100;
                    }
                    s = s._timeline;
                }
                return (r /= n), r > e ? r - e : (i && r === e) || (!t._initted && 2 * _ > r - e) ? _ : (r += t.totalDuration() / t._timeScale / n) > e + _ ? 0 : r - e - _;
            };
        (r._init = function () {
            var t,
                e,
                i,
                s,
                n,
                r = this.vars,
                a = this._overwrittenProps,
                o = this._duration,
                l = !!r.immediateRender,
                h = r.ease;
            if (r.startAt) {
                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), (n = {});
                for (s in r.startAt) {
                    n[s] = r.startAt[s];
                }
                if (((n.overwrite = !1), (n.immediateRender = !0), (n.lazy = l && r.lazy !== !1), (n.startAt = n.delay = null), (this._startAt = I.to(this.target, 0, n)), l)) {
                    if (this._time > 0) {
                        this._startAt = null;
                    } else {
                        if (0 !== o) {
                            return;
                        }
                    }
                }
            } else {
                if (r.runBackwards && 0 !== o) {
                    if (this._startAt) {
                        this._startAt.render(-1, !0), this._startAt.kill(), (this._startAt = null);
                    } else {
                        0 !== this._time && (l = !1), (i = {});
                        for (s in r) {
                            (G[s] && "autoCSS" !== s) || (i[s] = r[s]);
                        }
                        if (((i.overwrite = 0), (i.data = "isFromStart"), (i.lazy = l && r.lazy !== !1), (i.immediateRender = l), (this._startAt = I.to(this.target, 0, i)), l)) {
                            if (0 === this._time) {
                                return;
                            }
                        } else {
                            this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null);
                        }
                    }
                }
            }
            if (
                ((this._ease = h = h ? (h instanceof y ? h : "function" == typeof h ? new y(h, r.easeParams) : w[h] || I.defaultEase) : I.defaultEase),
                    r.easeParams instanceof Array && h.config && (this._ease = h.config.apply(h, r.easeParams)),
                    (this._easeType = this._ease._type),
                    (this._easePower = this._ease._power),
                    (this._firstPT = null),
                    this._targets)
            ) {
                for (t = this._targets.length; --t > -1;) {
                    this._initProps(this._targets[t], (this._propLookup[t] = {}), this._siblings[t], a ? a[t] : null) && (e = !0);
                }
            } else {
                e = this._initProps(this.target, this._propLookup, this._siblings, a);
            }
            if ((e && I._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || ("function" != typeof this.target && this._enabled(!1, !1))), r.runBackwards)) {
                for (i = this._firstPT; i;) {
                    (i.s += i.c), (i.c = -i.c), (i = i._next);
                }
            }
            (this._onUpdate = r.onUpdate), (this._initted = !0);
        }),
            (r._initProps = function (e, i, s, n) {
                var r, a, o, l, h, _;
                if (null == e) {
                    return !1;
                }
                N[e._gsTweenID] && $(), this.vars.css || (e.style && e !== t && e.nodeType && F.css && this.vars.autoCSS !== !1 && O(this.vars, e));
                for (r in this.vars) {
                    if (((_ = this.vars[r]), G[r])) {
                        _ && (_ instanceof Array || (_.push && f(_))) && -1 !== _.join("").indexOf("{self}") && (this.vars[r] = _ = this._swapSelfInParams(_, this));
                    } else {
                        if (F[r] && (l = new F[r]())._onInitTween(e, this.vars[r], this)) {
                            for (this._firstPT = h = { _next: this._firstPT, t: l, p: "setRatio", s: 0, c: 1, f: !0, n: r, pg: !0, pr: l._priority }, a = l._overwriteProps.length; --a > -1;) {
                                i[l._overwriteProps[a]] = this._firstPT;
                            }
                            (l._priority || l._onInitAllProps) && (o = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0);
                        } else {
                            (this._firstPT = i[r] = h = { _next: this._firstPT, t: e, p: r, f: "function" == typeof e[r], n: r, pg: !1, pr: 0 }),
                                (h.s = h.f ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : parseFloat(e[r])),
                                (h.c = "string" == typeof _ && "=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2)) : Number(_) - h.s || 0);
                        }
                    }
                    h && h._next && (h._next._prev = h);
                }
                return n && this._kill(n, e)
                    ? this._initProps(e, i, s, n)
                    : this._overwrite > 1 && this._firstPT && s.length > 1 && J(e, this, i, this._overwrite, s)
                        ? (this._kill(i, e), this._initProps(e, i, s, n))
                        : (this._firstPT && ((this.vars.lazy !== !1 && this._duration) || (this.vars.lazy && !this._duration)) && (N[e._gsTweenID] = !0), o);
            }),
            (r.render = function (t, e, i) {
                var s,
                    n,
                    r,
                    a,
                    o = this._time,
                    l = this._duration,
                    h = this._rawPrevTime;
                if (t >= l) {
                    (this._totalTime = this._time = l),
                        (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
                        this._reversed || ((s = !0), (n = "onComplete"), (i = i || this._timeline.autoRemoveChildren)),
                        0 === l &&
                        (this._initted || !this.vars.lazy || i) &&
                        (this._startTime === this._timeline._duration && (t = 0),
                            (0 === t || 0 > h || (h === _ && "isPause" !== this.data)) && h !== t && ((i = !0), h > _ && (n = "onReverseComplete")),
                            (this._rawPrevTime = a = !e || t || h === t ? t : _));
                } else {
                    if (1e-7 > t) {
                        (this._totalTime = this._time = 0),
                            (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
                            (0 !== o || (0 === l && h > 0)) && ((n = "onReverseComplete"), (s = this._reversed)),
                            0 > t && ((this._active = !1), 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (h !== _ || "isPause" !== this.data) && (i = !0), (this._rawPrevTime = a = !e || t || h === t ? t : _))),
                            this._initted || (i = !0);
                    } else {
                        if (((this._totalTime = this._time = t), this._easeType)) {
                            var u = t / l,
                                m = this._easeType,
                                f = this._easePower;
                            (1 === m || (3 === m && u >= 0.5)) && (u = 1 - u),
                                3 === m && (u *= 2),
                                1 === f ? (u *= u) : 2 === f ? (u *= u * u) : 3 === f ? (u *= u * u * u) : 4 === f && (u *= u * u * u * u),
                                (this.ratio = 1 === m ? 1 - u : 2 === m ? u : 0.5 > t / l ? u / 2 : 1 - u / 2);
                        } else {
                            this.ratio = this._ease.getRatio(t / l);
                        }
                    }
                }
                if (this._time !== o || i) {
                    if (!this._initted) {
                        if ((this._init(), !this._initted || this._gc)) {
                            return;
                        }
                        if (!i && this._firstPT && ((this.vars.lazy !== !1 && this._duration) || (this.vars.lazy && !this._duration))) {
                            return (this._time = this._totalTime = o), (this._rawPrevTime = h), z.push(this), (this._lazy = [t, e]), void 0;
                        }
                        this._time && !s ? (this.ratio = this._ease.getRatio(this._time / l)) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
                    }
                    for (
                        this._lazy !== !1 && (this._lazy = !1),
                        this._active || (!this._paused && this._time !== o && t >= 0 && (this._active = !0)),
                        0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : n || (n = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this._callback("onStart"))),
                        r = this._firstPT;
                        r;

                    ) {
                        r.f ? r.t[r.p](r.c * this.ratio + r.s) : (r.t[r.p] = r.c * this.ratio + r.s), (r = r._next);
                    }
                    this._onUpdate && (0 > t && this._startAt && t !== -0.0001 && this._startAt.render(t, e, i), e || ((this._time !== o || s) && this._callback("onUpdate"))),
                        n &&
                        (!this._gc || i) &&
                        (0 > t && this._startAt && !this._onUpdate && t !== -0.0001 && this._startAt.render(t, e, i),
                            s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), (this._active = !1)),
                            !e && this.vars[n] && this._callback(n),
                            0 === l && this._rawPrevTime === _ && a !== _ && (this._rawPrevTime = 0));
                }
            }),
            (r._kill = function (t, e, i) {
                if (("all" === t && (t = null), null == t && (null == e || e === this.target))) {
                    return (this._lazy = !1), this._enabled(!1, !1);
                }
                e = "string" != typeof e ? e || this._targets || this.target : I.selector(e) || e;
                var s,
                    n,
                    r,
                    a,
                    o,
                    l,
                    h,
                    _,
                    u,
                    m = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                if ((f(e) || E(e)) && "number" != typeof e[0]) {
                    for (s = e.length; --s > -1;) {
                        this._kill(t, e[s], i) && (l = !0);
                    }
                } else {
                    if (this._targets) {
                        for (s = this._targets.length; --s > -1;) {
                            if (e === this._targets[s]) {
                                (o = this._propLookup[s] || {}), (this._overwrittenProps = this._overwrittenProps || []), (n = this._overwrittenProps[s] = t ? this._overwrittenProps[s] || {} : "all");
                                break;
                            }
                        }
                    } else {
                        if (e !== this.target) {
                            return !1;
                        }
                        (o = this._propLookup), (n = this._overwrittenProps = t ? this._overwrittenProps || {} : "all");
                    }
                    if (o) {
                        if (((h = t || o), (_ = t !== n && "all" !== n && t !== o && ("object" != typeof t || !t._tempKill)), i && (I.onOverwrite || this.vars.onOverwrite))) {
                            for (r in h) {
                                o[r] && (u || (u = []), u.push(r));
                            }
                            if ((u || !t) && !H(this, i, e, u)) {
                                return !1;
                            }
                        }
                        for (r in h) {
                            (a = o[r]) &&
                                (m && (a.f ? a.t[a.p](a.s) : (a.t[a.p] = a.s), (l = !0)),
                                    a.pg && a.t._kill(h) && (l = !0),
                                    (a.pg && 0 !== a.t._overwriteProps.length) || (a._prev ? (a._prev._next = a._next) : a === this._firstPT && (this._firstPT = a._next), a._next && (a._next._prev = a._prev), (a._next = a._prev = null)),
                                    delete o[r]),
                                _ && (n[r] = 1);
                        }
                        !this._firstPT && this._initted && this._enabled(!1, !1);
                    }
                }
                return l;
            }),
            (r.invalidate = function () {
                return (
                    this._notifyPluginsOfEnabled && I._onPluginEvent("_onDisable", this),
                    (this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null),
                    (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
                    (this._propLookup = this._targets ? {} : []),
                    R.prototype.invalidate.call(this),
                    this.vars.immediateRender && ((this._time = -_), this.render(-this._delay)),
                    this
                );
            }),
            (r._enabled = function (t, e) {
                if ((o || a.wake(), t && this._gc)) {
                    var i,
                        s = this._targets;
                    if (s) {
                        for (i = s.length; --i > -1;) {
                            this._siblings[i] = K(s[i], this, !0);
                        }
                    } else {
                        this._siblings = K(this.target, this, !0);
                    }
                }
                return R.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? I._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1;
            }),
            (I.to = function (t, e, i) {
                return new I(t, e, i);
            }),
            (I.from = function (t, e, i) {
                return (i.runBackwards = !0), (i.immediateRender = 0 != i.immediateRender), new I(t, e, i);
            }),
            (I.fromTo = function (t, e, i, s) {
                return (s.startAt = i), (s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender), new I(t, e, s);
            }),
            (I.delayedCall = function (t, e, i, s, n) {
                return new I(e, 0, { delay: t, onComplete: e, onCompleteParams: i, callbackScope: s, onReverseComplete: e, onReverseCompleteParams: i, immediateRender: !1, lazy: !1, useFrames: n, overwrite: 0 });
            }),
            (I.set = function (t, e) {
                return new I(t, 0, e);
            }),
            (I.getTweensOf = function (t, e) {
                if (null == t) {
                    return [];
                }
                t = "string" != typeof t ? t : I.selector(t) || t;
                var i, s, n, r;
                if ((f(t) || E(t)) && "number" != typeof t[0]) {
                    for (i = t.length, s = []; --i > -1;) {
                        s = s.concat(I.getTweensOf(t[i], e));
                    }
                    for (i = s.length; --i > -1;) {
                        for (r = s[i], n = i; --n > -1;) {
                            r === s[n] && s.splice(i, 1);
                        }
                    }
                } else {
                    for (s = K(t).concat(), i = s.length; --i > -1;) {
                        (s[i]._gc || (e && !s[i].isActive())) && s.splice(i, 1);
                    }
                }
                return s;
            }),
            (I.killTweensOf = I.killDelayedCallsTo = function (t, e, i) {
                "object" == typeof e && ((i = e), (e = !1));
                for (var s = I.getTweensOf(t, e), n = s.length; --n > -1;) {
                    s[n]._kill(i, t);
                }
            });
        var W = v(
            "plugins.TweenPlugin",
            function (t, e) {
                (this._overwriteProps = (t || "").split(",")), (this._propName = this._overwriteProps[0]), (this._priority = e || 0), (this._super = W.prototype);
            },
            !0
        );
        if (
            ((r = W.prototype),
                (W.version = "1.10.1"),
                (W.API = 2),
                (r._firstPT = null),
                (r._addTween = function (t, e, i, s, n, r) {
                    var a, o;
                    return null != s && (a = "number" == typeof s || "=" !== s.charAt(1) ? Number(s) - Number(i) : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)))
                        ? ((this._firstPT = o = { _next: this._firstPT, t: t, p: e, s: i, c: a, f: "function" == typeof t[e], n: n || e, r: r }), o._next && (o._next._prev = o), o)
                        : void 0;
                }),
                (r.setRatio = function (t) {
                    for (var e, i = this._firstPT, s = 0.000001; i;) {
                        (e = i.c * t + i.s), i.r ? (e = Math.round(e)) : s > e && e > -s && (e = 0), i.f ? i.t[i.p](e) : (i.t[i.p] = e), (i = i._next);
                    }
                }),
                (r._kill = function (t) {
                    var e,
                        i = this._overwriteProps,
                        s = this._firstPT;
                    if (null != t[this._propName]) {
                        this._overwriteProps = [];
                    } else {
                        for (e = i.length; --e > -1;) {
                            null != t[i[e]] && i.splice(e, 1);
                        }
                    }
                    for (; s;) {
                        null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? ((s._prev._next = s._next), (s._prev = null)) : this._firstPT === s && (this._firstPT = s._next)), (s = s._next);
                    }
                    return !1;
                }),
                (r._roundProps = function (t, e) {
                    for (var i = this._firstPT; i;) {
                        (t[this._propName] || (null != i.n && t[i.n.split(this._propName + "_").join("")])) && (i.r = e), (i = i._next);
                    }
                }),
                (I._onPluginEvent = function (t, e) {
                    var i,
                        s,
                        n,
                        r,
                        a,
                        o = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; o;) {
                            for (a = o._next, s = n; s && s.pr > o.pr;) {
                                s = s._next;
                            }
                            (o._prev = s ? s._prev : r) ? (o._prev._next = o) : (n = o), (o._next = s) ? (s._prev = o) : (r = o), (o = a);
                        }
                        o = e._firstPT = n;
                    }
                    for (; o;) {
                        o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), (o = o._next);
                    }
                    return i;
                }),
                (W.activate = function (t) {
                    for (var e = t.length; --e > -1;) {
                        t[e].API === W.API && (F[new t[e]()._propName] = t[e]);
                    }
                    return !0;
                }),
                (d.plugin = function (t) {
                    if (!(t && t.propName && t.init && t.API)) {
                        throw "illegal plugin definition.";
                    }
                    var e,
                        i = t.propName,
                        s = t.priority || 0,
                        n = t.overwriteProps,
                        r = { init: "_onInitTween", set: "setRatio", kill: "_kill", round: "_roundProps", initAll: "_onInitAllProps" },
                        a = v(
                            "plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin",
                            function () {
                                W.call(this, i, s), (this._overwriteProps = n || []);
                            },
                            t.global === !0
                        ),
                        o = (a.prototype = new W(i));
                    (o.constructor = a), (a.API = t.API);
                    for (e in r) {
                        "function" == typeof t[e] && (o[r[e]] = t[e]);
                    }
                    return (a.version = t.version), W.activate([a]), a;
                }),
                (s = t._gsQueue))
        ) {
            for (n = 0; s.length > n; n++) {
                s[n]();
            }
            for (r in c) {
                c[r].func || t.console.log("GSAP encountered missing dependency: com.greensock." + r);
            }
        }
        o = !1;
    }
})("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite");
(function (document, window) {
    document.addEventListener(
        "DOMContentLoaded",
        function () {
            var baseUrl = window.location.href.replace(window.location.hash, "");
            [].slice
                .call(document.querySelectorAll("use[*|href]"))
                .filter(function (element) {
                    return element.getAttribute("xlink:href").indexOf("#") === 0;
                })
                .forEach(function (element) {
                    element.setAttribute("xlink:href", baseUrl.replace("#", "") + element.getAttribute("xlink:href"));
                });
        },
        false
    );
})(document, window);
/*! Masonry PACKAGED v4.2.1  https://masonry.desandro.com MIT License by David DeSandro */
!(function (t, e) {
    "function" == typeof define && define.amd
        ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
            return e(t, i);
        })
        : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("jquery")))
            : (t.jQueryBridget = e(t, t.jQuery));
})(window, function (t, e) {
    function i(i, r, a) {
        function h(t, e, n) {
            var o,
                r = "$()." + i + '("' + e + '")';
            return (
                t.each(function (t, h) {
                    var u = a.data(h, i);
                    if (!u) {
                        return void s(i + " not initialized. Cannot call methods, i.e. " + r);
                    }
                    var d = u[e];
                    if (!d || "_" == e.charAt(0)) {
                        return void s(r + " is not a valid method");
                    }
                    var l = d.apply(u, n);
                    o = void 0 === o ? l : o;
                }),
                void 0 !== o ? o : t
            );
        }
        function u(t, e) {
            t.each(function (t, n) {
                var o = a.data(n, i);
                o ? (o.option(e), o._init()) : ((o = new r(n, e)), a.data(n, i, o));
            });
        }
        (a = a || e || t.jQuery),
            a &&
            (r.prototype.option ||
                (r.prototype.option = function (t) {
                    a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t));
                }),
                (a.fn[i] = function (t) {
                    if ("string" == typeof t) {
                        var e = o.call(arguments, 1);
                        return h(this, t, e);
                    }
                    return u(this, t), this;
                }),
                n(a));
    }
    function n(t) {
        !t || (t && t.bridget) || (t.bridget = i);
    }
    var o = Array.prototype.slice,
        r = t.console,
        s =
            "undefined" == typeof r
                ? function () { }
                : function (t) {
                    r.error(t);
                };
    return n(e || t.jQuery), i;
}),
    (function (t, e) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? (module.exports = e()) : (t.EvEmitter = e());
    })("undefined" != typeof window ? window : this, function () {
        function t() { }
        var e = t.prototype;
        return (
            (e.on = function (t, e) {
                if (t && e) {
                    var i = (this._events = this._events || {}),
                        n = (i[t] = i[t] || []);
                    return -1 == n.indexOf(e) && n.push(e), this;
                }
            }),
            (e.once = function (t, e) {
                if (t && e) {
                    this.on(t, e);
                    var i = (this._onceEvents = this._onceEvents || {}),
                        n = (i[t] = i[t] || {});
                    return (n[e] = !0), this;
                }
            }),
            (e.off = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = i.indexOf(e);
                    return -1 != n && i.splice(n, 1), this;
                }
            }),
            (e.emitEvent = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    (i = i.slice(0)), (e = e || []);
                    for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
                        var r = i[o],
                            s = n && n[r];
                        s && (this.off(t, r), delete n[r]), r.apply(this, e);
                    }
                    return this;
                }
            }),
            (e.allOff = function () {
                delete this._events, delete this._onceEvents;
            }),
            t
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("get-size/get-size", [], function () {
                return e();
            })
            : "object" == typeof module && module.exports
                ? (module.exports = e())
                : (t.getSize = e());
    })(window, function () {
        function t(t) {
            var e = parseFloat(t),
                i = -1 == t.indexOf("%") && !isNaN(e);
            return i && e;
        }
        function e() { }
        function i() {
            for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0; u > e; e++) {
                var i = h[e];
                t[i] = 0;
            }
            return t;
        }
        function n(t) {
            var e = getComputedStyle(t);
            return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e;
        }
        function o() {
            if (!d) {
                d = !0;
                var e = document.createElement("div");
                (e.style.width = "200px"), (e.style.padding = "1px 2px 3px 4px"), (e.style.borderStyle = "solid"), (e.style.borderWidth = "1px 2px 3px 4px"), (e.style.boxSizing = "border-box");
                var i = document.body || document.documentElement;
                i.appendChild(e);
                var o = n(e);
                (r.isBoxSizeOuter = s = 200 == t(o.width)), i.removeChild(e);
            }
        }
        function r(e) {
            if ((o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType)) {
                var r = n(e);
                if ("none" == r.display) {
                    return i();
                }
                var a = {};
                (a.width = e.offsetWidth), (a.height = e.offsetHeight);
                for (var d = (a.isBorderBox = "border-box" == r.boxSizing), l = 0; u > l; l++) {
                    var c = h[l],
                        f = r[c],
                        m = parseFloat(f);
                    a[c] = isNaN(m) ? 0 : m;
                }
                var p = a.paddingLeft + a.paddingRight,
                    g = a.paddingTop + a.paddingBottom,
                    y = a.marginLeft + a.marginRight,
                    v = a.marginTop + a.marginBottom,
                    _ = a.borderLeftWidth + a.borderRightWidth,
                    z = a.borderTopWidth + a.borderBottomWidth,
                    E = d && s,
                    b = t(r.width);
                b !== !1 && (a.width = b + (E ? 0 : p + _));
                var x = t(r.height);
                return x !== !1 && (a.height = x + (E ? 0 : g + z)), (a.innerWidth = a.width - (p + _)), (a.innerHeight = a.height - (g + z)), (a.outerWidth = a.width + y), (a.outerHeight = a.height + v), a;
            }
        }
        var s,
            a =
                "undefined" == typeof console
                    ? e
                    : function (t) {
                        console.error(t);
                    },
            h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
            u = h.length,
            d = !1;
        return r;
    }),
    (function (t, e) {
        "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? (module.exports = e()) : (t.matchesSelector = e());
    })(window, function () {
        var t = (function () {
            var t = window.Element.prototype;
            if (t.matches) {
                return "matches";
            }
            if (t.matchesSelector) {
                return "matchesSelector";
            }
            for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
                var n = e[i],
                    o = n + "MatchesSelector";
                if (t[o]) {
                    return o;
                }
            }
        })();
        return function (e, i) {
            return e[t](i);
        };
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
                return e(t, i);
            })
            : "object" == typeof module && module.exports
                ? (module.exports = e(t, require("desandro-matches-selector")))
                : (t.fizzyUIUtils = e(t, t.matchesSelector));
    })(window, function (t, e) {
        var i = {};
        (i.extend = function (t, e) {
            for (var i in e) {
                t[i] = e[i];
            }
            return t;
        }),
            (i.modulo = function (t, e) {
                return ((t % e) + e) % e;
            }),
            (i.makeArray = function (t) {
                var e = [];
                if (Array.isArray(t)) {
                    e = t;
                } else {
                    if (t && "object" == typeof t && "number" == typeof t.length) {
                        for (var i = 0; i < t.length; i++) {
                            e.push(t[i]);
                        }
                    } else {
                        e.push(t);
                    }
                }
                return e;
            }),
            (i.removeFrom = function (t, e) {
                var i = t.indexOf(e);
                -1 != i && t.splice(i, 1);
            }),
            (i.getParent = function (t, i) {
                for (; t.parentNode && t != document.body;) {
                    if (((t = t.parentNode), e(t, i))) {
                        return t;
                    }
                }
            }),
            (i.getQueryElement = function (t) {
                return "string" == typeof t ? document.querySelector(t) : t;
            }),
            (i.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (i.filterFindElements = function (t, n) {
                t = i.makeArray(t);
                var o = [];
                return (
                    t.forEach(function (t) {
                        if (t instanceof HTMLElement) {
                            if (!n) {
                                return void o.push(t);
                            }
                            e(t, n) && o.push(t);
                            for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) {
                                o.push(i[r]);
                            }
                        }
                    }),
                    o
                );
            }),
            (i.debounceMethod = function (t, e, i) {
                var n = t.prototype[e],
                    o = e + "Timeout";
                t.prototype[e] = function () {
                    var t = this[o];
                    t && clearTimeout(t);
                    var e = arguments,
                        r = this;
                    this[o] = setTimeout(function () {
                        n.apply(r, e), delete r[o];
                    }, i || 100);
                };
            }),
            (i.docReady = function (t) {
                var e = document.readyState;
                "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t);
            }),
            (i.toDashed = function (t) {
                return t
                    .replace(/(.)([A-Z])/g, function (t, e, i) {
                        return e + "-" + i;
                    })
                    .toLowerCase();
            });
        var n = t.console;
        return (
            (i.htmlInit = function (e, o) {
                i.docReady(function () {
                    var r = i.toDashed(o),
                        s = "data-" + r,
                        a = document.querySelectorAll("[" + s + "]"),
                        h = document.querySelectorAll(".js-" + r),
                        u = i.makeArray(a).concat(i.makeArray(h)),
                        d = s + "-options",
                        l = t.jQuery;
                    u.forEach(function (t) {
                        var i,
                            r = t.getAttribute(s) || t.getAttribute(d);
                        try {
                            i = r && JSON.parse(r);
                        } catch (a) {
                            return void (n && n.error("Error parsing " + s + " on " + t.className + ": " + a));
                        }
                        var h = new e(t, i);
                        l && l.data(t, o, h);
                    });
                });
            }),
            i
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e)
            : "object" == typeof module && module.exports
                ? (module.exports = e(require("ev-emitter"), require("get-size")))
                : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
    })(window, function (t, e) {
        function i(t) {
            for (var e in t) {
                return !1;
            }
            return (e = null), !0;
        }
        function n(t, e) {
            t && ((this.element = t), (this.layout = e), (this.position = { x: 0, y: 0 }), this._create());
        }
        function o(t) {
            return t.replace(/([A-Z])/g, function (t) {
                return "-" + t.toLowerCase();
            });
        }
        var r = document.documentElement.style,
            s = "string" == typeof r.transition ? "transition" : "WebkitTransition",
            a = "string" == typeof r.transform ? "transform" : "WebkitTransform",
            h = { WebkitTransition: "webkitTransitionEnd", transition: "transitionend" }[s],
            u = { transform: a, transition: s, transitionDuration: s + "Duration", transitionProperty: s + "Property", transitionDelay: s + "Delay" },
            d = (n.prototype = Object.create(t.prototype));
        (d.constructor = n),
            (d._create = function () {
                (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }), this.css({ position: "absolute" });
            }),
            (d.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (d.getSize = function () {
                this.size = e(this.element);
            }),
            (d.css = function (t) {
                var e = this.element.style;
                for (var i in t) {
                    var n = u[i] || i;
                    e[n] = t[i];
                }
            }),
            (d.getPosition = function () {
                var t = getComputedStyle(this.element),
                    e = this.layout._getOption("originLeft"),
                    i = this.layout._getOption("originTop"),
                    n = t[e ? "left" : "right"],
                    o = t[i ? "top" : "bottom"],
                    r = this.layout.size,
                    s = -1 != n.indexOf("%") ? (parseFloat(n) / 100) * r.width : parseInt(n, 10),
                    a = -1 != o.indexOf("%") ? (parseFloat(o) / 100) * r.height : parseInt(o, 10);
                (s = isNaN(s) ? 0 : s), (a = isNaN(a) ? 0 : a), (s -= e ? r.paddingLeft : r.paddingRight), (a -= i ? r.paddingTop : r.paddingBottom), (this.position.x = s), (this.position.y = a);
            }),
            (d.layoutPosition = function () {
                var t = this.layout.size,
                    e = {},
                    i = this.layout._getOption("originLeft"),
                    n = this.layout._getOption("originTop"),
                    o = i ? "paddingLeft" : "paddingRight",
                    r = i ? "left" : "right",
                    s = i ? "right" : "left",
                    a = this.position.x + t[o];
                (e[r] = this.getXValue(a)), (e[s] = "");
                var h = n ? "paddingTop" : "paddingBottom",
                    u = n ? "top" : "bottom",
                    d = n ? "bottom" : "top",
                    l = this.position.y + t[h];
                (e[u] = this.getYValue(l)), (e[d] = ""), this.css(e), this.emitEvent("layout", [this]);
            }),
            (d.getXValue = function (t) {
                var e = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && !e ? (t / this.layout.size.width) * 100 + "%" : t + "px";
            }),
            (d.getYValue = function (t) {
                var e = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && e ? (t / this.layout.size.height) * 100 + "%" : t + "px";
            }),
            (d._transitionTo = function (t, e) {
                this.getPosition();
                var i = this.position.x,
                    n = this.position.y,
                    o = parseInt(t, 10),
                    r = parseInt(e, 10),
                    s = o === this.position.x && r === this.position.y;
                if ((this.setPosition(t, e), s && !this.isTransitioning)) {
                    return void this.layoutPosition();
                }
                var a = t - i,
                    h = e - n,
                    u = {};
                (u.transform = this.getTranslate(a, h)), this.transition({ to: u, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 });
            }),
            (d.getTranslate = function (t, e) {
                var i = this.layout._getOption("originLeft"),
                    n = this.layout._getOption("originTop");
                return (t = i ? t : -t), (e = n ? e : -e), "translate3d(" + t + "px, " + e + "px, 0)";
            }),
            (d.goTo = function (t, e) {
                this.setPosition(t, e), this.layoutPosition();
            }),
            (d.moveTo = d._transitionTo),
            (d.setPosition = function (t, e) {
                (this.position.x = parseInt(t, 10)), (this.position.y = parseInt(e, 10));
            }),
            (d._nonTransition = function (t) {
                this.css(t.to), t.isCleaning && this._removeStyles(t.to);
                for (var e in t.onTransitionEnd) {
                    t.onTransitionEnd[e].call(this);
                }
            }),
            (d.transition = function (t) {
                if (!parseFloat(this.layout.options.transitionDuration)) {
                    return void this._nonTransition(t);
                }
                var e = this._transn;
                for (var i in t.onTransitionEnd) {
                    e.onEnd[i] = t.onTransitionEnd[i];
                }
                for (i in t.to) {
                    (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
                }
                if (t.from) {
                    this.css(t.from);
                    var n = this.element.offsetHeight;
                    n = null;
                }
                this.enableTransition(t.to), this.css(t.to), (this.isTransitioning = !0);
            });
        var l = "opacity," + o(a);
        (d.enableTransition = function () {
            if (!this.isTransitioning) {
                var t = this.layout.options.transitionDuration;
                (t = "number" == typeof t ? t + "ms" : t), this.css({ transitionProperty: l, transitionDuration: t, transitionDelay: this.staggerDelay || 0 }), this.element.addEventListener(h, this, !1);
            }
        }),
            (d.onwebkitTransitionEnd = function (t) {
                this.ontransitionend(t);
            }),
            (d.onotransitionend = function (t) {
                this.ontransitionend(t);
            });
        var c = { "-webkit-transform": "transform" };
        (d.ontransitionend = function (t) {
            if (t.target === this.element) {
                var e = this._transn,
                    n = c[t.propertyName] || t.propertyName;
                if ((delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && ((this.element.style[t.propertyName] = ""), delete e.clean[n]), n in e.onEnd)) {
                    var o = e.onEnd[n];
                    o.call(this), delete e.onEnd[n];
                }
                this.emitEvent("transitionEnd", [this]);
            }
        }),
            (d.disableTransition = function () {
                this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), (this.isTransitioning = !1);
            }),
            (d._removeStyles = function (t) {
                var e = {};
                for (var i in t) {
                    e[i] = "";
                }
                this.css(e);
            });
        var f = { transitionProperty: "", transitionDuration: "", transitionDelay: "" };
        return (
            (d.removeTransitionStyles = function () {
                this.css(f);
            }),
            (d.stagger = function (t) {
                (t = isNaN(t) ? 0 : t), (this.staggerDelay = t + "ms");
            }),
            (d.removeElem = function () {
                this.element.parentNode.removeChild(this.element), this.css({ display: "" }), this.emitEvent("remove", [this]);
            }),
            (d.remove = function () {
                return s && parseFloat(this.layout.options.transitionDuration)
                    ? (this.once("transitionEnd", function () {
                        this.removeElem();
                    }),
                        void this.hide())
                    : void this.removeElem();
            }),
            (d.reveal = function () {
                delete this.isHidden, this.css({ display: "" });
                var t = this.layout.options,
                    e = {},
                    i = this.getHideRevealTransitionEndProperty("visibleStyle");
                (e[i] = this.onRevealTransitionEnd), this.transition({ from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0, onTransitionEnd: e });
            }),
            (d.onRevealTransitionEnd = function () {
                this.isHidden || this.emitEvent("reveal");
            }),
            (d.getHideRevealTransitionEndProperty = function (t) {
                var e = this.layout.options[t];
                if (e.opacity) {
                    return "opacity";
                }
                for (var i in e) {
                    return i;
                }
            }),
            (d.hide = function () {
                (this.isHidden = !0), this.css({ display: "" });
                var t = this.layout.options,
                    e = {},
                    i = this.getHideRevealTransitionEndProperty("hiddenStyle");
                (e[i] = this.onHideTransitionEnd), this.transition({ from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: e });
            }),
            (d.onHideTransitionEnd = function () {
                this.isHidden && (this.css({ display: "none" }), this.emitEvent("hide"));
            }),
            (d.destroy = function () {
                this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" });
            }),
            n
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, o, r) {
                return e(t, i, n, o, r);
            })
            : "object" == typeof module && module.exports
                ? (module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")))
                : (t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item));
    })(window, function (t, e, i, n, o) {
        function r(t, e) {
            var i = n.getQueryElement(t);
            if (!i) {
                return void (h && h.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
            }
            (this.element = i), u && (this.$element = u(this.element)), (this.options = n.extend({}, this.constructor.defaults)), this.option(e);
            var o = ++l;
            (this.element.outlayerGUID = o), (c[o] = this), this._create();
            var r = this._getOption("initLayout");
            r && this.layout();
        }
        function s(t) {
            function e() {
                t.apply(this, arguments);
            }
            return (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), e;
        }
        function a(t) {
            if ("number" == typeof t) {
                return t;
            }
            var e = t.match(/(^\d*\.?\d*)(\w*)/),
                i = e && e[1],
                n = e && e[2];
            if (!i.length) {
                return 0;
            }
            i = parseFloat(i);
            var o = m[n] || 1;
            return i * o;
        }
        var h = t.console,
            u = t.jQuery,
            d = function () { },
            l = 0,
            c = {};
        (r.namespace = "outlayer"),
            (r.Item = o),
            (r.defaults = {
                containerStyle: { position: "relative" },
                initLayout: !0,
                originLeft: !0,
                originTop: !0,
                resize: !0,
                resizeContainer: !0,
                transitionDuration: "0.4s",
                hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
                visibleStyle: { opacity: 1, transform: "scale(1)" },
            });
        var f = r.prototype;
        n.extend(f, e.prototype),
            (f.option = function (t) {
                n.extend(this.options, t);
            }),
            (f._getOption = function (t) {
                var e = this.constructor.compatOptions[t];
                return e && void 0 !== this.options[e] ? this.options[e] : this.options[t];
            }),
            (r.compatOptions = {
                initLayout: "isInitLayout",
                horizontal: "isHorizontal",
                layoutInstant: "isLayoutInstant",
                originLeft: "isOriginLeft",
                originTop: "isOriginTop",
                resize: "isResizeBound",
                resizeContainer: "isResizingContainer",
            }),
            (f._create = function () {
                this.reloadItems(), (this.stamps = []), this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);
                var t = this._getOption("resize");
                t && this.bindResize();
            }),
            (f.reloadItems = function () {
                this.items = this._itemize(this.element.children);
            }),
            (f._itemize = function (t) {
                for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
                    var r = e[o],
                        s = new i(r, this);
                    n.push(s);
                }
                return n;
            }),
            (f._filterFindItemElements = function (t) {
                return n.filterFindElements(t, this.options.itemSelector);
            }),
            (f.getItemElements = function () {
                return this.items.map(function (t) {
                    return t.element;
                });
            }),
            (f.layout = function () {
                this._resetLayout(), this._manageStamps();
                var t = this._getOption("layoutInstant"),
                    e = void 0 !== t ? t : !this._isLayoutInited;
                this.layoutItems(this.items, e), (this._isLayoutInited = !0);
            }),
            (f._init = f.layout),
            (f._resetLayout = function () {
                this.getSize();
            }),
            (f.getSize = function () {
                this.size = i(this.element);
            }),
            (f._getMeasurement = function (t, e) {
                var n,
                    o = this.options[t];
                o ? ("string" == typeof o ? (n = this.element.querySelector(o)) : o instanceof HTMLElement && (n = o), (this[t] = n ? i(n)[e] : o)) : (this[t] = 0);
            }),
            (f.layoutItems = function (t, e) {
                (t = this._getItemsForLayout(t)), this._layoutItems(t, e), this._postLayout();
            }),
            (f._getItemsForLayout = function (t) {
                return t.filter(function (t) {
                    return !t.isIgnored;
                });
            }),
            (f._layoutItems = function (t, e) {
                if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
                    var i = [];
                    t.forEach(function (t) {
                        var n = this._getItemLayoutPosition(t);
                        (n.item = t), (n.isInstant = e || t.isLayoutInstant), i.push(n);
                    }, this),
                        this._processLayoutQueue(i);
                }
            }),
            (f._getItemLayoutPosition = function () {
                return { x: 0, y: 0 };
            }),
            (f._processLayoutQueue = function (t) {
                this.updateStagger(),
                    t.forEach(function (t, e) {
                        this._positionItem(t.item, t.x, t.y, t.isInstant, e);
                    }, this);
            }),
            (f.updateStagger = function () {
                var t = this.options.stagger;
                return null === t || void 0 === t ? void (this.stagger = 0) : ((this.stagger = a(t)), this.stagger);
            }),
            (f._positionItem = function (t, e, i, n, o) {
                n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i));
            }),
            (f._postLayout = function () {
                this.resizeContainer();
            }),
            (f.resizeContainer = function () {
                var t = this._getOption("resizeContainer");
                if (t) {
                    var e = this._getContainerSize();
                    e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1));
                }
            }),
            (f._getContainerSize = d),
            (f._setContainerMeasure = function (t, e) {
                if (void 0 !== t) {
                    var i = this.size;
                    i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth),
                        (t = Math.max(t, 0)),
                        (this.element.style[e ? "width" : "height"] = t + "px");
                }
            }),
            (f._emitCompleteOnItems = function (t, e) {
                function i() {
                    o.dispatchEvent(t + "Complete", null, [e]);
                }
                function n() {
                    s++, s == r && i();
                }
                var o = this,
                    r = e.length;
                if (!e || !r) {
                    return void i();
                }
                var s = 0;
                e.forEach(function (e) {
                    e.once(t, n);
                });
            }),
            (f.dispatchEvent = function (t, e, i) {
                var n = e ? [e].concat(i) : i;
                if ((this.emitEvent(t, n), u)) {
                    if (((this.$element = this.$element || u(this.element)), e)) {
                        var o = u.Event(e);
                        (o.type = t), this.$element.trigger(o, i);
                    } else {
                        this.$element.trigger(t, i);
                    }
                }
            }),
            (f.ignore = function (t) {
                var e = this.getItem(t);
                e && (e.isIgnored = !0);
            }),
            (f.unignore = function (t) {
                var e = this.getItem(t);
                e && delete e.isIgnored;
            }),
            (f.stamp = function (t) {
                (t = this._find(t)), t && ((this.stamps = this.stamps.concat(t)), t.forEach(this.ignore, this));
            }),
            (f.unstamp = function (t) {
                (t = this._find(t)),
                    t &&
                    t.forEach(function (t) {
                        n.removeFrom(this.stamps, t), this.unignore(t);
                    }, this);
            }),
            (f._find = function (t) {
                return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), (t = n.makeArray(t))) : void 0;
            }),
            (f._manageStamps = function () {
                this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this));
            }),
            (f._getBoundingRect = function () {
                var t = this.element.getBoundingClientRect(),
                    e = this.size;
                this._boundingRect = {
                    left: t.left + e.paddingLeft + e.borderLeftWidth,
                    top: t.top + e.paddingTop + e.borderTopWidth,
                    right: t.right - (e.paddingRight + e.borderRightWidth),
                    bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
                };
            }),
            (f._manageStamp = d),
            (f._getElementOffset = function (t) {
                var e = t.getBoundingClientRect(),
                    n = this._boundingRect,
                    o = i(t),
                    r = { left: e.left - n.left - o.marginLeft, top: e.top - n.top - o.marginTop, right: n.right - e.right - o.marginRight, bottom: n.bottom - e.bottom - o.marginBottom };
                return r;
            }),
            (f.handleEvent = n.handleEvent),
            (f.bindResize = function () {
                t.addEventListener("resize", this), (this.isResizeBound = !0);
            }),
            (f.unbindResize = function () {
                t.removeEventListener("resize", this), (this.isResizeBound = !1);
            }),
            (f.onresize = function () {
                this.resize();
            }),
            n.debounceMethod(r, "onresize", 100),
            (f.resize = function () {
                this.isResizeBound && this.needsResizeLayout() && this.layout();
            }),
            (f.needsResizeLayout = function () {
                var t = i(this.element),
                    e = this.size && t;
                return e && t.innerWidth !== this.size.innerWidth;
            }),
            (f.addItems = function (t) {
                var e = this._itemize(t);
                return e.length && (this.items = this.items.concat(e)), e;
            }),
            (f.appended = function (t) {
                var e = this.addItems(t);
                e.length && (this.layoutItems(e, !0), this.reveal(e));
            }),
            (f.prepended = function (t) {
                var e = this._itemize(t);
                if (e.length) {
                    var i = this.items.slice(0);
                    (this.items = e.concat(i)), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i);
                }
            }),
            (f.reveal = function (t) {
                if ((this._emitCompleteOnItems("reveal", t), t && t.length)) {
                    var e = this.updateStagger();
                    t.forEach(function (t, i) {
                        t.stagger(i * e), t.reveal();
                    });
                }
            }),
            (f.hide = function (t) {
                if ((this._emitCompleteOnItems("hide", t), t && t.length)) {
                    var e = this.updateStagger();
                    t.forEach(function (t, i) {
                        t.stagger(i * e), t.hide();
                    });
                }
            }),
            (f.revealItemElements = function (t) {
                var e = this.getItems(t);
                this.reveal(e);
            }),
            (f.hideItemElements = function (t) {
                var e = this.getItems(t);
                this.hide(e);
            }),
            (f.getItem = function (t) {
                for (var e = 0; e < this.items.length; e++) {
                    var i = this.items[e];
                    if (i.element == t) {
                        return i;
                    }
                }
            }),
            (f.getItems = function (t) {
                t = n.makeArray(t);
                var e = [];
                return (
                    t.forEach(function (t) {
                        var i = this.getItem(t);
                        i && e.push(i);
                    }, this),
                    e
                );
            }),
            (f.remove = function (t) {
                var e = this.getItems(t);
                this._emitCompleteOnItems("remove", e),
                    e &&
                    e.length &&
                    e.forEach(function (t) {
                        t.remove(), n.removeFrom(this.items, t);
                    }, this);
            }),
            (f.destroy = function () {
                var t = this.element.style;
                (t.height = ""),
                    (t.position = ""),
                    (t.width = ""),
                    this.items.forEach(function (t) {
                        t.destroy();
                    }),
                    this.unbindResize();
                var e = this.element.outlayerGUID;
                delete c[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace);
            }),
            (r.data = function (t) {
                t = n.getQueryElement(t);
                var e = t && t.outlayerGUID;
                return e && c[e];
            }),
            (r.create = function (t, e) {
                var i = s(r);
                return (
                    (i.defaults = n.extend({}, r.defaults)),
                    n.extend(i.defaults, e),
                    (i.compatOptions = n.extend({}, r.compatOptions)),
                    (i.namespace = t),
                    (i.data = r.data),
                    (i.Item = s(o)),
                    n.htmlInit(i, t),
                    u && u.bridget && u.bridget(t, i),
                    i
                );
            });
        var m = { ms: 1, s: 1000 };
        return (r.Item = o), r;
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define(["outlayer/outlayer", "get-size/get-size"], e)
            : "object" == typeof module && module.exports
                ? (module.exports = e(require("outlayer"), require("get-size")))
                : (t.Masonry = e(t.Outlayer, t.getSize));
    })(window, function (t, e) {
        var i = t.create("masonry");
        i.compatOptions.fitWidth = "isFitWidth";
        var n = i.prototype;
        return (
            (n._resetLayout = function () {
                this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), (this.colYs = []);
                for (var t = 0; t < this.cols; t++) {
                    this.colYs.push(0);
                }
                (this.maxY = 0), (this.horizontalColIndex = 0);
            }),
            (n.measureColumns = function () {
                if ((this.getContainerWidth(), !this.columnWidth)) {
                    var t = this.items[0],
                        i = t && t.element;
                    this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
                }
                var n = (this.columnWidth += this.gutter),
                    o = this.containerWidth + this.gutter,
                    r = o / n,
                    s = n - (o % n),
                    a = s && 1 > s ? "round" : "floor";
                (r = Math[a](r)), (this.cols = Math.max(r, 1));
            }),
            (n.getContainerWidth = function () {
                var t = this._getOption("fitWidth"),
                    i = t ? this.element.parentNode : this.element,
                    n = e(i);
                this.containerWidth = n && n.innerWidth;
            }),
            (n._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = t.size.outerWidth % this.columnWidth,
                    i = e && 1 > e ? "round" : "ceil",
                    n = Math[i](t.size.outerWidth / this.columnWidth);
                n = Math.min(n, this.cols);
                for (
                    var o = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", r = this[o](n, t), s = { x: this.columnWidth * r.col, y: r.y }, a = r.y + t.size.outerHeight, h = n + r.col, u = r.col;
                    h > u;
                    u++
                ) {
                    this.colYs[u] = a;
                }
                return s;
            }),
            (n._getTopColPosition = function (t) {
                var e = this._getTopColGroup(t),
                    i = Math.min.apply(Math, e);
                return { col: e.indexOf(i), y: i };
            }),
            (n._getTopColGroup = function (t) {
                if (2 > t) {
                    return this.colYs;
                }
                for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
                    e[n] = this._getColGroupY(n, t);
                }
                return e;
            }),
            (n._getColGroupY = function (t, e) {
                if (2 > e) {
                    return this.colYs[t];
                }
                var i = this.colYs.slice(t, t + e);
                return Math.max.apply(Math, i);
            }),
            (n._getHorizontalColPosition = function (t, e) {
                var i = this.horizontalColIndex % this.cols,
                    n = t > 1 && i + t > this.cols;
                i = n ? 0 : i;
                var o = e.size.outerWidth && e.size.outerHeight;
                return (this.horizontalColIndex = o ? i + t : this.horizontalColIndex), { col: i, y: this._getColGroupY(i, t) };
            }),
            (n._manageStamp = function (t) {
                var i = e(t),
                    n = this._getElementOffset(t),
                    o = this._getOption("originLeft"),
                    r = o ? n.left : n.right,
                    s = r + i.outerWidth,
                    a = Math.floor(r / this.columnWidth);
                a = Math.max(0, a);
                var h = Math.floor(s / this.columnWidth);
                (h -= s % this.columnWidth ? 0 : 1), (h = Math.min(this.cols - 1, h));
                for (var u = this._getOption("originTop"), d = (u ? n.top : n.bottom) + i.outerHeight, l = a; h >= l; l++) {
                    this.colYs[l] = Math.max(d, this.colYs[l]);
                }
            }),
            (n._getContainerSize = function () {
                this.maxY = Math.max.apply(Math, this.colYs);
                var t = { height: this.maxY };
                return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t;
            }),
            (n._getContainerFitWidth = function () {
                for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) {
                    t++;
                }
                return (this.cols - t) * this.columnWidth - this.gutter;
            }),
            (n.needsResizeLayout = function () {
                var t = this.containerWidth;
                return this.getContainerWidth(), t != this.containerWidth;
            }),
            i
        );
    });
/*! * imagesLoaded PACKAGED v4.1.4 * JavaScript is all like "You images are done yet or what?" * MIT License */
!(function (e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? (module.exports = t()) : (e.EvEmitter = t());
})("undefined" != typeof window ? window : this, function () {
    function e() { }
    var t = e.prototype;
    return (
        (t.on = function (e, t) {
            if (e && t) {
                var i = (this._events = this._events || {}),
                    n = (i[e] = i[e] || []);
                return n.indexOf(t) == -1 && n.push(t), this;
            }
        }),
        (t.once = function (e, t) {
            if (e && t) {
                this.on(e, t);
                var i = (this._onceEvents = this._onceEvents || {}),
                    n = (i[e] = i[e] || {});
                return (n[t] = !0), this;
            }
        }),
        (t.off = function (e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
                var n = i.indexOf(t);
                return n != -1 && i.splice(n, 1), this;
            }
        }),
        (t.emitEvent = function (e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
                (i = i.slice(0)), (t = t || []);
                for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
                    var r = i[o],
                        s = n && n[r];
                    s && (this.off(e, r), delete n[r]), r.apply(this, t);
                }
                return this;
            }
        }),
        (t.allOff = function () {
            delete this._events, delete this._onceEvents;
        }),
        e
    );
}),
    (function (e, t) {
        "function" == typeof define && define.amd
            ? define(["ev-emitter/ev-emitter"], function (i) {
                return t(e, i);
            })
            : "object" == typeof module && module.exports
                ? (module.exports = t(e, require("ev-emitter")))
                : (e.imagesLoaded = t(e, e.EvEmitter));
    })("undefined" != typeof window ? window : this, function (e, t) {
        function i(e, t) {
            for (var i in t) {
                e[i] = t[i];
            }
            return e;
        }
        function n(e) {
            if (Array.isArray(e)) {
                return e;
            }
            var t = "object" == typeof e && "number" == typeof e.length;
            return t ? d.call(e) : [e];
        }
        function o(e, t, r) {
            if (!(this instanceof o)) {
                return new o(e, t, r);
            }
            var s = e;
            return (
                "string" == typeof e && (s = document.querySelectorAll(e)),
                s
                    ? ((this.elements = n(s)),
                        (this.options = i({}, this.options)),
                        "function" == typeof t ? (r = t) : i(this.options, t),
                        r && this.on("always", r),
                        this.getImages(),
                        h && (this.jqDeferred = new h.Deferred()),
                        void setTimeout(this.check.bind(this)))
                    : void a.error("Bad element for imagesLoaded " + (s || e))
            );
        }
        function r(e) {
            this.img = e;
        }
        function s(e, t) {
            (this.url = e), (this.element = t), (this.img = new Image());
        }
        var h = e.jQuery,
            a = e.console,
            d = Array.prototype.slice;
        (o.prototype = Object.create(t.prototype)),
            (o.prototype.options = {}),
            (o.prototype.getImages = function () {
                (this.images = []), this.elements.forEach(this.addElementImages, this);
            }),
            (o.prototype.addElementImages = function (e) {
                "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);
                var t = e.nodeType;
                if (t && u[t]) {
                    for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                        var o = i[n];
                        this.addImage(o);
                    }
                    if ("string" == typeof this.options.background) {
                        var r = e.querySelectorAll(this.options.background);
                        for (n = 0; n < r.length; n++) {
                            var s = r[n];
                            this.addElementBackgroundImages(s);
                        }
                    }
                }
            });
        var u = { 1: !0, 9: !0, 11: !0 };
        return (
            (o.prototype.addElementBackgroundImages = function (e) {
                var t = getComputedStyle(e);
                if (t) {
                    for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
                        var o = n && n[2];
                        o && this.addBackground(o, e), (n = i.exec(t.backgroundImage));
                    }
                }
            }),
            (o.prototype.addImage = function (e) {
                var t = new r(e);
                this.images.push(t);
            }),
            (o.prototype.addBackground = function (e, t) {
                var i = new s(e, t);
                this.images.push(i);
            }),
            (o.prototype.check = function () {
                function e(e, i, n) {
                    setTimeout(function () {
                        t.progress(e, i, n);
                    });
                }
                var t = this;
                return (
                    (this.progressedCount = 0),
                    (this.hasAnyBroken = !1),
                    this.images.length
                        ? void this.images.forEach(function (t) {
                            t.once("progress", e), t.check();
                        })
                        : void this.complete()
                );
            }),
            (o.prototype.progress = function (e, t, i) {
                this.progressedCount++,
                    (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
                    this.emitEvent("progress", [this, e, t]),
                    this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e),
                    this.progressedCount == this.images.length && this.complete(),
                    this.options.debug && a && a.log("progress: " + i, e, t);
            }),
            (o.prototype.complete = function () {
                var e = this.hasAnyBroken ? "fail" : "done";
                if (((this.isComplete = !0), this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred)) {
                    var t = this.hasAnyBroken ? "reject" : "resolve";
                    this.jqDeferred[t](this);
                }
            }),
            (r.prototype = Object.create(t.prototype)),
            (r.prototype.check = function () {
                var e = this.getIsImageComplete();
                return e
                    ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
                    : ((this.proxyImage = new Image()),
                        this.proxyImage.addEventListener("load", this),
                        this.proxyImage.addEventListener("error", this),
                        this.img.addEventListener("load", this),
                        this.img.addEventListener("error", this),
                        void (this.proxyImage.src = this.img.src));
            }),
            (r.prototype.getIsImageComplete = function () {
                return this.img.complete && this.img.naturalWidth;
            }),
            (r.prototype.confirm = function (e, t) {
                (this.isLoaded = e), this.emitEvent("progress", [this, this.img, t]);
            }),
            (r.prototype.handleEvent = function (e) {
                var t = "on" + e.type;
                this[t] && this[t](e);
            }),
            (r.prototype.onload = function () {
                this.confirm(!0, "onload"), this.unbindEvents();
            }),
            (r.prototype.onerror = function () {
                this.confirm(!1, "onerror"), this.unbindEvents();
            }),
            (r.prototype.unbindEvents = function () {
                this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
            }),
            (s.prototype = Object.create(r.prototype)),
            (s.prototype.check = function () {
                this.img.addEventListener("load", this), this.img.addEventListener("error", this), (this.img.src = this.url);
                var e = this.getIsImageComplete();
                e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
            }),
            (s.prototype.unbindEvents = function () {
                this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
            }),
            (s.prototype.confirm = function (e, t) {
                (this.isLoaded = e), this.emitEvent("progress", [this, this.element, t]);
            }),
            (o.makeJQueryPlugin = function (t) {
                (t = t || e.jQuery),
                    t &&
                    ((h = t),
                        (h.fn.imagesLoaded = function (e, t) {
                            var i = new o(this, e, t);
                            return i.jqDeferred.promise(h(this));
                        }));
            }),
            o.makeJQueryPlugin(),
            o
        );
    });
!(function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("undefined" != typeof jQuery ? jQuery : window.Zepto);
})(function (e) {
    function t(t) {
        var r = t.data;
        t.isDefaultPrevented() || (t.preventDefault(), e(t.target).ajaxSubmit(r));
    }
    function r(t) {
        var r = t.target,
            a = e(r);
        if (!a.is("[type=submit],[type=image]")) {
            var n = a.closest("[type=submit]");
            if (0 === n.length) {
                return;
            }
            r = n[0];
        }
        var i = this;
        if (((i.clk = r), "image" == r.type)) {
            if (void 0 !== t.offsetX) {
                (i.clk_x = t.offsetX), (i.clk_y = t.offsetY);
            } else {
                if ("function" == typeof e.fn.offset) {
                    var o = a.offset();
                    (i.clk_x = t.pageX - o.left), (i.clk_y = t.pageY - o.top);
                } else {
                    (i.clk_x = t.pageX - r.offsetLeft), (i.clk_y = t.pageY - r.offsetTop);
                }
            }
        }
        setTimeout(function () {
            i.clk = i.clk_x = i.clk_y = null;
        }, 100);
    }
    function a() {
        if (e.fn.ajaxSubmit.debug) {
            var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t);
        }
    }
    var n = {};
    (n.fileapi = void 0 !== e("<input type='file'/>").get(0).files), (n.formdata = void 0 !== window.FormData);
    var i = !!e.fn.prop;
    (e.fn.attr2 = function () {
        if (!i) {
            return this.attr.apply(this, arguments);
        }
        var e = this.prop.apply(this, arguments);
        return (e && e.jquery) || "string" == typeof e ? e : this.attr.apply(this, arguments);
    }),
        (e.fn.ajaxSubmit = function (t) {
            function r(r) {
                var a,
                    n,
                    i = e.param(r, t.traditional).split("&"),
                    o = i.length,
                    s = [];
                for (a = 0; o > a; a++) {
                    (i[a] = i[a].replace(/\+/g, " ")), (n = i[a].split("=")), s.push([decodeURIComponent(n[0]), decodeURIComponent(n[1])]);
                }
                return s;
            }
            function o(a) {
                for (var n = new FormData(), i = 0; i < a.length; i++) {
                    n.append(a[i].name, a[i].value);
                }
                if (t.extraData) {
                    var o = r(t.extraData);
                    for (i = 0; i < o.length; i++) {
                        o[i] && n.append(o[i][0], o[i][1]);
                    }
                }
                t.data = null;
                var s = e.extend(!0, {}, e.ajaxSettings, t, { contentType: !1, processData: !1, cache: !1, type: u || "POST" });
                t.uploadProgress &&
                    (s.xhr = function () {
                        var r = e.ajaxSettings.xhr();
                        return (
                            r.upload &&
                            r.upload.addEventListener(
                                "progress",
                                function (e) {
                                    var r = 0,
                                        a = e.loaded || e.position,
                                        n = e.total;
                                    e.lengthComputable && (r = Math.ceil((a / n) * 100)), t.uploadProgress(e, a, n, r);
                                },
                                !1
                            ),
                            r
                        );
                    }),
                    (s.data = null);
                var c = s.beforeSend;
                return (
                    (s.beforeSend = function (e, r) {
                        (r.data = t.formData ? t.formData : n), c && c.call(this, e, r);
                    }),
                    e.ajax(s)
                );
            }
            function s(r) {
                function n(e) {
                    var t = null;
                    try {
                        e.contentWindow && (t = e.contentWindow.document);
                    } catch (r) {
                        a("cannot get iframe.contentWindow document: " + r);
                    }
                    if (t) {
                        return t;
                    }
                    try {
                        t = e.contentDocument ? e.contentDocument : e.document;
                    } catch (r) {
                        a("cannot get iframe.contentDocument: " + r), (t = e.document);
                    }
                    return t;
                }
                function o() {
                    function t() {
                        try {
                            var e = n(g).readyState;
                            a("state = " + e), e && "uninitialized" == e.toLowerCase() && setTimeout(t, 50);
                        } catch (r) {
                            a("Server abort: ", r, " (", r.name, ")"), s(k), j && clearTimeout(j), (j = void 0);
                        }
                    }
                    var r = f.attr2("target"),
                        i = f.attr2("action"),
                        o = "multipart/form-data",
                        c = f.attr("enctype") || f.attr("encoding") || o;
                    w.setAttribute("target", p),
                        (!u || /post/i.test(u)) && w.setAttribute("method", "POST"),
                        i != m.url && w.setAttribute("action", m.url),
                        m.skipEncodingOverride || (u && !/post/i.test(u)) || f.attr({ encoding: "multipart/form-data", enctype: "multipart/form-data" }),
                        m.timeout &&
                        (j = setTimeout(function () {
                            (T = !0), s(D);
                        }, m.timeout));
                    var l = [];
                    try {
                        if (m.extraData) {
                            for (var d in m.extraData) {
                                m.extraData.hasOwnProperty(d) &&
                                    l.push(
                                        e.isPlainObject(m.extraData[d]) && m.extraData[d].hasOwnProperty("name") && m.extraData[d].hasOwnProperty("value")
                                            ? e('<input type="hidden" name="' + m.extraData[d].name + '">')
                                                .val(m.extraData[d].value)
                                                .appendTo(w)[0]
                                            : e('<input type="hidden" name="' + d + '">')
                                                .val(m.extraData[d])
                                                .appendTo(w)[0]
                                    );
                            }
                        }
                        m.iframeTarget || v.appendTo("body"), g.attachEvent ? g.attachEvent("onload", s) : g.addEventListener("load", s, !1), setTimeout(t, 15);
                        try {
                            w.submit();
                        } catch (h) {
                            var x = document.createElement("form").submit;
                            x.apply(w);
                        }
                    } finally {
                        w.setAttribute("action", i), w.setAttribute("enctype", c), r ? w.setAttribute("target", r) : f.removeAttr("target"), e(l).remove();
                    }
                }
                function s(t) {
                    if (!x.aborted && !F) {
                        if (((M = n(g)), M || (a("cannot access response document"), (t = k)), t === D && x)) {
                            return x.abort("timeout"), void S.reject(x, "timeout");
                        }
                        if (t == k && x) {
                            return x.abort("server abort"), void S.reject(x, "error", "server abort");
                        }
                        if ((M && M.location.href != m.iframeSrc) || T) {
                            g.detachEvent ? g.detachEvent("onload", s) : g.removeEventListener("load", s, !1);
                            var r,
                                i = "success";
                            try {
                                if (T) {
                                    throw "timeout";
                                }
                                var o = "xml" == m.dataType || M.XMLDocument || e.isXMLDoc(M);
                                if ((a("isXml=" + o), !o && window.opera && (null === M.body || !M.body.innerHTML) && --O)) {
                                    return a("requeing onLoad callback, DOM not available"), void setTimeout(s, 250);
                                }
                                var u = M.body ? M.body : M.documentElement;
                                (x.responseText = u ? u.innerHTML : null),
                                    (x.responseXML = M.XMLDocument ? M.XMLDocument : M),
                                    o && (m.dataType = "xml"),
                                    (x.getResponseHeader = function (e) {
                                        var t = { "content-type": m.dataType };
                                        return t[e.toLowerCase()];
                                    }),
                                    u && ((x.status = Number(u.getAttribute("status")) || x.status), (x.statusText = u.getAttribute("statusText") || x.statusText));
                                var c = (m.dataType || "").toLowerCase(),
                                    l = /(json|script|text)/.test(c);
                                if (l || m.textarea) {
                                    var f = M.getElementsByTagName("textarea")[0];
                                    if (f) {
                                        (x.responseText = f.value), (x.status = Number(f.getAttribute("status")) || x.status), (x.statusText = f.getAttribute("statusText") || x.statusText);
                                    } else {
                                        if (l) {
                                            var p = M.getElementsByTagName("pre")[0],
                                                h = M.getElementsByTagName("body")[0];
                                            p ? (x.responseText = p.textContent ? p.textContent : p.innerText) : h && (x.responseText = h.textContent ? h.textContent : h.innerText);
                                        }
                                    }
                                } else {
                                    "xml" == c && !x.responseXML && x.responseText && (x.responseXML = X(x.responseText));
                                }
                                try {
                                    E = _(x, c, m);
                                } catch (y) {
                                    (i = "parsererror"), (x.error = r = y || i);
                                }
                            } catch (y) {
                                a("error caught: ", y), (i = "error"), (x.error = r = y || i);
                            }
                            x.aborted && (a("upload aborted"), (i = null)),
                                x.status && (i = (x.status >= 200 && x.status < 300) || 304 === x.status ? "success" : "error"),
                                "success" === i
                                    ? (m.success && m.success.call(m.context, E, "success", x), S.resolve(x.responseText, "success", x), d && e.event.trigger("ajaxSuccess", [x, m]))
                                    : i && (void 0 === r && (r = x.statusText), m.error && m.error.call(m.context, x, i, r), S.reject(x, "error", r), d && e.event.trigger("ajaxError", [x, m, r])),
                                d && e.event.trigger("ajaxComplete", [x, m]),
                                d && !--e.active && e.event.trigger("ajaxStop"),
                                m.complete && m.complete.call(m.context, x, i),
                                (F = !0),
                                m.timeout && clearTimeout(j),
                                setTimeout(function () {
                                    m.iframeTarget ? v.attr("src", m.iframeSrc) : v.remove(), (x.responseXML = null);
                                }, 100);
                        }
                    }
                }
                var c,
                    l,
                    m,
                    d,
                    p,
                    v,
                    g,
                    x,
                    y,
                    b,
                    T,
                    j,
                    w = f[0],
                    S = e.Deferred();
                if (
                    ((S.abort = function (e) {
                        x.abort(e);
                    }),
                        r)
                ) {
                    for (l = 0; l < h.length; l++) {
                        (c = e(h[l])), i ? c.prop("disabled", !1) : c.removeAttr("disabled");
                    }
                }
                if (
                    ((m = e.extend(!0, {}, e.ajaxSettings, t)),
                        (m.context = m.context || m),
                        (p = "jqFormIO" + new Date().getTime()),
                        m.iframeTarget
                            ? ((v = e(m.iframeTarget)), (b = v.attr2("name")), b ? (p = b) : v.attr2("name", p))
                            : ((v = e('<iframe name="' + p + '" src="' + m.iframeSrc + '" />')), v.css({ position: "absolute", top: "-1000px", left: "-1000px" })),
                        (g = v[0]),
                        (x = {
                            aborted: 0,
                            responseText: null,
                            responseXML: null,
                            status: 0,
                            statusText: "n/a",
                            getAllResponseHeaders: function () { },
                            getResponseHeader: function () { },
                            setRequestHeader: function () { },
                            abort: function (t) {
                                var r = "timeout" === t ? "timeout" : "aborted";
                                a("aborting upload... " + r), (this.aborted = 1);
                                try {
                                    g.contentWindow.document.execCommand && g.contentWindow.document.execCommand("Stop");
                                } catch (n) { }
                                v.attr("src", m.iframeSrc), (x.error = r), m.error && m.error.call(m.context, x, r, t), d && e.event.trigger("ajaxError", [x, m, r]), m.complete && m.complete.call(m.context, x, r);
                            },
                        }),
                        (d = m.global),
                        d && 0 === e.active++ && e.event.trigger("ajaxStart"),
                        d && e.event.trigger("ajaxSend", [x, m]),
                        m.beforeSend && m.beforeSend.call(m.context, x, m) === !1)
                ) {
                    return m.global && e.active--, S.reject(), S;
                }
                if (x.aborted) {
                    return S.reject(), S;
                }
                (y = w.clk), y && ((b = y.name), b && !y.disabled && ((m.extraData = m.extraData || {}), (m.extraData[b] = y.value), "image" == y.type && ((m.extraData[b + ".x"] = w.clk_x), (m.extraData[b + ".y"] = w.clk_y))));
                var D = 1,
                    k = 2,
                    A = e("meta[name=csrf-token]").attr("content"),
                    L = e("meta[name=csrf-param]").attr("content");
                L && A && ((m.extraData = m.extraData || {}), (m.extraData[L] = A)), m.forceSync ? o() : setTimeout(o, 10);
                var E,
                    M,
                    F,
                    O = 50,
                    X =
                        e.parseXML ||
                        function (e, t) {
                            return (
                                window.ActiveXObject ? ((t = new ActiveXObject("Microsoft.XMLDOM")), (t.async = "false"), t.loadXML(e)) : (t = new DOMParser().parseFromString(e, "text/xml")),
                                t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null
                            );
                        },
                    C =
                        e.parseJSON ||
                        function (e) {
                            return window.eval("(" + e + ")");
                        },
                    _ = function (t, r, a) {
                        var n = t.getResponseHeader("content-type") || "",
                            i = "xml" === r || (!r && n.indexOf("xml") >= 0),
                            o = i ? t.responseXML : t.responseText;
                        return (
                            i && "parsererror" === o.documentElement.nodeName && e.error && e.error("parsererror"),
                            a && a.dataFilter && (o = a.dataFilter(o, r)),
                            "string" == typeof o && ("json" === r || (!r && n.indexOf("json") >= 0) ? (o = C(o)) : ("script" === r || (!r && n.indexOf("javascript") >= 0)) && e.globalEval(o)),
                            o
                        );
                    };
                return S;
            }
            if (!this.length) {
                return a("ajaxSubmit: skipping submit process - no element selected"), this;
            }
            var u,
                c,
                l,
                f = this;
            "function" == typeof t ? (t = { success: t }) : void 0 === t && (t = {}),
                (u = t.type || this.attr2("method")),
                (c = t.url || this.attr2("action")),
                (l = "string" == typeof c ? e.trim(c) : ""),
                (l = l || window.location.href || ""),
                l && (l = (l.match(/^([^#]+)/) || [])[1]),
                (t = e.extend(!0, { url: l, success: e.ajaxSettings.success, type: u || e.ajaxSettings.type, iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank" }, t));
            var m = {};
            if ((this.trigger("form-pre-serialize", [this, t, m]), m.veto)) {
                return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
            }
            if (t.beforeSerialize && t.beforeSerialize(this, t) === !1) {
                return a("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
            }
            var d = t.traditional;
            void 0 === d && (d = e.ajaxSettings.traditional);
            var p,
                h = [],
                v = this.formToArray(t.semantic, h);
            if ((t.data && ((t.extraData = t.data), (p = e.param(t.data, d))), t.beforeSubmit && t.beforeSubmit(v, this, t) === !1)) {
                return a("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
            }
            if ((this.trigger("form-submit-validate", [v, this, t, m]), m.veto)) {
                return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
            }
            var g = e.param(v, d);
            p && (g = g ? g + "&" + p : p), "GET" == t.type.toUpperCase() ? ((t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + g), (t.data = null)) : (t.data = g);
            var x = [];
            if (
                (t.resetForm &&
                    x.push(function () {
                        f.resetForm();
                    }),
                    t.clearForm &&
                    x.push(function () {
                        f.clearForm(t.includeHidden);
                    }),
                    !t.dataType && t.target)
            ) {
                var y = t.success || function () { };
                x.push(function (r) {
                    var a = t.replaceTarget ? "replaceWith" : "html";
                    e(t.target)[a](r).each(y, arguments);
                });
            } else {
                t.success && x.push(t.success);
            }
            if (
                ((t.success = function (e, r, a) {
                    for (var n = t.context || this, i = 0, o = x.length; o > i; i++) {
                        x[i].apply(n, [e, r, a || f, f]);
                    }
                }),
                    t.error)
            ) {
                var b = t.error;
                t.error = function (e, r, a) {
                    var n = t.context || this;
                    b.apply(n, [e, r, a, f]);
                };
            }
            if (t.complete) {
                var T = t.complete;
                t.complete = function (e, r) {
                    var a = t.context || this;
                    T.apply(a, [e, r, f]);
                };
            }
            var j = e("input[type=file]:enabled", this).filter(function () {
                return "" !== e(this).val();
            }),
                w = j.length > 0,
                S = "multipart/form-data",
                D = f.attr("enctype") == S || f.attr("encoding") == S,
                k = n.fileapi && n.formdata;
            a("fileAPI :" + k);
            var A,
                L = (w || D) && !k;
            t.iframe !== !1 && (t.iframe || L)
                ? t.closeKeepAlive
                    ? e.get(t.closeKeepAlive, function () {
                        A = s(v);
                    })
                    : (A = s(v))
                : (A = (w || D) && k ? o(v) : e.ajax(t)),
                f.removeData("jqxhr").data("jqxhr", A);
            for (var E = 0; E < h.length; E++) {
                h[E] = null;
            }
            return this.trigger("form-submit-notify", [this, t]), this;
        }),
        (e.fn.ajaxForm = function (n) {
            if (((n = n || {}), (n.delegation = n.delegation && e.isFunction(e.fn.on)), !n.delegation && 0 === this.length)) {
                var i = { s: this.selector, c: this.context };
                return !e.isReady && i.s
                    ? (a("DOM not ready, queuing ajaxForm"),
                        e(function () {
                            e(i.s, i.c).ajaxForm(n);
                        }),
                        this)
                    : (a("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this);
            }
            return n.delegation
                ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, n, t).on("click.form-plugin", this.selector, n, r), this)
                : this.ajaxFormUnbind().bind("submit.form-plugin", n, t).bind("click.form-plugin", n, r);
        }),
        (e.fn.ajaxFormUnbind = function () {
            return this.unbind("submit.form-plugin click.form-plugin");
        }),
        (e.fn.formToArray = function (t, r) {
            var a = [];
            if (0 === this.length) {
                return a;
            }
            var i,
                o = this[0],
                s = this.attr("id"),
                u = t ? o.getElementsByTagName("*") : o.elements;
            if ((u && !/MSIE [678]/.test(navigator.userAgent) && (u = e(u).get()), s && ((i = e(':input[form="' + s + '"]').get()), i.length && (u = (u || []).concat(i))), !u || !u.length)) {
                return a;
            }
            var c, l, f, m, d, p, h;
            for (c = 0, p = u.length; p > c; c++) {
                if (((d = u[c]), (f = d.name), f && !d.disabled)) {
                    if (t && o.clk && "image" == d.type) {
                        o.clk == d && (a.push({ name: f, value: e(d).val(), type: d.type }), a.push({ name: f + ".x", value: o.clk_x }, { name: f + ".y", value: o.clk_y }));
                    } else {
                        if (((m = e.fieldValue(d, !0)), m && m.constructor == Array)) {
                            for (r && r.push(d), l = 0, h = m.length; h > l; l++) {
                                a.push({ name: f, value: m[l] });
                            }
                        } else {
                            if (n.fileapi && "file" == d.type) {
                                r && r.push(d);
                                var v = d.files;
                                if (v.length) {
                                    for (l = 0; l < v.length; l++) {
                                        a.push({ name: f, value: v[l], type: d.type });
                                    }
                                } else {
                                    a.push({ name: f, value: "", type: d.type });
                                }
                            } else {
                                null !== m && "undefined" != typeof m && (r && r.push(d), a.push({ name: f, value: m, type: d.type, required: d.required }));
                            }
                        }
                    }
                }
            }
            if (!t && o.clk) {
                var g = e(o.clk),
                    x = g[0];
                (f = x.name), f && !x.disabled && "image" == x.type && (a.push({ name: f, value: g.val() }), a.push({ name: f + ".x", value: o.clk_x }, { name: f + ".y", value: o.clk_y }));
            }
            return a;
        }),
        (e.fn.formSerialize = function (t) {
            return e.param(this.formToArray(t));
        }),
        (e.fn.fieldSerialize = function (t) {
            var r = [];
            return (
                this.each(function () {
                    var a = this.name;
                    if (a) {
                        var n = e.fieldValue(this, t);
                        if (n && n.constructor == Array) {
                            for (var i = 0, o = n.length; o > i; i++) {
                                r.push({ name: a, value: n[i] });
                            }
                        } else {
                            null !== n && "undefined" != typeof n && r.push({ name: this.name, value: n });
                        }
                    }
                }),
                e.param(r)
            );
        }),
        (e.fn.fieldValue = function (t) {
            for (var r = [], a = 0, n = this.length; n > a; a++) {
                var i = this[a],
                    o = e.fieldValue(i, t);
                null === o || "undefined" == typeof o || (o.constructor == Array && !o.length) || (o.constructor == Array ? e.merge(r, o) : r.push(o));
            }
            return r;
        }),
        (e.fieldValue = function (t, r) {
            var a = t.name,
                n = t.type,
                i = t.tagName.toLowerCase();
            if (
                (void 0 === r && (r = !0),
                    r && (!a || t.disabled || "reset" == n || "button" == n || (("checkbox" == n || "radio" == n) && !t.checked) || (("submit" == n || "image" == n) && t.form && t.form.clk != t) || ("select" == i && -1 == t.selectedIndex)))
            ) {
                return null;
            }
            if ("select" == i) {
                var o = t.selectedIndex;
                if (0 > o) {
                    return null;
                }
                for (var s = [], u = t.options, c = "select-one" == n, l = c ? o + 1 : u.length, f = c ? o : 0; l > f; f++) {
                    var m = u[f];
                    if (m.selected) {
                        var d = m.value;
                        if ((d || (d = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value), c)) {
                            return d;
                        }
                        s.push(d);
                    }
                }
                return s;
            }
            return e(t).val();
        }),
        (e.fn.clearForm = function (t) {
            return this.each(function () {
                e("input,select,textarea", this).clearFields(t);
            });
        }),
        (e.fn.clearFields = e.fn.clearInputs = function (t) {
            var r = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
            return this.each(function () {
                var a = this.type,
                    n = this.tagName.toLowerCase();
                r.test(a) || "textarea" == n
                    ? (this.value = "")
                    : "checkbox" == a || "radio" == a
                        ? (this.checked = !1)
                        : "select" == n
                            ? (this.selectedIndex = -1)
                            : "file" == a
                                ? /MSIE/.test(navigator.userAgent)
                                    ? e(this).replaceWith(e(this).clone(!0))
                                    : e(this).val("")
                                : t && ((t === !0 && /hidden/.test(a)) || ("string" == typeof t && e(this).is(t))) && (this.value = "");
            });
        }),
        (e.fn.resetForm = function () {
            return this.each(function () {
                ("function" == typeof this.reset || ("object" == typeof this.reset && !this.reset.nodeType)) && this.reset();
            });
        }),
        (e.fn.enable = function (e) {
            return (
                void 0 === e && (e = !0),
                this.each(function () {
                    this.disabled = !e;
                })
            );
        }),
        (e.fn.selected = function (t) {
            return (
                void 0 === t && (t = !0),
                this.each(function () {
                    var r = this.type;
                    if ("checkbox" == r || "radio" == r) {
                        this.checked = t;
                    } else {
                        if ("option" == this.tagName.toLowerCase()) {
                            var a = e(this).parent("select");
                            t && a[0] && "select-one" == a[0].type && a.find("option").selected(!1), (this.selected = t);
                        }
                    }
                })
            );
        }),
        (e.fn.ajaxSubmit.debug = !1);
});
$.cookie = function (key, value, options) {
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = $.extend({}, options);
        if (value === null || value === undefined) {
            options.expires = -1;
        }
        if (typeof options.expires === "number") {
            var days = options.expires,
                t = (options.expires = new Date());
            t.setDate(t.getDate() + days);
        }
        value = String(value);
        return (document.cookie = [
            encodeURIComponent(key),
            "=",
            options.raw ? value : encodeURIComponent(value),
            options.expires ? "; expires=" + options.expires.toUTCString() : "",
            options.path ? "; path=" + options.path : "",
            options.domain ? "; domain=" + options.domain : "",
            options.secure ? "; secure" : "",
        ].join(""));
    }
    options = value || {};
    var result,
        decode = options.raw
            ? function (s) {
                return s;
            }
            : decodeURIComponent;
    return (result = new RegExp("(?:^|; )" + encodeURIComponent(key) + "=([^;]*)").exec(document.cookie)) ? decode(result[1]) : null;
};
!(function (e, n, t) {
    "undefined" != typeof module && module.exports
        ? (module.exports = t(n, e))
        : "function" == typeof define && define.amd
            ? define("detect-zoom", function () {
                return t(n, e);
            })
            : (e[n] = t(n, e));
})(window, "detectZoom", function () {
    var e = function () {
        return window.devicePixelRatio || 1;
    },
        n = function () {
            return { zoom: 1, devicePxPerCssPx: 1 };
        },
        t = function () {
            var n = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100) / 100;
            return { zoom: n, devicePxPerCssPx: n * e() };
        },
        i = function () {
            var n = Math.round((document.documentElement.offsetHeight / window.innerHeight) * 100) / 100;
            return { zoom: n, devicePxPerCssPx: n * e() };
        },
        o = function () {
            var n = Math.round((window.outerWidth / window.innerWidth) * 100) / 100;
            return { zoom: n, devicePxPerCssPx: n * e() };
        },
        r = function () {
            var n = Math.round((document.documentElement.clientWidth / window.innerWidth) * 100) / 100;
            return { zoom: n, devicePxPerCssPx: n * e() };
        },
        d = function () {
            var n = 90 == Math.abs(window.orientation) ? screen.height : screen.width,
                t = n / window.innerWidth;
            return { zoom: t, devicePxPerCssPx: t * e() };
        },
        u = function () {
            var n = function (e) {
                return e.replace(/;/g, " !important;");
            },
                t = document.createElement("div");
            (t.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0"),
                t.setAttribute("style", n("font: 100px/1em sans-serif; -webkit-text-size-adjust: none; text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;"));
            var i = document.createElement("div");
            i.setAttribute("style", n("width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;")), i.appendChild(t), document.body.appendChild(i);
            var o = 1000 / t.clientHeight;
            return (o = Math.round(100 * o) / 100), document.body.removeChild(i), { zoom: o, devicePxPerCssPx: o * e() };
        },
        a = function () {
            var e = m("min--moz-device-pixel-ratio", "", 0, 10, 20, 0.0001);
            return (e = Math.round(100 * e) / 100), { zoom: e, devicePxPerCssPx: e };
        },
        c = function () {
            return { zoom: a().zoom, devicePxPerCssPx: e() };
        },
        s = function () {
            var n = window.top.outerWidth / window.top.innerWidth;
            return (n = Math.round(100 * n) / 100), { zoom: n, devicePxPerCssPx: n * e() };
        },
        m = function (e, n, t, i, o, r) {
            function d(t, i, o) {
                var a = (t + i) / 2;
                if (0 >= o || r > i - t) {
                    return a;
                }
                var c = "(" + e + ":" + a + n + ")";
                return u(c).matches ? d(a, i, o - 1) : d(t, a, o - 1);
            }
            var u, a, c, s;
            window.matchMedia
                ? (u = window.matchMedia)
                : ((a = document.getElementsByTagName("head")[0]),
                    (c = document.createElement("style")),
                    a.appendChild(c),
                    (s = document.createElement("div")),
                    (s.className = "mediaQueryBinarySearch"),
                    (s.style.display = "none"),
                    document.body.appendChild(s),
                    (u = function (e) {
                        c.sheet.insertRule("@media " + e + "{.mediaQueryBinarySearch {text-decoration: underline} }", 0);
                        var n = "underline" == getComputedStyle(s, null).textDecoration;
                        return c.sheet.deleteRule(0), { matches: n };
                    }));
            var m = d(t, i, o);
            return s && (a.removeChild(c), document.body.removeChild(s)), m;
        },
        l = (function () {
            var e = n;
            return (
                isNaN(screen.logicalXDPI) || isNaN(screen.systemXDPI)
                    ? window.navigator.msMaxTouchPoints
                        ? (e = i)
                        : window.chrome && !(window.opera || navigator.userAgent.indexOf(" Opera") >= 0)
                            ? (e = o)
                            : Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0
                                ? (e = r)
                                : "orientation" in window && "webkitRequestAnimationFrame" in window
                                    ? (e = d)
                                    : "webkitRequestAnimationFrame" in window
                                        ? (e = u)
                                        : navigator.userAgent.indexOf("Opera") >= 0
                                            ? (e = s)
                                            : window.devicePixelRatio
                                                ? (e = c)
                                                : a().zoom > 0.001 && (e = a)
                    : (e = t),
                e
            );
        })();
    return {
        zoom: function () {
            return l().zoom;
        },
        device: function () {
            return l().devicePxPerCssPx;
        },
    };
});
window.inAction = 1;
window.allowSlide = 1;
window.blockScroll = 1;
window.effectOffset = 500;
window.effectSpeed = 1000;
window.slideSpeed = 1000;
window.cleanupDelay = 1400;
window.horizontalMode = 0;
window.sidebarShown = 0;
window.loadingProgress = 0;
window.smoothScroll = 0;
window.scrollSpeed = 0.5;
window.preload = 1;
window.setHashLink = 1;
window.hideSidebarOnBodyClick = 1;
window.collectScrolls = 0;
window.sliderStatus = 0;
window.minScrollToSlide = 500;
window.minSwipeToSlide = 4;
window.enableMobileZoom = 0;
window.hideOnScrollSensitivity = 100;
window.allowParallaxOnMobile = 1;
window.hidePopupOnBodyClick = 1;
var $html = $("html");
$(window).on("load", function () {
    window.loaded = 1;
});
$(document).ready(function () {
    var $body = $("body");
    setTimeout(function () {
        $(window).trigger("ready");
    }, 1);
    $body.hide().show(0);
    window.isScroll = $body.hasClass("scroll");
    window.isSimplifiedMobile = $body.hasClass("simplifiedMobile");
    if (window.isScroll || (window.isSimplifiedMobile && window.isMobile)) {
        $html.addClass("scrollable");
    }
    $html.addClass("page-ready");
    if ($body.hasClass("fast")) {
        window.slideSpeed = 700;
        window.cleanupDelay = 1200;
        window.effectSpeed = 800;
        window.scrollSpeed = 0.35;
        window.effectOffset = 400;
    } else {
        if ($body.hasClass("slow")) {
            window.slideSpeed = 1400;
            window.cleanupDelay = 2000;
            window.effectSpeed = 1400;
            window.effectOffset = 400;
            window.scrollSpeed = 0.8;
            window.effectOffset = 600;
        }
    }
    window.stage = 1;
    window.stages = $(".slide").length;
    if ($body.hasClass("horizontal")) {
        window.horizontalMode = 1;
    }
    if ($body.hasClass("noPreload")) {
        window.preload = 0;
    }
    if ($body.hasClass("animated")) {
        window.isAnimated = "auto";
    } else {
        if ($body.hasClass("animateOnEvent")) {
            window.isAnimated = "animateOnEvent";
            if (window.isMobile) {
                window.isAnimated = "auto";
                $body.removeClass("animateOnEvent").addClass("animated");
            }
        }
    }
    if (window.isSimplifiedMobile && window.isMobile) {
        window.isAnimated = false;
        $body.removeClass("animated animateOnEvent");
        $("[class*='ae-']").addClass("done");
    }
    if (!window.isAnimated) {
        window.cleanupDelay = 0;
    }
    if ($body.hasClass("smoothScroll") && !window.isMobile) {
        window.smoothScroll = 1;
    }
    function updateHash() {
        var hashLink = window.location.href.split("#")[1];
        if (hashLink) {
            if ($('.slide[data-name="' + hashLink + '"]').length > 0) {
                var requestedElement = $('.slide[data-name="' + hashLink + '"]');
                if ((window.isMobile && window.isSimplifiedMobile) || window.isScroll) {
                    if (requestedElement.length) {
                        if (!window.preload || window.loaded) {
                            $("html,body").stop().clearQueue().animate({ scrollTop: requestedElement.position().top }, window.effectSpeed);
                        } else {
                            $(window).on("load", function () {
                                $("html,body").stop().clearQueue().animate({ scrollTop: requestedElement.position().top }, window.effectSpeed);
                            });
                        }
                    }
                } else {
                    window.stage = $(".slide").index(requestedElement) + 1;
                    showSlide(window.stage);
                }
            }
        }
    }
    updateHash();
    $(window).on("popstate", function (e) {
        setTimeout(function () {
            updateHash();
        }, 100);
        e.preventDefault();
    });
    if (window.preload) {
        var imgs = [];
        $("*").each(function () {
            if ($(this).css("background-image") !== "none") {
                imgs.push(
                    $(this)
                        .css("background-image")
                        .replace(/.*\s?url\([\'\"]?/, "")
                        .replace(/[\'\"]?\).*/, "")
                );
            } else {
                if ($(this).is("img")) {
                    imgs.push($(this).attr("src"));
                }
            }
        });
        window.images = imgs.length;
        window.progressBar = $(".progress-bar");
        $.cacheImage(imgs, {
            complete: function () {
                window.loadingProgress++;
                updateProgressBar();
            },
        });
        function updateProgressBar() {
            var progress = window.loadingProgress / window.images;
            window.progressBar.css("width", progress * 100 + "%");
            if (window.loadingProgress == window.images) {
                window.progressBar.addClass("loaded");
            }
        }
        updateProgressBar();
    }
    showSlide(window.stage);
    $(".grid.masonry").masonry({ itemSelector: "li", transitionDuration: "0.1s" });
    $(".grid.masonry")
        .imagesLoaded()
        .progress(function () {
            $(".grid.masonry").masonry("layout");
        });
    if (!window.preload || !window.images || window.loaded) {
        runTheCode();
    }
    if (!window.loaded) {
        $(window).on("load", function () {
            runTheCode();
        });
    }
    function runTheCode() {
        $html.addClass("page-loaded");
        window.inAction = 0;
        window.blockScroll = 0;
        window.loaded = 1;
        setTimeout(function () {
            if (window.isScroll) {
                updateScroll();
                updateNavigation();
            }
            if (window.isMobile && window.isSimplifiedMobile) {
                $(".slide").addClass("selected animate active");
                updateScroll();
                updateNavigation();
            } else {
                showSlide(window.stage);
            }
        }, 500);
    }
    function showSlide(requested) {
        requested = parseInt(requested);
        if ((window.isMobile && window.isSimplifiedMobile) || window.isScroll) {
            return;
        }
        updateNavigation();
        var newSlide = $(".slide").eq(requested - 1),
            currenSlide = $(".slide.selected"),
            currenSlideIndex = currenSlide.index(".slide") + 1;
        hideDropdown();
        unzoomImage();
        hideSidebar();
        window.allowSlide = 1;
        $body.removeClass("sidebarShown lastSlide firstSlide hidePanel-top hidePanel-bottom");
        if (window.setStageClasses != 0) {
            if (window.stage === 1) {
                $body.addClass("firstSlide");
            }
            if (window.stages === window.stage && window.stages !== 1) {
                $body.addClass("lastSlide");
            }
            $body.removeClassByPrefix("stage-").addClass("stage-" + window.stage);
        }
        if (newSlide.hasClass("whiteSlide")) {
            $body.addClass("whiteSlide");
        } else {
            $body.removeClass("whiteSlide");
        }
        if (currenSlideIndex !== requested && window.setStageClasses != 0) {
            currenSlide.removeClass("selected").addClass("active");
            newSlide.removeClass("before after").addClass("selected active");
            newSlide.prevAll(".slide").addClass("before").removeClass("after");
            newSlide.nextAll(".slide").addClass("after").removeClass("before");
            $(window).trigger("slideChange", [parseInt(requested), newSlide]);
        }
        if (window.setHashLink) {
            if (newSlide.attr("data-name") || newSlide.attr("id")) {
                window.location.hash = newSlide.attr("data-name") ? newSlide.attr("data-name") : newSlide.attr("id");
            } else {
                if (window.location.toString().indexOf("#") > 0 && location.protocol !== "file:" && location.href.split("#")[0]) {
                    if (history.pushState) {
                        window.history.pushState("", "", location.href.split("#")[0]);
                    } else {
                        window.location.hash = "";
                    }
                }
            }
        }
        newSlide.find(".content, .container").scrollTop(0);
        if (window.loaded) {
            window.blockScroll = 1;
            setTimeout(function () {
                if (currenSlideIndex !== requested) {
                    currenSlide.removeClass("active animate");
                }
                window.blockScroll = 0;
            }, window.effectSpeed);
            if (window.effectOffset > window.slideSpeed) {
                window.effectOffset = window.slideSpeed;
            }
            setTimeout(function () {
                newSlide.addClass("animate");
            }, window.slideSpeed - window.effectOffset);
            $(".done").removeClass("done");
            clearTimeout(window.clearElementAnimation);
            window.clearElementAnimation = setTimeout(function () {
                $(".slide.selected [class*='ae-']").addClass("done");
            }, window.slideSpeed + window.effectSpeed + window.cleanupDelay);
        }
    }
    $(".animated").on("click", "[class*='ae-']:not('.done')", function () {
        $(this).addClass("done");
    });
    window.changeSlide = function (n) {
        if (n === "increase") {
            if (window.stage + 1 >= window.stages) {
                n = window.stages;
            } else {
                n = window.stage + 1;
            }
        } else {
            if (n === "decrease") {
                if (window.stage - 1 < 1) {
                    n = 1;
                } else {
                    n = window.stage - 1;
                }
            }
        }
        if ((window.isMobile && window.isSimplifiedMobile) || window.isScroll) {
            window.stage = n;
            var requestedElement = $(".slide:eq(" + (window.stage - 1) + ")"),
                finalPosition = $(requestedElement).offset().top;
            $("html,body").stop().clearQueue().animate({ scrollTop: finalPosition }, 1000);
        } else {

            //console.log(window.stage);
            if (n !== window.stage && n <= window.stages) {
                if (window.inAction !== 1) {
                    window.inAction = 1;
                    window.stage = n;
                    var delay = 0;
                    if ($(".zoom-overlay-open").length > 0) {
                        unzoomImage();
                        delay = 550;
                    }
                    //console.log("n: " + n);
                    setTimeout(function () {
                        showSlide(window.stage);
                        setTimeout(function () {
                            window.inAction = 0;
                        }, window.slideSpeed);
                    }, delay);
                }
            }
        }
    };
    $(".nextSlide").on("click", function () {
        window.changeSlide("increase");
    });
    $(".prevSlide").on("click", function () {
        window.changeSlide("decrease");
    });
    $(".toFirstSlide").on("click", function () {
        window.changeSlide(1);
        if (history.pushState) {
            window.history.pushState("", "", location.href.split("#")[0]);
        } else {
            window.location.hash = "";
        }
        hideSidebar();
    });
    $(".toLastSlide").on("click", function () {
        window.changeSlide(window.stages);
        if (history.pushState) {
            window.history.pushState("", "", location.href.split("#")[0]);
        } else {
            window.location.hash = "";
        }
        hideSidebar();
    });
    $('[class*="toSlide-"]').on("click", function () {
        var num = parseInt($(this).attr("class").split("toSlide-")[1]);
        window.changeSlide(num);
        hideSidebar();
    });
    function unzoomImage(type) {
        if ($(".zoom-overlay-open").length > 0) {
            $(".zoom-img").click();
            if (type) {
                $(".zoom-img-wrap, .zoom-overlay").remove();
            }
        }
    }
    $(window).on("resize load ready", function () {
        $('[data-action="zoom"]').removeAttr("style");
        if ($(".zoom-overlay").length > 0) {
            unzoomImage("fast");
        }
        window.windowHeight = $(window).height();
        window.windowWidth = $(window).width();
        window.documentHeight = $(document).height();
    });
    var eventCount = 0,
        eventCountStart;
    $("html,body").on("DOMMouseScroll mousewheel scroll touchmove", function (event) {
        var $currentSection = $(".slide.selected .content"),
            scrollsize = Math.ceil(Math.abs(event.deltaY) * event.deltaFactor),
            browserScrollRate = window.isFirefox ? 2 : 1,
            OSScrollRate = window.isWindows ? browserScrollRate * 2 : browserScrollRate,
            wheelDelta = event.originalEvent.wheelDelta ? event.originalEvent.wheelDelta : event.deltaY * event.deltaFactor,
            energy = wheelDelta * browserScrollRate * OSScrollRate,
            scrollDirection = event.deltaY >= 0 ? "up" : "down",
            curSecScrolltop = $currentSection.scrollTop(),
            currentSectionHeight = $currentSection.find(".container").outerHeight(),
            deviceZoom = detectZoom.device(),
            minScrollToSlide = window.isFirefox && window.isWindows ? 200 : window.minScrollToSlide;
        if (!scrollsize) {
            return;
        }
        if (window.isScroll && !window.sidebarShown && !window.popupShown && !window.blockScroll) {
            if (window.smoothScroll && !window.isMobile) {
                event.preventDefault();
                if (energy > 1500) {
                    energy = 1500;
                }
                if (energy < -1000) {
                    energy = -1500;
                }
                var scrollObject = $(window),
                    scrollTop = scrollObject.scrollTop(),
                    finalScroll = scrollTop - energy;
                TweenLite.to(scrollObject, window.scrollSpeed, { scrollTo: { y: finalScroll, autoKill: false }, ease: Power4.easeOut, overwrite: "all" });
            } else {
                if (!window.isWindows) {
                    $currentSection.scrollTop(curSecScrolltop - energy);
                }
            }
        }
        if (!window.isScroll && !(window.isMobile && window.isSimplifiedMobile)) {
            if (currentSectionHeight > window.windowHeight) {
                if ((scrollDirection === "up" && $currentSection.scrollTop() === 0) || (scrollDirection === "down" && $currentSection.scrollTop() + window.windowHeight >= Math.floor(currentSectionHeight / deviceZoom))) {
                    window.allowSlide = 1;
                } else {
                    window.allowSlide = 0;
                }
                if (window.panelsToHide) {
                    if (scrollDirection === "down" && $currentSection.scrollTop() > 0) {
                        $body.addClass("hidePanel-top");
                    } else {
                        if (scrollDirection === "up") {
                            $body.removeClass("hidePanel-top");
                        }
                    }
                    $body.addClass("hidePanel-bottom");
                    if (scrollDirection === "down" && $currentSection.scrollTop() + window.windowHeight >= Math.floor(currentSectionHeight / deviceZoom)) {
                        $body.removeClass("hidePanel-bottom");
                    } else {
                        if (scrollDirection === "up") {
                            $body.addClass("hidePanel-bottom");
                        }
                    }
                }
                if (!window.sidebarShown && !window.popupShown && !window.blockScroll) {
                    if (window.smoothScroll) {
                        event.preventDefault();
                        if (energy > 1500) {
                            energy = 1500;
                        }
                        if (energy < -1000) {
                            energy = -1500;
                        }
                        TweenLite.to($currentSection, 0.5, { scrollTo: { y: curSecScrolltop - energy, autoKill: false }, ease: Power4.easeOut, overwrite: 5 });
                    } else {
                        curSecScrolltop = scrollDirection === "up" ? curSecScrolltop - scrollsize : curSecScrolltop + scrollsize;
                        $currentSection.scrollTop(curSecScrolltop);
                    }
                }
            }
            if (window.allowSlide && scrollsize) {
                if (scrollDirection == "down") {
                    window.collectScrolls = window.collectScrolls + scrollsize;
                } else {
                    window.collectScrolls = window.collectScrolls - scrollsize;
                }
                setTimeout(function () {
                    window.collectScrolls = 0;
                }, 200);
            }
            if (Math.abs(window.collectScrolls) >= minScrollToSlide && window.allowSlide && !window.sidebarShown && !window.popupShown && !window.disableOnScroll) {
                window.collectScrolls = 0;
                if ((scrollDirection === "down" && window.stage !== window.stages) || (scrollDirection === "up" && window.stage !== 1)) {
                    if (window.inAction !== 1) {
                        if (scrollDirection === "down") {
                            window.changeSlide("increase");
                        } else {
                            window.changeSlide("decrease");
                        }
                    }
                }
            }
        }
    });
    if ((window.isMobile && window.isSimplifiedMobile) || window.isScroll) {
        $(window).on("DOMMouseScroll mousewheel scroll touchmove load", function () {
            updateScroll();
        });
    }
    var hideDropdownOnScrollDelay = 0;
    function updateScroll() {
        hideDropdownOnScrollDelay++;
        if (hideDropdownOnScrollDelay >= 2) {
            hideDropdown();
            hideDropdownOnScrollDelay = 0;
        }
        $(".slide").each(function (index, element) {
            var $element = $(element),
                elementIndex = $element.index(".slide"),
                scrollTop = $(document).scrollTop(),
                positionY = $element.offset().top,
                elementHeight = $element.height(),
                halfWay = window.windowHeight / 2 > elementHeight ? elementHeight / 2 : window.windowHeight / 2,
                halfOnScreen = positionY < window.windowHeight + scrollTop - halfWay && positionY > scrollTop - elementHeight + halfWay,
                scale = ((scrollTop + window.windowHeight - positionY) / (window.windowHeight + elementHeight) - 0.5) * 2,
                allowToSelect = true;
            if (scrollTop === 0) {
                if (index === 0) {
                    allowToSelect = true;
                } else {
                    allowToSelect = false;
                }
            }
            if (scrollTop + window.windowHeight === window.documentHeight) {
                if (index === window.stages - 1) {
                    allowToSelect = true;
                } else {
                    allowToSelect = false;
                }
            }
            if (window.setStageClasses != 0) {
                if (halfOnScreen && allowToSelect) {
                    $element.prevAll(".slide").addClass("before").removeClass("after");
                    $element.nextAll(".slide").addClass("after").removeClass("before");
                    $element.addClass("selected animate active").removeClass("after before");
                    if (window.stage !== elementIndex + 1 || !window.firstTimeTrigger) {
                        window.stage = elementIndex + 1;
                        $(window).trigger("slideChange", [window.stage, $element]);
                        if (window.stage === 1) {
                            $body.addClass("firstSlide");
                        } else {
                            $body.removeClass("firstSlide");
                        }
                        if (window.stages === window.stage) {
                            $body.addClass("lastSlide");
                        } else {
                            $body.removeClass("lastSlide");
                        }
                        $body.removeClassByPrefix("stage-").addClass("stage-" + window.stage);
                        if ($element.hasClass("whiteSlide")) {
                            $body.addClass("whiteSlide");
                        } else {
                            $body.removeClass("whiteSlide");
                        }
                        if (window.isAnimated == "auto") {
                            window.clearElementAnimation = setTimeout(function () {
                                $element.find("[class*='ae-']").addClass("done");
                            }, window.effectSpeed + window.cleanupDelay);
                        }
                        updateNavigation();
                    }
                    if (!window.firstTimeTrigger) {
                        window.firstTimeTrigger = 1;
                        $(window).trigger("slideChange", [window.stage, $element]);
                    }
                } else {
                    $element.removeClass("selected");
                }
            }
            if (scale > -1 && scale < 1 && !(window.allowParallaxOnMobile && window.isMobile)) {
                if ($element.hasClass("parallax") || $element.find(".parallax-element")) {
                    $element.find(".parallax-element").each(function () {
                        var $el = $(this),
                            velocity = parseInt($el.data("parallax-velocity")) ? parseInt($el.data("parallax-velocity")) : 50,
                            precentage = scale * velocity;
                        if (velocity > 100) {
                            velocity = 100;
                        }
                        $el.css("-webkit-transform", "translate3d(0, " + precentage + "%, 0)").css("transform", "translate3d(0, " + precentage + "%, 0)");
                    });
                }
            }
        });
        if (window.isAnimated == "animateOnEvent") {
            if (!window.preload) {
                $("[class*='ae-']").each(function (i, element) {
                    var $ae = $(element);
                    if (isElementInView($ae)) {
                        $ae.addClass("do").one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function () {
                            $(this).removeClassByPrefix("ae-").removeClass("do").addClass("done");
                        });
                    }
                });
            } else {
                if (window.loaded) {
                    $("[class*='ae-']").each(function (i, element) {
                        var $ae = $(element);
                        if (isElementInView($ae)) {
                            $ae.addClass("do").one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function () {
                                $(this).removeClassByPrefix("ae-").removeClass("do").addClass("done");
                            });
                        }
                    });
                }
            }
        }
    }
    function isElementInView(element) {
        var pageTop = $(window).scrollTop(),
            $element = $(element),
            elementHeight = $element.height(),
            pageBottom = pageTop + window.windowHeight,
            elementTop = $element.offset().top,
            elementBottom = elementTop + elementHeight;
        if (elementHeight >= window.windowHeight / 5) {
            return pageBottom >= elementTop + elementHeight / 5;
        } else {
            return pageTop < elementTop && pageBottom > elementBottom;
        }
    }
    $(".mobile .slides:not(.scroll):not(.simplifiedMobile), .slides.desktopSwipe").swipe({
        swipeStatus: function (event, phase, direction, distance) {
            window.allowSwipeUp = 1;
            window.allowSwipeDown = 1;
            var $currentSection = $(".slide.selected .content"),
                currentSectionHeight = Math.floor($currentSection.find(".container").outerHeight()),
                next = "up",
                prev = "down",
                minSwipeToSlide = window.minSwipeToSlide,
                windowHeight = window.innerHeight;
            if (window.sidebarShown) {
                $currentSection = $(".sidebar .content");
            }
            if (window.popupShown) {
                $currentSection = $(".popup .content");
            }
            if (phase === "start") {
                window.scrollTop = $currentSection.scrollTop();
            }
            if (window.horizontalMode) {
                next = "left";
                prev = "right";
            }
            if (!window.horizontalMode && currentSectionHeight > windowHeight) {
                if (window.scrollTop + windowHeight < currentSectionHeight) {
                    window.allowSwipeUp = 0;
                }
                if (window.scrollTop > 0) {
                    window.allowSwipeDown = 0;
                }
            }
            if (!window.sidebarShown && !window.disableOnSwipe) {
                if (window.horizontalMode) {
                    if (direction === next && distance > minSwipeToSlide) {
                        window.changeSlide("increase");
                    } else {
                        if (direction === prev && distance > minSwipeToSlide) {
                            window.changeSlide("decrease");
                        }
                    }
                } else {
                    if (direction === next && distance > minSwipeToSlide && window.allowSwipeUp && window.allowSlide) {
                        window.changeSlide("increase");
                    } else {
                        if (direction === prev && distance > minSwipeToSlide && window.allowSwipeDown && window.allowSlide) {
                            window.changeSlide("decrease");
                        }
                    }
                }
            }
        },
        maxTimeThreshold: 0,
        fingers: "all",
        allowPageScroll: "vertical",
    });
    $(".slides.desktopSwipe *").on("click", function () {
        $(this).addClass("selectable");
    });
    if ($(".panel .compact").length > 0) {
        $(".panel .compact").each(function (index, element) {
            var panel = $(element).parents(".panel"),
                desktop = $(panel).find(".desktop"),
                compact = element,
                forceMobileView = $(panel).hasClass("forceMobileView");
            $(window).on("load resize ready", function () {
                var documentWidth = $(document).width(),
                    panelsPadding = parseInt($(panel).css("padding-left").replace("px", "")) + parseInt($(panel).css("padding-right").replace("px", ""));
                if ((window.isMobile || $(document).width() < 767) && forceMobileView) {
                    $(desktop).addClass("hidden");
                    $(compact).removeClass("hidden");
                } else {
                    $(desktop).removeClass("hidden");
                    $(compact).addClass("hidden");
                    var totalWidth = 0;
                    desktop.children().each(function () {
                        if ($(this).outerWidth() > $(this).children().outerWidth()) {
                            totalWidth += Math.round($(this).outerWidth());
                        } else {
                            totalWidth += Math.round($(this).children().outerWidth());
                        }
                    });
                    if (totalWidth + Math.round(panelsPadding) > documentWidth + 2 || ((window.isMobile || documentWidth < 767) && forceMobileView)) {
                        $(desktop).addClass("hidden");
                        $(compact).removeClass("hidden");
                    } else {
                        $(desktop).removeClass("hidden");
                        $(compact).addClass("hidden");
                    }
                }
            });
        });
    }
    if ($(".panel.hideOnScroll").length > 0) {
        window.panelsToHide = true;
        if (window.isScroll || window.isSimplifiedMobile) {
            var lastScrollTop,
                i = 0,
                sensitivity = window.hideOnScrollSensitivity ? window.hideOnScrollSensitivity : 100,
                panelToHide = $(".panel.hideOnScroll");
            $(window).on("mousewheel", function (event) {
                var scrollTop = $(this).scrollTop(),
                    $panelToHide = $(panelToHide),
                    scrollSize = Math.ceil(Math.abs(event.deltaY) * event.deltaFactor);
                if (scrollTop > lastScrollTop) {
                    i += scrollSize;
                    if (i >= sensitivity) {
                        $panelToHide.addClass("hide");
                        i = sensitivity;
                    }
                } else {
                    i -= scrollSize;
                    if (i <= sensitivity / 5) {
                        i = 0;
                        $panelToHide.removeClass("hide");
                    }
                }
                lastScrollTop = scrollTop;
                if (scrollTop + window.windowHeight + sensitivity >= window.documentHeight || scrollTop + sensitivity <= 0) {
                    $panelToHide.removeClass("hide");
                }
            });
        }
    }
    $(document).on("keydown", function (e) {
        var delta = 2.5,
            scrollTime = 0.3,
            scrollDistance = 50,
            $currentSection = $(".slide.selected .content"),
            scrollTop = $currentSection.scrollTop(),
            finalScroll = scrollTop + parseInt(delta * scrollDistance);
        if (window.window.disableKeyNavigation || e.target.nodeName.toLowerCase() == "input" || e.target.nodeName.toLowerCase() == "textarea") {
            return;
        }
        if (e.keyCode === 37) {
            e.preventDefault();
            if (window.horizontalMode) {
                window.changeSlide("decrease");
            }
        }
        if (e.keyCode === 38) {
            if (!window.horizontalMode) {
                e.preventDefault();
                window.changeSlide("decrease");
            } else {
                e.preventDefault();
                TweenLite.to($currentSection, window.scrollSpeed, { scrollTo: { y: finalScroll, autoKill: true }, ease: Power4.easeOut, overwrite: 5 });
            }
        }
        if (e.keyCode === 39) {
            if (window.horizontalMode) {
                e.preventDefault();
                window.changeSlide("increase");
            }
        }
        if (e.keyCode === 40) {
            if (!window.horizontalMode) {
                e.preventDefault();
                window.changeSlide("increase");
            } else {
                e.preventDefault();
                TweenLite.to($currentSection, window.scrollSpeed, { scrollTo: { y: finalScroll, autoKill: true }, ease: Power4.easeOut, overwrite: 5 });
            }
        }
        if (e.keyCode === 27) {
            hideSidebar();
            hideDropdown();
            hidePopup();
            unzoomImage();
        }
    });
    var navParent = $(".navigation"),
        navigation = $(navParent).find("ul"),
        slidesNumber = $(".slide:not(.exclude)").length;
    if ($(navigation).length > 0) {
        if ($(navigation).is(":empty")) {
            $(navigation).each(function (index, element) {
                for (var i = 1; i <= slidesNumber; i++) {
                    var title = $(".slide:not(.exclude):eq(" + (i - 1) + ")").data("title");
                    if (title === undefined) {
                        $(element).append("<li></li>");
                    } else {
                        $(element).append('<li data-title="' + title + '"></li>');
                    }
                }
            });
        }
        $(".navigation li").on("click touchend", function () {
            var thisIndes = $(this).index(),
                realIndex = $(".slide:not(.exclude):eq(" + thisIndes + ")").index(".slide");
            $(this).blur();
            window.changeSlide(realIndex + 1);
        });
        if (!$(".side").hasClass("compact")) {
            $(window).on("load resize ready", function () {
                var containerHeight = window.windowHeight - 140,
                    container = $(".side").removeClass("compact").find("ul"),
                    totalWidth = 0;
                $(container)
                    .children()
                    .each(function () {
                        totalWidth += Math.round($(this).outerHeight(true));
                    });
                if (totalWidth > containerHeight) {
                    $(".side").addClass("compact");
                } else {
                    $(".side").removeClass("compact");
                }
            });
        }
    }
    $("a[href^='#'][target!='_blank']").click(function (e) {
        var url = $(this).attr("href"),
            hashLink = url.split("#")[1],
            requestedElement = hashLink ? $('.slide[id="' + hashLink + '"], .slide[data-name="' + hashLink + '"]') : $(".slide:eq(0)");
        if (requestedElement.length > 0) {
            e.preventDefault();
            if ((window.isMobile && window.isSimplifiedMobile) || window.isScroll) {
                var target = requestedElement;
                if (target.length) {
                    $("html,body").stop().clearQueue().animate({ scrollTop: target.position().top }, 1000);
                }
                if (window.setHashLink) {
                    window.location.hash = hashLink;
                }
            } else {
                window.stage = $(".slide").index(requestedElement) + 1;
                showSlide(window.stage);
            }
            hideSidebar();
        }
    });
    function updateNavigation() {
        setTimeout(function () {
            if ($(navigation).length > 0) {
                $(navigation).each(function (index, element) {
                    $(element).find("li.selected").removeClass("selected");
                    var $selectedSlide = $(".slide.selected"),
                        parentSlide = parseInt($selectedSlide.data("parent-slide-id")),
                        selectedIndex = $selectedSlide.index(".slide:not(.exclude)");
                    if (selectedIndex !== -1) {
                        $(element).find("li").eq(selectedIndex).addClass("selected");
                    } else {
                        if (parentSlide) {
                            selectedIndex = $('.slide[data-slide-id="' + parentSlide + '"]').index(".slide:not(.exclude)");
                            $(element).find("li").eq(selectedIndex).addClass("selected");
                        }
                    }
                });
            }
        }, 100);
    }
    $(".sidebarTrigger[data-sidebar-id]").on("click", function () {
        var sidebarID = $(this).data("sidebar-id");
        window.showSidebar(sidebarID);
    });
    window.showSidebar = function (id) {
        var sidebarID = id,
            element = $('.sidebar[data-sidebar-id="' + sidebarID + '"]'),
            isAnimated = $(element).hasClass("animated");
        if (!window.sidebarShown) {
            if (element.length > 0) {
                window.sidebarShown = 1;
                window.allowSlide = 0;
                $(element).removeClass("animate active").addClass("visible");
                $html.addClass("sidebarShown sidebar_" + sidebarID);
                $(element).find(".content").scrollTop(0);
                if (isAnimated) {
                    clearTimeout(window.removeAnimationTimeout);
                    setTimeout(function () {
                        $(element).addClass("animate active");
                    }, 100);
                }
            }
        } else {
            hideSidebar();
        }
        hideDropdown();
    };
    function hideSidebar() {
        if (window.sidebarShown) {
            $html.removeClass("sidebarShown").removeClassByPrefix("sidebar_");
            var $sidebar = $(".sidebar.visible");
            $sidebar.removeClass("visible");
            window.removeAnimationTimeout = setTimeout(function () {
                $sidebar.removeClass("animate active").find(".done").removeClass("done");
            }, 500);
            window.sidebarShown = 0;
            window.allowSlide = 1;
        }
    }
    $(document).on("mouseup touchstart", function (e) {
        var container = $(".sidebarShown .sidebar, .dropdownTrigger");
        if (!container.is(e.target) && container.has(e.target).length === 0 && window.hideSidebarOnBodyClick) {
            hideSidebar();
        }
    });
    $('.sidebar .close, .sidebar [data-sidebar-action="close"]').on("click touchstart", function () {
        hideSidebar();
    });
    $(".popupTrigger[data-popup-id]").on("click", function () {
        var popupID = $(this).data("popup-id");
        window.showPopup(popupID);
    });
    window.showPopup = function (id) {
        var popupID = id,
            element = $('.popup[data-popup-id="' + popupID + '"]'),
            isAnimated = element.hasClass("animated");
        if (element.length > 0) {
            hideSidebar();
            $(element).addClass("visible");
            $(window).trigger("popupShown");
            if (isAnimated) {
                setTimeout(function () {
                    $(element).addClass("animate active");
                    clearTimeout(window.clearPopupElementAnimation);
                    window.clearPopupElementAnimation = setTimeout(function () {
                        $(element).find("[class*='ae-']").addClass("done");
                    }, window.effectSpeed + window.cleanupDelay);
                }, 100);
            }
            $html.addClass("popupShown popup_" + popupID);
            $(element).find(".content").scrollTop(0);
            window.allowSlide = 0;
            if (!window.popupShown) {
                window.popupShown = [];
            }
            window.popupShown.push(popupID);
            if ($(element).hasClass("autoplay")) {
                var $element = $(element),
                    iframe = $element.find("iframe"),
                    HTML5video = $element.find("video");
                if (iframe.length > 0) {
                    var iframeSrc = $(iframe).attr("src"),
                        symbol = iframeSrc.indexOf("?") > -1 ? "&" : "?";
                    $(iframe).attr("src", iframeSrc + symbol + "autoplay=1");
                } else {
                    if (HTML5video.length > 0) {
                        $(HTML5video)[0].play();
                    }
                }
            }
        }
        hideDropdown();
    };
    function hidePopup(popupID) {
        popupID = typeof popupID !== "undefined" ? popupID : false;
        if ($.isArray(window.popupShown)) {
            var popupToHide = popupID ? popupID : window.popupShown.slice(-1)[0],
                $element = $('.popup.visible[data-popup-id="' + popupToHide + '"]'),
                iframe = $element.find("iframe"),
                video = $element.find("video");
            if (iframe.length > 0) {
                $(iframe).each(function (n, element) {
                    var iframeSrc = $(element).attr("src"),
                        symbol = iframeSrc.indexOf("?autoplay") > -1 ? "?" : "&";
                    $(element).attr(
                        "src",
                        $(element)
                            .attr("src")
                            .replace(symbol + "autoplay=1", "")
                    );
                });
            }
            if (video.length > 0) {
                $(video).each(function (n, element) {
                    $(element)[0].pause();
                    $(element)[0].currentTime = 0;
                });
            }
            clearTimeout(window.clearPopupElementAnimation);
            $element.addClass("hidePopup");
            $(window).trigger("popupHidden");
            setTimeout(function () {
                window.allowSlide = 1;
                $element.removeClass("visible animate active hidePopup").removeAttr("style").find(".done").removeClass("done");
                $html.removeClass("popup_" + popupToHide);
                if ($.isArray(window.popupShown)) {
                    var i = window.popupShown.indexOf(popupToHide);
                    if (i != -1) {
                        window.popupShown.splice(i, 1);
                    }
                }
                if (window.popupShown.length <= 0) {
                    $html.removeClass("popupShown");
                    window.popupShown = false;
                }
            }, 500);
        }
    }
    if (window.hidePopupOnBodyClick) {
        $(document).on("click", function (e) {
            var container = $(".popupShown .popup .popupContent, .popupTrigger");
            if (!container.is(e.target) && container.has(e.target).length === 0 && container.length > 0) {
                hidePopup();
            }
        });
    }
    $('.popup [data-popup-action="close"]').on("click", function () {
        hidePopup($(this).parents(".popup").data("popup-id"));
    });
    if (window.setPopupHash) {
        $(".popupTrigger[data-popup-id]").on("click", function () {
            var hash = $(this).attr("data-popup-id");
            window.location.hash = "#" + hash;
        });
        window.setPopupHash = [];
        $(".popupTrigger").each(function () {
            var hash = $(this).attr("data-popup-id");
            if ($.inArray(hash, window.setPopupHash) == -1) {
                window.setPopupHash.push(hash);
            }
        });
        if ($.inArray(window.location.hash.split("#")[1], window.setPopupHash) !== -1) {
            setTimeout(function () {
                $('.popupTrigger[data-popup-id="' + window.location.hash.split("#")[1] + '"]').click();
            }, 500);
            $(window).on("popupHidden", function () {
                if (history.pushState) {
                    window.history.pushState("", "", location.href.split("#")[0]);
                } else {
                    window.location.hash = "";
                }
            });
        }
    }
    $(window).on("resize load ready popupShown", function () {
        setTimeout(function () {
            equalizeElements();
        }, 1);
    });
    function equalizeElements() {
        var gridEl = $(".grid.equal, .flex.equal");
        if (gridEl.length) {
            $(gridEl).each(function (index, element) {
                var screenWidth = window.windowWidth,
                    collapseWidth = $(element).hasClass("later") ? 767 : 1024,
                    collapseWidth = $(element).data("equal-collapse-width") ? parseInt($(element).data("equal-collapse-width")) : collapseWidth,
                    equalElement = $(element).find(".equalElement"),
                    equalMobile = $(this).hasClass("equalMobile");
                if (screenWidth >= collapseWidth || equalMobile) {
                    var height = 0;
                    $(equalElement).each(function (index, el) {
                        $(el).css("height", "auto");
                        if (height < $(el).outerHeight()) {
                            height = $(el).outerHeight();
                        }
                    });
                    $(element)
                        .find(".equalElement")
                        .each(function (index, el) {
                            $(el).css("height", height + "px");
                        });
                } else {
                    $(equalElement).css("height", "auto");
                }
            });
        }
    }
    $(window)
        .on("resize", function () {
            $html.addClass("resizing");
        })
        .on("resizeEnd", function () {
            $html.removeClass("resizing");
        });
    var sliderEl = $(".slider");
    if ($(sliderEl).length > 0) {
        $(sliderEl).each(function (index, element) {
            var $el = $(element),
                sliderID = $el.data("slider-id"),
                nextIndex = $el.find(".selected").index();
            if (window.sliderStatus) {
                $html.removeClassByPrefix("slider_" + sliderID).addClass("slider_" + sliderID + "_" + nextIndex);
            }
            if ($el.hasClass("autoplay")) {
                var interval = $el.data("slider-interval") ? parseInt($el.data("slider-interval")) : 5000;
                var autoplay = setInterval(function () {
                    $el.trigger("next");
                }, interval);
                if ($el.data("slider-stoponclick") != false) {
                    $('[data-slider-id="' + sliderID + '"]').on("mousedown touchstart", function () {
                        clearInterval(autoplay);
                    });
                }
            }
            if ($el.hasClass("clickable") || $el.hasClass("autoplay")) {
                $el.on("click next", function (event) {
                    var $el = $(this),
                        $selected = $el.children(".selected"),
                        $nextElement = $selected.nextOrFirst("li"),
                        nextIndex = $nextElement.index(),
                        sliderID = $el.data("slider-id"),
                        $controller = $('.controller[data-slider-id="' + sliderID + '"]'),
                        isAnimated = $el.hasClass("animated"),
                        clickTarget = event.target;
                    if ($(clickTarget).data("slider-event") == "cancel") {
                        return;
                    }
                    $selected
                        .removeClass("selected")
                        .addClass("hide")
                        .one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
                            $(this).removeClass("hide");
                        });
                    $nextElement.removeClass("hide").addClass("selected");
                    if (window.sliderStatus) {
                        $html.removeClassByPrefix("slider_" + sliderID).addClass("slider_" + sliderID + "_" + nextIndex);
                    }
                    if (isAnimated) {
                        $el.addClass("animateOnEvent");
                        $el.find("li").removeClassByPrefix("ae-").removeClass("do");
                        $el.find(".selected").each(function (index) {
                            $(this)
                                .removeClassByPrefix("ae-")
                                .removeClass("do")
                                .addClass("ae-" + (index + 1))
                                .addClass("do");
                        });
                        $(window).scroll();
                    }
                    if (sliderID && $controller.length > 0) {
                        $controller.children(".selected").removeClass("selected");
                        $controller.children("li:eq(" + nextIndex + ")").addClass("selected");
                    }
                });
            }
        });
    }
    var $controller = $(".controller");
    if ($controller.length > 0) {
        var controllerSelector = $controller.data("controller-selector") ? $controller.data("controller-selector") : "li";
        $controller.on("click", controllerSelector, function () {
            var $controllerElement = $(this),
                $controller = $controllerElement.closest(".controller"),
                $selectedElement = $controller.find(".selected"),
                nextIndex = $($controller.find(controllerSelector)).index($controllerElement),
                sliderId = $controller.data("slider-id"),
                $slider = $('.slider[data-slider-id="' + sliderId + '"]'),
                isAnimated = $slider.hasClass("animated");
            if (!$controllerElement.hasClass("selected")) {
                $selectedElement.removeClass("selected");
                $controllerElement.addClass("selected");
                $slider
                    .children(".selected")
                    .removeClass("selected")
                    .addClass("hide")
                    .one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
                        $(this).removeClass("hide");
                    });
                $slider.children("li").eq(nextIndex).removeClass("hide").addClass("selected");
                if (window.sliderStatus) {
                    $html.removeClassByPrefix("slider_" + sliderID).addClass("slider_" + sliderID + "_" + nextIndex);
                }
            }
            if (isAnimated) {
                $slider.addClass("animateOnEvent");
                $slider.find(">li").removeClassByPrefix("ae-").removeClass("do");
                $slider.find(".selected").each(function (index) {
                    $(this)
                        .removeClassByPrefix("ae-")
                        .removeClass("do")
                        .addClass("ae-" + (index + 1))
                        .addClass("do");
                });
                $(window).scroll();
            }
        });
    }
    $("[data-slider-action]").click(function () {
        if ($(this).data("slider-id")) {
            var $this = $(this),
                $desiredElement,
                nextIndex,
                sliderID = $this.data("slider-id"),
                action = $this.data("slider-action"),
                $slider = $('.slider[data-slider-id="' + sliderID + '"]'),
                $controller = $('.controller[data-slider-id="' + sliderID + '"]'),
                controllerSelector = $controller.data("controller-selector") ? $controller.data("controller-selector") : "li",
                $selected = $slider.find(".selected"),
                isAnimated = $slider.hasClass("animated");
            if (action === "next") {
                $desiredElement = $selected.nextOrFirst("li");
            } else {
                if (action === "prev") {
                    $desiredElement = $selected.prevOrLast("li");
                } else {
                    if (parseInt(action) || action === 0) {
                        nextIndex = parseInt(action);
                        $desiredElement = $slider.find(">li:eq(" + nextIndex + ")");
                    }
                }
            }
            nextIndex = $desiredElement.index();
            $selected.removeClass("selected");
            $desiredElement.removeClass("hide").addClass("selected");
            if (window.sliderStatus) {
                $html.removeClassByPrefix("slider_" + sliderID).addClass("slider_" + sliderID + "_" + nextIndex);
            }
            if (isAnimated) {
                $slider.addClass("animateOnEvent");
                $slider.find("li").removeClassByPrefix("ae-").removeClass("do");
                $slider.find(".selected").each(function (index) {
                    $(this)
                        .removeClassByPrefix("ae-")
                        .removeClass("do")
                        .addClass("ae-" + (index + 1))
                        .addClass("do");
                });
                $(window).scroll();
            }
            if (sliderID && $controller.length > 0) {
                $controller
                    .find(".selected")
                    .removeClass("selected")
                    .addClass("hide")
                    .one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
                        $this.removeClass("hide");
                    });
                $controller.find(controllerSelector).eq(nextIndex).addClass("selected");
            }
        }
    });
    $("[data-slider-id].autoHeight").each(function (index, element) {
        $(window).on("click resize load ready next", function () {
            var totalHeight = 0,
                el = $(element).find(".selected");
            $(element)
                .find(".selected")
                .children()
                .each(function () {
                    totalHeight += Math.round($(this).outerHeight(true));
                });
            $(element).height(totalHeight + "px");
        });
    });
    $(".slider.clickable[data-slider-id], .controller[data-slider-id]").on("click", function (event) {
        if ($(event.target).data("slider-event") != "cancel") {
            $(window).resize();
        }
    });
    window.dropdownShown = false;
    $(".dropdownTrigger").on("click", function () {
        showDropdown($(this));
    });
    $(".dropdownTrigger.hover").hover(function () {
        showDropdown($(this), "hover");
    });
    function showDropdown($this, $isHover) {
        $isHover = typeof $isHover !== "undefined" ? $isHover : false;
        var offset = $this.offset(),
            position = $this.position(),
            offsetY = window.popupShown ? Math.ceil(position.top) : Math.ceil(offset.top),
            offsetX = Math.ceil(offset.left),
            dropdownID = $this.data("dropdown-id"),
            $element = $('.dropdown[data-dropdown-id="' + dropdownID + '"]'),
            elementPosition = $this.data("dropdown-position") ? $this.data("dropdown-position") : $element.attr("class"),
            elementPosition = elementPosition.split(" ");
        if (!$isHover) {
            hideDropdown();
        }
        if (elementPosition.indexOf("bottom") != -1) {
            offsetY = offsetY - $element.outerHeight();
            $element.removeClass("top").addClass("bottom");
        } else {
            offsetY = offsetY + $this.outerHeight();
            $element.removeClass("bottom").addClass("top");
        }
        if (elementPosition.indexOf("right") != -1) {
            offsetX = offsetX - $element.outerWidth() + $this.outerWidth();
            $element.removeClass("left center").addClass("right");
        } else {
            if (elementPosition.indexOf("left") != -1) {
                $element.removeClass("right center").addClass("left");
            } else {
                if (elementPosition.indexOf("center") != -1) {
                    offsetX = offsetX - $element.outerWidth() / 2 + $this.outerWidth() / 2;
                    $element.removeClass("right left").addClass("center");
                }
            }
        }
        $element.addClass("show").css("top", offsetY).css("left", offsetX);
        $html.addClass("dropdownShown dropdown_" + dropdownID);
        window.dropdownShown = true;
    }
    function hideDropdown() {
        if (window.dropdownShown) {
            $html.removeClass("dropdownShown").removeClassByPrefix("dropdown_");
            window.dropdownShown = false;
            hideDropdownOnScrollDelay = 0;
            $(".dropdown.show")
                .addClass("hide")
                .one("webkitTransitionEnd otransitionend msTransitionEnd transitionend", function () {
                    $(this).removeClass("show hide");
                    $html.removeClass("dropdownShown").removeClassByPrefix("dropdown_");
                });
            $(window).trigger("dropdownHidden");
        }
    }
    $(window).on("resize", function () {
        hideDropdown();
    });
    $(document).on("mouseup touchstart", function (e) {
        var container = $(".dropdownShown .dropdown");
        if (!container.is(e.target) && container.has(e.target).length === 0 && window.dropdownShown) {
            hideDropdown();
        }
    });
    window.shareUrl = window.location.href;
    if ($(".share").data("url")) {
        window.shareUrl = $(".dropdown").data("url");
    }
    window.shareText = document.title;
    if ($(".share").data("text")) {
        window.shareText = $(".dropdown").data("url");
    }
    $(".share").sharrre({
        enableHover: false,
        url: window.shareUrl,
        text: window.shareText,
        enableCounter: false,
        share: { twitter: true, facebook: true, pinterest: true, googlePlus: true, stumbleupon: true, linkedin: true },
        buttons: { pinterest: { media: $(".dropdown").data("pinterest-image"), description: $(".dropdown").data("text") + " " + $(".dropdown").data("url") } },
        template: $(".share").html(),
        render: function (api) {
            $(api.element).on("click touchstart", ".social-twitter", function () {
                api.openPopup("twitter");
            });
            $(api.element).on("click touchstart", ".social-facebook", function () {
                api.openPopup("facebook");
            });
            $(api.element).on("click touchstart", ".social-pinterest", function () {
                api.openPopup("pinterest");
            });
            $(api.element).on("click touchstart", ".social-googlePlus", function () {
                api.openPopup("googlePlus");
            });
            $(api.element).on("click touchstart", ".social-stumbleupon", function () {
                api.openPopup("stumbleupon");
            });
            $(api.element).on("click touchstart", ".social-linkedin", function () {
                api.openPopup("linkedin");
            });
            $(api.element).on("click touchstart", ".mail", function () {
                var subject = $(this).data("subject") ? $(this).data("subject") : "",
                    body = $(this).data("body") ? $(this).data("body") : "",
                    url = $(".dropdown").data("url") ? $(".dropdown").data("url") : window.location.href;
                window.location.href = "mailto:?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body) + "%20" + url;
            });
        },
    });
    $(".dialogTrigger[data-dialog-id]").on("click", function () {
        var dialogID = $(this).data("dialog-id");
        window.showDialog(dialogID);
    });
    window.showDialog = function (id) {
        var dialogID = id,
            $element = $('.dialog[data-dialog-id="' + dialogID + '"]');
        if (!$element.is(":visible")) {
            $element.addClass("reveal").slideDown(500, function () {
                $(this).removeClass("reveal").removeClass("hidden");
            });
        }
    };
    $('.dialog [data-dialog-action="close"], .dialog [data-dialog-action="hide"]').on("click", function () {
        var $element = $(this).parents(".dialog"),
            action = $(this).data("dialog-action"),
            dialogID = $element.data("dialog-id"),
            cookieAge = $element.data("set-cookie"),
            cookieName = $element.data("cookie-name") ? $element.data("cookie-name") : dialogID,
            cookieValue = $element.data("cookie-value") ? $element.data("cookie-value") : true,
            cookiePath = $element.data("cookie-path");
        $element.addClass("hide").slideUp(500, function () {
            $(this).removeClass("hide");
            if (cookieAge && action == "close") {
                $.cookie(cookieName, cookieValue, { expires: cookieAge, path: cookiePath });
            }
        });
    });
    $(".dialog[data-set-cookie]").each(function (index, element) {
        var dialogID = $(element).data("dialog-id"),
            cookieName = $(element).data("cookie-name") ? $(element).data("cookie-name") : dialogID,
            cookieValue = $(element).data("cookie-value") ? $(element).data("cookie-value") : true;
        if ($.cookie(cookieName)) {
            $(element).hide();
        }
    });
    $(".dialog [data-href]").on("click", function () {
        if ($(this).data("target")) {
            window.open($(this).data("href"), "_blank");
        } else {
            window.location = $(this).data("href");
        }
    });
    $(".dialog.hidden[data-dialog-delay]").each(function () {
        var timeoutDelay = parseFloat($(this).attr("data-dialog-delay")),
            $element = $(this);
        if (!isNaN(timeoutDelay)) {
            setTimeout(function () {
                $element.addClass("reveal").slideDown(500, function () {
                    $(this).removeClass("reveal").removeClass("hidden");
                });
            }, timeoutDelay);
        }
    });
    $(".dialog[data-dialog-hide-delay]").each(function () {
        var timeoutDelay = parseFloat($(this).attr("data-dialog-hide-delay")),
            $element = $(this);
        if (!isNaN(timeoutDelay)) {
            setTimeout(function () {
                $element.addClass("hide").slideUp(500, function () {
                    $(this).removeClass("hide");
                });
            }, timeoutDelay);
        }
    });
    $('.dialog [data-type="submit"]').click(function () {
        $(this).parents("form").submit();
    });
    $("#contact-form, [data-ajax-form]").each(function (index, element) {
        $(element).ajaxForm(function () {
            var $ajaxForm = $(element),
                $ajaxFormButton = $(element).find('[type="submit"]'),
                ajaxFormButtonIsInput = $ajaxFormButton.is("input") ? true : false,
                successText = $ajaxFormButton.data("success-text") ? $ajaxFormButton.data("success-text") : "Done!",
                successClass = $ajaxFormButton.data("success-class") ? $ajaxFormButton.data("success-class") : "green",
                defaultText = ajaxFormButtonIsInput ? $ajaxFormButton.val() : $ajaxFormButton.html(),
                defaultClasses = $ajaxFormButton.attr("class");
            if (ajaxFormButtonIsInput) {
                $ajaxFormButton.val(successText);
            } else {
                $ajaxFormButton.text(successText);
            }
            $ajaxFormButton.addClass(successClass);
            setTimeout(function () {
                if (ajaxFormButtonIsInput) {
                    $ajaxFormButton.val(defaultText);
                } else {
                    $ajaxFormButton.html(defaultText);
                }
                $ajaxFormButton.attr("class", defaultClasses);
                $ajaxForm[0].reset();
            }, 4000);
        });
    });
    $("audio[data-sound-id]").each(function (event, element) {
        var $element = $(element),
            musicID = $element.data("sound-id"),
            audio = $element[0],
            $soundButton = $('.soundTrigger[data-sound-id="' + musicID + '"]');
        if (audio.autoplay) {
            $soundButton.addClass("playing");
        } else {
            $soundButton.removeClass("playing");
        }
    });
    $(".soundTrigger").click(function () {
        var musicID = $(this).data("sound-id"),
            $audio = $('audio[data-sound-id="' + musicID + '"]'),
            action = $audio.data("sound-action") ? $audio.data("sound-action") : "toggle",
            fade = parseInt($audio.data("sound-fade")) >= 0 || $audio.data("sound-fade") ? parseInt($audio.data("sound-fade")) : 500;
        if ($audio[0].paused && (action === "toggle" || action === "play")) {
            $audio[0].play();
            $audio.animate({ volume: 1 }, fade);
            $(this).addClass("playing");
        } else {
            if (action === "toggle" || action === "pause") {
                $audio.animate({ volume: 0 }, fade, function () {
                    $audio[0].pause();
                });
                $(this).removeClass("playing");
            }
        }
    });
});
window.isMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.isMobile = true;
}
if (window.isMobile) {
    $html.addClass("mobile");
} else {
    $html.addClass("desktop");
}
window.isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
window.isSafari = /^((?!chrome).)*safari/i.test(navigator.userAgent);
window.isChrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
window.isChromeiOS = navigator.userAgent.match("CriOS");
window.isMSIE = navigator.userAgent.match("MSIE");
window.isEdge = navigator.userAgent.match("Edge");
window.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
window.isiPad = navigator.userAgent.match(/iPad/i) !== null;
window.isWindows = navigator.platform.toUpperCase().indexOf("WIN") !== -1;
window.isOSX = navigator.platform.toUpperCase().indexOf("MAC") !== -1;
window.isLinux = navigator.platform.toUpperCase().indexOf("LINUX") !== -1;
if (window.isSafari) {
    $html.addClass("safari");
}
if (window.isFirefox) {
    $html.addClass("firefox");
}
if (window.isChrome) {
    $html.addClass("chrome");
}
if (window.isMSIE) {
    $html.addClass("msie");
}
if (window.isEdge) {
    $html.addClass("edge");
}
if (window.isAndroid) {
    $html.addClass("android");
}
if (window.isWindows) {
    $html.addClass("windows");
}
if (window.isOSX) {
    $html.addClass("osx");
}
if (window.isLinux) {
    $html.addClass("linux");
}
window.isRetina =
    (window.matchMedia &&
        (window.matchMedia("only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)").matches ||
            window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)")
                .matches)) ||
    (window.devicePixelRatio && window.devicePixelRatio > 1.3);
if (window.isRetina) {
    $html.addClass("retina");
}
