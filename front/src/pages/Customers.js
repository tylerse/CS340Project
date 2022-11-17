import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import Customer from '../pages/Customer';
import * as entities from '../scripts/entities.js'

export default function Customers() {

    const navigate = useNavigate();

    const entityName = "Customers";
    const operandUrl = '/customer';
    const entityIdString = 'CustomerID';
    const tableHeaders = ["ID", "First Name", "Last Name", "Paid", "House Ordered On"];

    const [edit, toggleEdit] = useState(false);
    const [entries, setEntries] = useState([]);
    const [entryData, setEntryData] = useState((input) => {return input});
    const [modEntries, setModEntries] = useState([]);

    // Initial fetch of all entries
    const getEntries = async () => {
        const response = await entities.get(entityName)
        setEntries(response)     
        setModEntries(response);  
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
            delete data["OpenPayment"]
            data["CustomerID"] = "TBD"
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
    }

    // Get entries on load
    useEffect(() => {
        getEntries();
    }, []);

    // search functionality
    const search = async (searchEntry) => {

        // trim whitespace and split terms at whitespace into array
        const terms = searchEntry.toUpperCase().trim().split(/\s+/);

        // check if relevant fields match any terms, count number of matches.
        const mod = entries.filter(function(e) {
            let match = 0;
            terms.forEach(term => {
                match += e.CustomerFirstname.toUpperCase().includes(term) ||
                        e.CustomerLastname.toUpperCase().includes(term) ||
                        e.Paid.includes(term) ||
                        e.HouseOrdered.includes(term) ? 1 : 0;
            });

            // return entries where terms entered is equal to matches, so that e.g. first + last name both match,
            // instead of returning all matches for all terms.
            return match === terms.length ? e : null;
        });
        
        setModEntries([])
        // await setting blank array
        await new Promise(resolve => {
            resolve(setModEntries([]))
           
        });                        
        
        // set array to matches after await promise to reset table.
        setModEntries(mod.length > 0 ? mod : [])
    }

    return (        
        <div className = "content">           

            {edit ? <Customer data= {entryData} cancel = { toggleEdit } addNew ={ addNew } update={ update }/> : null}

            <div id="browse">
                <div className = 'browse-header'>
                        <div className='left'>
                            <p><i className="italics">&nbsp;&nbsp; Edit and/or update entries by clicking anywhere within the row.</i></p>
                        </div>
                        <div className='right'>
                            <input type="search" placeholder="Search..." onChange={e => search(e.target.value)}></input>
                        </div>
                    </div>
                
                < DataTable 
                    headers={tableHeaders}
                    data={modEntries} 
                    name={"entries"} 
                    onSelect={ onEdit } 
                    onDelete={ onDelete } 
                    canAddNew={ true }
                    canDelete={ true }/>
            </div>
        </div>
    )
}