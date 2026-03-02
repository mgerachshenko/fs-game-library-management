# Implementations Contributed by Lance 

## gameRepo - Repository
1. This repository is responsible for any data access/updating involving the games
2. I decided this logic because repositories are meant to only cover data access and updates in this architecture. It 
correctly separates from solution concerns because it doesn't have any business or presentation logic involving the addition or removal of a game from ownership
3. This implementation is made use in gameService by using functions to retrieve the games

## gameService - Service
1. This service is responsible for any business logic involving removing or adding a game from the library
2. I decided this logic because service are meant to only cover business logic, which in this case, is to decide which add/remove function to use. It correctly separates from solution concerns because it doesn't have any data access/mutation or presentation logic, only the rules in what is supposed to happen when adding or removing a game
3. This implementation is made use in useGames by using functions to fetch all games and also to be able to togglable game ownership

## useGames - Hook
1. This hook is responsible for any presentation logic involving game and error state
2. I decided this logic because hooks are meant to only cover presentation logic, which in this case, is to render the games as intended along with the function to toggle game ownership to the component it is used with. It correctly separates from solution concerns because it doesn't have any data access/mutation or business logic, only UI behaviour including managing state, storing errors, and page refreshing
3. This implementation is made use in LibraryPage by sending the necessary game props to be loaded with the game ownership filter. It is also similarly made use in StorePage but without the game ownership filter

## inputService - Service
1. This service is responsible for any business logic involving the validation of general input boxes used around the app
2. I decided this logic because service are meant to only cover business logic, which in this case, is validate if the input has enough chars. It correctly separates from solution concerns because it doesn't have any data access/mutation or presentation logic, only the rules in what is the minimum number of chars in a general user input
3. This implementation is made use in FeaturedGames for the reviews and the display name in ProfilePage by validating user input

## searchService - Service
1. This service is responsible for any business logic involving the validation of the search function
2. I decided this logic because service are meant to only cover business logic, which in this case, is validate if the search has enough chars and the category is valid. It correctly separates from solution concerns because it doesn't have any data access/mutation or presentation logic, only the rules in what is the minimum number of chars in a search input and what happens if a category is included
3. This implementation is made use in gameService by using the imported validation function when filtering games