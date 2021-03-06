import React from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import { Input,Alert,Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Col, CardDeck, NavLink, Label,Form,FormGroup } from 'reactstrap';


class AddActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activityTitle: ``,
            titleError: ``,
            aboutActivity: ``,
            aboutError:   ``,
            participants: [],
            participantsError: ``,
            departments: this.props.location.state.departments,
            departmentError: ``,
            time: ``,
            timeError: ``,
            venue: ``,
            venueError: ``,
            date: ``,
            dateError: ``,
            guests: [],
            selectedDepartments: [],
            employees: this.props.location.state.employees,
            redirect: false,
            groups:this.props.location.state.groups,
            selectedGroups:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleActivityTitle = this.handleActivityTitle.bind(this);
        this.handleAboutActivity = this.handleAboutActivity.bind(this);
        this.handleDepartment = this.handleDepartment.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleVenue = this.handleVenue.bind(this);
        this.handleParticipants = this.handleParticipants.bind(this);
        this.handleGuests = this.handleGuests.bind(this);
        this.handleGroup=this.handleGroup.bind(this);
    }

    validate = () => {
        let isError = false;
        const errors = {
            titleError: ``,
            departmentError: ``,
            participantsError: ``,
            venueError: ``,
            dateError: ``,
            venueError: ``,
            timeError: ``
        }

        if(this.state.activityTitle.length < 3){
            isError = true;
            console.log("error from title")
            errors.titleError = 'title should be three characters long';
        }

        if(this.state.aboutActivity.length < 5){
            isError = true;
            console.log("error from title")
            errors.aboutError = 'say something about the activity in atleast 5 characters';
        }

        if(this.state.time.length < 1){
            isError = true;
            console.log("error from time")
            errors.timeError = 'please specify the time of the activity';
        }

        if(this.state.venue.length < 3){
            isError = true;
            console.log("error from venue")
            errors.venueError = 'please specify the venue of activity';
        }

        if(this.state.participants.length < 1){
            isError = true;
            console.log("error from participants")
            errors.participantsError = 'add atleast one participants';
        }

        if(this.state.date.length < 1){
            console.log("error from date")
            isError = true;
            errors.dateError = 'specify the date of the activity';
        }

        this.setState({
            ...this.state,
            ...this.errors
        })

        return isError;
    }

    handleActivityTitle(event){
        event.preventDefault();
        console.log(event.target.value, "from title")
        this.setState({
            activityTitle: event.target.value
        })
    }
    handleAboutActivity(event){
        event.preventDefault();
        console.log(event.target.value, "from about")
        this.setState({
            aboutActivity: event.target.value
        })
    }
    handleTime(event){
        event.preventDefault();
        console.log(event.target.value, "from time")

        this.setState({
            time: event.target.value
        })
    }
    handleVenue(event){
        event.preventDefault();
        this.setState({
            venue: event.target.value
        })
    }
    handleDate(event){
        event.preventDefault();
        console.log(event.target.value, "from date")
        this.setState({
            date: event.target.value
        })
    }
    handleParticipants(event){
        console.log(event.target.value, "from participants")
        this.state.participants.push(event.target.value)
    }
    handleDepartment(event){
        this.state.selectedDepartments.push(event.target.value);
    }
    handleGuests(event){
        event.preventDefault();
        console.log(event.target.value, "from guests")
        this.setState({
            guests: event.target.value
        })
    }
    handleGroup(event){
        this.state.selectedGroups.push(event.target.value)
    }

    handleSubmit(event){
        console.log(event.target.value);
        event.preventDefault();
        const err = this.validate();
        console.log(err, "err");
        if(!err){
            this.setState({
                titleError: ``,
                aboutError: ``,
                participantsError: ``,
                timeError: ``,
                venueError: ``,
                dateError: ``
            })

            let submitValue = {
                activityName: this.state.activityTitle,
                participants: this.state.participants,
                guests: this.state.guests,
                schedule: {
                    time: this.state.time,
                    date: this.state.date
                },
                venue: this.state.venue,
                about: this.state.aboutActivity,
                departments: this.state.selectedDepartments,
                groups:this.state.selectedGroups 
            }
            console.log(submitValue, "submit value");
            axios.post(`http://localhost:3001/activities`, submitValue).then((response) => {
                console.log(response.data, "from axios post");
                this.setState({
                    redirect: true
                })
            })
        }      
    }

    render(){
        const {redirect} = this.state;
        if(redirect){
            return <Redirect to="/activities/" exact />
        }
        return(
            <div className="container">
            <div className="row">
            <div className="col">
            <Button outline style={{width:"30%"}} color="primary"> <Link to="/activities">Back</Link></Button>
                <Form onSubmit={this.handleSubmit}>
                <div className="row">
                <div className="col-md-6">
                    <FormGroup>
                        <Alert color="secondary">Title</Alert>
                        <Input type="text" errortext={this.state.titleError} name="title" onChange={this.handleActivityTitle} value={this.state.activityTitle} />
                    </FormGroup><span>{this.state.titleError}</span>
                    </div>
                    <div className="col-md-6">
                    <FormGroup>
                        <Alert color="secondary">Date</Alert>
                        <Input type="date" name="date" onChange={this.handleDate} value={this.state.date}/>
                    </FormGroup>
                    </div></div>
                    <div className="row">
                    <div className="col-md-6">
                    <FormGroup>
                        <Alert color="secondary">About</Alert>
                        <Input type="text" errortext={this.state.aboutError} name="about" onChange={this.handleAboutActivity} value={this.state.aboutActivity}/>
                    </FormGroup><span>{this.state.aboutError}</span>
                    </div>
                    <div className="col-md-6">
                    <FormGroup>
                        <Alert color="secondary">Time</Alert>
                        <input type="number" name="time" onChange={this.handleTime} value={this.state.time}/>
                    </FormGroup>
                    </div></div>
                    <div className="row">
                    <div className="col-md-6">
                    <FormGroup>
                        <Alert color="secondary">Guests</Alert>
                        <Input type="text" name="guests" onChange={this.handleGuests} value={this.state.guests}/>
                    </FormGroup>
                    </div>
                    <div className="col-md-6">
                    <FormGroup>
                        <Alert color="secondary">Venue</Alert>
                        <Input type="text" name="venue" onChange={this.handleVenue} value={this.state.venue}/>
                    </FormGroup>
                    </div></div>
                    <div className="row">
                    <div className="col-md-4">
                    <FormGroup>
                        <Alert color="secondary">Select Group for its members</Alert><div>
                            <div className="row">
                            <div className="col-md-11 offset-md-1" style={{height:"300px",overflow:"scroll"}}>
                    {this.state.groups.map((group,index)=>{
                        return <div key={index}><input key={index} onClick={this.handleGroup} type="checkbox" value={group._id}/>{group.groupName}</div>
                    })}
                    </div></div></div></FormGroup>
                    </div>
                    <div className="col-md-4">
                    <FormGroup>
                        <Alert color="secondary">Add participants</Alert>
                        <div className="row">
                        <div className="col-md-11 offset-md-1" style={{height:"300px",overflow:"scroll"}}>
                    { <div>
                        {this.state.employees.map((employee, index) => {
                            return <div key={index}><input key={index} onClick={this.handleParticipants} type="checkbox" value={employee._id}/>{employee.bio.firstName}</div>
                        })}
                    </div> } 
                    </div></div>  
                    </FormGroup><span>{this.state.participantsError}</span>
                    </div>
                    <div className="col-md-4">
                    <FormGroup>
                        <Alert color="secondary">Add Departments</Alert>
                        <div className="row">
                        <div className="col-md-11 offset-md-1" style={{height:"300px",overflow:"scroll"}}>
                        {this.state.departments.map((department, index) => {
                            return <div key={index}><input key={index} onClick={this.handleDepartment}
                            type="checkbox" value={department._id}/>{department.departmentName}</div>
                        })}
                        </div></div>
                    </FormGroup>
                    </div></div>
                    <Button  style={{width:"20%"}} value="submit">Submit</Button>
                </Form>
            </div></div></div>
        )
    }
}

export default AddActivity;
