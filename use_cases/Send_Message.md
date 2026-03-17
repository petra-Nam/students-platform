### Use Case: Send Real-Time Message

## 1 Brief Description
A logged-in user can send a text-based message to another user within a chat interface. The system ensures the message is validated, transmitted via the chat server, stored for history, and delivered to the recipient in real time.

## 2. Basic Flow
1. The user navigates to a specific conversation or selects a contact to message.

2. The user types a message into the text input field.

3. The user clicks the "Send" icon or presses the Enter key.

4. The system validates that the input is not empty or composed solely of whitespace.

5. The system generates a unique message ID and attaches a UTC timestamp.

6. The system transmits the message to the backend chat server.

7. The system stores the message in the database (linked to both Sender and Recipient IDs).

8. The system updates the sender’s UI to show the message in the conversation thread.

9. The system pushes the message to the recipient's active session via a WebSocket or similar protocol.

# 2.1 Activity Diagram
# 2.2 Mock-up
Bottom Bar: A persistent text input area with a "Type a message..." placeholder.

Right Side: A blue "Send" button or paper plane icon.

Chat Window: A scrollable area where messages appear in "bubbles" (sender on the right, recipient on the left).

# 2.3 Alternate Flows
A. Empty Input (Step 4):

If the user attempts to send an empty message, the system prevents the action and may briefly highlight the input field in red.

B. Connection Interruption (Step 6):

If the message fails to reach the server due to a network drop, the system displays a "Failed to send" icon (usually a red exclamation mark) next to the message and offers a "Retry" option.

C. Recipient Offline:

If the recipient is not currently online, the system stores the message in the database and sends a push notification (if enabled) to the recipient's device.

# 2.4 Narrative
Feature: Real-time Messaging

As a logged-in student
I want to send a message to my peer
So that we can collaborate on our coursework

Scenario: Successfully sending a message

Given I am in a chat window with "User B"

When I enter "Hello, did you finish the assignment?"

And I press the "Send" button

Then the message should appear in my chat bubbles with a timestamp

And "User B" should receive the message instantly

## 3. Preconditions
Authentication: The user must be successfully logged into a valid account.

Session: An active WebSocket or server-sent events (SSE) connection must be established.

Recipient Selection: A valid recipient must be selected to provide a target for the message.

## 4. Postconditions
Persistence: The message is permanently recorded in the messages table of the database.

UI Sync: The conversation history for both users is updated to include the new message.

Read Status: The message status is set to "Sent" (and later "Delivered" or "Read" once the recipient’s client acknowledges it).

## 5. Exceptions
Message Size Limit: If the message exceeds a specific character limit (e.g., 2000 characters), the system prevents sending and notifies the user.

Blocked User: If the recipient has blocked the sender, the system may allow the sender to "send" the message but will not deliver it or store it for the recipient.

## 6. Link to SRS
FR-3.1: Real-time communication requirements.

FR-3.2: Data persistence for chat history.

## 7. CRUD Classification
Create: This use case creates a new entry in the messaging database.