# Software Architecture Document (SAD)

## Table of Contents
- [1. Introduction](#1-introduction)
- [2. Architectural Pattern Explanation](#2-architectural-pattern-explanation-item-9)
- [3. Technology Mapping to Pattern](#3-technology-mapping-to-pattern-item-10)
- [4. Overall Use Case Diagram (Context)](#4-overall-use-case-diagram-item-11)
- [5. N/A](#5-na-item-12)
- [5.1 High-Level Request Flow Diagram](#51-high-level-request-flow-diagram-item-13)
- [5.2 Class Diagram](#52-class-diagram-item-14)
- [6. N/A](#6-na-item-15)
- [7. Deployment Diagram](#7-deployment-diagram-item-16)
- [8. N/A](#8-na-item-17)
- [9. Data and Class Models](#9-data-and-class-models-item-18--week-8)
  - [9.1 Database Model (ERD)](#91-database-model-erd)
  - [9.2 Tool-Generated Class Diagram](#92-tool-generated-class-diagram)
- [10-11. N/A](#10-11-na-item-19)

---

## 1. Introduction

This document describes the high-level architecture of the International Student Compass. It outlines the architectural patterns, technologies, and design diagrams that show **HOW** the system is built. This document is separate from the **Software Requirements Specification (SRS)**, which describes **WHAT** the system must do.

## 2. Architectural Pattern Explanation 

Our application follows a **decoupled architecture**, separating the frontend client (running in the user's browser) from the backend API server. While not a strict, traditional Model-View-Controller (MVC) pattern, the components map conceptually as follows:

* **View:** Handled by the **Vue.js** frontend application. This layer is responsible for rendering the user interface, displaying data, and capturing user interactions.
* **Controller:** Primarily handled by the **Node.js/Express.js** backend API. This layer receives incoming HTTP requests from the frontend, executes the relevant business logic, interacts with the Model layer, and formulates the HTTP response.
* **Model:** This layer is represented by our **Mongoose schemas and models**, which define the structure and validation rules for our data and handle all interactions with the **MongoDB** database.

## 3. Technology Mapping to Pattern 

The specific technologies implementing the layers described above are:

* **View Tool:** Vue.js (using the Nuxt.js framework)
* **Controller Tool:** Express.js (running on the Node.js runtime)
* **Model Tool:** Mongoose ODM (for MongoDB)

## 4. Overall Use Case Diagram 

This diagram from our SRS is included for context, showing the high-level interactions the architecture must support.

![Overall Use Case Diagram](./use-caseDiagram.png)

## 5. N/A (Item #12)

Not Applicable.

## 5.1 High-Level Request Flow Diagram 

This diagram illustrates the typical sequence of events when a user interacts with the frontend, triggering a request that flows through the entire system.
https://drive.google.com/file/d/1O7Y1TzOtIZfXdbC4Q2rWdp2758wTn7gv/preview

![High-Level Request Flow](./request-flow.png)

## 5.2 Class Diagram 
https://drive.google.com/file/d/1iuX_OJVoVvh_0k8iubLss9deJxeDZwXz/view?usp=sharing



## 6. N/A 

Not Applicable.

## 7. Deployment Diagram 

This UML Deployment Diagram illustrates the physical or virtual nodes where our application components are deployed and the communication paths between them.

*(**Action:** Embed the UML Deployment Diagram you already created)*

![UML Deployment Diagram](./deployment-diagram.png)

## 8. N/A 

Not Applicable.

## 9. Data and Class Models 

This section contains the detailed, tool-generated diagrams for our database and our backend code structure.

### 9.1 Database Model (ERD)

This Entity-Relationship Diagram illustrates the main data collections within our MongoDB database and the conceptual relationships between them.

https://app.diagrams.net/#G1CxaKFfJ6WQnAWIj9-s9FSWNXsZm6ASJx#%7B%22pageId%22%3A%222ljwPO8fNcJzTJ80mE60%22%7D

![Database ERD](./database-erd.png)

### 9.2 Tool-Generated Class Diagram

This diagram was generated using `dependency-cruiser` and `Graphviz` to analyze our TypeScript backend (`/src`) folder. It shows the module/file structure and dependencies of our code, which represents our "Class Diagram" for a TypeScript project.



![Tool-Generated Class Diagram](./
