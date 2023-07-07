import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { passwordChallenge } from '../models/passwordChallenge.js';
import { guessThePlayer } from '../models/guessThPlayer.js';



// const pdfParser = new pdf();



const upload = multer({
    limits: {
        fileSize: 3000000
    },
    fileFilter(req, file, cb) {

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {

            return cb(new Error('Please Upload (PNG,JPEG,JPG)'))

        }

        cb(undefined, true)


    }

})


export const gamesRouter = new express.Router()

gamesRouter.post('/passwordChallenge/addPlayer', upload.single('image'), async (req, res) => {
    const player = new passwordChallenge()
    player.name = req.body.name
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    player.image= buffer

    try {
        await player.save()
        res.status(201).send(player)
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})

gamesRouter.get('/passwordChallenge/player', async (req, res) => {
 
    const players = await passwordChallenge.find()
    const count = players.length
    const skips = Math.floor((Math.random() * count));
    const player = await passwordChallenge.find().limit(1).skip(skips)
    res.status(201).send(player)

})

gamesRouter.post('/guessThePlayer/addPlayer', upload.single('image'), async (req, res) => {
    const player = new guessThePlayer(req.body)
    console.log(req.body)

    try {
        await player.save()
        res.status(201).send(player)
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})

gamesRouter.get('/guessThePlayer/player', async (req, res) => {
 
    const players = await guessThePlayer.find()
    const count = players.length
    const skips = Math.floor((Math.random() * count));
    const player = await guessThePlayer.find().limit(1).skip(skips)
    res.status(201).send(player)

})

// userRouter.patch('/users/me', auth, async (req, res) => {

//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send("error : Invalid updates!")
//     }
//     try {

//         updates.forEach((update) => req.user[update] = req.body[update])
//         await req.user.save()

//         res.status(201).send(req.user)

//     } catch (e) {

//         res.status(500).send(e)

//     }
// })

// userRouter.delete('/users/me', auth, async (req, res) => {
//     try {
//         await req.user.deleteOne({ _id: req.user.id })
//         await Task.deleteMany({ owner: req.user.id })
//         sendByeEmail(req.user.email, req.user.name)
//         res.send(req.user)
//     } catch (e) {
//         console.log(e)
//         res.status(500).send(e)
//     }
// })


// userRouter.get('/users/:id/avatar', upload.single('avatar'), async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)

//         if (!user || !user.avatar) {
//             throw new Error()
//         }
//         res.set('Content-Type', 'image/png')
//         res.send(user.avatar)
//     } catch (e) {
//         res.status(404).send()
//     }
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })


// userRouter.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
//     const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
//     req.user.avatar = buffer
//     await req.user.save()
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })


