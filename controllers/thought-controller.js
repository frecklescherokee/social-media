const { Thought, User } = require("../models");

const thoughtController = {
 
  postNewThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
    .then(({ _id }) => {
        return User.findOneAndUpdate(
        { username: body.username },
        { $push: { thoughts: _id } },
        { new: true }
        );
    })
    .then(dbUserData => {
        if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
        }
        res.json(dbPizzaData);
    })
    .catch(err => res.json(err));
  },

  /////////////////////////
  
//   postNewReaction({ params, body }, res) {
//     Thought.findOneAndUpdate(
//         { _id: params.commentId },
//         { $push: { reactions: body } },
//         { new: true, runValidators: true }
//     )
//     .then(dbUserData => {
//         if (!dbUserData) {
//         res.status(404).json({ message: 'No thought found with this id!' });
//         return;
//         }
//         res.json(dbUserData);
//     })
//     .catch(err => res.json(err));
// },
  
  postNewReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "The specified Thought ID does not exist!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
 ////////////////////////////
  // read all thoughts from database
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // U
  // update thought by id
  updateThoughtById({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // D
  // delete thought by id
  deleteThoughtById({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteReactionById({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { _id: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
