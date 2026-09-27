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