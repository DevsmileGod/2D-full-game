const fs=require("fs");
let s=fs.readFileSync("hell-farmers.html","utf8");
const funcs=fs.readFileSync("scratch_analysis/tb_funcs.txt","utf8").replace(/\n$/,"");
const keys=fs.readFileSync("scratch_analysis/tb_keys.txt","utf8").replace(/\n$/,"");
let n=0;
function rep(pat,out){ if(!s.includes(pat)){ console.error("MISSING:",JSON.stringify(pat.slice(0,40))); process.exit(2);} s=s.replace(pat,()=>out); n++; }
rep("now=0, god=false;", "now=0, god=true;");
rep("  return d*m;", "  return d*m*(window.TESTDMG?25:1);");
rep("function present(){\n  sc.imageSmoothingEnabled=false;", funcs+"\n  sc.imageSmoothingEnabled=false;");
rep("  if(k==='j'&&(mode===S.HALL||mode===S.BOSS)){ foes=[]; boss=null; doorOpen=true; }", keys);
rep("<title>", "<title>[DEV TEST] ");
fs.writeFileSync("hell-farmers-TESTBUILD.html", s);
console.log("wrote hell-farmers-TESTBUILD.html; replacements:",n,"; bytes:",s.length);
