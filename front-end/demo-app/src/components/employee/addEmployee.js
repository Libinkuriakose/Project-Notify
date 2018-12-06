import React from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';

class AddEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                firstNameOfEmployee: '',
                lastNameOfEmployee: '',
                departmentofEmployee: '',  
                bio: '',
                listOfDepartments:this.props.location.state.departments,
                redirect: false  
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleSelectDepartment = this.handleSelectDepartment.bind(this);
    }


        

    handleChangeFirstName(event) {
        console.log(event.target.value);
        event.preventDefault();
        this.setState({
            firstNameOfEmployee: event.target.value
        })
    }

    handleSelectDepartment(event) {
        this.setState({
            departmentofEmployee: event.target.value
        })
    }

    handleChangeLastName(event) {
        console.log(event.target.value);

        event.preventDefault();
        this.setState({
            lastNameOfEmployee: event.target.value   
        })
    }

    handleSubmit(event){
        event.preventDefault();
        let submitValue = {
            bio: {
                firstName: this.state.firstNameOfEmployee,
                lastName: this.state.lastNameOfEmployee,
                department: this.state.departmentofEmployee
            }
        }
        {console.log(submitValue,"submit value")}

       
        axios.post('http://localhost:3001/employees', submitValue).then((response) => {
            this.setState({
                redirect: true
            });
        })       
    }

   
   
    render() {
        //redirecting to employees page after adding a department
        const { redirect } = this.state;
        if(redirect){
            return <Redirect to="/employees/" exact />
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        First Name: <br/>
                        <input type="text" name="FirstName" onChange={this.handleChangeFirstName} value={this.state.firstName}/><br/>
                    </label> 

                    <label>
                        Last Name<br/>
                        <input type="text" name="lastName" onChange={this.handleChangeLastName} value={this.state.lastName}/><br/>
                    </label>

                    <label>
                         Select The Department<br/>
                         <select name="selectDepartment" onClick={this.handleSelectDepartment}>
                         <option>Select</option>
                         {this.state.listOfDepartments.map((department,index)=>{
                        // let employeeID=this.state.members.find(memberID=>memberID==employee._id)
                        // if(!employeeID){
                           return <option key={index} value={department._id}>{department.departmentName} </option>
                    })}
                    </select>
                         </label> 
                        <input type="submit" value="submit"/>
                   

                </form>    
                <Link to="/employees">back</Link>
            </div>
        )
        
    }
}

export default AddEmployee;