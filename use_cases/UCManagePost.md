# Use-Case Specification: Manage Post | Version 1.1

## 1. Use-Case: Manage Post
### 1.1 Brief Description
This use case describes the creation, reading, updating, and deleting of posts (CRUD) in the system. Users can create posts and save them as drafts or publish them immediately. Draft posts can be edited and published at any time.

---

## 2. Flow of Events

![Post Management CRUD Diagram](../Visualizations/post_management_crud_diagram.png)

### 2.1 Basic Flow
In general, a user will create a post (either as a draft or published), view all posts, edit them as needed, and occasionally delete posts. Draft posts can be saved for later editing and published when ready.

### 2.2 Creation

The creation of a new post. The user will be asked to enter a title and the content of the post.

![Create Post Diagram](../Visualizations/create_post_activity_diagram.png)

This is what our  create post form looks like in our application:
<br>
![picture](../screenshots/create_post_UI.png)<br>



### 2.3 Edit
During editing, the user can modify the title and the content of the post.

![Edit Post Diagram](../Visualizations/edit_post_activity_diagram.png)

This is what our edit post form looks like in our application:
<br>
![picture](../screenshots/edit_a_post_UI.png)<br>


### 2.4 List
The user wants to be able to view all of their posts. Therefore, the system presents a list with all entries.

![List Post Diagram](../Visualizations/list_post_activity_diagram.png)

This is what our list posts view looks like in our application:
<br>
![picture](../screenshots/list_posts_UI.png)<br>


### 2.5 Delete
The user can delete posts. We added a button in the list page to delete an entry. To ensure the user does not accidentally delete a post, we added a modal asking for confirmation.

![Delete Post Diagram](../Visualizations/delete_post_activity_diagram.png)

This is what our delete post confirmation looks like in our application:
<br>
![picture](../screenshots/delete_post_UI.png)<br>

### 2.6 View Blogpost
This is a blogpost view:
<br>
![picture](../screenshots/view_post_UI.png)<br>

### 2.7 Draft Posts
Users can save posts as drafts before publishing them. Draft posts are not publicly visible and can be edited or published later. When creating or editing a post, the user has the option to either "Save as Draft" or "Publish". Draft posts appear in the user's post list with a distinct visual indicator showing their draft status, allowing users to continue working on them before making them public.

---

## 3. Special Requirements

### 3.1 Owning an Account
In order to create, edit, or delete a post, the user must have an account. Only if the user is authenticated, the dialog for managing posts will be visible.

---

## 4. Preconditions

### 4.1 The user has to be logged in
To ensure proper privacy and security, the user must be logged in when managing posts.

---

## 5. Postconditions

### 5.1 Create
After creating a new post, the user will be redirected to the list overview, where the new entry will be displayed.

### 5.2 Edit
After the user saves their edits, the updated post will be displayed in the list overview.

### 5.3 List
When the user requests to list all posts, the system will fetch and display all existing posts in a paginated or scrollable format.

### 5.4 Delete
After confirming the deletion in the pop up window that is shown, the post will be permanently removed and no longer displayed in the list overview.

### 5.5 Draft
When a user saves a post as a draft, it is stored in the system but not publicly visible. The draft appears in the user's post list with a draft status indicator. The user can later edit the draft and choose to publish it or keep it as a draft.