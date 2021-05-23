//import express
import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import cors from 'cors';

import { createRoles } from './libs/initialSetup';
//import routes
import postsRoutes from './routes/posts.routes';
import usersRoutes from './routes/users.routes';
import rolesRoutes from './routes/roles.routes';
import messagesRoutes from './routes/messages.routes';
import authRoutes from './routes/auth.routes';

//execute the app
const app = express();
createRoles();

app.set('pkg', pkg);

//server's settings
app.set('port', process.env.PORT||4000);
//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes
app.get('/', (req,res)=>{
    res.json({
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/auth', authRoutes);

export default app;