import React from 'react';
import axios from 'axios';
import { Redirect, Link } from "react-router-dom";

class CreateNewGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: ``,
            privacy: ``,
            members: [],
            employees: this.props.location.state.employees,
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handlePrivacy = this.handlePrivacy.bind(this);
        this.handleNewMembers = this.handleNewMembers.bind(this);
    }

    handleNewMembers(event) {
        this.state.members.push(event.target.value);
    }

    handleChangeText(event) {
        event.preventDefault();
        this.setState({
            groupName: event.target.value
        })
    }

    handlePrivacy(event) {
        event.preventDefault();
        this.setState({
            privacy: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let submitValue = {
            groupName: this.state.groupName,
            privacy: this.state.privacy,
            members: this.state.members
        }
        console.log(submitValue);
        axios.post('http://localhost:3001/groups', submitValue).then(() => {
            this.setState({
                redirect: true
            });
        })
        // }).catch((err)=>{
        //     console.log(err);
        // })

    }



    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/groups/" exact />
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        {console.log(this.props.location.state, "location")}
                        Group Name: <br />
                        <input type="text" name="newGroupName" onChange={this.handleChangeText} value={this.state.groupName} /><br />
                    </label>
                    <label>
                        Privacy: <br />
                        <input type="text" name="privacy" onChange={this.handlePrivacy} value={this.state.privacy} /><br />
                    </label>

                    <label>
                        {this.state.employees.map((employee, index) => {
                            // let employeeID=this.state.members.find(memberID=>memberID==employee._id)
                            // if(!employeeID){
                            return <div key={index}><input type="checkbox" onChange={this.handleNewMembers} key={index} value={employee._id}/>{employee.bio.firstName}<br /></div>

                        })}
                    </label>
                    <input type="submit" value="submit" />

                </form>
                <Link to="/groups/">back</Link>
            </div>
        )
    }
}

export default CreateNewGroup;

