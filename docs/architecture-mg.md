# Mikhail's Implementations
## Me and Lance's Merge

Me and Lance worked on similar files like useGames, gameService, and page components on different branches. When I merged develop into my own branch after his PR was merged, there were a lot of conflicts that I fixed by combining both implementations so that my search logic and the shared architecture structure were kept. After the merge, there is now only one version of each layer (hook, service, repository), and both pages use the same shared setup.

## GameRepository

## What does this hook/service/repository do?  
The GameRepository handles the game data. In the original version I worked on it had functions like getAll() and remove(), and in the final merged version it provides functions like fetchGames() and getGameById() to access and update the data.

## How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns?
I only put basic data access here. It doesn’t really do searching, validation, or work with UI. That way the data layer stays separate from the business logic and components.

## Where is this implementation made use of in the project and how?
It is used inside gameService. The UI does not call the repository directly.


## GameService

## What does this hook/service/repository do? 
GameService handles searching and filtering the games. It validates the search input then returns the matching results.

## How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns? 
Search and validation are business rules, so they belong in the service layer. This keeps the components pretty simple and focused only on displaying data.

## Where is this implementation made use of in the project and how? 
It is called inside the useGames hook. Both StorePage and LibraryPage rely on it through the hook.


## useGames (Custom Hook)

## What does this hook/service/repository do?  
The useGames hook stores the game state in React and connects the UI to the service layer. It gives components access to the games list and functions like search() and removeGame().

## How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns?
State management belongs in the hook not in every single page. The hook calls the service for logic so the pages don’t need to have the same code.

## Where is this implementation made use of in the project and how?
It is used in StorePage and LibraryPage. Both pages call the hook to get and adjust game data accordingly.