const express = require('express');
const router = express.Router();
const userValiddation = require('../validators/userValidation')
const user = require('../models/user')
const mongoose = require('mongoose')
const {viewAllContact, createContact,viewSingeContact,deleteContact,updateContact,updateSingleContact} = require('../controller/contactController')

//------------------------------POST ROUTE----------------------------------------------
router.post('/', createContact)

//--------------------------------GET ROUTE -------------------------------------------

router.get('/', viewAllContact )

//---------------------------------GET ROUTE FOR SINGLE USER---------------------------

router.get('/:id', viewSingeContact )

//------------------------------------DELETE ROUTE--------------------------------------
router.delete('/:id',deleteContact )

//----------------------------UPDATE ROUTE--------------------------------------------

router.put('/update/:id', updateContact )

//-------------------------------SINGLE DATA UPDATE ROUTE --------------------------------


// router.patch('/update/:id', async (req, res) => {
//     try {
//         let id = req.params.id;
//         if(!mongoose.Types.ObjectId.isValid(id)){
//             return res.status(400).json({message: 'Invalid mongo id..!!!'})
//         }

//         let user1 = await user.findById(id);
//         if(!user1){
//             return res.status(404).json({message: 'Contact not found..!!!'})
//         }

//         let { name, surname, email, phone } = req.body;
//         let newname = name;
//         let newsurname = surname;
//         let newemail = email;
//         let newphone = phone;
//         let data = await user.findByIdAndUp; 
//         date(id, { name, surname, email, phone: newphone })
//         res.status(200).json({ message: 'Contact Updated..!!!' })
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal Server Error..!!!' })
//     }

// })

//----------------THIS IS SECOND ROUTE FOR UPDATE TWO OR THREE PARAMETER-----------------------------------

router.patch('/update/:id', updateSingleContact );

module.exports = router;