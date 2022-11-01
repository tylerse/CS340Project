export default function Costs() {
    return (
        <div>
            <div id="browse">
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
        </div>
    )
}