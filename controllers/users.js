{/*
    In this file we define the getUsers function to handle requests for a specific user by its ID.

    */}

const {users} = require('../data/data');


const getUsers = ((req,res)=>{
      // 1. Extract the ID from the URL parameters
    const userId = parseInt(req.params.id); 

    // 2. Find the specific user in the array
    const user = users.find((u) => u.id === userId);

    // 3. Logic Gate: Handle the case where the user doesn't exist
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User with id ${userId} not found`
        });
    }

    // 4. Success Response: Send the user data back
    res.status(200).json({
        success: true,
        data: user,
        message: `User with id ${userId} found successfully`
    });
}
);

const allUsers = ((req, res)=>{
       res.json({success: true, data: users,
    totalAmountOfUsers: users.length
})
})


module.exports = {getUsers, allUsers};