const mongoose = require("mongoose");



const InquerySchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
         validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email address.`,
      },
    },
    mobile: {
        type: Number,
        required: true,
    //     validate: {
    //     validator: function (value) {
    //       return /^[6-9]\d{9}$/.test(value);
    //     },
    //     message: (props) =>
    //       `${props.value} is not a valid Indian mobile number.`,
    //   },
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Inquery = mongoose.model("Inquery", InquerySchema);

module.exports = Inquery;