import Admin from "../Models/admin.model.js";
import AdminGigAssignment from "../Models/adminGigassignment.model.js";
import GIG from "../Models/gig.model.js";
import TutorGigApplication from "../Models/tutorGigapplication.model.js";

export default class AdminController {

    getAssignedGigs = async (req, res) => {
        const userId =  req.userId // change when middleware applied
        try {
            const data = await Admin.getAdminAssignedGigs(userId);
            console.log(data);
            res.status(200).json(data);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getPendingGigs = async (req, res) => {
        try {
            const data = await Admin.getUnassignedGigs();
            console.log(data);
            res.status(200).json(data);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getAdmins = async (req, res) => {
        try {
            const data = await Admin.getAllAdmins();
            console.log(data);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getAppliedTutors = async (req,res) => {
        const {gigId} = req.params
        try {
            const data = await TutorGigApplication.getTutorsOfGig(gigId)
            console.log(data);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    setGigStatus = async (req, res)=>{
        // if approved then gig-> status close and tutorgigapplication-> status approved
        // else if rejected then gig-> status unchanged and tutorgigapplication-> status rejected
        console.log("Gig status")
        console.log(req.body);
        const {gigId, status, tutorId} = req.body;
        try {
                if (!gigId ||!status || !tutorId){
                    return res.status(404).json({message: 'Invalid parameters'});
                }
                if (status === "approved"){
                    const gigStatusFlag = await GIG.setGigStatus(gigId, "closed");
                    const applicationStatusFlag = await TutorGigApplication.setApplicationStatus(tutorId,gigId,status)
                    if(applicationStatusFlag && gigStatusFlag){
                        return res.status(200).json({ message: 'Gig status updated successfully' });
                    }
                    else{
                        return res.status(400).json({ message: 'Failed to update gig status or application status' });
                    }
                    
                }
                else if (status === "rejected"){
                    const applicationStatusFlag = await TutorGigApplication.setApplicationStatus(tutorId,gigId,status)
                    if(applicationStatusFlag){
                        return res.status(200).json({ message: 'Application status updated successfully' });
                    }
                    else{
                        return res.status(400).json({ message: 'Failed to update application status' });
                    }
                }
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    getAdminName = async (req, res) => {
        const userId =  req.userId // change when middleware applied
        try {
            const name = await Admin.getAdminName(userId);
            console.log(name)
            res.status(200).json(name);
            
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    AssignGigToAdmin = async(req,res)=>{
        const {gigId, adminId} = req.body; // here adminId is of the admin whom gig is to be assigned there fore not extracted after middleware
        
        try {
                if (!gigId ||!adminId){
                    return res.status(404).json({message: 'Invalid parameters'});
                }
                const flag = await AdminGigAssignment.AssignGigToAdmin(gigId, adminId)
                console.log(flag)
                if(flag){
                    return res.status(200).json({ message: 'Gig assigned successfully' });
                }
                else{
                    return res.status(400).json({ message: 'Failed to assign gig to admin' });
                }
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    removeAdmin = async (req, res) => {
        const {adminId} = req.params;
        try {
                if (!adminId){
                    return res.status(404).json({message: 'Invalid parameters'});
                }
                const flag = await Admin.removeAdmin(adminId)
                console.log(flag)
                if(flag){
                    return res.status(200).json({ message: 'Admin removed successfully' });
                }
                else{
                    return res.status(400).json({ message: 'Failed to remove admin' });
                }
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    AddAdmin = async (req,res)=>{
        const {designation,email,fullName,password,phoneNumber,} = req.body;
        try {
            if(!designation || !email || !fullName || !password || !phoneNumber){
                return res.status(404).json({message: 'Invalid parameters'});
            }
            const flag = await Admin.AddAdmin(designation,email,fullName,password,phoneNumber)
            console.log(flag)
            if(flag){
                return res.status(200).json({ message: 'Admin added successfully' });
            }
            else{
                return res.status(400).json({ message: 'Failed to add admin' });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }

    }
}