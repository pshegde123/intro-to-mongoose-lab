const prompt = require('prompt-sync')();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

//import model todo
const crmapp = require('./crmappmodel.js');

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  await runQueries()  
};
const displayMenu = async () => {
  console.log('1. Create CRM Entry');
  console.log('2. View CRM Entries');
  console.log('3. Update CRM Entry');
  console.log('4. Delete CRM Entry');
  console.log('5. Exit');
  const userselect = parseInt(prompt('Enter your choice: '));
  console.log(`Your choice is ${userselect}`);

  if(userselect === 1) {
    await createCRMEntry();
  }else if(userselect === 2) {
    await viewAllRecords();
  } else if(userselect === 3) {
    await updateRecord();
  }else if(userselect === 4) {
    await deleteRecord();
  }else if(userselect === 5) {
    await exitApp();
  }
   await displayMenu();
}
//Create
const createCRMEntry = async () => {
    const name = prompt('Enter name: ');
    const age = prompt('Enter age: ');

    const newEntry = await crmapp.create({ name, age });    
    console.log('A new customer entry created:');
}
//Read
const viewAllRecords= async () => {
    const result = await crmapp.find({});    
    console.log('Below is a list of customers:');
    result.forEach(customer => {
        console.log(`id: ${customer._id}, -- Name: ${customer.name}, Age: ${customer.age}`);
    });   
}
//Update
const updateRecord= async () => {
    await viewAllRecords();
    const user_id = prompt('Copy and paste the id of the customer you would like to update here: ');
    const new_name = prompt('Enter the new name: ');
    const new_age = parseInt(prompt('Enter the new age: '));

    const findUser = await crmapp.findById(user_id);
    console.log('The selected customer is: ', findUser);
    
    const updatedRecord = await crmapp.findByIdAndUpdate(
    user_id,
    { name: new_name, age: new_age },
    { new: true }
  );
}

//Delete
const deleteRecord = async () => {    
    const user_id = prompt('Copy and paste the id of the customer you would like to delete here: ');
    await crmapp.findByIdAndDelete(user_id);
    console.log('Customer entry deleted');
}
//Exit
const exitApp = async () => {
// Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');

  // Close our app, bringing us back to the command line.
  process.exit();
}
const runQueries = async () => {
  console.log('Welcome to the CRM');
  // The functions calls to run queries in our db will go here as we write them.
  await displayMenu();      
};

connect()