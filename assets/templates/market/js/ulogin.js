"3.0.7";
(function(q, x, H, K) {
    "undefined" == typeof q.easyXDM && function(a, b, d, e, l, h) {
        function v(c, f) {
            var g = typeof c[f];
            return "function" == g || !("object" != g || !c[f]) || "unknown" == g
        }
        function A() {
            if (!J(H.plugins) && "object" == typeof H.plugins["Shockwave Flash"]) {
                var c = H.plugins["Shockwave Flash"].description;
                c && !J(H.mimeTypes) && H.mimeTypes["application/x-shockwave-flash"] && H.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (T = c.match(/\d+/g))
            }
            if (!T)
                try {
                    var f = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    T = Array.prototype.slice.call(f.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/), 1)
                } catch (g) {}
            if (!T)
                return !1;
            c = parseInt(T[0], 10);
            f = parseInt(T[1], 10);
            ca = 9 < c && 0 < f;
            return !0
        }
        function F() {
            if (!U) {
                U = !0;
                for (var c = 0; c < Y.length; c++)
                    Y[c]();
                Y.length = 0
            }
        }
        function D(c, f) {
            U ? c.call(f) : Y.push(function() {
                c.call(f)
            })
        }
        function N() {
            var c = parent;
            if ("" !== W)
                for (var f = 0, g = W.split("."); f < g.length; f++)
                    c = c[g[f]];
            return c.easyXDM
        }
        function G(c) {
            var f = c.toLowerCase().match(Z);
            c = f[2];
            var g = f[3];
            f = f[4] || "";
            if ("http:" == c && ":80" == f || "https:" == c && ":443" == f)
                f = "";
            return c + "//" + g + f
        }
        function Q(c) {
            c = c.replace(pa, "$1/");
            if (!c.match(/^(http||https):\/\//)) {
                var f = "/" === c.substring(0, 1) ? "" : d.pathname;
                "/" !== f.substring(f.length - 1) && (f = f.substring(0, f.lastIndexOf("/") + 1));
                c = d.protocol + "//" + d.host + f + c
            }
            for (; ha.test(c); )
                c = c.replace(ha, "");
            return c
        }
        function O(c, f) {
            var g = ""
              , k = c.indexOf("#");
            -1 !== k && (g = c.substring(k),
            c = c.substring(0, k));
            k = [];
            for (var p in f)
                f.hasOwnProperty(p) && k.push(p + "=" + h(f[p]));
            return c + (ia ? "#" : -1 == c.indexOf("?") ? "?" : "&") + k.join("&") + g
        }
        function J(c) {
            return "undefined" === typeof c
        }
        function I(c, f, g) {
            var k;
            for (k in f)
                if (f.hasOwnProperty(k))
                    if (k in c) {
                        var p = f[k];
                        "object" === typeof p ? I(c[k], p, g) : g || (c[k] = f[k])
                    } else
                        c[k] = f[k];
            return c
        }
        function R(c) {
            if (J(aa)) {
                var f = b.body.appendChild(b.createElement("form"))
                  , g = f.appendChild(b.createElement("input"));
                g.name = M + "TEST" + ja;
                aa = g !== f.elements[g.name];
                b.body.removeChild(f)
            }
            aa ? f = b.createElement('<iframe name="' + c.props.name + '"/>') : (f = b.createElement("IFRAME"),
            f.name = c.props.name);
            f.id = f.name = c.props.name;
            delete c.props.name;
            "string" == typeof c.container && (c.container = b.getElementById(c.container));
            c.container || (I(f.style, {
                position: "absolute",
                top: "-2000px",
                left: "0px"
            }),
            c.container = b.body);
            g = c.props.src;
            c.props.src = "javascript:false";
            I(f, c.props);
            f.border = f.frameBorder = 0;
            f.allowTransparency = !0;
            c.container.appendChild(f);
            c.onLoad && P(f, "load", c.onLoad);
            if (c.usePost) {
                var k = c.container.appendChild(b.createElement("form"));
                k.target = f.name;
                k.action = g;
                k.method = "POST";
                if ("object" === typeof c.usePost)
                    for (var p in c.usePost)
                        if (c.usePost.hasOwnProperty(p)) {
                            if (aa)
                                var n = b.createElement('<input name="' + p + '"/>');
                            else
                                n = b.createElement("INPUT"),
                                n.name = p;
                            n.value = c.usePost[p];
                            k.appendChild(n)
                        }
                k.submit();
                k.parentNode.removeChild(k)
            } else
                f.src = g;
            c.props.src = g;
            return f
        }
        function ka(c) {
            var f = c.protocol;
            c.isHost = c.isHost || J(L.xdm_p);
            ia = c.hash || !1;
            c.props || (c.props = {});
            if (c.isHost)
                c.remote = Q(c.remote),
                c.channel = c.channel || "default" + ja++,
                c.secret = Math.random().toString(16).substring(2),
                J(f) && (f = G(d.href) == G(c.remote) ? "4" : v(a, "postMessage") || v(b, "postMessage") ? "1" : c.swf && v(a, "ActiveXObject") && A() ? "6" : "Gecko" === H.product && "frameElement"in a && -1 == H.userAgent.indexOf("WebKit") ? "5" : c.remoteHelper ? "2" : "0");
            else {
                c.channel = L.xdm_c.replace(/["'<>\\]/g, "");
                c.secret = L.xdm_s;
                c.remote = L.xdm_e.replace(/["'<>\\]/g, "");
                f = L.xdm_p;
                var g;
                if (g = c.acl) {
                    a: {
                        g = c.acl;
                        var k = c.remote;
                        "string" == typeof g && (g = [g]);
                        for (var p, n = g.length; n--; )
                            if (p = g[n],
                            p = new RegExp("^" == p.substr(0, 1) ? p : "^" + p.replace(/(\*)/g, ".$1").replace(/\?/g, ".") + "$"),
                            p.test(k)) {
                                g = !0;
                                break a
                            }
                        g = !1
                    }
                    g = !g
                }
                if (g)
                    throw Error("Access denied for " + c.remote);
            }
            c.protocol = f;
            switch (f) {
            case "0":
                I(c, {
                    interval: 100,
                    delay: 2E3,
                    useResize: !0,
                    useParent: !1,
                    usePolling: !1
                }, !0);
                if (c.isHost) {
                    if (!c.local) {
                        f = d.protocol + "//" + d.host;
                        var m = b.body.getElementsByTagName("img");
                        for (k = m.length; k--; )
                            if (g = m[k],
                            g.src.substring(0, f.length) === f) {
                                c.local = g.src;
                                break
                            }
                        c.local || (c.local = a)
                    }
                    f = {
                        xdm_c: c.channel,
                        xdm_p: 0
                    };
                    c.local === a ? (c.usePolling = !0,
                    c.useParent = !0,
                    c.local = d.protocol + "//" + d.host + d.pathname + d.search,
                    f.xdm_e = c.local,
                    f.xdm_pa = 1) : f.xdm_e = Q(c.local);
                    c.container && (c.useResize = !1,
                    f.xdm_po = 1);
                    c.remote = O(c.remote, f)
                } else
                    I(c, {
                        channel: L.xdm_c,
                        remote: L.xdm_e,
                        useParent: !J(L.xdm_pa),
                        usePolling: !J(L.xdm_po),
                        useResize: c.useParent ? !1 : c.useResize
                    });
                m = [new t.stack.HashTransport(c), new t.stack.ReliableBehavior({}), new t.stack.QueueBehavior({
                    encode: !0,
                    maxLength: 4E3 - c.remote.length
                }), new t.stack.VerifyBehavior({
                    initiate: c.isHost
                })];
                break;
            case "1":
                m = [new t.stack.PostMessageTransport(c)];
                break;
            case "2":
                c.isHost && (c.remoteHelper = Q(c.remoteHelper));
                m = [new t.stack.NameTransport(c), new t.stack.QueueBehavior, new t.stack.VerifyBehavior({
                    initiate: c.isHost
                })];
                break;
            case "3":
                m = [new t.stack.NixTransport(c)];
                break;
            case "4":
                m = [new t.stack.SameOriginTransport(c)];
                break;
            case "5":
                m = [new t.stack.FrameElementTransport(c)];
                break;
            case "6":
                T || A(),
                m = [new t.stack.FlashTransport(c)]
            }
            m.push(new t.stack.QueueBehavior({
                lazy: c.lazy,
                remove: !0
            }));
            return m
        }
        function la(c) {
            for (var f, g = {
                incoming: function(n, m) {
                    this.up.incoming(n, m)
                },
                outgoing: function(n, m) {
                    this.down.outgoing(n, m)
                },
                callback: function(n) {
                    this.up.callback(n)
                },
                init: function() {
                    this.down.init()
                },
                destroy: function() {
                    this.down.destroy()
                }
            }, k = 0, p = c.length; k < p; k++)
                f = c[k],
                I(f, g, !0),
                0 !== k && (f.down = c[k - 1]),
                k !== p - 1 && (f.up = c[k + 1]);
            return f
        }
        function qa(c) {
            c.up.down = c.down;
            c.down.up = c.up;
            c.up = c.down = null
        }
        var ba = this, ja = Math.floor(1E4 * Math.random()), da = Function.prototype, Z = /^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/, ha = /[\-\w]+\/\.\.\//, pa = /([^:])\/\//g, W = "", t = {}, ra = a.easyXDM, M = "easyXDM_", aa, ia = !1, T, ca;
        if (v(a, "addEventListener")) {
            var P = function(c, f, g) {
                c.addEventListener(f, g, !1)
            };
            var X = function(c, f, g) {
                c.removeEventListener(f, g, !1)
            }
        } else if (v(a, "attachEvent"))
            P = function(c, f, g) {
                c.attachEvent("on" + f, g)
            }
            ,
            X = function(c, f, g) {
                c.detachEvent("on" + f, g)
            }
            ;
        else
            throw Error("Browser not supported");
        var U = !1
          , Y = [];
        if ("readyState"in b) {
            var ea = b.readyState;
            U = "complete" == ea || ~H.userAgent.indexOf("AppleWebKit/") && ("loaded" == ea || "interactive" == ea)
        } else
            U = !!b.body;
        if (!U) {
            if (v(a, "addEventListener"))
                P(b, "DOMContentLoaded", F);
            else if (P(b, "readystatechange", function() {
                "complete" == b.readyState && F()
            }),
            b.documentElement.doScroll && a === top) {
                var ma = function() {
                    if (!U) {
                        try {
                            b.documentElement.doScroll("left")
                        } catch (c) {
                            e(ma, 1);
                            return
                        }
                        F()
                    }
                };
                ma()
            }
            P(a, "load", F)
        }
        var L = function(c) {
            c = c.substring(1).split("&");
            for (var f = {}, g, k = c.length; k--; )
                g = c[k].split("="),
                f[g[0]] = l(g[1]);
            return f
        }(/xdm_e=/.test(d.search) ? d.search : d.hash)
          , fa = function() {
            var c = {}
              , f = {
                a: [1, 2, 3]
            };
            if ("undefined" != typeof JSON && "function" === typeof JSON.stringify && '{"a":[1,2,3]}' === JSON.stringify(f).replace(/\s/g, ""))
                return JSON;
            Object.toJSON && '{"a":[1,2,3]}' === Object.toJSON(f).replace(/\s/g, "") && (c.stringify = Object.toJSON);
            "function" === typeof String.prototype.evalJSON && (f = '{"a":[1,2,3]}'.evalJSON(),
            f.a && 3 === f.a.length && 3 === f.a[2] && (c.parse = function(g) {
                return g.evalJSON()
            }
            ));
            return c.stringify && c.parse ? (fa = function() {
                return c
            }
            ,
            c) : null
        };
        I(t, {
            version: "2.4.19.0",
            query: L,
            stack: {},
            apply: I,
            getJSONObject: fa,
            whenReady: D,
            noConflict: function(c) {
                a.easyXDM = ra;
                (W = c) && (M = "easyXDM_" + W.replace(".", "_") + "_");
                return t
            }
        });
        t.DomHelper = {
            on: P,
            un: X,
            requiresJSON: function(c) {
                "object" == typeof a.JSON && a.JSON || b.write('<script type="text/javascript" src="' + c + '">\x3c/script>')
            }
        };
        (function() {
            var c = {};
            t.Fn = {
                set: function(f, g) {
                    c[f] = g
                },
                get: function(f, g) {
                    if (c.hasOwnProperty(f)) {
                        var k = c[f];
                        g && delete c[f];
                        return k
                    }
                }
            }
        }
        )();
        t.Socket = function(c) {
            var f = la(ka(c).concat([{
                incoming: function(k, p) {
                    c.onMessage(k, p)
                },
                callback: function(k) {
                    if (c.onReady)
                        c.onReady(k)
                }
            }]))
              , g = G(c.remote);
            this.origin = G(c.remote);
            this.destroy = function() {
                f.destroy()
            }
            ;
            this.postMessage = function(k) {
                f.outgoing(k, g)
            }
            ;
            f.init()
        }
        ;
        t.Rpc = function(c, f) {
            if (f.local)
                for (var g in f.local)
                    if (f.local.hasOwnProperty(g)) {
                        var k = f.local[g];
                        "function" === typeof k && (f.local[g] = {
                            method: k
                        })
                    }
            var p = la(ka(c).concat([new t.stack.RpcBehavior(this,f), {
                callback: function(n) {
                    if (c.onReady)
                        c.onReady(n)
                }
            }]));
            this.origin = G(c.remote);
            this.destroy = function() {
                p.destroy()
            }
            ;
            p.init()
        }
        ;
        t.stack.SameOriginTransport = function(c) {
            var f, g, k, p;
            return f = {
                outgoing: function(n, m, u) {
                    k(n);
                    u && u()
                },
                destroy: function() {
                    g && (g.parentNode.removeChild(g),
                    g = null)
                },
                onDOMReady: function() {
                    p = G(c.remote);
                    c.isHost ? (I(c.props, {
                        src: O(c.remote, {
                            xdm_e: d.protocol + "//" + d.host + d.pathname,
                            xdm_c: c.channel,
                            xdm_p: 4
                        }),
                        name: M + c.channel + "_provider"
                    }),
                    g = R(c),
                    t.Fn.set(c.channel, function(n) {
                        k = n;
                        e(function() {
                            f.up.callback(!0)
                        }, 0);
                        return function(m) {
                            f.up.incoming(m, p)
                        }
                    })) : (k = N().Fn.get(c.channel)(function(n) {
                        f.up.incoming(n, p)
                    }),
                    e(function() {
                        f.up.callback(!0)
                    }, 0))
                },
                init: function() {
                    D(f.onDOMReady, f)
                }
            }
        }
        ;
        t.stack.FlashTransport = function(c) {
            function f(w, r) {
                e(function() {
                    k.up.incoming(w, n)
                }, 0)
            }
            function g(w) {
                var r = c.swf + "?host=" + c.isHost
                  , y = "easyXDM_swf_" + Math.floor(1E4 * Math.random());
                t.Fn.set("flash_loaded" + w.replace(/[\-.]/g, "_"), function() {
                    t.stack.FlashTransport[w].swf = m = u.firstChild;
                    for (var B = t.stack.FlashTransport[w].queue, z = 0; z < B.length; z++)
                        B[z]();
                    B.length = 0
                });
                c.swfContainer ? u = "string" == typeof c.swfContainer ? b.getElementById(c.swfContainer) : c.swfContainer : (u = b.createElement("div"),
                I(u.style, ca && c.swfNoThrottle ? {
                    height: "20px",
                    width: "20px",
                    position: "fixed",
                    right: 0,
                    top: 0
                } : {
                    height: "1px",
                    width: "1px",
                    position: "absolute",
                    overflow: "hidden",
                    right: 0,
                    top: 0
                }),
                b.body.appendChild(u));
                var C = "callback=flash_loaded" + h(w.replace(/[\-.]/g, "_")) + "&proto=" + ba.location.protocol + "&domain=" + h(ba.location.href.match(Z)[3]) + "&port=" + h(ba.location.href.match(Z)[4] || "") + "&ns=" + h(W);
                u.innerHTML = "<object height='20' width='20' type='application/x-shockwave-flash' id='" + y + "' data='" + r + "'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='" + r + "'></param><param name='flashvars' value='" + C + "'></param><embed type='application/x-shockwave-flash' FlashVars='" + C + "' allowScriptAccess='always' wmode='transparent' src='" + r + "' height='1' width='1'></embed></object>"
            }
            var k, p, n, m, u;
            return k = {
                outgoing: function(w, r, y) {
                    m.postMessage(c.channel, w.toString());
                    y && y()
                },
                destroy: function() {
                    try {
                        m.destroyChannel(c.channel)
                    } catch (w) {}
                    m = null;
                    p && (p.parentNode.removeChild(p),
                    p = null)
                },
                onDOMReady: function() {
                    n = c.remote;
                    t.Fn.set("flash_" + c.channel + "_init", function() {
                        e(function() {
                            k.up.callback(!0)
                        })
                    });
                    t.Fn.set("flash_" + c.channel + "_onMessage", f);
                    c.swf = Q(c.swf);
                    var w = c.swf.match(Z)[3]
                      , r = function() {
                        t.stack.FlashTransport[w].init = !0;
                        m = t.stack.FlashTransport[w].swf;
                        m.createChannel(c.channel, c.secret, G(c.remote), c.isHost);
                        c.isHost && (ca && c.swfNoThrottle && I(c.props, {
                            position: "fixed",
                            right: 0,
                            top: 0,
                            height: "20px",
                            width: "20px"
                        }),
                        I(c.props, {
                            src: O(c.remote, {
                                xdm_e: G(d.href),
                                xdm_c: c.channel,
                                xdm_p: 6,
                                xdm_s: c.secret
                            }),
                            name: M + c.channel + "_provider"
                        }),
                        p = R(c))
                    };
                    t.stack.FlashTransport[w] && t.stack.FlashTransport[w].init ? r() : t.stack.FlashTransport[w] ? t.stack.FlashTransport[w].queue.push(r) : (t.stack.FlashTransport[w] = {
                        queue: [r]
                    },
                    g(w))
                },
                init: function() {
                    D(k.onDOMReady, k)
                }
            }
        }
        ;
        t.stack.PostMessageTransport = function(c) {
            function f(m) {
                if (m.origin)
                    var u = G(m.origin);
                else if (m.uri)
                    u = G(m.uri);
                else if (m.domain)
                    u = d.protocol + "//" + m.domain;
                else
                    throw "Unable to retrieve the origin of the event";
                u == n && m.data && m.data.substring && m.data.substring(0, c.channel.length + 1) == c.channel + " " && g.up.incoming(m.data.substring(c.channel.length + 1), u)
            }
            var g, k, p, n;
            return g = {
                outgoing: function(m, u, w) {
                    p.postMessage(c.channel + " " + m, u || n);
                    w && w()
                },
                destroy: function() {
                    X(a, "message", f);
                    k && (p = null,
                    k.parentNode.removeChild(k),
                    k = null)
                },
                onDOMReady: function() {
                    n = G(c.remote);
                    if (c.isHost) {
                        var m = function(u) {
                            u.data == c.channel + "-ready" && (p = "postMessage"in k.contentWindow ? k.contentWindow : k.contentWindow.document,
                            X(a, "message", m),
                            P(a, "message", f),
                            e(function() {
                                g.up.callback(!0)
                            }, 0))
                        };
                        P(a, "message", m);
                        I(c.props, {
                            src: O(c.remote, {
                                xdm_e: G(d.href),
                                xdm_c: c.channel,
                                xdm_p: 1
                            }),
                            name: M + c.channel + "_provider"
                        });
                        k = R(c)
                    } else
                        P(a, "message", f),
                        p = "postMessage"in a.parent ? a.parent : a.parent.document,
                        p.postMessage(c.channel + "-ready", n),
                        e(function() {
                            g.up.callback(!0)
                        }, 0)
                },
                init: function() {
                    D(g.onDOMReady, g)
                }
            }
        }
        ;
        t.stack.FrameElementTransport = function(c) {
            var f, g, k, p;
            return f = {
                outgoing: function(n, m, u) {
                    k.call(this, n);
                    u && u()
                },
                destroy: function() {
                    g && (g.parentNode.removeChild(g),
                    g = null)
                },
                onDOMReady: function() {
                    p = G(c.remote);
                    c.isHost ? (I(c.props, {
                        src: O(c.remote, {
                            xdm_e: G(d.href),
                            xdm_c: c.channel,
                            xdm_p: 5
                        }),
                        name: M + c.channel + "_provider"
                    }),
                    g = R(c),
                    g.fn = function(n) {
                        delete g.fn;
                        k = n;
                        e(function() {
                            f.up.callback(!0)
                        }, 0);
                        return function(m) {
                            f.up.incoming(m, p)
                        }
                    }
                    ) : (b.referrer && G(b.referrer) != L.xdm_e && (a.top.location = L.xdm_e),
                    k = a.frameElement.fn(function(n) {
                        f.up.incoming(n, p)
                    }),
                    f.up.callback(!0))
                },
                init: function() {
                    D(f.onDOMReady, f)
                }
            }
        }
        ;
        t.stack.NameTransport = function(c) {
            function f(z) {
                u.contentWindow.sendMessage(z, c.remoteHelper + (m ? "#_3" : "#_2") + c.channel)
            }
            function g() {
                m ? 2 !== ++r && m || n.up.callback(!0) : (f("ready"),
                n.up.callback(!0))
            }
            function k(z) {
                n.up.incoming(z, C)
            }
            function p() {
                y && e(function() {
                    y(!0)
                }, 0)
            }
            var n, m, u, w, r, y, C, B;
            return n = {
                outgoing: function(z, E, V) {
                    y = V;
                    f(z)
                },
                destroy: function() {
                    u.parentNode.removeChild(u);
                    u = null;
                    m && (w.parentNode.removeChild(w),
                    w = null)
                },
                onDOMReady: function() {
                    m = c.isHost;
                    r = 0;
                    C = G(c.remote);
                    c.local = Q(c.local);
                    m ? (t.Fn.set(c.channel, function(E) {
                        m && "ready" === E && (t.Fn.set(c.channel, k),
                        g())
                    }),
                    B = O(c.remote, {
                        xdm_e: c.local,
                        xdm_c: c.channel,
                        xdm_p: 2
                    }),
                    I(c.props, {
                        src: B + "#" + c.channel,
                        name: M + c.channel + "_provider"
                    }),
                    w = R(c)) : (c.remoteHelper = c.remote,
                    t.Fn.set(c.channel, k));
                    var z = function() {
                        var E = u || this;
                        X(E, "load", z);
                        t.Fn.set(c.channel + "_load", p);
                        (function S() {
                            "function" == typeof E.contentWindow.sendMessage ? g() : e(S, 50)
                        }
                        )()
                    };
                    u = R({
                        props: {
                            src: c.local + "#_4" + c.channel
                        },
                        onLoad: z
                    })
                },
                init: function() {
                    D(n.onDOMReady, n)
                }
            }
        }
        ;
        t.stack.HashTransport = function(c) {
            function f() {
                if (w) {
                    var B = w.location.href
                      , z = ""
                      , E = B.indexOf("#");
                    -1 != E && (z = B.substring(E));
                    z && z != m && (m = z,
                    g.up.incoming(m.substring(m.indexOf("_") + 1), C))
                }
            }
            var g, k, p, n, m, u, w, r, y, C;
            return g = {
                outgoing: function(B, z) {
                    if (r) {
                        var E = c.remote + "#" + u++ + "_" + B;
                        (k || !y ? r.contentWindow : r).location = E
                    }
                },
                destroy: function() {
                    a.clearInterval(p);
                    !k && y || r.parentNode.removeChild(r);
                    r = null
                },
                onDOMReady: function() {
                    k = c.isHost;
                    n = c.interval;
                    m = "#" + c.channel;
                    u = 0;
                    y = c.useParent;
                    C = G(c.remote);
                    if (k) {
                        I(c.props, {
                            src: c.remote,
                            name: M + c.channel + "_provider"
                        });
                        if (y)
                            c.onLoad = function() {
                                w = a;
                                p = setInterval(f, n);
                                g.up.callback(!0)
                            }
                            ;
                        else {
                            var B = 0
                              , z = c.delay / 50;
                            (function V() {
                                if (++B > z)
                                    throw Error("Unable to reference listenerwindow");
                                try {
                                    w = r.contentWindow.frames[M + c.channel + "_consumer"]
                                } catch (S) {}
                                w ? (p = setInterval(f, n),
                                g.up.callback(!0)) : e(V, 50)
                            }
                            )()
                        }
                        r = R(c)
                    } else
                        w = a,
                        p = setInterval(f, n),
                        y ? (r = parent,
                        g.up.callback(!0)) : (I(c, {
                            props: {
                                src: c.remote + "#" + c.channel + new Date,
                                name: M + c.channel + "_consumer"
                            },
                            onLoad: function() {
                                g.up.callback(!0)
                            }
                        }),
                        r = R(c))
                },
                init: function() {
                    D(g.onDOMReady, g)
                }
            }
        }
        ;
        t.stack.ReliableBehavior = function(c) {
            var f, g, k = 0, p = 0, n = "";
            return f = {
                incoming: function(m, u) {
                    var w = m.indexOf("_")
                      , r = m.substring(0, w).split(",");
                    m = m.substring(w + 1);
                    r[0] == k && (n = "",
                    g && g(!0));
                    0 < m.length && (f.down.outgoing(r[1] + "," + k + "_" + n, u),
                    p != r[1] && (p = r[1],
                    f.up.incoming(m, u)))
                },
                outgoing: function(m, u, w) {
                    n = m;
                    g = w;
                    f.down.outgoing(p + "," + ++k + "_" + m, u)
                }
            }
        }
        ;
        t.stack.QueueBehavior = function(c) {
            function f() {
                if (c.remove && 0 === k.length)
                    qa(g);
                else if (!p && 0 !== k.length && !m) {
                    p = !0;
                    var y = k.shift();
                    g.down.outgoing(y.data, y.origin, function(C) {
                        p = !1;
                        y.callback && e(function() {
                            y.callback(C)
                        }, 0);
                        f()
                    })
                }
            }
            var g, k = [], p = !0, n = "", m, u = 0, w = !1, r = !1;
            return g = {
                init: function() {
                    J(c) && (c = {});
                    c.maxLength && (u = c.maxLength,
                    r = !0);
                    c.lazy ? w = !0 : g.down.init()
                },
                callback: function(y) {
                    p = !1;
                    var C = g.up;
                    f();
                    C.callback(y)
                },
                incoming: function(y, C) {
                    if (r) {
                        var B = y.indexOf("_")
                          , z = parseInt(y.substring(0, B), 10);
                        n += y.substring(B + 1);
                        0 === z && (c.encode && (n = l(n)),
                        g.up.incoming(n, C),
                        n = "")
                    } else
                        g.up.incoming(y, C)
                },
                outgoing: function(y, C, B) {
                    c.encode && (y = h(y));
                    var z = [];
                    if (r) {
                        for (; 0 !== y.length; ) {
                            var E = y.substring(0, u);
                            y = y.substring(E.length);
                            z.push(E)
                        }
                        for (; E = z.shift(); )
                            k.push({
                                data: z.length + "_" + E,
                                origin: C,
                                callback: 0 === z.length ? B : null
                            })
                    } else
                        k.push({
                            data: y,
                            origin: C,
                            callback: B
                        });
                    w ? g.down.init() : f()
                },
                destroy: function() {
                    m = !0;
                    g.down.destroy()
                }
            }
        }
        ;
        t.stack.VerifyBehavior = function(c) {
            function f() {
                k = Math.random().toString(16).substring(2);
                g.down.outgoing(k)
            }
            var g, k, p;
            return g = {
                incoming: function(n, m) {
                    var u = n.indexOf("_");
                    -1 === u ? n === k ? g.up.callback(!0) : p || (p = n,
                    c.initiate || f(),
                    g.down.outgoing(n)) : n.substring(0, u) === p && g.up.incoming(n.substring(u + 1), m)
                },
                outgoing: function(n, m, u) {
                    g.down.outgoing(k + "_" + n, m, u)
                },
                callback: function(n) {
                    c.initiate && f()
                }
            }
        }
        ;
        t.stack.RpcBehavior = function(c, f) {
            function g(r) {
                r.jsonrpc = "2.0";
                n.down.outgoing(m.stringify(r))
            }
            function k(r, y) {
                var C = Array.prototype.slice;
                return function() {
                    var B = arguments.length
                      , z = {
                        method: y
                    };
                    if (0 < B && "function" === typeof arguments[B - 1]) {
                        if (1 < B && "function" === typeof arguments[B - 2]) {
                            var E = {
                                success: arguments[B - 2],
                                error: arguments[B - 1]
                            };
                            z.params = C.call(arguments, 0, B - 2)
                        } else
                            E = {
                                success: arguments[B - 1]
                            },
                            z.params = C.call(arguments, 0, B - 1);
                        w["" + ++u] = E;
                        z.id = u
                    } else
                        z.params = C.call(arguments, 0);
                    r.namedParams && 1 === z.params.length && (z.params = z.params[0]);
                    g(z)
                }
            }
            function p(r, y, C, B) {
                if (C) {
                    if (y) {
                        var z = function(S) {
                            z = da;
                            g({
                                id: y,
                                result: S
                            })
                        };
                        var E = function(S, na) {
                            E = da;
                            var oa = {
                                id: y,
                                error: {
                                    code: -32099,
                                    message: S
                                }
                            };
                            na && (oa.error.data = na);
                            g(oa)
                        }
                    } else
                        z = E = da;
                    "[object Array]" !== Object.prototype.toString.call(B) && (B = [B]);
                    try {
                        var V = C.method.apply(C.scope, B.concat([z, E]));
                        J(V) || z(V)
                    } catch (S) {
                        E(S.message)
                    }
                } else
                    y && g({
                        id: y,
                        error: {
                            code: -32601,
                            message: "Procedure not found."
                        }
                    })
            }
            var n, m = f.serializer || fa(), u = 0, w = {};
            return n = {
                incoming: function(r, y) {
                    var C = m.parse(r);
                    if (C.method)
                        f.handle ? f.handle(C, g) : p(C.method, C.id, f.local[C.method], C.params);
                    else {
                        var B = w[C.id];
                        C.error ? B.error && B.error(C.error) : B.success && B.success(C.result);
                        delete w[C.id]
                    }
                },
                init: function() {
                    if (f.remote)
                        for (var r in f.remote)
                            f.remote.hasOwnProperty(r) && (c[r] = k(f.remote[r], r));
                    n.down.init()
                },
                destroy: function() {
                    for (var r in f.remote)
                        f.remote.hasOwnProperty(r) && c.hasOwnProperty(r) && delete c[r];
                    n.down.destroy()
                }
            }
        }
        ;
        ba.easyXDM = t
    }(q, x, location, q.setTimeout, decodeURIComponent, encodeURIComponent);
    "undefined" != typeof q.uLogin && q.uLogin.uLoginHost || (Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
        try {
            for (var b = 0; b < this.length; b++)
                if (this[b] == a)
                    return b
        } catch (d) {}
        return -1
    }
    ),
    String.prototype.trim || (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "")
    }
    ),
    "undefined" === typeof q.console && (q.console = {
        log: function() {},
        error: function() {},
        info: function() {},
        assert: function() {}
    }),
    q.uLogin = {
        uLoginHost: function(a) {
            var b;
            for (b in a)
                if (b in a && a[b].src && /^https?:\/\/(.*?)\/js\/ulogin\.js/.test(a[b].src)) {
                    var d = a[b].src.match(/^https?:\/\/([^/]+)/)[1].replace(/^www\./, "");
                    break
                }
            return "u-login.com" === d ? "u-login.com" : "ulogin.ru"
        }(x.getElementsByTagName("script"))
    },
    q.uLogin = {
        version: "3",
        protocol: location.href.match(/^https/i) ? "https" : "http",
        host: encodeURIComponent(location.host),
        uLoginHost: uLogin.uLoginHost,
        supportStorage: !!("localStorage"in window && null !== window.localStorage && "JSON"in window && null !== window.JSON && "undefined" !== typeof window.JSON.parse && "undefined" !== typeof window.JSON.stringify),
        supportHistory: !(!window.history || !history.pushState),
        ids: [],
        timeouts: {},
        listeners: {},
        lang: (H.language || H.systemLanguage || H.userLanguage || "en").substr(0, 2).toLowerCase(),
        langs: "en ru uk fr de uz".split(" "),
        dialog: !1,
        close: !1,
        lightbox: !1,
        dialogSocket: !1,
        pixel: !1,
        providerCodes: "vkontakte odnoklassniki mailru facebook twitter google yandex livejournal openid flickr lastfm linkedin liveid soundcloud steam webmoney youtube foursquare tumblr googleplus instagram wargaming".split(" "),
        providerNames: "VK Odnoklassniki Mail.ru Facebook Twitter Google Yandex LiveJournal OpenID Flickr Last.FM LinkedIn LiveID SoundCloud Steam WebMoney YouTube foursquare tumblr Google+ Instagram Wargaming.net".split(" "),
        states: ["ready", "open", "receive", "close", "fill"],
        themes: ["classic", "flat"],
        widgetSettings: {},
        findTimer: 0,
        waitGetWidget: {},
        altwayCalled: [],
        rc: !1,
        page: null,
        altway: function(a) {
            a = a.toLowerCase();
            return !!/iPhone|iPad/i.test(a)
        }(H.userAgent || H.vendor || q.opera),
        m: !!/(ip(ad|od|hone)|android)/i.test(H.userAgent || H.vendor || q.opera),
        mobile: function(a) {
            if (/_utl_t=vk/.test(location.href) || /_utl_t=vk/.test(document.referrer))
                return !1;
            a = a.toLowerCase();
            return !!/(ip(ad|od|hone)|android)/i.test(a)
        }(H.userAgent || H.vendor || q.opera),
        openFromSocket: !1,
        ppi: null,
        authSocket: !1,
        availableParams: {
            id: 1,
            redirect_uri: 1,
            page: 1,
            callback: 1,
            fields: 1,
            force_fields: 1,
            popup_css: 1,
            optional: 1,
            protocol: 1,
            host: 1,
            lang: 1,
            verify: 1,
            sort: 1,
            othprov: 1,
            providers: 1,
            altway: 1,
            m: 1,
            icons_32: 1,
            icons_16: 1
        },
        cancelClick: !1,
        postMessageIsAvailable: "undefined" !== typeof q.postMessage,
        init: function(a) {
            if (x.body) {
                this.mobile && (this.altway = !0);
                this.page = encodeURIComponent(location.href);
                this.openFromSocket && (this.authSocket = this.initSocket(this.buildUrl("/version/3.0/html/buttons_receiver.html", {
                    four: "",
                    r: parseInt(1E5 * Math.random())
                }), this.getRC(), {
                    background: "transparent"
                }));
                "" == a && (a = x.getElementsByTagName("script"),
                a = a[a.length - 1].src,
                -1 == a.indexOf("?") && (a += "?"),
                a = a.substr(a.indexOf("?") + 1));
                if ("" != a) {
                    var b = this.parse(a);
                    b.version && (this.version = b.version);
                    if (b.display) {
                        var d = b.id || "uLogin";
                        if (this.get(d)) {
                            a = !0;
                            for (var e = 0; e < this.ids.length; e++)
                                d == this.ids[e].id && (a = !1);
                            a && this.setProp(b.id || "uLogin", this.ids.length, b)
                        } else
                            K('uLogin.init("' + a + '")', 1E3)
                    }
                }
                this.add(x.body, "touchmove", this.touchMove);
                uLogin.timeouts.search_all = K(function h() {
                    uLogin.findWidgets();
                    if ("complete" === x.readyState && (0 === uLogin.findTimer && (uLogin.findTimer = +new Date),
                    1E4 < new Date - uLogin.findTimer))
                        return !1;
                    uLogin.timeouts.all = K(h, 50)
                }, 50);
                this.findWidgets();
                uLogin.timeouts.search_ulogin = K(function v() {
                    uLogin.checkAsyncWidgets();
                    uLogin.timeouts.search_ulogin = K(v, 50)
                }, 50);
                this.checkAsyncWidgets();
                uLogin.timeouts.check_widgets = K(function A() {
                    uLogin.checkCurrentWidgets();
                    uLogin.timeouts.check_widgets = K(A, 300)
                }, 30);
                this.checkCurrentWidgets();
                this.sendPixel();
                /*setTimeout(function() {
                    try {
                        var A = document.createElement("script");
                        A.type = "text/javascript";
                        A.src = "//sonar.semantiqo.com/c83ul/checking.js";
                        document.getElementsByTagName("head")[0].appendChild(A);
                        document.getElementsByTagName("head")[0].removeChild(A)
                    } catch (F) {}
                }, 5);*/
                /*setTimeout(function() {
                    try {
                        var A = document.createElement("script");
                        A.src = "//ulclick.ru/b-count.js";
                        A.type = "text/javascript";
                        A.async = !0;
                        document.getElementsByTagName("body")[0].appendChild(A);
                        document.getElementsByTagName("body")[0].removeChild(A)
                    } catch (F) {}
                }, 5);*/
                /*setTimeout(function() {
                    try {
                        var A = document.createElement("script");
                        A.src = "//ulogin.ru/cpx";
                        A.type = "text/javascript";
                        A.async = !0;
                        document.getElementsByTagName("body")[0].appendChild(A);
                        document.getElementsByTagName("body")[0].removeChild(A)
                    } catch (F) {}
                }, 5);*/
                uLogin.postMessageIsAvailable && (window.addEventListener ? window.addEventListener("message", uLogin.onMessage) : window.attachEvent("onmessage", uLogin.onMessage))
            } else
                K(function() {
                    uLogin.init()
                }, 20);
            this.callbackReceived()
        },
        onMessage: function(a) {
            a.origin == "https://" + uLogin.uLoginHost && a.data && a.data.mine && a.data.func && ("object" === typeof a.data.func && (a.data.func = a.data.func[0]),
            "to_window" === a.data.func ? (src = uLogin.buildUrl(a.data.args[2], {
                fields: a.data.args[0],
                filled: a.data.args[1],
                set: encodeURIComponent("{window:1}")
            }),
            console.log(src),
            uLogin.loadWindow(src)) : q[a.data.func] && q[a.data.func].apply(uLogin, a.data.args || []))
        },
        get: function(a) {
            return x.getElementById(a)
        },
        exists: function(a) {
            return "undefined" != typeof a
        },
        add: function(a, b, d) {
            a.addEventListener ? a.addEventListener(b, function(e) {
                "click" === b && uLogin.cancelClick || d(a, e)
            }, !1) : a.attachEvent ? a.attachEvent("on" + b, function(e) {
                "click" === b && uLogin.cancelClick || d(a, e)
            }) : a["on" + b] = function(e) {
                "click" === b && uLogin.cancelClick || d(a, e)
            }
            ;
            "click" === b && (this.add(a, "touchstart", this.touchStart),
            this.add(a, "touchend", function(e, l) {
                return function(h, v) {
                    uLogin.cancelClick || (uLogin.cancelClick = !0,
                    l.call(this, e, v))
                }
            }(a, d)))
        },
        touchStart: function() {
            uLogin.cancelClick = !1
        },
        touchMove: function() {
            uLogin.cancelClick = !0
        },
        is_encoded: function(a) {
            return decodeURIComponent(a) != a
        },
        genID: function() {
            for (var a = new Date, b = a.getTime() + Math.floor(1E5 * Math.random()); this.get("ul_" + b); )
                b = a.getTime() + Math.floor(1E5 * Math.random());
            return "ul_" + b
        },
        show: function(a) {
            this.exists(a) && (a.style.display = "block")
        },
        hide: function(a) {
            a && this.exists(a) && (a.style.display = "none")
        },
        parse: function(a) {
            var b = {};
            if (!a)
                return b;
            if ("object" === typeof a)
                return a;
            var d = a.split("&");
            d = 1 < d.length ? d : a.split(";");
            for (a = 0; a < d.length; a++) {
                var e = d[a].split("=");
                e[0] && (e[0] = e[0].trim());
                e[1] && (e[1] = e[1].trim());
                b[e[0]] = e[1]
            }
            return b
        },
        scrollTop: function() {
            return q.pageYOffset || x.documentElement.scrollTop || x.body.scrollTop
        },
        scrollLeft: function() {
            return q.pageXOffset || x.documentElement.scrollLeft || x.body.scrollLeft
        },
        dialogHeight: function() {
            return 358
        },
        dialogWidth: function() {
            return 564
        },
        clientWidth: function() {
            var a = 0;
            "[object Opera]" == Object.prototype.toString.call(q.opera) && 9.5 > q.parseFloat(q.opera.version()) ? a = x.body.clientWidth : q.innerWidth && (a = q.innerWidth);
            this.isIE() && (a = x.documentElement.clientWidth);
            return a
        },
        clientHeight: function() {
            var a = 0;
            "[object Opera]" == Object.prototype.toString.call(q.opera) && 9.5 > q.parseFloat(q.opera.version()) ? a = x.body.clientHeight : q.innerHeight && (a = q.innerHeight);
            this.isIE() && (a = x.documentElement.clientHeight);
            return a
        },
        isIE: function() {
            if (/MSIE (\d+\.\d+);/.test(H.userAgent)) {
                var a = Number(RegExp.$1);
                if (9 > a)
                    return a
            }
            return !1
        },
        getPPI: function() {
            if (null === this.ppi)
                try {
                    var a = window.devicePixelRatio || 1
                      , b = document.getElementsByTagName("body")[0]
                      , d = document.createElement("div");
                    d.style = "height: 1in; left: -100%; position: absolute; top: -100%; width: 1in;";
                    b.appendChild(d);
                    var e = d.offsetWidth * a;
                    b.removeChild(d);
                    this.ppi = e
                } catch (l) {
                    this.ppi = 96
                }
            return this.ppi
        },
        inArray: function(a, b) {
            if (!a || !b)
                return !1;
            for (var d = 0, e = b.length; d < e; d++)
                if (a == b[d])
                    return d;
            return -1
        },
        findWidgets: function() {
            for (var a = 0, b = [], d = [], e = x.getElementsByTagName("div"), l = x.getElementsByTagName("a"); l[a]; )
                l[a] && (b[a] = l[a]),
                a++;
            for (a = 0; e[a]; )
                e[a] && (d[a] = e[a]),
                a++;
            for (a = 0; d[a] || b[a]; )
                d[a] && this.addWidget(d[a]),
                b[a] && this.addWidget(b[a]),
                a++
        },
        addWidget: function(a, b) {
            var d = a.id
              , e = a.getAttribute("data-uloginid")
              , l = {}
              , h = !1;
            "undefined" !== typeof q.uLoginParams && (q.uLoginParams[d] ? l = q.uLoginParams[d] : q.uLoginParams[e] ? l = q.uLoginParams[e] : 0 < this.arrayIntersectKey(q.uLoginParams, this.availableParams).length && (l = q.uLoginParams,
            h = !0));
            b && (l = this.extend(l, b));
            var v = a.getAttribute("data-ulogin") || a.getAttribute("x-ulogin-params");
            h = null !== v || !h && 0 < this.arrayIntersectKey(l, this.availableParams).length;
            b = this.extend(this.parse(v), l);
            !e && !h || d || (d = this.genID(),
            a.setAttribute("id", d));
            e ? this.getWidget(e, d) : h && this.setProp(d, this.ids.length, b)
        },
        inited: function(a) {
            for (var b = 0; b < this.ids.length; b++)
                if (a == this.ids[b].id)
                    return !0;
            return !1
        },
        initWidget: function(a) {
            if (a) {
                var b = this.get(a);
                if (b && (b = b.getAttribute("data-ulogin") || b.getAttribute("x-ulogin-params")) && !this.inited(a)) {
                    b = this.parse(b);
                    var d = this.getWidgetNumber(a);
                    isNaN(d) ? d = this.ids.length : this.ids[d] = {};
                    this.setProp(a, d, b)
                }
            }
        },
        setProp: function(a, b, d) {
            if (this.waitGetWidget[a] || this.inited(a))
                return !1;
            this.ids[b] = {
                id: a,
                dropTimer: !1,
                initCheck: !1,
                type: d.display || "",
                providers: d.providers || "",
                hidden: d.hidden || "",
                redirect_uri: d.redirect_uri || "",
                page: this.page,
                callback: d.callback || "",
                fields: d.fields || "first_name,last_name,email",
                force_fields: d.force_fields || "",
                popup_css: d.popup_css || "",
                optional: d.optional || "",
                color: d.color || "fff",
                opacity: d.opacity || "75",
                verify: d.verify || "",
                m: "undefined" !== typeof d.m ? d.m : this.m,
                lang: d.lang || this.lang,
                altway: "undefined" !== typeof d.altway ? parseInt(d.altway) : this.altway,
                sort: "default" === d.sort ? "default" : "relevant",
                state: "",
                hidden_button: d.hidden_button || "inset",
                dropdown_container: d.dropdown_container || "body",
                icons_32: d.icons_32 || "",
                icons_16: d.icons_16 || "",
                theme: d.theme || "classic",
                client: d.client || "",
                event: d.event || "click"
            };
            -1 == this.inArray(this.ids[b].theme, this.themes) && (this.ids[b].theme = this.themes[0]);
            this.ids[b].providers || this.ids[b].other || (this.ids[b].hidden = "other");
            var e;
            if (this.ids[b].providers) {
                var l = this.ids[b].providers.split(",");
                var h = [];
                for (e in l) {
                    var v = l[e];
                    -1 < this.inArray(v, this.providerCodes) && h.push(v)
                }
                this.ids[b].providers = h.join(",")
            }
            if (this.ids[b].hidden && "other" !== this.ids[b].hidden) {
                l = this.ids[b].hidden.split(",");
                h = [];
                for (e in l)
                    v = l[e],
                    -1 < this.inArray(v, this.providerCodes) && h.push(v);
                this.ids[b].hidden = h.join(",")
            }
            "small" !== this.ids[b].type && "panel" !== this.ids[b].type || this.sendStats({
                type: this.ids[b].type
            });
            "window" == this.ids[b].type && !this.ids[b].providers && this.ids[b].hidden && (this.ids[b].providers = this.providerCodes.join(","));
            this.ids[b].mobile = 0 == d.mobilebuttons ? 0 : this.mobile;
            this.ids[b].altway && !this.ids[b].redirect_uri && (this.ids[b].redirect_uri = location.href);
            this.ids[b].callback && !this.ids[b].altway && (this.ids[b].redirect_uri = "");
            this.ids[b].redirect_uri = this.clearRedirectUri(this.ids[b].redirect_uri);
            -1 == this.inArray(this.ids[b].lang, this.langs) && (this.ids[b].lang = this.lang);
            this.ids[b].icons_32 = this.fixSiteLink(this.ids[b].icons_32);
            this.ids[b].icons_16 = this.fixSiteLink(this.ids[b].icons_16);
            switch (d.display) {
            case "small":
            case "panel":
                this.ids[b].listener_id = !1;
                this.initPanel(b);
                break;
            case "window":
                this.initWindow(b);
                break;
            case "buttons":
                this.initButtons(b);
                break;
            default:
                this.ids.splice(b, b)
            }
            this.get(a).setAttribute("data-ulogin-inited", (+new Date).toString())
        },
        fixSiteLink: function(a) {
            a && (/^https?:\/\/(.*?)/.test(a) || (/^\//.test(a) || (a = "/" + a),
            a = location.origin + a),
            (new RegExp("^" + location.origin)).test(a) || (a = "",
            console.error("uLogin ERROR: resource link is invalid, not match with location.origin")),
            a && (a = this.is_encoded(a) ? a.replace(/\//g, "%2F").replace(/\?/g, "%3F") : encodeURIComponent(a)));
            return a
        },
        clearRedirectUri: function(a) {
            if (!a)
                return a;
            a = a.replace(/ulogin_callback=([^&?]*?)#/, "#").replace(/ulogin_callback=(.*?)(&|$)/, "").replace(/ulogin_token=([^&?]*?)#/, "#").replace(/ulogin_token=(.*?)(&|$)/, "").replace(/(\?|&)#/, "#").replace(/(\?|&)$/, "");
            return a = this.is_encoded(a) ? a.replace(/\//g, "%2F").replace(/\?/g, "%3F") : encodeURIComponent(a)
        },
        initPanel: function(a) {
            var b = this.get(this.ids[a].id)
              , d = "small" == this.ids[a].type ? 1 : 0
              , e = d ? 21 : 42
              , l = d ? 16 : 32
              , h = 0
              , v = d ? 5 : 10
              , A = d ? "16px" : "32px"
              , F = ""
              , D = "";
            this.ids[a].icons_16 && d ? F = decodeURIComponent(this.ids[a].icons_16) : this.ids[a].icons_32 && !d ? F = decodeURIComponent(this.ids[a].icons_32) : (D = 120 < this.getPPI() ? d ? 32 : 64 : d ? 16 : 32,
            F = "providers-{size}-{theme}.png?version=img.3.0.1".replace("{size}", D).replace("{theme}", this.ids[a].theme),
            F = this.buildUrl("version/3.0/img/" + F),
            D = "smiles-{size}.png?version=img.3.0.1".replace("{size}", D).replace("{theme}", this.ids[a].theme),
            D = this.buildUrl("img/" + D),
            this.ids[a].hovered_sprite = D);
            F = "url(" + F + ") " + (d ? "0 -1px" : "0 -2px") + " no-repeat";
            b.innerHTML = "";
            if ("other" === this.ids[a].hidden) {
                var N = this.providerCodes.slice(0);
                if (this.ids[a].providers) {
                    D = this.ids[a].providers.split(",");
                    for (var G = 0; G < D.length; G++) {
                        var Q = this.inArray(D[G], N);
                        -1 !== Q && N.splice(Q, 1)
                    }
                }
                this.ids[a].hidden = N.toString()
            }
            if (this.ids[a].providers) {
                D = "relevant" === this.ids[a].sort ? this.relProviders(this.ids[a].providers, this.ids[a].hidden, 1) : this.ids[a].providers.split(",");
                var O;
                h += e * ("inset" === this.ids[a].hidden_button && 0 < this.ids[a].hidden.length ? D.length + 1 : D.length);
                e = x.createElement("div");
                this.ids[a].buttonsContainer = e;
                this.ids[a].buttonsContainer.className = "ulogin-buttons-container";
                this.resetStyle(e, {
                    width: h,
                    maxWidth: "100%",
                    minHeight: l,
                    verticalAlign: "top",
                    display: "inline-block",
                    lineHeight: 0
                });
                b.appendChild(e);
                for (O in D)
                    h = D[O],
                    N = this.inArray(h, this.providerCodes),
                    -1 < N && (e = x.createElement("div"),
                    e.className = "ulogin-button-" + h,
                    e.setAttribute("data-uloginbutton", h),
                    e.setAttribute("role", "button"),
                    e.setAttribute("title", this.providerNames[N]),
                    this.resetStyle(e, {
                        "float": "left",
                        width: l,
                        height: l,
                        margin: "0 " + v + "px " + v + "px 0",
                        background: F,
                        cursor: "pointer",
                        backgroundPosition: this.getIconPosition(d, N),
                        backgroundSize: A
                    }),
                    this.ids[a].buttonsContainer.appendChild(e))
            }
            this.ids[a].hidden && (b.style.position = "relative",
            "relevant" === this.ids[a].sort && (this.ids[a].hidden = this.relProviders(this.ids[a].providers, this.ids[a].hidden, 2).join(",")),
            this.ids[a].drop = x.createElement("div"),
            this.ids[a].drop.className = "ulogin-dropdown-button",
            this.resetStyle(this.ids[a].drop, {
                width: l,
                height: l,
                margin: "0 " + v + "px " + v + "px 0",
                cursor: "pointer",
                background: F,
                verticalAlign: "baseline",
                display: "inline-block",
                "float": "none",
                backgroundSize: A
            }),
            this.ids[a].mobile || (this.add(this.ids[a].drop, "mouseover", function(J) {
                uLogin.ids[a].showed = !1;
                uLogin.dropdownDelayed(a, d ? 1 : 2);
                uLogin.setOpacity(J, uLogin.ids[a].opacity)
            }),
            this.add(this.ids[a].drop, "mouseout", function(J) {
                uLogin.ids[a].showed = !0;
                uLogin.dropdownDelayed(a, 0);
                uLogin.setOpacity(J)
            }),
            this.add(this.ids[a].drop, "click", function() {
                uLogin.dropdown(a, d ? 1 : 2)
            })),
            "inset" === this.ids[a].hidden_button && this.ids[a].buttonsContainer ? this.ids[a].buttonsContainer.appendChild(this.ids[a].drop) : b.appendChild(this.ids[a].drop),
            this.ids[a].mobile || this.initDrop(a));
            this.ids[a].buttonsContainer && 0 < this.ids[a].buttonsContainer.clientHeight && (this.ids[a].buttonsContainer.style.height = this.ids[a].buttonsContainer.clientHeight - v + "px");
            window.bc = this.ids[a].buttonsContainer;
            this.initButtons(a)
        },
        initWindow: function(a) {
            var b = this.get(this.ids[a].id)
              , d = b.getElementsByTagName("*");
            d.length ? b = d[0] : b.innerHTML ? (d = document.createElement("span"),
            d.innerHTML = b.innerHTML,
            b.innerHTML = "",
            b = b.appendChild(d)) : (d = x.createElement("img"),
            d.setAttribute("src", this.buildUrl("img/button.png?version=img.3.0.1")),
            d.setAttribute("style", "cursor:pointer; width:187px; height:30px"),
            d.setAttribute("alt", "\u041c\u0443\u043b\u044c\u0442\u0438\u0412\u0445\u043e\u0434"),
            b = b.appendChild(d));
            b.setAttribute("data-uloginbutton", "window");
            b.setAttribute("data-ulogin-default", "true");
            this.ids[a].opacity = 75;
            this.initButtons(a)
        },
        sendPixel: function() {
            this.getRC();
            if (this.pixel) {
                var a = this;
                K(function() {
                    if (a.pixel) {
                        var b = x.createElement("iframe")
                          , d = a.getRC();
                        b.src = a.pixel.replace("[rand]", parseInt(1E5 * Math.random())).replace("[u]", encodeURIComponent(location.href)).replace("[r]", encodeURIComponent(x.referrer || ""));
                        b.width = b.height = 1;
                        b.style.display = "none";
                        d.appendChild(b);
                        K(function() {
                            d.removeChild(b)
                        }, 3E3);
                        a.pixel = !1
                    }
                }, 0)
            }
        },
        sendStats: function(a) {
            var b = {
                r: parseInt(1E5 * Math.random())
            };
            a.type && (b.type = a.type);
            a = this.buildUrl("stats.html", b);
            this.initSocket(a, this.getRC())
        },
        mergeAccounts: function(a, b) {
            if (!a)
                return console.error('uLogin ERROR (mergeAccounts): invalid token "' + a + '"'),
                !1;
            var d = {
                token: a
            };
            b ? ("undefined" !== typeof b.join && (b = b.join(",")),
            d.identities = encodeURIComponent(b),
            d = this.buildUrl("merge_accounts.php", d)) : d = this.buildUrl("require_verify.php", d);
            this.loadWindow(d)
        },
        getRC: function() {
            var a = document.getElementById("ulogin_receiver_container");
            a || (a = x.createElement("div"),
            a.setAttribute("id", "ulogin_receiver_container"),
            this.resetStyle(a, {
                width: 0,
                height: 0,
                display: "none"
            }),
            x.getElementsByTagName("body")[0].appendChild(a));
            return a
        },
        clearTimeouts: function() {
            for (var a in this.timeouts)
                clearTimeout(this.timeouts[a])
        },
        callbackTryCall: function(a, b) {
            this.altwayCalled.push(a);
            q[a] ? setTimeout(function() {
                q[a].call(q, b)
            }, 10) : setTimeout(function() {
                uLogin.callbackTryCall(a, b)
            }, 100)
        },
        callbackReceived: function() {
            var a = location.search.replace("?", "");
            if ((a = this.parse(a)) && a.ulogin_callback && a.ulogin_token && -1 === this.inArray(a.ulogin_callback, this.altwayCalled) && (this.callbackTryCall(a.ulogin_callback, a.ulogin_token),
            this.supportHistory)) {
                var b = document.getElementsByTagName("title");
                b = (b = b ? b[0] : "") ? b.innerHTML : "";
                delete a.ulogin_callback;
                delete a.ulogin_token;
                a = this.buildUrl("", a, !0);
                var d = location.origin + location.pathname + a + location.hash;
                K(function() {
                    window.history.pushState({}, b, d)
                }, 1E3)
            }
        },
        newDialogSocket: function(a) {
            this.dialogSocket && this.dialogSocket.destroy();
            this.dialogSocket = a
        },
        initSocket: function(a, b, d, e) {
            e || (e = 0);
            var l = new easyXDM.Socket({
                remote: a,
                swf: this.isIE() ? this.buildUrl("js/easyxdm.swf") : "",
                props: {
                    style: this.extend({
                        margin: 0,
                        padding: 0,
                        background: "#fff",
                        border: 0,
                        position: "absolute",
                        left: 0,
                        top: 0,
                        overflow: "hidden",
                        width: "100%",
                        height: "100%"
                    }, d),
                    frameBorder: "0"
                },
                container: b,
                onMessage: function(h) {
                    var v;
                    /weights:/.test(h) || console.info("[uLogin] ulogin.js received message: " + h);
                    if (v = h.match(/(.*?)\((.*?)\)/)) {
                        var A = v[1];
                        h = v[2]
                    }
                    if (v = h.match(/^(.*?):(.*?)$/)) {
                        var F = v[1];
                        var D = v[2]
                    }
                    /^https?:\/\//.test(h) ? location.href = h : /^\/auth.php\?/.test(h) ? (h = "https://" + uLogin.uLoginHost + h,
                    uLogin.ids[e].altway ? location.href = h : uLogin.openWithReceiver(h, e)) : -1 < uLogin.inArray(h, uLogin.states) ? uLogin._changeState(e, h) : F && -1 < uLogin.inArray(F, uLogin.states) ? uLogin._changeState(e, F, "string" === typeof D ? D.split(",") : []) : "closeme" == h ? (uLogin.hideAll(),
                    l.destroy()) : /to_window:/.test(h) ? (A = uLogin.buildUrl(h.replace(/to_window:\/?/, "", ""), {
                        set: encodeURIComponent("{window:1}")
                    }),
                    uLogin.loadWindow(A),
                    /to_window:\/fill\.php/.test(h) && uLogin._changeState(e, "fill")) : /weights:/.test(h) ? uLogin.setWeights(h.replace(/weights:\/?/, "", "")) : A ? "undefined" != typeof q[A] && (q[A].apply(q, h.split(",")),
                    l.destroy(),
                    uLogin.dialog && uLogin.hideAll()) : uLogin.ids[e] && "undefined" != typeof q[uLogin.ids[e].callback] && (uLogin._changeState(e, "receive"),
                    q[uLogin.ids[e].callback](h),
                    uLogin.dialog && uLogin.hideAll())
                }
            });
            return l
        },
        getWidgetNumber: function(a) {
            for (var b = 0; b < this.ids.length; b++)
                if (a == this.ids[b].id)
                    return b;
            return NaN
        },
        onMoveWindow: function() {
            this.moveWindow()
        },
        loadWindow: function(a, b) {
            null === b && (b = !1);
            var d = this.ids[b] ? this.ids[b].opacity : 75;
            try {
                x.body.removeChild(this.lightbox)
            } catch (l) {}
            try {
                x.body.removeChild(this.dialog)
            } catch (l) {}
            var e = x.createElement("div");
            this.resetStyle(e, {
                position: "fixed",
                zIndex: 9997,
                width: "100%",
                height: "100%",
                background: "#" + (this.ids[b] ? this.ids[b].color : "fff"),
                display: "none"
            });
            this.setOpacity(e, d);
            this.lightbox = e;
            e = x.createElement("div");
            e.id = this.genID();
            e.className = "ulogin-popup";
            this.resetStyle(e, {
                position: "absolute",
                zIndex: 9998,
                left: Math.floor(this.scrollLeft() + (this.clientWidth() - this.dialogWidth()) / 2),
                top: Math.floor(this.scrollTop() + (this.clientHeight() - this.dialogHeight()) / 2),
                width: this.dialogWidth(),
                height: this.dialogHeight(),
                overflow: "visible",
                display: "none",
                border: this.ids[b] && "flat" === this.ids[b].theme ? "5px solid #666" : "10px solid #666",
                borderRadius: this.ids[b] && "flat" === this.ids[b].theme ? 0 : "8px",
                boxShadow: "0 2px 3px 0 rgba(0,0,0,.2),0 3px 2px -2px rgba(0,0,0,.22),0 1px 6px 0 rgba(0,0,0,.12)"
            });
            this.dialog = e;
            e = x.createElement("div");
            e.className = "ulogin-popup-close";
            this.resetStyle(e, {
                position: "absolute",
                width: 30,
                height: 30,
                zIndex: 9999,
                background: "url(" + this.buildUrl("img/x.png") + ")",
                cursor: "pointer",
                display: "none",
                left: "initial",
                top: "-15px",
                right: "-15px"
            });
            this.close = e;
            x.body.appendChild(this.lightbox);
            x.body.appendChild(this.dialog);
            this.dialog.appendChild(this.close);
            this.add(this.lightbox, "click", function() {
                uLogin.hideAll()
            });
            this.add(this.close, "click", function() {
                uLogin.hideAll()
            });
            this.add(this.close, "mouseover", function(l) {
                l.style.background = "url(" + uLogin.buildUrl("img/x_.png") + ")"
            });
            this.add(this.close, "mouseout", function(l) {
                l.style.background = "url(" + uLogin.buildUrl("img/x.png") + ")"
            });
            this.add(q, "scroll", function() {
                uLogin.onMoveWindow()
            });
            this.add(q, "resize", function() {
                uLogin.onMoveWindow()
            });
            this.newDialogSocket(this.initSocket(a, this.dialog.getAttribute("id"), {}, b));
            uLogin.show(uLogin.close);
            uLogin.show(uLogin.lightbox);
            uLogin.show(uLogin.dialog);
            uLogin.onMoveWindow()
        },
        hideAll: function() {
            this.hide(this.lightbox);
            this.hide(this.dialog);
            this.hide(this.close);
            for (var a = 0; a < this.ids.length; a++)
                this.ids[a].showed = !1,
                this.hide(this.ids[a].hiddenW),
                this.hide(this.ids[a].hiddenA)
        },
        moveWindow: function() {
            if (!this.dialog || !this.dialog.firstChild)
                return !1;
            var a = this.dialogWidth()
              , b = this.dialogHeight();
            a = (Math.floor(this.scrollLeft() + (this.clientWidth() - a) / 2) - Number(this.dialog.style.left.slice(0, -2))) / 10;
            b = (Math.floor(this.scrollTop() + (this.clientHeight() - b) / 2) - Number(this.dialog.style.top.slice(0, -2))) / 10;
            for (var d = 0; 10 > d; d++)
                this.dialog.style.left = a + Number(this.dialog.style.left.slice(0, -2)) + "px",
                this.dialog.style.top = b + Number(this.dialog.style.top.slice(0, -2)) + "px"
        },
        resetStyle: function(a, b) {
            !b && (b = {});
            var d = this.extend({
                margin: 0,
                padding: 0,
                outline: "none",
                border: "none",
                borderRadius: 0,
                cursor: "default",
                "float": "none",
                position: "relative",
                display: "inherit",
                width: "auto",
                height: "auto",
                left: 0,
                top: 0,
                boxSizing: "content-box"
            }, b), e = ["width", "height", "left", "top"], l = ["float"], h;
            for (h in d) {
                -1 < this.inArray(h, e) && "number" === typeof d[h] && (d[h] += "px");
                try {
                    -1 < this.inArray(h, l) && a.style.setProperty(h, d[h])
                } catch (v) {}
                try {
                    a.style[h] = d[h]
                } catch (v) {}
            }
        },
        getIconPosition: function(a, b) {
            return a ? "0 -" + (18 + 17 * b) + "px" : "0 -" + (36 + 34 * b) + "px"
        },
        setOpacity: function(a, b) {
            a.style.filter = b ? "alpha(opacity=" + b + ") progid:DXImageTransform.Microsoft.AlphaImageLoader(src=transparent.png, sizingMethod='crop')" : "";
            a.style.opacity = b ? parseFloat(b) / 100 : ""
        },
        initDrop: function(a) {
            if (!this.ids[a].mobile && "" != this.ids[a].hidden) {
                var b = this.get(this.ids[a].id)
                  , d = this.genID();
                var e = 310 < 23 * this.ids[a].hidden.split(",").length - 2 ? 310 : 23 * this.ids[a].hidden.split(",").length - 2;
                var l = x.createElement("div");
                l.className = "ulogin-dropdown";
                l.id = d;
                this.resetStyle(l, {
                    position: "absolute",
                    zIndex: 9999,
                    width: 128,
                    height: e,
                    border: "flat" === this.ids[a].theme ? "3px solid #666" : "5px solid #666",
                    borderRadius: "flat" === this.ids[a].theme ? 0 : "4px",
                    boxShadow: "0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)",
                    display: "none"
                });
                this.ids[a].hiddenW = l;
                "body" === this.ids[a].dropdown_container ? x.body.appendChild(this.ids[a].hiddenW) : b.appendChild(this.ids[a].hiddenW);
                l = this.buildUrl("/version/3.0/html/drop.html", {
                    id: a,
                    redirect_uri: this.ids[a].redirect_uri,
                    callback: this.ids[a].callback,
                    providers: this.ids[a].hidden,
                    fields: this.ids[a].fields,
                    force_fields: this.ids[a].force_fields,
                    popup_css: this.ids[a].popup_css,
                    optional: this.ids[a].optional,
                    othprov: this.ids[a].providers,
                    protocol: this.protocol,
                    host: this.host,
                    lang: this.ids[a].lang,
                    verify: this.ids[a].verify,
                    sort: this.ids[a].sort,
                    altway: this.ids[a].altway ? 1 : null,
                    m: this.ids[a].m ? 1 : 0,
                    icons_32: this.ids[a].icons_32,
                    icons_16: this.ids[a].icons_16,
                    theme: this.ids[a].theme,
                    client: this.ids[a].client,
                    page: this.page,
                    version: this.version
                });
                this.initSocket(l, d, {
                    position: "relative",
                    width: "128px",
                    height: e + "px"
                }, a);
                l = x.createElement("div");
                this.resetStyle(l, {
                    position: "absolute",
                    background: "#000",
                    left: "initial",
                    right: "flat" === this.ids[a].theme ? "-3px" : "-5px",
                    top: "100%",
                    width: 41,
                    height: 13,
                    border: "flat" === this.ids[a].theme ? "3px solid #666" : "5px solid #666",
                    textAlign: "center"
                });
                e = x.createElement("a");
                e.href = this.buildUrl("");
                e.target = "_blank";
                this.resetStyle(e, {
                    width: 41,
                    height: 13,
                    background: "url(" + this.buildUrl("img/text.png") + ") no-repeat"
                });
                l.appendChild(e);
                this.ids[a].hiddenW.appendChild(l);
                l = x.createElement("div");
                this.resetStyle(l, {
                    width: 0,
                    height: 0,
                    position: "absolute",
                    zIndex: 9999,
                    display: "none",
                    border: "5px solid transparent",
                    borderBottomColor: "#666"
                });
                this.ids[a].hiddenA = l;
                b.appendChild(this.ids[a].hiddenA);
                this.ids[a].showed = !1;
                this.add(x.body, "click", function(h, v) {
                    v.target || (v.target = v.srcElement);
                    for (var A = 0; A < uLogin.ids.length; A++)
                        v.target != uLogin.ids[A].drop && (uLogin.hide(uLogin.ids[A].hiddenW),
                        uLogin.hide(uLogin.ids[A].hiddenA))
                });
                this.ids[a].hiddenW && this.ids[a].hiddenA && (this.add(this.ids[a].hiddenW, "mouseout", function() {
                    uLogin.dropdownDelayed(a, 0)
                }),
                this.add(this.ids[a].hiddenA, "mouseout", function() {
                    uLogin.dropdownDelayed(a, 0)
                }),
                this.add(this.ids[a].hiddenW, "mouseover", function() {
                    uLogin.clearDropTimer(a)
                }),
                this.add(this.ids[a].hiddenA, "mouseover", function() {
                    uLogin.clearDropTimer(a)
                }))
            }
        },
        showDrop: function(a, b) {
            if (this.ids[a].hiddenW || this.ids[a].hiddenA)
                if (this.ids[a].showed || 0 == b)
                    this.hide(this.ids[a].hiddenW),
                    this.hide(this.ids[a].hiddenA),
                    this.ids[a].showed = !1;
                else {
                    this.show(this.ids[a].hiddenA);
                    this.show(this.ids[a].hiddenW);
                    this.ids[a].showed = !0;
                    var d = this.ids[a].drop;
                    if ("body" === this.ids[a].dropdown_container) {
                        var e = this.getOffset(d);
                        var l = e.left;
                        e = e.top;
                        this.ids[a].hiddenW.style.left = l - (1 == b ? 100 : 106) + "px";
                        this.ids[a].hiddenW.style.top = e + (1 == b ? 21 : 37) + "px";
                        this.ids[a].hiddenA.style.left = l + (1 == b ? 4 : 12) + "px";
                        this.ids[a].hiddenA.style.top = e + (1 == b ? 17 : 33) + "px"
                    }
                    l = d.offsetLeft;
                    e = d.offsetTop;
                    l -= d.scrollLeft;
                    e -= d.scrollTop;
                    "body" !== this.ids[a].dropdown_container && (this.ids[a].hiddenW.style.left = l - (1 == b ? 100 : 106) + "px",
                    this.ids[a].hiddenW.style.top = e + (1 == b ? 21 : 37) + "px");
                    this.ids[a].hiddenA.style.left = l + (1 == b ? 4 : 12) + "px";
                    this.ids[a].hiddenA.style.top = e + (1 == b ? 12 : 28) + "px"
                }
        },
        clearDropTimer: function(a) {
            this.ids[a].dropTimer && q.clearTimeout(this.ids[a].dropTimer)
        },
        dropdown: function(a, b) {
            this.ids[a].mobile || (this.clearDropTimer(a),
            this.showDrop(a, b))
        },
        dropdownDelayed: function(a, b) {
            this.clearDropTimer(a);
            this.ids[a].dropTimer = K(function() {
                uLogin.showDrop(a, b)
            }, 600)
        },
        initButtons: function(a) {
            var b = this.get(this.ids[a].id);
            this.ids[a].mobile && this.add(this.get(this.ids[a].id), "click", function(d, e) {
                e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                var l = uLogin.buildUrl("version/3.0/html/mobile.html", {
                    id: uLogin.ids[a].id,
                    redirect_uri: uLogin.ids[a].redirect_uri,
                    callback: uLogin.ids[a].callback,
                    fields: uLogin.ids[a].fields,
                    force_fields: uLogin.ids[a].force_fields,
                    popup_css: uLogin.ids[a].popup_css,
                    optional: uLogin.ids[a].optional,
                    protocol: uLogin.ids[a].protocol,
                    host: uLogin.host,
                    lang: uLogin.ids[a].lang,
                    verify: uLogin.ids[a].verify,
                    providers: uLogin.ids[a].providers,
                    hidden: uLogin.ids[a].hidden,
                    icons_32: uLogin.ids[a].icons_32,
                    altway: uLogin.ids[a].altway ? 1 : null,
                    page: uLogin.page,
                    m: uLogin.ids[a].m ? 1 : 0,
                    icons_16: uLogin.ids[a].icons_16,
                    theme: uLogin.ids[a].theme,
                    client: uLogin.ids[a].client,
                    version: uLogin.version
                });
                uLogin.ids[a].altway ? q.top ? q.top.location.href = l : location.href = l : uLogin.openWithReceiver(l, a);
                return !1
            });
            "window" === this.ids[a].type ? this._proceedChildren(b, this._(this._initButton), a) : (this.ids[a].providers = "",
            this._proceedChildren(b, this._(this._initButton), a),
            this.ids[a].providers = this.ids[a].providers.slice(0, this.ids[a].providers.length - 1));
            this._changeState(a, this.states[0])
        },
        _: function(a) {
            return function() {
                a.apply(uLogin, arguments)
            }
        },
        _proceedChildren: function(a, b, d) {
            a = a.childNodes;
            var e, l;
            for (l = 0; l < a.length; l++) {
                var h = a[l];
                h.getAttribute && (b(h, d),
                (e = h.getAttribute("data-uloginbutton") || h.getAttribute("x-ulogin-button")) && -1 < this.inArray(e, this.providerCodes) && !(new RegExp(e + "(,|$)","i")).test(this.ids[d].providers) && (this.ids[d].providers += e + ","));
                this._proceedChildren(h, b, d)
            }
        },
        _initButton: function(a, b) {
            var d = a.getAttribute("data-uloginbutton") || a.getAttribute("x-ulogin-button");
            if (d)
                if (-1 < this.inArray(d, this.providerCodes))
                    this.add(a, "mouseover", function(h) {
                        if (/disabled/.test(h.className))
                            return !1;
                        uLogin.setOpacity(h, parseFloat(uLogin.ids[b].opacity));
                        if (+new Date < +new Date("2017/04/02 03:00:00") && uLogin.ids[b].hovered_sprite && !h.getAttribute("data-original-background")) {
                            var v = h.offsetHeight * uLogin.randFromTo(0, 24)
                              , A = "ru" === uLogin.ids[b].lang ? "1 \u0430\u043f\u0440\u0435\u043b\u044f - \u0434\u0435\u043d\u044c \u0441\u043c\u0435\u0445\u0430! \u0423\u043b\u044b\u0431\u0430\u0439\u0442\u0435\u0441\u044c )" : "April Fools' Day is here!";
                            h.setAttribute("data-original-background", h.style.background);
                            h.style.background = "url(" + uLogin.ids[b].hovered_sprite + ") 0px -" + v + "px no-repeat";
                            h.setAttribute("data-original-title", h.getAttribute("title"));
                            h.setAttribute("title", A)
                        }
                    }),
                    this.add(a, "mouseout", function(h) {
                        if (/disabled/.test(h.className))
                            return !1;
                        uLogin.setOpacity(h);
                        h.getAttribute("data-original-background") && (h.style.background = h.getAttribute("data-original-background"),
                        h.removeAttribute("data-original-background"));
                        h.getAttribute("data-original-title") && (h.setAttribute("title", h.getAttribute("data-original-title")),
                        h.removeAttribute("data-original-title"))
                    }),
                    this.ids[b].mobile || this.add(a, "click", function(h) {
                        if (/disabled/.test(h.className))
                            return !1;
                        var v = h.getAttribute("data-uloginbutton") || h.getAttribute("x-ulogin-button");
                        if (h.getAttribute("data-disabled-click"))
                            return !1;
                        h.setAttribute("data-disabled-click", "1");
                        setTimeout(function() {
                            h.setAttribute("data-disabled-click", "")
                        }, 1E3);
                        uLogin.startAuth(v, "", b)
                    });
                else if ("window" === d && (this.ids[b].mobile || this.add(a, this.ids[b].event, function(h, v) {
                    v.preventDefault ? v.preventDefault() : v.returnValue = !1;
                    if (/disabled/.test(h.className))
                        return !1;
                    var A = uLogin.buildUrl(uLogin.ids[b].mobile ? "version/3.0/html/mobile.html" : "version/3.0/html/window.html", {
                        id: b,
                        redirect_uri: uLogin.ids[b].redirect_uri,
                        callback: uLogin.ids[b].callback,
                        fields: uLogin.ids[b].fields,
                        force_fields: uLogin.ids[b].force_fields,
                        popup_css: uLogin.ids[b].popup_css,
                        optional: uLogin.ids[b].optional,
                        protocol: uLogin.protocol,
                        host: uLogin.host,
                        lang: uLogin.ids[b].lang,
                        verify: uLogin.ids[b].verify,
                        sort: uLogin.ids[b].sort,
                        othprov: uLogin.ids[b].hidden,
                        providers: uLogin.ids[b].providers,
                        altway: uLogin.ids[b].altway ? 1 : null,
                        m: uLogin.ids[b].m ? 1 : 0,
                        icons_32: uLogin.ids[b].icons_32,
                        icons_16: uLogin.ids[b].icons_16,
                        theme: uLogin.ids[b].theme,
                        client: uLogin.ids[b].client,
                        page: uLogin.page,
                        version: uLogin.version
                    });
                    uLogin.loadWindow(A, b);
                    return !1
                }),
                a.getAttribute("data-ulogin-default"))) {
                    var e = this.buildUrl("img/" + ("ru" == this.ids[b].lang ? "" : this.ids[b].lang + "/") + "button.png?version=img.3.0.1")
                      , l = this.buildUrl("img/" + ("ru" == this.ids[b].lang ? "" : this.ids[b].lang + "/") + "button_.png");
                    a.src = e;
                    this.resetStyle(a, {
                        cursor: "pointer"
                    });
                    this.add(a, "mouseover", function(h) {
                        if (/disabled/.test(h.parentNode.className))
                            return !1;
                        h.src != l && (h.src = l)
                    });
                    this.add(a, "mouseout", function(h) {
                        if (/disabled/.test(h.parentNode.className))
                            return !1;
                        h.src != e && (h.src = e)
                    })
                }
        },
        randFromTo: function(a, b) {
            return Math.floor(Math.random() * b) + a
        },
        sendWeight: function(a) {
            this.initSocket(this.buildUrl("version/3.0/html/weight_set.html", {
                provider: a,
                r: parseInt(1E5 * Math.random())
            }), this.getRC(), {
                background: "transparent"
            })
        },
        setWeights: function(a) {
            this.supportStorage && (localStorage.providers_weight = a)
        },
        getWeights: function() {
            try {
                return JSON.parse(localStorage.providers_weight)
            } catch (a) {
                return {}
            }
        },
        relProviders: function(a, b, d) {
            a = a.split(",");
            b = b.split(",");
            if (this.supportStorage) {
                var e = this.getWeights(), l;
                for (l in e) {
                    e = this.inArray(l, a);
                    var h = this.inArray(l, b);
                    -1 !== e ? (a.splice(e, 1),
                    a.splice(0, 0, l)) : -1 !== h && (a.splice(0, 0, l),
                    b.splice(h, 1),
                    b.splice(0, 0, a[a.length - 1]),
                    a.splice(a.length - 1, 1))
                }
            }
            return 1 === d ? a : b
        },
        startAuth: function(a, b, d) {
            var e = {
                name: a,
                window: 1,
                lang: this.ids[d].lang,
                fields: this.ids[d].fields,
                force_fields: this.ids[d].force_fields,
                popup_css: this.ids[d].popup_css,
                host: this.host,
                optional: this.ids[d].optional,
                redirect_uri: this.ids[d].redirect_uri || location.href,
                verify: this.ids[d].verify,
                callback: this.ids[d].callback,
                screen: screen.width + "x" + screen.height,
                url: b,
                providers: this.ids[d].providers,
                hidden: this.ids[d].hidden,
                m: this.ids[d].m ? 1 : 0,
                page: this.page,
                icons_32: this.ids[d].icons_32,
                icons_16: this.ids[d].icons_16,
                theme: this.ids[d].theme,
                client: this.ids[d].client,
                version: this.version
            };
            this.ids[d].altway && (e.altway = 1);
            a = b || "webmoney" != a && "livejournal" != a && "openid" != a ? this.buildUrl("auth.php", e) : this.buildUrl("url.php", e);
            this._changeState(d, this.states[1]);
            this.ids[d].altway ? q.top ? q.top.location.href = a : location.href = a : this.openWithReceiver(a, d)
        },
        openWithReceiver: function(a, b) {
            !b && (b = 0);
            var d = 660
              , e = 420;
            /name=vkontakte/.test(a) ? e = 380 : /name=facebook/.test(a) ? (d = 560,
            e = 350) : /name=google/.test(a) ? (d = 800,
            e = 630) : /name=yandex/.test(a) ? (d = 990,
            e = 530) : /name=lastfm/.test(a) && (d = 1368,
            e = 894);
            this.openFromSocket ? this.authSocket.postMessage("window.open::" + a + "::" + d + "::" + e + "::" + (screen.width - d) / 2 + "::" + (screen.height - e) / 2) : (this.initSocket(this.buildUrl("/version/3.0/html/buttons_receiver.html", {
                four: encodeURIComponent(a),
                r: parseInt(1E5 * Math.random())
            }), this.getRC(), {
                background: "transparent"
            }, b),
            uLogin.getRC().getElementsByTagName("iframe"),
            window.open(a, "uLogin_window", "width=" + d + ",height=" + e + ",left=" + (screen.width - d) / 2 + ",top=" + (screen.height - e) / 2))
        },
        checkWindow: function(a, b) {},
        checkCurrentWidgets: function() {
            for (var a = 0; this.ids[a]; )
                this.checkWidget(this.ids[a++].id)
        },
        checkWidget: function(a, b) {
            var d = this.get(a);
            if (d)
                if (this.inited(a)) {
                    var e = this.getWidgetNumber(a)
                      , l = this.ids[e].type;
                    if (("small" === l || "panel" === l) && !d.childNodes.length)
                        return d = this.ids[e].id,
                        uLogin.ids[e].id = !1,
                        uLogin.initWidget(d),
                        !0;
                    d.getAttribute("data-ulogin-inited") || (d = this.ids[e].id,
                    uLogin.ids[e].id = !1,
                    uLogin.initWidget(d))
                } else
                    this.addWidget(this.get(a), b);
            else
                this.ids[this.getWidgetNumber(a)].id = !1
        },
        buildUrl: function(a, b, d) {
            b || (b = {});
            d || (d = !1);
            a = a ? "https://" + this.uLoginHost + "/" + a : "";
            var e = "", l;
            for (l in b) {
                var h = b[l];
                null !== h && (!d && (/\?/.test(h) || /\//.test(h) || /:/.test(h)) && (h = ""),
                e += l + "=" + h + "&")
            }
            0 < e.length && (e = e.substring(0, e.length - 1),
            a = a + (/\?/.test(a) ? "&" : "?") + e);
            return a
        },
        getWidget: function(a, b) {
            if (this.inited(b))
                return !1;
            if (this.widgetSettings[a])
                return this.setProp(b, uLogin.ids.length, this.widgetSettings[a]),
                !1;
            if (this.waitGetWidget[a] && -1 !== this.inArray(b, this.waitGetWidget[a]))
                return !1;
            this.waitGetWidget[a] || (this.waitGetWidget[a] = []);
            this.waitGetWidget[a].push(b);
            if (this.widgetSettings[a])
                this.setProp(b, this.ids.length, this.widgetSettings[a]);
            else {
                var d = this.getRC()
                  , e = x.createElement("script");
                e.async = !0;
                e.src = this.buildUrl("getwidget", {
                    widgetid: a
                });
                d.appendChild(e)
            }
        },
        forElements: function(a, b) {
            if (a && a.length)
                for (var d in a)
                    b(a[d])
        },
        setWidget: function(a, b, d) {
            !d && b && (d = b);
            if ("not_found" === a)
                return this.forElements(this.waitGetWidget[a], function(e) {
                    if ("string" !== typeof e)
                        return !1;
                    x.getElementById(e).setAttribute("data-uloginid", "")
                }),
                !1;
            d && !uLogin.widgetSettings[a] && "undefined" !== typeof d.display && (this.forElements(this.waitGetWidget[a], function(e) {
                if ("string" !== typeof e)
                    return !1;
                var l = x.getElementById(e);
                if (!l)
                    return console.error('uLogin ERROR: not found element with id "' + e + '"'),
                    !1;
                l = uLogin.parse(l.getAttribute("data-ulogin"));
                for (var h in l)
                    d[h] = l[h];
                uLogin.setProp(e, uLogin.ids.length, d)
            }),
            this.widgetSettings[a] = d)
        },
        customInit: function() {
            for (var a = 0; a < arguments.length; a++)
                if ("string" === typeof arguments[a]) {
                    var b = !1;
                    if (!uLogin.get(arguments[a]) || !arguments[a])
                        return console.error('uLogin ERROR (customInit): Element with ID="' + arguments[a] + '" not found'),
                        !1;
                    1 < arguments.length && "object" === typeof arguments[arguments.length - 1] && (b = arguments[arguments.length - 1]);
                    uLogin.checkWidget(arguments[a], b)
                }
        },
        getOffsetSum: function(a) {
            for (var b = 0, d = 0; a; )
                b += parseFloat(a.offsetTop),
                d += parseFloat(a.offsetLeft),
                a = a.offsetParent;
            return {
                top: Math.round(b),
                left: Math.round(d)
            }
        },
        getOffsetRect: function(a) {
            a = a.getBoundingClientRect();
            var b = document.body
              , d = document.documentElement;
            return {
                top: Math.round(a.top + (window.pageYOffset || d.scrollTop || b.scrollTop) - (d.clientTop || b.clientTop || 0)),
                left: Math.round(a.left + (window.pageXOffset || d.scrollLeft || b.scrollLeft) - (d.clientLeft || b.clientLeft || 0))
            }
        },
        getOffset: function(a) {
            return a.getBoundingClientRect ? this.getOffsetRect(a) : this.getOffsetSum(a)
        },
        checkAsyncWidgets: function() {
            var a = this.get("ulogin") || this.get("uLogin");
            a && a.id && this.addWidget(a)
        },
        setStateListener: function(a, b, d) {
            this.listeners[a] || (this.listeners[a] = {});
            this.listeners[a][b] || (this.listeners[a][b] = []);
            return this.listeners[a][b].push(d) - 1
        },
        removeStateListener: function(a, b, d) {
            return this.listeners[a] && this.listeners[a][d] ? this.listeners[a][d].splice(b, 1) : !1
        },
        _changeState: function(a, b, d) {
            try {
                this.ids[a].state = b;
                for (var e = 0; this.listeners[this.ids[a].id][b][e]; )
                    this.listeners[this.ids[a].id][b][e++].apply(q, "object" === typeof d ? d : [])
            } catch (l) {}
        },
        extend: function(a, b) {
            for (var d in b)
                a[d] = b[d];
            return a
        },
        arrayIntersectKey: function(a, b) {
            var d = [], e;
            for (e in a)
                e in b && d.push(e);
            return d
        }
    },
    -1 == uLogin.inArray(uLogin.lang, uLogin.langs) && (uLogin.lang = uLogin.langs[0]),
    uLogin.init("undefined" != typeof uLogin_query ? uLogin_query : ""));
    q.receiver = function(a, b, d) {
        uLogin._changeState(0, "receive", [a]);
        !d && b && (d = b);
        q[d](a)
    }
    ;
    q.redirect = function(a, b) {
        var d = x.createElement("form");
        d.action = b;
        d.method = "post";
        d.target = "_top";
        d.style.display = "none";
        var e = x.createElement("input");
        e.type = "hidden";
        e.name = "token";
        e.value = a;
        d.appendChild(e);
        x.body.appendChild(d);
        d.submit()
    }
}
)(window, document, navigator, setTimeout);
