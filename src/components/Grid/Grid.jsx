import React, {useEffect, useState} from 'react';
import Cell from '../Cell/Cell.jsx'
import './Grid.css';


const GRID_SIZE = 50;


const Grid = () => {
 
  const [grid, setGrid] = useState(createGrid(GRID_SIZE));

  const isPerfectSquare = (x) => {
    let s = parseInt(Math.sqrt(x));
    return (s * s == x);
  }
 //known technique to find if a number is fibonacci 
  const isNumFib = (n) => {
    return isPerfectSquare(5 * n * n + 4) ||
           isPerfectSquare(5 * n * n - 4);
  }

//check if the numbers in the sequence are fibonacci
  const isFib = (arr) => {
    if (arr.every(item => item === 0)) {
      return false
    }

    for (let i=2; i < arr.length; i++) {
      if (arr[i] != arr[i - 1] + arr[i - 2]) {
        return false
      }
    }
    return true
  }

  const resetGrid = () => {
    let current = [...grid]
    for (let row=0; row < 50; row++) {
      for (let col = 0; col < 50; col++) {
        current[row][col] = 0
      }
    }
    setGrid(current)
  }

  const changeToYellow = (e) => {
    e.target.style.backgroundColor = "yellow"
    setTimeout(function () {
      e.target.style.backgroundColor = "darkslategrey"
    }, 500)

  }

  const incrementRowsAndColumns = (rowIdx, colIdx) => {
    let current = [...grid];
    current[rowIdx][colIdx] += 1;
    
    for (let row=0; row < 50; row++) {
      if (row != rowIdx) {
        current[row][colIdx] += 1
      }
    }

    for (let col = 0; col < 50; col++) {
      if (col != colIdx) {
        current[rowIdx][col] += 1
      }
    }

    setGrid(current)

  }

  const getFibonacciSequences = () => {
    let indices = []
    let current = [...grid]
    for (let r=0; r < 50; r++) {
      for (let c=2; c < 48; c++) {
        let rowSlice = current[r].slice(c - 2, c + 3)
    //if a number is fib then check its neighboring 5 elements
        if (isNumFib(current[r][c])) {
              if (isFib(rowSlice)) {
                  indices.push([r, c - 2])
                  indices.push([r, c - 1])
                  indices.push([r, c])
                  indices.push([r, c +1])
                  indices.push([r, c + 2])
            }
        }

      }
    }

    return indices
  }

  const clearFibonacciRows = (indices) => {
    let current = [...grid]
    for (let i=0; i < indices.length; i ++ ){
      let row = indices[i][0]
      let col = indices[i][1]
      //turn these columns green
      current[row][col] = 0
      let className = 'cell ' + row.toString() + '-' + col.toString()
      document.getElementsByClassName(className)[0].style.background = 'green';
      setTimeout(function () {
        document.getElementsByClassName(className)[0].style.background = 'darkslategrey' ;
      }, 500)  
    }
    setGrid(current)
  }

  const increment = (e, rowIdx, colIdx) => {
    //changes the current cell to yellow
    changeToYellow(e)
    //increment the rows and columns
    incrementRowsAndColumns(rowIdx, colIdx)    
    //find indices with the fibonacci sequence
    let indices = getFibonacciSequences()
    clearFibonacciRows(indices)

  }

 

  return (
   <>
<div className="container"> 
  <div className="heading" align="left">Fibonacci Grid</div>
  
   <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((cellValue, cellIdx) => {          
              const classN = 'cell ' + rowIdx.toString() + '-' + cellIdx.toString()
              return <Cell key= {classN} className={classN} onClick={(e) => {increment(e, rowIdx, cellIdx)}} 
              rowIdx={rowIdx} colIdx={cellIdx} cellContent={cellValue}></Cell>;
            })}
          </div>
        ))}
      </div>
      <div align="right">
        <button className="reset" onClick={() => {resetGrid()}}> Reset Grid</button>
      </div>
      </div>
    
   </>
  )
  
};

const createGrid = GRID_SIZE => {
  const grid = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    const curRow = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      curRow.push(0);
    }
    grid.push(curRow);
  }
  return grid;
};





export default Grid;