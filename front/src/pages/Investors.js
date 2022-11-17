import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import Investor from '../pages/Investor.js';
import * as entities from '../scripts/entities.js'

export default function Investors() {

    const navigate = useNavigate();

    const entityName = 'Investors';
    const operandUrl = '/investor';
    const entityIdString = 'InvestorID';
    const tableHeaders = ["ID", "Name", "Birthday", "Amount Invested", "Investment Name", "Profit", "Profit Name"];

    const [edit, toggleEdit] = useState(false);
    const [entries, setEntries] = useState([]);
    const [entryData, setEntryData] = useState((input) => {return input});

     // Initial fetch of all entries
     const getEntries = async () => {
        const response = await entities.get(entityName)
        setEntries(response)       
    };

    // Delete the entry after confirmation
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
        console.log(data)
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
        }
        else {
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

    // Get entries on load
    useEffect(() => {
        getEntries();
    }, []);

    return (        
        <div className = "content">

            {edit ? <Investor data= {entryData} cancel = { toggleEdit } addNew ={ addNew } update={ update }/> : null}

            <div id="browse">
                <div className = 'browse-header'>
                    <div className='left'>
                        <p><i className="italics">&nbsp;&nbsp; Edit and/or update entries by clicking anywhere within the row.</i></p>
                    </div>
                    <div className='right'>
                        
                    </div>
                </div>
                < DataTable 
                    headers={tableHeaders}
                    data={entries} 
                    name={"entries"} 
                    onSelect={ onEdit } 
                    onDelete={ onDelete } 
                    canAddNew={ true }
                    canDelete={ true }/>
            </div>
        </div>
    )
}