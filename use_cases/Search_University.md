

# Use Case: Search for Universities via API

* **ID:** UC-01
* **CRUD Type:** Read
* **Actors:** Guest, Student
* **Description:** This use case allows a user to find universities by sending a query to an external API and viewing a list of names and website.

### 1. Search for Universities via API
1.1 Brief Description
A user can search for educational institutions globally using an external API integration. By entering keywords like a university name or a specific country, the system fetches real-time data to provide the user with the institution's name and a direct link to their official website. This allows students and guests to quickly verify and access university portals without leaving the application.


### 2. Flow of Events

#### Preconditions
* The user has successfully navigated to the "Universities" search page.

#### Main Flow (Basic Path)
1.  The user enters a keyword (e.g., a university name or country) into the search bar.
2.  The user clicks the "Search" button.
3.  The system sends a request to the external **University API** with the user's keyword.
4.  The system receives a successful response from the API.
5.  The system displays a list of matching universities. Each result shows the university's **name** and a clickable link to its official **website**.
6.  The user clicks on a website link from the results list.
7.  The system opens the university's official website in a new browser tab.

#### Alternative Flows (Exceptions)
* **5a. The API returns no matching results:**
    1.  The system displays a message indicating "No results found for your query."
    2.  The use case concludes.
* **3a. The external API is unavailable or returns an error:**
    1.  The system detects the API connection failure.
    2.  The system displays a user-friendly error message, such as "Sorry, we couldn't connect to the university service. Please try again later."
    3.  The use case concludes.

 2.1 Postconditions
* **Success:** The user is viewing the official website of their chosen university in a new browser tab.
* **Failure:** The user is viewing the search page with either a "No results found" message or an API error message.



 3. Link to SRS
This use case is linked to the relevant section of the SRS

### 4. Narrative
# Feature: Search for Universities

As a Guest or Student

I want to search for universities by name or country

So that I can easily find and access their official websites

Scenario: Successful university search

Given I am on the "Universities" search page

When I enter "Oxford" in the search bar

And I press the "Search" button

Then I should see a list containing "University of Oxford"

And a link to "http://www.ox.ac.uk"

# Scenario: Search with no matches

Given I am on the "Universities" search page

When I enter "NonExistentUni123" in the search bar

And I press the "Search" button

Then I should see a message "No results found for your query"

### 5. CRUD Classification
Read: This is a pure Read operation. No data is created, updated, or deleted in the application’s local database during this process.

### 6.UI Mockup

Activity Diagram 1: (e.g., Student Search for University)
 ![Activity Diagram 1](../Visualizations/activitydiagram1.png)
---
### 7.Activity Diagram

*An activity diagram illustrating the flow: user enters data, system calls the external API, and then branches based on whether the API call was successful, returned no results, or failed.*