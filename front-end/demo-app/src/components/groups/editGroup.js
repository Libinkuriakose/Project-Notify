import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class EditGroup extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props.location.state.group.group);

        this.state={
            nameOfGroup: this.props.location.state.group.group.groupName,
            privacy: this.props.location.state.group.group.privacy,
            members: this.props.location.state.group.group.members,
            posts: this.props.location.state.group.group.posts,
            events: this.props.location.state.group.group.events,
            updatedMembersList: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handlePrivacy = this.handlePrivacy.bind(this);
        this.handleChange= this.handleChange.bind(this);
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
            members:this.state.members,
            privacy:this.state.privacy
        }
        console.log(submitValue);
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
                <form onSubmit={this.handleSubmit}>
                    <label>
                        New Group Name: <input type="text" name="groupName" onChange={this.handleChangeText} value={this.state.nameOfGroup} /><br />
                    </label>
                    <label>
                        Change privacy: <div><select name="groupName" onClick={this.handlePrivacy}>
                                        <option>select</option>
                                        <option value="private">Private </option>
                                        <option value="public">public</option></select><br /></div>
                    </label>
                    <label>
                        Members: {this.state.members.map((member, index) => {
                            return <div key={index}><input onChange={this.handleChange} key={index} type="checkbox" value={member._id}>{member.bio.firstName}</input><br /></div>
                        })}
                    </label><br/><br/>
                    <input type="submit" value="submit"/>
                </form>
            </div>
        )
    }
}


export default EditGroup