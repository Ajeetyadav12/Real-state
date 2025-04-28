import db from "../config/db.js"

const baseURL = 'http://localhost:6001'



function addProperty(req, res) {
    const {
      title,
      price,
      location,
      discription,
      Type,
      size,
      rooms,
      Washrooms,
    } = req.body;
  
    if (!title || !price || !location || !Type || !size || !rooms || !Washrooms) {
      return res
        .status(400)
        .send({ msg: "All fields except description and image are required", success: false });
    }
  
    const imageUrls = req.file ? req.file.filename : null;
  
    const query = `INSERT INTO Property (title, price, location, discription, Type, size, rooms, Washrooms, imageUrls)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    db.query(
      query,
      [title, price, location, discription || "", Type, size, rooms, Washrooms, imageUrls],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send({ msg: "Database error", success: false });
        }
        res.status(202).send({
          msg: "Property added successfully",
          result: result,
          success: true,
        });
      }
    );
  }
  

function deleteProperty(req,res){
    try {
        const id = req.params.id;
        if(!id || isNaN(id)){
            return res
            .status(400)
            .send({ msg: "Invalid category ID", success: false });
        }
        const query2 = `delete from property where id=?;`
        db.query(query2,[id],(err,result)=>{
            if(err) throw err
            if (result.affectedRows === 0) {
                return res
                  .status(400)
                  .send({ msg: "property not found", success: false });
              }
              res.status(200).send({ msg: "property deleted", success: true });

        
        })
        
    } catch (error) {
        res.status(500).send({msg:"server error "})

    }

}


function updateProperty(req, res) {
  const id = req.params.id;
  const {
    title,
    price,
    location,
    discription,
    Type,
    size,
    rooms,
    Washrooms,
  } = req.body;

  try {
    if (!id || isNaN(id)) {
      return res
        .status(400)
        .send({ msg: "Invalid property ID", success: false });
    }

    // ✅ New image file if uploaded
    const newImage = req.file ? req.file.filename : null;

    // ✅ Build dynamic query and params
    let updateQuery = `UPDATE Property SET `;
    let updateParams = [];
    const fields = {
      title,
      price,
      location,
      discription,
      Type,
      size,
      rooms,
      Washrooms,
    };

    Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined) {
        updateQuery += `${key} = ?, `;
        updateParams.push(value);
      }
    });

    if (newImage) {
      updateQuery += `imageUrls = ?, `;
      updateParams.push(newImage);
    }

    // Remove last comma
    updateQuery = updateQuery.slice(0, -2);
    updateQuery += ` WHERE id = ?`;
    updateParams.push(id);

    db.query(updateQuery, updateParams, (err, result) => {
      if (err) throw err;

      if (result.affectedRows === 0) {
        return res
          .status(400)
          .send({ msg: "Property not found", success: false });
      }

      res.status(200).send({
        msg: "Property updated successfully",
        result,
        success: true,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error", success: false });
  }
}

function getAllProperty(req, res) {
  try {
    let query = "SELECT * FROM Property WHERE 1=1";
    let queryParams = [];

    const { location, maxPrice, type, bedrooms } = req.query;

    if (location) {
      query += " AND LOWER(location) LIKE ?";
      queryParams.push(`%${location.toLowerCase()}%`);
    }

    if (maxPrice) {
      query += " AND price <= ?";
      queryParams.push(maxPrice);
    }

    if (type) {
      query += " AND LOWER(Type) = ?";
      queryParams.push(type.toLowerCase());
    }

    if (bedrooms) {
      query += " AND rooms >= ?";
      queryParams.push(bedrooms);
    }

    db.query(query, queryParams, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ msg: "Database error", success: false });
      }

      const properties = result.map((b) => ({
        ...b,
        imageUrls: b.imageUrls
          ? `${baseURL}/uploads/${b.imageUrls}`
          : null,
      }));

      res.status(200).send({ properties, success: true });
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error", success: false });
  }
}



export default {addProperty,deleteProperty,updateProperty,getAllProperty}
