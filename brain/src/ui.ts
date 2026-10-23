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
.item { padding: 12px 0; border-bottom: 1px solid var(--line); }
.item-line { display: flex; align-items: baseline; gap: 10px; }
.check { width: 15px; height: 15px; padding: 0; flex-shrink: 0; align-self: start; margin-top: 5px; border-radius: 3px; }
.meta, .why, details { margin: 4px 0 0 25px; font-size: 13px; color: var(--muted); }
summary { cursor: pointer; }
.detail-body, .message-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.detail-body { margin-top: 10px; }
.actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
.actions button { font-size: 12px; }
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
textarea, dialog input, dialog select { width: 100%; padding: 8px; background: var(--bg); border: 1px solid var(--line); border-radius: 5px; }
textarea { min-height: 90px; resize: vertical; }
.composer button { margin-top: 8px; }
#error { color: #b95043; white-space: pre-wrap; }
#error:empty { display: none; }
#activity { margin-top: 12px; }
.activity { margin: 10px 0; }
dialog { width: min(460px, 90vw); background: var(--bg); color: var(--text); border: 1px solid var(--line); border-radius: 6px; padding: 24px; }
dialog::backdrop { background: #0005; }
dialog label { display: block; margin: 12px 0; }
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
<dialog id="edit-dialog"><form id="edit-form"><label>Title<input id="edit-title" required maxlength="300"></label><label>Details<textarea id="edit-details" maxlength="12000"></textarea></label><label>Priority<select id="edit-priority"><option value="high">High</option><option value="normal">Normal</option><option value="low">Low</option></select></label><div class="actions"><button>Save</button><button type="button" id="cancel-edit">Cancel</button></div></form></dialog>
<script>

const $=id=>document.getElementById(id);let state={items:[],messages:[],changes:[]},sending=false,editing=null,refreshing=false;
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const chat=location.pathname==='/chat';$('dashboard').hidden=chat;$('chat').hidden=!chat;$('chat-button').hidden=chat;$('back-button').hidden=!chat;
async function api(path,method='GET',body){const res=await fetch(path,{method,headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined});const data=await res.json();if(!res.ok)throw Error(data.error||'Request failed');return data}
function itemHTML(item){const parent=state.items.find(x=>x.id===item.parent_id);const contexts=(item.context_ids||[]).map(id=>state.context?.find(c=>c.id===id)).filter(Boolean);return '<article class="item"><div class="item-line"><button class="check" data-action="done" data-id="'+esc(item.id)+'" aria-label="Complete '+esc(item.title)+'"></button><span class="title">'+esc(item.title)+'</span></div>'+(parent?'<div class="meta">↳ '+esc(parent.title)+'</div>':'')+(item.timing||item.due_date||item.scheduled_at?'<div class="meta">'+esc(item.due_date||item.scheduled_at||item.timing)+(item.timing_source==='inherited'?' · from related plans':'')+'</div>':'')+(item.needs_clarification?'<p class="why"><span class="chip">Needs your input</span> '+esc(item.needs_clarification)+'</p>':'')+'<details><summary>Details</summary><div class="detail-body">'+esc([item.why,item.details].filter(Boolean).join('\n\n'))+(item.priority_reason?'\nPriority: '+esc(item.priority_reason):'')+contexts.map(c=>'\n\n'+esc(c.title)+': '+esc(c.body)).join('')+'</div><div class="actions"><button data-action="edit" data-id="'+esc(item.id)+'">Edit</button><button data-action="someday" data-id="'+esc(item.id)+'">Someday</button><button data-action="dropped" data-id="'+esc(item.id)+'">Drop it</button></div></details></article>'}
function render(){const open=state.items.filter(x=>!['done','dropped'].includes(x.status));const groups={};const byId=new Map(open.map(i=>[i.id,i]));function root(item){let current=item;const seen=new Set();while(current.parent_id&&byId.has(current.parent_id)&&!seen.has(current.id)){seen.add(current.id);current=byId.get(current.parent_id)}return current}for(const item of open){const owner=root(item);let group=owner.needs_clarification?'Needs clarification':owner.status==='waiting'?'Waiting':owner.status==='someday'?'Someday':owner.status==='inbox'?'Inbox':owner.priority==='high'?'High priority':owner.priority==='low'?'Low priority':'On your list';(groups[group]??=[]).push(item)}$('sections').innerHTML=['Needs clarification','High priority','On your list','Low priority','Waiting','Someday','Inbox'].filter(g=>groups[g]).map(g=>'<section class="section">'+(g==='On your list'?'':'<h2>'+g+'</h2>')+groups[g].sort((a,b)=>{const ra=root(a),rb=root(b);return (ra.due_date||'9999').localeCompare(rb.due_date||'9999')||ra.id.localeCompare(rb.id)||(a.id===ra.id?-1:b.id===rb.id?1:0)}).map(itemHTML).join('')+'</section>').join('')||'<p class="empty">'+'Nothing on your list.'+'</p>';
$('activity').innerHTML=state.changes.slice(0,8).map(change=>{const record=JSON.parse(change.after_data);return '<div class="activity">'+esc(record.title)+'<br><span class="chip">'+esc(record.status||'Context updated')+'</span> · '+new Date(change.created_at).toLocaleDateString()+(record.kind==='item'&&state.items.some(i=>i.id===record.id&&i.version===record.version)?' <button data-action="undo" data-id="'+esc(change.id)+'">Undo</button>':'')+'</div>'}).join('')||'Your updates will appear here.';
const pending=state.messages.filter(m=>m.result.status==='parked');$('retry').hidden=!pending.length;
$('messages').innerHTML=state.messages.map(m=>'<article class="message"><div class="speaker">You · '+esc(m.source)+' · '+new Date(m.created_at).toLocaleString()+'</div><div class="message-text">'+esc(m.text)+'</div><div class="reply"><div class="speaker">brain</div><div class="markdown">'+(m.html||esc(m.result.text||(m.result.status==='unanswered'?'Could not finish: '+(m.result.reason||'unknown error')+'. Send a follow-up to try again.':m.result.status==='parked'?'Processing paused.':'Working on it…')))+'</div></div></article>').join('')||'';
}
async function refresh(){if(refreshing)return;refreshing=true;try{const next=await api('/api/state');if(JSON.stringify(next)!==JSON.stringify(state)){state=next;render();}$('error').textContent=''}catch(e){$('error').textContent=e.message}finally{refreshing=false}}
async function capture(event,input){event.preventDefault();if(sending)return;sending=true;const text=input.value.trim();let stored;try{stored=JSON.parse(localStorage.getItem('brain-pending')||'null')}catch{}const payload=stored?.text===text?stored:{id:crypto.randomUUID(),text,source:'chat'};localStorage.setItem('brain-pending',JSON.stringify(payload));try{await api('/api/messages','POST',payload);input.value='';localStorage.removeItem('brain-pending');await refresh()}catch(e){$('error').textContent=e.message+' Your draft is saved; send again to retry.'}finally{sending=false}}
$('compose').onsubmit=e=>capture(e,$('chat-text'));
$('chat-text').onkeydown=event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.isComposing&&event.keyCode!==229){event.preventDefault();if(!event.repeat&&!sending&&$('chat-text').value.trim())$('compose').requestSubmit()}};
try{const draft=JSON.parse(localStorage.getItem('brain-pending')||'null');if(draft)$('chat-text').value=draft.text}catch{}
document.addEventListener('click',async event=>{const button=event.target.closest('[data-action]');if(!button)return;const action=button.dataset.action;const item=state.items.find(x=>x.id===button.dataset.id);if(action==='edit'){editing=item;$('edit-title').value=item.title;$('edit-details').value=item.details;$('edit-priority').value=item.priority;$('edit-dialog').showModal();return}button.disabled=true;try{if(action==='undo')await api('/api/changes/'+encodeURIComponent(button.dataset.id)+'/undo','POST',{});else if(action==='retry')await api('/api/retry','POST',{});else await api('/api/items/'+encodeURIComponent(item.id),'PATCH',{status:action,expected_version:item.version});await refresh()}catch(e){$('error').textContent=e.message}finally{button.disabled=false}});
$('cancel-edit').onclick=()=>$('edit-dialog').close();$('edit-form').onsubmit=async e=>{e.preventDefault();try{await api('/api/items/'+encodeURIComponent(editing.id),'PATCH',{expected_version:editing.version,title:$('edit-title').value,details:$('edit-details').value,priority:$('edit-priority').value});$('edit-dialog').close();await refresh()}catch(e){$('error').textContent=e.message}};
refresh();setInterval(()=>{if(!document.hidden&&!$('edit-dialog').open)refresh()},5000);

</script>
</body>
</html>`;
