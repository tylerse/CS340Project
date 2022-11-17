import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DataTable from '../components/DataTable';
import DataEntryTable from '../components/DataEntryTable';
import * as entities from '../scripts/entities.js'

export default function House({data, cancel, addNew, update}){

    const [HouseID, setHouseID] = useState(data !== undefined ? data["HouseID"] : "");
    const [HouseSize, setHouseSize] = useState(data !== undefined ?  data["HouseSize"] : "");
    const [PatioUpgrade, setPatioUpgrade] = useState( data !== undefined ? data["PatioUpgrade"] : "");
    const [GarageUpgrade, setGarageUpgrade] = useState( data !== undefined ? data["GarageUpgrade"] : "");
    const [OpenPayment, setOpenPayment] = useState()

    // Related data
    const [E1, setE1] = useState([]);
    const [E2, setE2] = useState([]);
    const [edit, setEdit] = useState(false);
    const [edit2, setEdit2] = useState(false);
    const [allEntries, setAllEntries] = useState([]);
    const [allEntries2, setAllEntries2] = useState([]);
    const [newData, setNewData] = useState(data === undefined);

    const constructObj = () => {
        const entity = {
            "HouseID" : HouseID,
            "HouseSize" : HouseSize,
            "PatioUpgrade" : PatioUpgrade,
            "GarageUpgrade" : GarageUpgrade,
        }
        cancel(false);
        return entity;
    }

    const get = async (type) => {
        const result = await entities.get(type, null);
        return result;
    }

    const loadRelatedEntities = async () => {            
        let result = await entities.get("CustomerHouses", `HouseID=${HouseID}`);
        setE1(result);

        result = await entities.get("HouseCosts", `HouseID=${HouseID}`);
        let openPayments = 0;
        for(let i = 0; i < result.length; i++){
            console.log(result[i])
            openPayments += parseInt(result[i].Total);
        }
        setOpenPayment(openPayments)
        setE2(result);
    }  

    const updateRelatedE1 = async (entity) => {
        await entities.update(entity, data, "CustomerID","HouseID")
        loadRelatedEntities();
        setEdit(false);
    }

    const updateRelatedE2 = async (entity, total) => {
        await entities.update(data, entity,"HouseID","CostID", total)
        loadRelatedEntities();
        setEdit2(false);
    }

    const onEdit = async () => {
        setAllEntries(await get("Customers"));     
        setEdit(true);
    }

    const onEdit2 = async () => {
        setAllEntries2(await get("Costs"));     
        setEdit2(true);
    }

    const deleteRelatedE1 = (entity) => {
        entities.del("CustomerHouses", entity.CustomerID, HouseID)
        setE1(E1.filter(entry => entry["CustomerID"] !== entity.CustomerID))
        setEdit(false);
    }

    const deleteRelatedE2 = (entity) => {
        entities.del("HouseCosts", HouseID, entity.CostID, entity.Total)
        setE2(E2.filter(entry => entry["CostID"] !== entity.CostID))
        setEdit2(false);
    }

    useEffect(() => {
        if(!newData) loadRelatedEntities();
    },[]);

    return (
        <div className="overlay">
            <form id="addHouser">
                <legend><h3>{ newData ? "Add House" : "Edit House"}</h3></legend>

                <fieldset className="fields">
                    <label> House Size </label> 
                        <input type="text" name="HouseSize" value={HouseSize} onChange={e => setHouseSize(e.target.value)}/>
                    <label> Patio Upgrade </label>
                        <select name="PatioUpgrade" value={PatioUpgrade} onChange={e => setPatioUpgrade(e.target.value)}>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                        
                    <label> Garage Upgrade</label> 
                        <select name="GarageUpgrade" value={GarageUpgrade} onChange={e => setGarageUpgrade(e.target.value)}>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    <br />
                    <h2><b>Payment Status </b></h2> 
                        <h2>{OpenPayment === 0 ? <span color="black">CLOSED</span> : <span color="red">${OpenPayment} DUE</span>}</h2>
                    <label>Paid Date</label>
                    <br/><br/>

                    { newData ? <input className="submit" type="button" value="Add New House" onClick={ () => { 
                                                                                                            addNew(constructObj())
                                                                                                            cancel(false) }}/> :
                                <input className="submit" type="button" value="Update House Information" onClick={ () => {
                                                                                                                    update(constructObj()) 
                                                                                                                    cancel(false)}}/> } 
                    
                    <input className="cancel" type="button" value="Cancel / Close Window" onClick={ () => cancel(false) }/>
                
                </fieldset>

                <div>                
                <h3>Associated Customers</h3>
                <DataTable  headers={["CustomerID", "HouseID", "First Name", "Last Name", "Paid Date", "House Ordered On"]}
                            data={E1}
                            onSelect={onEdit} 
                            onDelete={deleteRelatedE1} 
                            canDelete={true} 
                            canAddNew={true}/>
                {edit ? <DataTable  headers={["Customer ID", "CustomerFirstname", "CustomerLastname", "Paid Date", "House Ordered Date"]}
                                    data ={allEntries}
                                    onSelect={updateRelatedE1}
                                    onDelete={deleteRelatedE1}
                                    canAddNew={false}
                                    canDelete={false}   
                                    display={"window-overlay"}/> 
                                    : null}
                <h3>Associated Costs</h3>
                <DataTable  headers={["HouseID", "CostID", "Total", "Cost Description"]}
                            data={E2} 
                            onDelete={deleteRelatedE2} 
                            onSelect={onEdit2}
                            canDelete={true} 
                            canAddNew={true}
                            noSelect={true}/>
                {edit2 ? <DataEntryTable  headers={["CostID", "Cost Description", "Total"]}
                                    data ={allEntries2}
                                    onSave={updateRelatedE2}  
                                    entryCells={[2]}
                                    display={"window-overlay"}/> 
                                    : null}
                </div>
            </form> 
        </div>
    )    
}