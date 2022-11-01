import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DataTable from '../components/DataTable';
import DataList from '../components/DataList';
import * as entities from '../scripts/entities.js'

export default function Customer({data, cancel, addNew, update}){

    const [CustomerID, setCustomerID] = useState(data !== undefined ? data["CustomerID"] : "");
    const [CustomerFirstname, setCustomerFirstname] = useState(data !== undefined ?  data["CustomerFirstname"] : "");
    const [CustomerLastname, setCustomerLastname] = useState( data !== undefined ? data["CustomerLastname"] : "");
    const [OpenPayment, setOpenPayment] = useState( data !== undefined ? data["OpenPayment"] : "");
    const [Paid, setPaid] = useState(new Date( data !== undefined ? data["Paid"] : Date.now()) )
    const [HouseOrdered, setHouseOrdered] = useState( data !== undefined ? new Date(data["HouseOrdered"] ) : Date.now())

    // Customer related data
    const [Houses, setHouses] = useState([]);
    const [edit, setEdit] = useState(false);
    const [newData, setNewData] = useState(data === undefined)
    const [allEntries, setAllEntries] = useState([]);

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
        const result = await entities.get("CustomerHouses", CustomerID);
        console.log(result);
        setHouses(result);
    }  

    const updateRelatedE1 = async (entity) => {
        console.log(data.CustomerID, entity["HouseID"])
        await entities.update(data, entity,"CustomerID","HouseID")
        setEdit(false);
    }

    const onEdit = async () => {
        setAllEntries(await get("Houses"));
        console.log(allEntries)
        setEdit(true);
    }

    const deleteRelatedE1 = (entity) => {
        entities.del("CustomerHouses", CustomerID, entity.HouseID)
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
                        <h2>{OpenPayment === 0 ? <span color="black">CLOSED</span> : <span color="red">{OpenPayment}</span>}</h2>
                    <label>Paid Date</label>
                    <DatePicker
                        selected={Paid}
                        onChange={date => setPaid(date)} 
                    />

                    <label>House Ordered Date</label>
                    <DatePicker
                        selected={HouseOrdered}
                        onChange={date => setHouseOrdered(date)}
                    />
                
                
                </fieldset>

                <div>                
                <h3>Associated Houses</h3>
                <DataTable  headers={["CustomerID", "HouseID", "House Size", "Patio Upgrade", "Garage Upgrade"]}
                            data={Houses}
                            onSelect={onEdit} 
                            onDelete={deleteRelatedE1} 
                            canDelete={true} 
                            canAddNew={true}/>
                {edit ? <DataTable  data ={allEntries}
                                    onSelect={updateRelatedE1}
                                    onDelete={deleteRelatedE1}
                                    canAddNew={false}
                                    canDelete={false} 
                                    display={"overlay"}/> 
                                    : null}
                <h3>Associated Costs</h3>
                </div>

                { newData ? <input className="submit" type="button" value="Add New Customer" onClick={ () => { 
                                                                                                        addNew(constructObj())
                                                                                                        cancel(false) }}/> :
                            <input className="submit" type="button" value="Update Customer Information" onClick={ () => {
                                                                                                                update(constructObj()) 
                                                                                                                cancel(false)}}/> } 
                
                <input className="cancel" type="button" value="cancel" onClick={ () => cancel(false) }/>



            </form> 
        </div>
    )    
}