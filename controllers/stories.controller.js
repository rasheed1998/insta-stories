const Stories = require("../models/stories");


exports.createStories = (req, res) => {

    let story_file = [];

  if (req.files.length > 0) {
    story_file = req.files.map((file) => {
      return { post: file.location };
    });
  }

  const story =  new Stories ({
    story_file,
    // createdBy: req.user._id,
    createdBy: req.body.id
  })

  story.save((error, story) => {
    if (error) return res.status(400).json({ error });
    if (story) {
      res.status(201).json({ story, files: req.files });
    }
  });
};

exports.getAllStories = async (req, res) => {
    const story = await Stories.find() 
      .exec();
  
    res.status(200).json({ story });
  };

exports.getviewcount = async(req, res) => {
  const user_id = req.user._id;
  const story_id = req.params.sid;
  // console.log(user_id)
  // console.log(req.user)
  await Stories.findOne({ _id : story_id }).exec( (error, story) => {
        if (error) return res.status(400).json({ error });
        if (story) {
            console.log(story);
        }
  });     


  // const story = await Stories.findOneAndUpdate( //{ _id : { $nin: [user_id] }},
  //   { _id : story_id},
  //   { $inc: {viewcount:1}, $addToSet:{viewedBy: [user_id]}})  // for addToSet --> the user_id will be inserted in an 
  //   //array in viewedBy field in mongodb
  //   .exec()
  //   .then((result) => {
  //     res.status(200).json({ result })
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //     res.status(400).json ( {e} );
  //   });

};


// exports.getviewcount = async (req, res) => {
//   const user_id = req.user._id;
//   console.log(user_id)
//   console.log(req.user)
//   const story_id = req.params.sid;
//   console.log(story_id);
//   await Stories.findOne({ _id : story_id }).exec(async (error, story) => {
//     if (error) return res.status(400).json({ error });
//     if (story) {
//       console.log(story);
//       // await Stories.findOneAndUpdate({_id: story_id}, {$addToSet:{viewedBy:{viewer: [user_id]}, $inc: {viewedBy:{viewcount:1}}}}).exec()
      // const viewer_id = req.body.viewedBy.viewer;
      // console.log(view);
      // const uid = story.viewedBy.find ( (c) => c.viewer == viewer_id);
      // console.log(uid);
      // if (uid){
      //   Stories.findOne( //{ _id : { $nin: [user_id] }},
      //     { _id : story_id})
      //     // { $inc: {viewcount:0}, $addToSet:{viewedBy: [user_id]}})  // for addToSet --> the user_id will be inserted in an 
      //     //array in viewedBy field in mongodb
      //     .exec()
      //     .then((result) => {
      //       res.status(200).json({ message: "already viewed" })
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //       res.status(400).json ( {e} );
      //     });
      // }
      // else{
      //   Stories.findOneAndUpdate( //{ _id : { $nin: [user_id] }},
      //         { _id : story_id},
      //         { $inc: {viewcount:1}, $addToSet:{viewedBy: [user_id]}})  // for addToSet --> the user_id will be inserted in an 
      //         //array in viewedBy field in mongodb
      //         .exec()
      //         .then((result) => {
      //           res.status(200).json({ result })
      //         })
      //         .catch((e) => {
      //           console.log(e);
      //           res.status(400).json ( {e} );
      //         });
      // }
    // }
    // console.log(s1);
    // res.status(200).json({story});
  // })

    
// };
// 




