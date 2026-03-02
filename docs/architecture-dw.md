# Architecture Contributions (Sprint 3)

## UserProfileRepository – Repository

This repository is responsible for all data access related to user profiles. It stores the test data and provides methods such as getAll(), getById(), and update() to manage profile data.  
Repositories should only handle data access. I did not include validation, UI logic, or React state here. This keeps the data layer separate.
It is used inside UserProfileService. Components and hooks do not call the repository directly.

## UserProfileService – Service

This service handles business logic related to user profiles. It retrieves profiles and updates display name, bio, and avatar.  
Business rules such as trimming bio input and controlling what fields can be updated belong in the service layer. The service does not manage React state or render UI.  
It is used inside the useUserProfile hook. The hook calls service methods to update data.

## useUserProfile – Hook

This hook manages profile state. It stores profile data in React state and exposes a saveProfile function to update it.  
Hooks should manage logic and state. This hook does not contain business rules or data access logic. Instead, it calls the service layer.  
It is used in ProfileProvider, which wraps the app and shares profile state through Context.

## ProfileContext & ProfileProvider – Shared Page State Refactor

ProfileProvider shares profile state across multiple pages using React Context. This removes prop drilling for displayName.  
Sprint 3 required refactoring shared state to use the hook-service-repository pattern. I moved profile state into useUserProfile and exposed it through Context instead of storing it in App.tsx.  
App.tsx is wrapped in ProfileProvider. HeaderUser, ProfilePage, and other components access profile data using useContext.

## ProfilePage

ProfilePage is the UI for editing user profiles. It shows profile preview and allows editing displayName, bio, and avatar with Save/Cancel buttons.  
The component handles UI state (draft values and button disabling). Business validation logic is handled through generalInputService and service methods. This prevents invalid data from reaching the repository layer.  
It is rendered at the /profile route and uses ProfileContext to access and update profile data.

## generalInputService – Service

This service was originally created by Lance. It validates general text input by checking a minimum length and returning an `isValid` flag with error messages.

I integrated this service into multiple components and adjusted the UI to support it:

- **ProfilePage (Bio validation)**  
  I imported `generalInputService` into ProfilePage and used it to validate the draft bio input before allowing the user to save changes.  
  I modified the component to:
    - Disable the Save button when the bio does not meet the minimum length requirement
    - Display an error message in real time
    - Prevent invalid data from being sent to the service layer

- **FeaturedGames (Review validation)**  
  I refactored the review form to use `generalInputService` instead of manual length checks.  
  I updated the component to:
    - Validate review input in real time
    - Disable the submit button if the review is invalid
    - Display validation feedback in the UI
    - Prevent invalid reviews from being added

These changes required restructuring the review form logic and modifying state handling to align with the validation service. This ensures consistent business rule enforcement across different features.

## Team Refactor Contributions

During Sprint 3, I made the following architectural refactor contributions:

- Refactored the Profile feature to follow the Hook → Service → Repository pattern
- Created and integrated `userProfiles.testdata`, `ProfileContext`, `ProfileProvider`, `UserProfile`, `UserProfileRepo`, `UserProfileService`, and `useUserProfile`
- Implemented ProfileContext and ProfileProvider to remove prop drilling for displayName
- Wrapped the application in ProfileProvider inside App.tsx
- Adjusted HeaderUser to consume shared profile state using Context
- Refactored ProfilePage to use a Save-based update pattern instead of immediate state mutation
- Integrated `generalInputService` into ProfilePage and FeaturedGames to ensure validation logic is centralized
- Updated UI logic in both ProfilePage and FeaturedGames to properly handle validation, error display, and button disabling

After these changes, the Profile feature now follows the same architectural structure: Repository → Service → Hook → Component
