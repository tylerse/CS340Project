import { useState, useEffect } from "react";
import TableRow from '../components/TableRow';

export default function DataTable({table, onSelect}){

    const [entities, setEntities] = useState([]);

    const loadEntities = async () => {
        const response = await fetch(`/${table}`, {
            method: "GET"
        })
        const data = await response.json();
        setEntities(data)
    }


    useEffect(()=> {
        loadEntities();
    },[]);

    if (Object.keys(entities).length < 1) {
        return (
            <>
            <h4>No entries to show for this category</h4>
            </>
        )
    }
    return (
        <>
            <thead>
                {Object.keys(entities).map((header, i) => {
                    <th>
                        {header}
                    </th>
                })}
            </thead>
            <tbody id="body">
                {entities.map((row, i) => {
                    <DataRow data={row}
                            row = {i}
                            key = {i}/>
                })}
                <tr className="new-row" onClick={ () => onEdit() }>
                    <td>
                        + Add new entry
                    </td>                    
                </tr>  
            </tbody>
        </>
    )
}