const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: "Please provide Reaction text!",
      maxlength: 280,
    },
    username: {
      type: String,
      Required: "Please provide a Username!",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value) => moment().format("MMM Do YY, h:mm a")
    },
  }
)

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Please provide Thought text!",
      minLength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value) => moment().format("MMM Do YY, h:mm a")
    },
    // should be the user who made the thought
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
);

const Thought = model("Thought", thoughtSchema)

module.exports = { thoughtSchema, Thought }
