import Controlador from "../src/routes/ControladorPersona"

import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as path from 'path';
class Server{
    public config(){
        const MONGO_URL : string = 'mongodb://localhost/basededatos'

        mongoose.connect(MONGO_URL,{
            useMongoClient: true
            /**
             * otras opciones
             */
        })
    }
}