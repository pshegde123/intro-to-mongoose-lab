const mongoose = require('mongoose');

const CRMModel = new mongoose.Schema(
    {
        name:String,
        age:Number,
    });

// compile the schema into a model
const CRM = mongoose.model('CRM', CRMModel);


// Export the model:
module.exports = CRM;