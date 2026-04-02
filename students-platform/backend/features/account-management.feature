Feature: Secure Account Deletion
  As a user concerned about data privacy
  I want to be able to delete my account permanently
  So that my personal data is removed from the ISC platform.

  Scenario: Successful account deletion
    Given the student is on the "Settings" page
    When the student clicks the "Delete Account" button
    And confirms the action by entering their password
    Then the user's data should be removed from the MongoDB "Users" collection
    And the student should be redirected to the "Landing Page"
    And their JWT token should be invalidated

  Scenario: Incorrect password during deletion
    Given the student is on the "Delete Confirmation" modal
    When the student enters an incorrect password
    And clicks "Confirm Deletion"
    Then the system should display an error "Invalid password. Account not deleted."
    And the account must remain active in the database
