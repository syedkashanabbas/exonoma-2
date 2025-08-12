var rtl_flag = !1,
  dark_flag = !1;

// Always load dark theme
function layout_change_default() {
  let t = "dark";
  layout_change(t);
  var e = document.querySelector('.theme-layout .btn[data-value="default"]');
  e && e.classList.add("active");
}

function layout_rtl_change(e) {
  var t,
    a,
    r = document.getElementsByTagName("html")[0],
    r =
      ("true" === e
        ? ((rtl_flag = !0),
          r.setAttribute("data-pc-direction", "rtl"),
          r.setAttribute("dir", "rtl"),
          r.setAttribute("lang", "ar"),
          (t = document.querySelector(".theme-direction .btn.active")) &&
            t.classList.remove("active"),
          (a = document.querySelector(
            ".theme-direction .btn[data-value='true']"
          )) && a.classList.add("active"))
        : ((rtl_flag = !1),
          r.setAttribute("data-pc-direction", "ltr"),
          r.setAttribute("dir", "ltr"),
          r.removeAttribute("lang"),
          (t = document.querySelector(".theme-direction .btn.active")) &&
            t.classList.remove("active"),
          (a = document.querySelector(
            ".theme-direction .btn[data-value='false']"
          )) && a.classList.add("active")),
      document.getElementById("theme-setup-rtl"));
  r && (r.checked = "true" === e);
}

function layout_change(e) {
  document.getElementsByTagName("html")[0].setAttribute("data-pc-theme", e);
  var e = "dark" === e,
    t = ((dark_flag = e), document.documentElement.classList),
    t = Array.from(t).filter((e) => e.startsWith("preset-")),
    t =
      (document.documentElement.classList.remove(t[0]),
      t[0].endsWith("-dark") && (t[0] = t[0].replace(/-dark$/, "")),
      e ? t[0] + "-dark" : t[0]),
    t =
      (document.documentElement.classList.add(t),
      document.getElementById("theme-setup-dark"));
  t && (t.checked = e);
}

function reloadAllIframes() {
  document.querySelectorAll("iframe").forEach(function (e) {
    e.contentWindow.location.reload();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Force dark mode on first load
  layout_change("dark");

  // Restore saved RTL setting if exists
  if ("undefined" != typeof Storage) {
    var e = JSON.parse(localStorage.getItem("theme_config"));
    if (e && e.rtl) layout_rtl_change(e.rtl);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var e = document.querySelector("#layoutreset"),
    e =
      (e &&
        e.addEventListener("click", function () {
          localStorage.clear();
          localStorage.setItem(
            "theme_config",
            JSON.stringify({ dark: "true", rtl: "false", preset: "ai" })
          );
          location.reload();
        }),
      (e, t) => {
        e.addEventListener("change", () => t(e.checked));
      }),
    t = document.getElementById("theme-setup-dark"),
    a = document.getElementById("theme-setup-rtl");

  // Dark mode toggle (keeps storage in sync)
  t &&
    e(t, (e) => {
      var t;
      layout_change(e ? "dark" : "light"),
        null === localStorage.getItem("theme_config")
          ? (t = { dark: e ? "true" : "false", rtl: "false" })
          : ((t = JSON.parse(localStorage.getItem("theme_config"))).dark = e
              ? "true"
              : "false"),
        localStorage.setItem("theme_config", JSON.stringify(t)),
        reloadAllIframes();
    });

  // RTL toggle
  a &&
    e(a, (e) => {
      var t;
      layout_rtl_change(e ? "true" : "false"),
        null === localStorage.getItem("theme_config")
          ? (t = { dark: "true", rtl: e ? "true" : "false" })
          : ((t = JSON.parse(localStorage.getItem("theme_config"))).rtl = e
              ? "true"
              : "false"),
        localStorage.setItem("theme_config", JSON.stringify(t)),
        reloadAllIframes();
    });
});
