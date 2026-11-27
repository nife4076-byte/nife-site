/* ============================================================
   VIEW COUNTS (shorts and longform)

   Numbers come from views-data.json, which a GitHub Action
   refreshes every few hours. No API key lives on the website,
   so there is nothing secret in your public files.

   You can also type a count by hand below, like "3.8M".
   A number typed here always wins over the automatic one.
   ============================================================ */
var MANUAL_VIEWS = {
  "hiKMn2zfEFA": "",
  "2lVkqseoLQs": "",
  "-hMCpVlxNFc": "",
  "sIEMs2KGF84": "",
  "KJZdlSHFOkg": "",
  "Ngb9JqwMZIQ": "",
  "2viQc4sjkro": "",
  "Qk2QBPuriD0": "",
  "ADNbYD4lUkk": "",
  "TMt3pJsGGGA": ""
};
/* ============================================================ */

(function(){
  var counts = {};

  function fmt(n){
    n = Number(n);
    if (!isFinite(n) || n < 0) return "";
    if (n >= 1e9) return (Math.floor(n / 1e8) / 10) + "B";
    if (n >= 1e6) return (Math.floor(n / 1e5) / 10) + "M";
    if (n >= 1e3) return (Math.floor(n / 1e2) / 10) + "K";
    return String(n);
  }

  function apply(){
    document.querySelectorAll("[data-views-id]").forEach(function(el){
      var id = el.getAttribute("data-views-id");
      var val = MANUAL_VIEWS[id] || (counts[id] ? fmt(counts[id]) : "");
      if (val){
        el.textContent = val + (el.getAttribute("data-suffix") || "");
      }
    });
  }
  window.refreshViewPills = apply;

  function init(){
    apply();
    fetch("/views-data.json", { cache: "no-cache" })
      .then(function(r){ return r.ok ? r.json() : null; })
      .then(function(data){
        if (data && data.views){
          counts = data.views;
          apply();
        }
      })
      .catch(function(){});
  }

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
