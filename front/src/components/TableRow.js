import { useState, useEffect } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
  
 export default function TableRow({data, onSelect, onDelete, targetEntry, canDelete, row, noSelect}){

    const rowId = Math.random(0,1000) + row

    const loadTable = () => {
        const tableRow = document.getElementById(rowId);
        tableRow.className = row % 2 === 0 ? "data-row-1" : "data-row-2";
        for(let entry in data) {
            let newCell = document.createElement('td')  
            newCell.textContent = data[entry];
            noSelect ? null : newCell.addEventListener("click", () => onSelect(data))
            
            tableRow.appendChild(newCell);
            
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
 