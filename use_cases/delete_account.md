
# Use Case Specification: UC- – Delete Account

## 1. Brief Description
This use case enables a registered user to delete their account. Upon deletion, all personal data (e.g., posts, comments, tracking records) is permanently erased in compliance with data privacy standards. This operation is irreversible and requires explicit confirmation.

---

## 2. Flow of Events

### 2.1 Basic Flow
1. **Navigation:** The user logs in and navigates to the **User Profile** page.
2. **Delete Account Option:** The user selects the **Delete Account** option.
3. **Confirmation Prompt:** A modal dialog appears, prompting the user to confirm deletion with a warning about the permanence of this action.
4. **Password Entry:** The user must type in their password within the confirmation modal as an extra verification step.
5. **User Confirmation:** After entering the password, the user clicks **"Yes, Delete My Account."**
6. **System Validation:** The system (Application Tier) verifies the user’s authentication and checks that the entered password is correct.
7. **Data Removal:** The system deletes the user account and all associated data from the **Data Tier (MongoDB)**.
8. **Logout and Redirect:** The user is logged out, shown a confirmation message, and redirected to the homepage.

### 2.2 Activity Diagram
![Figure 3.3: delte account](../Visualizations/UCDeleteAccount.drawio.svg)
### 2.3 Alternate Flow: User Cancels Deletion
1. In the confirmation modal, the user clicks **"No, Cancel."**
2. The deletion process is aborted.
3. The user is returned to the **Account Settings** page with no changes made to their data or account status.

---

## 3. Narrative Feature (User Story & Scenarios)

**Feature:** Delete Account  
**As a** registered user  
**I want to** delete my account  
**So that** my data is permanently removed from the application

### Scenario: Open account deletion page
* **Given** I am logged in
* **And** I am on the **"User Profile"** page
* **When** I click the **"Delete Account"** button
* **Then** a confirmation modal appears

### Scenario: Enter password and confirm deletion
* **Given** the confirmation modal is open
* **When** I enter my password in the **"Password"** field
* **And** I click the **"Yes, Delete My Account"** button
* **Then** I receive a **"Your account has been successfully deleted"** message
* **And** I am logged out
* **And** I am redirected to the homepage

---

## 4. Preconditions
| ID | Requirement |
| :--- | :--- |
| **Authentication** | The user is logged into their account and authenticated. |
| **Access** | The user is on the **User Profile** page where the Delete Account option is accessible. |
| **Connectivity** | The system is connected to backend services to validate credentials. |
| **UI Readiness** | The confirmation modal and its elements (password field, buttons) load correctly. |

## 5. Postconditions
| Outcome | Description |
| :--- | :--- |
| **Account Deletion** | The user account and all associated data are permanently removed. |
| **Compliance** | All user-related data is erased in compliance with data privacy regulations. |
| **User Logout** | The user is automatically logged out and all active sessions are terminated. |
| **Security** | Any tokens or cookies associated with the deleted account are rendered invalid. |

---

## 6. Exceptions & Error Handling
* **System Failure:** If a server or network issue occurs, an error message is displayed. No data is deleted.
* **Invalid Password:** If the user enters an incorrect password, the system prompts for a re-entry.
* **Database Error:** If an error occurs during the deletion of records, the system informs the user and keeps the account intact.

## 7. Link to SRS (Traceability)
This use case aligns with the **Software Requirements Specification (SRS)**:
* **Section 3.1.4 (Functionality):** Defines permanent removal of user data.
* **Section 3.2 (Usability - Security):** Addresses identity verification measures.
* **Section 3.3 (Reliability):** Ensures system uptime and data integrity.

## 8. CRUD Classification
* **Operation:** **DELETE**
* **Description:** This use case handles the permanent removal of the user entity and all related data records.
