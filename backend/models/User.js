// // // const mongoose = require("mongoose");
// // // const bcrypt = require("bcryptjs");

// // // const userSchema = new mongoose.Schema({
// // //     fullname: {
// // //         type: String,
// // //         required: [true, "Please provide your full name"],
// // //         trim: true
// // //     },
// // //     email: {
// // //         type: String,
// // //         required: [true, "Please provide your email"],
// // //         unique: true,
// // //         lowercase: true,
// // //         trim: true,
// // //         match: [/\S+@\S+\.\S+/, "Please provide a valid email"]
// // //     },
// // //     password: {
// // //         type: String,
// // //         required: [true, "Please provide a password"],
// // //         minlength: [6, "Password must be at least 6 characters"]
// // //     }
// // // },
// // // {   
// // //     timestamps: true
// // // });

// // // // Hash password before saving
// // // // userSchema.pre("save", async function(next){
// // // //     if(!this.isModified("password")){   
// // // //         return next();
// // // //     }
// // // //     this.password = await bcrypt.hash(this.password, 12);
// // // //     next();
// // // // });

// // // // userSchema.pre("save", async function(next){

// // // //     console.log("PRE SAVE RUNNING");

// // // //     if(!this.isModified("password")){
// // // //         return next();
// // // //     }

// // // //     this.password = await bcrypt.hash(this.password, 12);

// // // //     console.log("PASSWORD HASHED");

// // // //     next();
// // // // });
// // // userSchema.pre("save", async function () {

// // //     console.log("PRE SAVE RUNNING");

// // //     if (!this.isModified("password")) {
// // //         return;
// // //     }

// // //     this.password = await bcrypt.hash(this.password, 12);

// // //     console.log("PASSWORD HASHED");
// // // });
// // // // Compare Password method
// // // userSchema.methods.comparePassword = async function(candidatePassword){
// // //     return await bcrypt.compare(candidatePassword, this.password);
// // // }

// // // module.exports = mongoose.model("User", userSchema);

// // const mongoose = require("mongoose");
// // const bcrypt = require("bcryptjs");

// // const userSchema = new mongoose.Schema(
// //   {
// //     fullName: {
// //       type: String,
// //       required: [true, "Full name is required"],
// //       trim: true, 
// //     },
// //     email: {
// //       type: String,
// //       required: [true, "Email is required"],
// //       unique: true,
// //       lowercase: true,
// //       trim: true,
// //       match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
// //     },
// //     password: {
// //       type: String,
// //       required: [true, "Password is required"],
// //       minlength: [6, "Password must be at least 6 characters"],
// //     },
// //   },
// //   { timestamps: true }
// // );

// // // Hash password before saving
// // // userSchema.pre("save", async function (next) {
// // //   if (!this.isModified("password")) return next();
// // //   this.password = await bcrypt.hash(this.password, 12);
// // //   next();
// // // });

// // userSchema.pre("save", async function () {
// //   if (!this.isModified("password")) return;

// //   this.password = await bcrypt.hash(this.password, 12);
// // });
// // // Compare password method
// // userSchema.methods.comparePassword = async function (candidatePassword) {
// //   return await bcrypt.compare(candidatePassword, this.password);
// // };

// // module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: [true, "Full name is required"],
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
//     },

//     password: {
//       type: String,
//       required: [true, "Password is required"],
//       minlength: [6, "Password must be at least 6 characters"],
//     },

//     // ===========================
//     // Email Verification Fields
//     // ===========================

//     isVerified: {
//       type: Boolean,
//       default: false,
//     },

//     verificationToken: {
//       type: String,
//       default: null,
//     },

//     verificationTokenExpires: {
//       type: Date,
//       default: null,
//     },


//   },
//   {
//     timestamps: true,
//   }
// );

// // Hash password before saving
// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;

//   this.password = await bcrypt.hash(this.password, 12);
// });

// // Compare password method
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // ===========================
    // User Basic Information
    // ===========================

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },


    // ===========================
    // Email Verification Fields
    // ===========================

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      default: null,
    },

    verificationTokenExpires: {
      type: Date,
      default: null,
    },


    // ===========================
// Reset Password Fields
// ===========================

resetPasswordToken: {
  type: String,
  default: null,
},

resetPasswordExpires: {
  type: Date,
  default: null,
},


    // ===========================
    // Multiple Delivery Addresses
    // ===========================

    addresses: [
      {
        type: {
          type: String,
          enum: ["Home", "Office", "Other"],
          default: "Home",
        },

        fullName: {
          type: String,
          required: true,
          trim: true,
        },

        phone: {
          type: String,
          required: true,
          trim: true,
        },

        street: {
          type: String,
          required: true,
          trim: true,
        },

        city: {
          type: String,
          required: true,
          trim: true,
        },

        state: {
          type: String,
          required: true,
          trim: true,
        },

        pincode: {
          type: String,
          required: true,
          trim: true,
        },

        landmark: {
          type: String,
          default: "",
          trim: true,
        },

        isDefault: {
          type: Boolean,
          default: false,
        },

      },
    ],

  },
  {
    timestamps: true,
  }
);


// ===========================
// Hash Password Before Saving
// ===========================

userSchema.pre("save", async function () {

  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);

});


// ===========================
// Compare Password Method
// ===========================

userSchema.methods.comparePassword = async function (candidatePassword) {

  return await bcrypt.compare(candidatePassword, this.password);

};


module.exports = mongoose.model("User", userSchema);