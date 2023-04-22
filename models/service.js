const mongoose= require('mongoose');
const ServiceSchema = mongoose.Schema({
    serv_name: {
        type: String,
        required: true,
    },
    ur_name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    serv_number:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        default:"https://cdn-icons-png.flaticon.com/128/870/870175.png"
    }
})

module.exports= mongoose.model('Service', ServiceSchema)