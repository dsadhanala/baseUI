/*!
 * Simple Browser Detection
 */
;
(function($, window, document, undefined) {

    'use strict';
    var matched, browser,
        dE = document.documentElement,
        uA = window.navigator.userAgent.toLowerCase(),
        bN, bV, OS, bvClass, bM, dT, wk, cvReg;

    var matchSt = /(trident)[ \/]([\w.]+)/.exec(uA) || [],
        trident = matchSt[1] || '',
        tV = matchSt[2] || '0',
        dM = document.documentMode;

    bvClass = bM = dT = wk = cvReg = '';

    $.uaMatch = function(ua) {
        var match = /(yabrowser)[ \/]([\w.]+)/.exec(ua) ||
            /(opr)[ \/]([\w.]+)/.exec(ua) ||
            /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            /(trident)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            ua.indexOf('compatible') < 0 && /(firefox)[ \/]([\w.]+)/.exec(ua) || [];
        return {
            browser: match[1] || '',
            version: match[2] || '0'
        };
    };

    // Don't clobber any existing jQuery.browser in case it's different
    if (!$.jQBrowser) {
        matched = $.uaMatch(uA);
        browser = {};

        if (matched.browser) {
            browser[matched.browser] = true;
            //Set browser name and version
            browser.nam = bN = matched.browser;
            browser.ver = bV = matched.version;
        }

        // find all the webkit browsers.
        if (browser.chrome) {
            browser.webkit = true;
            browser.nam = bN = 'chrome';
        } else if (browser.yabrowser) {
            browser.webkit = true;
            browser.nam = bN = 'yandex';
        } else if (browser.opr) {
            browser.webkit = true;
            browser.nam = bN = 'opera';
        } else if (browser.webkit) {
            browser.safari = true;
            browser.nam = bN = 'safari';
        }

        // mozilla
        if (browser.firefox) {
            browser.nam = bN = 'ff';
        }

        // webkit
        if (browser.webkit) {
            wk = ' webkit';
        }

        // IE
        if (browser.msie || browser.trident) {
            browser.nam = bN = 'ie';
        }

        /* mobile devices detection */
        if (uA.indexOf('mobile') !== -1) {
            dT = ' mobile';
            browser.mobile = true;
        } else {
            browser.mobile = false;
        }

        if (uA.indexOf('iphone') !== -1) {
            bN = 'm_safari';
            OS = ' iphone';
            browser.OS = 'iOS';
        }
        if (uA.indexOf('ipad') !== -1) {
            bN = 'm_safari';
            OS = ' ipad';
            browser.OS = 'iOS';
        }
        if (uA.indexOf('android') !== -1) {
            OS = ' android';
            browser.OS = 'android';
        }
        if (uA.indexOf('blackberry') !== -1) {
            OS = ' blackBerry';
            browser.OS = 'BB';
        }
        if (uA.indexOf('windows') !== -1) {
            OS = ' win';
            browser.OS = 'win';
        }
        if (uA.indexOf('macintosh') !== -1) {
            OS = ' mac';
            browser.OS = 'mac';
        }


        // IE compatible view
        if (trident === 'trident') {

            if (bV === '7.0' && tV === '4.0') {
                bM = ' ie8_cv';
                cvReg = /(^|\s)ie7(\s|$)/;
            }

            if (bV === '7.0' && tV === '5.0' || bV === '8.0' && tV === '5.0') {
                bM = ' ie9_cv';
                cvReg = (/(^|\s)ie7(\s|$)/) ? /(^|\s)ie7(\s|$)/ : /(^|\s)ie8(\s|$)/;
            }

            cvReg = (/(^|\s)ie7(\s|$)/) ? /(^|\s)ie7(\s|$)/ : /(^|\s)ie8(\s|$)/;
            dE.className = dE.className.replace(cvReg, '$1$2');

            if (parseFloat(bV) !== parseFloat(dM)) {
                bV = dM;
            }

        }

        // convert the version from '.' to '_'
        bvClass = parseFloat(bV).toString().replace(/[.\s]+/g, '_');

        // set the browser details as a class name to the root element that is html
        dE.className += OS + ' ' + bN + ' ' + bN + bvClass + bM + dT + wk;

        $.jQBrowser = browser;
    }
})(jQuery, window, document);
