import React, { Component } from 'react'
import './Table.css';

class Table extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         user: [
            { id: 1, reportType: 'Ultrasound Report', description: 'Full Body Scan', medical_prescription: 'Not Applicable', date:'10-12-2015' },
            { id: 2, reportType: 'CT Scan Report', description: 'Neck CT Scan', medical_prescription: 'Not Applicable', date:'20-02-2018' },
            { id: 3, reportType: 'Pathology Report', description: 'General Report', medical_prescription: 'Antibiotics', date:'21-12-2019' },
            { id: 4, reportType: 'PET Scan Report', description: 'Full Body PET Scan', medical_prescription: 'Not Applicable', date:'19-05-2020' },
         ]
      }
   }
   renderTableData() {
    return this.state.user.map((user, index) => {
       const { id, reportType, description, medical_prescription, date } = user //destructuring
       return (
          <tr key={id} class="bg-light">
             <td>{id}</td>
             <td>{reportType}</td>
             <td>{description}</td>
             <td>{medical_prescription}</td>
             <td>{date}</td>
          </tr>
       )
    })
 }
 /*renderTableHeader() {
    let header = Object.keys(this.state.user[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }*/

   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
      return (
         <div class="Tablebody">
            <h3>Medical History</h3>
            <table id='students' border='solid'>
               <tbody>
                  <tr class="black">
                     <th>S.no</th>
                     <th>Report Type</th>
                     <th>Description</th>
                     <th>Medical Prescription</th>
                     <th>Date</th>
                  </tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
      )
   }
}

export default Table //exporting a component make it reusable and this is the beauty of react