import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class EditDepartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameOfTheDepartment: this.props.location.state.department.department.departmentName,
            aboutTheDepartment: this.props.location.state.department.department.about,
            membersOfTheDepartment: this.props.location.state.department.department.members,
            selectedMembers: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeAbout = this.handleChangeAbout.bind(this);
        this.handleChange= this.handleChange.bind(this);
    }

    
    handleChangeText(event) {
        event.preventDefault();
        this.setState({
            nameOfTheDepartment: event.target.value
        })
    }

    handleChangeAbout(event) {
        event.preventDefault();
        this.setState({
            aboutTheDepartment: event.target.value   
        })
    }

    handleChange(event){
        this.state.selectedMembers.push(event.target.value);
    }

    handleSubmit(event){
        event.preventDefault();
        let submitValue = {
            departmentName: this.state.nameOfTheDepartment,
            about: this.state.aboutTheDepartment,
            Members:this.state.selectedMembers
        }
        axios.put(`http://localhost:3001/departments/${this.props.match.params.id}`, submitValue).then((response) => {
            this.setState({
                redirect: true
            });
        })
    }
    
   
    render() {
        const { redirect } = this.state;
        if(redirect){
            return <Redirect to="/departments/" exact />
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        New Name:<br/>
                        <input type="text" name="departmentName" onChange={this.handleChangeText} value={this.state.departmentName}/><br/>
                    </label> 
                    <label>
                        Change 'About' here:<br/>
                        <input type="textarea" onChange={this.handleChangeAbout} value={this.state.about}/><br/>
                    </label><label><br/>
                    Remove Members :<br/>
                    {this.state.membersOfTheDepartment.map((member,index)=>{
                        return <div key={index}><input onChange={this.handleChange} key={index} type="checkbox" value={member._id}/>{member.bio.firstName}<br/></div>
                    })}
                    </label>  <br/>
                    <input type="submit" value="submit"/>
                </form>    
            </div>
        )
    }
}

export default EditDepartment;