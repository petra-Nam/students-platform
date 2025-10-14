

Feature: University Search via API
  As a User
  I want to search for universities
  So that I can find their official websites.

  Scenario: User finds universities successfully (Happy Path)
    Given I am on the university search page
    When I enter "Technical University of Munich" into the search bar and click "Search"
    Then the system should call the external University API
    And I should see a list containing "Technical University of Munich" and its website link.

  Scenario: User searches for a university that does not exist (Unhappy Path)
    Given I am on the university search page
    When I enter "University of Atlantis" into the search bar and click "Search"
    Then the system should call the external University API
    And I should see a "No results found" message.

  Scenario: The external API is down (Unhappy Path)
    Given the external University API is unavailable
    And I am on the university search page
    When I enter "Any University" into the search bar and click "Search"
    Then I should see a "service is unavailable" error message.
    