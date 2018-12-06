const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Employee } = require('./employee');
const { Department } = require('./department');
const { Activity } = require('./activity');


const groupSchema = new Schema({
    groupName:{
        type: String,
        //required: true,
        minlength: 3
    },
    members:[{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    privacy:{
        type: String,
        //required: true,
        minlength: 3
    },
    posts:[{
        type: String
    }],
    activities:[{
        type: Schema.Types.ObjectId,
        ref: 'Activity'
    }]
})


groupSchema.post('save', function(next){
    let allMembers = this.members;
    console.log(allMembers);

    allMembers.forEach((memberID) => {
        console.log(memberID)
        Employee.findById(memberID).then((employee) => {  
            console.log(employee)
            console.log(groupName)

            if(!employee.includes(this.groupName)){
                employee.group.push(this.groupName);   
                employee.save();
            }  
        })
    });
    
    next();
})

const Group=mongoose.model('Group',groupSchema);


module.exports = {
    Group
}