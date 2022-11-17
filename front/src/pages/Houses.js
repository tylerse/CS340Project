import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import House from '../pages/House';
import * as entities from '../scripts/entities.js'

export default function Houses() {

    const navigate = useNavigate();

    const entityName = 'Houses';
    const operandUrl = '/house';
    const entityIdString = 'HouseID';
    const tableHeaders = ["ID", "House Size", "Patio Upgrade", "Garage Upgrade"];

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
        const response = await entities.del(entityName, id)
        if(response.ok){
            entries.forEach(entry => console.log(entry[entityIdString]))
            console.log(id)
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
        if(!response.ok){
            throw new Error(`Status: ${response.status}`)
        }
        data[entityIdString] = 'TBD';
        setEntries(entries => 
          [...entries, data]
        );
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

            {edit ? <House data= {entryData} cancel = { toggleEdit } addNew ={ addNew } update={ update }/> : null}

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
                    canDelete={ true }
                    boolCells = {[2,3]}/>
            </div>
        </div>
    )
}