const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require("./getCurrentUser");
const addProject = require("./AddProject");
const deleteProject =require("./deleteProject");



module.exports = {
    register,
    login,
    logout,
    getCurrentUser,
    addProject,
    deleteProject  
}