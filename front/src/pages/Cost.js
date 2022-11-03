import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DataTable from '../components/DataTable';
import DataEntryTable from '../components/DataEntryTable';
import * as entities from '../scripts/entities.js'

export default function Cost({data, cancel, addNew, update}){

    const [CostID, setCostID] = useState(data !== undefined ? data["CostID"] : "");
    const [CostDescription, setCostDescription] = useState(data !== undefined ?  data["CostDescription"] : "");

    // Related data

    const [newData, setNewData] = useState();

    const constructObj = () => {
        const cost = {
            "CostID" : CostID,
            "CostDescription" : CostDescription,
        }
        cancel(false);
        return cost;
    }

    const get = async (type) => {
        const result = await entities.get(type, null);
        return result;
    }

    useEffect(() => {
        if(data === undefined) setNewData(true)
    }, [])

    return (
        <div className="overlay">
            <form id="addCost">
                <legend><h3>{ newData ? "Add Cost" : "Edit Cost"}</h3></legend>

                <fieldset className="fields">
                    <label> Cost Description </label> 
                        <input type="text" name="FirstName" value={CostDescription} onChange={e => setCostDescription(e.target.value)}/>
                    <br />
                    <br/><br/>
                    { newData ? <input className="submit" type="button" value="Add New Cost" onClick={ () => { 
                                                                                                            addNew(constructObj())
                                                                                                            cancel(false) }}/> :
                                <input className="submit" type="button" value="Update Cost Information" onClick={ () => {
                                                                                                                    update(constructObj()) 
                                                                                                                    cancel(false)}}/> } 
                    
                    <input className="cancel" type="button" value="Cancel / Close Window" onClick={ () => cancel(false) }/>
                
                </fieldset>

                <div>               
                </div>
            </form> 
        </div>
    )    
}