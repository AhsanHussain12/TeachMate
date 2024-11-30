import GIG from "../Models/gig.model.js";


export default class GigController {

    getGigDetails = async (req, res) => {
        const {gigId} = req.params
        try {
            if (!gigId){
            return res.status(404).json({message: 'Gig not found'});
            }
            const data = await GIG.getDetails(gigId);
            console.log(data);
            res.status(200).json(data);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}