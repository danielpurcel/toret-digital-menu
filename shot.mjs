import { chromium } from 'playwright-core';
const url='http://127.0.0.1:18800';
try{
  const b=await chromium.connectOverCDP(url);
  const ctx=b.contexts()[0];
  const pages=ctx.pages();
  const p=pages.find(x=>x.url().includes('menu.toretturin.it'))||pages[0];
  await p.setViewportSize({width:390,height:844});
  await new Promise(r=>setTimeout(r,500));
  await p.screenshot({path:'/data/.openclaw/workspace/state/tmp/live_modal.png'});
  console.log('ok', p.url());
  await b.close();
}catch(e){ console.log('ERR', e.message); }
