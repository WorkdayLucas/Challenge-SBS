import server from './app.js'
import {Connect} from './db.js'
import dotenv from 'dotenv'
dotenv.config()

Connect()

server.listen(process.env.PORT || 3001, () => {
    console.log(`listening on *:${process.env.PORT || 3001}`);
});