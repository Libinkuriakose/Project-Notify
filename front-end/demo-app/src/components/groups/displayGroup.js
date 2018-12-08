import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';


class EachGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eachgroup: this.props.location.state,
            allEmployees:this.props.location.state.employees,
            redirect:false
        }
        this.deleteHandle=this.deleteHandle.bind(this);
        {console.log(this.props.location.state,'iiii')}

    }
    deleteHandle(){
        axios.delete(`http://localhost:3001/groups/${this.props.match.params.id}`).then((response) => {
             this.setState({
                redirect: true
            })
        });
       ;    
    }
    render() {
        const { redirect } = this.state;
        if(redirect){
            return <Redirect to="/groups/" exact/>
        }
        return (

            <div>
                {console.log(this.props.location.state)}

              <li>Name:{this.state.eachgroup.group.groupName}</li>
              <li>Privacy:{this.state.eachgroup.group.privacy}</li>
              <li>Events:{this.state.eachgroup.group.events}</li>
              <li>Posts:{this.state.eachgroup.group.posts}</li>
              <li>Members:{this.state.eachgroup.group.members.map((member,index)=>{
                  return <Link key={index} to={`/groups/${member._id}`}><ul key={index}>{member.bio.firstName}</ul></Link>
                            })
                        }
                </li>
                <Link to={`/groups/${this.props.match.params.id}`} onClick={this.deleteHandle}>Delete</Link><br />
                <Link to={{pathname:`/groups/edit/${this.props.match.params.id}`,state:{group:this.state.eachgroup,allEmployees:this.state.allEmployees}}} >Edit</Link><br />
                <Link to="/groups">back</Link>
            </div>
        )
    }
}


export default EachGroup;

