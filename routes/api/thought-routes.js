const router = require("express").Router();


// import thought-controllers
const {
  postNewThought,
  getAllThoughts,
  getThoughtById,
  updateThoughtById,
  deleteThoughtById,
  postNewReaction,
  deleteReactionById,
} = require("../../controllers/thought-controller");


// api/thoughts/
router.route("/").post(postNewThought).get(getAllThoughts);


// api/thoughts/:id
router.route("/:id").get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById).post(postNewReaction);


// api/thoughts/:userId/:thoughtId
router.route("/:userId/:thoughtId").put(updateThoughtById);

// // api/thoughts/:thoughtId/reaction
// router.route("/:thoughtId/reaction").post(postNewReaction);


// api/thoughts/:thoughtId/reaction/:reactionId
router.route("/:thoughtId/reaction/:reactionId").put(deleteReactionById);

module.exports = router;
