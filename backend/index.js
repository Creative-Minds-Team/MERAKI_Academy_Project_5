const express = require("express");
const cors = require("cors");
require('dotenv').config();
require('./models/db')

const app = express();
const PORT = process.env.PORT || 5000;
const usersRouter = require("./routes/users");
const craftsRouter=require('./routes/crafts');
const postsRouter = require("./routes/posts");

const commentsRouter = require("./routes/comments")
const reviewRouter=require('./routes/reviews')
const roleRouter=require('./routes/role')
const chatRouter=require('./routes/chat')

const stateRouter =require('./routes/state');
const orderRouter = require("./routes/orders");

const notificationsRouter = require("./routes/notifications")

app.use(cors());
app.use(express.json());


app.use("/users", usersRouter);
app.use("/crafts", craftsRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter)
app.use('/state',stateRouter)
app.use('/chat',chatRouter)

app.use('/review',reviewRouter);
app.use('/role', roleRouter)


app.use("/orders", orderRouter);
app.use("/notifications", notificationsRouter);




// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

