import express, { json } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const app = express();

app.use(json());

const posts = [
    {
        author: "raj",
        post: "something"
    },
    {
        author: "ram",
        post: "jwt"
    }
];

app.get('/posts', authenticateToken, (req, res) => {
    res.json({ posts: posts.filter(post => post.author === req.user.name) });
})

app.post('/login', (req, res) => {
    //authenticate user

    const username = req.body.username;
    const user = { name: username };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    res.json({ accessToken: accessToken })
})


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];


    if (!token) {
        return res.sendStatus(401);
    }

    console.log(token);
    

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}

app.listen(3001, () => {
    console.log("Server running at: 3001");

})