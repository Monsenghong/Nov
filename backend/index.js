
import express, { Router } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import authRouter from './routes/auth.js'

const app = express()
app.set('view engine', 'ejs')

const posts = [
    {
      id: 1,
      author: 'John',
      title: 'Templating with EJS',
      body: 'Blog post number 1'
    },
    {
      id: 2,
      author: 'Drake',
      title: 'Express: Starting from the Bottom',
      body: 'Blog post number 2'
    },
    {
      id: 3,
      author: 'Emma',
      title: 'Streams',
      body: 'Blog post number 3'
    },
    {
      id: 4,
      author: 'Cody',
      title: 'Events',
      body: 'Blog post number 4'
    }
  ]
  // set the view engine to ejs
  
  // blog home page
  app.get('/', (req, res) => {
    // render `home.ejs` with the list of posts
    res.render('home', { posts: posts })
  })
  // blog post
  app.get('/post/:id', (req, res) => {
    // find the post in the `posts` array
    const post = posts.filter((post) => {
      return post.id == req.params.id
    })[0]
    // render the `post.ejs` template with the post content
    res.render('post', {
      author: post.author,
      title: post.title,
      body: post.body
    })
  })

dotenv.config()
app.use(express.json())
const connect = async ()=>{

    const connection = await mongoose.connect(process.env.MONGO_DB).catch(error=>{
        console.log(error)
    }).then(async () => {
      await console.log("DB Connection established"
        )
    })
}

app.use('/',(req,res)=>{
    res.send("Welcome our jurney Senghong")
})

app.use('/auth',authRouter)

app.use((err,req,res,next) => {

    res.status(err.status || 500).json({error:err.message})
})



app.listen(8080,() => {

    try {
        connect()
       
        console.log("Server is running...")

        if(process.env.NODE_ENV == 'production'){
            console.log("App is running in production mode")
        }else{
            console.log("App is running in development mode")
        }

    } catch (error) {
        console.log(error)
    }
})