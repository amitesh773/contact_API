const userValiddation = require('../validators/userValidation')
const user = require('../models/user')
const mongoose = require('mongoose')

//-----------------------------------GET ROUTE----------------------------
const viewAllContact = async (req, res) => {
    try {
        let data = await user.find();
        console.log("Mai aagyaa")
        res.status(200).json(data)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error..!!!' })
    }
}

//-----------------------------------POST ROUTE-----------------------------------------
const createContact = async (req, res) => {
    try {
        let { error } = userValiddation.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        
        let { name, surname, email, phone } = req.body;
        let existingEmail = await user.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exist..!!!' })
        }

        let existingPhone = await user.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ message: 'Phone alredy existing...!!!' })
        }

        let data = new user(req.body);
        await data.save();
        res.status(200).json({ message: "Data Added" })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error..!!!' })
    }

} 

//------------------------------------GET ROUTE SINGLE USER---------------

const viewSingeContact = async (req, res) => {
    try {
        let id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: 'Invalid mongo id..!!!'})
        }
    
        let data = await user.findById(id);
        if(!data){
            return res.status(404).json({message: 'Contact not found..!!!'})
        }

        res.status(200).json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error..!!!' })
    }

}

//-----------------------------------DELETE ROUTE------------------------

const deleteContact = async (req, res) => {
    try {
        let id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: 'Invalid mongo id..!!!'})
        }
        

        let data = await user.findByIdAndDelete(id);
        if(!data){
            return res.status(404).json({message: 'Contact not found..!!!'})
        }

        res.status(200).json({ message: "Data Deleted.." })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error..!!!' })
    }

}

//-------------------------------UPDATE CONTACT----------------------------------

const updateContact = async (req, res) => {
    try {
        let id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: 'Invalid mongo id..!!!'})
        }

        let contactData = await user.findById(id)
        if (!contactData) {
            return res.status(404).json({ message: 'Contact not found..!!!' })
        }

        let { error } = userValiddation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        let { name, surname, email, phone } = req.body;
        let existingEmail = await user.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exist..!!!' })
        }

        let existingPhone = await user.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ message: 'Phone alredy existing...!!!' })
        }

        await user.findByIdAndUpdate(id, req.body)

        res.status(200).json({ message: 'Contact Updated successfully..!!' })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error..!!!' })
    }

}

//-----------------------------UPDATE SINGLE CONTACT ROUTE-----------------------------

const updateSingleContact = async (req, res) => {
    try {
        let id = req.params.id;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Mongo ID..!!!' });
        }

        // Check if the user exists
        let user1 = await user.findById(id);
        if (!user1) {
            return res.status(404).json({ message: 'Contact not found..!!!' });
        }

        // Destructure only phone and email from request body
        const { email, phone } = req.body;

        // Update only phone and email

        let updatedData = await user.findByIdAndUpdate(id, { email, phone }, { new: true });
        res.status(200).json({ message: 'Contact Updated..!!!', updatedData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error..!!!' });
    }
}


module.exports = {viewAllContact,createContact,viewSingeContact,deleteContact,updateContact,updateSingleContact}