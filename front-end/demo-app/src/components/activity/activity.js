import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';   
import strftime from 'strftime'
import { Alert,Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Col, CardDeck, NavLink, Label } from 'reactstrap';

class Activity extends React.Component {
    constructor(){
        super();
        this.state = {
            activities: [],
            employees: [],
            departments: [],
            groups:[],
            formatedDate:``
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/activities`).then((responseFromActivities) => {
            console.log(responseFromActivities.data, "activity");
            this.setState({
                activities: responseFromActivities.data,
            })
        })
        axios.get(`http://localhost:3001/employees`).then((responseFromEmployees) => {
            console.log(responseFromEmployees.data, "employees");
            this.setState({
                employees: responseFromEmployees.data
            })
        })
        axios.get(`http://localhost:3001/departments`).then((responseFromDepartments) => {
            console.log(responseFromDepartments.data, "departments");
            this.setState({
                departments: responseFromDepartments.data
            })
        })
        axios.get(`http://localhost:3001/groups`).then((responseFromGroups) => {
            console.log(responseFromGroups.data, "groups");
            this.setState({
                groups: responseFromGroups.data
            })
        })
            
        // let date = new Date(this.state.activities.schedule.date);
        //     this.setState({
        //         formatedDate: strftime(`%B %d %Y`, date)
        //     })
            

    }

   render(){
       return(
           <div className="container"><br/><br/>
           <div className="row">
           <div className="col-sm-9">

               {this.state.activities.map((activity, index) => {
                   
            return( 
                <Card body outline color="primary">
                <div className="row">
                <div className="col">
                   <div key={index}><Alert className="row justify-content-md-center" color="primary">
                   {activity.activityName}</Alert></div>
                   </div>
                   </div>
                   <div className="row">
                    <div className="col">
                    <Alert className="row justify-content-md-center" color="secondary">                    
                    {strftime(`%A %d %B %Y`,new Date(activity.schedule.date))}</Alert>
                    </div>
                    </div>
                    <div className="row">
                   <div className="col">
                       <Alert className="row justify-content-md-center" color="secondary">
                        <Link to={{pathname:`/activities/${activity._id}`, state: {groups:this.state.groups,activity: activity, employees: this.state.employees, departments: this.state.departments}}}>More About {activity.activityName}</Link>
                        </Alert>
                    </div>
                   </div>
                </Card>
                )
               })}
                </div><div className="col-sm-3">
                <Button outline style={{width:"90%"}} color="primary">
                <Link to={{pathname:"/activities/new",state: {groups:this.state.groups,employees: this.state.employees, departments: this.state.departments}}}>Create New Activity</Link>
                </Button>
                </div></div>
           </div>
       )
   }
}

export default Activity;