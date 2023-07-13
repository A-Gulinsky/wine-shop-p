import Wine from "../../db/models/wines.js";

export const fetchByFilterService = async(req,res) => {
  
  try {

    // load selected choices to this object
    const filter = {};

    // filter checkboxes
    const { color, minPrice, maxPrice, minYear, maxYear, country } = req.body;

    // wine colors
    if (color && color.length > 0) {
      filter.color = { $in: color };
    }

    // input min price
    if (minPrice) {
      filter.price = { $gte: minPrice };
    }

    // input max price
    if (maxPrice) {
      if (filter.price) {
        filter.price.$lte = maxPrice;
      } else {
        filter.price = { $lte: maxPrice };
      }
    }

    // input min year
    if (minYear) {
      filter.year = { $gte: minYear };
    }

    // input max year
    if (maxYear) {
      if (filter.year) {
        filter.year.$lte = maxYear;
      } else {
        filter.year = { $lte: maxYear };
      }
    }

    // wine countries
    if (country && country.length > 0) {
      filter.country = { $in: country };
    }

    // wine search by selected parameters
    const wines = await Wine.find(filter).limit(3)
    res.status(200).json(wines);

  } catch (err) {
    console.log(err)
    res.status(500).send("Internal server error");
  }
}