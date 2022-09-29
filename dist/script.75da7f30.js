// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
"use strict";

var inputCardName = document.getElementById("card-name");
var inputCardNumber = document.getElementById("card-number");
var inputCardExpMonth = document.querySelector(".card-exp-month");
var inputCardExpYear = document.querySelector(".card-exp-year");
var inputCardCvc = document.getElementById("card-cvc");
var cardImageName = document.querySelector(".card-details__name");
var cardImageNumber = document.querySelector(".card-details__number");
var cardImageExpMonth = document.querySelector(".card-details__exp-month");
var cardImageExpYear = document.querySelector(".card-details__exp-year");
var cardImageCvc = document.querySelector(".card-details__cvc");
var formElement = document.querySelector(".card-details__form");
var formCompletedState = document.querySelector(".card-details__completed");
var formSumbitBtn = document.querySelector(".card-details__sumbit-btn");
var formContinueBtn = document.querySelector(".card-details__continue-btn");

var checkInputForCardNumber = function checkInputForCardNumber(ele, margins) {
  if (ele.validity.valueMissing) {
    printErrorMsg(ele, "Can't be blank", margins);
  } else if (!Number(ele.value.split(" ").join(""))) {
    printErrorMsg(ele, "Wrong format, numbers only", margins);
  } else if (removeWhiteSpace(ele.value).length !== 16) {
    printErrorMsg(ele, "Wrong card number, enter 16 digits", margins);
  } else {
    successState(ele, margins);
  }
};

var checkInputForText = function checkInputForText(ele, margins) {
  if (ele.validity.valueMissing) {
    printErrorMsg(ele, "Can't be blank", margins);
  } else {
    successState(ele, margins);
  }
};

var checkInputForOthers = function checkInputForOthers(ele, margins) {
  if (ele.validity.valueMissing) {
    printErrorMsg(ele, "Can't be blank", margins);
  } else if (ele.validity.badInput) {
    printErrorMsg(ele, "Wrong format, numbers only", margins);
  } else {
    successState(ele, margins);
  }
};

var printErrorMsg = function printErrorMsg(inputEle, msg, margins) {
  var errorMsgEle = inputEle.parentElement.lastElementChild;
  errorMsgEle.style.opacity = 100;
  errorMsgEle.textContent = msg;
  inputEle.classList.add("card-details__form-input-invalid");

  if (margins) {
    errorMsgEle.style.bottom = "24px";
    inputEle.style.marginBottom = "48px";
  }
};

var successState = function successState(inputEle, margins) {
  var _inputEle$previousEle;

  var errorMsgEle = inputEle.parentElement.lastElementChild;

  if (!inputEle.nextElementSibling.classList.contains("card-details__form-input-invalid") && !((_inputEle$previousEle = inputEle.previousElementSibling) !== null && _inputEle$previousEle !== void 0 && _inputEle$previousEle.classList.contains("card-details__form-input-invalid"))) {
    /*
      The expDate and expYear inputs, both together has only one error msg element,
      without this above condition, let's say the user first enters a value for the expDate and then 
    
    */
    errorMsgEle.style.opacity = 0;
  }

  inputEle.classList.remove("card-details__form-input-invalid");

  if (margins) {
    errorMsgEle.style.bottom = "0";
    inputEle.style.marginBottom = "24px";
  }
};

var removeWhiteSpace = function removeWhiteSpace(str) {
  var newLetterArray = [];
  str.split("").forEach(function (letter) {
    letter !== " " && newLetterArray.push(letter);
  });
  return newLetterArray;
};

var insertCardNumber = function insertCardNumber(val) {
  var limit = 0;
  var newNum = "";
  var arrayOfLetters = removeWhiteSpace(val);
  arrayOfLetters.forEach(function (letter) {
    ++limit;
    newNum += letter;

    if (limit % 4 === 0) {
      newNum += " ";
    }
  });
  return newNum;
};

inputCardName.addEventListener("change", function (e) {
  e.preventDefault();
  checkInputForText(inputCardName, true);
  cardImageName.textContent = inputCardName.value.toUpperCase();
});
inputCardNumber.addEventListener("change", function (e) {
  e.preventDefault();
  checkInputForCardNumber(inputCardNumber, true);
  cardImageNumber.textContent = insertCardNumber(inputCardNumber.value);
});
inputCardExpMonth.addEventListener("change", function (e) {
  e.preventDefault();
  checkInputForOthers(inputCardExpMonth, false);
  cardImageExpMonth.textContent = inputCardExpMonth.value;
});
inputCardExpYear.addEventListener("change", function (e) {
  e.preventDefault();
  checkInputForOthers(inputCardExpYear, false);
  cardImageExpYear.textContent = inputCardExpYear.value;
});
inputCardCvc.addEventListener("change", function (e) {
  e.preventDefault();
  checkInputForOthers(inputCardCvc, false);
  cardImageCvc.textContent = inputCardCvc.value;
});
formSumbitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  formElement.style.display = "none";
  formCompletedState.style.display = "block";
});
formContinueBtn.addEventListener("click", function (e) {
  e.preventDefault();
  formElement.style.display = "block";
  formCompletedState.style.display = "none";
});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54670" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map