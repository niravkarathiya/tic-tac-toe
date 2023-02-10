import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  matrix: any[] = [];
  activePalyer = "O";
  isGameOver = false;
  counter = 0;


  ngOnInit() {
    let column: any[] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        column.push({ 'player': null });
      }
      this.matrix.push(column);
      column = [];
    }
  }

  changePlayer(cell: any) {
    this.counter++;
    cell.player = this.activePalyer;
    this.activePalyer = this.activePalyer === "X" ? "O" : "X";
    this.checkForGameEnd();
  }

  restartGame() {
    this.isGameOver = false;
    this.counter = 0;
    this.activePalyer = 'O';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.matrix[i][j].player = null;
      }
    }
  }

  findMatch(cell1: any, cell2: any, cell3: any) {
    return cell1.player == cell2.player && cell1.player == cell3.player && cell1.player !== null;
  }

  checkForGameEnd() {
    let row = this.findMatch(this.matrix[0][0], this.matrix[0][1], this.matrix[0][2])
      || this.findMatch(this.matrix[1][0], this.matrix[1][1], this.matrix[1][2])
      || this.findMatch(this.matrix[2][0], this.matrix[2][1], this.matrix[2][2]);

    let column = this.findMatch(this.matrix[0][0], this.matrix[1][0], this.matrix[2][0])
      || this.findMatch(this.matrix[0][1], this.matrix[1][1], this.matrix[2][1])
      || this.findMatch(this.matrix[0][2], this.matrix[1][2], this.matrix[2][2]);

    let cross = this.findMatch(this.matrix[0][0], this.matrix[1][1], this.matrix[2][2])
      || this.findMatch(this.matrix[0][2], this.matrix[1][1], this.matrix[2][0]);

    this.isGameOver = row || column || cross;
    if (this.isGameOver) {
      this.activePalyer = this.activePalyer == 'X' ? 'O' : 'X';
    }
  }
}

