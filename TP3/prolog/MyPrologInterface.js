class MyPrologInterface {
  constructor(address, port) {
    this.baseUrl = "http://" + address + ":" + port + "/";
  }

  getPrologRequest(requestString, onSuccess, onError) {
    var request = new XMLHttpRequest();
    request.open("GET", this.baseUrl + requestString, true);

    request.onload =
      onSuccess ||
      function (data) {
        console.log("Request successful. Reply: " + data.target.response);
      };
    request.onerror =
      onError ||
      function () {
        console.log("Error waiting for response");
      };

    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
    request.send();
  }

  genGameState(board, player) {
    return (
      "gameState([0,0]," +
      board.size +
      "," +
      board.toString() +
      "," +
      player +
      ")"
    );
  }

  /* || MOVE */
  requestMove(board, player, move) {
    // http://localhost:8081/move(gameState([0,0],2,[[0,1],[1,0]],0),[[0,0],[0,1]])
    let req =
      "move(" + this.genGameState(board, player) + "," + move.toString() + ")";
    console.log("Request: " + req);

    this.getPrologRequest(req, this.parseMove);
  }

  parseMove(data) {
    console.log(data.target.response);
  }

  /* || MOVE IF VALID */
  requestValidMove(board, player, move, onSuccess) {
    // http://localhost:8081/valid_move(gameState([0,0],2,[[0,1],[1,0]],0),[[0,0],[0,1]])
    let req =
      "valid_move(" +
      this.genGameState(board, player) +
      "," +
      player +
      "," +
      move.toString() +
      ")";
    console.log("Request: " + req);

    this.getPrologRequest(req, onSuccess);
  }

  /* || VALID MOVES */
  requestValidMoves(board, player) {
    // http://localhost:8081/get_valid_moves(gameState([0,0],2,[[0,1],[1,0]],0),0)
    let req =
      "get_valid_moves(" +
      this.genGameState(board, player) +
      "," +
      player +
      ")";
    console.log("Request: " + req);

    this.getPrologRequest(req, this.parseValidMoves);
  }

  parseValidMoves(data) {
    console.log(data.target.response.split(","));
  }
}
