import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import { graphqlHTTP } from 'express-graphql'
import { schema } from './schema';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3002", process.env.WEB_A, process.env.WEB_B ],
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    }
}
);


app.use(express.json())

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3002", process.env.WEB_A, process.env.WEB_B ],
    credentials: false,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'authorization'],
}))

app.use('/api-products', graphqlHTTP({
    graphiql: true,
    schema: schema,
    context: {},
}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on("create product", () => {
        io.emit("update list");
    });

    socket.on("update product", () => {
        console.log("llega el update")
        io.emit("update list");
    });

    socket.on("delete product", () => {
        io.emit("update list");
    });


    socket.on('disconnect', () => {
        io.emit('chat message', "user disconect");
    });
});

export default server;