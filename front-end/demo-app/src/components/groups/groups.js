import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";



class Groups extends React.Component {
    constructor() {
        super();
        this.state = {
            groups: [],
            employees:[]
        }
        
    }

    componentDidMount() {
        axios.get('http://localhost:3001/groups').then((responseOfGroup) => {
            axios.get('http://localhost:3001/employees').then((responseOfEmployee) => {
            this.setState({
                groups: responseOfGroup.data,
                employees:responseOfEmployee.data

            })
        })
    })
    }

    render() {
        return (
            <div>
                {this.state.groups.map((group, index) => (
                    <li key={index}> 
                       <Link to= {{pathname:`/groups/${group._id}`,state:{group:group,employees:this.state.employees}}}>{group.groupName}</Link>
                    </li>
                    )
                )}
    
                <Link to={{pathname:"/groups/new/create",state:{employees:this.state.employees}}}>Create Group</Link>
            </div>
        )
    }
}

export default Groups;

