/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var APP = (function() {
  var _callbacks = {
    'deviceready': [],
    'loaded': []
  };

  var _isDeviceReady = false;
  var _isLoaded = false;

  var _onDeviceReady = function() {
    _isDeviceReady = true;
    _callbacks['deviceready'].forEach(function(callback) {
      callback();
    });
  };

  var _onload = function() {
    _isLoaded = true;
    _callbacks['loaded'].forEach(function(callback) {
      callback();
    });
  };

  return {
    initialize: function() {
      document.addEventListener('deviceready', _onDeviceReady, false);
      window.addEventListener('load', _onload);
    },
    deviceReady: function(callback) {
      if (_isDeviceReady) {
        if (callback) {
          callback();
        }
      } else {
        _callbacks['deviceready'].push(callback);
      }
    },
    loaded: function(callback) {
      if (_isLoaded) {
        if (callback) {
          callback();
        }
      } else {
        _callbacks['loaded'].push(callback);
      }
    }
  };
})();

function check() {
  APP.deviceReady(function() {
    var scanner = window.cordova.require('cordova/plugin/BarcodeScanner');
    if (!scanner) {
      if (window.plugins && window.plugins.barcodeScanner) {
        scanner = window.plugins.barcodeScanner;
      }
    }

    if (scanner) {
      scanner.scan(
        function(result) {
          //navigator.app.loadUrl(result.text, { openExternal:true });
          window.open(result.text, '_blank');
          /*alert('We got a barcode\n' +
                'Result: ' + result.text + '\n' +
                'Format: ' + result.format + '\n' +
                'Cancelled: ' + result.cancelled);*/
        },
        function(error) {
          alert('Scanning failed: ' + error);
        }
      );
    }
  });
}

APP.initialize();
APP.loaded(function() {
  PageController.navigateTo('splashScreen');
  setTimeout(function() {
    PageController.navigateTo('menuPage');
  }, 3000);

  var items =
    Array.prototype.slice.call(document.querySelectorAll('#menuPage ul li'));
  items.forEach(function(item) {
    item.addEventListener('click', check);
  });
});
