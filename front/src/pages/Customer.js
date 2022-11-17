import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DataTable from '../components/DataTable';
import DataEntryTable from '../components/DataEntryTable';
import * as entities from '../scripts/entities.js'

export default function Customer({data, cancel, addNew, update}){

    const [CustomerID, setCustomerID] = useState(data !== undefined ? data["CustomerID"] : "");
    const [CustomerFirstname, setCustomerFirstname] = useState(data !== undefined ?  data["CustomerFirstname"] : "");
    const [CustomerLastname, setCustomerLastname] = useState( data !== undefined ? data["CustomerLastname"] : "");
    const [OpenPayment, setOpenPayment] = useState( data !== undefined ? data["OpenPayment"] : "");
    const [Paid, setPaid] = useState(new Date( data !== undefined ? data["Paid"] : Date.now()) )
    const [HouseOrdered, setHouseOrdered] = useState( data !== undefined ? new Date(data["HouseOrdered"] ) : Date.now())

    // Related data
    const [E1, setE1] = useState([]);
    const [E2, setE2] = useState([]);
    const [edit, setEdit] = useState(false);
    const [edit2, setEdit2] = useState(false);
    const [allEntries, setAllEntries] = useState([]);
    const [allEntries2, setAllEntries2] = useState([]);
    const [newData, setNewData] = useState(data === undefined);

    const constructObj = () => {
        const customer = {
            "CustomerID" : CustomerID,
            "CustomerFirstname" : CustomerFirstname,
            "CustomerLastname" : CustomerLastname,
            "OpenPayment" : OpenPayment,
            "Paid" : convertDate(Paid),
            "HouseOrdered" : convertDate(HouseOrdered)
        }
        cancel(false);
        return customer;
    }

    const convertDate = (date) => {
        let ndate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
        return ndate;
    }

    const get = async (type) => {
        const result = await entities.get(type, null);
        return result;
    }

    const loadRelatedEntities = async () => {            
        let result = await entities.get("CustomerHouses", `CustomerID=${CustomerID}`);
        setE1(result);

        result = await entities.get("CustomerCosts", `CustomerID=${CustomerID}`);
        let openPayments = 0;
        for(let i = 0; i < result.length; i++){
            console.log(result[i])
            openPayments += parseInt(result[i].Total);
        }
        setOpenPayment(openPayments)
        setE2(result);
    }  

    const updateRelatedE1 = async (entity) => {
        await entities.update(data, entity,"CustomerID","HouseID")
        loadRelatedEntities();
        setEdit(false);
    }

    const updateRelatedE2 = async (entity, total) => {
        await entities.update(data, entity,"CustomerID","CostID", total)
        loadRelatedEntities();
        setEdit2(false);
    }

    const onEdit = async () => {
        setAllEntries(await get("Houses"));     
        setEdit(true);
    }

    const onEdit2 = async () => {
        setAllEntries2(await get("Costs"));     
        setEdit2(true);
    }

    const deleteRelatedE1 = (entity) => {
        entities.del("CustomerHouses", CustomerID, entity.HouseID)
        setE1(E1.filter(entry => entry["HouseID"] !== entity.HouseID))
        setEdit(false);
    }

    const deleteRelatedE2 = (entity) => {
        entities.del("CustomerCosts", CustomerID, entity.CostID, entity.Total)
        setE2(E2.filter(entry => entry["CostID"] !== entity.CostID))
        setEdit(false);
    }

    useEffect(() => {
        if(!newData) loadRelatedEntities();
    },[]);

    return (
        <div className="overlay">
            <form id="addCustomer">
                <legend><h3>{ newData ? "Add Customer" : "Edit Customer"}</h3></legend>

                <fieldset className="fields">
                    <label> First Name </label> 
                        <input type="text" name="FirstName" value={CustomerFirstname} onChange={e => setCustomerFirstname(e.target.value)}/>
                    <label> Last Name </label> 
                        <input type="text" name="LastName" value={CustomerLastname} onChange={e => setCustomerLastname(e.target.value)}/>
                    <br />
                    <h2><b>Payment Status </b></h2> 
                        <h2>{OpenPayment === 0 ? <span color="black">CLOSED</span> : <span color="red">${OpenPayment} DUE</span>}</h2>
                    <label>Paid Date</label>
                    <DatePicker
                        selected={Paid}
                        onChange={date => setPaid(date)} 
                    />

                    <label>House Ordered Date</label>
                    <DatePicker
                        selected={HouseOrdered}
                        onChange={date => setHouseOrdered(date)}
                    /><br/><br/>
                    { newData ? <input className="submit" type="button" value="Add New Customer" onClick={ () => { 
                                                                                                            addNew(constructObj())
                                                                                                            cancel(false) }}/> :
                                <input className="submit" type="button" value="Update Customer Information" onClick={ () => {
                                                                                                                    update(constructObj()) 
                                                                                                                    cancel(false)}}/> } 
                    
                    <input className="cancel" type="button" value="Cancel / Close Window" onClick={ () => cancel(false) }/>
                
                </fieldset>

                <div>                
                <h3>Associated Houses</h3>
                <DataTable  headers={["CustomerID", "HouseID", "House Size", "Patio Upgrade", "Garage Upgrade"]}
                            data={E1}
                            onSelect={onEdit} 
                            onDelete={deleteRelatedE1} 
                            canDelete={true} 
                            canAddNew={true}/>
                {edit ? <DataTable  headers={["House ID", "House Size", "Patio Upgrade", "Garage Upgrade"]}
                                    data ={allEntries}
                                    onSelect={updateRelatedE1}
                                    onDelete={deleteRelatedE1}
                                    canAddNew={false}
                                    canDelete={false}   
                                    display={"window-overlay"}
                                    closeWindow = {setEdit}/> 
                                    : null}
                <h3>Associated Costs</h3>
                <DataTable  headers={["CustomerID", "CostID", "Total", "Cost Description"]}
                            data={E2} 
                            onSelect={onEdit2}
                            onDelete={deleteRelatedE2} 
                            canDelete={true} 
                            canAddNew={true}
                            noSelect={true}/>
                {edit2 ? <DataEntryTable  headers={["CostID", "Cost Description", "Total"]}
                                    data ={allEntries2}
                                    onSave={updateRelatedE2}  
                                    entryCells={[2]}
                                    display={"window-overlay"}
                                    closeWindow = {setEdit2}/> 
                                    : null}
                </div>
            </form> 
        </div>
    )    
}