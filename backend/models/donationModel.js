const mongoose=require("mongoose");
const donationSchema=new mongoose.Schema({
    itemName:{
        type: String,
        required: [true, "Item name is required"],
        maxLength: [30, "Item name is too long"],
        minLength: [2, "Item name is too short"]

    },
    itemImages:[
      {
          public_id:{
              type:String,
              required:true
          },
          url:{
              type:String,
              required:true
          }
      }
  ],
  quantity:{
    type: Number,
    default: 1
  },
    donationStatus: {
        type: String,
        default: "Pending",
        required: [true, "Donation status is required"]
      },
    donatorId: {
        type: String,
        default: "",
      },
      orgId: {
        type: String,
        default: "",
      },
    categoryOfItem: {
        type: String,
        required: [true, "Category of item is required"]
      },
    descriptionOfDonation: {
        type: String,
        required: [true, "Description of donation is required"]
      },
    coordinates: {
        type: String,
        required: [true, "Coordinates are required"]
      },
    deliveryMode: {
        type: String,
        required: [true, "Delivery mode is required"]
      },
    });

 module.exports = mongoose.model('Donation', donationSchema);
