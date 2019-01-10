import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import strftime from 'strftime'
import { Alert,Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Col, CardDeck } from 'reactstrap';


class ActivityDetails extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                activityDetails: this.props.location.state.activity,
                employees: this.props.location.state.employees,
                departments: this.props.location.state.departments,
                groups:this.props.location.state.groups,
                redirect: false,
                changedDate: ``
            }
            this.deleteHandle = this.deleteHandle.bind(this);
        }    

        deleteHandle() {
            axios.delete(`http://localhost:3001/activities/${this.props.match.params.id}`).then((response) => {
                console.log(response);
                this.setState({
                    redirect: true
                })
            })
        }

        componentDidMount(){
            let date = new Date(this.state.activityDetails.schedule.date);
            this.setState({
                changedDate: strftime(`%B %d %Y`, date)
            })
        }

        render() {
            const {redirect} = this.state;
            if(redirect){
                return <Redirect to="/activities" exact/>
            }
            return (
                <div className="container">
                {console.log(this.state.activityDetails,"activitiess")}
                <div className="row">
                <div className="col-sm-9">
                    <h1>{this.state.activityDetails.activityName}</h1>
                    <p>{this.state.activityDetails.about}</p>
                    <b>on</b>
                    <h5>{this.state.changedDate}</h5>
                    <b>at</b>
                    <h5>{this.state.activityDetails.schedule.time}</h5>
                    <b>venue</b>
                    <h5>{this.state.activityDetails.venue}</h5>
                    <b>Cheif Guest(s)</b>
                    <h4>{this.state.activityDetails.guests.map((guest,index) => {
                        return <li key={index}>{guest}</li>
                    })}</h4>
                    <Button onClick={this.deleteHandle} style={{width:'100'}}>delete this activity</Button>
                    </div>
                    <div className="col-sm-3">
                    <Link to={{pathname: `/activities/edit/${this.props.match.params.id}`, state: {activityDetails: this.state.activityDetails,groups:this.state.groups, employees: this.state.employees, departments: this.state.departments}}}>Edit</Link><br/>

                    <Link to="/activities">back</Link><br/>
                    </div>
                </div>
                </div>
            )
        }
}


export default ActivityDetails;
