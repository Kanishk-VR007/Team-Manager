# Team Manager

Team Manager is a robust Spring Boot application designed to streamline team collaboration, workload tracking, communication, and project management within software development teams.

## Core Features

### 1. User and Role Management
Users can be registered with different roles, each providing specific access rights:
- **ADMIN** / **PROJECT_MANAGER**: Have global access to project trends, epics, and creating teams.
- **TEAM_LEAD**: Manage specific teams, lead chats, and update tickets.
- **DEVELOPER** / **JUNIOR_DEV** / **INTERN**: Core team members who execute tasks.

### 2. Team Management
The system enables the creation of specific teams categorized by domains.
- A `TEAM_LEAD` or `PROJECT_MANAGER` can create and lead teams.
- **Invitations:** 
  - `INTERN`s are assigned immediately to teams.
  - `DEVELOPER`s and `JUNIOR_DEV`s receive an invitation that they must accept or reject before joining.

### 3. Task Management
Provides the capability to assign tasks to individual users with attributes such as:
- Task Name
- Start and End Times
- Completion Status

### 4. Communication and Chat
A comprehensive in-app messaging system integrated with user permissions.
- **Global Lead Chat (`/api/chat/global-leads`)**: Exclusive channel for `ADMIN`, `PROJECT_MANAGER`, and `TEAM_LEAD` to coordinate on a higher level.
- **Team Chat (`/api/chat/team/{teamId}`)**: Isolated chat environment for team members (Leads, Devs, Interns) to discuss intra-team operations.
- Messages are logged into a robust `CommunicationLog` entity with timestamps and channel categorization.

### 5. Telemetry & "AntiGravity" Workflow
A standout feature is the automated workload calculation via GitHub Webhooks.
- Receives GitHub webhook events at `/api/telemetry/github`.
- **AntiGravityService**: Processes pull request review events in the background.
  - When a user is requested for a review (`review_requested`), their `workloadScore` increases.
  - When a review or PR is `closed` or `submitted`, the score decreases.
- Helps managers easily distribute work without overburdening specific developers.

### 6. Projects and Tickets
Provides endpoints to manage higher-level goals:
- Retrieve project trends.
- Create epics.
- Create and update the status of development tickets.

## Tech Stack
- **Backend**: Java, Spring Boot 3+ (Spring Web, Spring Security, Spring Data JPA)
- **Security**: Role-based access control via `@PreAuthorize`.
- **Database**: Relational DB (e.g., PostgreSQL/MySQL) managed via Hibernate/JPA.
- **JSON Processing**: Jackson for payload parsing.

## Architecture & Structure
- **Entities**: JPA models mapping to DB tables (`Users`, `Team`, `Task`, `CommunicationLog`, `TeamInvite`, `WebhookEvent`).
- **Repositories**: Spring Data JPA repositories handling CRUD operations.
- **Services**: Business logic execution (`TeamService`, `AntiGravityService`, `CommunicationService`).
- **Controllers**: Exposing RESTful API endpoints securely.
- **DTOs**: Data Transfer Objects to maintain a clear separation of data across layers (`RegisterRequestDto`, `MessageRequestDto`, `TeamCreateRequest`).

## Getting Started

1. Clone the repository.
2. Ensure you have the `github.webhook.secret` configured in your `application.properties` or `application.yml` for webhook signature validation.
3. Build the project using Maven or Gradle.
4. Run the Spring Boot application.
5. The application endpoints will be secured, ensure your database has the requisite initial Users and Roles setup to begin testing.
