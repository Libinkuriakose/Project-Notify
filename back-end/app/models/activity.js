const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Department }  = require('./department');
const { Employee } = require('./employee');
const {Group} =require('./group')
delete mongoose.connection.models['Activity'];

const activitySchema = new Schema({
    activityName: {
        type: String,
        minlength: 3,
        required: true
    },
    about: {
        type: String,
        minlength: 5
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    departments: [{
        type: Schema.Types.ObjectId,
        ref: 'Department'
    }],
    groups:[{
        type:Schema.Types.ObjectId,
        ref: 'Group'
    }],
    venue: {
        type: String,
        minlength: 3
    },
    guests: [{
            type: String
    }],
    schedule: {
        time: {
            type: String,
            required: true
            },
        date: {
            type: Date,
            required: true
            }
        }
});


activitySchema.post('save', function(next){
    let activityId = this._id;
    let departmentId = this.departments;
    console.log(departmentId);
    let groups=this.groups
    let participants = this.participants;
    Employee.updateMany({_id: {$in: participants}}, {$push: {activities: activityId}}).then((participants) => {        
        console.log(participants); 
    });
    Department.updateMany({_id: departmentId}, {$push: {activities: activityId}}).then((department) => {        
        console.log(department); 
    }).catch((err) => {
        console.log(err);
    })
    Group.updateMany({_id:{$in:groups}},{$push:{activities:activityId}}).then((updatedGroups)=>{
        console.log(updatedGroups);
    })

});


const Activity = mongoose.model('Activity', activitySchema);


module.exports = {
    Activity
}