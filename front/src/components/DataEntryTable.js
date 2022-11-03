import TableEntryRow from '../components/TableEntryRow';

export default function DataEntryTable({headers, data, onSave, entryCells, display}){

    if (Object.keys(data).length < 1) {
        return (
            <>
            <h4>No entries to show for this category</h4>
            </>
        )
    }
    return (
        <div className ={display}>
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
                        <th>Save Entry</th>
                    </tr>
                </thead>               
            
                <tbody>
                    {data.map((row, i) => 
                        <TableEntryRow
                            data={ row }
                            onSave={ onSave }
                            entryCells = { entryCells }
                            row = {i}
                            key = {i}/>
                        )
                    }                     
                </tbody>
            </table>
        </div>
    )
}