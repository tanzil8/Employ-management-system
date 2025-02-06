import EmployesModule from "../modules/Employmodule.js";

const createemploye = async (req, res)=>{
    
    try {
        const body = req.body;
        console.log(body);
    
        // If a file is uploaded, assign its path to profileImage
        body.profileImage = req.file ? req.file?.path : null;
    
        let emp = new EmployesModule(body);
    
        // Save the employee to the database
        await emp.save();
    
        // Respond with success and the employee data
        res.status(200).json({
          message: "User created successfully",
          success: true,
          body: emp
        });
      } catch (error) {
        // Handle any errors and send a response
        console.error(error);
        res.status(500).json({
          message: "Internal server error",
          success: false,
          error: error.message || error
        });
      }
}

const getEmploy = async (req, res)=>{
    
    try {
      
        let emp = await EmployesModule.find({});
        // Respond with success and the employee data
        res.status(200).json({
          message: "User created successfully",
          success: true,
          body: emp
        });
      } catch (error) {
        // Handle any errors and send a response
        console.error(error);
        res.status(500).json({
          message: "Internal server error",
          success: false,
          error: error.message || error
        });
      }
}

export { createemploye, getEmploy };