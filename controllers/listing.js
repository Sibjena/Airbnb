const Listing = require("../models/listing");


//index rout
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};
module.exports.renderNewForm= (req, res) => {
    res.render("listings/new.ejs");
  };


  //show routs
  module.exports.showListing = async(req,res) =>{
    let {id}= req.params;
   const listing = await Listing.findById(id)
   .populate({path:"reviews",
    populate:{path:"author",},
   })
   .populate("owner");

   if(!listing){
    req.flash("error", "Listing does not exist!");
   res.redirect("/listings");
  }
  console.log(listing);
   res.render("listings/show.ejs", { listing });
};


//create route
module.exports.createListing = async (req,res,next) => {
    console.log(req.body.listing)
    const newListing = new Listing (req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};


//edit rout
module.exports.renderEditForm = async (req,res) =>{
    let {id}= req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error", "Listing does not exist!");
     res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });

};


//update rout
module.exports.updateListing = async(req,res)=>{
  
    let { id } = req.params;
    const updatedData = req.body.listing;
    // const listing = await Listing.findById(id);
    if (updatedData.image && updatedData.image.url === "") {
      updatedData.image.url = listing.image.url;
    }
    console.log(updatedData);

    await Listing.findByIdAndUpdate(id, updatedData);
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  };

  
  //delete rout
  module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
  };