/* ============================================================
   SITE ANNOUNCEMENT BANNER
   Edit the text below to change the announcement on EVERY page.
   Set ANNOUNCEMENT_ENABLED to false to turn the banner off
   everywhere, or true to turn it back on. That's it.
   ============================================================ */
var ANNOUNCEMENT_ENABLED = true;
var ANNOUNCEMENT_TEXT = "The ONLY Real Nife Site";
/* ============================================================ */

(function(){
  function init(){
    if (!ANNOUNCEMENT_ENABLED) return;

    var bar = document.createElement("div");
    bar.id = "site-announcement";

    var inner = document.createElement("div");
    inner.className = "announcement-inner";
    inner.textContent = ANNOUNCEMENT_TEXT;
    bar.appendChild(inner);

    document.body.insertBefore(bar, document.body.firstChild);

    function setHeight(){
      var h = bar.offsetHeight;
      document.documentElement.style.setProperty("--banner-h", h + "px");
    }
    setHeight();
    window.addEventListener("resize", setHeight);
  }

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
