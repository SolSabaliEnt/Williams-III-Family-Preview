
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
  overlay.innerHTML='<div class="explore-inner"><nav class="explore-primary"><a href="../../">Williams III</a><a href="../../family-office/">Family Office</a><a href="../../family-holdings/">Family Holdings</a><a href="../../companies/">Companies</a></nav><nav class="explore-secondary"><a href="../../story/">Our Story</a><a href="../../leadership/">Leadership</a><a href="../../principles/">Principles</a><a href="../../digital-estate/">Digital Estate</a><a href="../../contact/">Contact</a><a href="../../private-access/">Private Access</a></nav></div>';
  document.body.appendChild(overlay);

  function normalizeLinks(){
    var depth=location.pathname.split("/").filter(Boolean).length;
    var base=depth>=2?"../../":depth===1?"../":"";
    overlay.querySelectorAll("a").forEach(function(a){
      var href=a.getAttribute("href");
      a.setAttribute("href",href.replace("../../",base));
    });
  }
  normalizeLinks();

  function setOpen(open){
    overlay.classList.toggle("open",open);
    document.body.classList.toggle("menu-open",open);
    menu.setAttribute("aria-expanded",open?"true":"false");
    menu.classList.toggle("is-open",open);
  }

  menu.addEventListener("click",function(e){
    e.preventDefault();
    setOpen(!overlay.classList.contains("open"));
  });

  overlay.addEventListener("click",function(e){
    if(e.target===overlay)setOpen(false);
  });

  document.addEventListener("keydown",function(e){
    if(e.key==="Escape"&&overlay.classList.contains("open")){
      setOpen(false);
      menu.focus();
    }
  });
})();

/* Company-to-company continuation */
(function(){
  var match=location.pathname.match(/\/companies\/([^/]+)\/?$/);
  if(!match)return;

  var order=[
    {slug:"covre",name:"Covre",relation:"Family Office · Family Owned"},
    {slug:"pleiotaxy",name:"Pleiotaxy",relation:"Family Office · Family Owned"},
    {slug:"maatra",name:"Maatra",relation:"Family Office · Family Owned"},
    {slug:"re-continuity",name:"re:continuity",relation:"Family Office · Family Owned"},
    {slug:"lot",name:"LOT",relation:"Family Office · Family Owned"},
    {slug:"relayed",name:"Relayed",relation:"Family Office · Family Owned"},
    {slug:"cleanr",name:"Cleanr",relation:"Family Holdings · Portfolio Interest"},
    {slug:"docc",name:"DOCC",relation:"Family Holdings · Portfolio Interest"},
    {slug:"mtc",name:"MTC",relation:"Family Holdings · Portfolio Interest"},
    {slug:"re-eat",name:"Re:Eat",relation:"Family Holdings · Portfolio Interest"}
  ];

  var current=order.findIndex(function(item){return item.slug===match[1];});
  if(current<0)return;

  var next=order[(current+1)%order.length];
  var footer=document.querySelector(".footer");
  if(!footer || document.querySelector(".company-continuation"))return;

  var section=document.createElement("section");
  section.className="company-continuation";
  section.setAttribute("aria-label","Continue through Williams III companies");
  section.innerHTML=
    '<div class="company-continuation-grid">'+
      '<div>'+
        '<div class="eyebrow">Continue through the portfolio</div>'+
        '<h3>'+next.name+'</h3>'+
        '<p>'+next.relation+' · View the next company and its relationship to the Williams III enterprise.</p>'+
      '</div>'+
      '<div class="company-continuation-actions">'+
        '<a class="company-all-link" href="../">All companies</a>'+
        '<a class="company-next-link" href="../'+next.slug+'/">Next company <span class="arrow" aria-hidden="true">→</span></a>'+
      '</div>'+
    '</div>';

  footer.parentNode.insertBefore(section,footer);
})();
