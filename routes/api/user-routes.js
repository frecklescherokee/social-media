const router = require("express").Router();
const {
  getAllUsers,
  postNewUser,
  getUserById,
  updateUserById,
  deleteUserById,
  postNewFriend,
  deleteFriendById,
} = require("../../controllers/user-controller");

// api/users/
router.route("/").get(getAllUsers).post(postNewUser);

// api/users/:id
router
  .route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

// api/users/:userId/friends/:freindId
router
  .route("/:userId/friends/:friendId")
  .post(postNewFriend)
  .delete(deleteFriendById);

module.exports = router;
