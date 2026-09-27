
/* Williams III universal master mark */
document.querySelectorAll('img[src*="master.svg"]').forEach(function(img){
  var src=img.getAttribute("src")||"";
  img.setAttribute("src",src.replace("master.svg","williams iii master mark.png"));
  img.setAttribute("alt","Williams III");
});
document.querySelectorAll("[data-year]").forEach(function(e){e.textContent=new Date().getFullYear();});
document.querySelectorAll("[data-timeline]").forEach(function(root){
  var buttons=Array.from(root.querySelectorAll("[data-tab]"));
  var panes=Array.from(root.querySelectorAll("[data-pane]"));
  var current=Math.max(0,buttons.findIndex(function(b){return b.classList.contains("active");}));
  function show(index){
    current=(index+buttons.length)%buttons.length;
    buttons.forEach(function(b,i){b.classList.toggle("active",i===current);b.setAttribute("aria-selected",i===current?"true":"false");});
    panes.forEach(function(p,i){p.classList.toggle("active",i===current);});
  }
  buttons.forEach(function(btn,i){btn.addEventListener("click",function(){show(i);});});
  var prev=root.querySelector("[data-timeline-prev]");
  var next=root.querySelector("[data-timeline-next]");
  if(prev)prev.addEventListener("click",function(){show(current-1);});
  if(next)next.addEventListener("click",function(){show(current+1);});
  show(current);
});
(function(){
  var menu=document.querySelector(".rail .menu");
  if(!menu)return;
  menu.setAttribute("href","#");
  menu.setAttribute("aria-haspopup","dialog");
  menu.setAttribute("aria-expanded","false");
  var overlay=document.createElement("div");
  overlay.className="explore-overlay";
  overlay.setAttribute("role","dialog");
  overlay.setAttribute("aria-modal","true");
  overlay.setAttribute("aria-label","Explore Williams III");
  overlay.innerHTML='<button class="explore-close" type="button">Menu</button><div class="explore-inner"><nav class="explore-primary"><a href="../../">Williams III</a><a href="../../family-office/">Family Office</a><a href="../../family-holdings/">Family Holdings</a><a href="../../companies/">Companies</a></nav><nav class="explore-secondary"><a href="../../story/">Our Story</a><a href="../../leadership/">Leadership</a><a href="../../principles/">Principles</a><a href="../../digital-estate/">Digital Estate</a><a href="../../contact/">Contact</a><a href="../../private-access/">Private Access</a></nav></div>';
  document.body.appendChild(overlay);
  function normalizeLinks(){
    var depth=location.pathname.split("/").filter(Boolean).length;
    var base=depth>=2?"../../":depth===1?"../":"";
    overlay.querySelectorAll("a").forEach(function(a){var href=a.getAttribute("href");a.setAttribute("href",href.replace("../../",base));});
  }
  normalizeLinks();
  var close=overlay.querySelector(".explore-close");
  function openMenu(){overlay.classList.add("open");document.body.classList.add("menu-open");menu.setAttribute("aria-expanded","true");close.focus();}
  function closeMenu(){overlay.classList.remove("open");document.body.classList.remove("menu-open");menu.setAttribute("aria-expanded","false");menu.focus();}
  menu.addEventListener("click",function(e){e.preventDefault();openMenu();});
  close.addEventListener("click",closeMenu);
  overlay.addEventListener("click",function(e){if(e.target===overlay)closeMenu();});
  document.addEventListener("keydown",function(e){if(e.key==="Escape"&&overlay.classList.contains("open"))closeMenu();});
})();