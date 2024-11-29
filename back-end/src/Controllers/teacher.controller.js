import GIG from "../Models/gig.model.js";
import Teacher from "../Models/teacher.model.js";
import { comparePasswords } from "../Utils/pass_Hash.js";

export default class TeacherController {

    getAllstudents = async (req, res) =>{
        // req.userId from middleware using JWT token
        try {
            const students = await Teacher.getTutorstudents(2);
            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    getAllappliedGigs = async (req, res) => {
        // req.userId from middleware using JWT token
        try {
            const gigs = await Teacher.getTutorAppliedGigs(2);
            res.status(200).json(gigs);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    getProfile = async (req, res) => {
        // req.userId from middleware using JWT token
        try {
            const teacher = await Teacher.getTutorProfile(2);
            res.status(200).json(teacher);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    getStudentCounts = async (req,res)=>{
        // req.userId from middleware using JWT token
        try {
            const homeCount = await Teacher.getHomeTutionsCount();
            const onlineCount = await Teacher.getOnlineTutionsCount();
            const allstudentCount= await Teacher.getAllStudentCount();
            res.status(200).json({
                 homeCount,
                 onlineCount,
                 allstudentCount
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    getGigs = async (req,res)=>{
        try {
            const gigs = await Teacher.getAllGigs(2);
            res.status(200).json(gigs);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    changePassword = async (req,res) => {
        // req.userId from middleware using JWT token
        try {
            const {oldPassword,newPassword } = req.body
            const oldHashpassword = await Teacher.getTeacherPassword(2)

            if(comparePasswords(oldPassword,oldHashpassword)){
                if (oldPassword === newPassword) {
                    return res.status(400).json({ message: 'New password cannot be the same as the old one' });
                }
                await Teacher.storeTeacherPassword(2,newPassword)
                return res.status(200).json({ message: 'Password changed successfully' })
            }

            res.status(400).json({ message: 'Incorrect old password' });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    applyToGig = async (req,res) => {
        // req.userId from middleware using JWT token
        try {
            const { gigId } = req.body
            console.log(gigId);
            await GIG.applyToGig(gigId,2)
            return res.status(200).json({ message: 'Applied to GIG successfully' })
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

}
