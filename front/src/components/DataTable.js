import { useEffect, useState } from "react";
import TableRow from '../components/TableRow';
import ConfirmationDialog from "./ConfirmationDialog";

export default function DataTable({headers, data, onSelect, onDelete, canAddNew, canDelete, display, noSelect, closeWindow, onSave}){

    const [confirm, setConfirm] = useState(false);
    const [targetEntry, setTargetEntry] = useState({});
    const [refresh, setRefresh] = useState(false);

    const confirmDelete = () => {
        onDelete(targetEntry)
        setConfirm(false);
    }

    useEffect(() => {
        setRefresh(refresh => !refresh);
    }, [data])

    if (Object.keys(data).length < 1) {
        return (
            <>
            <h4>No entries to show for this category</h4>
            <table>          
                {canAddNew ? <tbody>
                                <tr className="new-row" onClick={ () => onSelect() }>
                                    <td>
                                        + Add new entry
                                    </td>                    
                                </tr>  
                            </tbody>
                            :
                            null}
                
            </table>
            </>
        )
    }
    return (
        <div className ={display}>
            {confirm ? <ConfirmationDialog 
            cancel={ setConfirm } 
            confirm={ confirmDelete } />
            : null }
            <table>
                <thead>
                    <tr>
                        { headers !== undefined ? headers.map((header, i) => {
                            return(
                                <th key={i}> {header}

                                </th>
                            )
                            
                        }):
                        null}
                        {canDelete ? <th>Delete Entry</th> : null}
                    </tr>
                </thead>               
            
                <tbody>
                    {data.map((row, i) => 
                        <TableRow
                            data={ row }
                            onDelete={ setConfirm }
                            targetEntry= { setTargetEntry }
                            onSelect={ onSelect }
                            canDelete={ canDelete }
                            row = {i}
                            noSelect={noSelect}
                            key = {i}/>
                        )
                    } 
                    { canAddNew ? <tr className="new-row" onClick={ () => onSelect() } >
                        <td colSpan={headers.length + (canDelete ? 1 : 0)}>
                            + Add new entry
                        </td>  
                                 
                    </tr> :
                    null  }

                    { closeWindow !== undefined ? 
                    <tr onClick={ () => closeWindow(false) } className="delete">
                        <td colSpan={headers.length + (onSave !== undefined ? 1 : 0)}>
                            Close Window
                        </td>

                    </tr>
                    :
                    null }          
                    
                </tbody>
            </table>
        </div>
    )
}