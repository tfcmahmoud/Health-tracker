const express = require('express')
const app = express()
const fs = require('fs')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://healtht:eurekamahmoudht@cluster0.gxqkxrc.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log('Connected To The Database')
})

let userSchema = new mongoose.Schema({
    authkey: {type: String, required: true},
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: Number, required: true},
    sleep: { type: Array, default: [0] },
    weight: { type: Number, default: 0 },
    steps: { type: Number, default: 0 },
    weightg: { type: Number, default: 0 },
    sleepg: { type: Number, default: 0 },
})

let userSchemaModel = mongoose.model('users', userSchema)
//mongodb+srv://healtht:eurekamahmoudht@cluster0.gxqkxrc.mongodb.net/?retryWrites=true&w=majority

app.use(express.static(__dirname + '/views'));
app.use(express.json());

app.get('/', async (req, res) => {
    let file = fs.readFileSync('./views/html/index.html', {encoding: 'utf-8'})
    res.send(file)
})

app.post('/create', async (req, res) => {
    let fname = req.query.fname
    let lname = req.query.lname
    let email = req.query.email
    let password = req.query.password
    let age = req.query.age

    if (!fname || !lname || !email || !password || !age) return

    let data = await userSchemaModel.findOne({
        email: email
    })

    if (!data) {
        let authk = generateAuth(16)
        data = await userSchemaModel.create({
            authkey: authk,
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            age: age
        })
        res.json({ response: 'success', authkey: authk })
    } else {
        res.json({ response: 'exists'})
    }
    
})


app.post('/check', async (req, res) => {
    let email = req.query.email
    let password = req.query.password

    if (!email || !password) return

    let data = await userSchemaModel.findOne({
        email: email
    })

    if (!data) {
        res.json({ response: 'noexist' })
    } else {
        if (data.password === password) {
            res.json({ response: 'success', authkey: data.authkey })
        } else {
            res.json({ response: 'wrong' })
        }
    }
    
})

app.post('/addsleep', async (req, res) => {
    let authkey = req.query.authkey
    let body = req.body

    if (!authkey) return

    let data = await userSchemaModel.findOne({
        authkey: authkey
    })

    if (JSON.stringify(data.sleep) === '[0]') {
        data.sleep = [parseInt(body.number)]
    } else {
        data.sleep.push(parseInt(body.number))
    }
    await data.save()
    res.json({ new: avgSleep(data.sleep) })
})

app.post('/changeweight', async (req, res) => {
    let authkey = req.query.authkey
    let body = req.body

    if (!authkey) return

    let data = await userSchemaModel.findOne({
        authkey: authkey
    })

    data.weight = parseInt(body.number)
    await data.save()
    res.json({ new: data.weight })
})

app.post('/addsteps', async (req, res) => {
    let authkey = req.query.authkey
    let body = req.body

    if (!authkey) return

    let data = await userSchemaModel.findOne({
        authkey: authkey
    })

    data.steps += parseInt(body.number)
    await data.save()
    res.json({ new: data.steps })
})

app.post('/addsleepg', async (req, res) => {
    let authkey = req.query.authkey
    let body = req.body

    if (!authkey) return

    let data = await userSchemaModel.findOne({
        authkey: authkey
    })

    data.sleepg = parseInt(body.number)
    await data.save()
    res.json({ new: data.sleepg })
})

app.post('/addweightg', async (req, res) => {
    let authkey = req.query.authkey
    let body = req.body

    if (!authkey) return

    let data = await userSchemaModel.findOne({
        authkey: authkey
    })

    data.weightg = parseInt(body.number)
    await data.save()
    res.json({ new: data.weightg })
})

app.get('/dashboard', async (req, res) => {
    let authkey = req.query.authkey

    if (!authkey) {
        res.redirect('/signup')
    } else {
        
    let data = await userSchemaModel.findOne({
        authkey: authkey
    })

    if (!data) {
        res.redirect(`/signup`)
    } else {
        let file = fs.readFileSync('./views/html/dashboard.html', {encoding: 'utf-8'})
        file = file
        .replaceAll('$$name$$', data.fname.charAt(0).toUpperCase() + data.fname.slice(1))
        .replaceAll('$$sleep$$', avgSleep(data.sleep))
        .replaceAll('$$weight$$', data.weight)
        .replaceAll('$$steps$$', data.steps)
        .replaceAll('$$sleepg$$', data.sleepg)
        .replaceAll('$$weightg$$', data.weightg)
        res.send(file)
    }
    }
})

app.get('/signup', async (req, res) => {
    let file = fs.readFileSync('./views/html/signup.html', {encoding: 'utf-8'})
    res.send(file)
})

app.get('/login', async (req, res) => {
    let file = fs.readFileSync('./views/html/login.html', {encoding: 'utf-8'})
    res.send(file)
})

app.get('/tips', async (req, res) => {
    let file = fs.readFileSync('./views/html/tips.html', {encoding: 'utf-8'})
    res.send(file)
})

app.listen(3000, () => {
    console.log(`Listening On Port 3000`)
})

function generateAuth(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
  
    return code;
  }

function avgSleep(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    let results = sum / arr.length
    if (Number.isInteger(results)) {
        return results
    } else {
        return results.toFixed(1);
    }
}