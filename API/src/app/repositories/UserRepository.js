const mongoose = require('../../database/database');
const User = mongoose.model('User');

module.exports = {
    async findByEmail(email) {
        return await User.findOne({ email }).select('+password');
    },

    async register(body) {
        user = await User.create(body);
        return user;
    },

    async getAll() {
        users = await User.find();
        return users;
    },

    //async updateTokenAndExpiringTime(id, token, time) {
    //    await User.findByIdAndUpdate({ _id: id }, {
    //        '$set': {
    //            passwordResetToken: token,
    //            passwordResetExpires: time,
    //        }
    //    })
    //}
}