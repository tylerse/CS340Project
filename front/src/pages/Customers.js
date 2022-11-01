import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import Customer from '../pages/Customer';

export default function Customers() {

    const navigate = useNavigate();

    const fetchUrl = '/customers';
    const operandUrl = '/customer';
    const entityIdString = 'CustomerID';

    const [edit, toggleEdit] = useState(false);
    const [entries, setEntries] = useState([]);
    const [entryData, setEntryData] = useState((input) => {return input});

    // Initial fetch of all entries
    const getEntries = async () => {
        await fetch(fetchUrl)
        .then(response => response.json())
        .then(data => {
            setEntries(data);
        })
        .catch(
            setEntries["No Data Available"]
        )       
    };

    // Toggle the deletion confirmation dialog.
    const onDelete = async (entry) => {
        const id = entry[entityIdString];
        console.log(operandUrl + "/" + id)
        const response = await fetch(operandUrl + "/" + id, {
            method: 'DELETE',
            body: JSON.stringify({id:id}),
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        })
        if(response.ok){
            entries.forEach(entry => console.log(entry[entityIdString]))
            console.log(id)
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
        if(!response.ok){
            throw new Error(`Status: ${response.status}`)
        }
 
        let current = entries;
        current.push(data)  
        setEntries(current);
        navigate(0);
    }

    // Submit updated information for entries
    const update = async (data) => {
        const response = await fetch(operandUrl + "/" + data[entityIdString], {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }        
        })

        if(!response.ok){
            throw new Error(`Status: ${response.status}`)
        }
 
        const current = entries;
        current.forEach(entry => {
            entry = entry[entityIdString] === data[entityIdString] ? data : entry
        })
        setEntries(current);
    }

    useEffect(() => {
        getEntries();
    }, []);

    return (        
        <div className = "content">

            {edit ? <Customer data= {entryData} cancel = { toggleEdit } addNew ={ addNew } update={ update }/> : null}

            <div id="browse">
                <p><strong>Customers</strong></p>
                < DataTable 
                    headers={["ID", "First Name", "Last Name", "Open Payment", "Paid", "House Ordered On"]}
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