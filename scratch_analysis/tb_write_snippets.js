const fs=require("fs");
const BS = "\\\\";  // becomes two backslashes on disk -> JS reads as one backslash
const funcs =
`/* ========================================================================
   DEV TEST BUILD — not the shipped game. Adds invulnerability by default,
   a mega-damage toggle, and boss-warp keys so the full 21-boss roster can be
   walked start-to-finish without dying or grinding. Delete this build to ship.
   ======================================================================== */
function drawTestBadge(){
  if(mode===S.INTRO) return;
  px(0,0,SCREEN_W,11,'rgba(8,5,10,.74)');
  txt('DEV TEST BUILD', 4, 2, C.sulfur, 8);
  const md = window.TESTDMG?'ON':'off', gd = god?'ON':'off';
  txt(']=next boss  [=prev  ${BS}=mega-dmg:'+md+'  g=god:'+gd+'  r=restart',
      100, 2, C.crop, 8);
}
function warpBoss(dir){
  if(seg===undefined) return;                  // only inside a run
  if(mode!==S.BOSS){ room=1; enterBoss(); }     // first hop: enter this segment's boss
  else { seg=clamp(seg+dir,1,BOSSDEF.length); room=1; enterBoss(); }
  say('DEV WARP  '+seg+'/'+BOSSDEF.length+'  '+BOSSDEF[seg-1].name);
}
function present(){
  drawTestBadge();`;
const keys =
`  if(k==='j'&&(mode===S.HALL||mode===S.BOSS)){ foes=[]; boss=null; doorOpen=true; }
  if((k===']'||k==='[')&&(mode===S.BOSS||mode===S.HALL||mode===S.FARM)){ warpBoss(k===']'?1:-1); return; }
  if(k==='${BS}'){ window.TESTDMG=!window.TESTDMG; say('MEGA DAMAGE '+(window.TESTDMG?'ON':'OFF')); return; }`;
fs.writeFileSync("scratch_analysis/tb_funcs.txt", funcs);
fs.writeFileSync("scratch_analysis/tb_keys.txt", keys);
console.log("snippets rewritten. keys backslash line:");
console.log(keys.split("\n")[2]);
