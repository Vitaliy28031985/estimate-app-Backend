const { Estimate, Projects } = require('../../models/estimate');

const add = async (req, res) => {
    try { 
    const { estimates } = req.body;
    const { projectId } = req.params

    console.log(estimates);
        
    const estimatesNew = {
        title: estimates.title,
    }
    
   
    const updateProject = await Projects.findByIdAndUpdate(projectId, { $push: { estimates: estimatesNew } }, { new: true });    
        res.status(201).json(updateProject);

    } catch (error) {
    console.error('Error adding positions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        
  }

    // const result = await Estimate.create(body);
     
}

module.exports = add