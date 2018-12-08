import React from 'react';
import axios from 'axios';
import { Link,Redirect } from 'react-router-dom';


class EditGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            nameOfGroup: this.props.location.state.group.group.groupName,
            privacy: this.props.location.state.group.group.privacy,
            members: this.props.location.state.group.group.members,
            posts: this.props.location.state.group.group.posts,
            events: this.props.location.state.group.group.events,
            allEmployees:this.props.location.state.allEmployees,
            updatedMembersList: [],
            group:this.props.location.state.group.group
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handlePrivacy = this.handlePrivacy.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleRemove=this.handleRemove.bind(this);
    }

    handleRemove(event){
        this.state.updatedMembersList.forEach((memberID)=>{
            if(memberID==event.target.value){
                this.state.updatedMembersList.splice((this.state.updatedMembersList.indexOf(memberID)))
            }
        });
        console.log(this.state.updatedMembersList,'updatedlistOFsplice')
    }
    handleChangeText(event) {
        event.preventDefault();
        this.setState({
            nameOfGroup: event.target.value
        })
    }
    handlePrivacy(event) {
        console.log(event);
        event.preventDefault();
        this.setState({
            privacy: event.target.value
        })
    }
    handleChange(event) {
        this.state.updatedMembersList.push(event.target.value)
        
    }
    handleSubmit(event){
        event.preventDefault();
        let submitValue={
            groupName:this.state.nameOfGroup,
            members:this.state.updatedMembersList,
            privacy:this.state.privacy
        }
        console.log(submitValue,"submitvalue");
        axios.put(`http://localhost:3001/groups/${this.props.match.params.id}`, submitValue).then((response) => {
            this.setState({
                redirect: true
            });
        })
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/groups/" exact />
        }
        return (
            <div>
                {console.log(this.props.location.state.group.group._id,"iiiiiiiiiiiiii")}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        {console.log(this.props.location.state.allEmployees, "allemps")}
                        New Group Name: <input type="text" name="groupName" onChange={this.handleChangeText} value={this.state.nameOfGroup} /><br />
                    </label>
                    <label>
                        Change privacy: <div><select name="groupName" onClick={this.handlePrivacy}>
                                        <option>select</option>
                                        <option value="private">Private </option>
                                        <option value="public">public</option></select><br /></div>
                    </label>
                    <label>
                         All Members:
                        
                    {this.state.allEmployees.map((employee, index) => {

                        if(this.state.members.length==0){
                            console.log("1");
                           return this.state.allEmployees.map((nonMember)=>{
                                return <div key={index}><input onChange={this.handleChange} key={index} type="checkbox" value={nonMember._id}/>{nonMember.bio.firstName}<br/></div>
                            })
                        }else{
                             return this.state.members.map((member) => {
                                 if(member._id==employee._id){
                                    console.log("2");
                                     console.log(member,employee,"if");


                                     if(this.state.updatedMembersList.find(elements=>elements._id==employee._id))
                                     this.state.updatedMembersList.push(employee._id)
                                     console.log(this.state.updatedMembersList);

                                        return (<div key={index}><input onClick={this.handleRemove} key={index}                     type="checkbox" value={member._id}/>Remove:{member.bio.firstName}<br/></div>)

                                    }else{
                                        console.log("3");

                                        console.log(employee,"else");
                                            return <div key={index}><input onChange={this.handleChange} key={index} type="checkbox" value={employee._id}/>{employee.bio.firstName}<br/></div>
                                    }
                                })
                            }
                        })
                    
                        }
                    </label>
                    
                    <br/><br/>
                    <input type="submit" value="submit"/><br/><br/>
                    <Link to="/groups">back</Link>
                </form>
            </div>
        )
    }
}


export default EditGroup