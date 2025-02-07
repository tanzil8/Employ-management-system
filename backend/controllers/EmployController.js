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
const updateEmployById = async (req, res) => {
  try {
    const { id } = req.params; // Get the employee ID from request parameters
    const { name, email, phone, department, salary } = req.body;
    
    let updateData = {
      name, email, phone, department, salary, updateAt: new Date()
    };
    
    if (req.file) {
      updateData.profileImage = req.file.path; // Handle profile image upload
    }

    const updateEmploy = await EmployesModule.findByIdAndUpdate(id, updateData, { new: true });

    if (!updateEmploy) {
      return res.status(404).json({
        message: "Employee not found",
        success: false
      });
    }

    // Respond with success and the updated employee data
    res.status(200).json({
      message: "User updated successfully",
      success: true,
      body: updateEmploy
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
};

const getEmploy = async (req, res)=>{
    
    try {
      let {page, limit, search} = req.query;

      page = parseInt(page) ||  1
      limit = parseInt(limit)  || 5

      let skip = (page - 1) * limit 
      let searchCri = {}

      if (search) {
        searchCri = {
          name: {
            $regex: search,
            $options: 'i'
          }
        }
      }

      const totalEmp = await EmployesModule.countDocuments(searchCri)
      
        let emp = await EmployesModule.find(searchCri).skip(skip).limit(limit).sort({ updateAt: -1})

        let totalPages = Math.ceil(totalEmp / limit)
    
        res.status(200).json({
          message: "User created successfully",
          success: true,
         datta: {
          employ : emp,
          pagenation: {

            page: totalPages,
            totalemp : totalEmp,
            pageSize: limit,
            currentPage: page
          }
          
         }
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
const getEmployById = async (req, res)=>{
    
    try {
      const {id} = req.params
        let emp = await EmployesModule.findOne({_id: id});
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
const getEmployDelete = async (req, res)=>{
    
    try {
      const {id} = req.params
        let emp = await EmployesModule.findByIdAndDelete({_id: id});
        // Respond with success and the employee data
        res.status(200).json({
          message: "User delete successfully",
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

export { createemploye, getEmploy,getEmployById,getEmployDelete , updateEmployById};