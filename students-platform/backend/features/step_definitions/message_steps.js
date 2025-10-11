

import { Given, When, Then } from '@cucumber/cucumber';

// --- Shared Steps ---

Given('I am logged in as a student', function () {
  console.log('Step: I am logged in as a student');
});

Given('I have an open chat window with {string}', function (userName) {
  console.log(`Step: I have an open chat with ${userName}`);
});

// --- Happy Path Steps ---

Given('I am on the profile page of {string}', function (userName) {
  console.log(`Step: I am on the profile page of ${userName}`);
});

When('I click the {string} button', function (buttonName) {
  console.log(`Step: I click the "${buttonName}" button`);
});

When('I type {string} into the message box', function (message) {
  console.log(`Step: I type "${message}"`);
});

Then('the message should appear in the chat window', function () {
  console.log('Step: The message appears in the chat window');
});

// ADD THIS NEW STEP DEFINITION
Then('the message should be stored in the conversation history.', function () {
  console.log('Step: The message is stored in history');
});


// --- Unhappy Path Steps ---

When('I click the {string} button without typing a message', function (buttonName) {
  console.log(`Step: I click "${buttonName}" without typing`);
});

// CORRECT THIS STEP DEFINITION BY ADDING A PERIOD
Then('I should see an error message telling me {string}.', function (errorMessage) {
  console.log(`Step: I see the error message "${errorMessage}"`);
});

Given('the chat service is currently unavailable', function () {
  console.log('Step: The chat service is unavailable');
});

When('I type {string} and click the {string} button', function (message, buttonName) {
  console.log(`Step: I type "${message}" and click "${buttonName}"`);
});