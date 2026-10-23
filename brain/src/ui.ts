export const page = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>brain</title>
<style>
:root { color-scheme: light dark; font: 15px/1.6 system-ui, sans-serif; --bg: #fff; --text: #262626; --muted: #737373; --line: #e5e5e5; }
@media (prefers-color-scheme: dark) { :root { --bg: #191919; --text: #e5e5e5; --muted: #a3a3a3; --line: #353535; } }
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--text); }
main { max-width: 720px; margin: 0 auto; padding: 56px 24px 96px; }
a, button, input, textarea, select { color: inherit; font: inherit; }
input, textarea, select { font-size: 16px; }
a { text-decoration: none; }
button, .chat-button { cursor: pointer; border: 1px solid var(--line); border-radius: 5px; background: var(--bg); padding: 5px 10px; }
button:hover, .chat-button:hover { border-color: var(--muted); }
a:focus-visible, button:focus-visible, textarea:focus-visible, input:focus-visible, select:focus-visible, summary:focus-visible { outline: 2px solid var(--muted); outline-offset: 3px; }
.chat-button { position: fixed; right: 24px; bottom: 24px; font-size: 13px; }
h2 { font-size: 13px; font-weight: 600; color: var(--muted); margin: 32px 0 8px; }
.section:first-child h2 { margin-top: 0; }
.focus { padding: 18px 20px; border: 1px solid var(--line); border-left: 3px solid #9b8157; border-radius: 8px; margin-bottom: 28px; }
.focus h2, .area h2 { color: var(--text); font-size: 15px; margin: 0; }
.focus .item:last-child, .area .item:last-child { border-bottom: 0; }
.focus-reason, .area-summary { color: var(--muted); font-size: 13px; margin: 4px 0 12px; }
.focus-reason { margin: 4px 0 0; }
.area { border: 1px solid var(--line); border-radius: 8px; padding: 18px 20px; margin: 16px 0; }
.area-heading { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.area-count { font-size: 12px; color: var(--muted); }
.fold { margin: 12px 0 0; font-size: inherit; color: inherit; }
.fold > summary { font-size: 13px; color: var(--muted); }
.fold .item { margin-left: 4px; }
@media (max-width: 480px) { .area, .focus { padding: 14px; } }
.item { padding: 12px 0; border-bottom: 1px solid var(--line); }
.item-line { display: flex; align-items: baseline; gap: 10px; }
.meta, .why { margin: 4px 0 0; font-size: 13px; color: var(--muted); }
summary { cursor: pointer; }
.message-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.empty, .speaker, .activity { color: var(--muted); font-size: 13px; }
.message { margin: 24px 0; }
.message > .message-text { width: fit-content; max-width: 90%; margin-left: auto; padding: 10px 14px; border-radius: 16px; background: var(--line); }
.message > .speaker { text-align: right; }
.speaker { margin-bottom: 4px; }
.reply { margin-top: 14px; }
.markdown { overflow-wrap: anywhere; }
.markdown > :first-child { margin-top: 0; }
.markdown > :last-child { margin-bottom: 0; }
.markdown p, .markdown ul, .markdown ol, .markdown pre, .markdown blockquote { margin: 0 0 12px; }
.markdown h1, .markdown h2, .markdown h3, .markdown h4, .markdown h5, .markdown h6 { color: inherit; font-size: 1em; margin: 16px 0 8px; }
.markdown a { text-decoration: underline; }
.markdown pre { overflow-x: auto; padding: 10px; border: 1px solid var(--line); border-radius: 5px; white-space: pre; }
.markdown code { font-size: .9em; }
.markdown blockquote { padding-left: 12px; border-left: 2px solid var(--line); color: var(--muted); }
.markdown table { display: block; overflow-x: auto; border-collapse: collapse; margin-bottom: 12px; }
.markdown th, .markdown td { padding: 4px 8px; border: 1px solid var(--line); text-align: left; }
.composer { margin-top: 32px; }
textarea { width: 100%; padding: 8px; background: var(--bg); border: 1px solid var(--line); border-radius: 5px; }
textarea { min-height: 90px; resize: vertical; }
.composer button { margin-top: 8px; }
#error { color: #b95043; white-space: pre-wrap; }
#error:empty { display: none; }
#activity { margin-top: 12px; }
.activity { margin: 10px 0; }
@media (max-width: 480px) { main { padding-top: 24px; } }
</style>
</head>
<body>
<main>
<div id="error" role="alert"></div>
<div id="dashboard"><div id="sections"></div></div>
<div id="chat" hidden>
<a id="back-button" href="/">← List</a>
<div id="messages"></div>
<button id="retry" data-action="retry" hidden>Retry paused work</button>
<form id="compose" class="composer">
<textarea id="chat-text" aria-label="Message brain" placeholder="Message…" required maxlength="16000"></textarea>
<button type="submit">Send</button>
</form>
<details><summary>Activity</summary><div id="activity"></div></details>
</div>
</main>
<a id="chat-button" class="chat-button" href="/chat">Chat</a>
<script>

const $=id=>document.getElementById(id);let state={items:[],messages:[],changes:[]},sending=false,refreshing=false;
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const chat=location.pathname==='/chat';$('dashboard').hidden=chat;$('chat').hidden=!chat;$('chat-button').hidden=chat;$('back-button').hidden=!chat;
async function api(path,method='GET',body){const res=await fetch(path,{method,headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined});const data=await res.json();if(!res.ok)throw Error(data.error||'Request failed');return data}
function itemHTML(item){const parent=state.items.find(x=>x.id===item.parent_id);return '<article class="item"><div class="item-line"><span class="title">'+esc(item.title)+'</span></div>'+(parent?'<div class="meta">↳ '+esc(parent.title)+'</div>':'')+(item.timing||item.due_date||item.scheduled_at?'<div class="meta">'+esc(item.due_date||item.scheduled_at||item.timing)+(item.timing_source==='inherited'?' · from related plans':'')+'</div>':'')+(item.needs_clarification?'<p class="why">Needs your input: '+esc(item.needs_clarification)+'</p>':'')+'</article>'}
function dashboardHTML(){const dashboard=state.dashboard;if(!dashboard)return '<p class="empty">'+(state.items.some(i=>!['done','dropped'].includes(i.status))?'Organizing your list…':'Nothing on your list.')+'</p>';const fold=(group,key,label,items)=>items.length?'<details class="fold" id="fold-'+esc(group.id)+'-'+key+'"><summary>'+label+' · '+items.length+'</summary>'+items.map(itemHTML).join('')+'</details>':'';const focus=dashboard.highlights.length?'<section class="focus"><h2>Needs your attention</h2>'+dashboard.highlights.map(h=>'<div>'+itemHTML(h.item)+'<p class="focus-reason">'+esc(h.reason)+'</p></div>').join('')+'</section>':'';return focus+dashboard.groups.map(group=>'<section class="area"><div class="area-heading"><h2>'+esc(group.title)+'</h2><span class="area-count">'+group.count+' '+(group.count===1?'item':'items')+'</span></div>'+(group.summary?'<p class="area-summary">'+esc(group.summary)+'</p>':'')+group.featured.map(itemHTML).join('')+fold(group,'remaining','More to do',group.remaining)+fold(group,'waiting','Waiting',group.waiting)+fold(group,'optional','Later & optional',group.optional)+'</section>').join('')||'<p class="empty">Nothing on your list.</p>'}
function render(){const expanded=[...(document.querySelectorAll?.('#sections details[id][open]')||[])].map(el=>el.id);$('sections').innerHTML=dashboardHTML();for(const id of expanded){const el=document.getElementById(id);if(el)el.open=true}
$('activity').innerHTML=state.changes.slice(0,8).map(change=>{const record=JSON.parse(change.after_data);return '<div class="activity">'+esc(record.title)+'<br><span class="chip">'+esc(record.status||'Context updated')+'</span> · '+new Date(change.created_at).toLocaleDateString()+'</div>'}).join('')||'Your updates will appear here.';
const pending=state.messages.filter(m=>m.result.status==='parked');$('retry').hidden=!pending.length;
$('messages').innerHTML=state.messages.map(m=>'<article class="message"><div class="speaker">You · '+esc(m.source)+' · '+new Date(m.created_at).toLocaleString()+'</div><div class="message-text">'+esc(m.text)+'</div><div class="reply"><div class="speaker">brain</div><div class="markdown">'+(m.html||esc(m.result.text||(m.result.status==='unanswered'?'Could not finish: '+(m.result.reason||'unknown error')+'. Send a follow-up to try again.':m.result.status==='parked'?'Processing paused.':'Working on it…')))+'</div></div></article>').join('')||'';
}
async function refresh(){if(refreshing)return;refreshing=true;try{const next=await api('/api/state');if(JSON.stringify(next)!==JSON.stringify(state)){state=next;render();}$('error').textContent=''}catch(e){$('error').textContent=e.message}finally{refreshing=false}}
async function capture(event,input){event.preventDefault();if(sending)return;sending=true;const text=input.value.trim();let stored;try{stored=JSON.parse(localStorage.getItem('brain-pending')||'null')}catch{}const payload=stored?.text===text?stored:{id:crypto.randomUUID(),text,source:'chat'};localStorage.setItem('brain-pending',JSON.stringify(payload));try{await api('/api/messages','POST',payload);input.value='';localStorage.removeItem('brain-pending');await refresh()}catch(e){$('error').textContent=e.message+' Your draft is saved; send again to retry.'}finally{sending=false}}
$('compose').onsubmit=e=>capture(e,$('chat-text'));
$('chat-text').onkeydown=event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.isComposing&&event.keyCode!==229){event.preventDefault();if(!event.repeat&&!sending&&$('chat-text').value.trim())$('compose').requestSubmit()}};
try{const draft=JSON.parse(localStorage.getItem('brain-pending')||'null');if(draft)$('chat-text').value=draft.text}catch{}
$('retry').onclick=async()=>{const button=$('retry');button.disabled=true;try{await api('/api/retry','POST',{});await refresh()}catch(e){$('error').textContent=e.message}finally{button.disabled=false}};
refresh();setInterval(()=>{if(!document.hidden)refresh()},5000);

</script>
</body>
</html>`;
