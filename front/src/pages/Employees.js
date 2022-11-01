export default function Employees() {
    return (
            <>
            <div id="browse" style="display: block">
                <p><strong>Browse Customers</strong></p>
                <table border="1" cellpadding="5">
                <tr>
                    <th><a href="#">New</a></th>
                    <th></th>
                    <th>ID</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>OpenPayment</th>
                    <th>Paid</th>
                    <th>HouseOrdered</th>
                </tr>
                <tr>
                    <td><a href="#">Edit</a></td>
                    <td><a href="#">Delete</a></td>
                    <td align="right" >1</td>
                    <td >Max</td>
                    <td >Mueller</td>
                    <td align="center">yes</td>
                    <td ></td>
                    <td >02-22-2022</td>
                </tr>
                <tr>
                    <td><a href="#">Edit</a></td>
                    <td><a href="#">Delete</a></td>
                    <td align="right" >1</td>
                    <td >Moritz</td>
                    <td >Schmied</td>
                    <td align="center">no</td>
                    <td >07-12-2023</td>
                    <td >02-22-2022</td>
                </tr>
                <tr>
                    <td><a href="#">Edit</a></td>
                    <td><a href="#">Delete</a></td>
                    <td align="right" >1</td>
                    <td >Maria</td>
                    <td >Suarez</td>
                    <td align="center">no</td>
                    <td >02-22-2023</td>
                    <td >02-22-2022</td>
                </tr>
                </table>
                <p>&nbsp;</p>
            </div>
            
            <div id="insert" style="display: block">
                <form id="addCustomer">
                    <legend><strong>Add Customer</strong></legend>

                    <fieldset class="fields">
                        <label> FirstName </label> <input type="text" name="FirstName" />
                        <label> LastName </label> <input type="text" name="LastName" />
                        <label> OpenPayment </label> <input type="radio" name="yes" value="1"/> yes
                        <input type="radio" name="yes" value="2"/> no 
                        <label> Paid</label> <input type="date" name="Paid" />
                        <label> HouseOrdered</label> <input type="date" name="language" />
                    </fieldset>

                    <input class="btn" type="submit" id="addPlanet" value="Add a Customer" />
                    <input class="btn" type="button" value="cancel" />
                </form> 
            </div>

            <p>&nbsp;</p>
            <div id="update" style="display: block">
            <form id="updateCustomer">
                <legend><strong>Update Customer</strong></legend>
                    <fieldset class="fields">
                    <label>ID:</label> 1
                    <label> FirstName </label> <input type="text" name="FirstName" />
                    <label> LastName </label> <input type="text" name="LastName" />
                    <label> OpenPayment </label> <input type="radio" name="yes" value="1"/> yes
                    <input type="radio" name="yes" value="2"/> no 
                    <label> Paid</label> <input type="date" name="Paid" />
                    <label> HouseOrdered</label> <input type="date" name="language" />
                </fieldset>
                <input class="btn" type="submit" id="UpdateSaveCustomer" value="Save Update Customer" />
                    <input class="btn" type="button" value="cancel" />
            </form> 
            </div>
            <p>&nbsp;</p>
            <div id="delete" style="display: block">
            <form id="deleteCustomer">
                <legend><strong>Delete Customer</strong></legend>
                    <fieldset class="fields">
                    <p>Are you sure you wish to delete the following?</p>
                    <label>ID:</label> 1
                        <label> Name </label> Max Mueller
                        
                </fieldset>
                <input class="btn" type="submit" id="DeleteCustomer" value="Delete Customer" />
                    <input class="btn" type="button" value="cancel" />
            </form> 
            </div>
            </>
    )
}