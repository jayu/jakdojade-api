CryptoJS = require("crypto-js");

var angular = {
  isArray : (arr) => {return arr.constructor && arr.constructor == Array}
}

aaa = function(e, t, n, i, o) {
return function(t) {
  var r = n.getApiDomain(), //
    a = t.url;
  if (r === a.substring(0, r.length)) {
    var s = ["/profiles/v1/device-info", "/profiles/v1/check-user-free", "/profiles/v1/register-anonymous", "/profiles/v1/register", "/profiles/v1/login-anonymous", "/profiles/v1/login", "/profiles/v1/login-social"],
      l = e.proposedLanguage() || e.use();
    if (l = "pl" === l.toLowerCase() ? "pl" : "en",
      t.headers["X-jd-param-locale"] = l,
      t.headers["X-jd-param-appV"] = "web",
      function(e) {
        for (var t in s)
          if (-1 !== a.indexOf(s[t]) && (a.indexOf(s[t]) + s[t].length === a.length || a.indexOf(s[t]) + s[t].length === a.indexOf("?")))
            return !0;
        return !1
      }())
      return t.headers["X-jd-param-user-device-id"] = i.getDeviceId(),
        t.headers.Accept = "application/json",
        t;
    var c = function(e) {
        return CryptoJS.enc.Base64.stringify(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
      },
      u = function(e) {
        var n = e.profileLogin,
          o = e.passwordHash; -
        1 !== t.url.indexOf("/api/test/molbas-security") && (n = "oAuthTest",
          o = "00a24342342412d123123213123");
        var r, s, l, u, d, p, h = (s = -1 !== (r = a).indexOf("?"),
            l = r.indexOf("/", r.indexOf("//") + 2),
            r.substring(l, s ? r.indexOf("?") : r.length).toLowerCase()),
          f = Math.floor((new Date).getTime() / 1e3),
          m = t.data ? c(CryptoJS.MD5(t.transformRequest[0](t.data))) : "",
          g = (t.params ? t.paramSerializer(t.params) : "").split("&"),
          v = (d = function(e) {
              return -1 === e.indexOf("?") ? "" : e.slice(e.indexOf("?") + 1).split("&")
            }(a),
            p = [],
            (u = g) && angular.isArray(u) && u.length && u[0] && (p = p.concat(u)),
            d && angular.isArray(d) && d.length && d[0] && (p = p.concat(d)),
            p.join("&").replace(/:/g, "%3A").replace(/\%20/g, "+").replace(/ /g, "+").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/'/g, "%27").replace(/,/g, "%2C").replace(/;/g, "%3B").split("&").sort().join("&")),
          y = "" === v ? "" : c(CryptoJS.MD5(v)),
          b = c(CryptoJS.HmacSHA512(h + "_" + f + "_" + n + "_" + m + "_" + y, o));
        return t.headers["X-jd-timestamp"] = f,
          t.headers["X-jd-sign"] = b,
          t.headers["X-jd-param-profile-login"] = n,
          t.headers["X-jd-security-version"] = "2",
          t.headers["X-jd-param-user-device-id"] = i.getDeviceId(),
          t.headers.Accept = "application/json",
          t
      };
    if (-1 !== a.indexOf("/api/profiles/v1/profile-data") && -1 === a.indexOf("/profiles/v1/profile-data/")) {
      var d = i.getUserProfile();
      return u({
        profileLogin: d.profileLogin,
        passwordHash: d.passwordHash
      })
    }
    return o.getValidatedUserAuthDataPromise().then(function(e) {
      return u(e)
    })
  }
  return t
}}

module.exports = {
  getHeaders : (url, userProfile, device_id) => {
    var e = { proposedLanguage : () => ("pl")}
    var t = undefined
    var n = {getApiDomain : () => ('https://jakdojade.pl')}
    var i = {
      getDeviceId : () => (device_id)
    }
    var o = {
      getValidatedUserAuthDataPromise : () => {
        return new Promise((resolve, reject) => {
          resolve({
                profileLogin: userProfile.profileLogin,
                passwordHash: userProfile.passwordHash
              })
        })
            
      }
    }
    return new Promise((resolve,reject) => {
      aaa(e,t,n,i,o)({
        url,
        headers : {}
      }).then((reqWithHeaders) => {
        resolve(reqWithHeaders.headers)
      })
    })
  }
}