import Wine from "../../db/models/wines.js";

export const fetchByIdService = async(req, res) => {
  
  try {

    // fetch by wine Id (mongoDB - _id)
    const wine = await Wine.findById(req.params.id);
    
    res.status(200).json(wine);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }

}