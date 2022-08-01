const Course = require('../modals/Course')
const { mongooseToObject } = require('../../util/mongoose')
const appRoot = require('app-root-path')

// const fs = require('fs')

// try {
//     fs.unlinkSync('./src/public/img/imgURLBV0A8059.JPG')
//     //file removed
//     } catch(err) {
//     console.error(err)
// }


class CourseController {
    //[GET]/courses/:slug toi khoa hoc chi tiet

    show(req, res, next) {
            console.log(req.params.slug)
            Course.findOne({ slug: req.params.slug })
                .then(course => {

                    res.render('courses/show', { course: mongooseToObject(course) })
                })
                .catch(next)
        }
        //[get]/courses/create chuyen huong toi trang create
    create(req, res, next) {
            res.render('courses/create', )
        }
        //[post] create new course va chuyen huong ve trang home
    store(req, res, next) {


            if (req.fileValidationError) {

                return res.send(req.fileValidationError);
            } else if (!req.file) {
                return res.send('Please select an image to upload');
            }




            console.log(req.body, req.file)
            const file = req.file
            const FormValidator = {...req.body }


            FormValidator.imgURL = `http://localhost:3004/img/${file.filename}`
            FormValidator.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
            FormValidator.forChangeImg = `./src/public/img/${file.filename}`

            const course = new Course(FormValidator)
            course
                .save()
                .then(() => res.redirect('create'))
                .catch(next)




        }
        //[GET]/courses/:id/edit
    edit(req, res, next) {

            Course.findById(req.params.id)
                .then(course =>
                    res.render('courses/edit', {
                        course: mongooseToObject(course)

                    })
                )
                .catch(next)

        }
        //[PUT]/courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
    softDelete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
    delete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/courses'))
            .catch(next)
    }
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/courses'))
            .catch(next)
    }
    actions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('/me/stored/courses'))
                    .catch(next)
                break;
            default:
                res.json({ message: 'Action is invalid' })
        }
    }

}
module.exports = new CourseController