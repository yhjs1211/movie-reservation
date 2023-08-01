import { singleton } from "tsyringe";
import Timetable from "../../database/model/timetable.model";
import { ResponseData } from "../../types/response";
import { Op, Transaction } from "sequelize";
import dbConnector from "../../database/db";
import Seat from "../../database/model/seat.model";
import Show from "../../database/model/show.model";


@singleton()
export default class TimetableRepository {
    private sq = dbConnector.sq;

    async findTimetableOnDate ( showId : string, date : string ) : Promise<ResponseData<Timetable>> {
        try {
            const timetable = await Timetable.findAll({
                where : {
                    [Op.and]:{
                        showId,
                        date
                    },
                    isFilled:false
                },
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

    async findTimetableDetail( showId : string, date : string, time : string ) : Promise<ResponseData<Timetable>> {
        try {
            const timetable = await Timetable.scope('full').findOne({
                where : {
                    [Op.and]:{
                        showId,
                        date,
                        time
                    },
                    isFilled:false
                }
            });
            if(timetable){
                const result = {
                    isSuccessful : true,
                    data : timetable
                };
                return result;
            }else{
                const result = {
                    isSuccessful : true,
                    data : timetable
                };
                return result;
            }
        } catch (e) {
            console.error(e);
            
            const result = {
                isSuccessful : false,
                data : null
            };
            return result;
        }
    }

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

                    for(let i=1; i<3; i++){
                        const obj = {
                            grade : "R",
                            seatNumber : i,
                            price : 50000,
                            isBooked : false,
                            timetableId : instance.id
                        };
                        arrayOfSeat.push(obj);
                    };

                    for(let i=3; i<6; i++){
                        const obj = {
                            grade : "S",
                            seatNumber : i,
                            price : 35000,
                            isBooked : false,
                            timetableId : instance.id
                        };
                        arrayOfSeat.push(obj);
                    };

                    for(let i=6; i<11; i++){
                        const obj = {
                            grade : "A",
                            seatNumber : i,
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