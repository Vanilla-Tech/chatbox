/*! jQuery v3.4.1 | (c) JS Foundation and other contributors | jquery.org/license */

/*! jQuery v3.3.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-effects,-effects/Tween,-effects/animatedSelector | (c) JS Foundation and other contributors | jquery.org/license */
//     Underscore.js 1.9.1
//     http://underscorejs.org
//     (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
!(function () {
  var n =
    ("object" == typeof self && self.self === self && self) ||
    ("object" == typeof global && global.global === global && global) ||
    this ||
    {},
    r = n._,
    e = Array.prototype,
    o = Object.prototype,
    s = "undefined" != typeof Symbol ? Symbol.prototype : null,
    u = e.push,
    c = e.slice,
    p = o.toString,
    i = o.hasOwnProperty,
    t = Array.isArray,
    a = Object.keys,
    l = Object.create,
    f = function () { },
    h = function (n) {
      return n instanceof h
        ? n
        : this instanceof h
          ? void (this._wrapped = n)
          : new h(n);
    };
  "undefined" == typeof exports || exports.nodeType
    ? (n._ = h)
    : ("undefined" != typeof module &&
      !module.nodeType &&
      module.exports &&
      (exports = module.exports = h),
      (exports._ = h)),
    (h.VERSION = "1.9.1");
  var v,
    y = function (u, i, n) {
      if (void 0 === i) return u;
      switch (null == n ? 3 : n) {
        case 1:
          return function (n) {
            return u.call(i, n);
          };
        case 3:
          return function (n, r, t) {
            return u.call(i, n, r, t);
          };
        case 4:
          return function (n, r, t, e) {
            return u.call(i, n, r, t, e);
          };
      }
      return function () {
        return u.apply(i, arguments);
      };
    },
    d = function (n, r, t) {
      return h.iteratee !== v
        ? h.iteratee(n, r)
        : null == n
          ? h.identity
          : h.isFunction(n)
            ? y(n, r, t)
            : h.isObject(n) && !h.isArray(n)
              ? h.matcher(n)
              : h.property(n);
    };
  h.iteratee = v = function (n, r) {
    return d(n, r, 1 / 0);
  };
  var g = function (u, i) {
    return (
      (i = null == i ? u.length - 1 : +i),
      function () {
        for (
          var n = Math.max(arguments.length - i, 0), r = Array(n), t = 0;
          t < n;
          t++
        )
          r[t] = arguments[t + i];
        switch (i) {
          case 0:
            return u.call(this, r);
          case 1:
            return u.call(this, arguments[0], r);
          case 2:
            return u.call(this, arguments[0], arguments[1], r);
        }
        var e = Array(i + 1);
        for (t = 0; t < i; t++) e[t] = arguments[t];
        return (e[i] = r), u.apply(this, e);
      }
    );
  },
    m = function (n) {
      if (!h.isObject(n)) return {};
      if (l) return l(n);
      f.prototype = n;
      var r = new f();
      return (f.prototype = null), r;
    },
    b = function (r) {
      return function (n) {
        return null == n ? void 0 : n[r];
      };
    },
    j = function (n, r) {
      return null != n && i.call(n, r);
    },
    x = function (n, r) {
      for (var t = r.length, e = 0; e < t; e++) {
        if (null == n) return;
        n = n[r[e]];
      }
      return t ? n : void 0;
    },
    _ = Math.pow(2, 53) - 1,
    A = b("length"),
    w = function (n) {
      var r = A(n);
      return "number" == typeof r && 0 <= r && r <= _;
    };
  (h.each = h.forEach = function (n, r, t) {
    var e, u;
    if (((r = y(r, t)), w(n)))
      for (e = 0, u = n.length; e < u; e++) r(n[e], e, n);
    else {
      var i = h.keys(n);
      for (e = 0, u = i.length; e < u; e++) r(n[i[e]], i[e], n);
    }
    return n;
  }),
    (h.map = h.collect = function (n, r, t) {
      r = d(r, t);
      for (
        var e = !w(n) && h.keys(n), u = (e || n).length, i = Array(u), o = 0;
        o < u;
        o++
      ) {
        var a = e ? e[o] : o;
        i[o] = r(n[a], a, n);
      }
      return i;
    });
  var O = function (c) {
    return function (n, r, t, e) {
      var u = 3 <= arguments.length;
      return (function (n, r, t, e) {
        var u = !w(n) && h.keys(n),
          i = (u || n).length,
          o = 0 < c ? 0 : i - 1;
        for (e || ((t = n[u ? u[o] : o]), (o += c)); 0 <= o && o < i; o += c) {
          var a = u ? u[o] : o;
          t = r(t, n[a], a, n);
        }
        return t;
      })(n, y(r, e, 4), t, u);
    };
  };
  (h.reduce = h.foldl = h.inject = O(1)),
    (h.reduceRight = h.foldr = O(-1)),
    (h.find = h.detect = function (n, r, t) {
      var e = (w(n) ? h.findIndex : h.findKey)(n, r, t);
      if (void 0 !== e && -1 !== e) return n[e];
    }),
    (h.filter = h.select = function (n, e, r) {
      var u = [];
      return (
        (e = d(e, r)),
        h.each(n, function (n, r, t) {
          e(n, r, t) && u.push(n);
        }),
        u
      );
    }),
    (h.reject = function (n, r, t) {
      return h.filter(n, h.negate(d(r)), t);
    }),
    (h.every = h.all = function (n, r, t) {
      r = d(r, t);
      for (var e = !w(n) && h.keys(n), u = (e || n).length, i = 0; i < u; i++) {
        var o = e ? e[i] : i;
        if (!r(n[o], o, n)) return !1;
      }
      return !0;
    }),
    (h.some = h.any = function (n, r, t) {
      r = d(r, t);
      for (var e = !w(n) && h.keys(n), u = (e || n).length, i = 0; i < u; i++) {
        var o = e ? e[i] : i;
        if (r(n[o], o, n)) return !0;
      }
      return !1;
    }),
    (h.contains = h.includes = h.include = function (n, r, t, e) {
      return (
        w(n) || (n = h.values(n)),
        ("number" != typeof t || e) && (t = 0),
        0 <= h.indexOf(n, r, t)
      );
    }),
    (h.invoke = g(function (n, t, e) {
      var u, i;
      return (
        h.isFunction(t)
          ? (i = t)
          : h.isArray(t) && ((u = t.slice(0, -1)), (t = t[t.length - 1])),
        h.map(n, function (n) {
          var r = i;
          if (!r) {
            if ((u && u.length && (n = x(n, u)), null == n)) return;
            r = n[t];
          }
          return null == r ? r : r.apply(n, e);
        })
      );
    })),
    (h.pluck = function (n, r) {
      return h.map(n, h.property(r));
    }),
    (h.where = function (n, r) {
      return h.filter(n, h.matcher(r));
    }),
    (h.findWhere = function (n, r) {
      return h.find(n, h.matcher(r));
    }),
    (h.max = function (n, e, r) {
      var t,
        u,
        i = -1 / 0,
        o = -1 / 0;
      if (
        null == e ||
        ("number" == typeof e && "object" != typeof n[0] && null != n)
      )
        for (var a = 0, c = (n = w(n) ? n : h.values(n)).length; a < c; a++)
          null != (t = n[a]) && i < t && (i = t);
      else
        (e = d(e, r)),
          h.each(n, function (n, r, t) {
            (u = e(n, r, t)),
              (o < u || (u === -1 / 0 && i === -1 / 0)) && ((i = n), (o = u));
          });
      return i;
    }),
    (h.min = function (n, e, r) {
      var t,
        u,
        i = 1 / 0,
        o = 1 / 0;
      if (
        null == e ||
        ("number" == typeof e && "object" != typeof n[0] && null != n)
      )
        for (var a = 0, c = (n = w(n) ? n : h.values(n)).length; a < c; a++)
          null != (t = n[a]) && t < i && (i = t);
      else
        (e = d(e, r)),
          h.each(n, function (n, r, t) {
            ((u = e(n, r, t)) < o || (u === 1 / 0 && i === 1 / 0)) &&
              ((i = n), (o = u));
          });
      return i;
    }),
    (h.shuffle = function (n) {
      return h.sample(n, 1 / 0);
    }),
    (h.sample = function (n, r, t) {
      if (null == r || t)
        return w(n) || (n = h.values(n)), n[h.random(n.length - 1)];
      var e = w(n) ? h.clone(n) : h.values(n),
        u = A(e);
      r = Math.max(Math.min(r, u), 0);
      for (var i = u - 1, o = 0; o < r; o++) {
        var a = h.random(o, i),
          c = e[o];
        (e[o] = e[a]), (e[a] = c);
      }
      return e.slice(0, r);
    }),
    (h.sortBy = function (n, e, r) {
      var u = 0;
      return (
        (e = d(e, r)),
        h.pluck(
          h
            .map(n, function (n, r, t) {
              return { value: n, index: u++, criteria: e(n, r, t) };
            })
            .sort(function (n, r) {
              var t = n.criteria,
                e = r.criteria;
              if (t !== e) {
                if (e < t || void 0 === t) return 1;
                if (t < e || void 0 === e) return -1;
              }
              return n.index - r.index;
            }),
          "value"
        )
      );
    });
  var k = function (o, r) {
    return function (e, u, n) {
      var i = r ? [[], []] : {};
      return (
        (u = d(u, n)),
        h.each(e, function (n, r) {
          var t = u(n, r, e);
          o(i, n, t);
        }),
        i
      );
    };
  };
  (h.groupBy = k(function (n, r, t) {
    j(n, t) ? n[t].push(r) : (n[t] = [r]);
  })),
    (h.indexBy = k(function (n, r, t) {
      n[t] = r;
    })),
    (h.countBy = k(function (n, r, t) {
      j(n, t) ? n[t]++ : (n[t] = 1);
    }));
  var S = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
  (h.toArray = function (n) {
    return n
      ? h.isArray(n)
        ? c.call(n)
        : h.isString(n)
          ? n.match(S)
          : w(n)
            ? h.map(n, h.identity)
            : h.values(n)
      : [];
  }),
    (h.size = function (n) {
      return null == n ? 0 : w(n) ? n.length : h.keys(n).length;
    }),
    (h.partition = k(function (n, r, t) {
      n[t ? 0 : 1].push(r);
    }, !0)),
    (h.first = h.head = h.take = function (n, r, t) {
      return null == n || n.length < 1
        ? null == r
          ? void 0
          : []
        : null == r || t
          ? n[0]
          : h.initial(n, n.length - r);
    }),
    (h.initial = function (n, r, t) {
      return c.call(n, 0, Math.max(0, n.length - (null == r || t ? 1 : r)));
    }),
    (h.last = function (n, r, t) {
      return null == n || n.length < 1
        ? null == r
          ? void 0
          : []
        : null == r || t
          ? n[n.length - 1]
          : h.rest(n, Math.max(0, n.length - r));
    }),
    (h.rest = h.tail = h.drop = function (n, r, t) {
      return c.call(n, null == r || t ? 1 : r);
    }),
    (h.compact = function (n) {
      return h.filter(n, Boolean);
    });
  var M = function (n, r, t, e) {
    for (var u = (e = e || []).length, i = 0, o = A(n); i < o; i++) {
      var a = n[i];
      if (w(a) && (h.isArray(a) || h.isArguments(a)))
        if (r) for (var c = 0, l = a.length; c < l;) e[u++] = a[c++];
        else M(a, r, t, e), (u = e.length);
      else t || (e[u++] = a);
    }
    return e;
  };
  (h.flatten = function (n, r) {
    return M(n, r, !1);
  }),
    (h.without = g(function (n, r) {
      return h.difference(n, r);
    })),
    (h.uniq = h.unique = function (n, r, t, e) {
      h.isBoolean(r) || ((e = t), (t = r), (r = !1)),
        null != t && (t = d(t, e));
      for (var u = [], i = [], o = 0, a = A(n); o < a; o++) {
        var c = n[o],
          l = t ? t(c, o, n) : c;
        r && !t
          ? ((o && i === l) || u.push(c), (i = l))
          : t
            ? h.contains(i, l) || (i.push(l), u.push(c))
            : h.contains(u, c) || u.push(c);
      }
      return u;
    }),
    (h.union = g(function (n) {
      return h.uniq(M(n, !0, !0));
    })),
    (h.intersection = function (n) {
      for (var r = [], t = arguments.length, e = 0, u = A(n); e < u; e++) {
        var i = n[e];
        if (!h.contains(r, i)) {
          var o;
          for (o = 1; o < t && h.contains(arguments[o], i); o++);
          o === t && r.push(i);
        }
      }
      return r;
    }),
    (h.difference = g(function (n, r) {
      return (
        (r = M(r, !0, !0)),
        h.filter(n, function (n) {
          return !h.contains(r, n);
        })
      );
    })),
    (h.unzip = function (n) {
      for (
        var r = (n && h.max(n, A).length) || 0, t = Array(r), e = 0;
        e < r;
        e++
      )
        t[e] = h.pluck(n, e);
      return t;
    }),
    (h.zip = g(h.unzip)),
    (h.object = function (n, r) {
      for (var t = {}, e = 0, u = A(n); e < u; e++)
        r ? (t[n[e]] = r[e]) : (t[n[e][0]] = n[e][1]);
      return t;
    });
  var F = function (i) {
    return function (n, r, t) {
      r = d(r, t);
      for (var e = A(n), u = 0 < i ? 0 : e - 1; 0 <= u && u < e; u += i)
        if (r(n[u], u, n)) return u;
      return -1;
    };
  };
  (h.findIndex = F(1)),
    (h.findLastIndex = F(-1)),
    (h.sortedIndex = function (n, r, t, e) {
      for (var u = (t = d(t, e, 1))(r), i = 0, o = A(n); i < o;) {
        var a = Math.floor((i + o) / 2);
        t(n[a]) < u ? (i = a + 1) : (o = a);
      }
      return i;
    });
  var E = function (i, o, a) {
    return function (n, r, t) {
      var e = 0,
        u = A(n);
      if ("number" == typeof t)
        0 < i
          ? (e = 0 <= t ? t : Math.max(t + u, e))
          : (u = 0 <= t ? Math.min(t + 1, u) : t + u + 1);
      else if (a && t && u) return n[(t = a(n, r))] === r ? t : -1;
      if (r != r) return 0 <= (t = o(c.call(n, e, u), h.isNaN)) ? t + e : -1;
      for (t = 0 < i ? e : u - 1; 0 <= t && t < u; t += i)
        if (n[t] === r) return t;
      return -1;
    };
  };
  (h.indexOf = E(1, h.findIndex, h.sortedIndex)),
    (h.lastIndexOf = E(-1, h.findLastIndex)),
    (h.range = function (n, r, t) {
      null == r && ((r = n || 0), (n = 0)), t || (t = r < n ? -1 : 1);
      for (
        var e = Math.max(Math.ceil((r - n) / t), 0), u = Array(e), i = 0;
        i < e;
        i++ , n += t
      )
        u[i] = n;
      return u;
    }),
    (h.chunk = function (n, r) {
      if (null == r || r < 1) return [];
      for (var t = [], e = 0, u = n.length; e < u;)
        t.push(c.call(n, e, (e += r)));
      return t;
    });
  var N = function (n, r, t, e, u) {
    if (!(e instanceof r)) return n.apply(t, u);
    var i = m(n.prototype),
      o = n.apply(i, u);
    return h.isObject(o) ? o : i;
  };
  (h.bind = g(function (r, t, e) {
    if (!h.isFunction(r))
      throw new TypeError("Bind must be called on a function");
    var u = g(function (n) {
      return N(r, u, t, this, e.concat(n));
    });
    return u;
  })),
    (h.partial = g(function (u, i) {
      var o = h.partial.placeholder,
        a = function () {
          for (var n = 0, r = i.length, t = Array(r), e = 0; e < r; e++)
            t[e] = i[e] === o ? arguments[n++] : i[e];
          for (; n < arguments.length;) t.push(arguments[n++]);
          return N(u, a, this, this, t);
        };
      return a;
    })),
    ((h.partial.placeholder = h).bindAll = g(function (n, r) {
      var t = (r = M(r, !1, !1)).length;
      if (t < 1) throw new Error("bindAll must be passed function names");
      for (; t--;) {
        var e = r[t];
        n[e] = h.bind(n[e], n);
      }
    })),
    (h.memoize = function (e, u) {
      var i = function (n) {
        var r = i.cache,
          t = "" + (u ? u.apply(this, arguments) : n);
        return j(r, t) || (r[t] = e.apply(this, arguments)), r[t];
      };
      return (i.cache = {}), i;
    }),
    (h.delay = g(function (n, r, t) {
      return setTimeout(function () {
        return n.apply(null, t);
      }, r);
    })),
    (h.defer = h.partial(h.delay, h, 1)),
    (h.throttle = function (t, e, u) {
      var i,
        o,
        a,
        c,
        l = 0;
      u || (u = {});
      var f = function () {
        (l = !1 === u.leading ? 0 : h.now()),
          (i = null),
          (c = t.apply(o, a)),
          i || (o = a = null);
      },
        n = function () {
          var n = h.now();
          l || !1 !== u.leading || (l = n);
          var r = e - (n - l);
          return (
            (o = this),
            (a = arguments),
            r <= 0 || e < r
              ? (i && (clearTimeout(i), (i = null)),
                (l = n),
                (c = t.apply(o, a)),
                i || (o = a = null))
              : i || !1 === u.trailing || (i = setTimeout(f, r)),
            c
          );
        };
      return (
        (n.cancel = function () {
          clearTimeout(i), (l = 0), (i = o = a = null);
        }),
        n
      );
    }),
    (h.debounce = function (t, e, u) {
      var i,
        o,
        a = function (n, r) {
          (i = null), r && (o = t.apply(n, r));
        },
        n = g(function (n) {
          if ((i && clearTimeout(i), u)) {
            var r = !i;
            (i = setTimeout(a, e)), r && (o = t.apply(this, n));
          } else i = h.delay(a, e, this, n);
          return o;
        });
      return (
        (n.cancel = function () {
          clearTimeout(i), (i = null);
        }),
        n
      );
    }),
    (h.wrap = function (n, r) {
      return h.partial(r, n);
    }),
    (h.negate = function (n) {
      return function () {
        return !n.apply(this, arguments);
      };
    }),
    (h.compose = function () {
      var t = arguments,
        e = t.length - 1;
      return function () {
        for (var n = e, r = t[e].apply(this, arguments); n--;)
          r = t[n].call(this, r);
        return r;
      };
    }),
    (h.after = function (n, r) {
      return function () {
        if (--n < 1) return r.apply(this, arguments);
      };
    }),
    (h.before = function (n, r) {
      var t;
      return function () {
        return (
          0 < --n && (t = r.apply(this, arguments)), n <= 1 && (r = null), t
        );
      };
    }),
    (h.once = h.partial(h.before, 2)),
    (h.restArguments = g);
  var I = !{ toString: null }.propertyIsEnumerable("toString"),
    T = [
      "valueOf",
      "isPrototypeOf",
      "toString",
      "propertyIsEnumerable",
      "hasOwnProperty",
      "toLocaleString"
    ],
    B = function (n, r) {
      var t = T.length,
        e = n.constructor,
        u = (h.isFunction(e) && e.prototype) || o,
        i = "constructor";
      for (j(n, i) && !h.contains(r, i) && r.push(i); t--;)
        (i = T[t]) in n && n[i] !== u[i] && !h.contains(r, i) && r.push(i);
    };
  (h.keys = function (n) {
    if (!h.isObject(n)) return [];
    if (a) return a(n);
    var r = [];
    for (var t in n) j(n, t) && r.push(t);
    return I && B(n, r), r;
  }),
    (h.allKeys = function (n) {
      if (!h.isObject(n)) return [];
      var r = [];
      for (var t in n) r.push(t);
      return I && B(n, r), r;
    }),
    (h.values = function (n) {
      for (var r = h.keys(n), t = r.length, e = Array(t), u = 0; u < t; u++)
        e[u] = n[r[u]];
      return e;
    }),
    (h.mapObject = function (n, r, t) {
      r = d(r, t);
      for (var e = h.keys(n), u = e.length, i = {}, o = 0; o < u; o++) {
        var a = e[o];
        i[a] = r(n[a], a, n);
      }
      return i;
    }),
    (h.pairs = function (n) {
      for (var r = h.keys(n), t = r.length, e = Array(t), u = 0; u < t; u++)
        e[u] = [r[u], n[r[u]]];
      return e;
    }),
    (h.invert = function (n) {
      for (var r = {}, t = h.keys(n), e = 0, u = t.length; e < u; e++)
        r[n[t[e]]] = t[e];
      return r;
    }),
    (h.functions = h.methods = function (n) {
      var r = [];
      for (var t in n) h.isFunction(n[t]) && r.push(t);
      return r.sort();
    });
  var R = function (c, l) {
    return function (n) {
      var r = arguments.length;
      if ((l && (n = Object(n)), r < 2 || null == n)) return n;
      for (var t = 1; t < r; t++)
        for (var e = arguments[t], u = c(e), i = u.length, o = 0; o < i; o++) {
          var a = u[o];
          (l && void 0 !== n[a]) || (n[a] = e[a]);
        }
      return n;
    };
  };
  (h.extend = R(h.allKeys)),
    (h.extendOwn = h.assign = R(h.keys)),
    (h.findKey = function (n, r, t) {
      r = d(r, t);
      for (var e, u = h.keys(n), i = 0, o = u.length; i < o; i++)
        if (r(n[(e = u[i])], e, n)) return e;
    });
  var q,
    K,
    z = function (n, r, t) {
      return r in t;
    };
  (h.pick = g(function (n, r) {
    var t = {},
      e = r[0];
    if (null == n) return t;
    h.isFunction(e)
      ? (1 < r.length && (e = y(e, r[1])), (r = h.allKeys(n)))
      : ((e = z), (r = M(r, !1, !1)), (n = Object(n)));
    for (var u = 0, i = r.length; u < i; u++) {
      var o = r[u],
        a = n[o];
      e(a, o, n) && (t[o] = a);
    }
    return t;
  })),
    (h.omit = g(function (n, t) {
      var r,
        e = t[0];
      return (
        h.isFunction(e)
          ? ((e = h.negate(e)), 1 < t.length && (r = t[1]))
          : ((t = h.map(M(t, !1, !1), String)),
            (e = function (n, r) {
              return !h.contains(t, r);
            })),
        h.pick(n, e, r)
      );
    })),
    (h.defaults = R(h.allKeys, !0)),
    (h.create = function (n, r) {
      var t = m(n);
      return r && h.extendOwn(t, r), t;
    }),
    (h.clone = function (n) {
      return h.isObject(n) ? (h.isArray(n) ? n.slice() : h.extend({}, n)) : n;
    }),
    (h.tap = function (n, r) {
      return r(n), n;
    }),
    (h.isMatch = function (n, r) {
      var t = h.keys(r),
        e = t.length;
      if (null == n) return !e;
      for (var u = Object(n), i = 0; i < e; i++) {
        var o = t[i];
        if (r[o] !== u[o] || !(o in u)) return !1;
      }
      return !0;
    }),
    (q = function (n, r, t, e) {
      if (n === r) return 0 !== n || 1 / n == 1 / r;
      if (null == n || null == r) return !1;
      if (n != n) return r != r;
      var u = typeof n;
      return (
        ("function" === u || "object" === u || "object" == typeof r) &&
        K(n, r, t, e)
      );
    }),
    (K = function (n, r, t, e) {
      n instanceof h && (n = n._wrapped), r instanceof h && (r = r._wrapped);
      var u = p.call(n);
      if (u !== p.call(r)) return !1;
      switch (u) {
        case "[object RegExp]":
        case "[object String]":
          return "" + n == "" + r;
        case "[object Number]":
          return +n != +n ? +r != +r : 0 == +n ? 1 / +n == 1 / r : +n == +r;
        case "[object Date]":
        case "[object Boolean]":
          return +n == +r;
        case "[object Symbol]":
          return s.valueOf.call(n) === s.valueOf.call(r);
      }
      var i = "[object Array]" === u;
      if (!i) {
        if ("object" != typeof n || "object" != typeof r) return !1;
        var o = n.constructor,
          a = r.constructor;
        if (
          o !== a &&
          !(
            h.isFunction(o) &&
            o instanceof o &&
            h.isFunction(a) &&
            a instanceof a
          ) &&
          "constructor" in n &&
          "constructor" in r
        )
          return !1;
      }
      e = e || [];
      for (var c = (t = t || []).length; c--;)
        if (t[c] === n) return e[c] === r;
      if ((t.push(n), e.push(r), i)) {
        if ((c = n.length) !== r.length) return !1;
        for (; c--;) if (!q(n[c], r[c], t, e)) return !1;
      } else {
        var l,
          f = h.keys(n);
        if (((c = f.length), h.keys(r).length !== c)) return !1;
        for (; c--;)
          if (((l = f[c]), !j(r, l) || !q(n[l], r[l], t, e))) return !1;
      }
      return t.pop(), e.pop(), !0;
    }),
    (h.isEqual = function (n, r) {
      return q(n, r);
    }),
    (h.isEmpty = function (n) {
      return (
        null == n ||
        (w(n) && (h.isArray(n) || h.isString(n) || h.isArguments(n))
          ? 0 === n.length
          : 0 === h.keys(n).length)
      );
    }),
    (h.isElement = function (n) {
      return !(!n || 1 !== n.nodeType);
    }),
    (h.isArray =
      t ||
      function (n) {
        return "[object Array]" === p.call(n);
      }),
    (h.isObject = function (n) {
      var r = typeof n;
      return "function" === r || ("object" === r && !!n);
    }),
    h.each(
      [
        "Arguments",
        "Function",
        "String",
        "Number",
        "Date",
        "RegExp",
        "Error",
        "Symbol",
        "Map",
        "WeakMap",
        "Set",
        "WeakSet"
      ],
      function (r) {
        h["is" + r] = function (n) {
          return p.call(n) === "[object " + r + "]";
        };
      }
    ),
    h.isArguments(arguments) ||
    (h.isArguments = function (n) {
      return j(n, "callee");
    });
  var D = n.document && n.document.childNodes;
  "function" != typeof /./ &&
    "object" != typeof Int8Array &&
    "function" != typeof D &&
    (h.isFunction = function (n) {
      return "function" == typeof n || !1;
    }),
    (h.isFinite = function (n) {
      return !h.isSymbol(n) && isFinite(n) && !isNaN(parseFloat(n));
    }),
    (h.isNaN = function (n) {
      return h.isNumber(n) && isNaN(n);
    }),
    (h.isBoolean = function (n) {
      return !0 === n || !1 === n || "[object Boolean]" === p.call(n);
    }),
    (h.isNull = function (n) {
      return null === n;
    }),
    (h.isUndefined = function (n) {
      return void 0 === n;
    }),
    (h.has = function (n, r) {
      if (!h.isArray(r)) return j(n, r);
      for (var t = r.length, e = 0; e < t; e++) {
        var u = r[e];
        if (null == n || !i.call(n, u)) return !1;
        n = n[u];
      }
      return !!t;
    }),
    (h.noConflict = function () {
      return (n._ = r), this;
    }),
    (h.identity = function (n) {
      return n;
    }),
    (h.constant = function (n) {
      return function () {
        return n;
      };
    }),
    (h.noop = function () { }),
    (h.property = function (r) {
      return h.isArray(r)
        ? function (n) {
          return x(n, r);
        }
        : b(r);
    }),
    (h.propertyOf = function (r) {
      return null == r
        ? function () { }
        : function (n) {
          return h.isArray(n) ? x(r, n) : r[n];
        };
    }),
    (h.matcher = h.matches = function (r) {
      return (
        (r = h.extendOwn({}, r)),
        function (n) {
          return h.isMatch(n, r);
        }
      );
    }),
    (h.times = function (n, r, t) {
      var e = Array(Math.max(0, n));
      r = y(r, t, 1);
      for (var u = 0; u < n; u++) e[u] = r(u);
      return e;
    }),
    (h.random = function (n, r) {
      return (
        null == r && ((r = n), (n = 0)),
        n + Math.floor(Math.random() * (r - n + 1))
      );
    }),
    (h.now =
      Date.now ||
      function () {
        return new Date().getTime();
      });
  var L = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  },
    P = h.invert(L),
    W = function (r) {
      var t = function (n) {
        return r[n];
      },
        n = "(?:" + h.keys(r).join("|") + ")",
        e = RegExp(n),
        u = RegExp(n, "g");
      return function (n) {
        return (n = null == n ? "" : "" + n), e.test(n) ? n.replace(u, t) : n;
      };
    };
  (h.escape = W(L)),
    (h.unescape = W(P)),
    (h.result = function (n, r, t) {
      h.isArray(r) || (r = [r]);
      var e = r.length;
      if (!e) return h.isFunction(t) ? t.call(n) : t;
      for (var u = 0; u < e; u++) {
        var i = null == n ? void 0 : n[r[u]];
        void 0 === i && ((i = t), (u = e)),
          (n = h.isFunction(i) ? i.call(n) : i);
      }
      return n;
    });
  var C = 0;
  (h.uniqueId = function (n) {
    var r = ++C + "";
    return n ? n + r : r;
  }),
    (h.templateSettings = {
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g
    });
  var J = /(.)^/,
    U = {
      "'": "'",
      "\\": "\\",
      "\r": "r",
      "\n": "n",
      "\u2028": "u2028",
      "\u2029": "u2029"
    },
    V = /\\|'|\r|\n|\u2028|\u2029/g,
    $ = function (n) {
      return "\\" + U[n];
    };
  (h.template = function (i, n, r) {
    !n && r && (n = r), (n = h.defaults({}, n, h.templateSettings));
    var t,
      e = RegExp(
        [
          (n.escape || J).source,
          (n.interpolate || J).source,
          (n.evaluate || J).source
        ].join("|") + "|$",
        "g"
      ),
      o = 0,
      a = "__p+='";
    i.replace(e, function (n, r, t, e, u) {
      return (
        (a += i.slice(o, u).replace(V, $)),
        (o = u + n.length),
        r
          ? (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'")
          : t
            ? (a += "'+\n((__t=(" + t + "))==null?'':__t)+\n'")
            : e && (a += "';\n" + e + "\n__p+='"),
        n
      );
    }),
      (a += "';\n"),
      n.variable || (a = "with(obj||{}){\n" + a + "}\n"),
      (a =
        "var __t,__p='',__j=Array.prototype.join," +
        "print=function(){__p+=__j.call(arguments,'');};\n" +
        a +
        "return __p;\n");
    try {
      t = new Function(n.variable || "obj", "_", a);
    } catch (n) {
      throw ((n.source = a), n);
    }
    var u = function (n) {
      return t.call(this, n, h);
    },
      c = n.variable || "obj";
    return (u.source = "function(" + c + "){\n" + a + "}"), u;
  }),
    (h.chain = function (n) {
      var r = h(n);
      return (r._chain = !0), r;
    });
  var G = function (n, r) {
    return n._chain ? h(r).chain() : r;
  };
  (h.mixin = function (t) {
    return (
      h.each(h.functions(t), function (n) {
        var r = (h[n] = t[n]);
        h.prototype[n] = function () {
          var n = [this._wrapped];
          return u.apply(n, arguments), G(this, r.apply(h, n));
        };
      }),
      h
    );
  }),
    h.mixin(h),
    h.each(
      ["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
      function (r) {
        var t = e[r];
        h.prototype[r] = function () {
          var n = this._wrapped;
          return (
            t.apply(n, arguments),
            ("shift" !== r && "splice" !== r) || 0 !== n.length || delete n[0],
            G(this, n)
          );
        };
      }
    ),
    h.each(["concat", "join", "slice"], function (n) {
      var r = e[n];
      h.prototype[n] = function () {
        return G(this, r.apply(this._wrapped, arguments));
      };
    }),
    (h.prototype.value = function () {
      return this._wrapped;
    }),
    (h.prototype.valueOf = h.prototype.toJSON = h.prototype.value),
    (h.prototype.toString = function () {
      return String(this._wrapped);
    }),
    "function" == typeof define &&
    define.amd &&
    define("underscore", [], function () {
      return h;
    });
})();

var validateFromData = null;
!(function t(e, a, r) {
  function n(u, o) {
    if (!a[u]) {
      if (!e[u]) {
        var l = "function" == typeof require && require;
        if (!o && l) return l(u, !0);
        if (i) return i(u, !0);
        var f = new Error("Cannot find module '" + u + "'");
        throw ((f.code = "MODULE_NOT_FOUND"), f);
      }
      var d = (a[u] = { exports: {} });
      e[u][0].call(
        d.exports,
        function (t) {
          var a = e[u][1][t];
          return n(a || t);
        },
        d,
        d.exports,
        t,
        e,
        a,
        r
      );
    }
    return a[u].exports;
  }
  for (
    var i = "function" == typeof require && require, u = 0;
    u < r.length;
    u++
  )
    n(r[u]);
  return n;
})(
  {
    1: [
      function (t, e, a) {
        "use strict";
        var r = t("./validator");
        validateFromData = r;
        if ("undefined" == typeof jQuery)
          throw new Error(
            "jQuery Simple Validator 1.0.0 requires jQuery 3.3.1 or higher"
          );
        $(function () {
          (0, r.validateForms)();
        });
      },
      { "./validator": 3 }
    ],
    2: [
      function (t, e, a) {
        "use strict";
        function r(t) {
          return t.endsWith("kb")
            ? 1024 * parseInt(t)
            : t.endsWith("mb")
              ? 1024 * parseInt(t) * 1024
              : t.endsWith("gb")
                ? 1024 * parseInt(t) * 1024 * 1024
                : void 0;
        }
        Object.defineProperty(a, "__esModule", { value: !0 });
        var n =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
              return typeof t;
            }
            : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            };
        a.validationFn = {
          required: function (t) {
            return !!t.value;
          },
          email: function (t) {
            return !!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
              t.value
            );
          },
          url: function (t) {
            return !!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
              t.value
            );
          },
          mobile: function (t) {
            return !!/^\d{10}$/.test(t.value);
          },
          pattern: function (t) {
            if (!$(t.input).attr("required") && !$(t.input).val()) return true;
            return !!new RegExp($(t.input).attr("pattern")).test(t.value);
          },
          match: function (t) {
            return (
              $($(t.input).attr("data-match-field")).prop(t.property) == t.value
            );
          },
          fileTypes: function (t) {
            var e = t.input.files,
              a = $(t.input)
                .attr("data-file-types")
                .split(","),
              r = !1;
            return (
              Object.values(e).forEach(function (t) {
                "object" != (void 0 === t ? "undefined" : n(t)) ||
                  (r = a.find(function (e) {
                    return t.type == e;
                  }));
              }),
              r
            );
          },
          fileMaxSize: function (t) {
            var e = t.input.files,
              a = $(t.input)
                .attr("data-file-max-size")
                .toLowerCase(),
              i = 0,
              u = !0;
            return (
              (i = r(a)),
              Object.values(e).forEach(function (t) {
                "object" == (void 0 === t ? "undefined" : n(t)) &&
                  t.size > i &&
                  (u = !1);
              }),
              u
            );
          },
          fileMinSize: function (t) {
            var e = t.input.files,
              a = $(t.input)
                .attr("data-file-min-size")
                .toLowerCase(),
              i = 0,
              u = !0;
            return (
              (i = r(a)),
              Object.values(e).forEach(function (t) {
                "object" == (void 0 === t ? "undefined" : n(t)) &&
                  t.size < i &&
                  (u = !1);
              }),
              u
            );
          },
          isNumber: function (t) {
            return !!$.isNumeric(t.value);
          },
          max: function (t) {
            var e = parseInt($(t.input).attr("max"));
            return t.value <= e;
          },
          min: function (t) {
            var e = parseInt($(t.input).attr("min"));
            return t.value >= e;
          },
          maxLength: function (t) {
            var e = parseInt($(t.input).attr("maxlength"));
            return t.value.length <= e;
          },
          minLength: function (t) {
            var e = parseInt($(t.input).attr("minlength"));
            return t.value.length >= e;
          }
        };
      },
      {}
    ],
    3: [
      function (t, e, a) {
        "use strict";
        Object.defineProperty(a, "__esModule", { value: !0 }),
          (a.validateForms = void 0);
        var r = t("./validations"),
          n = ((a.validateForms = function () {
            $("form[validate=true]")
              .toArray()
              .forEach(function (t, e) {
                $(t).attr("novalidate", !0),
                  $(t).attr("data-uid", "form-" + e),
                  n(t);
              });
          }),
            function (t) {
              var e = $(t)
                .find("input, textarea, select")
                .toArray();
              i(e),
                $(t).on("submit", function (t) {
                  var a = !1;
                  e.forEach(function (e) {
                    u(e) || (a || ($(e).focus(), (a = !0)), t.preventDefault());
                  });
                });
            }),
          i = function (t) {
            t.forEach(function (t, e) {
              var a = $(t)
                .parent("form")
                .attr("data-uid"),
                r = "blur";
              $(t).attr("data-uid", a + "-field-" + e),
                "file" == $(t).attr("type") && (r = "change"),
                $(t).on(r, function (e) {
                  u(t);
                });
            });
          },
          u = function (t) {
            var e = !0;
            if (
              ($(t).attr("required") &&
                (e =
                  "checkbox" == $(t).attr("type")
                    ? e
                      ? o(
                        t,
                        "checked",
                        r.validationFn.required,
                        "You need to check this"
                      )
                      : e
                    : e
                      ? o(
                        t,
                        "value",
                        r.validationFn.required,
                        "This field is required"
                      )
                      : e),
                "email" == $(t).attr("type") &&
                (e = e
                  ? o(t, "value", r.validationFn.email, "The email is invalid")
                  : e),
                "url" == $(t).attr("type") &&
                (e = e
                  ? o(t, "value", r.validationFn.url, "The url is invalid")
                  : e),
                "mobile" == $(t).attr("type") &&
                (e = e
                  ? o(
                    t,
                    "value",
                    r.validationFn.mobile,
                    "The mobile number is invalid"
                  )
                  : e),
                $(t).attr("pattern") &&
                (e = e
                  ? o(
                    t,
                    "value",
                    r.validationFn.pattern,
                    "Please match the requested pattern"
                  )
                  : e),
                $(t).attr("data-match-field") &&
                (e = e
                  ? o(
                    t,
                    "value",
                    r.validationFn.match,
                    $(t).attr("data-match") + " fields does not match"
                  )
                  : e),
                "file" == $(t).attr("type"))
            ) {
              if (
                ($(t).attr("data-file-types") &&
                  (e = e
                    ? o(
                      t,
                      "",
                      r.validationFn.fileTypes,
                      "Invalid file type selected"
                    )
                    : e),
                  $(t).attr("data-file-max-size"))
              ) {
                var a = $(t).attr("data-file-max-size");
                e = e
                  ? o(
                    t,
                    "",
                    r.validationFn.fileMaxSize,
                    "File size must be < " + a
                  )
                  : e;
              }
              if ($(t).attr("data-file-min-size")) {
                var n = $(t).attr("data-file-min-size");
                e = e
                  ? o(
                    t,
                    "",
                    r.validationFn.fileMinSize,
                    "File size must be > " + n
                  )
                  : e;
              }
            }
            if ("number" == $(t).attr("type")) {
              if (
                ((e = e
                  ? o(
                    t,
                    "value",
                    r.validationFn.isNumber,
                    "This is not a number"
                  )
                  : e),
                  $(t).attr("max"))
              ) {
                var i = $(t).attr("max");
                e = e
                  ? o(t, "value", r.validationFn.max, "This should be < " + i)
                  : e;
              }
              if ($(t).attr("min")) {
                var u = $(t).attr("min");
                e = e
                  ? o(t, "value", r.validationFn.min, "This should be > " + u)
                  : e;
              }
            }
            if ($(t).attr("maxlength")) {
              var l = $(t).attr("maxlength");
              e = e
                ? o(
                  t,
                  "value",
                  r.validationFn.maxLength,
                  "This should be less than " + l + " character(s)"
                )
                : e;
            }
            if ($(t).attr("minlength")) {
              var f = $(t).attr("minlength");
              e = e
                ? o(
                  t,
                  "value",
                  r.validationFn.minLength,
                  "This should be atleast " + f + " character(s)"
                )
                : e;
            }
            return e;
          },
          o = function (t, e, a, r) {
            var n = l(t);
            return (
              (r = $(t).attr("data-error") || r),
              a({ input: t, property: e, value: $(t).prop(e) })
                ? ($(t).addClass("no-error"),
                  $(t).removeClass("error"),
                  n.parentNode.removeChild(n),
                  !0)
                : ($(t).addClass("error"),
                  $(t).removeClass("no-error"),
                  (n.innerHTML = r),
                  !1)
            );
          },
          l = function (t) {
            var e = $(t).attr("data-uid") + "-error",
              a = void 0;
            return (
              0 == $("#" + e).length
                ? ((a = document.createElement("div")).setAttribute("id", e),
                  (a.className = "error-field"),
                  $(t).after(a))
                : (a = document.getElementById(e)),
              a
            );
          };
      },
      { "./validations": 2 }
    ]
  },
  {},
  [1]
);

/*!
 * Socket.IO v2.2.0
 * (c) 2014-2018 Guillermo Rauch
 * Released under the MIT License.
 */
!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
      ? define([], e)
      : "object" == typeof exports
        ? (exports.io = e())
        : (t.io = e());
})(this, function () {
  return (function (t) {
    function e(r) {
      if (n[r]) return n[r].exports;
      var o = (n[r] = { exports: {}, id: r, loaded: !1 });
      return t[r].call(o.exports, o, o.exports, e), (o.loaded = !0), o.exports;
    }
    var n = {};
    return (e.m = t), (e.c = n), (e.p = ""), e(0);
  })([
    function (t, e, n) {
      "use strict";
      function r(t, e) {
        "object" === ("undefined" == typeof t ? "undefined" : o(t)) &&
          ((e = t), (t = void 0)),
          (e = e || {});
        var n,
          r = i(t),
          s = r.source,
          u = r.id,
          h = r.path,
          f = p[u] && h in p[u].nsps,
          l =
            e.forceNew || e["force new connection"] || !1 === e.multiplex || f;
        return (
          l
            ? (c("ignoring socket cache for %s", s), (n = a(s, e)))
            : (p[u] || (c("new io instance for %s", s), (p[u] = a(s, e))),
              (n = p[u])),
          r.query && !e.query && (e.query = r.query),
          n.socket(r.path, e)
        );
      }
      var o =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
            return typeof t;
          }
          : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          },
        i = n(1),
        s = n(7),
        a = n(12),
        c = n(3)("socket.io-client");
      t.exports = e = r;
      var p = (e.managers = {});
      (e.protocol = s.protocol),
        (e.connect = r),
        (e.Manager = n(12)),
        (e.Socket = n(36));
    },
    function (t, e, n) {
      "use strict";
      function r(t, e) {
        var n = t;
        (e = e || ("undefined" != typeof location && location)),
          null == t && (t = e.protocol + "//" + e.host),
          "string" == typeof t &&
          ("/" === t.charAt(0) &&
            (t = "/" === t.charAt(1) ? e.protocol + t : e.host + t),
            /^(https?|wss?):\/\//.test(t) ||
            (i("protocol-less url %s", t),
              (t =
                "undefined" != typeof e
                  ? e.protocol + "//" + t
                  : "https://" + t)),
            i("parse %s", t),
            (n = o(t))),
          n.port ||
          (/^(http|ws)$/.test(n.protocol)
            ? (n.port = "80")
            : /^(http|ws)s$/.test(n.protocol) && (n.port = "443")),
          (n.path = n.path || "/");
        var r = n.host.indexOf(":") !== -1,
          s = r ? "[" + n.host + "]" : n.host;
        return (
          (n.id = n.protocol + "://" + s + ":" + n.port),
          (n.href =
            n.protocol +
            "://" +
            s +
            (e && e.port === n.port ? "" : ":" + n.port)),
          n
        );
      }
      var o = n(2),
        i = n(3)("socket.io-client:url");
      t.exports = r;
    },
    function (t, e) {
      var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        r = [
          "source",
          "protocol",
          "authority",
          "userInfo",
          "user",
          "password",
          "host",
          "port",
          "relative",
          "path",
          "directory",
          "file",
          "query",
          "anchor"
        ];
      t.exports = function (t) {
        var e = t,
          o = t.indexOf("["),
          i = t.indexOf("]");
        o != -1 &&
          i != -1 &&
          (t =
            t.substring(0, o) +
            t.substring(o, i).replace(/:/g, ";") +
            t.substring(i, t.length));
        for (var s = n.exec(t || ""), a = {}, c = 14; c--;)
          a[r[c]] = s[c] || "";
        return (
          o != -1 &&
          i != -1 &&
          ((a.source = e),
            (a.host = a.host
              .substring(1, a.host.length - 1)
              .replace(/;/g, ":")),
            (a.authority = a.authority
              .replace("[", "")
              .replace("]", "")
              .replace(/;/g, ":")),
            (a.ipv6uri = !0)),
          a
        );
      };
    },
    function (t, e, n) {
      (function (r) {
        function o() {
          return (
            !(
              "undefined" == typeof window ||
              !window.process ||
              "renderer" !== window.process.type
            ) ||
            (("undefined" == typeof navigator ||
              !navigator.userAgent ||
              !navigator.userAgent
                .toLowerCase()
                .match(/(edge|trident)\/(\d+)/)) &&
              (("undefined" != typeof document &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
                ("undefined" != typeof window &&
                  window.console &&
                  (window.console.firebug ||
                    (window.console.exception && window.console.table))) ||
                ("undefined" != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                  parseInt(RegExp.$1, 10) >= 31) ||
                ("undefined" != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent
                    .toLowerCase()
                    .match(/applewebkit\/(\d+)/))))
          );
        }
        function i(t) {
          var n = this.useColors;
          if (
            ((t[0] =
              (n ? "%c" : "") +
              this.namespace +
              (n ? " %c" : " ") +
              t[0] +
              (n ? "%c " : " ") +
              "+" +
              e.humanize(this.diff)),
              n)
          ) {
            var r = "color: " + this.color;
            t.splice(1, 0, r, "color: inherit");
            var o = 0,
              i = 0;
            t[0].replace(/%[a-zA-Z%]/g, function (t) {
              "%%" !== t && (o++ , "%c" === t && (i = o));
            }),
              t.splice(i, 0, r);
          }
        }
        function s() {
          return (
            "object" == typeof console &&
            console.log &&
            Function.prototype.apply.call(console.log, console, arguments)
          );
        }
        function a(t) {
          try {
            null == t ? e.storage.removeItem("debug") : (e.storage.debug = t);
          } catch (n) { }
        }
        function c() {
          var t;
          try {
            t = e.storage.debug;
          } catch (n) { }
          return (
            !t && "undefined" != typeof r && "env" in r && (t = r.env.DEBUG), t
          );
        }
        function p() {
          try {
            return window.localStorage;
          } catch (t) { }
        }
        (e = t.exports = n(5)),
          (e.log = s),
          (e.formatArgs = i),
          (e.save = a),
          (e.load = c),
          (e.useColors = o),
          (e.storage =
            "undefined" != typeof chrome && "undefined" != typeof chrome.storage
              ? chrome.storage.local
              : p()),
          (e.colors = [
            "#0000CC",
            "#0000FF",
            "#0033CC",
            "#0033FF",
            "#0066CC",
            "#0066FF",
            "#0099CC",
            "#0099FF",
            "#00CC00",
            "#00CC33",
            "#00CC66",
            "#00CC99",
            "#00CCCC",
            "#00CCFF",
            "#3300CC",
            "#3300FF",
            "#3333CC",
            "#3333FF",
            "#3366CC",
            "#3366FF",
            "#3399CC",
            "#3399FF",
            "#33CC00",
            "#33CC33",
            "#33CC66",
            "#33CC99",
            "#33CCCC",
            "#33CCFF",
            "#6600CC",
            "#6600FF",
            "#6633CC",
            "#6633FF",
            "#66CC00",
            "#66CC33",
            "#9900CC",
            "#9900FF",
            "#9933CC",
            "#9933FF",
            "#99CC00",
            "#99CC33",
            "#CC0000",
            "#CC0033",
            "#CC0066",
            "#CC0099",
            "#CC00CC",
            "#CC00FF",
            "#CC3300",
            "#CC3333",
            "#CC3366",
            "#CC3399",
            "#CC33CC",
            "#CC33FF",
            "#CC6600",
            "#CC6633",
            "#CC9900",
            "#CC9933",
            "#CCCC00",
            "#CCCC33",
            "#FF0000",
            "#FF0033",
            "#FF0066",
            "#FF0099",
            "#FF00CC",
            "#FF00FF",
            "#FF3300",
            "#FF3333",
            "#FF3366",
            "#FF3399",
            "#FF33CC",
            "#FF33FF",
            "#FF6600",
            "#FF6633",
            "#FF9900",
            "#FF9933",
            "#FFCC00",
            "#FFCC33"
          ]),
          (e.formatters.j = function (t) {
            try {
              return JSON.stringify(t);
            } catch (e) {
              return "[UnexpectedJSONParseError]: " + e.message;
            }
          }),
          e.enable(c());
      }.call(e, n(4)));
    },
    function (t, e) {
      function n() {
        throw new Error("setTimeout has not been defined");
      }
      function r() {
        throw new Error("clearTimeout has not been defined");
      }
      function o(t) {
        if (u === setTimeout) return setTimeout(t, 0);
        if ((u === n || !u) && setTimeout)
          return (u = setTimeout), setTimeout(t, 0);
        try {
          return u(t, 0);
        } catch (e) {
          try {
            return u.call(null, t, 0);
          } catch (e) {
            return u.call(this, t, 0);
          }
        }
      }
      function i(t) {
        if (h === clearTimeout) return clearTimeout(t);
        if ((h === r || !h) && clearTimeout)
          return (h = clearTimeout), clearTimeout(t);
        try {
          return h(t);
        } catch (e) {
          try {
            return h.call(null, t);
          } catch (e) {
            return h.call(this, t);
          }
        }
      }
      function s() {
        y &&
          l &&
          ((y = !1), l.length ? (d = l.concat(d)) : (m = -1), d.length && a());
      }
      function a() {
        if (!y) {
          var t = o(s);
          y = !0;
          for (var e = d.length; e;) {
            for (l = d, d = []; ++m < e;) l && l[m].run();
            (m = -1), (e = d.length);
          }
          (l = null), (y = !1), i(t);
        }
      }
      function c(t, e) {
        (this.fun = t), (this.array = e);
      }
      function p() { }
      var u,
        h,
        f = (t.exports = {});
      !(function () {
        try {
          u = "function" == typeof setTimeout ? setTimeout : n;
        } catch (t) {
          u = n;
        }
        try {
          h = "function" == typeof clearTimeout ? clearTimeout : r;
        } catch (t) {
          h = r;
        }
      })();
      var l,
        d = [],
        y = !1,
        m = -1;
      (f.nextTick = function (t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        d.push(new c(t, e)), 1 !== d.length || y || o(a);
      }),
        (c.prototype.run = function () {
          this.fun.apply(null, this.array);
        }),
        (f.title = "browser"),
        (f.browser = !0),
        (f.env = {}),
        (f.argv = []),
        (f.version = ""),
        (f.versions = {}),
        (f.on = p),
        (f.addListener = p),
        (f.once = p),
        (f.off = p),
        (f.removeListener = p),
        (f.removeAllListeners = p),
        (f.emit = p),
        (f.prependListener = p),
        (f.prependOnceListener = p),
        (f.listeners = function (t) {
          return [];
        }),
        (f.binding = function (t) {
          throw new Error("process.binding is not supported");
        }),
        (f.cwd = function () {
          return "/";
        }),
        (f.chdir = function (t) {
          throw new Error("process.chdir is not supported");
        }),
        (f.umask = function () {
          return 0;
        });
    },
    function (t, e, n) {
      function r(t) {
        var n,
          r = 0;
        for (n in t) (r = (r << 5) - r + t.charCodeAt(n)), (r |= 0);
        return e.colors[Math.abs(r) % e.colors.length];
      }
      function o(t) {
        function n() {
          if (n.enabled) {
            var t = n,
              r = +new Date(),
              i = r - (o || r);
            (t.diff = i), (t.prev = o), (t.curr = r), (o = r);
            for (var s = new Array(arguments.length), a = 0; a < s.length; a++)
              s[a] = arguments[a];
            (s[0] = e.coerce(s[0])), "string" != typeof s[0] && s.unshift("%O");
            var c = 0;
            (s[0] = s[0].replace(/%([a-zA-Z%])/g, function (n, r) {
              if ("%%" === n) return n;
              c++;
              var o = e.formatters[r];
              if ("function" == typeof o) {
                var i = s[c];
                (n = o.call(t, i)), s.splice(c, 1), c--;
              }
              return n;
            })),
              e.formatArgs.call(t, s);
            var p = n.log || e.log || console.log.bind(console);
            p.apply(t, s);
          }
        }
        var o;
        return (
          (n.namespace = t),
          (n.enabled = e.enabled(t)),
          (n.useColors = e.useColors()),
          (n.color = r(t)),
          (n.destroy = i),
          "function" == typeof e.init && e.init(n),
          e.instances.push(n),
          n
        );
      }
      function i() {
        var t = e.instances.indexOf(this);
        return t !== -1 && (e.instances.splice(t, 1), !0);
      }
      function s(t) {
        e.save(t), (e.names = []), (e.skips = []);
        var n,
          r = ("string" == typeof t ? t : "").split(/[\s,]+/),
          o = r.length;
        for (n = 0; n < o; n++)
          r[n] &&
            ((t = r[n].replace(/\*/g, ".*?")),
              "-" === t[0]
                ? e.skips.push(new RegExp("^" + t.substr(1) + "$"))
                : e.names.push(new RegExp("^" + t + "$")));
        for (n = 0; n < e.instances.length; n++) {
          var i = e.instances[n];
          i.enabled = e.enabled(i.namespace);
        }
      }
      function a() {
        e.enable("");
      }
      function c(t) {
        if ("*" === t[t.length - 1]) return !0;
        var n, r;
        for (n = 0, r = e.skips.length; n < r; n++)
          if (e.skips[n].test(t)) return !1;
        for (n = 0, r = e.names.length; n < r; n++)
          if (e.names[n].test(t)) return !0;
        return !1;
      }
      function p(t) {
        return t instanceof Error ? t.stack || t.message : t;
      }
      (e = t.exports = o.debug = o["default"] = o),
        (e.coerce = p),
        (e.disable = a),
        (e.enable = s),
        (e.enabled = c),
        (e.humanize = n(6)),
        (e.instances = []),
        (e.names = []),
        (e.skips = []),
        (e.formatters = {});
    },
    function (t, e) {
      function n(t) {
        if (((t = String(t)), !(t.length > 100))) {
          var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
            t
          );
          if (e) {
            var n = parseFloat(e[1]),
              r = (e[2] || "ms").toLowerCase();
            switch (r) {
              case "years":
              case "year":
              case "yrs":
              case "yr":
              case "y":
                return n * u;
              case "days":
              case "day":
              case "d":
                return n * p;
              case "hours":
              case "hour":
              case "hrs":
              case "hr":
              case "h":
                return n * c;
              case "minutes":
              case "minute":
              case "mins":
              case "min":
              case "m":
                return n * a;
              case "seconds":
              case "second":
              case "secs":
              case "sec":
              case "s":
                return n * s;
              case "milliseconds":
              case "millisecond":
              case "msecs":
              case "msec":
              case "ms":
                return n;
              default:
                return;
            }
          }
        }
      }
      function r(t) {
        return t >= p
          ? Math.round(t / p) + "d"
          : t >= c
            ? Math.round(t / c) + "h"
            : t >= a
              ? Math.round(t / a) + "m"
              : t >= s
                ? Math.round(t / s) + "s"
                : t + "ms";
      }
      function o(t) {
        return (
          i(t, p, "day") ||
          i(t, c, "hour") ||
          i(t, a, "minute") ||
          i(t, s, "second") ||
          t + " ms"
        );
      }
      function i(t, e, n) {
        if (!(t < e))
          return t < 1.5 * e
            ? Math.floor(t / e) + " " + n
            : Math.ceil(t / e) + " " + n + "s";
      }
      var s = 1e3,
        a = 60 * s,
        c = 60 * a,
        p = 24 * c,
        u = 365.25 * p;
      t.exports = function (t, e) {
        e = e || {};
        var i = typeof t;
        if ("string" === i && t.length > 0) return n(t);
        if ("number" === i && isNaN(t) === !1) return e["long"] ? o(t) : r(t);
        throw new Error(
          "val is not a non-empty string or a valid number. val=" +
          JSON.stringify(t)
        );
      };
    },
    function (t, e, n) {
      function r() { }
      function o(t) {
        var n = "" + t.type;
        if (
          ((e.BINARY_EVENT !== t.type && e.BINARY_ACK !== t.type) ||
            (n += t.attachments + "-"),
            t.nsp && "/" !== t.nsp && (n += t.nsp + ","),
            null != t.id && (n += t.id),
            null != t.data)
        ) {
          var r = i(t.data);
          if (r === !1) return g;
          n += r;
        }
        return f("encoded %j as %s", t, n), n;
      }
      function i(t) {
        try {
          return JSON.stringify(t);
        } catch (e) {
          return !1;
        }
      }
      function s(t, e) {
        function n(t) {
          var n = d.deconstructPacket(t),
            r = o(n.packet),
            i = n.buffers;
          i.unshift(r), e(i);
        }
        d.removeBlobs(t, n);
      }
      function a() {
        this.reconstructor = null;
      }
      function c(t) {
        var n = 0,
          r = { type: Number(t.charAt(0)) };
        if (null == e.types[r.type]) return h("unknown packet type " + r.type);
        if (e.BINARY_EVENT === r.type || e.BINARY_ACK === r.type) {
          for (
            var o = "";
            "-" !== t.charAt(++n) && ((o += t.charAt(n)), n != t.length);

          );
          if (o != Number(o) || "-" !== t.charAt(n))
            throw new Error("Illegal attachments");
          r.attachments = Number(o);
        }
        if ("/" === t.charAt(n + 1))
          for (r.nsp = ""; ++n;) {
            var i = t.charAt(n);
            if ("," === i) break;
            if (((r.nsp += i), n === t.length)) break;
          }
        else r.nsp = "/";
        var s = t.charAt(n + 1);
        if ("" !== s && Number(s) == s) {
          for (r.id = ""; ++n;) {
            var i = t.charAt(n);
            if (null == i || Number(i) != i) {
              --n;
              break;
            }
            if (((r.id += t.charAt(n)), n === t.length)) break;
          }
          r.id = Number(r.id);
        }
        if (t.charAt(++n)) {
          var a = p(t.substr(n)),
            c = a !== !1 && (r.type === e.ERROR || y(a));
          if (!c) return h("invalid payload");
          r.data = a;
        }
        return f("decoded %s as %j", t, r), r;
      }
      function p(t) {
        try {
          return JSON.parse(t);
        } catch (e) {
          return !1;
        }
      }
      function u(t) {
        (this.reconPack = t), (this.buffers = []);
      }
      function h(t) {
        return { type: e.ERROR, data: "parser error: " + t };
      }
      var f = n(3)("socket.io-parser"),
        l = n(8),
        d = n(9),
        y = n(10),
        m = n(11);
      (e.protocol = 4),
        (e.types = [
          "CONNECT",
          "DISCONNECT",
          "EVENT",
          "ACK",
          "ERROR",
          "BINARY_EVENT",
          "BINARY_ACK"
        ]),
        (e.CONNECT = 0),
        (e.DISCONNECT = 1),
        (e.EVENT = 2),
        (e.ACK = 3),
        (e.ERROR = 4),
        (e.BINARY_EVENT = 5),
        (e.BINARY_ACK = 6),
        (e.Encoder = r),
        (e.Decoder = a);
      var g = e.ERROR + '"encode error"';
      (r.prototype.encode = function (t, n) {
        if (
          (f("encoding packet %j", t),
            e.BINARY_EVENT === t.type || e.BINARY_ACK === t.type)
        )
          s(t, n);
        else {
          var r = o(t);
          n([r]);
        }
      }),
        l(a.prototype),
        (a.prototype.add = function (t) {
          var n;
          if ("string" == typeof t)
            (n = c(t)),
              e.BINARY_EVENT === n.type || e.BINARY_ACK === n.type
                ? ((this.reconstructor = new u(n)),
                  0 === this.reconstructor.reconPack.attachments &&
                  this.emit("decoded", n))
                : this.emit("decoded", n);
          else {
            if (!m(t) && !t.base64) throw new Error("Unknown type: " + t);
            if (!this.reconstructor)
              throw new Error(
                "got binary data when not reconstructing a packet"
              );
            (n = this.reconstructor.takeBinaryData(t)),
              n && ((this.reconstructor = null), this.emit("decoded", n));
          }
        }),
        (a.prototype.destroy = function () {
          this.reconstructor && this.reconstructor.finishedReconstruction();
        }),
        (u.prototype.takeBinaryData = function (t) {
          if (
            (this.buffers.push(t),
              this.buffers.length === this.reconPack.attachments)
          ) {
            var e = d.reconstructPacket(this.reconPack, this.buffers);
            return this.finishedReconstruction(), e;
          }
          return null;
        }),
        (u.prototype.finishedReconstruction = function () {
          (this.reconPack = null), (this.buffers = []);
        });
    },
    function (t, e, n) {
      function r(t) {
        if (t) return o(t);
      }
      function o(t) {
        for (var e in r.prototype) t[e] = r.prototype[e];
        return t;
      }
      (t.exports = r),
        (r.prototype.on = r.prototype.addEventListener = function (t, e) {
          return (
            (this._callbacks = this._callbacks || {}),
            (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e),
            this
          );
        }),
        (r.prototype.once = function (t, e) {
          function n() {
            this.off(t, n), e.apply(this, arguments);
          }
          return (n.fn = e), this.on(t, n), this;
        }),
        (r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function (
          t,
          e
        ) {
          if (
            ((this._callbacks = this._callbacks || {}), 0 == arguments.length)
          )
            return (this._callbacks = {}), this;
          var n = this._callbacks["$" + t];
          if (!n) return this;
          if (1 == arguments.length)
            return delete this._callbacks["$" + t], this;
          for (var r, o = 0; o < n.length; o++)
            if (((r = n[o]), r === e || r.fn === e)) {
              n.splice(o, 1);
              break;
            }
          return this;
        }),
        (r.prototype.emit = function (t) {
          this._callbacks = this._callbacks || {};
          var e = [].slice.call(arguments, 1),
            n = this._callbacks["$" + t];
          if (n) {
            n = n.slice(0);
            for (var r = 0, o = n.length; r < o; ++r) n[r].apply(this, e);
          }
          return this;
        }),
        (r.prototype.listeners = function (t) {
          return (
            (this._callbacks = this._callbacks || {}),
            this._callbacks["$" + t] || []
          );
        }),
        (r.prototype.hasListeners = function (t) {
          return !!this.listeners(t).length;
        });
    },
    function (t, e, n) {
      function r(t, e) {
        if (!t) return t;
        if (s(t)) {
          var n = { _placeholder: !0, num: e.length };
          return e.push(t), n;
        }
        if (i(t)) {
          for (var o = new Array(t.length), a = 0; a < t.length; a++)
            o[a] = r(t[a], e);
          return o;
        }
        if ("object" == typeof t && !(t instanceof Date)) {
          var o = {};
          for (var c in t) o[c] = r(t[c], e);
          return o;
        }
        return t;
      }
      function o(t, e) {
        if (!t) return t;
        if (t && t._placeholder) return e[t.num];
        if (i(t)) for (var n = 0; n < t.length; n++) t[n] = o(t[n], e);
        else if ("object" == typeof t) for (var r in t) t[r] = o(t[r], e);
        return t;
      }
      var i = n(10),
        s = n(11),
        a = Object.prototype.toString,
        c =
          "function" == typeof Blob ||
          ("undefined" != typeof Blob &&
            "[object BlobConstructor]" === a.call(Blob)),
        p =
          "function" == typeof File ||
          ("undefined" != typeof File &&
            "[object FileConstructor]" === a.call(File));
      (e.deconstructPacket = function (t) {
        var e = [],
          n = t.data,
          o = t;
        return (
          (o.data = r(n, e)),
          (o.attachments = e.length),
          { packet: o, buffers: e }
        );
      }),
        (e.reconstructPacket = function (t, e) {
          return (t.data = o(t.data, e)), (t.attachments = void 0), t;
        }),
        (e.removeBlobs = function (t, e) {
          function n(t, a, u) {
            if (!t) return t;
            if ((c && t instanceof Blob) || (p && t instanceof File)) {
              r++;
              var h = new FileReader();
              (h.onload = function () {
                u ? (u[a] = this.result) : (o = this.result), --r || e(o);
              }),
                h.readAsArrayBuffer(t);
            } else if (i(t)) for (var f = 0; f < t.length; f++) n(t[f], f, t);
            else if ("object" == typeof t && !s(t))
              for (var l in t) n(t[l], l, t);
          }
          var r = 0,
            o = t;
          n(o), r || e(o);
        });
    },
    function (t, e) {
      var n = {}.toString;
      t.exports =
        Array.isArray ||
        function (t) {
          return "[object Array]" == n.call(t);
        };
    },
    function (t, e) {
      function n(t) {
        return (
          (r && Buffer.isBuffer(t)) || (o && (t instanceof ArrayBuffer || i(t)))
        );
      }
      t.exports = n;
      var r =
        "function" == typeof Buffer && "function" == typeof Buffer.isBuffer,
        o = "function" == typeof ArrayBuffer,
        i = function (t) {
          return "function" == typeof ArrayBuffer.isView
            ? ArrayBuffer.isView(t)
            : t.buffer instanceof ArrayBuffer;
        };
    },
    function (t, e, n) {
      "use strict";
      function r(t, e) {
        if (!(this instanceof r)) return new r(t, e);
        t &&
          "object" === ("undefined" == typeof t ? "undefined" : o(t)) &&
          ((e = t), (t = void 0)),
          (e = e || {}),
          (e.path = e.path || "/socket.io"),
          (this.nsps = {}),
          (this.subs = []),
          (this.opts = e),
          this.reconnection(e.reconnection !== !1),
          this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0),
          this.reconnectionDelay(e.reconnectionDelay || 1e3),
          this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3),
          this.randomizationFactor(e.randomizationFactor || 0.5),
          (this.backoff = new l({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
          })),
          this.timeout(null == e.timeout ? 2e4 : e.timeout),
          (this.readyState = "closed"),
          (this.uri = t),
          (this.connecting = []),
          (this.lastPing = null),
          (this.encoding = !1),
          (this.packetBuffer = []);
        var n = e.parser || c;
        (this.encoder = new n.Encoder()),
          (this.decoder = new n.Decoder()),
          (this.autoConnect = e.autoConnect !== !1),
          this.autoConnect && this.open();
      }
      var o =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
            return typeof t;
          }
          : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          },
        i = n(13),
        s = n(36),
        a = n(8),
        c = n(7),
        p = n(38),
        u = n(39),
        h = n(3)("socket.io-client:manager"),
        f = n(35),
        l = n(40),
        d = Object.prototype.hasOwnProperty;
      (t.exports = r),
        (r.prototype.emitAll = function () {
          this.emit.apply(this, arguments);
          for (var t in this.nsps)
            d.call(this.nsps, t) &&
              this.nsps[t].emit.apply(this.nsps[t], arguments);
        }),
        (r.prototype.updateSocketIds = function () {
          for (var t in this.nsps)
            d.call(this.nsps, t) && (this.nsps[t].id = this.generateId(t));
        }),
        (r.prototype.generateId = function (t) {
          return ("/" === t ? "" : t + "#") + this.engine.id;
        }),
        a(r.prototype),
        (r.prototype.reconnection = function (t) {
          return arguments.length
            ? ((this._reconnection = !!t), this)
            : this._reconnection;
        }),
        (r.prototype.reconnectionAttempts = function (t) {
          return arguments.length
            ? ((this._reconnectionAttempts = t), this)
            : this._reconnectionAttempts;
        }),
        (r.prototype.reconnectionDelay = function (t) {
          return arguments.length
            ? ((this._reconnectionDelay = t),
              this.backoff && this.backoff.setMin(t),
              this)
            : this._reconnectionDelay;
        }),
        (r.prototype.randomizationFactor = function (t) {
          return arguments.length
            ? ((this._randomizationFactor = t),
              this.backoff && this.backoff.setJitter(t),
              this)
            : this._randomizationFactor;
        }),
        (r.prototype.reconnectionDelayMax = function (t) {
          return arguments.length
            ? ((this._reconnectionDelayMax = t),
              this.backoff && this.backoff.setMax(t),
              this)
            : this._reconnectionDelayMax;
        }),
        (r.prototype.timeout = function (t) {
          return arguments.length ? ((this._timeout = t), this) : this._timeout;
        }),
        (r.prototype.maybeReconnectOnOpen = function () {
          !this.reconnecting &&
            this._reconnection &&
            0 === this.backoff.attempts &&
            this.reconnect();
        }),
        (r.prototype.open = r.prototype.connect = function (t, e) {
          if (
            (h("readyState %s", this.readyState),
              ~this.readyState.indexOf("open"))
          )
            return this;
          h("opening %s", this.uri), (this.engine = i(this.uri, this.opts));
          var n = this.engine,
            r = this;
          (this.readyState = "opening"), (this.skipReconnect = !1);
          var o = p(n, "open", function () {
            r.onopen(), t && t();
          }),
            s = p(n, "error", function (e) {
              if (
                (h("connect_error"),
                  r.cleanup(),
                  (r.readyState = "closed"),
                  r.emitAll("connect_error", e),
                  t)
              ) {
                var n = new Error("Connection error");
                (n.data = e), t(n);
              } else r.maybeReconnectOnOpen();
            });
          if (!1 !== this._timeout) {
            var a = this._timeout;
            h("connect attempt will timeout after %d", a);
            var c = setTimeout(function () {
              h("connect attempt timed out after %d", a),
                o.destroy(),
                n.close(),
                n.emit("error", "timeout"),
                r.emitAll("connect_timeout", a);
            }, a);
            this.subs.push({
              destroy: function () {
                clearTimeout(c);
              }
            });
          }
          return this.subs.push(o), this.subs.push(s), this;
        }),
        (r.prototype.onopen = function () {
          h("open"),
            this.cleanup(),
            (this.readyState = "open"),
            this.emit("open");
          var t = this.engine;
          this.subs.push(p(t, "data", u(this, "ondata"))),
            this.subs.push(p(t, "ping", u(this, "onping"))),
            this.subs.push(p(t, "pong", u(this, "onpong"))),
            this.subs.push(p(t, "error", u(this, "onerror"))),
            this.subs.push(p(t, "close", u(this, "onclose"))),
            this.subs.push(p(this.decoder, "decoded", u(this, "ondecoded")));
        }),
        (r.prototype.onping = function () {
          (this.lastPing = new Date()), this.emitAll("ping");
        }),
        (r.prototype.onpong = function () {
          this.emitAll("pong", new Date() - this.lastPing);
        }),
        (r.prototype.ondata = function (t) {
          this.decoder.add(t);
        }),
        (r.prototype.ondecoded = function (t) {
          this.emit("packet", t);
        }),
        (r.prototype.onerror = function (t) {
          h("error", t), this.emitAll("error", t);
        }),
        (r.prototype.socket = function (t, e) {
          function n() {
            ~f(o.connecting, r) || o.connecting.push(r);
          }
          var r = this.nsps[t];
          if (!r) {
            (r = new s(this, t, e)), (this.nsps[t] = r);
            var o = this;
            r.on("connecting", n),
              r.on("connect", function () {
                r.id = o.generateId(t);
              }),
              this.autoConnect && n();
          }
          return r;
        }),
        (r.prototype.destroy = function (t) {
          var e = f(this.connecting, t);
          ~e && this.connecting.splice(e, 1),
            this.connecting.length || this.close();
        }),
        (r.prototype.packet = function (t) {
          h("writing packet %j", t);
          var e = this;
          t.query && 0 === t.type && (t.nsp += "?" + t.query),
            e.encoding
              ? e.packetBuffer.push(t)
              : ((e.encoding = !0),
                this.encoder.encode(t, function (n) {
                  for (var r = 0; r < n.length; r++)
                    e.engine.write(n[r], t.options);
                  (e.encoding = !1), e.processPacketQueue();
                }));
        }),
        (r.prototype.processPacketQueue = function () {
          if (this.packetBuffer.length > 0 && !this.encoding) {
            var t = this.packetBuffer.shift();
            this.packet(t);
          }
        }),
        (r.prototype.cleanup = function () {
          h("cleanup");
          for (var t = this.subs.length, e = 0; e < t; e++) {
            var n = this.subs.shift();
            n.destroy();
          }
          (this.packetBuffer = []),
            (this.encoding = !1),
            (this.lastPing = null),
            this.decoder.destroy();
        }),
        (r.prototype.close = r.prototype.disconnect = function () {
          h("disconnect"),
            (this.skipReconnect = !0),
            (this.reconnecting = !1),
            "opening" === this.readyState && this.cleanup(),
            this.backoff.reset(),
            (this.readyState = "closed"),
            this.engine && this.engine.close();
        }),
        (r.prototype.onclose = function (t) {
          h("onclose"),
            this.cleanup(),
            this.backoff.reset(),
            (this.readyState = "closed"),
            this.emit("close", t),
            this._reconnection && !this.skipReconnect && this.reconnect();
        }),
        (r.prototype.reconnect = function () {
          if (this.reconnecting || this.skipReconnect) return this;
          var t = this;
          if (this.backoff.attempts >= this._reconnectionAttempts)
            h("reconnect failed"),
              this.backoff.reset(),
              this.emitAll("reconnect_failed"),
              (this.reconnecting = !1);
          else {
            var e = this.backoff.duration();
            h("will wait %dms before reconnect attempt", e),
              (this.reconnecting = !0);
            var n = setTimeout(function () {
              t.skipReconnect ||
                (h("attempting reconnect"),
                  t.emitAll("reconnect_attempt", t.backoff.attempts),
                  t.emitAll("reconnecting", t.backoff.attempts),
                  t.skipReconnect ||
                  t.open(function (e) {
                    e
                      ? (h("reconnect attempt error"),
                        (t.reconnecting = !1),
                        t.reconnect(),
                        t.emitAll("reconnect_error", e.data))
                      : (h("reconnect success"), t.onreconnect());
                  }));
            }, e);
            this.subs.push({
              destroy: function () {
                clearTimeout(n);
              }
            });
          }
        }),
        (r.prototype.onreconnect = function () {
          var t = this.backoff.attempts;
          (this.reconnecting = !1),
            this.backoff.reset(),
            this.updateSocketIds(),
            this.emitAll("reconnect", t);
        });
    },
    function (t, e, n) {
      (t.exports = n(14)), (t.exports.parser = n(21));
    },
    function (t, e, n) {
      function r(t, e) {
        return this instanceof r
          ? ((e = e || {}),
            t && "object" == typeof t && ((e = t), (t = null)),
            t
              ? ((t = u(t)),
                (e.hostname = t.host),
                (e.secure = "https" === t.protocol || "wss" === t.protocol),
                (e.port = t.port),
                t.query && (e.query = t.query))
              : e.host && (e.hostname = u(e.host).host),
            (this.secure =
              null != e.secure
                ? e.secure
                : "undefined" != typeof location &&
                "https:" === location.protocol),
            e.hostname && !e.port && (e.port = this.secure ? "443" : "80"),
            (this.agent = e.agent || !1),
            (this.hostname =
              e.hostname ||
              ("undefined" != typeof location
                ? location.hostname
                : "localhost")),
            (this.port =
              e.port ||
              ("undefined" != typeof location && location.port
                ? location.port
                : this.secure
                  ? 443
                  : 80)),
            (this.query = e.query || {}),
            "string" == typeof this.query &&
            (this.query = h.decode(this.query)),
            (this.upgrade = !1 !== e.upgrade),
            (this.path = (e.path || "/engine.io").replace(/\/$/, "") + "/"),
            (this.forceJSONP = !!e.forceJSONP),
            (this.jsonp = !1 !== e.jsonp),
            (this.forceBase64 = !!e.forceBase64),
            (this.enablesXDR = !!e.enablesXDR),
            (this.timestampParam = e.timestampParam || "t"),
            (this.timestampRequests = e.timestampRequests),
            (this.transports = e.transports || ["polling", "websocket"]),
            (this.transportOptions = e.transportOptions || {}),
            (this.readyState = ""),
            (this.writeBuffer = []),
            (this.prevBufferLen = 0),
            (this.policyPort = e.policyPort || 843),
            (this.rememberUpgrade = e.rememberUpgrade || !1),
            (this.binaryType = null),
            (this.onlyBinaryUpgrades = e.onlyBinaryUpgrades),
            (this.perMessageDeflate =
              !1 !== e.perMessageDeflate && (e.perMessageDeflate || {})),
            !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
            this.perMessageDeflate &&
            null == this.perMessageDeflate.threshold &&
            (this.perMessageDeflate.threshold = 1024),
            (this.pfx = e.pfx || null),
            (this.key = e.key || null),
            (this.passphrase = e.passphrase || null),
            (this.cert = e.cert || null),
            (this.ca = e.ca || null),
            (this.ciphers = e.ciphers || null),
            (this.rejectUnauthorized =
              void 0 === e.rejectUnauthorized || e.rejectUnauthorized),
            (this.forceNode = !!e.forceNode),
            (this.isReactNative =
              "undefined" != typeof navigator &&
              "string" == typeof navigator.product &&
              "reactnative" === navigator.product.toLowerCase()),
            ("undefined" == typeof self || this.isReactNative) &&
            (e.extraHeaders &&
              Object.keys(e.extraHeaders).length > 0 &&
              (this.extraHeaders = e.extraHeaders),
              e.localAddress && (this.localAddress = e.localAddress)),
            (this.id = null),
            (this.upgrades = null),
            (this.pingInterval = null),
            (this.pingTimeout = null),
            (this.pingIntervalTimer = null),
            (this.pingTimeoutTimer = null),
            void this.open())
          : new r(t, e);
      }
      function o(t) {
        var e = {};
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e;
      }
      var i = n(15),
        s = n(8),
        a = n(3)("engine.io-client:socket"),
        c = n(35),
        p = n(21),
        u = n(2),
        h = n(29);
      (t.exports = r),
        (r.priorWebsocketSuccess = !1),
        s(r.prototype),
        (r.protocol = p.protocol),
        (r.Socket = r),
        (r.Transport = n(20)),
        (r.transports = n(15)),
        (r.parser = n(21)),
        (r.prototype.createTransport = function (t) {
          a('creating transport "%s"', t);
          var e = o(this.query);
          (e.EIO = p.protocol), (e.transport = t);
          var n = this.transportOptions[t] || {};
          this.id && (e.sid = this.id);
          var r = new i[t]({
            query: e,
            socket: this,
            agent: n.agent || this.agent,
            hostname: n.hostname || this.hostname,
            port: n.port || this.port,
            secure: n.secure || this.secure,
            path: n.path || this.path,
            forceJSONP: n.forceJSONP || this.forceJSONP,
            jsonp: n.jsonp || this.jsonp,
            forceBase64: n.forceBase64 || this.forceBase64,
            enablesXDR: n.enablesXDR || this.enablesXDR,
            timestampRequests: n.timestampRequests || this.timestampRequests,
            timestampParam: n.timestampParam || this.timestampParam,
            policyPort: n.policyPort || this.policyPort,
            pfx: n.pfx || this.pfx,
            key: n.key || this.key,
            passphrase: n.passphrase || this.passphrase,
            cert: n.cert || this.cert,
            ca: n.ca || this.ca,
            ciphers: n.ciphers || this.ciphers,
            rejectUnauthorized: n.rejectUnauthorized || this.rejectUnauthorized,
            perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate,
            extraHeaders: n.extraHeaders || this.extraHeaders,
            forceNode: n.forceNode || this.forceNode,
            localAddress: n.localAddress || this.localAddress,
            requestTimeout: n.requestTimeout || this.requestTimeout,
            protocols: n.protocols || void 0,
            isReactNative: this.isReactNative
          });
          return r;
        }),
        (r.prototype.open = function () {
          var t;
          if (
            this.rememberUpgrade &&
            r.priorWebsocketSuccess &&
            this.transports.indexOf("websocket") !== -1
          )
            t = "websocket";
          else {
            if (0 === this.transports.length) {
              var e = this;
              return void setTimeout(function () {
                e.emit("error", "No transports available");
              }, 0);
            }
            t = this.transports[0];
          }
          this.readyState = "opening";
          try {
            t = this.createTransport(t);
          } catch (n) {
            return this.transports.shift(), void this.open();
          }
          t.open(), this.setTransport(t);
        }),
        (r.prototype.setTransport = function (t) {
          a("setting transport %s", t.name);
          var e = this;
          this.transport &&
            (a("clearing existing transport %s", this.transport.name),
              this.transport.removeAllListeners()),
            (this.transport = t),
            t
              .on("drain", function () {
                e.onDrain();
              })
              .on("packet", function (t) {
                e.onPacket(t);
              })
              .on("error", function (t) {
                e.onError(t);
              })
              .on("close", function () {
                e.onClose("transport close");
              });
        }),
        (r.prototype.probe = function (t) {
          function e() {
            if (f.onlyBinaryUpgrades) {
              var e = !this.supportsBinary && f.transport.supportsBinary;
              h = h || e;
            }
            h ||
              (a('probe transport "%s" opened', t),
                u.send([{ type: "ping", data: "probe" }]),
                u.once("packet", function (e) {
                  if (!h)
                    if ("pong" === e.type && "probe" === e.data) {
                      if (
                        (a('probe transport "%s" pong', t),
                          (f.upgrading = !0),
                          f.emit("upgrading", u),
                          !u)
                      )
                        return;
                      (r.priorWebsocketSuccess = "websocket" === u.name),
                        a('pausing current transport "%s"', f.transport.name),
                        f.transport.pause(function () {
                          h ||
                            ("closed" !== f.readyState &&
                              (a("changing transport and sending upgrade packet"),
                                p(),
                                f.setTransport(u),
                                u.send([{ type: "upgrade" }]),
                                f.emit("upgrade", u),
                                (u = null),
                                (f.upgrading = !1),
                                f.flush()));
                        });
                    } else {
                      a('probe transport "%s" failed', t);
                      var n = new Error("probe error");
                      (n.transport = u.name), f.emit("upgradeError", n);
                    }
                }));
          }
          function n() {
            h || ((h = !0), p(), u.close(), (u = null));
          }
          function o(e) {
            var r = new Error("probe error: " + e);
            (r.transport = u.name),
              n(),
              a('probe transport "%s" failed because of error: %s', t, e),
              f.emit("upgradeError", r);
          }
          function i() {
            o("transport closed");
          }
          function s() {
            o("socket closed");
          }
          function c(t) {
            u &&
              t.name !== u.name &&
              (a('"%s" works - aborting "%s"', t.name, u.name), n());
          }
          function p() {
            u.removeListener("open", e),
              u.removeListener("error", o),
              u.removeListener("close", i),
              f.removeListener("close", s),
              f.removeListener("upgrading", c);
          }
          a('probing transport "%s"', t);
          var u = this.createTransport(t, { probe: 1 }),
            h = !1,
            f = this;
          (r.priorWebsocketSuccess = !1),
            u.once("open", e),
            u.once("error", o),
            u.once("close", i),
            this.once("close", s),
            this.once("upgrading", c),
            u.open();
        }),
        (r.prototype.onOpen = function () {
          if (
            (a("socket open"),
              (this.readyState = "open"),
              (r.priorWebsocketSuccess = "websocket" === this.transport.name),
              this.emit("open"),
              this.flush(),
              "open" === this.readyState && this.upgrade && this.transport.pause)
          ) {
            a("starting upgrade probes");
            for (var t = 0, e = this.upgrades.length; t < e; t++)
              this.probe(this.upgrades[t]);
          }
        }),
        (r.prototype.onPacket = function (t) {
          if (
            "opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState
          )
            switch (
            (a('socket receive: type "%s", data "%s"', t.type, t.data),
              this.emit("packet", t),
              this.emit("heartbeat"),
              t.type)
            ) {
              case "open":
                this.onHandshake(JSON.parse(t.data));
                break;
              case "pong":
                this.setPing(), this.emit("pong");
                break;
              case "error":
                var e = new Error("server error");
                (e.code = t.data), this.onError(e);
                break;
              case "message":
                this.emit("data", t.data), this.emit("message", t.data);
            }
          else
            a('packet received with socket readyState "%s"', this.readyState);
        }),
        (r.prototype.onHandshake = function (t) {
          this.emit("handshake", t),
            (this.id = t.sid),
            (this.transport.query.sid = t.sid),
            (this.upgrades = this.filterUpgrades(t.upgrades)),
            (this.pingInterval = t.pingInterval),
            (this.pingTimeout = t.pingTimeout),
            this.onOpen(),
            "closed" !== this.readyState &&
            (this.setPing(),
              this.removeListener("heartbeat", this.onHeartbeat),
              this.on("heartbeat", this.onHeartbeat));
        }),
        (r.prototype.onHeartbeat = function (t) {
          clearTimeout(this.pingTimeoutTimer);
          var e = this;
          e.pingTimeoutTimer = setTimeout(function () {
            "closed" !== e.readyState && e.onClose("ping timeout");
          }, t || e.pingInterval + e.pingTimeout);
        }),
        (r.prototype.setPing = function () {
          var t = this;
          clearTimeout(t.pingIntervalTimer),
            (t.pingIntervalTimer = setTimeout(function () {
              a(
                "writing ping packet - expecting pong within %sms",
                t.pingTimeout
              ),
                t.ping(),
                t.onHeartbeat(t.pingTimeout);
            }, t.pingInterval));
        }),
        (r.prototype.ping = function () {
          var t = this;
          this.sendPacket("ping", function () {
            t.emit("ping");
          });
        }),
        (r.prototype.onDrain = function () {
          this.writeBuffer.splice(0, this.prevBufferLen),
            (this.prevBufferLen = 0),
            0 === this.writeBuffer.length ? this.emit("drain") : this.flush();
        }),
        (r.prototype.flush = function () {
          "closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length &&
            (a("flushing %d packets in socket", this.writeBuffer.length),
              this.transport.send(this.writeBuffer),
              (this.prevBufferLen = this.writeBuffer.length),
              this.emit("flush"));
        }),
        (r.prototype.write = r.prototype.send = function (t, e, n) {
          return this.sendPacket("message", t, e, n), this;
        }),
        (r.prototype.sendPacket = function (t, e, n, r) {
          if (
            ("function" == typeof e && ((r = e), (e = void 0)),
              "function" == typeof n && ((r = n), (n = null)),
              "closing" !== this.readyState && "closed" !== this.readyState)
          ) {
            (n = n || {}), (n.compress = !1 !== n.compress);
            var o = { type: t, data: e, options: n };
            this.emit("packetCreate", o),
              this.writeBuffer.push(o),
              r && this.once("flush", r),
              this.flush();
          }
        }),
        (r.prototype.close = function () {
          function t() {
            r.onClose("forced close"),
              a("socket closing - telling transport to close"),
              r.transport.close();
          }
          function e() {
            r.removeListener("upgrade", e),
              r.removeListener("upgradeError", e),
              t();
          }
          function n() {
            r.once("upgrade", e), r.once("upgradeError", e);
          }
          if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            var r = this;
            this.writeBuffer.length
              ? this.once("drain", function () {
                this.upgrading ? n() : t();
              })
              : this.upgrading
                ? n()
                : t();
          }
          return this;
        }),
        (r.prototype.onError = function (t) {
          a("socket error %j", t),
            (r.priorWebsocketSuccess = !1),
            this.emit("error", t),
            this.onClose("transport error", t);
        }),
        (r.prototype.onClose = function (t, e) {
          if (
            "opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState
          ) {
            a('socket close with reason: "%s"', t);
            var n = this;
            clearTimeout(this.pingIntervalTimer),
              clearTimeout(this.pingTimeoutTimer),
              this.transport.removeAllListeners("close"),
              this.transport.close(),
              this.transport.removeAllListeners(),
              (this.readyState = "closed"),
              (this.id = null),
              this.emit("close", t, e),
              (n.writeBuffer = []),
              (n.prevBufferLen = 0);
          }
        }),
        (r.prototype.filterUpgrades = function (t) {
          for (var e = [], n = 0, r = t.length; n < r; n++)
            ~c(this.transports, t[n]) && e.push(t[n]);
          return e;
        });
    },
    function (t, e, n) {
      function r(t) {
        var e,
          n = !1,
          r = !1,
          a = !1 !== t.jsonp;
        if ("undefined" != typeof location) {
          var c = "https:" === location.protocol,
            p = location.port;
          p || (p = c ? 443 : 80),
            (n = t.hostname !== location.hostname || p !== t.port),
            (r = t.secure !== c);
        }
        if (
          ((t.xdomain = n),
            (t.xscheme = r),
            (e = new o(t)),
            "open" in e && !t.forceJSONP)
        )
          return new i(t);
        if (!a) throw new Error("JSONP disabled");
        return new s(t);
      }
      var o = n(16),
        i = n(18),
        s = n(32),
        a = n(33);
      (e.polling = r), (e.websocket = a);
    },
    function (t, e, n) {
      var r = n(17);
      t.exports = function (t) {
        var e = t.xdomain,
          n = t.xscheme,
          o = t.enablesXDR;
        try {
          if ("undefined" != typeof XMLHttpRequest && (!e || r))
            return new XMLHttpRequest();
        } catch (i) { }
        try {
          if ("undefined" != typeof XDomainRequest && !n && o)
            return new XDomainRequest();
        } catch (i) { }
        if (!e)
          try {
            return new self[(["Active"].concat("Object").join("X"))](
              "Microsoft.XMLHTTP"
            );
          } catch (i) { }
      };
    },
    function (t, e) {
      try {
        t.exports =
          "undefined" != typeof XMLHttpRequest &&
          "withCredentials" in new XMLHttpRequest();
      } catch (n) {
        t.exports = !1;
      }
    },
    function (t, e, n) {
      function r() { }
      function o(t) {
        if (
          (c.call(this, t),
            (this.requestTimeout = t.requestTimeout),
            (this.extraHeaders = t.extraHeaders),
            "undefined" != typeof location)
        ) {
          var e = "https:" === location.protocol,
            n = location.port;
          n || (n = e ? 443 : 80),
            (this.xd =
              ("undefined" != typeof location &&
                t.hostname !== location.hostname) ||
              n !== t.port),
            (this.xs = t.secure !== e);
        }
      }
      function i(t) {
        (this.method = t.method || "GET"),
          (this.uri = t.uri),
          (this.xd = !!t.xd),
          (this.xs = !!t.xs),
          (this.async = !1 !== t.async),
          (this.data = void 0 !== t.data ? t.data : null),
          (this.agent = t.agent),
          (this.isBinary = t.isBinary),
          (this.supportsBinary = t.supportsBinary),
          (this.enablesXDR = t.enablesXDR),
          (this.requestTimeout = t.requestTimeout),
          (this.pfx = t.pfx),
          (this.key = t.key),
          (this.passphrase = t.passphrase),
          (this.cert = t.cert),
          (this.ca = t.ca),
          (this.ciphers = t.ciphers),
          (this.rejectUnauthorized = t.rejectUnauthorized),
          (this.extraHeaders = t.extraHeaders),
          this.create();
      }
      function s() {
        for (var t in i.requests)
          i.requests.hasOwnProperty(t) && i.requests[t].abort();
      }
      var a = n(16),
        c = n(19),
        p = n(8),
        u = n(30),
        h = n(3)("engine.io-client:polling-xhr");
      if (
        ((t.exports = o),
          (t.exports.Request = i),
          u(o, c),
          (o.prototype.supportsBinary = !0),
          (o.prototype.request = function (t) {
            return (
              (t = t || {}),
              (t.uri = this.uri()),
              (t.xd = this.xd),
              (t.xs = this.xs),
              (t.agent = this.agent || !1),
              (t.supportsBinary = this.supportsBinary),
              (t.enablesXDR = this.enablesXDR),
              (t.pfx = this.pfx),
              (t.key = this.key),
              (t.passphrase = this.passphrase),
              (t.cert = this.cert),
              (t.ca = this.ca),
              (t.ciphers = this.ciphers),
              (t.rejectUnauthorized = this.rejectUnauthorized),
              (t.requestTimeout = this.requestTimeout),
              (t.extraHeaders = this.extraHeaders),
              new i(t)
            );
          }),
          (o.prototype.doWrite = function (t, e) {
            var n = "string" != typeof t && void 0 !== t,
              r = this.request({ method: "POST", data: t, isBinary: n }),
              o = this;
            r.on("success", e),
              r.on("error", function (t) {
                o.onError("xhr post error", t);
              }),
              (this.sendXhr = r);
          }),
          (o.prototype.doPoll = function () {
            h("xhr poll");
            var t = this.request(),
              e = this;
            t.on("data", function (t) {
              e.onData(t);
            }),
              t.on("error", function (t) {
                e.onError("xhr poll error", t);
              }),
              (this.pollXhr = t);
          }),
          p(i.prototype),
          (i.prototype.create = function () {
            var t = {
              agent: this.agent,
              xdomain: this.xd,
              xscheme: this.xs,
              enablesXDR: this.enablesXDR
            };
            (t.pfx = this.pfx),
              (t.key = this.key),
              (t.passphrase = this.passphrase),
              (t.cert = this.cert),
              (t.ca = this.ca),
              (t.ciphers = this.ciphers),
              (t.rejectUnauthorized = this.rejectUnauthorized);
            var e = (this.xhr = new a(t)),
              n = this;
            try {
              h("xhr open %s: %s", this.method, this.uri),
                e.open(this.method, this.uri, this.async);
              try {
                if (this.extraHeaders) {
                  e.setDisableHeaderCheck && e.setDisableHeaderCheck(!0);
                  for (var r in this.extraHeaders)
                    this.extraHeaders.hasOwnProperty(r) &&
                      e.setRequestHeader(r, this.extraHeaders[r]);
                }
              } catch (o) { }
              if ("POST" === this.method)
                try {
                  this.isBinary
                    ? e.setRequestHeader(
                      "Content-type",
                      "application/octet-stream"
                    )
                    : e.setRequestHeader(
                      "Content-type",
                      "text/plain;charset=UTF-8"
                    );
                } catch (o) { }
              try {
                e.setRequestHeader("Accept", "*/*");
              } catch (o) { }
              "withCredentials" in e && (e.withCredentials = !0),
                this.requestTimeout && (e.timeout = this.requestTimeout),
                this.hasXDR()
                  ? ((e.onload = function () {
                    n.onLoad();
                  }),
                    (e.onerror = function () {
                      n.onError(e.responseText);
                    }))
                  : (e.onreadystatechange = function () {
                    if (2 === e.readyState)
                      try {
                        var t = e.getResponseHeader("Content-Type");
                        n.supportsBinary &&
                          "application/octet-stream" === t &&
                          (e.responseType = "arraybuffer");
                      } catch (r) { }
                    4 === e.readyState &&
                      (200 === e.status || 1223 === e.status
                        ? n.onLoad()
                        : setTimeout(function () {
                          n.onError(e.status);
                        }, 0));
                  }),
                h("xhr data %s", this.data),
                e.send(this.data);
            } catch (o) {
              return void setTimeout(function () {
                n.onError(o);
              }, 0);
            }
            "undefined" != typeof document &&
              ((this.index = i.requestsCount++), (i.requests[this.index] = this));
          }),
          (i.prototype.onSuccess = function () {
            this.emit("success"), this.cleanup();
          }),
          (i.prototype.onData = function (t) {
            this.emit("data", t), this.onSuccess();
          }),
          (i.prototype.onError = function (t) {
            this.emit("error", t), this.cleanup(!0);
          }),
          (i.prototype.cleanup = function (t) {
            if ("undefined" != typeof this.xhr && null !== this.xhr) {
              if (
                (this.hasXDR()
                  ? (this.xhr.onload = this.xhr.onerror = r)
                  : (this.xhr.onreadystatechange = r),
                  t)
              )
                try {
                  this.xhr.abort();
                } catch (e) { }
              "undefined" != typeof document && delete i.requests[this.index],
                (this.xhr = null);
            }
          }),
          (i.prototype.onLoad = function () {
            var t;
            try {
              var e;
              try {
                e = this.xhr.getResponseHeader("Content-Type");
              } catch (n) { }
              t =
                "application/octet-stream" === e
                  ? this.xhr.response || this.xhr.responseText
                  : this.xhr.responseText;
            } catch (n) {
              this.onError(n);
            }
            null != t && this.onData(t);
          }),
          (i.prototype.hasXDR = function () {
            return (
              "undefined" != typeof XDomainRequest && !this.xs && this.enablesXDR
            );
          }),
          (i.prototype.abort = function () {
            this.cleanup();
          }),
          (i.requestsCount = 0),
          (i.requests = {}),
          "undefined" != typeof document)
      )
        if ("function" == typeof attachEvent) attachEvent("onunload", s);
        else if ("function" == typeof addEventListener) {
          var f = "onpagehide" in self ? "pagehide" : "unload";
          addEventListener(f, s, !1);
        }
    },
    function (t, e, n) {
      function r(t) {
        var e = t && t.forceBase64;
        (u && !e) || (this.supportsBinary = !1), o.call(this, t);
      }
      var o = n(20),
        i = n(29),
        s = n(21),
        a = n(30),
        c = n(31),
        p = n(3)("engine.io-client:polling");
      t.exports = r;
      var u = (function () {
        var t = n(16),
          e = new t({ xdomain: !1 });
        return null != e.responseType;
      })();
      a(r, o),
        (r.prototype.name = "polling"),
        (r.prototype.doOpen = function () {
          this.poll();
        }),
        (r.prototype.pause = function (t) {
          function e() {
            p("paused"), (n.readyState = "paused"), t();
          }
          var n = this;
          if (((this.readyState = "pausing"), this.polling || !this.writable)) {
            var r = 0;
            this.polling &&
              (p("we are currently polling - waiting to pause"),
                r++ ,
                this.once("pollComplete", function () {
                  p("pre-pause polling complete"), --r || e();
                })),
              this.writable ||
              (p("we are currently writing - waiting to pause"),
                r++ ,
                this.once("drain", function () {
                  p("pre-pause writing complete"), --r || e();
                }));
          } else e();
        }),
        (r.prototype.poll = function () {
          p("polling"), (this.polling = !0), this.doPoll(), this.emit("poll");
        }),
        (r.prototype.onData = function (t) {
          var e = this;
          p("polling got data %s", t);
          var n = function (t, n, r) {
            return (
              "opening" === e.readyState && e.onOpen(),
              "close" === t.type ? (e.onClose(), !1) : void e.onPacket(t)
            );
          };
          s.decodePayload(t, this.socket.binaryType, n),
            "closed" !== this.readyState &&
            ((this.polling = !1),
              this.emit("pollComplete"),
              "open" === this.readyState
                ? this.poll()
                : p('ignoring poll - transport state "%s"', this.readyState));
        }),
        (r.prototype.doClose = function () {
          function t() {
            p("writing close packet"), e.write([{ type: "close" }]);
          }
          var e = this;
          "open" === this.readyState
            ? (p("transport open - closing"), t())
            : (p("transport not open - deferring close"), this.once("open", t));
        }),
        (r.prototype.write = function (t) {
          var e = this;
          this.writable = !1;
          var n = function () {
            (e.writable = !0), e.emit("drain");
          };
          s.encodePayload(t, this.supportsBinary, function (t) {
            e.doWrite(t, n);
          });
        }),
        (r.prototype.uri = function () {
          var t = this.query || {},
            e = this.secure ? "https" : "http",
            n = "";
          !1 !== this.timestampRequests && (t[this.timestampParam] = c()),
            this.supportsBinary || t.sid || (t.b64 = 1),
            (t = i.encode(t)),
            this.port &&
            (("https" === e && 443 !== Number(this.port)) ||
              ("http" === e && 80 !== Number(this.port))) &&
            (n = ":" + this.port),
            t.length && (t = "?" + t);
          var r = this.hostname.indexOf(":") !== -1;
          return (
            e +
            "://" +
            (r ? "[" + this.hostname + "]" : this.hostname) +
            n +
            this.path +
            t
          );
        });
    },
    function (t, e, n) {
      function r(t) {
        (this.path = t.path),
          (this.hostname = t.hostname),
          (this.port = t.port),
          (this.secure = t.secure),
          (this.query = t.query),
          (this.timestampParam = t.timestampParam),
          (this.timestampRequests = t.timestampRequests),
          (this.readyState = ""),
          (this.agent = t.agent || !1),
          (this.socket = t.socket),
          (this.enablesXDR = t.enablesXDR),
          (this.pfx = t.pfx),
          (this.key = t.key),
          (this.passphrase = t.passphrase),
          (this.cert = t.cert),
          (this.ca = t.ca),
          (this.ciphers = t.ciphers),
          (this.rejectUnauthorized = t.rejectUnauthorized),
          (this.forceNode = t.forceNode),
          (this.isReactNative = t.isReactNative),
          (this.extraHeaders = t.extraHeaders),
          (this.localAddress = t.localAddress);
      }
      var o = n(21),
        i = n(8);
      (t.exports = r),
        i(r.prototype),
        (r.prototype.onError = function (t, e) {
          var n = new Error(t);
          return (
            (n.type = "TransportError"),
            (n.description = e),
            this.emit("error", n),
            this
          );
        }),
        (r.prototype.open = function () {
          return (
            ("closed" !== this.readyState && "" !== this.readyState) ||
            ((this.readyState = "opening"), this.doOpen()),
            this
          );
        }),
        (r.prototype.close = function () {
          return (
            ("opening" !== this.readyState && "open" !== this.readyState) ||
            (this.doClose(), this.onClose()),
            this
          );
        }),
        (r.prototype.send = function (t) {
          if ("open" !== this.readyState) throw new Error("Transport not open");
          this.write(t);
        }),
        (r.prototype.onOpen = function () {
          (this.readyState = "open"), (this.writable = !0), this.emit("open");
        }),
        (r.prototype.onData = function (t) {
          var e = o.decodePacket(t, this.socket.binaryType);
          this.onPacket(e);
        }),
        (r.prototype.onPacket = function (t) {
          this.emit("packet", t);
        }),
        (r.prototype.onClose = function () {
          (this.readyState = "closed"), this.emit("close");
        });
    },
    function (t, e, n) {
      function r(t, n) {
        var r = "b" + e.packets[t.type] + t.data.data;
        return n(r);
      }
      function o(t, n, r) {
        if (!n) return e.encodeBase64Packet(t, r);
        var o = t.data,
          i = new Uint8Array(o),
          s = new Uint8Array(1 + o.byteLength);
        s[0] = v[t.type];
        for (var a = 0; a < i.length; a++) s[a + 1] = i[a];
        return r(s.buffer);
      }
      function i(t, n, r) {
        if (!n) return e.encodeBase64Packet(t, r);
        var o = new FileReader();
        return (
          (o.onload = function () {
            e.encodePacket({ type: t.type, data: o.result }, n, !0, r);
          }),
          o.readAsArrayBuffer(t.data)
        );
      }
      function s(t, n, r) {
        if (!n) return e.encodeBase64Packet(t, r);
        if (g) return i(t, n, r);
        var o = new Uint8Array(1);
        o[0] = v[t.type];
        var s = new k([o.buffer, t.data]);
        return r(s);
      }
      function a(t) {
        try {
          t = d.decode(t, { strict: !1 });
        } catch (e) {
          return !1;
        }
        return t;
      }
      function c(t, e, n) {
        for (
          var r = new Array(t.length),
          o = l(t.length, n),
          i = function (t, n, o) {
            e(n, function (e, n) {
              (r[t] = n), o(e, r);
            });
          },
          s = 0;
          s < t.length;
          s++
        )
          i(s, t[s], o);
      }
      var p,
        u = n(22),
        h = n(23),
        f = n(24),
        l = n(25),
        d = n(26);
      "undefined" != typeof ArrayBuffer && (p = n(27));
      var y =
        "undefined" != typeof navigator &&
        /Android/i.test(navigator.userAgent),
        m =
          "undefined" != typeof navigator &&
          /PhantomJS/i.test(navigator.userAgent),
        g = y || m;
      e.protocol = 3;
      var v = (e.packets = {
        open: 0,
        close: 1,
        ping: 2,
        pong: 3,
        message: 4,
        upgrade: 5,
        noop: 6
      }),
        b = u(v),
        w = { type: "error", data: "parser error" },
        k = n(28);
      (e.encodePacket = function (t, e, n, i) {
        "function" == typeof e && ((i = e), (e = !1)),
          "function" == typeof n && ((i = n), (n = null));
        var a = void 0 === t.data ? void 0 : t.data.buffer || t.data;
        if ("undefined" != typeof ArrayBuffer && a instanceof ArrayBuffer)
          return o(t, e, i);
        if ("undefined" != typeof k && a instanceof k) return s(t, e, i);
        if (a && a.base64) return r(t, i);
        var c = v[t.type];
        return (
          void 0 !== t.data &&
          (c += n
            ? d.encode(String(t.data), { strict: !1 })
            : String(t.data)),
          i("" + c)
        );
      }),
        (e.encodeBase64Packet = function (t, n) {
          var r = "b" + e.packets[t.type];
          if ("undefined" != typeof k && t.data instanceof k) {
            var o = new FileReader();
            return (
              (o.onload = function () {
                var t = o.result.split(",")[1];
                n(r + t);
              }),
              o.readAsDataURL(t.data)
            );
          }
          var i;
          try {
            i = String.fromCharCode.apply(null, new Uint8Array(t.data));
          } catch (s) {
            for (
              var a = new Uint8Array(t.data), c = new Array(a.length), p = 0;
              p < a.length;
              p++
            )
              c[p] = a[p];
            i = String.fromCharCode.apply(null, c);
          }
          return (r += btoa(i)), n(r);
        }),
        (e.decodePacket = function (t, n, r) {
          if (void 0 === t) return w;
          if ("string" == typeof t) {
            if ("b" === t.charAt(0))
              return e.decodeBase64Packet(t.substr(1), n);
            if (r && ((t = a(t)), t === !1)) return w;
            var o = t.charAt(0);
            return Number(o) == o && b[o]
              ? t.length > 1
                ? { type: b[o], data: t.substring(1) }
                : { type: b[o] }
              : w;
          }
          var i = new Uint8Array(t),
            o = i[0],
            s = f(t, 1);
          return k && "blob" === n && (s = new k([s])), { type: b[o], data: s };
        }),
        (e.decodeBase64Packet = function (t, e) {
          var n = b[t.charAt(0)];
          if (!p) return { type: n, data: { base64: !0, data: t.substr(1) } };
          var r = p.decode(t.substr(1));
          return "blob" === e && k && (r = new k([r])), { type: n, data: r };
        }),
        (e.encodePayload = function (t, n, r) {
          function o(t) {
            return t.length + ":" + t;
          }
          function i(t, r) {
            e.encodePacket(t, !!s && n, !1, function (t) {
              r(null, o(t));
            });
          }
          "function" == typeof n && ((r = n), (n = null));
          var s = h(t);
          return n && s
            ? k && !g
              ? e.encodePayloadAsBlob(t, r)
              : e.encodePayloadAsArrayBuffer(t, r)
            : t.length
              ? void c(t, i, function (t, e) {
                return r(e.join(""));
              })
              : r("0:");
        }),
        (e.decodePayload = function (t, n, r) {
          if ("string" != typeof t) return e.decodePayloadAsBinary(t, n, r);
          "function" == typeof n && ((r = n), (n = null));
          var o;
          if ("" === t) return r(w, 0, 1);
          for (var i, s, a = "", c = 0, p = t.length; c < p; c++) {
            var u = t.charAt(c);
            if (":" === u) {
              if ("" === a || a != (i = Number(a))) return r(w, 0, 1);
              if (((s = t.substr(c + 1, i)), a != s.length)) return r(w, 0, 1);
              if (s.length) {
                if (
                  ((o = e.decodePacket(s, n, !1)),
                    w.type === o.type && w.data === o.data)
                )
                  return r(w, 0, 1);
                var h = r(o, c + i, p);
                if (!1 === h) return;
              }
              (c += i), (a = "");
            } else a += u;
          }
          return "" !== a ? r(w, 0, 1) : void 0;
        }),
        (e.encodePayloadAsArrayBuffer = function (t, n) {
          function r(t, n) {
            e.encodePacket(t, !0, !0, function (t) {
              return n(null, t);
            });
          }
          return t.length
            ? void c(t, r, function (t, e) {
              var r = e.reduce(function (t, e) {
                var n;
                return (
                  (n = "string" == typeof e ? e.length : e.byteLength),
                  t + n.toString().length + n + 2
                );
              }, 0),
                o = new Uint8Array(r),
                i = 0;
              return (
                e.forEach(function (t) {
                  var e = "string" == typeof t,
                    n = t;
                  if (e) {
                    for (
                      var r = new Uint8Array(t.length), s = 0;
                      s < t.length;
                      s++
                    )
                      r[s] = t.charCodeAt(s);
                    n = r.buffer;
                  }
                  e ? (o[i++] = 0) : (o[i++] = 1);
                  for (
                    var a = n.byteLength.toString(), s = 0;
                    s < a.length;
                    s++
                  )
                    o[i++] = parseInt(a[s]);
                  o[i++] = 255;
                  for (var r = new Uint8Array(n), s = 0; s < r.length; s++)
                    o[i++] = r[s];
                }),
                n(o.buffer)
              );
            })
            : n(new ArrayBuffer(0));
        }),
        (e.encodePayloadAsBlob = function (t, n) {
          function r(t, n) {
            e.encodePacket(t, !0, !0, function (t) {
              var e = new Uint8Array(1);
              if (((e[0] = 1), "string" == typeof t)) {
                for (var r = new Uint8Array(t.length), o = 0; o < t.length; o++)
                  r[o] = t.charCodeAt(o);
                (t = r.buffer), (e[0] = 0);
              }
              for (
                var i = t instanceof ArrayBuffer ? t.byteLength : t.size,
                s = i.toString(),
                a = new Uint8Array(s.length + 1),
                o = 0;
                o < s.length;
                o++
              )
                a[o] = parseInt(s[o]);
              if (((a[s.length] = 255), k)) {
                var c = new k([e.buffer, a.buffer, t]);
                n(null, c);
              }
            });
          }
          c(t, r, function (t, e) {
            return n(new k(e));
          });
        }),
        (e.decodePayloadAsBinary = function (t, n, r) {
          "function" == typeof n && ((r = n), (n = null));
          for (var o = t, i = []; o.byteLength > 0;) {
            for (
              var s = new Uint8Array(o), a = 0 === s[0], c = "", p = 1;
              255 !== s[p];
              p++
            ) {
              if (c.length > 310) return r(w, 0, 1);
              c += s[p];
            }
            (o = f(o, 2 + c.length)), (c = parseInt(c));
            var u = f(o, 0, c);
            if (a)
              try {
                u = String.fromCharCode.apply(null, new Uint8Array(u));
              } catch (h) {
                var l = new Uint8Array(u);
                u = "";
                for (var p = 0; p < l.length; p++)
                  u += String.fromCharCode(l[p]);
              }
            i.push(u), (o = f(o, c));
          }
          var d = i.length;
          i.forEach(function (t, o) {
            r(e.decodePacket(t, n, !0), o, d);
          });
        });
    },
    function (t, e) {
      t.exports =
        Object.keys ||
        function (t) {
          var e = [],
            n = Object.prototype.hasOwnProperty;
          for (var r in t) n.call(t, r) && e.push(r);
          return e;
        };
    },
    function (t, e, n) {
      function r(t) {
        if (!t || "object" != typeof t) return !1;
        if (o(t)) {
          for (var e = 0, n = t.length; e < n; e++) if (r(t[e])) return !0;
          return !1;
        }
        if (
          ("function" == typeof Buffer &&
            Buffer.isBuffer &&
            Buffer.isBuffer(t)) ||
          ("function" == typeof ArrayBuffer && t instanceof ArrayBuffer) ||
          (s && t instanceof Blob) ||
          (a && t instanceof File)
        )
          return !0;
        if (t.toJSON && "function" == typeof t.toJSON && 1 === arguments.length)
          return r(t.toJSON(), !0);
        for (var i in t)
          if (Object.prototype.hasOwnProperty.call(t, i) && r(t[i])) return !0;
        return !1;
      }
      var o = n(10),
        i = Object.prototype.toString,
        s =
          "function" == typeof Blob ||
          ("undefined" != typeof Blob &&
            "[object BlobConstructor]" === i.call(Blob)),
        a =
          "function" == typeof File ||
          ("undefined" != typeof File &&
            "[object FileConstructor]" === i.call(File));
      t.exports = r;
    },
    function (t, e) {
      t.exports = function (t, e, n) {
        var r = t.byteLength;
        if (((e = e || 0), (n = n || r), t.slice)) return t.slice(e, n);
        if (
          (e < 0 && (e += r),
            n < 0 && (n += r),
            n > r && (n = r),
            e >= r || e >= n || 0 === r)
        )
          return new ArrayBuffer(0);
        for (
          var o = new Uint8Array(t), i = new Uint8Array(n - e), s = e, a = 0;
          s < n;
          s++ , a++
        )
          i[a] = o[s];
        return i.buffer;
      };
    },
    function (t, e) {
      function n(t, e, n) {
        function o(t, r) {
          if (o.count <= 0) throw new Error("after called too many times");
          --o.count,
            t ? ((i = !0), e(t), (e = n)) : 0 !== o.count || i || e(null, r);
        }
        var i = !1;
        return (n = n || r), (o.count = t), 0 === t ? e() : o;
      }
      function r() { }
      t.exports = n;
    },
    function (t, e) {
      function n(t) {
        for (var e, n, r = [], o = 0, i = t.length; o < i;)
          (e = t.charCodeAt(o++)),
            e >= 55296 && e <= 56319 && o < i
              ? ((n = t.charCodeAt(o++)),
                56320 == (64512 & n)
                  ? r.push(((1023 & e) << 10) + (1023 & n) + 65536)
                  : (r.push(e), o--))
              : r.push(e);
        return r;
      }
      function r(t) {
        for (var e, n = t.length, r = -1, o = ""; ++r < n;)
          (e = t[r]),
            e > 65535 &&
            ((e -= 65536),
              (o += d(((e >>> 10) & 1023) | 55296)),
              (e = 56320 | (1023 & e))),
            (o += d(e));
        return o;
      }
      function o(t, e) {
        if (t >= 55296 && t <= 57343) {
          if (e)
            throw Error(
              "Lone surrogate U+" +
              t.toString(16).toUpperCase() +
              " is not a scalar value"
            );
          return !1;
        }
        return !0;
      }
      function i(t, e) {
        return d(((t >> e) & 63) | 128);
      }
      function s(t, e) {
        if (0 == (4294967168 & t)) return d(t);
        var n = "";
        return (
          0 == (4294965248 & t)
            ? (n = d(((t >> 6) & 31) | 192))
            : 0 == (4294901760 & t)
              ? (o(t, e) || (t = 65533),
                (n = d(((t >> 12) & 15) | 224)),
                (n += i(t, 6)))
              : 0 == (4292870144 & t) &&
              ((n = d(((t >> 18) & 7) | 240)), (n += i(t, 12)), (n += i(t, 6))),
          (n += d((63 & t) | 128))
        );
      }
      function a(t, e) {
        e = e || {};
        for (
          var r, o = !1 !== e.strict, i = n(t), a = i.length, c = -1, p = "";
          ++c < a;

        )
          (r = i[c]), (p += s(r, o));
        return p;
      }
      function c() {
        if (l >= f) throw Error("Invalid byte index");
        var t = 255 & h[l];
        if ((l++ , 128 == (192 & t))) return 63 & t;
        throw Error("Invalid continuation byte");
      }
      function p(t) {
        var e, n, r, i, s;
        if (l > f) throw Error("Invalid byte index");
        if (l == f) return !1;
        if (((e = 255 & h[l]), l++ , 0 == (128 & e))) return e;
        if (192 == (224 & e)) {
          if (((n = c()), (s = ((31 & e) << 6) | n), s >= 128)) return s;
          throw Error("Invalid continuation byte");
        }
        if (224 == (240 & e)) {
          if (
            ((n = c()),
              (r = c()),
              (s = ((15 & e) << 12) | (n << 6) | r),
              s >= 2048)
          )
            return o(s, t) ? s : 65533;
          throw Error("Invalid continuation byte");
        }
        if (
          240 == (248 & e) &&
          ((n = c()),
            (r = c()),
            (i = c()),
            (s = ((7 & e) << 18) | (n << 12) | (r << 6) | i),
            s >= 65536 && s <= 1114111)
        )
          return s;
        throw Error("Invalid UTF-8 detected");
      }
      function u(t, e) {
        e = e || {};
        var o = !1 !== e.strict;
        (h = n(t)), (f = h.length), (l = 0);
        for (var i, s = []; (i = p(o)) !== !1;) s.push(i);
        return r(s);
      } /*! https://mths.be/utf8js v2.1.2 by @mathias */
      var h,
        f,
        l,
        d = String.fromCharCode;
      t.exports = { version: "2.1.2", encode: a, decode: u };
    },
    function (t, e) {
      !(function () {
        "use strict";
        for (
          var t =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          n = new Uint8Array(256),
          r = 0;
          r < t.length;
          r++
        )
          n[t.charCodeAt(r)] = r;
        (e.encode = function (e) {
          var n,
            r = new Uint8Array(e),
            o = r.length,
            i = "";
          for (n = 0; n < o; n += 3)
            (i += t[r[n] >> 2]),
              (i += t[((3 & r[n]) << 4) | (r[n + 1] >> 4)]),
              (i += t[((15 & r[n + 1]) << 2) | (r[n + 2] >> 6)]),
              (i += t[63 & r[n + 2]]);
          return (
            o % 3 === 2
              ? (i = i.substring(0, i.length - 1) + "=")
              : o % 3 === 1 && (i = i.substring(0, i.length - 2) + "=="),
            i
          );
        }),
          (e.decode = function (t) {
            var e,
              r,
              o,
              i,
              s,
              a = 0.75 * t.length,
              c = t.length,
              p = 0;
            "=" === t[t.length - 1] && (a-- , "=" === t[t.length - 2] && a--);
            var u = new ArrayBuffer(a),
              h = new Uint8Array(u);
            for (e = 0; e < c; e += 4)
              (r = n[t.charCodeAt(e)]),
                (o = n[t.charCodeAt(e + 1)]),
                (i = n[t.charCodeAt(e + 2)]),
                (s = n[t.charCodeAt(e + 3)]),
                (h[p++] = (r << 2) | (o >> 4)),
                (h[p++] = ((15 & o) << 4) | (i >> 2)),
                (h[p++] = ((3 & i) << 6) | (63 & s));
            return u;
          });
      })();
    },
    function (t, e) {
      function n(t) {
        return t.map(function (t) {
          if (t.buffer instanceof ArrayBuffer) {
            var e = t.buffer;
            if (t.byteLength !== e.byteLength) {
              var n = new Uint8Array(t.byteLength);
              n.set(new Uint8Array(e, t.byteOffset, t.byteLength)),
                (e = n.buffer);
            }
            return e;
          }
          return t;
        });
      }
      function r(t, e) {
        e = e || {};
        var r = new i();
        return (
          n(t).forEach(function (t) {
            r.append(t);
          }),
          e.type ? r.getBlob(e.type) : r.getBlob()
        );
      }
      function o(t, e) {
        return new Blob(n(t), e || {});
      }
      var i =
        "undefined" != typeof i
          ? i
          : "undefined" != typeof WebKitBlobBuilder
            ? WebKitBlobBuilder
            : "undefined" != typeof MSBlobBuilder
              ? MSBlobBuilder
              : "undefined" != typeof MozBlobBuilder && MozBlobBuilder,
        s = (function () {
          try {
            var t = new Blob(["hi"]);
            return 2 === t.size;
          } catch (e) {
            return !1;
          }
        })(),
        a =
          s &&
          (function () {
            try {
              var t = new Blob([new Uint8Array([1, 2])]);
              return 2 === t.size;
            } catch (e) {
              return !1;
            }
          })(),
        c = i && i.prototype.append && i.prototype.getBlob;
      "undefined" != typeof Blob &&
        ((r.prototype = Blob.prototype), (o.prototype = Blob.prototype)),
        (t.exports = (function () {
          return s ? (a ? Blob : o) : c ? r : void 0;
        })());
    },
    function (t, e) {
      (e.encode = function (t) {
        var e = "";
        for (var n in t)
          t.hasOwnProperty(n) &&
            (e.length && (e += "&"),
              (e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n])));
        return e;
      }),
        (e.decode = function (t) {
          for (var e = {}, n = t.split("&"), r = 0, o = n.length; r < o; r++) {
            var i = n[r].split("=");
            e[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
          }
          return e;
        });
    },
    function (t, e) {
      t.exports = function (t, e) {
        var n = function () { };
        (n.prototype = e.prototype),
          (t.prototype = new n()),
          (t.prototype.constructor = t);
      };
    },
    function (t, e) {
      "use strict";
      function n(t) {
        var e = "";
        do (e = s[t % a] + e), (t = Math.floor(t / a));
        while (t > 0);
        return e;
      }
      function r(t) {
        var e = 0;
        for (u = 0; u < t.length; u++) e = e * a + c[t.charAt(u)];
        return e;
      }
      function o() {
        var t = n(+new Date());
        return t !== i ? ((p = 0), (i = t)) : t + "." + n(p++);
      }
      for (
        var i,
        s = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
          ""
        ),
        a = 64,
        c = {},
        p = 0,
        u = 0;
        u < a;
        u++
      )
        c[s[u]] = u;
      (o.encode = n), (o.decode = r), (t.exports = o);
    },
    function (t, e, n) {
      (function (e) {
        function r() { }
        function o() {
          return "undefined" != typeof self
            ? self
            : "undefined" != typeof window
              ? window
              : "undefined" != typeof e
                ? e
                : {};
        }
        function i(t) {
          if ((s.call(this, t), (this.query = this.query || {}), !c)) {
            var e = o();
            c = e.___eio = e.___eio || [];
          }
          this.index = c.length;
          var n = this;
          c.push(function (t) {
            n.onData(t);
          }),
            (this.query.j = this.index),
            "function" == typeof addEventListener &&
            addEventListener(
              "beforeunload",
              function () {
                n.script && (n.script.onerror = r);
              },
              !1
            );
        }
        var s = n(19),
          a = n(30);
        t.exports = i;
        var c,
          p = /\n/g,
          u = /\\n/g;
        a(i, s),
          (i.prototype.supportsBinary = !1),
          (i.prototype.doClose = function () {
            this.script &&
              (this.script.parentNode.removeChild(this.script),
                (this.script = null)),
              this.form &&
              (this.form.parentNode.removeChild(this.form),
                (this.form = null),
                (this.iframe = null)),
              s.prototype.doClose.call(this);
          }),
          (i.prototype.doPoll = function () {
            var t = this,
              e = document.createElement("script");
            this.script &&
              (this.script.parentNode.removeChild(this.script),
                (this.script = null)),
              (e.async = !0),
              (e.src = this.uri()),
              (e.onerror = function (e) {
                t.onError("jsonp poll error", e);
              });
            var n = document.getElementsByTagName("script")[0];
            n
              ? n.parentNode.insertBefore(e, n)
              : (document.head || document.body).appendChild(e),
              (this.script = e);
            var r =
              "undefined" != typeof navigator &&
              /gecko/i.test(navigator.userAgent);
            r &&
              setTimeout(function () {
                var t = document.createElement("iframe");
                document.body.appendChild(t), document.body.removeChild(t);
              }, 100);
          }),
          (i.prototype.doWrite = function (t, e) {
            function n() {
              r(), e();
            }
            function r() {
              if (o.iframe)
                try {
                  o.form.removeChild(o.iframe);
                } catch (t) {
                  o.onError("jsonp polling iframe removal error", t);
                }
              try {
                var e = '<iframe src="javascript:0" name="' + o.iframeId + '">';
                i = document.createElement(e);
              } catch (t) {
                (i = document.createElement("iframe")),
                  (i.name = o.iframeId),
                  (i.src = "javascript:0");
              }
              (i.id = o.iframeId), o.form.appendChild(i), (o.iframe = i);
            }
            var o = this;
            if (!this.form) {
              var i,
                s = document.createElement("form"),
                a = document.createElement("textarea"),
                c = (this.iframeId = "eio_iframe_" + this.index);
              (s.className = "socketio"),
                (s.style.position = "absolute"),
                (s.style.top = "-1000px"),
                (s.style.left = "-1000px"),
                (s.target = c),
                (s.method = "POST"),
                s.setAttribute("accept-charset", "utf-8"),
                (a.name = "d"),
                s.appendChild(a),
                document.body.appendChild(s),
                (this.form = s),
                (this.area = a);
            }
            (this.form.action = this.uri()),
              r(),
              (t = t.replace(u, "\\\n")),
              (this.area.value = t.replace(p, "\\n"));
            try {
              this.form.submit();
            } catch (h) { }
            this.iframe.attachEvent
              ? (this.iframe.onreadystatechange = function () {
                "complete" === o.iframe.readyState && n();
              })
              : (this.iframe.onload = n);
          });
      }.call(
        e,
        (function () {
          return this;
        })()
      ));
    },
    function (t, e, n) {
      function r(t) {
        var e = t && t.forceBase64;
        e && (this.supportsBinary = !1),
          (this.perMessageDeflate = t.perMessageDeflate),
          (this.usingBrowserWebSocket = o && !t.forceNode),
          (this.protocols = t.protocols),
          this.usingBrowserWebSocket || (l = i),
          s.call(this, t);
      }
      var o,
        i,
        s = n(20),
        a = n(21),
        c = n(29),
        p = n(30),
        u = n(31),
        h = n(3)("engine.io-client:websocket");
      if ("undefined" == typeof self)
        try {
          i = n(34);
        } catch (f) { }
      else o = self.WebSocket || self.MozWebSocket;
      var l = o || i;
      (t.exports = r),
        p(r, s),
        (r.prototype.name = "websocket"),
        (r.prototype.supportsBinary = !0),
        (r.prototype.doOpen = function () {
          if (this.check()) {
            var t = this.uri(),
              e = this.protocols,
              n = {
                agent: this.agent,
                perMessageDeflate: this.perMessageDeflate
              };
            (n.pfx = this.pfx),
              (n.key = this.key),
              (n.passphrase = this.passphrase),
              (n.cert = this.cert),
              (n.ca = this.ca),
              (n.ciphers = this.ciphers),
              (n.rejectUnauthorized = this.rejectUnauthorized),
              this.extraHeaders && (n.headers = this.extraHeaders),
              this.localAddress && (n.localAddress = this.localAddress);
            try {
              this.ws =
                this.usingBrowserWebSocket && !this.isReactNative
                  ? e
                    ? new l(t, e)
                    : new l(t)
                  : new l(t, e, n);
            } catch (r) {
              return this.emit("error", r);
            }
            void 0 === this.ws.binaryType && (this.supportsBinary = !1),
              this.ws.supports && this.ws.supports.binary
                ? ((this.supportsBinary = !0),
                  (this.ws.binaryType = "nodebuffer"))
                : (this.ws.binaryType = "arraybuffer"),
              this.addEventListeners();
          }
        }),
        (r.prototype.addEventListeners = function () {
          var t = this;
          (this.ws.onopen = function () {
            t.onOpen();
          }),
            (this.ws.onclose = function () {
              t.onClose();
            }),
            (this.ws.onmessage = function (e) {
              t.onData(e.data);
            }),
            (this.ws.onerror = function (e) {
              t.onError("websocket error", e);
            });
        }),
        (r.prototype.write = function (t) {
          function e() {
            n.emit("flush"),
              setTimeout(function () {
                (n.writable = !0), n.emit("drain");
              }, 0);
          }
          var n = this;
          this.writable = !1;
          for (var r = t.length, o = 0, i = r; o < i; o++)
            !(function (t) {
              a.encodePacket(t, n.supportsBinary, function (o) {
                if (!n.usingBrowserWebSocket) {
                  var i = {};
                  if (
                    (t.options && (i.compress = t.options.compress),
                      n.perMessageDeflate)
                  ) {
                    var s =
                      "string" == typeof o ? Buffer.byteLength(o) : o.length;
                    s < n.perMessageDeflate.threshold && (i.compress = !1);
                  }
                }
                try {
                  n.usingBrowserWebSocket ? n.ws.send(o) : n.ws.send(o, i);
                } catch (a) {
                  h("websocket closed before onclose event");
                }
                --r || e();
              });
            })(t[o]);
        }),
        (r.prototype.onClose = function () {
          s.prototype.onClose.call(this);
        }),
        (r.prototype.doClose = function () {
          "undefined" != typeof this.ws && this.ws.close();
        }),
        (r.prototype.uri = function () {
          var t = this.query || {},
            e = this.secure ? "wss" : "ws",
            n = "";
          this.port &&
            (("wss" === e && 443 !== Number(this.port)) ||
              ("ws" === e && 80 !== Number(this.port))) &&
            (n = ":" + this.port),
            this.timestampRequests && (t[this.timestampParam] = u()),
            this.supportsBinary || (t.b64 = 1),
            (t = c.encode(t)),
            t.length && (t = "?" + t);
          var r = this.hostname.indexOf(":") !== -1;
          return (
            e +
            "://" +
            (r ? "[" + this.hostname + "]" : this.hostname) +
            n +
            this.path +
            t
          );
        }),
        (r.prototype.check = function () {
          return !(
            !l ||
            ("__initialize" in l && this.name === r.prototype.name)
          );
        });
    },
    function (t, e) { },
    function (t, e) {
      var n = [].indexOf;
      t.exports = function (t, e) {
        if (n) return t.indexOf(e);
        for (var r = 0; r < t.length; ++r) if (t[r] === e) return r;
        return -1;
      };
    },
    function (t, e, n) {
      "use strict";
      function r(t, e, n) {
        (this.io = t),
          (this.nsp = e),
          (this.json = this),
          (this.ids = 0),
          (this.acks = {}),
          (this.receiveBuffer = []),
          (this.sendBuffer = []),
          (this.connected = !1),
          (this.disconnected = !0),
          (this.flags = {}),
          n && n.query && (this.query = n.query),
          this.io.autoConnect && this.open();
      }
      var o =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
            return typeof t;
          }
          : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          },
        i = n(7),
        s = n(8),
        a = n(37),
        c = n(38),
        p = n(39),
        u = n(3)("socket.io-client:socket"),
        h = n(29),
        f = n(23);
      t.exports = e = r;
      var l = {
        connect: 1,
        connect_error: 1,
        connect_timeout: 1,
        connecting: 1,
        disconnect: 1,
        error: 1,
        reconnect: 1,
        reconnect_attempt: 1,
        reconnect_failed: 1,
        reconnect_error: 1,
        reconnecting: 1,
        ping: 1,
        pong: 1
      },
        d = s.prototype.emit;
      s(r.prototype),
        (r.prototype.subEvents = function () {
          if (!this.subs) {
            var t = this.io;
            this.subs = [
              c(t, "open", p(this, "onopen")),
              c(t, "packet", p(this, "onpacket")),
              c(t, "close", p(this, "onclose"))
            ];
          }
        }),
        (r.prototype.open = r.prototype.connect = function () {
          return this.connected
            ? this
            : (this.subEvents(),
              this.io.open(),
              "open" === this.io.readyState && this.onopen(),
              this.emit("connecting"),
              this);
        }),
        (r.prototype.send = function () {
          var t = a(arguments);
          return t.unshift("message"), this.emit.apply(this, t), this;
        }),
        (r.prototype.emit = function (t) {
          if (l.hasOwnProperty(t)) return d.apply(this, arguments), this;
          var e = a(arguments),
            n = {
              type: (void 0 !== this.flags.binary
                ? this.flags.binary
                : f(e))
                ? i.BINARY_EVENT
                : i.EVENT,
              data: e
            };
          return (
            (n.options = {}),
            (n.options.compress = !this.flags || !1 !== this.flags.compress),
            "function" == typeof e[e.length - 1] &&
            (u("emitting packet with ack id %d", this.ids),
              (this.acks[this.ids] = e.pop()),
              (n.id = this.ids++)),
            this.connected ? this.packet(n) : this.sendBuffer.push(n),
            (this.flags = {}),
            this
          );
        }),
        (r.prototype.packet = function (t) {
          (t.nsp = this.nsp), this.io.packet(t);
        }),
        (r.prototype.onopen = function () {
          if ((u("transport is open - connecting"), "/" !== this.nsp))
            if (this.query) {
              var t =
                "object" === o(this.query) ? h.encode(this.query) : this.query;
              u("sending connect packet with query %s", t),
                this.packet({ type: i.CONNECT, query: t });
            } else this.packet({ type: i.CONNECT });
        }),
        (r.prototype.onclose = function (t) {
          u("close (%s)", t),
            (this.connected = !1),
            (this.disconnected = !0),
            delete this.id,
            this.emit("disconnect", t);
        }),
        (r.prototype.onpacket = function (t) {
          var e = t.nsp === this.nsp,
            n = t.type === i.ERROR && "/" === t.nsp;
          if (e || n)
            switch (t.type) {
              case i.CONNECT:
                this.onconnect();
                break;
              case i.EVENT:
                this.onevent(t);
                break;
              case i.BINARY_EVENT:
                this.onevent(t);
                break;
              case i.ACK:
                this.onack(t);
                break;
              case i.BINARY_ACK:
                this.onack(t);
                break;
              case i.DISCONNECT:
                this.ondisconnect();
                break;
              case i.ERROR:
                this.emit("error", t.data);
            }
        }),
        (r.prototype.onevent = function (t) {
          var e = t.data || [];
          u("emitting event %j", e),
            null != t.id &&
            (u("attaching ack callback to event"), e.push(this.ack(t.id))),
            this.connected ? d.apply(this, e) : this.receiveBuffer.push(e);
        }),
        (r.prototype.ack = function (t) {
          var e = this,
            n = !1;
          return function () {
            if (!n) {
              n = !0;
              var r = a(arguments);
              u("sending ack %j", r),
                e.packet({ type: f(r) ? i.BINARY_ACK : i.ACK, id: t, data: r });
            }
          };
        }),
        (r.prototype.onack = function (t) {
          var e = this.acks[t.id];
          "function" == typeof e
            ? (u("calling ack %s with %j", t.id, t.data),
              e.apply(this, t.data),
              delete this.acks[t.id])
            : u("bad ack %s", t.id);
        }),
        (r.prototype.onconnect = function () {
          (this.connected = !0),
            (this.disconnected = !1),
            this.emit("connect"),
            this.emitBuffered();
        }),
        (r.prototype.emitBuffered = function () {
          var t;
          for (t = 0; t < this.receiveBuffer.length; t++)
            d.apply(this, this.receiveBuffer[t]);
          for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++)
            this.packet(this.sendBuffer[t]);
          this.sendBuffer = [];
        }),
        (r.prototype.ondisconnect = function () {
          u("server disconnect (%s)", this.nsp),
            this.destroy(),
            this.onclose("io server disconnect");
        }),
        (r.prototype.destroy = function () {
          if (this.subs) {
            for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
            this.subs = null;
          }
          this.io.destroy(this);
        }),
        (r.prototype.close = r.prototype.disconnect = function () {
          return (
            this.connected &&
            (u("performing disconnect (%s)", this.nsp),
              this.packet({ type: i.DISCONNECT })),
            this.destroy(),
            this.connected && this.onclose("io client disconnect"),
            this
          );
        }),
        (r.prototype.compress = function (t) {
          return (this.flags.compress = t), this;
        }),
        (r.prototype.binary = function (t) {
          return (this.flags.binary = t), this;
        });
    },
    function (t, e) {
      function n(t, e) {
        var n = [];
        e = e || 0;
        for (var r = e || 0; r < t.length; r++) n[r - e] = t[r];
        return n;
      }
      t.exports = n;
    },
    function (t, e) {
      "use strict";
      function n(t, e, n) {
        return (
          t.on(e, n),
          {
            destroy: function () {
              t.removeListener(e, n);
            }
          }
        );
      }
      t.exports = n;
    },
    function (t, e) {
      var n = [].slice;
      t.exports = function (t, e) {
        if (("string" == typeof e && (e = t[e]), "function" != typeof e))
          throw new Error("bind() requires a function");
        var r = n.call(arguments, 2);
        return function () {
          return e.apply(t, r.concat(n.call(arguments)));
        };
      };
    },
    function (t, e) {
      function n(t) {
        (t = t || {}),
          (this.ms = t.min || 100),
          (this.max = t.max || 1e4),
          (this.factor = t.factor || 2),
          (this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0),
          (this.attempts = 0);
      }
      (t.exports = n),
        (n.prototype.duration = function () {
          var t = this.ms * Math.pow(this.factor, this.attempts++);
          if (this.jitter) {
            var e = Math.random(),
              n = Math.floor(e * this.jitter * t);
            t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n;
          }
          return 0 | Math.min(t, this.max);
        }),
        (n.prototype.reset = function () {
          this.attempts = 0;
        }),
        (n.prototype.setMin = function (t) {
          this.ms = t;
        }),
        (n.prototype.setMax = function (t) {
          this.max = t;
        }),
        (n.prototype.setJitter = function (t) {
          this.jitter = t;
        });
    }
  ]);
});
//# sourceMappingURL=socket.io.js.map

//region twimoji
/*! Copyright Twitter Inc. and other contributors. Licensed under MIT */
var twemoji = (function () {
  "use strict";
  var twemoji = {
    base: "https://twemoji.maxcdn.com/2/",
    ext: ".png",
    size: "72x72",
    className: "emoji",
    convert: { fromCodePoint: fromCodePoint, toCodePoint: toCodePoint },
    onerror: function onerror() {
      if (this.parentNode) {
        this.parentNode.replaceChild(createText(this.alt, false), this);
      }
    },
    parse: parse,
    replace: replace,
    test: test
  },
    escaper = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    },
    re = /(?:\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffb|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c\udffb|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffb|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb\udffc]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udffd]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d])|(?:\ud83d[\udc68\udc69])(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a-\udc6d\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5\udeeb\udeec\udef4-\udefa\udfe0-\udfeb]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd71\udd73-\udd76\udd7a-\udda2\udda5-\uddaa\uddae-\uddb4\uddb7\uddba\uddbc-\uddca\uddd0\uddde-\uddff\ude70-\ude73\ude78-\ude7a\ude80-\ude82\ude90-\ude95]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g,
    UFE0Fg = /\uFE0F/g,
    U200D = String.fromCharCode(8205),
    rescaper = /[&<>'"]/g,
    shouldntBeParsed = /^(?:iframe|noframes|noscript|script|select|style|textarea)$/,
    fromCharCode = String.fromCharCode;
  return twemoji;
  function createText(text, clean) {
    return document.createTextNode(clean ? text.replace(UFE0Fg, "") : text);
  }
  function escapeHTML(s) {
    return s.replace(rescaper, replacer);
  }
  function defaultImageSrcGenerator(icon, options) {
    return "".concat(options.base, options.size, "/", icon, options.ext);
  }
  function grabAllTextNodes(node, allText) {
    var childNodes = node.childNodes,
      length = childNodes.length,
      subnode,
      nodeType;
    while (length--) {
      subnode = childNodes[length];
      nodeType = subnode.nodeType;
      if (nodeType === 3) {
        allText.push(subnode);
      } else if (
        nodeType === 1 &&
        !("ownerSVGElement" in subnode) &&
        !shouldntBeParsed.test(subnode.nodeName.toLowerCase())
      ) {
        grabAllTextNodes(subnode, allText);
      }
    }
    return allText;
  }
  function grabTheRightIcon(rawText) {
    return toCodePoint(
      rawText.indexOf(U200D) < 0 ? rawText.replace(UFE0Fg, "") : rawText
    );
  }
  function parseNode(node, options) {
    var allText = grabAllTextNodes(node, []),
      length = allText.length,
      attrib,
      attrname,
      modified,
      fragment,
      subnode,
      text,
      match,
      i,
      index,
      img,
      rawText,
      iconId,
      src;
    while (length--) {
      modified = false;
      fragment = document.createDocumentFragment();
      subnode = allText[length];
      text = subnode.nodeValue;
      i = 0;
      while ((match = re.exec(text))) {
        index = match.index;
        if (index !== i) {
          fragment.appendChild(createText(text.slice(i, index), true));
        }
        rawText = match[0];
        iconId = grabTheRightIcon(rawText);
        i = index + rawText.length;
        src = options.callback(iconId, options);
        if (iconId && src) {
          img = new Image();
          img.onerror = options.onerror;
          img.setAttribute("draggable", "false");
          attrib = options.attributes(rawText, iconId);
          for (attrname in attrib) {
            if (
              attrib.hasOwnProperty(attrname) &&
              attrname.indexOf("on") !== 0 &&
              !img.hasAttribute(attrname)
            ) {
              img.setAttribute(attrname, attrib[attrname]);
            }
          }
          img.className = options.className;
          img.alt = rawText;
          img.src = src;
          modified = true;
          fragment.appendChild(img);
        }
        if (!img) fragment.appendChild(createText(rawText, false));
        img = null;
      }
      if (modified) {
        if (i < text.length) {
          fragment.appendChild(createText(text.slice(i), true));
        }
        subnode.parentNode.replaceChild(fragment, subnode);
      }
    }
    return node;
  }
  function parseString(str, options) {
    return replace(str, function (rawText) {
      var ret = rawText,
        iconId = grabTheRightIcon(rawText),
        src = options.callback(iconId, options),
        attrib,
        attrname;
      if (iconId && src) {
        ret = "<img ".concat(
          'class="',
          options.className,
          '" ',
          'draggable="false" ',
          'alt="',
          rawText,
          '"',
          ' src="',
          src,
          '"'
        );
        attrib = options.attributes(rawText, iconId);
        for (attrname in attrib) {
          if (
            attrib.hasOwnProperty(attrname) &&
            attrname.indexOf("on") !== 0 &&
            ret.indexOf(" " + attrname + "=") === -1
          ) {
            ret = ret.concat(
              " ",
              attrname,
              '="',
              escapeHTML(attrib[attrname]),
              '"'
            );
          }
        }
        ret = ret.concat("/>");
      }
      return ret;
    });
  }
  function replacer(m) {
    return escaper[m];
  }
  function returnNull() {
    return null;
  }
  function toSizeSquaredAsset(value) {
    return typeof value === "number" ? value + "x" + value : value;
  }
  function fromCodePoint(codepoint) {
    var code =
      typeof codepoint === "string" ? parseInt(codepoint, 16) : codepoint;
    if (code < 65536) {
      return fromCharCode(code);
    }
    code -= 65536;
    return fromCharCode(55296 + (code >> 10), 56320 + (code & 1023));
  }
  function parse(what, how) {
    if (!how || typeof how === "function") {
      how = { callback: how };
    }
    return (typeof what === "string" ? parseString : parseNode)(what, {
      callback: how.callback || defaultImageSrcGenerator,
      attributes:
        typeof how.attributes === "function" ? how.attributes : returnNull,
      base: typeof how.base === "string" ? how.base : twemoji.base,
      ext: how.ext || twemoji.ext,
      size: how.folder || toSizeSquaredAsset(how.size || twemoji.size),
      className: how.className || twemoji.className,
      onerror: how.onerror || twemoji.onerror
    });
  }
  function replace(text, callback) {
    return String(text).replace(re, callback);
  }
  function test(text) {
    re.lastIndex = 0;
    var result = re.test(text);
    re.lastIndex = 0;
    return result;
  }
  function toCodePoint(unicodeSurrogates, sep) {
    var r = [],
      c = 0,
      p = 0,
      i = 0;
    while (i < unicodeSurrogates.length) {
      c = unicodeSurrogates.charCodeAt(i++);
      if (p) {
        r.push((65536 + ((p - 55296) << 10) + (c - 56320)).toString(16));
        p = 0;
      } else if (55296 <= c && c <= 56319) {
        p = c;
      } else {
        r.push(c.toString(16));
      }
    }
    return r.join(sep || "-");
  }
})();

//endregion

//region emoji config
/*!
 * EmojioneArea v3.4.1
 * https://github.com/mervick/emojionearea
 * Copyright Andrey Izman and other contributors
 * Released under the MIT license
 * Date: 2018-04-27T09:03Z
 */

if (typeof jQuery !== "undefined") {
  (function ($, win) {
    "use strict";

    var emoji = {
      people: [
        { name: "smile", value: "&#x1f604" },
        { name: "smiley", value: "&#x1f603" },
        { name: "grinning", value: "&#x1f600" },
        { name: "blush", value: "&#x1f60a" },
        { name: "wink", value: "&#x1f609" },
        { name: "heart-eyes", value: "&#x1f60d" },
        { name: "kissing-heart", value: "&#x1f618" },
        { name: "kissing-closed-eyes", value: "&#x1f61a" },
        { name: "kissing", value: "&#x1f617" },
        { name: "kissing-smiling-eyes", value: "&#x1f619" },
        { name: "stuck-out-tongue-winking-eye", value: "&#x1f61c" },
        { name: "stuck-out-tongue-closed-eyes", value: "&#x1f61d" },
        { name: "stuck-out-tongue", value: "&#x1f61b" },
        { name: "flushed", value: "&#x1f633" },
        { name: "grin", value: "&#x1f601" },
        { name: "pensive", value: "&#x1f614" },
        { name: "satisfied", value: "&#x1f60c" },
        { name: "unamused", value: "&#x1f612" },
        { name: "disappointed", value: "&#x1f61e" },
        { name: "persevere", value: "&#x1f623" },
        { name: "cry", value: "&#x1f622" },
        { name: "joy", value: "&#x1f602" },
        { name: "sob", value: "&#x1f62d" },
        { name: "sleepy", value: "&#x1f62a" },
        { name: "relieved", value: "&#x1f625" },
        { name: "cold-sweat", value: "&#x1f630" },
        { name: "sweat-smile", value: "&#x1f605" },
        { name: "sweat", value: "&#x1f613" },
        { name: "weary", value: "&#x1f629" },
        { name: "tired-face", value: "&#x1f62b" },
        { name: "fearful", value: "&#x1f628" },
        { name: "scream", value: "&#x1f631" },
        { name: "angry", value: "&#x1f620" },
        { name: "rage", value: "&#x1f621" },
        { name: "triumph", value: "&#x1f624" },
        { name: "confounded", value: "&#x1f616" },
        { name: "laughing", value: "&#x1f606" },
        { name: "yum", value: "&#x1f60b" },
        { name: "mask", value: "&#x1f637" },
        { name: "sunglasses", value: "&#x1f60e" },
        { name: "sleeping", value: "&#x1f634" },
        { name: "dizzy-face", value: "&#x1f635" },
        { name: "astonished", value: "&#x1f632" },
        { name: "worried", value: "&#x1f61f" },
        { name: "frowning", value: "&#x1f626" },
        { name: "anguished", value: "&#x1f627" },
        { name: "smiling-imp", value: "&#x1f608" },
        { name: "imp", value: "&#x1f47f" },
        { name: "open-mouth", value: "&#x1f62e" },
        { name: "grimacing", value: "&#x1f62c" },
        { name: "neutral-face", value: "&#x1f610" },
        { name: "confused", value: "&#x1f615" },
        { name: "hushed", value: "&#x1f62f" },
        { name: "no-mouth", value: "&#x1f636" },
        { name: "innocent", value: "&#x1f607" },
        { name: "smirk", value: "&#x1f60f" },
        { name: "expressionless", value: "&#x1f611" },
        { name: "man-with-gua-pi-mao", value: "&#x1f472" },
        { name: "man-with-turban", value: "&#x1f473" },
        { name: "cop", value: "&#x1f46e" },
        { name: "construction-worker", value: "&#x1f477" },
        { name: "guardsman", value: "&#x1f482" },
        { name: "baby", value: "&#x1f476" },
        { name: "boy", value: "&#x1f466" },
        { name: "girl", value: "&#x1f467" },
        { name: "man", value: "&#x1f468" },
        { name: "woman", value: "&#x1f469" },
        { name: "older-man", value: "&#x1f474" },
        { name: "older-woman", value: "&#x1f475" },
        { name: "person-with-blond-hair", value: "&#x1f471" },
        { name: "angel", value: "&#x1f47c" },
        { name: "princess", value: "&#x1f478" },
        { name: "smiley-cat", value: "&#x1f63a" },
        { name: "smile-cat", value: "&#x1f638" },
        { name: "heart-eyes-cat", value: "&#x1f63b" },
        { name: "kissing-cat", value: "&#x1f63d" },
        { name: "smirk-cat", value: "&#x1f63c" },
        { name: "scream-cat", value: "&#x1f640" },
        { name: "crying-cat-face", value: "&#x1f63f" },
        { name: "joy-cat", value: "&#x1f639" },
        { name: "pouting-cat", value: "&#x1f63e" },
        { name: "japanese-ogre", value: "&#x1f479" },
        { name: "japanese-goblin", value: "&#x1f47a" },
        { name: "see-no-evil", value: "&#x1f648" },
        { name: "hear-no-evil", value: "&#x1f649" },
        { name: "speak-no-evil", value: "&#x1f64a" },
        { name: "skull", value: "&#x1f480" },
        { name: "alien", value: "&#x1f47d" },
        { name: "poop", value: "&#x1f4a9" },
        { name: "fire", value: "&#x1f525" },
        { name: "sparkles", value: "&#x2728" },
        { name: "star2", value: "&#x1f31f" },
        { name: "dizzy", value: "&#x1f4ab" },
        { name: "boom", value: "&#x1f4a5" },
        { name: "anger", value: "&#x1f4a2" },
        { name: "sweat-drops", value: "&#x1f4a6" },
        { name: "droplet", value: "&#x1f4a7" },
        { name: "zzz", value: "&#x1f4a4" },
        { name: "dash", value: "&#x1f4a8" },
        { name: "ear", value: "&#x1f442" },
        { name: "eyes", value: "&#x1f440" },
        { name: "nose", value: "&#x1f443" },
        { name: "tongue", value: "&#x1f445" },
        { name: "lips", value: "&#x1f444" },
        { name: "thumbsup", value: "&#x1f44d" },
        { name: "thumbsdown", value: "&#x1f44e" },
        { name: "ok-hand", value: "&#x1f44c" },
        { name: "punch", value: "&#x1f44a" },
        { name: "fist", value: "&#x270a" },
        { name: "v", value: "&#x270c" },
        { name: "wave", value: "&#x1f44b" },
        { name: "hand", value: "&#x270b" },
        { name: "open-hands", value: "&#x1f450" },
        { name: "point-up-2", value: "&#x1f446" },
        { name: "point-down", value: "&#x1f447" },
        { name: "point-right", value: "&#x1f449" },
        { name: "point-left", value: "&#x1f448" },
        { name: "raised-hands", value: "&#x1f64c" },
        { name: "pray", value: "&#x1f64f" },
        { name: "point-up", value: "&#x261d" },
        { name: "clap", value: "&#x1f44f" },
        { name: "muscle", value: "&#x1f4aa" },
        { name: "walking", value: "&#x1f6b6" },
        { name: "runner", value: "&#x1f3c3" },
        { name: "dancer", value: "&#x1f483" },
        { name: "couple", value: "&#x1f46b" },
        { name: "family", value: "&#x1f46a" },
        { name: "two-men-holding-hands", value: "&#x1f46c" },
        { name: "two-women-holding-hands", value: "&#x1f46d" },
        { name: "couplekiss", value: "&#x1f48f" },
        { name: "couple-with-heart", value: "&#x1f491" },
        { name: "dancers", value: "&#x1f46f" },
        { name: "ok-woman", value: "&#x1f646" },
        { name: "no-good", value: "&#x1f645" },
        { name: "information-desk-person", value: "&#x1f481" },
        { name: "raised-hand", value: "&#x1f64b" },
        { name: "massage", value: "&#x1f486" },
        { name: "haircut", value: "&#x1f487" },
        { name: "nail-care", value: "&#x1f485" },
        { name: "bride-with-veil", value: "&#x1f470" },
        { name: "person-with-pouting-face", value: "&#x1f64e" },
        { name: "person-frowning", value: "&#x1f64d" },
        { name: "bow", value: "&#x1f647" },
        { name: "tophat", value: "&#x1f3a9" },
        { name: "crown", value: "&#x1f451" },
        { name: "womans-hat", value: "&#x1f452" },
        { name: "athletic-shoe", value: "&#x1f45f" },
        { name: "mans-shoe", value: "&#x1f45e" },
        { name: "sandal", value: "&#x1f461" },
        { name: "high-heel", value: "&#x1f460" },
        { name: "boot", value: "&#x1f462" },
        { name: "shirt", value: "&#x1f455" },
        { name: "necktie", value: "&#x1f454" },
        { name: "womans-clothes", value: "&#x1f45a" },
        { name: "dress", value: "&#x1f457" },
        { name: "running-shirt-with-sash", value: "&#x1f3bd" },
        { name: "jeans", value: "&#x1f456" },
        { name: "kimono", value: "&#x1f458" },
        { name: "bikini", value: "&#x1f459" },
        { name: "briefcase", value: "&#x1f4bc" },
        { name: "handbag", value: "&#x1f45c" },
        { name: "pouch", value: "&#x1f45d" },
        { name: "purse", value: "&#x1f45b" },
        { name: "eyeglasses", value: "&#x1f453" },
        { name: "ribbon", value: "&#x1f380" },
        { name: "closed-umbrella", value: "&#x1f302" },
        { name: "lipstick", value: "&#x1f484" },
        { name: "yellow-heart", value: "&#x1f49b" },
        { name: "blue-heart", value: "&#x1f499" },
        { name: "purple-heart", value: "&#x1f49c" },
        { name: "green-heart", value: "&#x1f49a" },
        { name: "heart", value: "&#x2764" },
        { name: "broken-heart", value: "&#x1f494" },
        { name: "heartpulse", value: "&#x1f497" },
        { name: "heartbeat", value: "&#x1f493" },
        { name: "two-hearts", value: "&#x1f495" },
        { name: "sparkling-heart", value: "&#x1f496" },
        { name: "revolving-hearts", value: "&#x1f49e" },
        { name: "love-letter", value: "&#x1f48c" },
        { name: "cupid", value: "&#x1f498" },
        { name: "kiss", value: "&#x1f48b" },
        { name: "ring", value: "&#x1f48d" },
        { name: "gem", value: "&#x1f48e" },
        { name: "bust-in-silhouette", value: "&#x1f464" },
        { name: "busts-in-silhouette", value: "&#x1f465" },
        { name: "speech-balloon", value: "&#x1f4ac" },
        { name: "feet", value: "&#x1f463" },
        { name: "thought-balloon", value: "&#x1f4ad" }
      ],
      nature: [
        { name: "dog", value: "&#x1f436" },
        { name: "wolf", value: "&#x1f43a" },
        { name: "cat", value: "&#x1f431" },
        { name: "mouse", value: "&#x1f42d" },
        { name: "hamster", value: "&#x1f439" },
        { name: "rabbit", value: "&#x1f430" },
        { name: "frog", value: "&#x1f438" },
        { name: "tiger", value: "&#x1f42f" },
        { name: "koala", value: "&#x1f428" },
        { name: "bear", value: "&#x1f43b" },
        { name: "pig", value: "&#x1f437" },
        { name: "pig-nose", value: "&#x1f43d" },
        { name: "cow", value: "&#x1f42e" },
        { name: "boar", value: "&#x1f417" },
        { name: "monkey-face", value: "&#x1f435" },
        { name: "monkey", value: "&#x1f412" },
        { name: "horse", value: "&#x1f434" },
        { name: "sheep", value: "&#x1f411" },
        { name: "elephant", value: "&#x1f418" },
        { name: "panda-face", value: "&#x1f43c" },
        { name: "penguin", value: "&#x1f427" },
        { name: "bird", value: "&#x1f426" },
        { name: "baby-chick", value: "&#x1f424" },
        { name: "hatched-chick", value: "&#x1f425" },
        { name: "hatching-chick", value: "&#x1f423" },
        { name: "chicken", value: "&#x1f414" },
        { name: "snake", value: "&#x1f40d" },
        { name: "turtle", value: "&#x1f422" },
        { name: "bug", value: "&#x1f41b" },
        { name: "honeybee", value: "&#x1f41d" },
        { name: "ant", value: "&#x1f41c" },
        { name: "beetle", value: "&#x1f41e" },
        { name: "snail", value: "&#x1f40c" },
        { name: "octopus", value: "&#x1f419" },
        { name: "shell", value: "&#x1f41a" },
        { name: "tropical-fish", value: "&#x1f420" },
        { name: "fish", value: "&#x1f41f" },
        { name: "dolphin", value: "&#x1f42c" },
        { name: "whale", value: "&#x1f433" },
        { name: "whale2", value: "&#x1f40b" },
        { name: "cow2", value: "&#x1f404" },
        { name: "ram", value: "&#x1f40f" },
        { name: "rat", value: "&#x1f400" },
        { name: "water-buffalo", value: "&#x1f403" },
        { name: "tiger2", value: "&#x1f405" },
        { name: "rabbit2", value: "&#x1f407" },
        { name: "dragon", value: "&#x1f409" },
        { name: "racehorse", value: "&#x1f40e" },
        { name: "goat", value: "&#x1f410" },
        { name: "rooster", value: "&#x1f413" },
        { name: "dog2", value: "&#x1f415" },
        { name: "pig2", value: "&#x1f416" },
        { name: "mouse2", value: "&#x1f401" },
        { name: "ox", value: "&#x1f402" },
        { name: "dragon-face", value: "&#x1f432" },
        { name: "blowfish", value: "&#x1f421" },
        { name: "crocodile", value: "&#x1f40a" },
        { name: "camel", value: "&#x1f42b" },
        { name: "dromedary-camel", value: "&#x1f42a" },
        { name: "leopard", value: "&#x1f406" },
        { name: "cat2", value: "&#x1f408" },
        { name: "poodle", value: "&#x1f429" },
        { name: "paw-prints", value: "&#x1f43e" },
        { name: "bouquet", value: "&#x1f490" },
        { name: "cherry-blossom", value: "&#x1f338" },
        { name: "tulip", value: "&#x1f337" },
        { name: "four-leaf-clover", value: "&#x1f340" },
        { name: "rose", value: "&#x1f339" },
        { name: "sunflower", value: "&#x1f33b" },
        { name: "hibiscus", value: "&#x1f33a" },
        { name: "maple-leaf", value: "&#x1f341" },
        { name: "leaves", value: "&#x1f343" },
        { name: "fallen-leaf", value: "&#x1f342" },
        { name: "herb", value: "&#x1f33f" },
        { name: "ear-of-rice", value: "&#x1f33e" },
        { name: "mushroom", value: "&#x1f344" },
        { name: "cactus", value: "&#x1f335" },
        { name: "palm-tree", value: "&#x1f334" },
        { name: "evergreen-tree", value: "&#x1f332" },
        { name: "deciduous-tree", value: "&#x1f333" },
        { name: "chestnut", value: "&#x1f330" },
        { name: "seedling", value: "&#x1f331" },
        { name: "blossom", value: "&#x1f33c" },
        { name: "globe-with-meridians", value: "&#x1f310" },
        { name: "sun-with-face", value: "&#x1f31e" },
        { name: "full-moon-with-face", value: "&#x1f31d" },
        { name: "new-moon-with-face", value: "&#x1f31a" },
        { name: "new-moon", value: "&#x1f311" },
        { name: "waxing-crescent-moon", value: "&#x1f312" },
        { name: "first-quarter-moon", value: "&#x1f313" },
        { name: "waxing-gibbous-moon", value: "&#x1f314" },
        { name: "full-moon", value: "&#x1f315" },
        { name: "waning-gibbous-moon", value: "&#x1f316" },
        { name: "last-quarter-moon", value: "&#x1f317" },
        { name: "waning-crescent-moon", value: "&#x1f318" },
        { name: "last-quarter-moon-with-face", value: "&#x1f31c" },
        { name: "first-quarter-moon-with-face", value: "&#x1f31b" },
        { name: "moon", value: "&#x1f319" },
        { name: "earth-africa", value: "&#x1f30d" },
        { name: "earth-americas", value: "&#x1f30e" },
        { name: "earth-asia", value: "&#x1f30f" },
        { name: "volcano", value: "&#x1f30b" },
        { name: "milky-way", value: "&#x1f30c" },
        { name: "shooting-star", value: "&#x1f320" },
        { name: "star", value: "&#x2b50" },
        { name: "sunny", value: "&#x2600" },
        { name: "partly-sunny", value: "&#x26c5" },
        { name: "cloud", value: "&#x2601" },
        { name: "zap", value: "&#x26a1" },
        { name: "umbrella", value: "&#x2614" },
        { name: "snowflake", value: "&#x2744" },
        { name: "snowman", value: "&#x26c4" },
        { name: "cyclone", value: "&#x1f300" },
        { name: "foggy", value: "&#x1f301" },
        { name: "rainbow", value: "&#x1f308" },
        { name: "ocean", value: "&#x1f30a" }
      ],
      object: [
        { name: "bamboo", value: "&#x1f38d" },
        { name: "gift-heart", value: "&#x1f49d" },
        { name: "dolls", value: "&#x1f38e" },
        { name: "school-satchel", value: "&#x1f392" },
        { name: "mortar-board", value: "&#x1f393" },
        { name: "flags", value: "&#x1f38f" },
        { name: "fireworks", value: "&#x1f386" },
        { name: "sparkler", value: "&#x1f387" },
        { name: "wind-chime", value: "&#x1f390" },
        { name: "rice-scene", value: "&#x1f391" },
        { name: "jack-o-lantern", value: "&#x1f383" },
        { name: "ghost", value: "&#x1f47b" },
        { name: "santa", value: "&#x1f385" },
        { name: "christmas-tree", value: "&#x1f384" },
        { name: "gift", value: "&#x1f381" },
        { name: "tanabata-tree", value: "&#x1f38b" },
        { name: "tada", value: "&#x1f389" },
        { name: "confetti-ball", value: "&#x1f38a" },
        { name: "balloon", value: "&#x1f388" },
        { name: "crossed-flags", value: "&#x1f38c" },
        { name: "crystal-ball", value: "&#x1f52e" },
        { name: "movie-camera", value: "&#x1f3a5" },
        { name: "camera", value: "&#x1f4f7" },
        { name: "video-camera", value: "&#x1f4f9" },
        { name: "vhs", value: "&#x1f4fc" },
        { name: "cd", value: "&#x1f4bf" },
        { name: "dvd", value: "&#x1f4c0" },
        { name: "minidisc", value: "&#x1f4bd" },
        { name: "floppy-disk", value: "&#x1f4be" },
        { name: "computer", value: "&#x1f4bb" },
        { name: "iphone", value: "&#x1f4f1" },
        { name: "phone", value: "&#x260e" },
        { name: "telephone-receiver", value: "&#x1f4de" },
        { name: "pager", value: "&#x1f4df" },
        { name: "fax", value: "&#x1f4e0" },
        { name: "satellite", value: "&#x1f4e1" },
        { name: "tv", value: "&#x1f4fa" },
        { name: "radio", value: "&#x1f4fb" },
        { name: "speaker-waves", value: "&#x1f50a" },
        { name: "sound", value: "&#x1f509" },
        { name: "speaker", value: "&#x1f508" },
        { name: "mute", value: "&#x1f507" },
        { name: "bell", value: "&#x1f514" },
        { name: "no-bell", value: "&#x1f515" },
        { name: "loudspeaker", value: "&#x1f4e2" },
        { name: "mega", value: "&#x1f4e3" },
        { name: "hourglass-flowing-sand", value: "&#x23f3" },
        { name: "hourglass", value: "&#x231b" },
        { name: "alarm-clock", value: "&#x23f0" },
        { name: "watch", value: "&#x231a" },
        { name: "unlock", value: "&#x1f513" },
        { name: "lock", value: "&#x1f512" },
        { name: "lock-with-ink-pen", value: "&#x1f50f" },
        { name: "closed-lock-with-key", value: "&#x1f510" },
        { name: "key", value: "&#x1f511" },
        { name: "mag-right", value: "&#x1f50e" },
        { name: "bulb", value: "&#x1f4a1" },
        { name: "flashlight", value: "&#x1f526" },
        { name: "high-brightness", value: "&#x1f506" },
        { name: "low-brightness", value: "&#x1f505" },
        { name: "electric-plug", value: "&#x1f50c" },
        { name: "battery", value: "&#x1f50b" },
        { name: "mag", value: "&#x1f50d" },
        { name: "bathtub", value: "&#x1f6c1" },
        { name: "bath", value: "&#x1f6c0" },
        { name: "shower", value: "&#x1f6bf" },
        { name: "toilet", value: "&#x1f6bd" },
        { name: "wrench", value: "&#x1f527" },
        { name: "nut-and-bolt", value: "&#x1f529" },
        { name: "hammer", value: "&#x1f528" },
        { name: "door", value: "&#x1f6aa" },
        { name: "smoking", value: "&#x1f6ac" },
        { name: "bomb", value: "&#x1f4a3" },
        { name: "gun", value: "&#x1f52b" },
        { name: "hocho", value: "&#x1f52a" },
        { name: "pill", value: "&#x1f48a" },
        { name: "syringe", value: "&#x1f489" },
        { name: "moneybag", value: "&#x1f4b0" },
        { name: "yen", value: "&#x1f4b4" },
        { name: "dollar", value: "&#x1f4b5" },
        { name: "pound", value: "&#x1f4b7" },
        { name: "euro", value: "&#x1f4b6" },
        { name: "credit-card", value: "&#x1f4b3" },
        { name: "money-with-wings", value: "&#x1f4b8" },
        { name: "calling", value: "&#x1f4f2" },
        { name: "e-mail", value: "&#x1f4e7" },
        { name: "inbox-tray", value: "&#x1f4e5" },
        { name: "outbox-tray", value: "&#x1f4e4" },
        { name: "email", value: "&#x2709" },
        { name: "enveloppe", value: "&#x1f4e9" },
        { name: "incoming-envelope", value: "&#x1f4e8" },
        { name: "postal-horn", value: "&#x1f4ef" },
        { name: "mailbox", value: "&#x1f4eb" },
        { name: "mailbox-closed", value: "&#x1f4ea" },
        { name: "mailbox-with-mail", value: "&#x1f4ec" },
        { name: "mailbox-with-no-mail", value: "&#x1f4ed" },
        { name: "postbox", value: "&#x1f4ee" },
        { name: "package", value: "&#x1f4e6" },
        { name: "memo", value: "&#x1f4dd" },
        { name: "page-facing-up", value: "&#x1f4c4" },
        { name: "page-with-curl", value: "&#x1f4c3" },
        { name: "bookmark-tabs", value: "&#x1f4d1" },
        { name: "bar-chart", value: "&#x1f4ca" },
        { name: "chart-with-upwards-trend", value: "&#x1f4c8" },
        { name: "chart-with-downwards-trend", value: "&#x1f4c9" },
        { name: "scroll", value: "&#x1f4dc" },
        { name: "clipboard", value: "&#x1f4cb" },
        { name: "date", value: "&#x1f4c5" },
        { name: "calendar", value: "&#x1f4c6" },
        { name: "card-index", value: "&#x1f4c7" },
        { name: "file-folder", value: "&#x1f4c1" },
        { name: "open-file-folder", value: "&#x1f4c2" },
        { name: "scissors", value: "&#x2702" },
        { name: "pushpin", value: "&#x1f4cc" },
        { name: "paperclip", value: "&#x1f4ce" },
        { name: "black-nib", value: "&#x2712" },
        { name: "pencil2", value: "&#x270f" },
        { name: "straight-ruler", value: "&#x1f4cf" },
        { name: "triangular-ruler", value: "&#x1f4d0" },
        { name: "closed-book", value: "&#x1f4d5" },
        { name: "green-book", value: "&#x1f4d7" },
        { name: "blue-book", value: "&#x1f4d8" },
        { name: "orange-book", value: "&#x1f4d9" },
        { name: "notebook", value: "&#x1f4d3" },
        { name: "notebook-with-decorative-cover", value: "&#x1f4d4" },
        { name: "ledger", value: "&#x1f4d2" },
        { name: "books", value: "&#x1f4da" },
        { name: "open-book", value: "&#x1f4d6" },
        { name: "bookmark", value: "&#x1f516" },
        { name: "name-badge", value: "&#x1f4db" },
        { name: "microscope", value: "&#x1f52c" },
        { name: "telescope", value: "&#x1f52d" },
        { name: "newspaper", value: "&#x1f4f0" },
        { name: "art", value: "&#x1f3a8" },
        { name: "clapper", value: "&#x1f3ac" },
        { name: "microphone", value: "&#x1f3a4" },
        { name: "headphones", value: "&#x1f3a7" },
        { name: "musical-score", value: "&#x1f3bc" },
        { name: "musical-note", value: "&#x1f3b5" },
        { name: "notes", value: "&#x1f3b6" },
        { name: "musical-keyboard", value: "&#x1f3b9" },
        { name: "violin", value: "&#x1f3bb" },
        { name: "trumpet", value: "&#x1f3ba" },
        { name: "saxophone", value: "&#x1f3b7" },
        { name: "guitar", value: "&#x1f3b8" },
        { name: "space-invader", value: "&#x1f47e" },
        { name: "video-game", value: "&#x1f3ae" },
        { name: "black-joker", value: "&#x1f0cf" },
        { name: "flower-playing-cards", value: "&#x1f3b4" },
        { name: "mahjong", value: "&#x1f004" },
        { name: "game-die", value: "&#x1f3b2" },
        { name: "dart", value: "&#x1f3af" },
        { name: "football", value: "&#x1f3c8" },
        { name: "basketball", value: "&#x1f3c0" },
        { name: "soccer", value: "&#x26bd" },
        { name: "baseball", value: "&#x26be" },
        { name: "tennis", value: "&#x1f3be" },
        { name: "8ball", value: "&#x1f3b1" },
        { name: "rugby-football", value: "&#x1f3c9" },
        { name: "bowling", value: "&#x1f3b3" },
        { name: "golf", value: "&#x26f3" },
        { name: "mountain-bicyclist", value: "&#x1f6b5" },
        { name: "bicyclist", value: "&#x1f6b4" },
        { name: "checkered-flag", value: "&#x1f3c1" },
        { name: "horse-racing", value: "&#x1f3c7" },
        { name: "trophy", value: "&#x1f3c6" },
        { name: "ski", value: "&#x1f3bf" },
        { name: "snowboarder", value: "&#x1f3c2" },
        { name: "swimmer", value: "&#x1f3ca" },
        { name: "surfer", value: "&#x1f3c4" },
        { name: "fishing-pole-and-fish", value: "&#x1f3a3" },
        { name: "coffee", value: "&#x2615" },
        { name: "tea", value: "&#x1f375" },
        { name: "sake", value: "&#x1f376" },
        { name: "baby-bottle", value: "&#x1f37c" },
        { name: "beer", value: "&#x1f37a" },
        { name: "beers", value: "&#x1f37b" },
        { name: "cocktail", value: "&#x1f378" },
        { name: "tropical-drink", value: "&#x1f379" },
        { name: "wine-glass", value: "&#x1f377" },
        { name: "fork-and-knife", value: "&#x1f374" },
        { name: "pizza", value: "&#x1f355" },
        { name: "hamburger", value: "&#x1f354" },
        { name: "fries", value: "&#x1f35f" },
        { name: "poultry-leg", value: "&#x1f357" },
        { name: "meat-on-bone", value: "&#x1f356" },
        { name: "spaghetti", value: "&#x1f35d" },
        { name: "curry", value: "&#x1f35b" },
        { name: "fried-shrimp", value: "&#x1f364" },
        { name: "bento", value: "&#x1f371" },
        { name: "sushi", value: "&#x1f363" },
        { name: "fish-cake", value: "&#x1f365" },
        { name: "rice-ball", value: "&#x1f359" },
        { name: "rice-cracker", value: "&#x1f358" },
        { name: "rice", value: "&#x1f35a" },
        { name: "ramen", value: "&#x1f35c" },
        { name: "stew", value: "&#x1f372" },
        { name: "oden", value: "&#x1f362" },
        { name: "dango", value: "&#x1f361" },
        { name: "egg", value: "&#x1f373" },
        { name: "bread", value: "&#x1f35e" },
        { name: "doughnut", value: "&#x1f369" },
        { name: "custard", value: "&#x1f36e" },
        { name: "icecream", value: "&#x1f366" },
        { name: "ice-cream", value: "&#x1f368" },
        { name: "shaved-ice", value: "&#x1f367" },
        { name: "birthday", value: "&#x1f382" },
        { name: "cake", value: "&#x1f370" },
        { name: "cookie", value: "&#x1f36a" },
        { name: "chocolate-bar", value: "&#x1f36b" },
        { name: "candy", value: "&#x1f36c" },
        { name: "lollipop", value: "&#x1f36d" },
        { name: "honey-pot", value: "&#x1f36f" },
        { name: "apple", value: "&#x1f34e" },
        { name: "green-apple", value: "&#x1f34f" },
        { name: "tangerine", value: "&#x1f34a" },
        { name: "lemon", value: "&#x1f34b" },
        { name: "cherries", value: "&#x1f352" },
        { name: "grapes", value: "&#x1f347" },
        { name: "watermelon", value: "&#x1f349" },
        { name: "strawberry", value: "&#x1f353" },
        { name: "peach", value: "&#x1f351" },
        { name: "melon", value: "&#x1f348" },
        { name: "banana", value: "&#x1f34c" },
        { name: "pear", value: "&#x1f350" },
        { name: "pineapple", value: "&#x1f34d" },
        { name: "sweet-potato", value: "&#x1f360" },
        { name: "eggplant", value: "&#x1f346" },
        { name: "tomato", value: "&#x1f345" },
        { name: "corn", value: "&#x1f33d" }
      ],
      place: [
        { name: "house", value: "&#x1f3e0" },
        { name: "house-with-garden", value: "&#x1f3e1" },
        { name: "school", value: "&#x1f3eb" },
        { name: "office", value: "&#x1f3e2" },
        { name: "post-office", value: "&#x1f3e3" },
        { name: "hospital", value: "&#x1f3e5" },
        { name: "bank", value: "&#x1f3e6" },
        { name: "convenience-store", value: "&#x1f3ea" },
        { name: "love-hotel", value: "&#x1f3e9" },
        { name: "hotel", value: "&#x1f3e8" },
        { name: "wedding", value: "&#x1f492" },
        { name: "church", value: "&#x26ea" },
        { name: "department-store", value: "&#x1f3ec" },
        { name: "european-post-office", value: "&#x1f3e4" },
        { name: "private-use", value: "&#xe50a" },
        { name: "city-sunrise", value: "&#x1f307" },
        { name: "city-sunset", value: "&#x1f306" },
        { name: "japanese-castle", value: "&#x1f3ef" },
        { name: "european-castle", value: "&#x1f3f0" },
        { name: "tent", value: "&#x26fa" },
        { name: "factory", value: "&#x1f3ed" },
        { name: "tokyo-tower", value: "&#x1f5fc" },
        { name: "japan", value: "&#x1f5fe" },
        { name: "mount-fuji", value: "&#x1f5fb" },
        { name: "sunrise-over-mountains", value: "&#x1f304" },
        { name: "sunrise", value: "&#x1f305" },
        { name: "stars", value: "&#x1f303" },
        { name: "statue-of-liberty", value: "&#x1f5fd" },
        { name: "bridge-at-night", value: "&#x1f309" },
        { name: "carousel-horse", value: "&#x1f3a0" },
        { name: "ferris-wheel", value: "&#x1f3a1" },
        { name: "fountain", value: "&#x26f2" },
        { name: "roller-coaster", value: "&#x1f3a2" },
        { name: "ship", value: "&#x1f6a2" },
        { name: "boat", value: "&#x26f5" },
        { name: "speedboat", value: "&#x1f6a4" },
        { name: "rowboat", value: "&#x1f6a3" },
        { name: "anchor", value: "&#x2693" },
        { name: "rocket", value: "&#x1f680" },
        { name: "airplane", value: "&#x2708" },
        { name: "seat", value: "&#x1f4ba" },
        { name: "helicopter", value: "&#x1f681" },
        { name: "steam-locomotive", value: "&#x1f682" },
        { name: "tram", value: "&#x1f68a" },
        { name: "station", value: "&#x1f689" },
        { name: "mountain-railway", value: "&#x1f69e" },
        { name: "train2", value: "&#x1f686" },
        { name: "bullettrain-side", value: "&#x1f684" },
        { name: "bullettrain-front", value: "&#x1f685" },
        { name: "light-rail", value: "&#x1f688" },
        { name: "metro", value: "&#x1f687" },
        { name: "monorail", value: "&#x1f69d" },
        { name: "tram-car", value: "&#x1f68b" },
        { name: "railway-car", value: "&#x1f683" },
        { name: "trolleybus", value: "&#x1f68e" },
        { name: "bus", value: "&#x1f68c" },
        { name: "oncoming-bus", value: "&#x1f68d" },
        { name: "blue-car", value: "&#x1f699" },
        { name: "oncoming-automobile", value: "&#x1f698" },
        { name: "car", value: "&#x1f697" },
        { name: "taxi", value: "&#x1f695" },
        { name: "oncoming-taxi", value: "&#x1f696" },
        { name: "articulated-lorry", value: "&#x1f69b" },
        { name: "truck", value: "&#x1f69a" },
        { name: "rotating-light", value: "&#x1f6a8" },
        { name: "police-car", value: "&#x1f693" },
        { name: "oncoming-police-car", value: "&#x1f694" },
        { name: "fire-engine", value: "&#x1f692" },
        { name: "ambulance", value: "&#x1f691" },
        { name: "minibus", value: "&#x1f690" },
        { name: "bike", value: "&#x1f6b2" },
        { name: "aerial-tramway", value: "&#x1f6a1" },
        { name: "suspension-railway", value: "&#x1f69f" },
        { name: "mountain-cableway", value: "&#x1f6a0" },
        { name: "tractor", value: "&#x1f69c" },
        { name: "barber", value: "&#x1f488" },
        { name: "busstop", value: "&#x1f68f" },
        { name: "ticket", value: "&#x1f3ab" },
        { name: "vertical-traffic-light", value: "&#x1f6a6" },
        { name: "traffic-light", value: "&#x1f6a5" },
        { name: "warning", value: "&#x26a0" },
        { name: "construction", value: "&#x1f6a7" },
        { name: "beginner", value: "&#x1f530" },
        { name: "fuelpump", value: "&#x26fd" },
        { name: "izakaya-lantern", value: "&#x1f3ee" },
        { name: "slot-machine", value: "&#x1f3b0" },
        { name: "hotsprings", value: "&#x2668" },
        { name: "moyai", value: "&#x1f5ff" },
        { name: "circus-tent", value: "&#x1f3aa" },
        { name: "performing-arts", value: "&#x1f3ad" },
        { name: "round-pushpin", value: "&#x1f4cd" },
        { name: "triangular-flag-on-post", value: "&#x1f6a9" },
        { name: "cn", value: "&#x1f1e8;&#x1f1f3" },
        { name: "de", value: "&#x1f1e9;&#x1f1ea" },
        { name: "es", value: "&#x1f1ea;&#x1f1f8" },
        { name: "fr", value: "&#x1f1eb;&#x1f1f7" },
        { name: "gb", value: "&#x1f1ec;&#x1f1e7" },
        { name: "it", value: "&#x1f1ee;&#x1f1f9" },
        { name: "jp", value: "&#x1f1ef;&#x1f1f5" },
        { name: "kr", value: "&#x1f1f0;&#x1f1f7" },
        { name: "ru", value: "&#x1f1f7;&#x1f1fa" },
        { name: "us", value: "&#x1f1fa;&#x1f1f8" }
      ]
    };

    var settings = {};

    $.fn.lsxEmojiPicker = function (options) {
      // Overriding default options
      settings = $.extend(
        {
          width: 220,
          height: 200,
          twemoji: false,
          closeOnSelect: true,
          onSelect: function (em) { }
        },
        options
      );

      var appender = $("<div></div>").addClass("lsx-emojipicker-appender");
      var container = $("<div></div>")
        .addClass("lsx-emojipicker-container")
        .css({
          top: -(settings.height + 70)
        });
      var wrapper = $("<div></div>").addClass("lsx-emojipicker-wrapper");

      var spinnerContainer = $("<div></div>").addClass("spinner-container");
      var spinner = $("<div></div>").addClass("loader");
      spinnerContainer.append(spinner);

      var emojiPeopleContainer = $("<div></div>")
        .addClass("lsx-emojipicker-emoji lsx-emoji-tab lsx-emoji-people")
        .css({ width: settings.width, height: settings.height });
      var emojiNatureContainer = $("<div></div>")
        .addClass("lsx-emojipicker-emoji lsx-emoji-tab lsx-emoji-nature hidden")
        .css({ width: settings.width, height: settings.height });
      var emojiPlaceContainer = $("<div></div>")
        .addClass("lsx-emojipicker-emoji lsx-emoji-tab lsx-emoji-place hidden")
        .css({ width: settings.width, height: settings.height });
      var emojiObjectContainer = $("<div></div>")
        .addClass("lsx-emojipicker-emoji lsx-emoji-tab lsx-emoji-object hidden")
        .css({ width: settings.width, height: settings.height });

      var tabs = $("<ul></ul>").addClass("lsx-emojipicker-tabs");

      var peopleEmoji = $("<li></li>")
        .addClass("selected")
        .html(emoji["people"][1].value)
        .click(function (e) {
          e.preventDefault();
          $("ul.lsx-emojipicker-tabs li").removeClass("selected");
          $(this).addClass("selected");
          $(".lsx-emoji-tab").addClass("hidden");
          emojiPeopleContainer.removeClass("hidden");
        });
      var natureEmoji = $("<li></li>")
        .html(emoji["nature"][0].value)
        .click(function (e) {
          e.preventDefault();
          $("ul.lsx-emojipicker-tabs li").removeClass("selected");
          $(this).addClass("selected");
          $(".lsx-emoji-tab").addClass("hidden");
          emojiNatureContainer.removeClass("hidden");
        });
      var placeEmoji = $("<li></li>")
        .html(emoji["place"][38].value)
        .click(function (e) {
          e.preventDefault();
          $("ul.lsx-emojipicker-tabs li").removeClass("selected");
          $(this).addClass("selected");
          $(".lsx-emoji-tab").addClass("hidden");
          emojiPlaceContainer.removeClass("hidden");
        });
      var objectEmoji = $("<li></li>")
        .html(emoji["object"][4].value)
        .click(function (e) {
          e.preventDefault();
          $("ul.lsx-emojipicker-tabs li").removeClass("selected");
          $(this).addClass("selected");
          $(".lsx-emoji-tab").addClass("hidden");
          emojiObjectContainer.removeClass("hidden");
        });

      tabs
        .append(peopleEmoji)
        .append(natureEmoji)
        .append(placeEmoji)
        .append(objectEmoji);

      createEmojiTab("people", emojiPeopleContainer, container);
      createEmojiTab("nature", emojiNatureContainer, container);
      createEmojiTab("place", emojiPlaceContainer, container);
      createEmojiTab("object", emojiObjectContainer, container);

      //wrapper.append(spinnerContainer);
      wrapper
        .append(emojiPeopleContainer)
        .append(emojiNatureContainer)
        .append(emojiPlaceContainer)
        .append(emojiObjectContainer);
      wrapper.append(tabs);
      container.append(wrapper);
      appender.append(container);
      this.append(appender);

      if (settings.twemoji) {
        twemoji.parse(emojiPeopleContainer[0], { size: 72 });
        twemoji.parse(emojiNatureContainer[0], { size: 72 });
        twemoji.parse(emojiPlaceContainer[0], { size: 72 });
        twemoji.parse(emojiObjectContainer[0], { size: 72 });
        twemoji.parse(tabs[0], { size: 72 });
      }

      this.click(function (e) {
        e.preventDefault();
        if (
          !$(e.target)
            .parent()
            .hasClass("lsx-emojipicker-tabs") &&
          !$(e.target)
            .parent()
            .parent()
            .hasClass("lsx-emojipicker-tabs") &&
          !$(e.target)
            .parent()
            .hasClass("lsx-emoji-tab") &&
          !$(e.target)
            .parent()
            .parent()
            .hasClass("lsx-emoji-tab")
        ) {
          if (container.is(":visible")) {
            container.hide();
          } else {
            container.fadeIn();
          }
        }
      });

      // Apply the plugin to the selected elements
      return this;
    };

    function createEmojiTab(type, container, wrapper) {
      for (var i = 0; i < emoji[type].length; i++) {
        var selectedEmoji = emoji[type][i];
        var emoticon = $("<span></span>")
          .data("value", selectedEmoji.value)
          .attr("title", selectedEmoji.name)
          .html(selectedEmoji.value);

        emoticon.click(function (e) {
          e.preventDefault();
          settings.onSelect({
            name: $(this).attr("title"),
            value: $(this).data("value")
          });
          if (settings.closeOnSelect) {
            wrapper.hide();
          }
        });
        container.append(emoticon);
      }
    }
  })(jQuery, window);
}

//endregion

//region cryptojs
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS =
  CryptoJS ||
  (function (h, r) {
    var k = {},
      l = (k.lib = {}),
      n = function () { },
      f = (l.Base = {
        extend: function (a) {
          n.prototype = this;
          var b = new n();
          a && b.mixIn(a);
          b.hasOwnProperty("init") ||
            (b.init = function () {
              b.$super.init.apply(this, arguments);
            });
          b.init.prototype = b;
          b.$super = this;
          return b;
        },
        create: function () {
          var a = this.extend();
          a.init.apply(a, arguments);
          return a;
        },
        init: function () { },
        mixIn: function (a) {
          for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
          a.hasOwnProperty("toString") && (this.toString = a.toString);
        },
        clone: function () {
          return this.init.prototype.extend(this);
        }
      }),
      j = (l.WordArray = f.extend({
        init: function (a, b) {
          a = this.words = a || [];
          this.sigBytes = b != r ? b : 4 * a.length;
        },
        toString: function (a) {
          return (a || s).stringify(this);
        },
        concat: function (a) {
          var b = this.words,
            d = a.words,
            c = this.sigBytes;
          a = a.sigBytes;
          this.clamp();
          if (c % 4)
            for (var e = 0; e < a; e++)
              b[(c + e) >>> 2] |=
                ((d[e >>> 2] >>> (24 - 8 * (e % 4))) & 255) <<
                (24 - 8 * ((c + e) % 4));
          else if (65535 < d.length)
            for (e = 0; e < a; e += 4) b[(c + e) >>> 2] = d[e >>> 2];
          else b.push.apply(b, d);
          this.sigBytes += a;
          return this;
        },
        clamp: function () {
          var a = this.words,
            b = this.sigBytes;
          a[b >>> 2] &= 4294967295 << (32 - 8 * (b % 4));
          a.length = h.ceil(b / 4);
        },
        clone: function () {
          var a = f.clone.call(this);
          a.words = this.words.slice(0);
          return a;
        },
        random: function (a) {
          for (var b = [], d = 0; d < a; d += 4)
            b.push((4294967296 * h.random()) | 0);
          return new j.init(b, a);
        }
      })),
      m = (k.enc = {}),
      s = (m.Hex = {
        stringify: function (a) {
          var b = a.words;
          a = a.sigBytes;
          for (var d = [], c = 0; c < a; c++) {
            var e = (b[c >>> 2] >>> (24 - 8 * (c % 4))) & 255;
            d.push((e >>> 4).toString(16));
            d.push((e & 15).toString(16));
          }
          return d.join("");
        },
        parse: function (a) {
          for (var b = a.length, d = [], c = 0; c < b; c += 2)
            d[c >>> 3] |= parseInt(a.substr(c, 2), 16) << (24 - 4 * (c % 8));
          return new j.init(d, b / 2);
        }
      }),
      p = (m.Latin1 = {
        stringify: function (a) {
          var b = a.words;
          a = a.sigBytes;
          for (var d = [], c = 0; c < a; c++)
            d.push(
              String.fromCharCode((b[c >>> 2] >>> (24 - 8 * (c % 4))) & 255)
            );
          return d.join("");
        },
        parse: function (a) {
          for (var b = a.length, d = [], c = 0; c < b; c++)
            d[c >>> 2] |= (a.charCodeAt(c) & 255) << (24 - 8 * (c % 4));
          return new j.init(d, b);
        }
      }),
      t = (m.Utf8 = {
        stringify: function (a) {
          try {
            return decodeURIComponent(escape(p.stringify(a)));
          } catch (b) {
            throw Error("Malformed UTF-8 data");
          }
        },
        parse: function (a) {
          return p.parse(unescape(encodeURIComponent(a)));
        }
      }),
      q = (l.BufferedBlockAlgorithm = f.extend({
        reset: function () {
          this._data = new j.init();
          this._nDataBytes = 0;
        },
        _append: function (a) {
          "string" == typeof a && (a = t.parse(a));
          this._data.concat(a);
          this._nDataBytes += a.sigBytes;
        },
        _process: function (a) {
          var b = this._data,
            d = b.words,
            c = b.sigBytes,
            e = this.blockSize,
            f = c / (4 * e),
            f = a ? h.ceil(f) : h.max((f | 0) - this._minBufferSize, 0);
          a = f * e;
          c = h.min(4 * a, c);
          if (a) {
            for (var g = 0; g < a; g += e) this._doProcessBlock(d, g);
            g = d.splice(0, a);
            b.sigBytes -= c;
          }
          return new j.init(g, c);
        },
        clone: function () {
          var a = f.clone.call(this);
          a._data = this._data.clone();
          return a;
        },
        _minBufferSize: 0
      }));
    l.Hasher = q.extend({
      cfg: f.extend(),
      init: function (a) {
        this.cfg = this.cfg.extend(a);
        this.reset();
      },
      reset: function () {
        q.reset.call(this);
        this._doReset();
      },
      update: function (a) {
        this._append(a);
        this._process();
        return this;
      },
      finalize: function (a) {
        a && this._append(a);
        return this._doFinalize();
      },
      blockSize: 16,
      _createHelper: function (a) {
        return function (b, d) {
          return new a.init(d).finalize(b);
        };
      },
      _createHmacHelper: function (a) {
        return function (b, d) {
          return new u.HMAC.init(a, d).finalize(b);
        };
      }
    });
    var u = (k.algo = {});
    return k;
  })(Math);
//endregion

//region chipher core
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
CryptoJS.lib.Cipher ||
  (function (u) {
    var g = CryptoJS,
      f = g.lib,
      k = f.Base,
      l = f.WordArray,
      q = f.BufferedBlockAlgorithm,
      r = g.enc.Base64,
      v = g.algo.EvpKDF,
      n = (f.Cipher = q.extend({
        cfg: k.extend(),
        createEncryptor: function (a, b) {
          return this.create(this._ENC_XFORM_MODE, a, b);
        },
        createDecryptor: function (a, b) {
          return this.create(this._DEC_XFORM_MODE, a, b);
        },
        init: function (a, b, c) {
          this.cfg = this.cfg.extend(c);
          this._xformMode = a;
          this._key = b;
          this.reset();
        },
        reset: function () {
          q.reset.call(this);
          this._doReset();
        },
        process: function (a) {
          this._append(a);
          return this._process();
        },
        finalize: function (a) {
          a && this._append(a);
          return this._doFinalize();
        },
        keySize: 4,
        ivSize: 4,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function (a) {
          return {
            encrypt: function (b, c, d) {
              return ("string" == typeof c ? s : j).encrypt(a, b, c, d);
            },
            decrypt: function (b, c, d) {
              return ("string" == typeof c ? s : j).decrypt(a, b, c, d);
            }
          };
        }
      }));
    f.StreamCipher = n.extend({
      _doFinalize: function () {
        return this._process(!0);
      },
      blockSize: 1
    });
    var m = (g.mode = {}),
      t = function (a, b, c) {
        var d = this._iv;
        d ? (this._iv = u) : (d = this._prevBlock);
        for (var e = 0; e < c; e++) a[b + e] ^= d[e];
      },
      h = (f.BlockCipherMode = k.extend({
        createEncryptor: function (a, b) {
          return this.Encryptor.create(a, b);
        },
        createDecryptor: function (a, b) {
          return this.Decryptor.create(a, b);
        },
        init: function (a, b) {
          this._cipher = a;
          this._iv = b;
        }
      })).extend();
    h.Encryptor = h.extend({
      processBlock: function (a, b) {
        var c = this._cipher,
          d = c.blockSize;
        t.call(this, a, b, d);
        c.encryptBlock(a, b);
        this._prevBlock = a.slice(b, b + d);
      }
    });
    h.Decryptor = h.extend({
      processBlock: function (a, b) {
        var c = this._cipher,
          d = c.blockSize,
          e = a.slice(b, b + d);
        c.decryptBlock(a, b);
        t.call(this, a, b, d);
        this._prevBlock = e;
      }
    });
    m = m.CBC = h;
    h = (g.pad = {}).Pkcs7 = {
      pad: function (a, b) {
        for (
          var c = 4 * b,
          c = c - (a.sigBytes % c),
          d = (c << 24) | (c << 16) | (c << 8) | c,
          e = [],
          f = 0;
          f < c;
          f += 4
        )
          e.push(d);
        c = l.create(e, c);
        a.concat(c);
      },
      unpad: function (a) {
        a.sigBytes -= a.words[(a.sigBytes - 1) >>> 2] & 255;
      }
    };
    f.BlockCipher = n.extend({
      cfg: n.cfg.extend({ mode: m, padding: h }),
      reset: function () {
        n.reset.call(this);
        var a = this.cfg,
          b = a.iv,
          a = a.mode;
        if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor;
        else (c = a.createDecryptor), (this._minBufferSize = 1);
        this._mode = c.call(a, this, b && b.words);
      },
      _doProcessBlock: function (a, b) {
        this._mode.processBlock(a, b);
      },
      _doFinalize: function () {
        var a = this.cfg.padding;
        if (this._xformMode == this._ENC_XFORM_MODE) {
          a.pad(this._data, this.blockSize);
          var b = this._process(!0);
        } else (b = this._process(!0)), a.unpad(b);
        return b;
      },
      blockSize: 4
    });
    var p = (f.CipherParams = k.extend({
      init: function (a) {
        this.mixIn(a);
      },
      toString: function (a) {
        return (a || this.formatter).stringify(this);
      }
    })),
      m = ((g.format = {}).OpenSSL = {
        stringify: function (a) {
          var b = a.ciphertext;
          a = a.salt;
          return (a
            ? l
              .create([1398893684, 1701076831])
              .concat(a)
              .concat(b)
            : b
          ).toString(r);
        },
        parse: function (a) {
          a = r.parse(a);
          var b = a.words;
          if (1398893684 == b[0] && 1701076831 == b[1]) {
            var c = l.create(b.slice(2, 4));
            b.splice(0, 4);
            a.sigBytes -= 16;
          }
          return p.create({ ciphertext: a, salt: c });
        }
      }),
      j = (f.SerializableCipher = k.extend({
        cfg: k.extend({ format: m }),
        encrypt: function (a, b, c, d) {
          d = this.cfg.extend(d);
          var e = a.createEncryptor(c, d);
          b = e.finalize(b);
          e = e.cfg;
          return p.create({
            ciphertext: b,
            key: c,
            iv: e.iv,
            algorithm: a,
            mode: e.mode,
            padding: e.padding,
            blockSize: a.blockSize,
            formatter: d.format
          });
        },
        decrypt: function (a, b, c, d) {
          d = this.cfg.extend(d);
          b = this._parse(b, d.format);
          return a.createDecryptor(c, d).finalize(b.ciphertext);
        },
        _parse: function (a, b) {
          return "string" == typeof a ? b.parse(a, this) : a;
        }
      })),
      g = ((g.kdf = {}).OpenSSL = {
        execute: function (a, b, c, d) {
          d || (d = l.random(8));
          a = v.create({ keySize: b + c }).compute(a, d);
          c = l.create(a.words.slice(b), 4 * c);
          a.sigBytes = 4 * b;
          return p.create({ key: a, iv: c, salt: d });
        }
      }),
      s = (f.PasswordBasedCipher = j.extend({
        cfg: j.cfg.extend({ kdf: g }),
        encrypt: function (a, b, c, d) {
          d = this.cfg.extend(d);
          c = d.kdf.execute(c, a.keySize, a.ivSize);
          d.iv = c.iv;
          a = j.encrypt.call(this, a, b, c.key, d);
          a.mixIn(c);
          return a;
        },
        decrypt: function (a, b, c, d) {
          d = this.cfg.extend(d);
          b = this._parse(b, d.format);
          c = d.kdf.execute(c, a.keySize, a.ivSize, b.salt);
          d.iv = c.iv;
          return j.decrypt.call(this, a, b, c.key, d);
        }
      }));
  })();
//endregion

//region aes.min
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function () {
  for (
    var q = CryptoJS,
    x = q.lib.BlockCipher,
    r = q.algo,
    j = [],
    y = [],
    z = [],
    A = [],
    B = [],
    C = [],
    s = [],
    u = [],
    v = [],
    w = [],
    g = [],
    k = 0;
    256 > k;
    k++
  )
    g[k] = 128 > k ? k << 1 : (k << 1) ^ 283;
  for (var n = 0, l = 0, k = 0; 256 > k; k++) {
    var f = l ^ (l << 1) ^ (l << 2) ^ (l << 3) ^ (l << 4),
      f = (f >>> 8) ^ (f & 255) ^ 99;
    j[n] = f;
    y[f] = n;
    var t = g[n],
      D = g[t],
      E = g[D],
      b = (257 * g[f]) ^ (16843008 * f);
    z[n] = (b << 24) | (b >>> 8);
    A[n] = (b << 16) | (b >>> 16);
    B[n] = (b << 8) | (b >>> 24);
    C[n] = b;
    b = (16843009 * E) ^ (65537 * D) ^ (257 * t) ^ (16843008 * n);
    s[f] = (b << 24) | (b >>> 8);
    u[f] = (b << 16) | (b >>> 16);
    v[f] = (b << 8) | (b >>> 24);
    w[f] = b;
    n ? ((n = t ^ g[g[g[E ^ t]]]), (l ^= g[g[l]])) : (n = l = 1);
  }
  var F = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
    r = (r.AES = x.extend({
      _doReset: function () {
        for (
          var c = this._key,
          e = c.words,
          a = c.sigBytes / 4,
          c = 4 * ((this._nRounds = a + 6) + 1),
          b = (this._keySchedule = []),
          h = 0;
          h < c;
          h++
        )
          if (h < a) b[h] = e[h];
          else {
            var d = b[h - 1];
            h % a
              ? 6 < a &&
              4 == h % a &&
              (d =
                (j[d >>> 24] << 24) |
                (j[(d >>> 16) & 255] << 16) |
                (j[(d >>> 8) & 255] << 8) |
                j[d & 255])
              : ((d = (d << 8) | (d >>> 24)),
                (d =
                  (j[d >>> 24] << 24) |
                  (j[(d >>> 16) & 255] << 16) |
                  (j[(d >>> 8) & 255] << 8) |
                  j[d & 255]),
                (d ^= F[(h / a) | 0] << 24));
            b[h] = b[h - a] ^ d;
          }
        e = this._invKeySchedule = [];
        for (a = 0; a < c; a++)
          (h = c - a),
            (d = a % 4 ? b[h] : b[h - 4]),
            (e[a] =
              4 > a || 4 >= h
                ? d
                : s[j[d >>> 24]] ^
                u[j[(d >>> 16) & 255]] ^
                v[j[(d >>> 8) & 255]] ^
                w[j[d & 255]]);
      },
      encryptBlock: function (c, e) {
        this._doCryptBlock(c, e, this._keySchedule, z, A, B, C, j);
      },
      decryptBlock: function (c, e) {
        var a = c[e + 1];
        c[e + 1] = c[e + 3];
        c[e + 3] = a;
        this._doCryptBlock(c, e, this._invKeySchedule, s, u, v, w, y);
        a = c[e + 1];
        c[e + 1] = c[e + 3];
        c[e + 3] = a;
      },
      _doCryptBlock: function (c, e, a, b, h, d, j, m) {
        for (
          var n = this._nRounds,
          f = c[e] ^ a[0],
          g = c[e + 1] ^ a[1],
          k = c[e + 2] ^ a[2],
          p = c[e + 3] ^ a[3],
          l = 4,
          t = 1;
          t < n;
          t++
        )
          var q =
            b[f >>> 24] ^
            h[(g >>> 16) & 255] ^
            d[(k >>> 8) & 255] ^
            j[p & 255] ^
            a[l++],
            r =
              b[g >>> 24] ^
              h[(k >>> 16) & 255] ^
              d[(p >>> 8) & 255] ^
              j[f & 255] ^
              a[l++],
            s =
              b[k >>> 24] ^
              h[(p >>> 16) & 255] ^
              d[(f >>> 8) & 255] ^
              j[g & 255] ^
              a[l++],
            p =
              b[p >>> 24] ^
              h[(f >>> 16) & 255] ^
              d[(g >>> 8) & 255] ^
              j[k & 255] ^
              a[l++],
            f = q,
            g = r,
            k = s;
        q =
          ((m[f >>> 24] << 24) |
            (m[(g >>> 16) & 255] << 16) |
            (m[(k >>> 8) & 255] << 8) |
            m[p & 255]) ^
          a[l++];
        r =
          ((m[g >>> 24] << 24) |
            (m[(k >>> 16) & 255] << 16) |
            (m[(p >>> 8) & 255] << 8) |
            m[f & 255]) ^
          a[l++];
        s =
          ((m[k >>> 24] << 24) |
            (m[(p >>> 16) & 255] << 16) |
            (m[(f >>> 8) & 255] << 8) |
            m[g & 255]) ^
          a[l++];
        p =
          ((m[p >>> 24] << 24) |
            (m[(f >>> 16) & 255] << 16) |
            (m[(g >>> 8) & 255] << 8) |
            m[k & 255]) ^
          a[l++];
        c[e] = q;
        c[e + 1] = r;
        c[e + 2] = s;
        c[e + 3] = p;
      },
      keySize: 8
    }));
  q.AES = x._createHelper(r);
})();

//endregion

//enc base64
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function () {
  var h = CryptoJS,
    j = h.lib.WordArray;
  h.enc.Base64 = {
    stringify: function (b) {
      var e = b.words,
        f = b.sigBytes,
        c = this._map;
      b.clamp();
      b = [];
      for (var a = 0; a < f; a += 3)
        for (
          var d =
            (((e[a >>> 2] >>> (24 - 8 * (a % 4))) & 255) << 16) |
            (((e[(a + 1) >>> 2] >>> (24 - 8 * ((a + 1) % 4))) & 255) << 8) |
            ((e[(a + 2) >>> 2] >>> (24 - 8 * ((a + 2) % 4))) & 255),
          g = 0;
          4 > g && a + 0.75 * g < f;
          g++
        )
          b.push(c.charAt((d >>> (6 * (3 - g))) & 63));
      if ((e = c.charAt(64))) for (; b.length % 4;) b.push(e);
      return b.join("");
    },
    parse: function (b) {
      var e = b.length,
        f = this._map,
        c = f.charAt(64);
      c && ((c = b.indexOf(c)), -1 != c && (e = c));
      for (var c = [], a = 0, d = 0; d < e; d++)
        if (d % 4) {
          var g = f.indexOf(b.charAt(d - 1)) << (2 * (d % 4)),
            h = f.indexOf(b.charAt(d)) >>> (6 - 2 * (d % 4));
          c[a >>> 2] |= (g | h) << (24 - 8 * (a % 4));
          a++;
        }
      return j.create(c, a);
    },
    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
  };
})();
//endregion
//region encryption methods
var chatEncryptor = (function () {
  var key = CryptoJS.enc.Base64.parse(
    "TWVyY2hhbnRyYWRlTW9uZXlDaGF0IUAjJF4pKComIUA="
  );

  function makeIV(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    var base64String = btoa(result);
    return CryptoJS.enc.Base64.parse(base64String);
  }

  function getRandomIv() {
    return makeIV(16);
    //return CryptoJS.lib.WordArray.random(16);
  }
  function encrypt(plainText) {
    var iv = getRandomIv();
    var encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    }).ciphertext.toString(CryptoJS.enc.Base64);

    encrypted = encrypted + iv.toString(CryptoJS.enc.Base64);
    return encrypted;
  }

  function decrypt(encryptedText) {
    var data = separateVectorFromData(encryptedText);
    var cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(data.message)
    });
    var decrypt = CryptoJS.AES.decrypt(cipherParams, key, {
      iv: CryptoJS.enc.Base64.parse(data.iv),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    }).toString(CryptoJS.enc.Utf8);
    return decrypt;
  }

  function separateVectorFromData(data) {
    var iv = data.slice(-24);
    var message = data.substring(0, data.length - 24);
    return {
      iv: iv,
      message: message
    };
  }
  return {
    encrypt: encrypt,
    decrypt: decrypt
  };
})();
//endretion

(function ($) {
  var applicationconstants = {
    chatactions: {
      ADDUSER: "adduser",
      LOGINAGENT: "addagent",
      LOGINSUCCESS: "loginsuccess",
      UPDATEUSER: "updateuser",
      UPDATEUSERACK: "updateuserack",
      UPDATEAGENT: "updateagent",
      REFRESHUSER: "refreshuser",
      CONFIRMADDUSER: "useraddconfirmed",
      NEWUSERADDED: "useradded",
      ADDAGENT: "addadmin",
      INVALIDSOURCEAPP: "invalidsourceapp",
      CHATMESSAGE: "chatmessage",
      CHATMESSAGECONFIRMATION: "chatmessageconfirm",
      SEENCONFIRMATION: "seenconfirmation",
      LOGOFF: "logoff",
      NOAGENTSAVAILABLE: "noagentsavailable",
      AGENTAVAILABLE: "agentAvailable",
      TYPING: "typing",
      CHATHISTORY: "chathistory",
      INITIALIZECHATBOX: "initializechatbox",
      POSTINITIALIZECHATBOX: "postinitializechatbox",
      CLOSECHAT: "closechat",
      RATECHAT: "ratechat",
      CONFIRMCLOSECHAT: "confirmclosechat",
      CUSTOMERDISCONNECTED: "customerdisconnected",
      AGENTDISCONNECTED: "agentdisconnected",
      CUSTOMERONLINESTATUS: "customeronlinestatus",
      AGENTONLINESTATUS: "agentonlinestatus",
      INITIATETRANSFERCHAT: "initiatetransferchat",
      INITIATETRANSFERCHATACK: "initiatetransferchatack",
      TRANSFERCHAT: "transerchat",
      TRANSFERCHATTODEPARTMENT: "transferchattodepartment",
      DEPARTMENTOFFLINE: "departmentOffline",
      OFFLINEDATASUBMITTED: "offlinedatasubmitted",
      OFFLINEDATASUBMITTEDACK: "offlinedatasubmittedack",
      INAPPMESSAGE: "inappmessage"
    },
    chatactionData: {
      NOADMINSAVAILABLE: {
        message: "We will reach to you soon!"
      }
    },
    url: {
      baseUrl: "http://localhost:3034"
      //baseUrl: "https://demochat.mtradeasia.com"
      //baseUrl: "https://chat.eightsquare.co"
      //baseUrl: "https://chat.mtradeasia.com"
    }
  };

  var customError = function customError(message) {
    this.name = "mtaChatPluginError";
    this.message = message || "";
    this.stack = new Error().stack;
  };

  customError.prototype = new Error();
  customError.prototype.constructor = customError;

  $.fn.mtaChat = function (options) {
    var settings = $.extend({}, options);
    settings.socketUrl = applicationconstants.url.baseUrl;
    settings.hidePreChatForm = settings.mobileNumber || settings.email;
    if (!settings.channelCode) {
      throw new customError("Channel Code Required");
      return;
    }

    if (!settings.departmentCode) {
      throw new customError("Department Code Required");
      return;
    }

    function formatDate(dateVal) {
      var newDate = dateVal;
      var sMonth = padValue(newDate.getMonth() + 1);
      var sDay = padValue(newDate.getDate());
      var sYear = newDate.getFullYear();
      var sHour = newDate.getHours();
      var sMinute = padValue(newDate.getMinutes());
      var sAMPM = "AM";
      var iHourCheck = parseInt(sHour);

      if (iHourCheck > 12) {
        sAMPM = "PM";
        sHour = iHourCheck - 12;
      } else if (iHourCheck === 0) {
        sHour = "12";
      }

      sHour = padValue(sHour);
      return ""
        .concat(sDay, "/")
        .concat(sMonth, "/")
        .concat(sYear); // `${sHour}:${sMinute}:${sAMPM}`
      // return      sMonth + "-" + sDay + "-" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
    }

    function padValue(value) {
      return value < 10 ? "0" + value : value;
    }

    function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'

      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    }

    var lcAllPages = [];
    var $lcPreChatPage = null;
    var $lcSuccessPage = null;
    var $lcChatOffline = null;
    var $lcRateChateDiv = null;
    var $lcConversation = null;
    var $lcInputMessage = null;
    var $lcTyping = null;
    var $lcAgentStatus = null;
    var $lcReplyButton = null;
    var $announcementBanner = null;
    var socket = null;

    var typing = false;
    var historyLoaded = false;
    var rating = 0;
    var self = this;
    var timeout = null;

    var timeoutFunction = function timeoutFunction() {
      typing = false;
      socket.emit("typing", {
        isTyping: false,
        customerSessionId: sessionStorage.getItem("customerSessionId"),
        isAgent: false
      });
    };

    var LoginFormInput = function LoginFormInput() {
      var finput = $(".ChatForm input");
      finput.on("focus", function () {
        $(this)
          .siblings("label")
          .addClass("up");
        $(this)
          .siblings("label")
          .removeClass("down");
      });
      finput.blur(function () {
        if (!$(this).val()) {
          $(this)
            .siblings("label")
            .addClass("down");
          $(this)
            .siblings("label")
            .removeClass("up");
        }
      });
    };

    function validURL(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    }

    var liveChatShow = function liveChatShow() {
      $("#chatIcon").click(function () {
        setTimeout(function () {
          $("#lc_conversationDiv").scrollTop(
            $("#lc_conversationDiv")[0].scrollHeight
          );
        }, 150);
        if ($(".live-chat").hasClass("hide")) {
          if (!sessionStorage.getItem("customerSessionId")) {
            resetChatBox();
          }
          _initSocket();
          reInitBadge();

          if (
            settings.hidePreChatForm &&
            !sessionStorage.getItem("customerSessionId")
          ) {
            // socket.emit(applicationconstants.chatactions.INITIALIZECHATBOX, {
            //     departmentCode: settings.departmentCode,
            //     channelCode: settings.channelCode
            // });
            // socket.emit(applicationconstants.chatactions.ADDUSER, {
            //     isNewUser: true,
            //     name: settings.name ? settings.name : "",
            //     email: settings.email ? settings.email : "",
            //     mobileNumber: settings.mobileNumber ? settings.mobileNumber : "",
            //     departmentCode: settings.departmentCode,
            //     channelCode: settings.channelCode
            // });
          }
        } else {
        }

        $(".live-chat").toggleClass("hide");
        $(this).toggleClass("active");
      });
      $(".close-chat").click(function () {
        $(".live-chat").addClass("hide");
        $("#chatIcon").removeClass();
      });
      $("#sendAttachmentLink").click(function () {
        $("#sendAttachment").trigger("click");
      });
    };

    var reInitBadge = function reInitBadge() {
      notificationCount = 0;
      $("#lc_chatBadge").hide();
      $("#lc_chatBadge").text("");
    };

    var notificationCount = 0;

    var showUnseenNotificationCount = function showUnseenNotificationCount() {
      notificationCount += 1;
      $("#lc_chatBadge").text(notificationCount);
      $("#lc_chatBadge").show();
    };

    var isChatActive = function isChatActive() {
      return !$(".live-chat").hasClass("hide");
    };

    var ratingChat = function ratingChat() {
      /* 1. Visualizing things on Hover - See next part for action on click */
      $("#stars li")
        .on("mouseover", function () {
          var onStar = parseInt($(this).data("value"), 10); // The star currently mouse on
          // Now highlight all the stars that's not after the current hovered star

          $(this)
            .parent()
            .children("li.star")
            .each(function (e) {
              if (e < onStar) {
                $(this).addClass("hover");
              } else {
                $(this).removeClass("hover");
              }
            });
        })
        .on("mouseout", function () {
          $(this)
            .parent()
            .children("li.star")
            .each(function (e) {
              $(this).removeClass("hover");
            });
        });
    };

    var setActivePage = function setActivePage(page) {
      sessionStorage.setItem("activePage", page);
    };

    var getActivePage = function getActivePage() {
      return sessionStorage.getItem("activePage");
    };

    var getHeaderByPage = function getHeaderByPage(page) {
      if (page == "lc_conversation") return "lc-header-conversation";
      else if (page == "lc_rateDiv") return "lc-header-conversation";
      else if (page == "lc_chatOfline") return "lc-header-offline";
      else if (page == "lc_chatOnline") return "lc-header-prechat";
      else if (page == "lc_successSend") return "lc-header-offline";
      else return "lc-header-prechat";
    };

    var addChatNote = function addChatNote(message) {
      var messageDiv = '<div class="chat-starte">'.concat(message, "</div>");
      $(messageDiv).insertBefore($lcTyping);
      $("#lc_conversationDiv").scrollTop(
        $("#lc_conversationDiv")[0].scrollHeight
      );
    };

    var addMessages = function addMessages(data) {
      var message;
      var decryptedMessage = chatEncryptor.decrypt(data.message);
      if (data.isFile) {
        addFileToUploadList(data, true);
        return;
      }
      if (data.isInAppMessage) {
        addChatNote(decryptedMessage);
        $("#lc_conversationDiv").scrollTop(
          $("#lc_conversationDiv")[0].scrollHeight
        );
        return;
      }

      if (data.isAgent)
        message = '\n              <div class="msg">\n              <div class="inner-msg received">\n                 <p>'
          .concat(
            formattedUrlContent(cleanInput(decryptedMessage)),
            '\n                 </p>\n                 <div class="seened">\n                 '
          )
          .concat(
            formatAMPM(new Date(data.timestamp)),
            "\n                 </div>\n              </div>\n           </div>\n              "
          );
      //<i class="fas fa-check-double"></i>//removed seen
      else
        message = '\n              <div class="msg">\n              <div class="inner-msg send">\n                 <p>'
          .concat(
            formattedUrlContent(cleanInput(decryptedMessage)),
            '\n                 </p>\n                 <div class="seened">\n                 '
          )
          .concat(
            formatAMPM(new Date(data.timestamp)),
            "\n                 </div>\n              </div>\n           </div>\n              "
          ); // $('#lc_conversationDiv').append(message);

      $(message).insertBefore($lcTyping);
      $("#lc_conversationDiv").scrollTop(
        $("#lc_conversationDiv")[0].scrollHeight
      );
    };

    var loadHistory = function loadHistory() {
      if (!this.historyLoaded) {
        var chatHistory = getChatHistory();

        if (chatHistory && chatHistory.length > 0) {
          $.each(chatHistory, function (k, v) {
            addMessages(v);
          });
          setTimeout(function () {
            $("#lc_conversationDiv").scrollTop(
              $("#lc_conversationDiv")[0].scrollHeight
            );
          }, 50);
        }
      }

      this.historyLoaded = true;
    };

    var initializeChatForm = function initializeChatForm(data) {
      $("#lc_offlineMessage").text(data.offlineForm.offlineMessage);
      if (data.preChatForm.email) {
        $lcPreChatPage
          .find("input[name=email]")
          .closest(".form-group")
          .show();

        if (data.preChatForm.isEmailRequired) {
          $lcPreChatPage.find("input[name=email]").attr("required", true);
          $lcPreChatPage
            .find("input[name=email]")
            .closest(".form-group")
            .find("label")
            .addClass("mandatory");
        } else {
          $lcPreChatPage.find("input[name=email]").removeAttr("required");
          $lcPreChatPage
            .find("input[name=email]")
            .closest(".form-group")
            .find("label")
            .removeClass("mandatory");
        }

        $lcPreChatPage
          .find("input[name=email]")
          .attr(
            "pattern",
            "^\\S+@(([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,6})$"
          );
      } else {
        $lcPreChatPage
          .find("input[name=email]")
          .closest(".form-group")
          .hide();
        $lcPreChatPage.find("input[name=email]").removeAttr("required");
        $lcPreChatPage
          .find("input[name=email]")
          .closest(".form-group")
          .find("label")
          .removeClass("mandatory");
        $lcPreChatPage.find("input[name=email]").removeAttr("pattern");
      }

      if (data.preChatForm.name) {
        $lcPreChatPage
          .find("input[name=name]")
          .closest(".form-group")
          .show();

        if (data.preChatForm.isNameRequired) {
          $lcPreChatPage.find("input[name=name]").attr("required", true);
          $lcPreChatPage
            .find("input[name=name]")
            .closest(".form-group")
            .find("label")
            .addClass("mandatory");
        } else {
          $lcPreChatPage.find("input[name=name]").removeAttr("required");
          $lcPreChatPage
            .find("input[name=name]")
            .closest(".form-group")
            .find("label")
            .removeClass("mandatory");
        }

        $lcPreChatPage
          .find("input[name=name]")
          .attr("pattern", "^[a-zA-Z ]{3,40}");
      } else {
        $lcPreChatPage
          .find("input[name=name]")
          .closest(".form-group")
          .hide();
        $lcPreChatPage.find("input[name=name]").removeAttr("required");
        $lcPreChatPage
          .find("input[name=name]")
          .closest(".form-group")
          .find("label")
          .removeClass("mandatory");
        $lcPreChatPage.find("input[name=name]").removeAttr("pattern");
      }

      if (data.preChatForm.mobile) {
        $lcPreChatPage
          .find("input[name=mobileNumber]")
          .closest(".form-group")
          .show();

        if (data.preChatForm.isMobileNumberRequired) {
          $lcPreChatPage
            .find("input[name=mobileNumber]")
            .attr("required", true);
          $lcPreChatPage
            .find("input[name=mobileNumber]")
            .closest(".form-group")
            .find("label")
            .addClass("mandatory");
        } else {
          $lcPreChatPage
            .find("input[name=mobileNumber]")
            .removeAttr("required");
          $lcPreChatPage
            .find("input[name=mobileNumber]")
            .closest(".form-group")
            .find("label")
            .removeClass("mandatory");
        }

        $lcPreChatPage
          .find("input[name=mobileNumber]")
          .attr("pattern", "[0-9()-+ ]{11,12}"); // $lcPreChatPage.find('input[name=mobileNumber]').closest('.form-group').hide();
        // $lcPreChatPage.find('input[name=mobileNumber]').removeAttr('required');
        // $lcPreChatPage.find('input[name=mobileNumber]').removeAttr('pattern');
      } else {
        $lcPreChatPage
          .find("input[name=mobileNumber]")
          .closest(".form-group")
          .hide();
        $lcPreChatPage.find("input[name=mobileNumber]").removeAttr("required");
        $lcPreChatPage
          .find("input[name=mobileNumber]")
          .closest(".form-group")
          .find("label")
          .removeClass("mandatory");
        $lcPreChatPage.find("input[name=mobileNumber]").removeAttr("pattern");
      }

      if (data.offlineForm.email) {
        $lcChatOffline
          .find("input[name=email1]")
          .closest(".form-group")
          .show();

        if (data.offlineForm.isEmailRequired) {
          $lcChatOffline.find("input[name=email1]").attr("required", true);
          $lcChatOffline
            .find("input[name=email1]")
            .closest(".form-group")
            .find("label")
            .addClass("mandatory");
        } else {
          $lcChatOffline.find("input[name=email1]").removeAttr("required");
          $lcChatOffline
            .find("input[name=email1]")
            .closest(".form-group")
            .find("label")
            .removeClass("mandatory");
        }

        $lcChatOffline
          .find("input[name=email1]")
          .attr(
            "pattern",
            "^\\S+@(([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,6})$"
          );
      } else {
        $lcChatOffline
          .find("input[name=email1]")
          .closest(".form-group")
          .hide();
        $lcChatOffline.find("input[name=email1]").removeAttr("required");
        $lcChatOffline
          .find("input[name=email1]")
          .closest(".form-group")
          .find("label")
          .removeClass("mandatory");
        $lcChatOffline.find("input[name=email1]").removeAttr("pattern");
      }

      if (data.offlineForm.name) {
        $lcChatOffline
          .find("input[name=name1]")
          .closest(".form-group")
          .show();

        if (data.offlineForm.isNameRequired) {
          $lcChatOffline.find("input[name=name1]").attr("required", true);
          $lcChatOffline
            .find("input[name=name1]")
            .closest(".form-group")
            .find("label")
            .addClass("mandatory");
        } else {
          $lcChatOffline.find("input[name=name1]").removeAttr("required");
          $lcChatOffline
            .find("input[name=name1]")
            .closest(".form-group")
            .find("label")
            .removeClass("mandatory");
        }

        $lcChatOffline
          .find("input[name=name1]")
          .attr("pattern", "^[a-zA-Z ]{3,40}");
      } else {
        $lcChatOffline
          .find("input[name=name1]")
          .closest(".form-group")
          .hide();
        $lcChatOffline.find("input[name=name1]").removeAttr("required");
        $lcChatOffline
          .find("input[name=name1]")
          .closest(".form-group")
          .find("label")
          .removeClass("mandatory");
        $lcChatOffline.find("input[name=name1]").removeAttr("pattern");
      }

      if (data.offlineForm.mobile) {
        $lcChatOffline
          .find("input[name=mobileNumber1]")
          .closest(".form-group")
          .show();

        if (data.offlineForm.isMobileNumberRequired) {
          $lcChatOffline
            .find("input[name=mobileNumber1]")
            .attr("required", true);
          $lcChatOffline
            .find("input[name=mobileNumber1]")
            .closest(".form-group")
            .find("label")
            .addClass("mandatory");
        } else {
          $lcChatOffline
            .find("input[name=mobileNumber1]")
            .removeAttr("required");
          $lcChatOffline
            .find("input[name=mobileNumber1]")
            .closest(".form-group")
            .find("label")
            .removeClass("mandatory");
        }

        $lcChatOffline
          .find("input[name=mobileNumber1]")
          .attr("pattern", "[0-9()-+ ]{11,12}"); // $lcPreChatPage.find('input[name=mobileNumber]').closest('.form-group').hide();
        // $lcPreChatPage.find('input[name=mobileNumber]').removeAttr('required');
        // $lcPreChatPage.find('input[name=mobileNumber]').removeAttr('pattern');
      } else {
        $lcChatOffline
          .find("input[name=mobileNumber1]")
          .closest(".form-group")
          .hide();
        $lcChatOffline.find("input[name=mobileNumber1]").removeAttr("required");
        $lcChatOffline
          .find("input[name=mobileNumber1]")
          .closest(".form-group")
          .find("label")
          .removeClass("mandatory");
        $lcChatOffline.find("input[name=mobileNumber1]").removeAttr("pattern");
      }
    };

    var _initSocket = function _initSocket() {
      if (socket) return;
      socket = io.connect(applicationconstants.url.baseUrl);

      socket.on("fileuploaded", function (data) {
        if (data.isAgent) {
          addReveivedFileToUploadList(data);
          addChatHistory(
            data.url,
            getLocalDate(data.timestamp),
            data.isAgent,
            false,
            true,
            data.originalFileName
          );
          //markFileAsDone(data.messageId, data);
          return;
        }
        filesToUpload = _.reject(filesToUpload, function (x) {
          return x.messageId == data.messageId;
        });
        markFileAsDone(data.messageId, data);
      });

      socket.on("moredata", function (data) {
        var Place = data["place"] * 409600; //The Next Blocks Starting Position
        var NewFile; //The Variable that will hold the new Block of Data
        var selectedFileData = _.find(filesToUpload, function (x) {
          return x.messageId == data.messageId;
        });
        var selectedFile = separateBase64FromDataUrl(selectedFileData.file);
        if (selectedFile.webkitSlice)
          NewFile = selectedFile.webkitSlice(
            Place,
            Place + Math.min(409600, selectedFile.length - Place)
          );
        else if (selectedFile.mozSlice)
          NewFile = selectedFile.mozSlice(
            Place,
            Place + Math.min(409600, selectedFile.length - Place)
          );
        else
          NewFile = selectedFile.slice(
            Place,
            Place + Math.min(409600, selectedFile.length - Place)
          );
        socket.emit("upload", {
          name: selectedFileData.name,
          isAgent: false,
          data: NewFile,
          messageId: selectedFileData.messageId,
          customerSessionId: sessionStorage.getItem("customerSessionId")
        });
        //  selectedFileData.reader.readAsDataURL(NewFile);
      });

      socket.on(
        applicationconstants.chatactions.POSTINITIALIZECHATBOX,
        function (data) {
          if (!data) {
            throw new customError("Invalid Department/channel Details");
          }
          if (data.announcementBanner) {
            $announcementBanner.show();
            sessionStorage.setItem(
              "ab",
              chatEncryptor.encrypt(data.announcementBanner)
            );
            $announcementBanner.html(data.announcementBanner);
          } else {
            $announcementBanner.html("");
            $announcementBanner.hide();
          }
          if (
            settings.hidePreChatForm &&
            !sessionStorage.getItem("customerSessionId")
          ) {
            if (
              data.preChatForm.name &&
              data.preChatForm.isNameRequired &&
              !settings.name
            ) {
              throw new customError("Customer Name Required");
            }
            if (
              data.preChatForm.mobile &&
              data.preChatForm.isMobileNumberRequired &&
              !settings.mobileNumber
            ) {
              throw new customError("Customer Mobile Number Required");
            }
            if (
              data.preChatForm.email &&
              data.preChatForm.isEmailRequired &&
              !settings.email
            ) {
              throw new customError("Customer Email Required");
            }
            $("#lc_offlineMessage").text(data.offlineForm.offlineMessage);

            socket.emit(applicationconstants.chatactions.ADDUSER, {
              isNewUser: true,
              name: settings.name ? settings.name : "",
              email: settings.email ? settings.email : "",
              mobileNumber: settings.mobileNumber ? settings.mobileNumber : "",
              departmentCode: settings.departmentCode,
              channelCode: settings.channelCode
            });
            $(".live-chat").removeClass("hide");
            return;
          }
          initializeChatForm(data);
          hmrShowPage($lcPreChatPage); //liveChatShow();

          $(".live-chat").removeClass("hide");
        }
      );
      socket.on(
        applicationconstants.chatactions.OFFLINEDATASUBMITTEDACK,
        function (data) {
          hmrShowPage($lcSuccessPage);
        }
      );

      socket.on(applicationconstants.chatactions.AGENTDISCONNECTED, function (
        data
      ) {
        if (settings.mobileNumber || settings.email) {
          resetAuthorizedChatBox();
          return;
        }
        resetChatBox(); //hmrShowPage($lcPreChatPage);
      });

      socket.on("reconnecting", function (data) {
        if (getActivePage() == "lc_conversation") {
          $lcInputMessage.prop("disabled", true);
          $lcInputMessage.prop(
            "placeholder",
            "Please check your internet connection..."
          );
          $lcAgentStatus.removeClass("chat-online");
          $lcAgentStatus.addClass("chat-offline");
        }
      });

      socket.on("disconnect", function () {
        if (getActivePage() == "lc_conversation") {
          $lcInputMessage.prop("disabled", true);
          $lcInputMessage.prop(
            "placeholder",
            "Please check your internet connection..."
          );
          $lcAgentStatus.removeClass("chat-online");
          $lcAgentStatus.addClass("chat-offline");
        }
      });
      socket.on(applicationconstants.chatactions.UPDATEUSERACK, function (data) {
        var activepage = getActivePage();

        if (activepage) {
          if (activepage != "lc_rateDiv") {
            $lcInputMessage.prop("disabled", false);
            $lcInputMessage.prop("placeholder", "Type a message here");
          }
        }

        $lcAgentStatus.removeClass("chat-offline");
        $lcAgentStatus.addClass("chat-online");
      });
      socket.on("reconnect", function () {
        setTimeout(function () {
          if (getActivePage() == "lc_conversation") {
            if (sessionStorage.getItem("customerSessionId")) {
              socket.emit(applicationconstants.chatactions.UPDATEUSER, {
                isNewUser: false,
                customerSessionId: sessionStorage.getItem("customerSessionId")
              });
              // $lcInputMessage.prop('disabled', false);
              // $lcInputMessage.prop('placeholder', '');
            }
          }
        }, 4000);
      });
      socket.on(applicationconstants.chatactions.TYPING, function (data) {
        if (data.isTyping && data.isAgent) $lcTyping.show();
        else $lcTyping.hide();
        $("#lc_conversationDiv").scrollTop(
          $("#lc_conversationDiv")[0].scrollHeight
        );
      });
      socket.on(applicationconstants.chatactions.AGENTONLINESTATUS, function (
        data
      ) {
        $lcInputMessage.prop("disabled", !data.isOnline);
        if (data.isOnline)
          $lcInputMessage.prop("placeholder", "Type a message here");
        else
          $lcInputMessage.prop(
            "placeholder",
            "Please wait until we get back to you"
          );
        if (data.isOnline) {
          $lcAgentStatus.addClass("chat-online");
          $lcAgentStatus.removeClass("chat-offline");
        } else {
          $lcAgentStatus.removeClass("chat-online");
          $lcAgentStatus.addClass("chat-offline");
        }
      });
      socket.on(applicationconstants.chatactions.AGENTAVAILABLE, function (
        data
      ) {
        hmrShowPage($lcConversation);
        var time = new Date(); //before
        // $lcStartChatLabel.text(`Chat started ${formatAMPM(time)} on ${formatDate(time)}`);
        // $lcStartChatLabel.show();
        // setChatStartTime(time);
        //beforeend

        var startMessage = "Chat started "
          .concat(formatAMPM(time), " on ")
          .concat(formatDate(time));
        var encryptedStartMessage = chatEncryptor.encrypt(startMessage);
        var decryptedWelcomeMessage = chatEncryptor.decrypt(data.message);
        addChatNote(startMessage);
        addChatHistory(encryptedStartMessage, time, true, true);
        time = new Date();
        var message = '\n              <div class="msg">\n              <div class="inner-msg received">\n                 <p>'
          .concat(
            decryptedWelcomeMessage,
            '\n                 </p>\n                 <div class="seened">\n                 '
          )
          .concat(
            formatAMPM(time),
            "\n                 </div>\n              </div>\n           </div>\n              "
          ); // $('#lc_conversationDiv').append(message);

        $(message).insertBefore($lcTyping);
        $("#lc_conversationDiv").scrollTop(
          $("#lc_conversationDiv")[0].scrollHeight
        );
        addChatHistory(data.message, time, true, false);
      });
      socket.on(applicationconstants.chatactions.INAPPMESSAGE, function (data) {
        var time = new Date();
        var decryptedInAppMessage = chatEncryptor.decrypt(data.message);
        addChatNote(decryptedInAppMessage);
        addChatHistory(data.message, time, true, true);
      });

      socket.on(applicationconstants.chatactions.DEPARTMENTOFFLINE, function (
        data
      ) {
        hmrShowPage($lcChatOffline);
      });
      socket.on(applicationconstants.chatactions.CLOSECHAT, function (data) {
        var time = new Date();
        $lcRateChateDiv.show();
        $lcInputMessage.prop("disabled", true); //before comment
        // $lcInputMessage.prop('disabled', true);
        // $lcEndChatLabel.text(`Chat Ended ${formatAMPM(time)} on ${formatDate(time)}`);
        // setChatEndTime(time);
        // $lcEndChatLabel.show();
        var decryptedMessage = chatEncryptor.decrypt(data.message);
        var endMessage = decryptedMessage; // `Chat Ended ${formatAMPM(time)} on ${formatDate(
        //   time
        // )}`;

        addChatNote(endMessage);
        addChatHistory(data.message, time, true, true);
        setActivePage("lc_rateDiv");
        $("#lc_conversationDiv").scrollTop(
          $("#lc_conversationDiv")[0].scrollHeight
        );
      });
      socket.on(applicationconstants.chatactions.LOGOFF, function (data) {
        if (settings.mobileNumber || settings.email) {
          resetAuthorizedChatBox();
          return;
        }
        resetChatBox(); //  hmrShowPage($lcPreChatPage);
      });
      socket.on(applicationconstants.chatactions.CHATMESSAGE, function (data) {
        var decryptedMessage = chatEncryptor.decrypt(data.message);
        var message = cleanInput(decryptedMessage);
        if (data.isAgent) {
          var date = getLocalDate(data.timestamp);

          var div = '\n                      <div class="msg">\n                      <div class="inner-msg received">\n                         <p>'
            .concat(
              formattedUrlContent(message),
              '\n                         </p>\n                         <div class="seened">\n                         '
            )
            .concat(
              formatAMPM(date),
              "\n                         </div>\n                      </div>\n                   </div>\n                      "
            ); //$('#lc_conversationDiv').append(message);

          $(div).insertBefore($lcTyping);
          $("#lc_conversationDiv").scrollTop(
            $("#lc_conversationDiv")[0].scrollHeight
          );
          addChatHistory(data.message, date, true, false);

          if (!isChatActive()) {
            showUnseenNotificationCount();
          }
        }
      });
      socket.on("connect", function () {
        if (sessionStorage.getItem("customerSessionId"))
          socket.emit(applicationconstants.chatactions.UPDATEUSER, {
            isNewUser: false,
            customerSessionId: sessionStorage.getItem("customerSessionId")
          });
        else
          socket.emit(applicationconstants.chatactions.INITIALIZECHATBOX, {
            departmentCode: settings.departmentCode,
            channelCode: settings.channelCode
          });
      });
      socket.on(applicationconstants.chatactions.CONFIRMADDUSER, function (
        data
      ) {
        sessionStorage.setItem("customerSessionId", data.customerSessionId); //  $lcInputMessage.val('');
        //hmrShowPage($lcConversation);
      });

      if (window.sessionStorage.getItem("customerSessionId") == null) {
        //hmrShowPage($lcPreChatPage);
      } else {
        //update socketid
        // socket.emit(applicationconstants.chatactions.UPDATEUSER, {
        //     customerSessionId: sessionStorage.getItem("customerSessionId")
        // });
        var activepage = getActivePage();

        if (activepage) {
          if (activepage == "lc_rateDiv") {
            hmrShowPage("lc_conversation");
            $("#lc_rateDiv").show();
            $lcInputMessage.prop("disabled", true);
            setActivePage("lc_rateDiv");
          } else hmrShowPage(activepage);
        }
      }
    };

    var getLocalDate = function (utcdateString) {
      //var a = utcdateString.split(/[^0-9]/);
      //return new Date (a[0],a[1]-1,a[2],a[3],a[4],a[5] );
      return new Date(utcdateString.replace(" ", "T") + "Z");
    };
    var getFormattedUtcDate = function (date) {
      var d = date.getUTCDate();
      var M = date.getUTCMonth() + 1;
      var y = date.getUTCFullYear();
      var h = date.getUTCHours();
      var m = date.getUTCMinutes();
      var s = date.getUTCSeconds();
      return (
        y +
        "-" +
        M.toString().padStart(2, "0") +
        "-" +
        d.toString().padStart(2, "0") +
        " " +
        h.toString().padStart(2, "0") +
        ":" +
        m.toString().padStart(2, "0") +
        ":" +
        s.toString().padStart(2, "0")
      );
    };

    var resetAuthorizedChatBox = function resetAuthorizedChatBox() {
      sessionStorage.clear();
      $lcEndChatLabel.text("");
      //hmrShowPage($lcPreChatPage);
      $(".live-chat").addClass("hide");
      $(".lsx-emojipicker-container").hide();
      $lcStartChatLabel.text("");
      $lcConversation.find(".msg").remove();
      $(".chat-starte").remove();
      $lcInputMessage.prop("disabled", false);
      $lcAgentStatus.removeClass("chat-offline");
      $lcAgentStatus.addClass("chat-online");
      $lcInputMessage.prop("placeholder", "Type a message here");
      $lcRateChateDiv.hide();
      $(".live-chat").addClass("hide");
      if (socket) {
        socket.close();
        socket = null;
      }
      resetInputFields();
    };
    var resetChatBox = function resetChatBox() {
      // var customerSessionId = sessionStorage.getItem("customerSessionId");
      sessionStorage.clear();
      if (socket) {
        socket.close();
        socket = null;
      }
      $(".lsx-emojipicker-container").hide();
      //hmrShowPage($lcPreChatPage);
      $lcEndChatLabel.text("");
      $(".live-chat").addClass("hide");
      $lcStartChatLabel.text("");
      $lcConversation.find(".msg").remove();
      $(".chat-starte").remove();

      $lcAgentStatus.removeClass("chat-offline");
      $lcAgentStatus.addClass("chat-online");
      $lcInputMessage.prop("disabled", false);
      $lcInputMessage.prop("placeholder", "Type a message here");
      $lcRateChateDiv.hide();
      resetInputFields(); //   sessionStorage.removeItem("customerSessionId");
      // sessionStorage.removeItem(customerSessionId);
      //hmrShowPage($lcPreChatPage);
      // _container.find("*").off();
      // _container.children().off();
      //_container.empty();
      //_render();
      //   resetInputFields();

      // socket.emit(applicationconstants.chatactions.INITIALIZECHATBOX, {
      //     departmentCode: settings.departmentCode,
      //     channelCode: settings.channelCode
      // });
    };

    function resetInputFields() {
      _container.find("input[type=text]").val("");

      _container.find("input[type=email]").val(""); // $('input:checkbox').removeAttr('checked');

      _container.find("input[type='checkbox']:checked").prop("checked", false);

      _container.find("textarea").val("");

      _container
        .find(".up")
        .removeClass("up")
        .addClass("down");

      _container.find("li.star").removeClass("selected");
    }

    function showErrorMessage(message) {
      $(".errorMessage").html(message);
      $(".errorMessage").removeClass("hide");
      setTimeout(function () {
        $(".errorMessage").addClass("hide");
        $(".errorMessage").html("");
      }, 3000);
    }

    var filesToUpload = [];
    function uploadFile(event) {
      getBase64iMage(event.target.files[0]).done(function (res) {
        var validationErrors = validateFileData(
          event.target.files[0].name,
          res.length
        );
        if (validationErrors) {
          showErrorMessage(validationErrors);
          return;
        }
        var file = {
          name: event.target.files[0].name,
          file: res,
          messageId:
            sessionStorage.getItem("customerSessionId") +
            new Date(getFormattedUtcDate(new Date())).getTime(),
          reader: new FileReader(),
          sent: false
        };
        filesToUpload.push(file);
        uploadChunk(file);
      });
    }

    function getBase64iMage(data) {
      var $deferred = $.Deferred();
      var reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onload = function () {
        $deferred.resolve(reader.result);
      };
      return $deferred.promise();
    }
    function separateBase64FromDataUrl(data) {
      var regex = /data:.+?,/;
      return data.replace(regex, "");
    }
    function addFileToUploadList(data, history) {
      var isImageFile = isImage(data.originalFileName);
      var selectedFileData = null;
      if (isImageFile && !history) {
        selectedFileData = _.find(filesToUpload, function (x) {
          return x.messageId == data.messageId;
        });

        var fileContent = '<div class="msg">'
          .concat(
            data.isAgent
              ? '<div class="inner-msg received">'
              : '  <div class="inner-msg send">'
          )
          .concat('     <div id="', data.messageId)
          .concat(
            history
              ? '" class="uploaded-file">'
              : '" class="uploaded-file hidden">'
          )
          .concat(
            '						<a target="_blank" href="',
            history ? chatEncryptor.decrypt(data.message) : data.message
          )
          .concat('">')
          .concat(
            isImageFile
              ? '<img src="' + selectedFileData.file + '">'
              : '												<i class="fas fa-file"></i>'
          )
          .concat("												<span>", data.originalFileName)
          .concat("</span>")
          .concat("						</a> ")
          .concat('			      <div class="line-loader hide"></div>')
          .concat("			</div>")
          .concat('     <div class="seened">')
          .concat(
            history
              ? formatAMPM(new Date(data.timestamp))
              : formatAMPM(getLocalDate(data.timestamp)),
            ""
          )
          .concat("     </div>")
          .concat("  </div>")
          .concat("</div>");
        $(fileContent).insertBefore($lcTyping);
        setTimeout(function () {
          $("#lc_conversationDiv").scrollTop(
            $("#lc_conversationDiv")[0].scrollHeight
          );
        }, 300);
      } else {
        selectedFileData = _.find(filesToUpload, function (x) {
          return x.messageId == data.messageId;
        });

        var fileContent = '<div class="msg">'
          .concat(
            data.isAgent
              ? '<div class="inner-msg received">'
              : '  <div class="inner-msg send">'
          )
          .concat('     <div id="', data.messageId)
          .concat(
            history
              ? '" class="uploaded-file">'
              : '" class="uploaded-file hidden">'
          )
          .concat(
            '						<a target="_blank" href="',
            history ? chatEncryptor.decrypt(data.message) : data.message
          )
          .concat('">')
          .concat(
            isImageFile
              ? '<img src="' +
              (history
                ? chatEncryptor.decrypt(data.message)
                : selectedFileData.file) +
              '">'
              : '												<i class="fas fa-file"></i>'
          )
          .concat("												<span>", data.originalFileName)
          .concat("</span>")
          .concat("						</a> ")
          .concat('			      <div class="line-loader hide"></div>')
          .concat("			</div>")
          .concat('     <div class="seened">')
          .concat(
            history
              ? formatAMPM(new Date(data.timestamp))
              : formatAMPM(getLocalDate(data.timestamp)),
            ""
          )
          .concat("     </div>")
          .concat("  </div>")
          .concat("</div>");
        $(fileContent).insertBefore($lcTyping);
        setTimeout(function () {
          $("#lc_conversationDiv").scrollTop(
            $("#lc_conversationDiv")[0].scrollHeight
          );
        }, 300);
      }
    }

    function addReveivedFileToUploadList(data) {
      var isImageFile = isImage(data.originalFileName);

      var fileContent = '<div class="msg">'
        .concat('<div class="inner-msg received">')
        .concat('     <div id="', data.messageId)
        .concat(
          history ? '" class="uploaded-file">' : '" class="uploaded-file">'
        )
        .concat('						<a target="_blank" href="', chatEncryptor.decrypt(data.url))
        .concat('">')
        .concat(
          isImageFile
            ? '<img src="' + chatEncryptor.decrypt(data.url) + '">'
            : '												<i class="fas fa-file"></i>'
        )
        .concat("												<span>", data.originalFileName)
        .concat("</span>")
        .concat("						</a> ")
        .concat('			      <div class="line-loader hide"></div>')
        .concat("			</div>")
        .concat('     <div class="seened">')
        .concat(formatAMPM(getLocalDate(data.timestamp)), "")
        .concat("     </div>")
        .concat("  </div>")
        .concat("</div>");
      $(fileContent).insertBefore($lcTyping);
      setTimeout(function () {
        $("#lc_conversationDiv").scrollTop(
          $("#lc_conversationDiv")[0].scrollHeight
        );
      }, 300);
    }
    function isImage(fileName) {
      var sFileExtension = fileName
        .split(".")
      [fileName.split(".").length - 1].toLowerCase();
      var imageExtensions = ["jpeg", "jpg", "png"];
      if (
        _.find(imageExtensions, function (x) {
          return x == sFileExtension;
        })
      )
        return true;
      return false;
    }
    function markFileAsDone(messageId, data) {
      var date = getLocalDate(data.timestamp);
      $("#" + messageId).find("a")[0].href = chatEncryptor.decrypt(data.url);
      $("#" + messageId).removeClass("hidden");
      if (isImage(data.originalFileName)) {
        $("#" + messageId).find("img")[0].src = chatEncryptor.decrypt(data.url);
      }
      addChatHistory(
        data.url,
        date,
        data.isAgent,
        false,
        true,
        data.originalFileName
      );
    }
    function validateFileData(fileName, fileSize) {
      var sFileExtension = fileName
        .split(".")
      [fileName.split(".").length - 1].toLowerCase();
      if (
        sFileExtension != "jpeg" &&
        sFileExtension != "jpg" &&
        sFileExtension != "png" &&
        sFileExtension != "pdf"
      )
        return "Invalid File Type(Supported Types: jpeg,jpg,png,pdf)";
      if (fileSize > 4194304) return "Invalid File Size(Max Size: 3 MB)";
      return null;
      // if (!(sFileExtension === "jpeg"
      //   || sFileExtension === "jpg"
      //   || sFileExtension === "png"
      //   || sFileExtension === "pdf"
      // ) || fileSize > 4194304) { /// 3 mb
      //   return false;
      // }
      // return true;
    }
    function uploadChunk(file) {
      var time = new Date();
      //  var Name = file.file.name;
      // file.reader.onload = function (evnt) {
      //   socket.emit('upload', { 'name': file.name, isAgent: false, data: evnt.target.result, messageId: file.messageId, customerSessionId: sessionStorage.getItem("customerSessionId") });
      // }
      addFileToUploadList({
        originalFileName: file.name,
        messageId: file.messageId,
        isAgent: false,
        timestamp: getFormattedUtcDate(time),
        message: ""
      });
      socket.emit("startfileupload", {
        isAgent: false,
        name: file.name,
        size: separateBase64FromDataUrl(file.file).length,
        messageId: file.messageId,
        customerSessionId: sessionStorage.getItem("customerSessionId"),
        timestamp: getFormattedUtcDate(time)
      });
    }

    var _init = function _init() {
      _render();
      if (window.File && window.FileReader) {
        $("#sendAttachment").on("change", uploadFile);
      }

      window.addEventListener("offline", function (event) {
        if (getActivePage() == "lc_conversation") {
          $lcInputMessage.prop("disabled", true);
          $lcInputMessage.prop(
            "placeholder",
            "Please check your internet connection..."
          );
          $lcAgentStatus.removeClass("chat-online");
          $lcAgentStatus.addClass("chat-offline");
        }
      });

      validateFromData.validateForms();
      $lcPreChatPage = $("#lc_chatOnline");
      $lcSuccessPage = $("#lc_successSend");
      $lcChatOffline = $("#lc_chatOfline");
      $lcAgentStatus = $("#agent-status");
      $lcConversation = $("#lc_conversation");
      $announcementBanner = $("#announcementBanner");
      $lcRateChateDiv = $("#lc_rateDiv");
      lcAllPages = [
        $lcPreChatPage,
        $lcSuccessPage,
        $lcChatOffline,
        $lcConversation
      ];
      $lcReplyButton = $("#lc_sendMsgButton");
      $lcTyping = $("#lc_typing");
      $lcStartChatLabel = $("#lc_startChat");
      $lcEndChatLabel = $("#lc_endChat");
      $lcInputMessage = $(".chat-input").find("#chatTextArea");
      //    hmrShowPage('');
      if (sessionStorage.getItem("ab")) {
        $announcementBanner.html(
          chatEncryptor.decrypt(sessionStorage.getItem("ab"))
        );
        $announcementBanner.show();
      }
      // window.onresize = function(event) {
      //   heightCal();
      // };
      setTimeout(function () {
        $(".emojipicker").lsxEmojiPicker({
          closeOnSelect: true,
          //hidePickerOnBlur: true,
          twemoji: true,
          onSelect: function (emoji) {
            if ($lcInputMessage.is(":disabled")) {
              return;
            }
            var div = $("<div>" + emoji.value + "</div>");
            var clone = div.appendTo("body").clone();
            div.remove();
            $lcInputMessage.val($lcInputMessage.val() + " " + clone.html());
            $lcInputMessage.focus();
          }
        });
      }, 100);
      if (!getActivePage()) setActivePage("lc_chatOnline");

      $("#stars li").on("click", function () {
        var onStar = parseInt($(this).data("value"), 10); // The star currently selected

        var stars = $(this)
          .parent()
          .children("li.star");

        for (i = 0; i < stars.length; i++) {
          $(stars[i]).removeClass("selected");
        }

        for (i = 0; i < onStar; i++) {
          $(stars[i]).addClass("selected");
        }
      }); //rating value*/

      $("#rateIt").on("click", function () {
        var ratingValue = parseInt(
          $("#stars li.selected")
            .last()
            .data("value"),
          10
        ); // alert('Rating value is '+ ratingValue);

        if (isNaN(ratingValue)) {
          rating = 0;
        } else {
          rating = ratingValue;
        }

        socket.emit(applicationconstants.chatactions.RATECHAT, {
          customerSessionId: sessionStorage.getItem("customerSessionId"),
          rating: rating
        });
        if (settings.hidePreChatForm) {
          resetAuthorizedChatBox();
          return;
        }
        resetChatBox();
      });

      $(".Number").keypress(function (event) {
        var keycode = event.which;
        var key = event.key;

        if (
          key == "." ||
          !(
            event.shiftKey == false &&
            (keycode == 46 ||
              keycode == 8 ||
              keycode == 37 ||
              keycode == 39 ||
              (keycode >= 48 && keycode <= 57))
          )
        ) {
          event.preventDefault();
        }
      });

      $(".Alphabet").keypress(function (event) {
        var inputValue = event.which;
        var key = event.key; // allow letters and whitespaces only.

        if (
          key == "." ||
          (!(inputValue >= 65 && inputValue <= 90) &&
            !(inputValue >= 97 && inputValue <= 122) &&
            inputValue != 32 &&
            inputValue != 0)
        ) {
          event.preventDefault();
        }
      });
      $($lcChatOffline.children("form")).on("submit", function (e) {
        e.preventDefault();

        if ($(".error", e.target).length == 0) {
          lcHandleOfflineSubmit(e);
          // hmrShowPage($lcSuccessPage);
        }
      });
      $($lcPreChatPage.children("form")).on("submit", function (e) {
        e.preventDefault();
        if ($(".error", e.target).length == 0) lcHandlePrechatSubmit(e);
      });
      $lcReplyButton.on("click", function (e) {
        lcSendMessage(e);
      });
      $lcInputMessage.on("keypress", function (e) {
        if (e.which === 13) {
          if (!e.shiftKey) {
            lcSendMessage(e);
          }
        } else {
          if (typing === false && $(this).is(":focus")) {
            typing = true;
            socket.emit("typing", {
              isTyping: true,
              customerSessionId: sessionStorage.getItem("customerSessionId"),
              isAgent: false
            });
            clearTimeout(timeout);
            timeout = setTimeout(timeoutFunction, 3000);
          } else {
            ////clearTimeout(timeout);
            //timeout = setTimeout(timeoutFunction, 3000);
          }
        }
      });

      $(".emojionearea-editor").on("keypress", function (e) {
        if (e.which === 13) {
          lcSendMessage(e);
        } else {
          if (typing === false && $(this).is(":focus")) {
            typing = true;
            socket.emit("typing", {
              isTyping: true,
              customerSessionId: sessionStorage.getItem("customerSessionId"),
              isAgent: false
            });
            clearTimeout(timeout);
            timeout = setTimeout(timeoutFunction, 3000);
          } else {
            ////clearTimeout(timeout);
            //timeout = setTimeout(timeoutFunction, 3000);
          }
        }
      });
      ratingChat();
      //  intScroll();
      LoginFormInput();
      liveChatShow();
      // heightCal();
      if (sessionStorage.getItem("customerSessionId")) _initSocket();
    };

    var intScroll = function intScroll() {
      $(document).ready(function () {
        var Scrollbar = window.Scrollbar;
        Scrollbar.initAll(document.querySelector(".lc-body-inner"));
      });
    };

    function heightCal() {
      var windowH = $(window).outerHeight(); //var chatIconH = $l('.chat-icon').outerHeight(true) || 0;
      //var chatInputH = $l('.chat-input').outerHeight(true) || 0;
      //var chatHeadH = $l('.lc-header').outerHeight(true) || 0;
      //var btnH = $l('.btn-submit').outerHeight(true) || 0;
      //var AddedH = chatIconH + chatInputH + chatHeadH + 120 + btnH;

      var lbiH = windowH - 326 + "px";
      $(document).ready(function () {
        $(".lc-body-inner").height(lbiH);
      });
    }

    var _render = function _render() {
      var data = '<div class="mm-liveChat">'
        .concat('	<div class="live-chat hide">')
        .concat(
          '		<div class="lc-header" id="lc-header-prechat" style="display:none">'
        )

        .concat("			<span>Live Chat</span>")
        .concat('			<a href="JavaScript:Void(0);" class="close-chat">')
        .concat('				<img src="')
        .concat(settings.socketUrl, '/images/chat-close.svg">')
        .concat("				</a>")
        .concat("			</div>")
        .concat(
          '			<div class="lc-header" id="lc-header-conversation" style="display:none">'
        )

        .concat("				<span>Live Chat</span>")

        //.concat('					<div id="agent-status" class="chat-image chat-online"></div>')
        .concat('					<a href="JavaScript:Void(0);" class="close-chat">')
        .concat('						<img src="')
        .concat(settings.socketUrl, '/images/chat-close.svg">')
        .concat("						</a>")

        .concat("				</div>")
        .concat(
          '				<div class="lc-header" id="lc-header-offline" style="display: none">'
        )
        .concat("					<span> Leave A Message ! </span>")

        .concat("					</div>")
        .concat('					<div class="lc-body">')
        .concat('						<div id="lc_successSend" style="display: none;">')
        .concat('							<div class="lc-body-inner">')
        .concat('								<div class="lc-tm">')
        .concat('									<img src="')
        .concat(settings.socketUrl, '/images/success.svg">')
        .concat("										<span>Thank You </span>")
        .concat("									</div>")
        .concat("								</div>")
        .concat("							</div>")
        .concat('							<div id="lc_chatOfline" style="display: none;">')
        .concat(
          '								<form id="ChatForm" validate=true  class="pad-15 imp ChatForm" action="index4.html">'
        )
        .concat('									<div class="lc-offlineMessage mt0b25" style="color:red">')
        .concat('										<span id="lc_offlineMessage" ></span>')
        .concat("									</div>")
        .concat('									<div class="lc-body-inner">')
        .concat('										<div class="form-group">')
        .concat("											<label> Name  </label>")
        .concat(
          '											<input type="text" name="name1" class="form-control Alphabet" maxlength="40" pattern="^[a-zA-Z ]{3,40}" data-error="Please enter a valid name" required>'
        )
        .concat("											</div>")
        .concat('											<div class="form-group">')
        .concat("												<label> Mobile Number </label>")
        .concat(
          '												<input type="text" name="mobileNumber1" maxlength="12" pattern="[0-9\\(\\)\\-\\+ ]{11,12}" class="form-control Number" data-error="Please indicate country code “6” followed by Mobile Number e.g. 6018xxxxxx" required>'
        )
        .concat("												</div>")
        .concat('												<div class="form-group">')
        .concat('													<label class="mandatory"> Email </label>')
        .concat(
          '													<input type="text" name="email1" class="form-control" maxlength="50" required data-error="Please enter a valid email">'
        )
        .concat("													</div>")
        .concat('													<div class="form-group">')
        .concat('														<label class="mandatory"> Message </label>')
        .concat(
          '														<textarea type="text" rows="3" maxlength="150" name="offlineMessage" data-error="Please enter a message" required class="h145 form-control"></textarea>'
        )
        .concat("													</div>")
        .concat('													<div class="agree mt0b25">')
        .concat(
          "														<span>                               Your personal data is collected and used for                               Customer Support purposes only. Full policy available                               at "
        )
        .concat("															")
        .concat(
          '															<a href="www.mtradeasia.com/main/privacy-policy" target="_blank"> www.mtradeasia.com/main/privacy-policy/</a>'
        )
        .concat("														</span>")
        .concat('														<div class="agree-checkbox">')
        .concat(
          '															<input class="styled-checkbox" id="Aggree" data-error="Please agree to continue" type="checkbox" required value="value1">'
        )
        .concat('																<label for="Aggree">Agree</label>')
        .concat("															</div>")
        .concat("														</div>")
        .concat("														<!--end agree-->")
        .concat("													</div>")
        .concat(
          '													<input type="submit" class="btn-block btn btn-submit" id="lc_offlineSubmit" name="" value="Submit">'
        )
        .concat("													</form>")
        .concat("												</div>")
        .concat('												<div id="lc_chatOnline" style="display:none;">')
        .concat(
          '													<form id="ChatFormOnline" validate=true name="ChatFormOnline" class="pad-15 imp ChatForm" >'
        )
        .concat('														<div class="lc-body-inner">')
        .concat('															<div class="form-group">')
        .concat("																<label> Name </label>")
        .concat(
          '																<input type="text" name="name" class="form-control Alphabet" maxlength="40" pattern="^[a-zA-Z ]{3,40}" data-error="Please enter a valid name" required>'
        )
        .concat("																</div>")
        .concat('																<div class="form-group">')
        .concat("																	<label> Mobile Number </label>")
        .concat(
          '																	<input type="text" id="mobileNumber" name="mobileNumber" maxlength="12" class="form-control Number" pattern="[0-9\\(\\)\\-\\+ ]{11,12}" required  data-error="Please indicate country code “6” followed by Mobile Number e.g. 6018xxxxxx"                               >'
        )
        .concat("																	</div>")
        .concat('																	<div class="form-group">')
        .concat('																		<label class="mandatory"> Email </label>')
        .concat(
          '																		<input type="text" name="email" class="form-control" maxlength="50" data-error="Please enter a valid email" required>'
        )
        .concat("																		</div>")
        .concat('																		<div class="agree">')
        .concat(
          "																			<span>                               Your personal data is collected and used for                               Customer Support purposes only. Full policy available                               at "
        )
        .concat("																				")
        .concat(
          '																				<a href="www.mtradeasia.com/main/privacy-policy" target="_blank"> www.mtradeasia.com/main/privacy-policy/</a>'
        )
        .concat("																			</span>")
        .concat('																			<div class="agree-checkbox">')
        .concat(
          '																				<input class="styled-checkbox" id="Aggree1" type="checkbox" value="value1" data-error="Please agree to continue" required>'
        )
        .concat('																					<label for="Aggree1">Agree</label>')
        .concat("																				</div>")
        .concat("																			</div>")
        .concat("																			<!--end agree-->")
        .concat("																		</div>")
        .concat(
          '																		<input type="submit" class="btn-block btn btn-submit" name="" id="lc_onlineSubmit" value="Start Chat">'
        )
        .concat("																		</form>")
        .concat("																	</div>")
        .concat(
          '																	<div class="pad-b84" id="lc_conversation" style="display:none">'
        )
        .concat('																		<div class="notic" id="announcementBanner"></div>')
        .concat(
          '<div class="errorMessage hide"> Error Message goes here.</div>'
        )
        .concat('																		<div class="lc-body-inner" id="lc_conversationDiv">')
        .concat(
          '																			<!--<div class="chat-starte" id="lc_startChat">Chat Started 5.00 PM on 11/3/2019</div>-->'
        )
        .concat("																			<!--end message send-->")
        .concat('																			<div class="typying" id="lc_typing" style="display:none">')
        .concat('																				<div class="typ-wrap">')
        .concat('																					<div class="typing_loader"></div>')
        .concat("																				</div>")
        .concat("																			</div>")
        .concat(
          '																			<div class="chat-ended" id="lc_endChat" style="display:none"> Chat has been mark  done .</div>'
        )
        .concat('																			<div class="rate-us" id="lc_rateDiv" style="display:none;">')
        .concat("																				<h3>Rate this chat</h3>")
        .concat('																				<div class="rating-stars text-center">')
        .concat('																					<ul id="stars">')
        .concat('																						<li class="star" title="Poor" data-value="1">')
        .concat('																							<i class="fa fa-star fa-fw"></i>')
        .concat("																						</li>")
        .concat('																						<li class="star" title="Fair" data-value="2">')
        .concat('																							<i class="fa fa-star fa-fw"></i>')
        .concat("																						</li>")
        .concat('																						<li class="star" title="Good" data-value="3">')
        .concat('																							<i class="fa fa-star fa-fw"></i>')
        .concat("																						</li>")
        .concat('																						<li class="star" title="Excellent" data-value="4">')
        .concat('																							<i class="fa fa-star fa-fw"></i>')
        .concat("																						</li>")
        .concat('																						<li class="star" title="WOW!!!" data-value="5">')
        .concat('																							<i class="fa fa-star fa-fw"></i>')
        .concat("																						</li>")
        .concat("																					</ul>")
        .concat(
          '																					<a href="JavaScript:void(0);" id="rateIt" class="rate-it btn">Rate</a>'
        )
        .concat("																				</div>")
        .concat("																			</div>")
        .concat("																		</div>")
        .concat("																		<!--lc-bod-inner- end -->")
        .concat('																		<div class="chat-input" id="chatInput">')
        .concat('																			<div class="textarea">')
        .concat(
          '																				<textarea id="chatTextArea" name="message" placeholder="Type a message here" class="form-control" rows="1"></textarea>'
        )
        .concat("																				</div>")
        .concat('																				<div class="right-area">')

        .concat('																					<i class="emojipicker far fa-surprise"></i>')
        // .concat(
        //   '																				    <input type="file" id="sendAttachment" style="display:none" class="right-area">'
        // )
        // .concat(
        //   '																					<a href="javascript:void(0)" id="sendAttachmentLink" class="attachment-link" >'
        // )
        // .concat("																						<svg")
        // .concat(
        //   '																							xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 283.424 323.914">'
        // )
        // .concat(
        //   '																							<path id="paperclip-solid" d="M27.359,294.9c-36.965-38.141-36.276-99.648.877-137.651l132.7-135.74a70.8,70.8,0,0,1,101.647,0,73.644,73.644,0,0,1,0,102.663L146.909,242.383a47.2,47.2,0,0,1-68.314-.631c-17.888-18.96-17.314-49.013.919-67.663l90.938-92.894a10.123,10.123,0,0,1,14.314-.152L199.228,95.2a10.122,10.122,0,0,1,.152,14.314L108.452,202.4c-3.12,3.192-3.313,8.5-.41,11.572a6.743,6.743,0,0,0,9.925.1L233.645,95.866a33.137,33.137,0,0,0-.007-46.055,30.342,30.342,0,0,0-43.75,0l-132.7,135.74c-21.993,22.5-22.332,58.912-.753,81.176a53.954,53.954,0,0,0,77.852.181L243.135,155.564a10.122,10.122,0,0,1,14.314-.162l14.473,14.148a10.122,10.122,0,0,1,.162,14.314L163.232,295.208A94.4,94.4,0,0,1,27.359,294.9Z" transform="translate(0 0)" fill="#be2632"/>'
        // )
        // .concat("																						</svg>")
        // .concat("																					</a>")
        .concat('<button class="btn-send" id="lc_sendMsgButton">Send</button>')
        .concat("																				</div>")
        .concat("																			</div>")
        .concat("																		</div>")
        .concat("																		<!--pad-b84-->")
        .concat("																		<!--end Conversation-->")
        .concat("																	</div>")
        .concat("																	<!--end lc-body-->")
        .concat("																</div>")
        .concat('																<div class="chat-icon">')
        .concat(
          '																	<div class="chat-badge bounce" id="lc_chatBadge" style="display:none"></div>'
        )
        .concat('																	<a href="JavaScript:void(0);" id="chatIcon">')
        .concat('																		<img src="')
        .concat(settings.socketUrl, '/images/chaticon.svg">')
        .concat("																		</a>")
        .concat("																	</div>")
        .concat("																</div>");
      $chatboxWindow = $(data);
      $chatboxWindow.appendTo(_container);
    };

    var hmrShowPage = function hmrShowPage(page) {
      var options =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // var $header=$('#'+options.header);
      if (typeof page === "string" && page) {
        page = $("#" + page);
      }

      lcAllPages.forEach(function (_page) {
        if (_page.is(page)) {
          _page.show();

          setActivePage(_page[0].id);
        } else {
          _page.hide();
        }
      });

      if (page && page.is($lcConversation)) {
        loadHistory(); //before
        // if (getChatEndTime()) {
        //     var enddate = new Date(getChatEndTime());
        //     $lcEndChatLabel.text(`Chat Ended ${formatAMPM(enddate)} on ${formatDate(enddate)}`);
        //     $lcEndChatLabel.show();
        // }
        // else {
        //     $lcEndChatLabel.hide();
        // }
        // if (getChatStartTime()) {
        //     var startdate = new Date(getChatStartTime());
        //     $lcStartChatLabel.text(`Chat started ${formatAMPM(startdate)} on ${formatDate(startdate)}`)
        // }
        // else {
        //     $lcStartChatLabel.hide();
        // }
        //end
      }

      if (page && page.is($lcSuccessPage))
        setTimeout(function () {
          if (settings.mobileNumber || settings.email) {
            resetAuthorizedChatBox();
          } else resetChatBox();
        }, 3000);
      $(".lc-header").hide();
      $("#" + getHeaderByPage(page ? page[0].id : "")).show();
      //  heightCal();
    };

    var lcHandlePrechatSubmit = function lcHandlePrechatSubmit(e) {
      e.preventDefault();
      var $form = $(e.target);
      var name = $form.find("input[name=name]").val();
      var mobileNumber = $form.find("input[name=mobileNumber]").val();
      var email = $form.find("input[name=email]").val();
      socket.emit(applicationconstants.chatactions.ADDUSER, {
        isNewUser: true,
        name: name,
        email: email,
        mobileNumber: mobileNumber,
        departmentCode: settings.departmentCode,
        channelCode: settings.channelCode
      });
    };

    var lcHandleOfflineSubmit = function lcHandleOfflineSubmit(e) {
      e.preventDefault();
      var $form = $(e.target);
      var name = $form.find("input[name=name1]").val();
      var mobileNumber = $form.find("input[name=mobileNumber1]").val();
      var email = $form.find("input[name=email1]").val();
      var message = $form.find("textarea[name=offlineMessage]").val();
      socket.emit(applicationconstants.chatactions.OFFLINEDATASUBMITTED, {
        customerName: name,
        customerEmail: email,
        customerMobileNumber: mobileNumber,
        message: message,
        departmentCode: settings.departmentCode
      });
    };

    var cleanInput = function cleanInput(input) {
      var stringToReturn = input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/"/g, "&quot;");
      return stringToReturn;
    };

    function maskCardNumber(inputtxt) {
      var cardnoamex = /(?:3[47][0-9]{13})/gim;
        var cardnovisa = /(?:4[0-9]{12}(?:[0-9]{3})?)/gim;
        var cardnomaster = /(?:5[1-5][0-9]{14})/gim;
        var cardnodiscover = /(?:6(?:011|5[0-9][0-9])[0-9]{12})/gim;
        var cardnodiner = /(?:3(?:0[0-5]|[68][0-9])[0-9]{11})/gim;
      if (inputtxt.match(cardnoamex)) {
        var data = inputtxt.replace(
          cardnoamex, function (match) {
            return maskdata(match);
          })

        return data;
      }
      if (inputtxt.match(cardnovisa)) {
        var data = inputtxt.replace(
          cardnovisa, function (match) {
            return maskdata(match);
          })

        return data;


      }
      if (inputtxt.match(cardnomaster)) {
        var data = inputtxt.replace(
          cardnovisa, function (match) {
            return maskdata(match);
          })

        return data;
      }
      if (inputtxt.match(cardnodiscover)) {
         var data = inputtxt.replace(
          cardnodiscover, function (match) {
            return maskdata(match);
          })

        return data;
      }
      if (inputtxt.match(cardnodiner)) {
        var data = inputtxt.replace(
          cardnodiner, function (match) {
            return maskdata(match);
          })

        return data;
      }
      return inputtxt

    }
    function maskdata(data) {
      var maskregex = /(\d{4}).*(\d{4})/;
      return data.replace(maskregex, "$1********$2");
    }


    var formattedUrlContent = function (content) {
      var exp_match = /(\b(https?|):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
      var element_content = content.replace(
        exp_match,
        "<a target='_blank' href='$1'>$1</a>"
      );
      var new_exp_match = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      var new_content = element_content.replace(
        new_exp_match,
        '$1<a target="_blank" href="http://$2">$2</a>'
      );
     // return maskCardNumber(new_content);
      return new_content;

      // var rgx = new RegExp('^(http|https)://.*$');
      // if(!rgx.test(message))
      //     return message;

      // if(validURL(message))
      // message= '<a'+' href='+'"'+message+'" target="_blank" >'+message+'</a>';
      // return message;
    };

    var addChatHistory = function addChatHistory(
      chatmsg,
      timestamp,
      isAgent,
      isInAppMessage,
      isFile,
      originalFileName
    ) {
      var chatSession = sessionStorage.getItem(
        sessionStorage.getItem("customerSessionId")
      );
      var currentMessage = {
        message: chatmsg,
        timestamp: timestamp,
        isAgent: isAgent,
        isInAppMessage: isInAppMessage,
        isFile: isFile ? isFile : false,
        originalFileName: originalFileName ? originalFileName : ""
      };

      if (chatSession) {
        var existingSessionObject = JSON.parse(chatSession);
        existingSessionObject.push(currentMessage);
        sessionStorage.setItem(
          sessionStorage.getItem("customerSessionId"),
          JSON.stringify(existingSessionObject)
        );
        return;
      }

      sessionStorage.setItem(
        sessionStorage.getItem("customerSessionId"),
        JSON.stringify([currentMessage])
      );
    };

    var getChatHistory = function getChatHistory() {
      var chatHistory = sessionStorage.getItem(
        sessionStorage.getItem("customerSessionId")
      );
      if (chatHistory)
        return _.sortBy(JSON.parse(chatHistory), function (x) {
          return x.timestamp;
        });
      return [];
    };

    var lcSendMessage = function lcSendMessage(e) {
      e.preventDefault();
      var message = $lcInputMessage.val();
      message = cleanInput(message);

      if (message) {
        message=maskCardNumber(message);
        var encryptedMessage = chatEncryptor.encrypt(message);
        $lcInputMessage.val("").focus();
        //$lcInputMessage.html('')
        $(".emojionearea-editor").empty();
        var time = new Date(); // tell server to execute 'new message' and send along one parameter

        socket.emit(applicationconstants.chatactions.CHATMESSAGE, {
          customerSessionId: sessionStorage.getItem("customerSessionId"),
          isAgent: false,
          message: encryptedMessage,
          messageId:
            sessionStorage.getItem("customerSessionId") +
            new Date(getFormattedUtcDate(time)).getTime(),
          timestamp: getFormattedUtcDate(time)
        });
        var div = '\n                  <div class="msg">\n                  <div class="inner-msg send">\n                     <p>'
          .concat(
            formattedUrlContent(message),
            '\n                     </p>\n                     <div class="seened">\n                     '
          )
          .concat(
            formatAMPM(time),
            "\n                     </div>\n                  </div>\n               </div>\n                  "
          ); //$('#lc_conversationDiv').append(message);

        $(div).insertBefore($lcTyping);
        $("#lc_conversationDiv").scrollTop(
          $("#lc_conversationDiv")[0].scrollHeight
        );
        addChatHistory(encryptedMessage, time, false, false);
      }
    };

    var _container = this.first();

    _init();

    setTimeout(function () { }, 300); //  addMessages({ isAgent: true, message: "how can i help u", timestamp: new Date() });
    // $('#lc_conversationDiv').scrollTop = $('.lc-body-inner').scrollHeight;
  };
})(jQuery);
