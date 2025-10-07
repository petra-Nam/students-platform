

# Use Case: Search for Universities via API

* **ID:** UC-01
* **CRUD Type:** Read
* **Actors:** Guest, Student
* **Description:** This use case allows a user to find universities by sending a query to an external API and viewing a list of names and websites.


### Flow of Events
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

#### Postconditions
* **Success:** The user is viewing the official website of their chosen university in a new browser tab.
* **Failure:** The user is viewing the search page with either a "No results found" message or an API error message.

---
### UI Mockup

*A wireframe of the search page showing a single search bar, a "Search" button, and a results area designed to list university names alongside their corresponding website links.*

---
### Activity Diagram

*An activity diagram illustrating the flow: user enters data, system calls the external API, and then branches based on whether the API call was successful, returned no results, or failed.*