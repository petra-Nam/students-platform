import { Given, When, Then } from '@cucumber/cucumber';

Given('I am on the university search page', function () {
  // For now, this is enough to prove the step is connected.
  console.log('Step: Navigating to the university search page...');
  
});

When('I enter {string} into the search bar and click {string}', function (universityName, buttonName) {
  console.log(`Step: Entering "${universityName}" into the search bar and clicking "${buttonName}"`);
  // Simulate entering the university name and clicking the search button
  this.searchQuery = universityName;
});

Then('the system should call the external University API', function () {
  console.log('Step: Calling the external University API...');
  // Simulate an API call
  this.apiCalled = true;
});

Then('I should see a list containing {string} and its website link.', function (universityName) {
  console.log(`Step: Displaying results for "${universityName}"`);
  // Simulate displaying results
  this.results = [{ name: universityName, website: 'https://example.com' }];
});

Then('I should see a {string} message.', function (message) {
  console.log(`Step: Displaying message "${message}"`);
  // Simulate displaying a message
  this.message = message;
});

Given('the external University API is unavailable', function () {
  console.log('Step: Simulating API unavailability...');
  // Simulate API being unavailable
  this.apiAvailable = false;
});

Then('I should see a {string} error message.', function (errorMessage) {
  console.log(`Step: Displaying error message "${errorMessage}"`);
  // Simulate displaying an error message
  this.errorMessage = errorMessage;
});