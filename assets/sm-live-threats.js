/* SANS ISC reported threat activity; no fabricated telemetry. */
(()=>{'use strict';
const API='https://isc.sans.edu/api/topports/records/5?json';
const mount=document.querySelector('.sm-global-hero');
if(!mount)return;
const panel=document.createElement('div');panel.className='sm-live-intel';
panel.innerHTML='<div class="sm-live-heading"><strong>Reported network scanning activity</strong><span id="sm-live-state">Connecting…</span></div><div id="sm-live-content" role="status" aria-live="polite">Loading reported ports from SANS Internet Storm Center.</div><div class="sm-live-credit">Source: <a href="https://isc.sans.edu/data/" target="_blank" rel="noopener noreferrer">SANS Internet Storm Center</a> · Observed reports, not a real-time attack stream · Refreshes hourly</div>';
mount.insertAdjacentElement('afterend',panel);
const state=panel.querySelector('#sm-live-state'),content=panel.querySelector('#sm-live-content');
const portName={22:'SSH',23:'Telnet',25:'SMTP',53:'DNS',80:'HTTP',123:'NTP',443:'HTTPS',445:'SMB',3389:'RDP',8080:'HTTP alternate',8443:'HTTPS alternate'};
async function update(){
try{
 const response=await fetch(API,{cache:'no-store'});
 if(!response.ok)throw new Error('Feed unavailable');
 const data=await response.json();
 const rows=Object.values(data).filter(x=>x&&typeof x==='object'&&Number.isFinite(Number(x.targetport))&&Number.isFinite(Number(x.records))).slice(0,5);
 if(!rows.length)throw new Error('No observations');
 content.replaceChildren();
 const list=document.createElement('ol');list.className='sm-live-ports';
 rows.forEach(row=>{
  const li=document.createElement('li');
  const port=Number(row.targetport),reports=Number(row.records);
  li.textContent='Port '+port+(portName[port]?' ('+portName[port]+')':'')+' — '+reports.toLocaleString()+' reported records';
  list.append(li);
 });
 content.append(list);
 const stamp=document.createElement('p');stamp.className='sm-live-date';
 stamp.textContent='Feed date: '+(typeof data.date==='string'?data.date:'not provided')+' · Checked: '+new Date().toLocaleString();
 content.append(stamp);state.textContent='Source connected';
}catch(e){
 state.textContent='Feed unavailable';
 content.textContent='Current observations could not be retrieved. View the latest reports directly at SANS Internet Storm Center.';
}
}
update();setInterval(()=>{if(!document.hidden)update()},3600000);
})();
