import Student from "../Models/student.model.js";
import TutorGigApplication from "../Models/tutorGigapplication.model.js";
import { comparePasswords } from "../Utils/pass_Hash.js";

export default class StudentController {
    // Get the student's profile
    getProfile = async (req, res) => {
        const userId = req.userId; // Student ID from middleware
        console.log("userId: " + userId);
        try {
            const student = await Student.getStudentProfile(userId);
            res.status(200).json(student);
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    };

    // Get counts for home, online, and all tuitions
    getTuitionCounts = async (req, res) => {
        const userId = req.userId;
        console.log("userId: " + userId);
        try {
            const homeCount = await Student.getHomeTutionsCount(userId);
            const onlineCount = await Student.getOnlineTutionsCount(userId);
            const allTuitionsCount = await Student.getAllTutionsCount(userId);
            const dashStats = {
                homeCount,
                onlineCount,
                allTuitionsCount,
            };
            console.log(dashStats);
            res.status(200).json(dashStats);
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    };

    // Get gigs associated with the student
    getStudentGigs = async (req, res) => {
        const userId = req.userId; // Student ID from middleware
        console.log("userId: " + userId);
        try {
            const gigs = await Student.getMyGigs(userId);
            res.status(200).json(gigs);
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    };

    // Post a new gig
    postGig = async (req, res) => {
        const userId = req.userId; // Student ID from middleware
        console.log("userId: " + userId);
        const { gigTitle, studentsInstitute, studentArea, expectedFee, details, gigType } = req.body;

        // Validate input
        if (!gigTitle || !studentArea || !expectedFee || !details || !gigType) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        try {
            const result = await Student.createGig(userId, gigTitle, studentsInstitute, studentArea, expectedFee, details, gigType);
            console.log(result);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: "Failed to create gig" });
        }
    };

    // Change password
    changePassword = async (req, res) => {
        const userId = req.userId; // Student ID from middleware
        console.log("userId: " + userId);
        const { oldPassword, newPassword } = req.body;

        try {
            const oldHashedPassword = await Student.getStudentPassword(userId);

            if (comparePasswords(oldPassword, oldHashedPassword)) {
                if (oldPassword === newPassword) {
                    return res.status(400).json({ message: "New password cannot be the same as the old one" });
                }

                await Student.storeStudentPassword(userId, newPassword);
                return res.status(200).json({ message: "Password changed successfully" });
            }

            res.status(400).json({ message: "Incorrect old password" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

    // Get student's name
    getName = async (req, res) => {
        const userId = req.userId; // Student ID from middleware
        console.log("userId: " + userId);
        try {
            const name = await Student.getStudentName(userId);
            console.log(name);
            res.status(200).json(name);
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    };

    // Edit profile information
    editProfileInformation = async (req, res) => {
        const userId = req.userId; // Student ID from middleware
        console.log("userId: " + userId);
        const { fullName, phoneNum } = req.body.profile;

        // Validate input
        if (!fullName || !phoneNum) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        try {
            const statusFlag = await Student.editProfile(userId, fullName, phoneNum);

            if (statusFlag === 1) {
                res.status(200).json({ message: "Profile information updated successfully" });
            } else {
                res.status(400).json({ message: "Failed to update profile information" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

    // Signup for a student
    studentSignup = async (req, res) => {
        try {
            if (Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: "Required fields are missing" });
            }

            const existingStudent = await Student.getStudentByEmail(req.body.email);
            if (existingStudent.length > 0) {
                return res.status(409).json({ message: "Email already exists" });
            }

            const statusFlag = await Student.signUp(req.body);
            if (statusFlag === 1) {
                return res.status(200).json({ type: "student", message: "Signup successful" });
            } else {
                return res.status(400).json({ message: "Signup failed" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Signup failed" });
        }
    };

    getTeachers = async (req, res) => {
        const userId = req.userId;
        console.log("userId: " + userId);
        try {
            const teachers = await Student.getMyTeachers(userId);
            res.status(200).json(teachers);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    };
    getAppliedTutors = async (req, res) => {
        const {gigId} = req.params
        console.log("gigId: " + gigId)
        try {
            if(!gigId){
                return res.status(400).json({ message: 'Invalid gigId' });
            }
            const teachers = await TutorGigApplication.getTutorsOfGig(gigId,'student');
            res.status(200).json(teachers);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }

    };
}
