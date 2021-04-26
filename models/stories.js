const mongoose = require("mongoose");

const storiesSchema = new mongoose.Schema(
  {
    story_file: [
        { post: { type: String } }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    viewedBy: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    viewcount: { type:Number, default:0 }
    // viewedBy: [ 
    //   {
    //   viewer: { 
    //     type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    //   },
    //   viewcount: { type:Number, default:0 }
    // }
    // ],
  },
  { timestamps: true });

module.exports = mongoose.model("Stories", storiesSchema);