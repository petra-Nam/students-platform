Feature: User Authentication and Authorization
  As a new international student
  I want to create an account and log in
  So that I can save my favorite scholarships and track my applications.

  Scenario: Successful registration with valid data
    Given the student is on the "Sign Up" page
    When the student enters a unique email "testuser@university.edu"
    And enters a strong password "Pass123!@#"
    And clicks the "Register" button
    Then a new user record should be created in the MongoDB "Users" collection
    And the student should be redirected to the "Onboarding" page

  Scenario: Failed login with incorrect credentials
    Given an account exists for "student@example.com"
    And the student is on the "Login" page
    When the student enters "student@example.com"
    And enters the wrong password "wrongpassword123"
    And clicks "Login"
    Then the system should display an error "Invalid email or password"
    And no JWT token should be issued to the browser
