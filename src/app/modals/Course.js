const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.plugin(slug)

const Schema = mongoose.Schema;

const Course = new Schema({
    _id:{ type: Number,},
    name: { type: String, required: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    slug: { type: String, slug: 'name', unique: true },
    videoId: { type: String, required: true },
    level: { type: String, maxLength: 255 },
    imgURL: { type: String },
    forChangeImg: { type: String },

}, {
    _id:false,
    timestamps: true,
})
Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,

})

Course.query.sortable = function(req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type)

        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : "desc"
        })
    }
    return this
}

module.exports = mongoose.model('Course', Course)
    // Requiring module
    // const mongoose = require('mongoose');

// // Course Modal Schema
// const courseSchema = new mongoose.Schema({
//     _id: Number,
//     name: String,
//     category: String
// });

// // Student Modal Schema
// const studentSchema = new mongoose.Schema({
//     name: String,
//     enroll: Number,
//     courseId: Number
// });

// // Teacher Modal Schema
// const teacherSchema = new mongoose.Schema({
//     name: String,
//     teacher_id: Number,
//     courseId: Number
// })

// // Creating model objects
// const Course = mongoose.model('course', courseSchema);
// const Student = mongoose.model('student', studentSchema);
// const Teacher = mongoose.model('teacher', teacherSchema);

// // Exporting our model objects
// module.exports = {
//     Student, Course, Teacher
// }