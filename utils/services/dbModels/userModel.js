const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const userSchema = new Schema({
    alias: { type: String, default: "", index: { unique: true, dropDups: true } },
    slug: { type: String, index: { unique: true, dropDups: true }},
    fb: {
        id: { type: String, default: "", index: true },
        name: { type: String, default: "" },
        picture: {
            data: {
                url: { type: String, default: "" }
            }
        },
        email: { type: String, default: "" }
    },
    hasPassword: { type: Boolean, default: true },
    mergedWithFB: { type: Boolean, default: false },
    city: { type: String, default: "" },
    college: { type: String, default: "" },
    email: { type: String, index: { unique: true, sparse: true, dropDups: true } },
    name: { type: String, default: "" },
    pwd: {
        hash: { type: String, default: "" },
        salt: { type: String, default: "" },  
        iterations: { type: Number, default: 10000 }
    },
    accessToken: {
        value: { type: String, default: "" },
        expiration: { type: Date, default: Date.now }
    },
    profilePic: { type: String, default: "" },
    privacy: { type: Boolean, default: false }
});

mongoose.model('UserModel', userSchema);