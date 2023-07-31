import { singleton } from "tsyringe";
import Timetable from "../../database/model/timetable.model";
import { ResponseData } from "../../types/response";
import { Op, Transaction } from "sequelize";
import dbConnector from "../../database/db";
import Seat from "../../database/model/seat.model";


@singleton()
export default class TimetableRepository {
    private sq = dbConnector.sq;

    async findTimetableOnDate ( time : string, date : string ) : Promise<ResponseData<Timetable>> {
        try {
            const timetable = await Timetable.findAll({
                where : {
                    [Op.and]:{
                        showId:time,
                        date
                    }
                },
                include:{
                    model:Seat,
                    attributes:['id','grade','isBooked']
                }
            });
            const result = {
                isSuccessful : true,
                data : timetable
            };
            return result;
        } catch (e) {
            console.error(e);
            
            const result = {
                isSuccessful : false,
                data : null
            };
            return result;
        }
    };

    async createTimetable ( showId : string, date : string, timetable : string ) : Promise<ResponseData<Timetable>> {
        try {
            const timeArray : Timetable[] = [];
            await this.sq.transaction(async (transaction : Transaction)=>{

                const arrayOfTimetable = JSON.parse(timetable);

                for(let i=0; i<JSON.parse(timetable).length; i++){
                    const instance = await Timetable.create({
                        time : arrayOfTimetable[i],
                        date,
                        showId : Number(showId),
                        isFilled : false
                    },{
                        include:[Seat],
                        transaction
                    });
                    timeArray.push(instance);

                    const arrayOfSeat = [];

                    for(let i=0; i<10; i++){
                        const obj = {
                            grade : "R",
                            price : 50000,
                            isBooked : false,
                            timetableId : instance.id
                        };
                        arrayOfSeat.push(obj);
                    };

                    for(let i=0; i<20; i++){
                        const obj = {
                            grade : "S",
                            price : 35000,
                            isBooked : false,
                            timetableId : instance.id
                        };
                        arrayOfSeat.push(obj);
                    };

                    for(let i=0; i<30; i++){
                        const obj = {
                            grade : "A",
                            price : 20000,
                            isBooked : false,
                            timetableId : instance.id
                        };
                        arrayOfSeat.push(obj);
                    };

                    await Seat.bulkCreate(arrayOfSeat,{
                        transaction
                    });
                }
            });
            const result = {
                isSuccessful : true,
                data : timeArray
            };

            return result;
        } catch (e) {
            console.error(e);
            const result = {
                isSuccessful : false,
                data : null
            };
            return result;
        }
    }
}