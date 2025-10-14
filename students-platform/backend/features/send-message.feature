Feature: Send a Private Message
  As a Student
  I want to send a private message to another student
  So that I can communicate with them directly.

  Scenario: User sends a message successfully (Happy Path)
    Given I am logged in as a student
    And I am on the profile page of "Petra"
    When I click the "Message" button
    And I type "Hello, can you help me with my application?" into the message box
    And I click the "Send" button
    Then the message should appear in the chat window
    And the message should be stored in the conversation history.

  Scenario: User tries to send an empty message (Unhappy Path)
    Given I am logged in as a student
    And I have an open chat window with "Petra"
    When I click the "Send" button without typing a message
    Then I should see an error message telling me "Cannot send an empty message".

  Scenario: Chat service is unavailable (Unhappy Path)
    Given I am logged in as a student
    And the chat service is currently unavailable
    And I have an open chat window with "Petra"
    When I type "Hello!" and click the "Send" button
    Then I should see an error message telling me "Message could not be sent".