const express = require('express')
const multer = require('multer')
const appRoot = require('app-root-path');
//Xoa file
// const fs = require('fs')

// try {
//     fs.unlinkSync('./src/public/img/imgURLBV0A2572.JPG')
//     //file removed
//     } catch(err) {
//     console.error(err)
// }





const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/img');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + file.originalname);
    },
});
const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: imageFilter
});



const router = express.Router()

const courseController = require('../app/controllers/CourseControllers')
    // router create toi trang tao course->submit
router.get('/create', courseController.create)

//create day len db luu lai (them)
router.post('/store', upload.single('imgURL'), courseController.store)


//access courses following slug
router.get('/:slug', courseController.show)
    //toi trng edit->submit
router.get('/:id/edit', courseController.edit)
router.post('/actions', courseController.actions)

    //update vao database va dieu huong ve trang khoa hoc cua toi
router.put('/:id', courseController.update)
router.patch('/:id/restore', courseController.restore)
    //delete soft
router.delete('/:id', courseController.softDelete)
router.delete('/:id/delete', courseController.delete)


module.exports = router