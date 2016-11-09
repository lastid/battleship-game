## One-sided Battleship game

[The game](https://lastid.github.io/battleship-game/), be sure to use a decent browser which can run ES6, e.g Chrome

[The unit tests](https://lastid.github.io/battleship-game/test/)

### The assumptions ###
The test description is not very clear. So here is my interpretation for ambiguous sentences.
- **One-sided Battleship game**: There is no official description of "One-sided Battleship game". I assumed that I need to show only one grid with ships visible.
- **The application should take input of the form "A5"**: It's easier to use a mouse to choose a square to shoot at. But as it states we can target a square with "input" as a string, so I create an input box to enter coordinates.

I would remove the input box, the game would look better.

### The solution ###
- There is no restriction on how the game is made, on which platforms it should work, so I choose to make a webpage using ES6. In order to make the game work in all browsers, we just need to transpile the code using Babel.
- This is a simple project, there is no need to use tools like webpack to concatenate, minify js and css files. This avoids having many dependencies. Usually, I do that on big projects.
- Models are declared in Ship.js, Grid.js, GridGenerator.js, the logic is separated from the technology web (apart from the keyword "window" in these files). Therefore, it's very easy to reuse these classes to make an interface in another technology.
- index.js creates a game and uses Renderer.js to display it using html.
- style.css uses [BEM](http://getbem.com/introduction/) methodology. Usually I use SASS to write css, but it would add some dependencies.
