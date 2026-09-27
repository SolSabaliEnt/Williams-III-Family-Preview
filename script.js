const companies=[
{name:"Covre",group:"Family Office",relationship:"Family Owned",sector:"Digital Venture"},
{name:"Pleiotaxy",group:"Family Office",relationship:"Family Owned",sector:"Technology"},
{name:"Maatra",group:"Family Office",relationship:"Family Owned",sector:"Digital Platform"},
{name:"re:continuity",group:"Family Office",relationship:"Family Owned",sector:"Infrastructure"},
{name:"LOT",group:"Family Office",relationship:"Family Owned",sector:"Application"},
{name:"Relayed",group:"Family Office",relationship:"Family Owned",sector:"Digital Venture"},
{name:"Cleanr",group:"Family Holdings",relationship:"Portfolio Interest",sector:"Technology / Services"},
{name:"DOCC",group:"Family Holdings",relationship:"Portfolio Interest",sector:"Technology"},
{name:"MTC",group:"Family Holdings",relationship:"Portfolio Interest",sector:"Operating Company"},
{name:"re:eat",group:"Family Holdings",relationship:"Portfolio Interest",sector:"Consumer Technology"}
];
let activeIndex=0;
const strip=document.getElementById("logoStrip");
function initials(name){return name.split(/\s|:/).filter(Boolean).map(x=>x[0]).slice(0,3).join("").toUpperCase()}
function render(){
 const active=companies[activeIndex];
 document.getElementById("portfolioGroup").textContent=active.group;
 document.getElementById("portfolioName").textContent=active.name;
 document.getElementById("portfolioRelationship").textContent=active.relationship;
 document.getElementById("portfolioSector").textContent=active.sector;
 document.getElementById("portfolioInitials").textContent=initials(active.name);
 [...strip.children].forEach((button,index)=>button.classList.toggle("active",index===activeIndex));
}
companies.forEach((company,index)=>{
 const button=document.createElement("button");
 button.type="button";
 button.innerHTML="<span>"+company.name+"</span>";
 button.addEventListener("click",()=>{activeIndex=index;render()});
 strip.appendChild(button);
});
document.getElementById("prevCompany").addEventListener("click",()=>{activeIndex=(activeIndex-1+companies.length)%companies.length;render()});
document.getElementById("nextCompany").addEventListener("click",()=>{activeIndex=(activeIndex+1)%companies.length;render()});
document.getElementById("year").textContent=new Date().getFullYear();
render();