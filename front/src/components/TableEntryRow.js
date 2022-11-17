import { useRef, useEffect } from "react";
  
 export default function TableRow({data, onSave, entryCells, row}){

    const total = useRef(0);

    const rowId = Math.random(0,1000) + row
    const loadTable = () => {
        const tableRow = document.getElementById(rowId);
        tableRow.className = row % 2 === 0 ? "data-row-1" : "data-row-2";
        for(let entry in data) {    
            // Data cells
            let newCell = document.createElement('td')  
            newCell.textContent = data[entry];
            tableRow.appendChild(newCell);               
        }         
        
            // Text entry box
            let newCell = document.createElement('td')  
            let newInput = document.createElement("input")
            newInput.addEventListener("input", (e) => { total.current = e.target.value;
                                                        console.log(e.target.value)
                                                        console.log(total)
                                                        })
            newCell.appendChild(newInput);
            tableRow.appendChild(newCell);  
            
        
            // Save entry select
            if(onSave !== undefined){
                let newCell = document.createElement('td')            
                newCell.textContent = "Save";  
                newCell.className = "save";
                newCell.addEventListener("click", () => {
                    onSave(data, total.current);
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
 