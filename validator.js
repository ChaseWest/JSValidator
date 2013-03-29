var validator = (function(o) {

    var o = o || {};

    var options = {
        error: "error",
        success: "success",
        color: {
            regex: /^#[0-9a-f]{3}([0-9a-f]{3})?$/i,
            message: "Invalid Color - Please ensure the color is in the form #FFF, #FFFFFF, #fff, etc..."
        },
        date: {
            separator: "/",
            regex: /^(0[1-9]|[1-9]|1[012])[- //.](0[1-9]|[1-9]|[12][0-9]|3[01])[- //.][(19|20)\d\d]|[\d\d]$/,
            message: "Invalid Date - Please ensure date values are within their correct ranges."
        },
        datetime: {
            message: "Invalid Date/Time - Please ensure date and time values are within their correct ranges."
        },
        email: {
            regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Invalid Email - Please ensure the email is in the form test@domain.com"
        },
        month: {
            message: "Invalid Month - Please ensure your month is valid (1 - 12)."
        },
        number: {
            message: "Invalid Number - Please ensure your number is a valid digit."
        },
        range: {
            message: "Invalid Range - Please ensure the left parameter is less than the right parameter."
        },
        required: {
            message: "Required Field - Please enter a value into this field."
        },
        tel: {
            regex: /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]??)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-??9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})$/,
            message: "Invalid Telephone Number - Please ensure the telephone number is in the form 555-555-5555"
        },
        time: {
            separator: ":",
            regex: /^(0?[1-9]|[1-9]):([0-5][0-9]):([0-5][0-9])$/,
            message: "Invalid Time - Please ensure date values are within their correct ranges."
        },
        url: {
            regex: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
            message: "Invalid URL - Please ensure the URL is in the form http://test.com"
        },
        week: {
            message: "Invalid Week - Please ensure the value is between 1 and 52."
        },
        writeTo: {
            container: "printErrors"
        },
        rules: {
            "color": {
                isColor: function(val) {
                    return {
                        "message": options.color.message,
                        "status": options.color.regex.test(val)
                    };
                }
            },
            "date": {
                isDate: function(val) {
                    var date = parseDate(val);

                    return {
                        "message": options.date.message,
                        "status": (date.month > 0 && date.month <= 12) && (date.day > 0 && date.day <= 31) && (date.year.length === 2 || date.year.length === 4)
                    };
                },
                matchDateFormat: function(val) {
                    return {
                        "message": "Invalid Date - Please ensure the date is in the form mm/dd/yyyy or mm/dd/yy",
                        "status": options.date.regex.test(val)
                    };
                }
            },
            "datetime": {
                isDateTime: function(val) {
                    if (val.indexOf(" ") !== -1) {
                        var split = val.split(" "),
                            date = parseDate(split[0]),
                            time = parseTime(split[1]);
                    } else {
                        return {
                            "message": "Invalid Date/Time - Date and time values must be seperated with a single space.",
                            "status": false
                        };
                    }

                    return {
                        "message": options.datetime.message,
                        "status": ((date.month > 0 && date.month <= 12) && (date.day > 0 && date.day <= 31) && (date.year.length === 4) && (convert(time.hours, "int") >= 0 && convert(time.hours, "int") <= 24) && (convert(time.minutes, "int") >= 0 && convert(time.minutes, "int") <= 59) && (convert(time.seconds, "int") >= 0 && convert(time.seconds, "int") <= 59))
                    };

                }
            },
            "email": {
                isEmail: function(val) {
                    return {
                        "message": options.email.message,
                        "status": options.email.regex.test(val)
                    };
                }
            },
            "month": {
                isMonth: function(val) {
                    return {
                        "message": options.month.message,
                        "status": (convert(val, "int") > 0 && convert(val, "int") <= 12)
                    };
                }
            },
            "number": {
                isNumber: function(val) {
                    return {
                        "message": options.number.message,
                        "status": (!isNaN(convert(val, "float")) && isFinite(val))
                    };
                }
            },
            "range": {
                isBetween: function(val) {
                    if (val.indexOf("-")) {
                        var split = val.split("-"),
                            left = convert(split[0], "float"),
                            right = convert(split[1], "float");

                        return {
                            "message": options.range.message,
                            "status": left < right
                        };
                    } else {
                        return {
                            "message": "Range values must contain two digits separated by a '-'.",
                            "status": false
                        };
                    }
                }
            },
            "required": {
                isEmpty: function(val) {
                    return {
                        "message": options.required.message,
                        "status": trimString(val) !== ""
                    };
                }
            },
            "search": {
                isSearch: function(val) {
                    //TODO
                }
            },
            "tel": {
                isTel: function(val) {
                    return {
                        "message": options.tel.message,
                        "status": options.tel.regex.test(val)
                    };
                }
            },
            "time": {
                isTime: function(val) {
                    var time = parseTime(val);

                    return {
                        "message": options.time.message,
                        "status": ((convert(time.hours, "int") >= 0 && convert(time.hours, "int") <= 24) && (convert(time.minutes, "int") >= 0 && convert(time.minutes, "int") <= 59) && (convert(time.seconds, "int") >= 0 && convert(time.seconds, "int") <= 59))
                    };
                },
                matchTimeFormat: function(val) {
                    return {
                        "message": "Please ensure the time is in the form hh:mm:ss",
                        "status": options.time.regex.test(val)
                    };
                }
            },
            "url": {
                isURL: function(val) {
                    return {
                        "message": options.url.message,
                        "status": options.url.regex.test(val)
                    };
                }
            },
            "week": {
                isWeek: function(val) {
                    return {
                        "message": options.week.message,
                        "status": (convert(val, "int") > 0 && convert(val, "int") <= 52)
                    };
                }
            }
        }
    };

    options = MergeRecursive(options, o)

    /* Set up validation  */
    var validation = (function(rules) {

        //use querySelectorAll if it's available
        var requiredElements = (document.querySelectorAll ? document.querySelectorAll(".required") : document.getElementsByClassName("required"));

        var print = document.getElementById(options.writeTo.container) || null;

        //event handler
        var handler = function(e) {
            var target = (!e ? window.event.srcElement : e.target);

            if (hasClass(target, "required")) {
                var classes = target.getAttribute("class").split(" ");
                var errors = [];

                //for each class
                for (var i = 0; i < classes.length; i++) {
                    //if a rule is defined
                    if (rules[classes[i]] !== undefined) {
                        //for each rule defined for a given class
                        for (var rule in rules[classes[i]]) {
                            //if there was an error
                            var ruleStatus = rules[classes[i]][rule](trimString(target.value));
                            if (!ruleStatus.status) {
                                errors.push(ruleStatus);
                            } //end if
                        } // end for
                    } //end if
                } //end for each class

                if (print !== null) {
                    print.innerText = "";
                    for (var e in errors) {
                        if (errors[e] !== true) print.innerText += errors[e].message + "\n";
                    }
                }

                (errors.length > 0 ? setError(target) : setSuccess(target));
            }
        }

        //Set a global event to the document and use event delegation to determine which element was changed
        //If IE use attachEvent, otherwise use addEventListener
        var setEvents = (function() {
            (document.attachEvent ? document.attachEvent("onchange", handler) : document.addEventListener("change", handler));
        })();

    })(options.rules);



    /********************************************************/
    /* Helper Functions                                     */
    /********************************************************/

    /*
     * Recursively merge properties of two objects
     * http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
     */

    function MergeRecursive(obj1, obj2) {
        for (var p in obj2) {
            try {
                // Property in destination object set; update its value.
                if (obj2[p].constructor == Object) {
                    obj1[p] = MergeRecursive(obj1[p], obj2[p]);
                } else {
                    obj1[p] = obj2[p];
                }
            } catch (e) {
                // Property in destination object not set; create it and set its value.
                obj1[p] = obj2[p];
            }
        }
        return obj1;
    };

    /*
        indexOf is a recent addition to the ECMA-262 standard; as such it may not be present in all browsers.
        You can work around this by inserting the following code at the beginning of your scripts, allowing
        use of indexOf in implementations which do not natively support it. This algorithm is exactly the one
        specified in ECMA-262, 5th edition, assuming Object, TypeError, Number, Math.floor, Math.abs, and
        Math.max have their original value.

        Define indexOf if it's not defined for the browser already (older versions of IE).
    */
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(searchElement /*, fromIndex */ ) {
            "use strict";
            if (this == null) {
                throw new TypeError();
            }
            var t = Object(this);
            var len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = 0;
            if (arguments.length > 1) {
                n = Number(arguments[1]);
                if (n != n) { // shortcut for verifying if it's NaN
                    n = 0;
                } else if (n != 0 && n != Infinity && n != -Infinity) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            if (n >= len) {
                return -1;
            }
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (; k < len; k++) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        }
    };

    //Check to see if the target has a class [cName]
    function hasClass(target, cName) {
        var regex = new RegExp("(?:^|\\s)" + cName + "(?!\\S)");
        return target.className.match(regex);
    };

    //Remove a class [cName] from target
    function removeClass(target, cName) {
        var regex = new RegExp("(?:^|\\s)" + cName + "(?!\\S)", "g");
        target.className = target.className.replace(regex, '')
    };

    //Add a class [cName] to target
    function addClass(target, cName) {
        target.className = target.className + " " + cName;
    };

    function trimString(str) {
        return str.replace(/^\s+|\s+$/g, '');
    };

    function parseDate(dateString) {
        var date = dateString.split(options.date.separator);

        return {
            month: date[0] || "",
            day: date[1] || "",
            year: date[2] || ""
        }

    };

    function parseTime(timeString) {
        var time = timeString.split(options.time.separator);

        return {
            hours: time[0] || "",
            minutes: time[1] || "",
            seconds: time[2] || ""
        }
    };

    function convert(val, type) {

        switch (type) {
            case "int":
                val = parseInt(val, 10);
                break;
            case "float":
                val = parseFloat(val);
                break;
            case "string":
                val = val.toString();
                break;
            default:
                console.log("Invalid type " + type + " passed into convert function");
        };

        return val;
    };

    //Set the success class to the target
    function setSuccess(target) {
        if (!hasClass(target, options.success)) {
            if (hasClass(target, options.error)) {
                removeClass(target, options.error)
            }
            addClass(target, options.success);
        }
    };

    //Set the error class to the target
    function setError(target) {
        if (!hasClass(target, options.error)) {
            if (hasClass(target, options.success)) {
                removeClass(target, options.success);
            }
            addClass(target, options.error);
        }
    };

});
