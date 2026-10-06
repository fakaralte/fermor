(function(){
var $=function(id){return document.getElementById(id)};
var fmt=function(n){return "₹"+Math.round(n).toLocaleString("en-IN")};
/* hero */
var balance=48200,reserve=5000;
var bills=[{n:"Rent",a:14000,on:true,d:"Fri"},{n:"Electricity",a:1850,on:true,d:"Mon"},{n:"Phone plan",a:499,on:true,d:"Wed"},{n:"Car insurance",a:3200,on:true,d:"Next Fri"}];
var ul=$("bills");
function drawBills(){
 ul.innerHTML="";
 bills.forEach(function(b,i){
  var li=document.createElement("li"),bt=document.createElement("button");
  bt.type="button";bt.setAttribute("aria-pressed",b.on);
  bt.innerHTML='<span class="n"><span class="chk" aria-hidden="true">'+(b.on?"✓":"")+'</span><span>'+b.n+' <small style="opacity:.7">'+b.d+'</small></span></span><span class="amt">'+fmt(b.a)+'</span>';
  bt.onclick=function(){b.on=!b.on;drawBills();calc()};
  li.appendChild(bt);ul.appendChild(li);
 });
}
function calc(){
 var due=bills.reduce(function(s,b){return s+(b.on?b.a:0)},0);
 var safe=balance-due-reserve;
 $("safe").textContent=fmt(safe);
 $("sentence").textContent="You have "+fmt(balance)+" today. After "+fmt(due)+" in bills and "+fmt(reserve)+" set aside for savings, "+fmt(safe)+" is yours to spend.";
}
drawBills();calc();
/* goal */
function goal(){
 var a=+$("amount").value,m=+$("monthly").value,mo=Math.ceil(a/m);
 $("amountOut").textContent=fmt(a);$("monthlyOut").textContent=fmt(m)+" / month";
 var d=new Date();d.setMonth(d.getMonth()+mo);
 var when=d.toLocaleDateString("en-US",{month:"long",year:"numeric"});
 var t=mo>=12?(Math.floor(mo/12)+" yr"+(mo%12?" "+(mo%12)+" mo":"")):(mo+" month"+(mo>1?"s":""));
 $("result").innerHTML="You'll reach "+fmt(a)+" in <span>"+t+"</span>, by "+when+".";
 $("fill").style.width=Math.min(100,(m*6/a)*100)+"%";
}
$("amount").oninput=goal;$("monthly").oninput=goal;goal();
/* loans */
var I={
bike:'<circle cx="12" cy="36" r="7"/><circle cx="36" cy="36" r="7"/><path d="M12 36l8-14h10l6 14M20 22l-2-6h-4M28 12a3 3 0 100-.1"/>',
car:'<path d="M6 32v-8l6-10h24l6 10v8M6 32h36M6 32v4h8v-4M34 32v4h8v-4"/><circle cx="14" cy="28" r="1"/><circle cx="34" cy="28" r="1"/>',
truck:'<path d="M4 34V14h24v20M28 22h9l7 8v4H4"/><circle cx="14" cy="36" r="4"/><circle cx="35" cy="36" r="4"/>',
wallet:'<rect x="6" y="12" width="36" height="26" rx="4"/><path d="M6 20h36M32 29h6"/>',
store:'<path d="M8 20l4-10h24l4 10M8 20c0 4 8 4 8 0 0 4 8 4 8 0 0 4 8 4 8 0 0 4 8 4 8 0M10 26v14h28V26"/>',
building:'<rect x="10" y="6" width="20" height="34" rx="1"/><path d="M30 18h8v22H10M16 14h8M16 22h8M16 30h8"/>',
home:'<path d="M6 22L24 8l18 14M12 20v20h24V20M20 40V28h8v12"/>'};
var L={
0:[{i:"bike",t:"Two Wheeler Loan",d:"Hassle-free finance for your bike or scooter, with simple paperwork.",a:"₹2,00,000",m:"36 months"},
{i:"car",t:"Used Car Loan",d:"Looking to buy a used car? Get affordable financing for a second-hand car.",a:"₹10,00,000",m:"36 months"},
{i:"truck",t:"Commercial Vehicles Loan",d:"Financing to help businesses and owners acquire vehicles for commercial use.",a:"₹10,00,000",m:"60 months"},
{i:"wallet",t:"Salaried Personal Loan",d:"Help for salaried individuals to meet their financial needs with ease.",a:"₹5,00,000",m:"36 months"}],
1:[{i:"store",t:"Micro Enterprise Loan (MEL)",d:"A small amount of capital to support micro enterprises for expansion or day-to-day operations.",a:"₹50,00,000",m:"120 months"},
{i:"building",t:"Business Loan",d:"Boost your business operations with flexible working capital.",a:"₹1 crore",m:"36 months"},
{i:"home",t:"Loans Against Property (LAP)",d:"Use the equity in your property to fund your next step.",a:"₹5 crore",m:"180 months"}]};
var lt=[$("lt0"),$("lt1")];
function showLoans(k){
 lt.forEach(function(b,j){b.setAttribute("aria-selected",j===k);b.tabIndex=j===k?0:-1});
 $("loanGrid").setAttribute("aria-labelledby","lt"+k);
 $("loanGrid").innerHTML=L[k].map(function(x){
  return '<article class="loan"><svg viewBox="0 0 48 48" aria-hidden="true">'+I[x.i]+'</svg><h3>'+x.t+'</h3><p>'+x.d+'</p><dl><div><dt>Loan amount up to</dt><dd>'+x.a+'</dd></div><div><dt>Tenure up to</dt><dd>'+x.m+'</dd></div></dl><div class="row"><a class="btn btn-pine" href="#faq">Know more</a><a class="btn btn-gold" href="#start">Apply now</a></div></article>';
 }).join("");
}
lt.forEach(function(b,j){b.onclick=function(){showLoans(j)};b.onkeydown=function(e){if(e.key==="ArrowRight"||e.key==="ArrowLeft"){showLoans(1-j);lt[1-j].focus()}}});
showLoans(0);
/* tabs */
var tabs=[0,1,2].map(function(i){return $("t"+i)});
function pick(i){tabs.forEach(function(t,j){var on=i===j;t.setAttribute("aria-selected",on);t.tabIndex=on?0:-1;$("p"+j).hidden=!on});tabs[i].focus()}
tabs.forEach(function(t,i){t.onclick=function(){pick(i)};t.onkeydown=function(e){if(e.key==="ArrowRight")pick((i+1)%3);if(e.key==="ArrowLeft")pick((i+2)%3)}});
/* menu */
var mb=$("menu"),links=$("links");
mb.onclick=function(){var o=links.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
links.onclick=function(e){if(e.target.tagName==="A"){links.classList.remove("open");mb.setAttribute("aria-expanded",false)}};
/* signup */
$("signup").onsubmit=function(e){
 e.preventDefault();var v=$("email").value.trim(),m=$("msg");
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){m.textContent="Enter a valid email, like you@example.com.";$("email").focus();return}
 m.textContent="You're on the list. We'll email "+v+" when your spot opens.";$("email").value="";
};
})();
