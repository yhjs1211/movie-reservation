import { Model, Sequelize } from "sequelize-typescript";
import { config } from "../config";
import User from "./model/user.model";
import Show from "./model/show.model";
import Book from "./model/book.model";
import BookShow from "./model/book_show.model";
import Seat from "./model/seat.model";
import Timetable from "./model/timetable.model";
import { Transaction } from "sequelize";

class DBConnector{
    public sq = new Sequelize({
        dialect : 'mysql',
        database : config.db.database,
        host : config.db.host,
        password : config.db.password,
        username : config.db.username,
        models : [User, Show, Book, BookShow, Timetable, Seat],
        logging : false
    })

    async getTransaction() :Promise<Transaction>{
        return await this.sq.transaction();
    }

    async initDB(){
        await this.sq.sync().then(()=>{
            console.log('🌈 Database is connected 🌈');
        });
    }
}
const dbConnector = new DBConnector();

export default dbConnector;