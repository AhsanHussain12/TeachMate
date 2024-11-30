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
    };

    getAllappliedGigs = async (req, res) => {
        // req.userId from middleware using JWT token
        try {
            const gigs = await Teacher.getTutorAppliedGigs(2);
            res.status(200).json(gigs);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    };

    getProfile = async (req, res) => {
        // req.userId from middleware using JWT token
        try {
            const teacher = await Teacher.getTutorProfile(2);
            res.status(200).json(teacher);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    };

    getStudentCounts = async (req,res)=>{
        // req.userId from middleware using JWT token
        try {
            const homeCount = await Teacher.getHomeTutionsCount();
            const onlineCount = await Teacher.getOnlineTutionsCount();
            const allstudentCount= await Teacher.getAllStudentCount();
            const dashStats = {
                homeCount,
                onlineCount,
                allstudentCount
            }
            console.log(dashStats)
            res.status(200).json(dashStats);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    };

    getGigs = async (req,res)=>{
        try {
            const gigs = await Teacher.getAllGigs(2);
            res.status(200).json(gigs);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    };

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
    };

    // this controller takse gigId from url and tutorId from body 
    // upon success->inserId=1  upon failue->insert id=0 send reponse acc
    applyToGig = async (req,res) => {
        const {gigId} = req.params
        try {
            const { tutorId } = req.body // can get tutorid also from req.body
            console.log(gigId);
            const insertId = await GIG.applyToGig(gigId,tutorId)
            console.log("insertId: ",insertId)
            if(insertId == 1)
            res.status(200).json({ message: 'Applied to GIG successfully' })
            else
            res.status(400).json({ message: 'Not able to Apply to GIG try Later ' })
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    getName = async (req, res) => {
        // req.userId from middleware using JWT token
        try {
            const name = await Teacher.getTeacherName(4);
            console.log(name)
            res.status(200).json( name );
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    };

    editProfileInformation = async (req, res) => {
        // req.userId from middleware using JWT token
        try {
            const { fullName,phoneNum } = req.body.profile;
            console.log(fullName, phoneNum);
            
            // validate inputs
            if (!fullName || !phoneNum) {
                return res.status(400).json({ message: 'Required Data Fields might be missing ' });
            }

            const statusFlag = await Teacher.editProfile(2,fullName,phoneNum)

            console.log("Status: ",statusFlag)

            if(statusFlag == 1) // 1 on success else throw err
            res.status(200).json({ message: 'Profile information edited successfully' })
            
        } catch (error) {
            res.status(500).json({ message: 'Not able to Edit Profile try Later ' })
        }
    };
}
