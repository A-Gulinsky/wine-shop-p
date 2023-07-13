import Wine from "../../db/models/wines.js";

export const fetchByQueryService = async(req, res) => {
  
  try {

    const searchTerm = req.body.search;

    // database search query with params
    const wines = await Wine.find({ name: { $regex: searchTerm, $options: 'i' },
    });
 
    res.status(200).json(wines)
  } catch (err) {
    console.log(err)
    res.status(500).send("Internal server error")
  }
}