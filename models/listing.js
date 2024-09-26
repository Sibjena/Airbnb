

//code2

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     image: {
//         filename: {
//             type: String,
//         },
//         url: {
//             type: String,
//             default: "https://unsplash.com/photos/a-house-with-a-pool-in-front-of-it-puk9ju-kWHI",
//             set: (v) =>
//                 v === "" ? "https://unsplash.com/photos/a-house-with-a-pool-in-front-of-it-puk9ju-kWHI" : v,
//         },
//     },
//     price: Number,
//     location: String,
//     country: String,
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;

//code3

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     image: {
//         filename:String,
//         url: {
//             type: String,
//             default: "https://unsplash.com/photos/a-house-with-a-pool-in-front-of-it-puk9ju-kWHI",
//             set: (v) =>
//                 v === "" ? "https://unsplash.com/photos/a-house-with-a-pool-in-front-of-it-puk9ju-kWHI" : v,
//         },
//     },
//     price: Number,
//     location: String,
//     country: String,
// });


// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;

//code4

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        filename:String,
        url: {
            type: String,
            default: "https://unsplash.com/photos/a-house-with-a-pool-in-front-of-it-puk9ju-kWHI",
            set: (v) =>
                v === "" ? "https://unsplash.com/photos/a-house-with-a-pool-in-front-of-it-puk9ju-kWHI" : v,
        },
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
      {
        type : Schema.Types.ObjectId,
        ref:"Review",
      },
    ],

owner:{
    type : Schema.Types.ObjectId,
        ref:"User",
    },
});

listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        await Review.deleteMany({id : {$in: listing.reviews }});
    }    
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;