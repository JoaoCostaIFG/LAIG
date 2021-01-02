# LAIG 2020/2021 - TP3 report

## Group T03-G05

| Name                        | Number    | E-Mail               |
| --------------------------- | --------- | -------------------- |
| Ana Inês Oliveira de Barros | 201806593 | up201806593@fe.up.pt |
| João de Jesus Costa         | 201806560 | up201806560@fe.up.pt |

## Necessary actions to have the complete program running

- Start and HTTP server in the directory that contains the **lib** and
  **TP3** directories, e.g.: `python -m http.server 8080`.
- Start a sicstus prolog instance and consult the file `server.pl` inside
  the **prolog** directory (inside the **TP3** directory).
- Call the `server.` predicate inside the sicstus prolog instance.

The steps above would result in the HTTP server open in 0.0.0.0:8080
and the prolog server open in 0.0.0.0:8081. The game can be accessed
in a browser supporting WebGL at the address
[**http://0.0.0.0:8080/TP3/**](http://0.0.0.0:8080/TP3/).

## Short summary of the game main rules

**Emulsion** is a board game for two players.  
The game board is a square is divided in black and white squares (pieces)
of equal size. The board can have any size the user wants. At the beginning
of the game, the pieces are organized in a checkered pattern.

Game terms:

- The **value** of a piece is the number of pieces of the same color orthogonally
  adjacent to it, plus half the number of adjacent board sides.

- The **group** of a game piece is the set of all the pieces we can reach from
  that piece with orthogonal movements only.

- The **value of a group** is the number of pieces in a given group.

- A given player's **score** is the size of his largest group.

**Black** always plays first. At the end of each player's turn, it's the other
player's turn.  
During his turn, a player can switch two pieces places (**one move**). These
pieces need to have **different colors** and be **orthogonally or diagonally
adjacent**. Furthermore, a move is only valid if the piece with the player's
color in the pair increases in **value** in its new position.

The game ends when a player has no more available moves on his turn. The winner
is the player with the **highest score**.  
In case the players are **tied**, the values of their second largest, third
largest, and so on, groups is added to their score until the time is resolved.  
In case the players are still **tied**, the winner is the player that last made
a move.

[Source.](https://boardgamegeek.com/boardgame/311851/emulsion)

For the purposes of our implementation of the game, a players that runs out
of time during his turn loses the game.

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

The Debug directory shows two toggles. The first one can be used to show some normals of the objects of the scene. The other toggle shows the scenes' lights.

### Game Move

To make a move, the player has to choose two pieces. The pieces which are available picking are marked with a green border around them. The current selected piece is mark with a pink border around it.

### Undo Move

To undo the last game move, the user can press the undo button until there are no moves to undo. 

### Scoreboard

On the scoreboard, there are informations about the current score of the players, the time and previous games. 
The current score is print in this format: "B:4 - W:7". This means that the black player has 4 points and the white player has 7 points.
This information goes along with some text below for better understanding. Next to the scores there is a timer for each player's turn. When the timer reaches 0 because no move was made, the other player wins. Once a game ends it is added to the history. The history shows the scores of the last 3 games. 

### Game Movie
To play the game's movie, the user can presse the Start Replay button. Once the button is pressed, the movie will start and the button can be pressed again to stop the replay.

