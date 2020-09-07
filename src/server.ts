import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { apiRoutes } from './routers/allroute';
import { check, validationResult, body, param } from 'express-validator';
import db from './db';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setting();
    this.routes();
    this.syncronizedb();
  }

  private setting(): void {


    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: '5mb' }));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(check());
  }

  private syncronizedb(): void {
    //======Check DB Syncronization======
    console.log("in the syncronization method server.ts");
    db.options.benchmark = true;

    db.sync()
      .then(message => {
        console.log('db is synced!');
      })
      .catch(function (err) {
        throw err;
      });
    }
    
  private routes(): void {
    this.app.use('/api', apiRoutes);
  }

  
 
}


const port = process.env.PORT || 3000;
new App().app.listen(port, () => { console.log('Express server listening on port' + port) });