# Use Case: Send message

* **ID:** UC-02
* **CRUD Type:** create
* **Actors:** User ( Student)



Secondary Actor: System

### Preconditions:

The user is logged into the system.

The user has opened a chat or communication window with another user.



### Main Flow:

User types a message in the text input field.

User clicks the Send button (or presses Enter).

System validates that the message field is not empty.

System sends the message to the recipient through the chat server.

System displays the sent message in the conversation window with timestamp.

Recipient receives the message in real time.

### Alternate Flows:

4a. If there is no internet connection, the system shows an error message “Message not sent. Please try again.”

3a. If the input field is empty, system disables the Send button or displays a warning “Cannot send empty message.”

### Postconditions:

The message is stored in the database or chat log.

Both sender and recipient can view the message in their chat history.

Linked SRS Requirement:

FR-3.1: “The system shall allow users to send and receive messages in real time.”