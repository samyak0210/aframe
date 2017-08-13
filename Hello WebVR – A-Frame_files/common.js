(function(){initHelpers();initHeadingAnchors();initTableOfContents();initSidebarScrollState();function initHeadingAnchors(){function anchorId(str){return(str||'').replace(/[^-a-zA-Z0-9,&\s]+/g,'').replace(/-/g,'_').replace(/\s+/g,' ').trim().replace(/\s/g,'_').trim().toLowerCase();}
var anchorHeadingsSelector=['.copy__wrap > table[id] tr th:first-child','.copy__wrap > table tr[id] td:first-child'].join(',');var tableIds={};var rowIds={};var content=$('.content');if(content){var tablesEls=$$('.content .copy__wrap > table');tablesEls.forEach(function(tableEl,idx){var siblingEl=tableEl;var tableHeading='';while(siblingEl){siblingEl=siblingEl.previousElementSibling;if(siblingEl&&siblingEl.nodeName==='H2'){tableHeading=siblingEl.textContent;break;}}
var tableId=anchorId(tableHeading);if(tableIds[tableId]){tableId+=++tableIds[tableId];}else{tableIds[tableId]=1;}
tableEl.setAttribute('id',tableId);$$('tr',tableEl).forEach(function(trEl){var td=trEl.querySelector('td');if(!td){return;}
var trId=anchorId(td.textContent);if(rowIds[trId]){trId+='-'+(++rowIds[trId])}else{rowIds[trId]=1;}
trEl.setAttribute('id',tableId+'_'+ trId);});});content.addEventListener('click',function(e){var el=e.target;if(el.matches&&el.matches(anchorHeadingsSelector)){var closestEl=el.closest('[id]');if(!closestEl){return;}
window.location.hash='#'+ closestEl.id;}});}}
function initTableOfContents(){if(!document.querySelector('#table-of-contents')){return;}
var sectionScrolls=[];$$('.content h2, .content h3').forEach(function(heading){var link=document.querySelector('#table-of-contents [href="#'+ heading.getAttribute('id')+'"]');if(!link){return;}
sectionScrolls.push([heading.offsetTop,link]);});if(!sectionScrolls.length){return;}
sectionScrolls.sort(function(a,b){if(a[0]<b[0]){return-1;}
if(a[0]>b[0]){return 1;}
return 0;});function highlightHeading(scrollPos){scrollPos+=40;for(var i=0;i<sectionScrolls.length;i++){sectionScrolls[i][1].classList.remove('current');}
var found=false;for(i=0;i<sectionScrolls.length;i++){if(scrollPos>=sectionScrolls[i][0]&&(!sectionScrolls[i+ 1]||scrollPos<sectionScrolls[i+ 1][0])){sectionScrolls[i][1].classList.add('current');found=true;}}
if(!found){sectionScrolls[0][1].classList.add('current');}}
var scrollPos=0;var ticking=false;window.addEventListener('scroll',function(){scrollPos=window.scrollY;if(!ticking){window.requestAnimationFrame(function(){highlightHeading(scrollPos);ticking=false;});}
ticking=true;});sectionScrolls[0][1].classList.add('current');}
function initSidebarScrollState(){var sidebarEl=document.querySelector('#sidebar');var sidebarLinks=document.querySelectorAll('#sidebar a');if(sidebarEl){var sidebarLinkClicked=false;function markSidebarLinkClicked(){sidebarLinkClicked=true;}
for(var i=0;i<sidebarLinks.length;i++){sidebarLinks[i].addEventListener('click',markSidebarLinkClicked);}
var lsKey='sidebar-scroll';var scrollTop=localStorage.getItem(lsKey);if(scrollTop){sidebarEl.scrollTop=scrollTop;}
sidebarEl.style.visibility='visible';sidebarEl.addEventListener('scroll',function(){localStorage.setItem(lsKey,sidebarEl.scrollTop);});window.addEventListener('beforeunload',function(){if(sidebarLinkClicked){return;}
localStorage.setItem(lsKey,null);});}}
function initHelpers(){window.$=function(sel,parent){var el=sel;if(sel&&typeof sel==='string'){el=(parent||document).querySelector(sel);}
return el;};window.$$=function(sel,parent){if(Array.isArray(sel)){return sel;}
var els=sel;if(sel&&typeof sel==='string'){els=(parent||document).querySelectorAll(sel);}
return toArray(els);};var toArray=function(obj){if(Array.isArray(obj)){return obj;}
if(typeof obj==='object'&&typeof obj.length==='number'){return Array.prototype.slice.call(obj);}
return[obj];};}})();