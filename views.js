/* ============================================================
   VIEW COUNTS FOR SHORTS

   Automatic: paste a YouTube Data API key into YT_API_KEY and
   every short updates itself (cached for 6 hours).

   Manual: type a number into MANUAL_VIEWS, like "3.8M".
   A manual number always wins over the automatic one, and works
   even if you never set up an API key.
   ============================================================ */
var YT_API_KEY = "AIzaSyDolYxLiC5pwdngio2FaTresWbKwpsdSws";

var MANUAL_VIEWS = {
  "KJZdlSHFOkg": "",
  "Ngb9JqwMZIQ": "",
  "2viQc4sjkro": "",
  "Qk2QBPuriD0": "",
  "ADNbYD4lUkk": "",
  "TMt3pJsGGGA": ""
};
/* ============================================================ */

(function(){
  var CACHE_KEY = "nife_view_counts_v1";
  var CACHE_MS = 6 * 60 * 60 * 1000;
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

  function pageIds(){
    var seen = {};
    document.querySelectorAll("[data-views-id]").forEach(function(el){
      seen[el.getAttribute("data-views-id")] = true;
    });
    return Object.keys(seen);
  }

  function readCache(ids){
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (!obj || Date.now() - obj.t > CACHE_MS) return null;
      for (var i = 0; i < ids.length; i++){
        if (!(ids[i] in obj.d)) return null;
      }
      return obj.d;
    } catch (e) { return null; }
  }

  function writeCache(d){
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d: d }));
    } catch (e) {}
  }

  function init(){
    apply();
    if (!YT_API_KEY) return;

    var ids = pageIds();
    if (!ids.length) return;

    var cached = readCache(ids);
    if (cached){
      counts = cached;
      apply();
      return;
    }

    var url = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" +
              encodeURIComponent(ids.join(",")) + "&key=" + encodeURIComponent(YT_API_KEY);

    fetch(url)
      .then(function(r){ return r.json(); })
      .then(function(data){
        if (!data || !data.items) return;
        var d = {};
        data.items.forEach(function(item){
          if (item.statistics && item.statistics.viewCount){
            d[item.id] = item.statistics.viewCount;
          }
        });
        counts = d;
        writeCache(d);
        apply();
      })
      .catch(function(){});
  }

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
