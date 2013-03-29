JSValidator
===========

##Setup

Include the `validator.js` file:

	<script src="validator.js"></script>

Instantiate the `validator` method passing in an object of options (defined below), if any.

	<script>
		validator();
	</script>

To make a field required, simply add the `required` class to the desired input.

	<input class="required" placeHolder=""/><br/>

The following input types are defined by default:

	<input class="required tel" placeHolder="tel"/>
	<input class="required date" placeHolder="date"/>
	<input class="required time" placeHolder="time"/>
	<input class="required datetime" placeHolder="datetime"/>
	<input class="required number" placeHolder="number"/>
	<input class="required email" placeHolder="email"/>
	<input class="required url" placeHolder="url"/>
	<input class="required color" placeHolder="color"/>
	<input class="required range" placeHolder="range"/>
	<input class="required month" placeHolder="month"/>
	<input class="required week" placeHolder="week"/>

##Options

	#####General

	`error: "CSS Class Name for errors"`
  `success: "CSS Class Name for successes"`

  #####Rules

  `options.date`:

  `date: {
            separator: "/",
            regex: /^(0[1-9]|[1-9]|1[012])[- //.](0[1-9]|[1-9]|[12][0-9]|3[01])[- //.][(19|20)\d\d]|[\d\d]$/,
            message: "Invalid Date - Please ensure date values are within their correct ranges."
   			 }`

 	Corresponds to an object within `options.rules` with the same name (`date`):

 	`"date": {
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
            }`
