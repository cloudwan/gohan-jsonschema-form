const jsdom = require('jsdom');
const {PerformanceObserver} = require('perf_hooks');

function propagateToGlobal(window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  }
  for (let key in window._core) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  }
}

// setup the simplest document possible
const dom = new jsdom.JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/',
});

global.window = dom.window;
global.document = dom.window.document;

propagateToGlobal(dom.window);

global.window.Object = Object;
global.window.Math = Math;
global.Performance = PerformanceObserver;
