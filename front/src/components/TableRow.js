import { useState, useEffect } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
  
 export default function TableRow({data, onSelect, onDelete, targetEntry, canDelete, row, noSelect, boolCells}){

    const rowId = Math.random(0,1000) + row

    const loadTable = () => {
        const tableRow = document.getElementById(rowId);
        tableRow.className = row % 2 === 0 ? "data-row-1" : "data-row-2";
        let i = 0;
        for(let entry in data) {
            let newCell = document.createElement('td')  
            
            let text = (boolCells !== undefined && boolCells.includes(i)) ? data[entry] === 0 ? "No" : "Yes" : data[entry]
            newCell.textContent = text;
            
            if(!noSelect) newCell.addEventListener("click", () => onSelect(data))
            
            tableRow.appendChild(newCell);
            i++;
        };
            if(canDelete){
                let newCell = document.createElement('td')            
                newCell.textContent = "DELETE";  
                newCell.className = "delete";
                newCell.addEventListener("click", () => {
                    targetEntry(data);
                    onDelete(true)
                });
                tableRow.appendChild(newCell);
            }            
    }    
    
    useEffect(() => {
        loadTable();
    }, []);

    return (
        <>
            
            <tr id={ rowId }>
            </tr>
        </>        
    )
 }
 