    // JavaScript code for form validation
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("myForm")
  const inputField = document.getElementById("inputField")
	// Prevent form from submitting
  form.addEventListener("submit", function (event) {
    event.preventDefault(); 
      // Retrieve the input field value
    const inputValue = inputField.value;
      // Regular expression pattern for alphanumeric input
    const regex = /^[a-zA-Z0-9]+$/;
      // Check if the input value matches the pattern
    if (regex.test(inputValue)) {
        // Valid input: display confirmation and submit the form
      alert("Success: Form submitted!");
      form.submit();
        // Invalid input: display error message
    } else {
      alert("Error: Input must be alphanumeric.");
    }
  });
});