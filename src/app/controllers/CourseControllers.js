const Course=require('../modals/Course')
const {mongooseToObject}=require('../../util/mongoose')

class CourseController {
    //[GET]/courses/:slug
    
    show(req, res,next) {
        console.log(req.params.slug)
        Course.findOne({slug: req.params.slug})
        .then(course=>{
            
            res.render('courses/show',{course: mongooseToObject(course)})
        })
        .catch(next)
    }
    create(req, res,next) {
        res.render('courses/create',)
    }
    store(req, res,next) {
        const FormValidator = req.body
        FormValidator.image=`https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        const course= new Course(FormValidator)
        course.save()
        
        res.redirect('/')
    }
    //[GET]/courses/:id/edit
    edit(req, res,next) {
        Course.findById(req.params.id)
            .then(course =>
                res.render('courses/edit',{
                    course:mongooseToObject(course)
                })
            )
            .catch(next)
        
    }
    //[PUT]/courses/:id
    update(req, res, next) {
        Course.updateOne({_id:req.params.id},req.body)
            .then(()=>res.redirect('/me/stored/courses'))
            .catch(next)
    }
}


module.exports = new CourseController