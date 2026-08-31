const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = `string`; // just a dummy
const dom = new JSDOM(`<!DOCTYPE html><html><body>
<div id="res_E"></div>
<div id="res_EA">6</div>
<div id="res_es">8</div>
<div id="res_Adjes">7</div>
<div id="res_D">0</div>
<div id="res_AdjD">0</div>
<div id="res_EB">2:4</div>
</body></html>`);

global.document = dom.window.document;

var code = fs.readFileSync('interpretacion.js', 'utf8');
// mock some variables to make it run
code = code.replace(/document.getElementById\h*\([h'"]\s*idx_.*?\).innerHTML = reporte;/, 'console.log(reporte);');

eval(code);
generarInterpretacion();