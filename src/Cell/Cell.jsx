import React, {useEffect, useState} from 'react';
import './Cell.css'
const Cell = ({className, onClick, cellContent, cellValue}) => {

  return (
   <>
   <div style={{backgroundColor:'darkslategrey'}} onClick={onClick} className={className}>{cellContent}</div>
   </>
  )
  
};




export default Cell;