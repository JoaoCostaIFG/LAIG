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
