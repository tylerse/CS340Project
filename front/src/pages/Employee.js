import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DataTable from '../components/DataTable';
import DataEntryTable from '../components/DataEntryTable';
import * as entities from '../scripts/entities.js'

export default function Customer({data, cancel, addNew, update}){

    const [EmployeeID, setEmployeeID] = useState(data !== undefined ? data["EmployeeID"] : "");
    const [EmployeeFirstname, setEmployeeFirstname] = useState(data !== undefined ?  data["EmployeeFirstname"] : "");
    const [EmployeeLastname, setEmployeeLastname] = useState( data !== undefined ? data["EmployeeLastname"] : "");
    const [EmployeeSalary, setEmployeeSalary] = useState( data !== undefined ? data["EmployeeSalary"] : "");    
    const [EmployeeBirthday, setEmployeeBirthday] = useState( data !== undefined ? new Date(data["EmployeeBirthday"] ) : Date.now())
    const [EmployeeInsurance, setEmployeeInsurance] = useState( data !== undefined ? data["EmployeeInsurance"] : "");
    const [Employed, setEmployed] = useState( data !== undefined ? new Date(data["Employed"] ) : Date.now())
   

    const [OpenPayment, setOpenPayment] = useState( data !== undefined ? data["OpenPayment"] : "");
    const [Paid, setPaid] = useState(new Date( data !== undefined ? data["Paid"] : Date.now()) )

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
            "EmployeeID" : EmployeeID,
            "EmployeeFirstname" : EmployeeFirstname,
            "EmployeeLastname" : EmployeeLastname,
            "EmployeeSalary" : EmployeeSalary,
            "EmployeeBirthday" : EmployeeBirthday,
            "EmployeeInsurance" : EmployeeInsurance
        }
        cancel(false);
        return entity;
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
        let result = await entities.get("EmployeeCosts", `EmployeeID=${EmployeeID}`);
        let openPayments = 0;
        console.log(result)
        for(let i = 0; i < result.length; i++){
            console.log(result[i])
            openPayments += parseInt(result[i].Total);
        }
        setOpenPayment(openPayments)
        setE2(result);
    }  

    const updateRelatedE2 = async (entity, total) => {
        await entities.update(data, entity,"EmployeeID","CostID", total)
        loadRelatedEntities();
        setEdit2(false);
    }

    const onEdit2 = async () => {
        setAllEntries2(await get("Costs"));     
        setEdit2(true);
    }


    const deleteRelatedE2 = (entity) => {
        console.log(entity)
        entities.del("EmployeeCosts", EmployeeID, entity.CostID, entity.Total)
        setEdit(false);
    }

    useEffect(() => {
        if(!newData) loadRelatedEntities();
    },[]);

    return (
        <div className="overlay">
            <form id="addEmployee">
                <legend><h3>{ newData ? "Add Employee" : "Edit Employee"}</h3></legend>

                <fieldset className="fields">
                    <label> First Name </label> 
                        <input type="text" name="FirstName" value={EmployeeFirstname} onChange={e => setEmployeeFirstname(e.target.value)}/>
                    <label> Last Name </label> 
                        <input type="text" name="LastName" value={EmployeeLastname} onChange={e => setEmployeeLastname(e.target.value)}/>
                    <br />

                    <label> Salary </label> 
                        <input type="text" name="Salary" value={EmployeeSalary} onChange={e => setEmployeeSalary(e.target.value)}/>
                    <label> Insurance </label> 
                        <input type="text" name="Insurance" value={EmployeeInsurance} onChange={e => setEmployeeInsurance(e.target.value)}/>
                    <h2><b>Payment Status </b></h2> 
                        <h2>{OpenPayment === 0 ? <span color="black">CLOSED</span> : <span color="red">${OpenPayment} TO BE PAID</span>}</h2>

                    <label>Date Employed</label>
                    <DatePicker
                        selected={Employed}
                        onChange={date => setEmployed(date)}
                    /><br/><br/>
                    { newData ? <input className="submit" type="button" value="Add New Employee" onClick={ () => { 
                                                                                                            addNew(constructObj())
                                                                                                            cancel(false) }}/> :
                                <input className="submit" type="button" value="Update Employee Information" onClick={ () => {
                                                                                                                    update(constructObj()) 
                                                                                                                    cancel(false)}}/> } 
                    
                    <input className="cancel" type="button" value="Cancel / Close Window" onClick={ () => cancel(false) }/>
                
                </fieldset>

                <div>                
                <h3>Associated Costs</h3>
                <DataTable  headers={["EmployeeID", "CostID", "Total", "Cost Description"]}
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
                                    display={"overlay"}/> 
                                    : null}
                </div>
            </form> 
        </div>
    )    
}