const fs=require("fs");
let s=fs.readFileSync("hell-farmers-TESTBUILD.html","utf8");
let n=0;
function rep(a,b){ if(!s.includes(a)){console.error("MISS:",JSON.stringify(a.slice(0,40)));process.exit(2);} s=s.replace(a,b); n++; }
// 1) remove badge call from present()
rep("function present(){\n  drawTestBadge();\n  sc.imageSmoothingEnabled=false;",
    "function present(){\n  sc.imageSmoothingEnabled=false;");
// 2) call it at render-time (right before the gameplay present), where top-row draws DO show
rep("  if(currentMenu()) drawCursor();\n\n  present();",
    "  if(currentMenu()) drawCursor();\n  drawTestBadge();\n\n  present();");
fs.writeFileSync("hell-farmers-TESTBUILD.html",s);
console.log("patched",n,"; bytes",s.length);
