import { createRequire } from 'module';const require = createRequire(import.meta.url);

// node_modules/@progress/kendo-licensing/dist/index.mjs
var e;
!(function(e2) {
  e2.BLAZOR = "BLAZOR", e2.DPL = "DPL", e2.JM = "JM", e2.KENDOUIANGULAR = "KENDOUIANGULAR", e2.KENDOUICOMPLETE = "KENDOUICOMPLETE", e2.KENDOUIMVC = "KENDOUIMVC", e2.KENDOUIREACT = "KENDOUIREACT", e2.KENDOUIVUE = "KENDOUIVUE", e2.MAUI = "MAUI", e2.RCAJAX = "RCAJAX", e2.RCWF = "RCWF", e2.RCWPF = "RCWPF", e2.REPORTING = "REPORTING", e2.REPORTSERVER = "REPORTSERVER", e2.UIASPCORE = "UIASPCORE", e2.UIXAM = "UIXAM", e2.WINUI = "WINUI";
})(e || (e = {})), Object.freeze({ [e.BLAZOR]: "Telerik UI for Blazor", [e.DPL]: "Telerik Document Processing", [e.JM]: "Telerik JustMock", [e.KENDOUIANGULAR]: "Kendo UI for Angular", [e.KENDOUICOMPLETE]: "Kendo UI for jQuery", [e.KENDOUIMVC]: "Telerik UI for ASP.NET MVC", [e.KENDOUIREACT]: "KendoReact", [e.KENDOUIVUE]: "Kendo UI for Vue", [e.MAUI]: "Telerik UI for .NET MAUI", [e.RCAJAX]: "Telerik UI for ASP.NET AJAX", [e.RCWF]: "Telerik UI for WinForms", [e.RCWPF]: "Telerik UI for WPF", [e.REPORTING]: "Telerik Reporting", [e.REPORTSERVER]: "Telerik Report Server", [e.UIASPCORE]: "Telerik UI for ASP.NET Core", [e.UIXAM]: "Telerik UI for Xamarin", [e.WINUI]: "Telerik UI for WinUI" });
function t(e2) {
  return Math.floor(e2.getTime() / 1e3);
}
function n(e2, n2) {
  const r2 = new Date(1e3 * e2);
  return r2.setDate(r2.getDate() + n2), t(r2);
}
function r() {
  return t(/* @__PURE__ */ new Date());
}
function i(e2) {
  const t2 = (function(e3) {
    if ("function" == typeof atob) return atob(e3);
    if ("function" == typeof Buffer) return Buffer.from(e3, "base64").toString("utf8");
    throw new Error("atob is undefined");
  })(e2), n2 = new Uint8Array(t2.length);
  for (let e3 = 0; e3 < t2.length; e3++) n2[e3] = t2.charCodeAt(e3);
  return n2;
}
function o(e2) {
  return i(e2.replace(/-/g, "+").replace(/_/g, "/"));
}
function s(e2) {
  return new Date(1e3 * e2);
}
function c(e2, t2) {
  const n2 = s(t2);
  return e2 > new Date(n2.getFullYear(), n2.getMonth(), n2.getDate() + 1).getTime() / 1e3;
}
function a(e2, t2) {
  let i2 = [];
  return e2.licenses?.length > 0 ? i2 = e2.licenses.map((e3) => (function(e4) {
    const t3 = e4.split(".")[1], n2 = String.fromCharCode(...o(t3));
    return JSON.parse(n2);
  })(e3)) : e2.products?.length > 0 && (i2 = e2.products.map((t3) => ({ type: t3.trial ? "trial" : "perpetual", code: t3.code, expiration: t3.licenseExpirationDate, licenseId: null, userId: e2.userId }))), (function(e3, t3) {
    const i3 = t3.filter((e4) => "usage" !== e4.type).filter((t4) => e3.productCode === t4.code || e3.redistributedBy?.includes(t4.code) || e3.productCodes?.includes(t4.code)).sort((e4, t4) => t4.expiration - e4.expiration);
    return i3.find((e4) => "subscription" === e4.type && !c(r(), e4.expiration)) || i3.find((t4) => "perpetual" === t4.type && !c(e3.publishDate, t4.expiration)) || i3.find((e4) => "subscription" === e4.type && !c(n(r(), 10), e4.expiration)) || i3.find((e4) => "trial" === e4.type && !c(r(), e4.expiration)) || i3.find((e4) => "subscription" === e4.type) || i3.find((e4) => "perpetual" === e4.type) || i3.find((e4) => "trial" === e4.type);
  })(t2, i2);
}
var l = class {
  constructor(e2, t2, n2) {
    this.productName = e2, this.severity = "WARN", this.code = "TKL201", this.message = "No Telerik and Kendo UI License found.\n  To download a license key file, visit https://prgress.co/3PwQMKZ", this.notificationMessage = `License key missing for ${e2} v${t2}.  A license key is required for both paid and trial usage. Learn <a href="${n2}">how to set up a license key</a>.`;
  }
};
var u = class {
  constructor(e2, t2, n2) {
    this.productName = e2, this.severity = "WARN", this.code = "TKL202", this.message = `${e2} is not listed in your current license file.
  Learn more about ${e2} licensing at ${n2}`, this.notificationMessage = `No license found for ${e2} v${t2}.  Access to the latest updates and support requires a <a href="${n2}">valid license</a>.`;
  }
};
var p = class {
  constructor(e2, t2, n2) {
    this.productName = e2, this.severity = "WARN", this.code = "TKL203", this.message = `Your trial has expired ${n2} day(s) ago.
  Thank you for trying out ${e2}, we hope you enjoyed your trial period.
  To continue using our product, consider upgrading to a commercial license: https://prgress.co/3C9mr1M`, this.notificationMessage = `Your trial license for ${e2} v${t2} has expired ${n2} ago. To continue using our product, consider upgrading to a commercial license. Learn more about <a href="https://prgress.co/3PwQMdX">${e2} licensing</a>.`;
  }
};
var d = class {
  constructor(e2, t2, n2, r2, i2) {
    this.productName = e2, this.severity = "WARN", this.code = "TKL204";
    const o2 = n2 ? ` version ${n2}` : "";
    this.message = `Your current license has expired on ${t2.toLocaleDateString()} and is not valid for ${e2}${o2}. The product was published on ${r2.toLocaleDateString()}.
  Renew your license at https://prgress.co/3Px9m5F`, this.notificationMessage = `Your license is not valid for ${e2} v${n2}. To continue using the product, install a <a href="${i2}">valid license</a>. Renew <a href="https://prgress.co/3PwQNi1">your license</a> and download a new license key.`;
  }
};
var f = class {
  constructor(e2, t2) {
    this.productName = e2, this.severity = "INFO", this.message = `Your Trial license will expire in ${-t2} day(s).
  To acquire a commercial license, visit https://prgress.co/3PyHIoH`;
  }
};
async function h(e2, t2) {
  if ("object" != typeof crypto || "object" != typeof crypto.subtle || "function" != typeof TextEncoder || "function" != typeof TextDecoder) return;
  const n2 = crypto.subtle, [r2, s2, c2] = e2.split("."), a2 = o(c2), l2 = new TextEncoder(), u2 = new TextDecoder(), p2 = l2.encode(`${r2}.${s2}`), d2 = u2.decode(o(r2));
  if (!("Telerik License Evidence" === JSON.parse(d2).typ)) throw new Error("Unknown license evidence type");
  const f2 = await (function(e3) {
    const t3 = i(e3.replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").replace(/\n/gm, ""));
    return crypto.subtle.importKey("spki", t3, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, true, ["verify"]);
  })(t2);
  if (!await n2.verify(f2.algorithm, f2, a2, p2)) throw new Error("Invalid license evidence");
}
var g = { data: "  {}  " };
var I = /* @__PURE__ */ new Map();
var y = /* @__PURE__ */ new Set();
var U = true;
function E(e2) {
  const i2 = JSON.parse(g.data), o2 = !i2.scriptKey && !i2.timestamp, y2 = i2.scriptKey && "undefined" == typeof KendoLicensing;
  let m, E2, N2 = false;
  if (o2 || y2 || !((e3) => (e3.licenses?.length > 0 && Promise.all(e3.licenses?.map((e4) => h(e4, "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2mnUVMmkth2x+N/ODszG\nOFIYBL6NOO1XWRj1wkmecKuLziJDhFz0WQmyOjY34Ymg9pLuBA9QSWrrZuvPw40N\nm0X/GBmttFmPNvca3WmJ2oKM7PpLiUU9f7Ov5WeIXnx++ts/LC/OB7FtZ+LiRgJ7\n0mZnPeTogdFrASf0zSQJv4jmX840LPa6nomWeUgIVGPLLVI14Gib8Dl+nOckqCNc\nkAUUk4IBF67DufRt9zQyRxg99ysakvHX2SDbdGvIBdxWxvhhmrBoeix0uSVtG2gm\njdvSqlPJVdvMbk1Xe2+SUldJPrxH1VrTYeRUt4yqWxy16nFJUDj9exZ202X4THkU\nJQIDAQAB\n-----END PUBLIC KEY-----"))).then(() => {
    U = true;
  }).catch(() => {
    U = false, I.clear();
  }), U))(i2)) m = new l(e2.productName, e2.version, e2.licensingDocsUrl);
  else if (E2 = a(i2, e2), E2) {
    if ("trial" === E2.type) {
      const n2 = (function(e3) {
        const n3 = r() - t(e3);
        return Math.floor(n3 / 86400);
      })(s(E2.expiration));
      c(r(), E2.expiration) ? m = new p(e2.productName, e2.version, n2) : (m = new f(e2.productName, n2), N2 = true);
    } else if ("perpetual" === E2.type || "subscription" === E2.type) {
      let t2 = E2.expiration;
      "subscription" === E2.type && (t2 = n(t2, 10)), c(e2.publishDate, t2) ? m = new d(e2.productName, s(E2.expiration), e2.version, s(e2.publishDate), e2.licensingDocsUrl) : N2 = true;
    }
  } else m = new u(e2.productName, e2.version, e2.licensingDocsUrl);
  const A = E2, R = A?.expiration ? s(A.expiration) : void 0;
  return { isLicenseValid: N2, licenseType: E2?.type, licenseProductCode: A?.code, expiration: R, message: m };
}
function N(e2) {
  if (I.has(e2.name)) return I.get(e2.name);
  const { isLicenseValid: t2, message: n2 } = E(e2), r2 = ((e3) => e3.productCode || e3.productCodes[0])(e2);
  return n2 && !y.has(r2) && (!(function(e3, t3) {
    if ("object" == typeof console) {
      const r3 = `[${e3.severity}][Telerik and Kendo UI Licensing]` + (n3 ? ` ${n3}:` : "") + ` ${t3.productName}`, i2 = "function" == typeof console.group;
      i2 ? console.group(r3) : console.warn(r3), console.warn(e3.message), i2 && console.groupEnd();
    }
    var n3;
  })(n2, e2), y.add(r2)), I.set(e2.name, t2), t2;
}

export {
  E,
  N
};
//# sourceMappingURL=chunk-VH5GXH4Y.js.map
