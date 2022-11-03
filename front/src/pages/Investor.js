import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DataTable from '../components/DataTable';
import DataEntryTable from '../components/DataEntryTable';
import * as entities from '../scripts/entities.js'

export default function Investor({data, cancel, addNew, update}){

    const [InvestorID, setInvestorID] = useState(data !== undefined ? data["InvestorID"] : "");
    const [InvestorName, setInvestorName] = useState(data !== undefined ?  data["InvestorName"] : "");
    const [InvestorBirthday, setInvestorBirthday] = useState( new Date( data !== undefined ? data["InvestorBirthday"] : Date.now()));
    const [InvestAmount, setInvestAmount] = useState( data !== undefined ? data["InvestAmount"] : "");
    const [InvestName, setInvestName] = useState( data !== undefined ? data["InvestName"] : "");
    const [Profit, setProfit] = useState( data !== undefined ? data["Profit"] : "");
    const [ProfitName, setProfitName] = useState( data !== undefined ? data["ProfitName"] : "");
    const [OpenPayment, setOpenPayment] = useState()

    // Related data
    const [E2, setE2] = useState([]);
    const [edit, setEdit] = useState(false);
    const [edit2, setEdit2] = useState(false);
    const [allEntries, setAllEntries] = useState([]);
    const [allEntries2, setAllEntries2] = useState([]);
    const [newData, setNewData] = useState(data === undefined);

    const constructObj = () => {
        const entity = {
            "InvestorID" : InvestorID,
            "InvestorName" : InvestorName,
            "InvestorBirthday" : InvestorBirthday,
            "InvestAmount" : InvestAmount,
            "InvestName" : InvestName,
            "Profit" : Profit,
            "ProfitName" : ProfitName
        }
        cancel(false);
        return entity;
    }

    const get = async (type) => {
        const result = await entities.get(type, null);
        return result;
    }

    const loadRelatedEntities = async () => {            
        let result = await entities.get("InvestorCosts", InvestorID);
        let openPayments = 0;
        console.log(result)
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
        await entities.update(data, entity,"InvestorID","CostID", total)
        loadRelatedEntities();
        setEdit2(false);
    }

    const onEdit2 = async () => {
        setAllEntries2(await get("Costs"));     
        setEdit2(true);
    }

    const deleteRelatedE2 = (entity) => {
        console.log(entity)
        entities.del("InvestorCosts", InvestorID, entity.CostID)
        setEdit(false);
    }

    useEffect(() => {
        if(!newData) loadRelatedEntities();
    },[]);

    return (
        <div className="overlay">
            <form id="addInvestor">
                <legend><h3>{ newData ? "Add Investor" : "Edit Investor"}</h3></legend>

                <fieldset className="fields">
                    <label> Investor Name </label> 
                        <input type="text" name="InvestorName" value={InvestName} onChange={e => setInvestorName(e.target.value)}/>
                    
                    
                    <label> Invested Amount </label> 
                        <input type="text" name="InvestorAmount" value={InvestAmount} onChange={e => setInvestAmount(e.target.value)}/>

                    <label> Investment Name </label> 
                        <input type="text" name="InvestName" value={InvestName} onChange={e => setInvestName(e.target.value)}/>
                    <br/><br/>

                    <label> Profit </label> 
                        <input type="text" name="Profit" value={Profit} onChange={e => setProfit(e.target.value)}/>

                    <label> Profit Name </label> 
                        <input type="text" name="ProfitName" value={ProfitName} onChange={e => setProfitName(e.target.value)}/>

                    <br/><br/>

                    <label> Investor Birthday </label> 
                        <DatePicker
                            selected={InvestorBirthday}
                            onChange={date => setInvestorBirthday(date)} 
                        />
                    
                    <h2><b>Investment Status </b></h2> 
                        <h2>{OpenPayment === 0 ? <span color="black">CLOSED</span> : <span color="red">${OpenPayment} DUE</span>}</h2>
                    <label>Paid Date</label>
                    <br/><br/>

                    { newData ? <input className="submit" type="button" value="Add New Investor" onClick={ () => { 
                                                                                                            addNew(constructObj())
                                                                                                            cancel(false) }}/> :
                                <input className="submit" type="button" value="Update Investor Information" onClick={ () => {
                                                                                                                    update(constructObj()) 
                                                                                                                    cancel(false)}}/> } 
                    
                    <input className="cancel" type="button" value="Cancel / Close Window" onClick={ () => cancel(false) }/>
                
                </fieldset>

                <div>                
                <h3>Associated Costs</h3>
                <DataTable  headers={["Investor ID", "Cost ID", "Total", "Cost Description"]}
                            data={E2} 
                            onDelete={deleteRelatedE2} 
                            canDelete={true} 
                            canAddNew={true}/>
                {edit2 ? <DataEntryTable  headers={["CostID", "Cost Description", "Total"]}
                                    data ={allEntries2}
                                    onSave={updateRelatedE2}  
                                    entryCells={[2]}
                                    display={"overlay"}/> 
                                    : null}
                </div>
            </form> 
        </div>
    )    
}