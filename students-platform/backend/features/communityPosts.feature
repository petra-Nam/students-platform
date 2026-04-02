Feature: Community Post Management
  As a verified student
  I want to create and manage discussion posts
  So that I can share my experiences with other international students.

  Background:
    Given the student is logged in
    And has navigated to the "Community Feed"

  Scenario: Create a new discussion post
    When the student clicks "New Post"
    And enters the title "How to open a blocked account?"
    And enters the body content about German banking requirements
    And clicks "Publish"
    Then the post should appear at the top of the "Community Feed"
    And the MongoDB "Posts" collection should increment by one

  Scenario: Unauthorized attempt to edit another user's post
    Given a post exists that was created by "User_A"
    And the current student is "User_B"
    When "User_B" attempts to access the "Edit" route for "User_A's" post
    Then the system should return a "403 Forbidden" error
    And the UI should display "You do not have permission to edit this post"

  Scenario: Deleting a personal post
    Given the student is viewing a post they created
    When the student clicks the "Delete" icon
    And confirms the deletion in the modal
    Then the post should be removed from the UI
    And the record should be deleted from MongoDB
