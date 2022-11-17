import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import Employee from '../pages/Employee';
import * as entities from '../scripts/entities.js'

export default function Employees() {

    const navigate = useNavigate();

    const entityName = 'Employees';
    const operandUrl = '/employee';
    const entityIdString = 'EmployeeID';
    const tableHeaders = ["ID", "First Name", "Last Name", "Salary", "Birthday", "Insurance", "Date Employed"];

    const [edit, toggleEdit] = useState(false);
    const [entries, setEntries] = useState([]);
    const [entryData, setEntryData] = useState((input) => {return input});

    // Initial fetch of all entries
    const getEntries = async () => {
        const response = await entities.get(entityName)
        setEntries(response)       
    };

    // Toggle the deletion confirmation dialog.
    const onDelete = async (entry) => {
        const id = entry[entityIdString];
        if(id === 'TBD') {
            alert("New data requires a page refresh before deletion is available.")
            navigate(0);
        }
        try {
            await entities.del(entityName, id)            
        }
        catch (err){
            console.log(err)
        }
        finally {
            entries.forEach(entry => console.log(entry[entityIdString]))
            setEntries(entries.filter(entry => entry[entityIdString] !== id))
        }
    }

    const onEdit = (data) => {
        setEntryData(data)
        toggleEdit(true)
    }

    const addNew = async (data) => {
        const response = await fetch(operandUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }        
        })
        if(response.ok){
            data[entityIdString] = 'TBD';
            setEntries(entries => 
                [...entries, data]
            );            
        } else {
            throw new Error(`Status: ${response.status}`)
        }    
    }

    // Submit updated information for entries
    const update = async (data) => {
        await entities.put(entityName, data[entityIdString], data); 
        const current = entries;
        current.forEach(entry => {
            entry = entry[entityIdString] === data[entityIdString] ? data : entry
        })
        setEntries(current);
        navigate(0);
    }

    useEffect(() => {
        getEntries();
    }, []);

    return (        
        <div className = "content">

            {edit ? <Employee data= {entryData} cancel = { toggleEdit } addNew ={ addNew } update={ update }/> : null}

            <div id="browse">
                <p><strong>Employee</strong></p>
                < DataTable 
                    headers={tableHeaders}
                    data={entries} 
                    name={"entries"} 
                    onSelect={ onEdit } 
                    onDelete={ onDelete } 
                    canAddNew={ true }
                    canDelete={ true }/>
                <p>&nbsp;</p>
            </div>
        </div>
    )
}