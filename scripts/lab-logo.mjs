import fs from "node:fs";
import opentype from "opentype.js";
const f = (w, s="normal") => { const b = fs.readFileSync(`node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-${w}-${s}.woff`); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };
const fonts = { "500n": f(500), "600n": f(600), "700n": f(700), "500i": f(500,"italic"), "600i": f(600,"italic"), "700i": f(700,"italic") };
const combos = [["600n","600i"],["500n","500i"],["700n","700i"],["600n","600n"],["600i","600i"],["500n","700i"]];
let out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" width="1200" height="700"><rect width="1200" height="700" fill="#F8F3EC"/>`;
combos.forEach(([k,s],i)=>{
  const x = 60 + (i%3)*380, y = 60 + Math.floor(i/3)*330;
  const K = fonts[k].getPath("K", x+20, y+220, 230).toPathData(2);
  const S = fonts[s].getPath("S", x+120, y+250, 230).toPathData(2);
  out += `<path d="${K}" fill="#A88660"/><path d="${S}" fill="#66704F" fill-opacity="0.92"/><text x="${x}" y="${y+300}" font-size="18" fill="#625C4D" font-family="sans-serif">${i+1}: K ${k} / S ${s}</text>`;
});
out += `</svg>`;
fs.writeFileSync("public/_lab/combos.svg", out);
console.log("ok");
