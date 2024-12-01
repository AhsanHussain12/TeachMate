import GIG from "../Models/gig.model.js";
import Teacher from "../Models/teacher.model.js";
import { comparePasswords } from "../Utils/pass_Hash.js";

export default class TeacherController {

    getAllstudents = async (req, res) =>{
        const userId = req.userId
        console.log("userId: " + userId)
        try {
            const students = await Teacher.getTutorstudents(userId);
            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    };

    getAllappliedGigs = async (req, res) => {
        const userId = req.userId 
        console.log("userId: " + userId)
        try {
            const gigs = await Teacher.getTutorAppliedGigs(userId);
            res.status(200).json(gigs);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    };

    getProfile = async (req, res) => {
        const userId = req.userId
        console.log("userId: " + userId)
        try {
            const teacher = await Teacher.getTutorProfile(userId);
            res.status(200).json(teacher);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    };

    getStudentCounts = async (req,res)=>{
        const userId = req.userId
        console.log("userId: " + userId)
        try {
            const homeCount = await Teacher.getHomeTutionsCount(userId);
            const onlineCount = await Teacher.getOnlineTutionsCount(userId);
            const allstudentCount= await Teacher.getAllStudentCount(userId);
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
        const userId = req.userId
        console.log("userId: " + userId) 
        try {
            const gigs = await Teacher.getAllGigs(userId);
            res.status(200).json(gigs);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    };

    changePassword = async (req,res) => {
        const userId = req.userId  
        console.log("userId: " + userId)
        try {
            const {oldPassword,newPassword } = req.body
            const oldHashpassword = await Teacher.getTeacherPassword(userId)

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
        // req.userId from middleware using JWT token
        const {gigId} = req.params
        const userId = req.userId
        try {
            
            console.log(gigId);
            console.log("userId: " + userId)
            const insertId = await GIG.applyToGig(gigId,userId)
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
        const userId = req.userId
        console.log("userId: " + userId)
        try {
            const name = await Teacher.getTeacherName(userId);
            console.log(name)
            res.status(200).json( name );
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    };

    editProfileInformation = async (req, res) => {
        // req.userId from middleware using JWT token
        const userId = req.userId  // get userId from middleware
        console.log("userId: " + userId)
        try {
            const { fullName,phoneNum } = req.body.profile;
            console.log(fullName, phoneNum);
            
            // validate inputs
            if (!fullName || !phoneNum) {
                return res.status(400).json({ message: 'Required Data Fields might be missing ' });
            }

            const statusFlag = await Teacher.editProfile(userId,fullName,phoneNum)

            console.log("Status: ",statusFlag)

            if(statusFlag == 1) // 1 on success else throw err
            res.status(200).json({ message: 'Profile information edited successfully' })
            
        } catch (error) {
            res.status(500).json({ message: 'Not able to Edit Profile try Later ' })
        }
    };

    teacherSignup = async(req,res) => {
        try {
            // after signup redirects back to login no need to pass token for dashboard access
            if (Object.keys(req.body).length === 0){
            return res.status(400).json({ message: 'Required Data Fields might be missing ' });
            }

            const checkUserExistencs = await Teacher.getTeacherByEmail(req.body.email); 
            if(checkUserExistencs.length > 0){
                return res.status(409).json({ message: 'Email already exist' });
            }

            const statusFlag = await Teacher.signUp(req.body)
            if(statusFlag == 1){
                return res.status(200).json({type:"teacher", message: 'SignUp Successfull' })
            }else {
                return res.status(400).json({ message: 'SignUp Failed' });
            }
           
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'SignUp Failed' });
        }
    };
}
