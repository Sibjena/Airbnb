const express =require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");

//index rout
router.get("/",wrapAsync(listingController.index));
  
  //new rout
  router.get("/new",
    isLoggedIn,listingController.renderNewForm);


  //show rout
  router.get ("/:id", 
    wrapAsync(listingController.showListing)
);

  //Create rout
router.post("/", isLoggedIn, validateListing,
    wrapAsync(listingController.createListing)
  );
  
  
  //edit rout
 router.get("/:id/edit", 
  isLoggedIn,isOwner,
   wrapAsync(listingController.renderEditForm)
);
  
  //update route
 router.put("/:id",
   isLoggedIn, isOwner, validateListing,
    wrapAsync(listingController.updateListing)
  );


//   let { id } = req.params;
//   let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });

//   if(typeof req.file !== "undefined"){
//     let url= req.file.path;
//     let filename=req.file.filename;
//     listing.image={url,filename};
//     await listing.save();
//   }

//   req.flash("success", "Listing Updated!");
//   res.redirect(`/listings/${id}`);
// }));
  
  //delete route
  router.delete("/:id", 
    isLoggedIn,isOwner,
     wrapAsync(listingController.destroyListing)
  );

    module.exports = router;