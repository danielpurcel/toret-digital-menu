import { chromium } from 'playwright-core';
const url='http://127.0.0.1:18800';
try{
  const b=await chromium.connectOverCDP(url);
  const ctx=b.contexts()[0];
  const p=ctx.pages()[0];
  await p.setViewportSize({width:390,height:900});
  await p.goto('https://menu.toretturin.it/menu/pranzo',{waitUntil:'networkidle'});
  await new Promise(r=>setTimeout(r,2500));
  await p.screenshot({path:'/data/.openclaw/workspace/state/tmp/pranzo.png', fullPage:false});
  console.log('ok');
  await b.close();
}catch(e){ console.log('ERR', e.message); }
