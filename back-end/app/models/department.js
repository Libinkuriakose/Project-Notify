const mongoose = require('mongoose');
const Schema = mongoose.Schema;
delete mongoose.connection.models['Department'];
const mongoose_delete = require('mongoose-delete');

const departmentSchema = new Schema({
    departmentName: {
        type: String,
        required: true,
        minlength: 2
    },
    about: {
        type: String,
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    activities: [{
        type: Schema.Types.ObjectId,
        ref: 'Activity'
    }],
    review: {
        type: String,
        minlengt: 5,
        maxlength: 100
    } 
});
departmentSchema.plugin(mongoose_delete);



const Department = mongoose.model('Department', departmentSchema);

departmentSchema.pre('delete', function(next){
    id=this._id;
    this.activities.delete(function(){
        console.log("deleted");
    })
})

module.exports = {
    Department
}
    


