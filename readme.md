JSValidator
===========


Include the `validator.js` file:

	<script src="validator.js"></script>

Instantiate the `validator` method passing in your desired options (defined below), if any.

	<script>
		validator();
	</script>


To make a field required, simply add the `required` class to the desired input.

	<input class="required" placeHolder=""/><br/>


The following input types are defined by default:

	<input class="required tel" placeHolder="tel"/><br/>
	<input class="required date" placeHolder="date"/><br/>
	<input class="required time" placeHolder="time"/><br/>
	<input class="required datetime" placeHolder="datetime"/><br/>
	<input class="required number" placeHolder="number"/><br/>
	<input class="required email" placeHolder="email"/><br/>
	<input class="required url" placeHolder="url"/><br/>
	<input class="required color" placeHolder="color"/><br/>
	<input class="required range" placeHolder="range"/><br/>
	<input class="required month" placeHolder="month"/><br/>
	<input class="required week" placeHolder="week"/><br/>
