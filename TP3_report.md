# LAIG 2020/2021 - TP3 report

## Group T03-G05

| Name                        | Number    | E-Mail               |
| --------------------------- | --------- | -------------------- |
| Ana Inês Oliveira de Barros | 201806593 | up201806593@fe.up.pt |
| João de Jesus Costa         | 201806560 | up201806560@fe.up.pt |

## Necessary actions to have the complete program running

## Short summary of the game main rules

## User instructions

### Setup and Start New Game

Before starting a new game, the user can change the game options that will affect the gameplay. Here is a list of the setup:

- Difficulty - Easy / Medium / Hard
- Game Mode - PvP / PvAI / AIvP / AIvAI
- Board Size

Both the difficulty and the game mode can be changed by pressing the buttons on the scoreboard. The board size is a number input on the interface in the Game directory.

Once everything is setup, pressing the New Game button will start the game. 

### Theme 

The game can be played in two different themes that we have created. The user is able to switch between these, at any point in the game, in the dropdown in the Game directory. 

### Lights

In the Lights directory, there are some light toggles. There is one toggle for each light in the scene. By pressing the toggles, the user will turn off/on a light.

### Cameras

Below the Lights directory, there is a dropdown to select a camera. 
On the top, the resetCamera button resets the current camera's position to its default position. 

### Extras 

The Debug directory shows two toggles. The first one can be used to show some normals of the objects of the scene. The other toggle, shows the scenes lights.


### Game Move

To make a move, the player has to choose two pieces to swap with eachother. The pieces which are available for swapping are marked with a green border around them. After the first piece is selected, this piece will be marked with a pink border. The rest of the pickable pieces which the first piece can swap with are marked with the green border. Once the pieces are picked, the move animation will play. 

### Undo Move

To undo the last game move, the user can press the undo button until there are no moves to undo. 

### Scoreboard

On the scoreboard, there are informations about the current score of the players, the time and previous games. 
The current score is print in this format: "B:4 - W:7". This means that the black player has 4 points and the white player has 7 points.
This information goes along with some text below for better understanding. Next to the scores there is a timer for each player's turn. When the timer reaches 0 there is a timeout and the other player wins. Once a game ends it is added to the history. The history shows the scores of the last 3 games. 

### Game Movie
To play the game's movie, the user can presse the Start Replay button. Once the button is pressed, the movie will start and the button can be pressed again to stop the replay.

