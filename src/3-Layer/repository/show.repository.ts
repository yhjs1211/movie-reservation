import { singleton } from "tsyringe";
import Show from "../../database/model/show.model";
import { ResponseData } from "../../types/response";
import { ShowInfo } from "../../types/show";
import { Op } from "sequelize";

@singleton()
export default class ShowRepository{
    async findAllShows() : Promise<ResponseData<Show>>{
        try {
            const shows : Show[] = await Show.findAll();
            const result = {
                isSuccessful : true,
                data : shows
            }
            return result;
        } catch (e) {
            console.error(e);
            const result = {
                isSuccessful : false,
                data : null
            }
            return result;
        }
    };

    async findShowsByCategory(category : string ) : Promise<ResponseData<Show>> {
        try {
            const shows = await Show.findAll({
                where:{
                    category
                }
            });
            const result = {
                isSuccessful : true,
                data : shows
            }
            return result;
        } catch (e) {
            console.error(e);
            const result = {
                isSuccessful : false,
                data : null
            }
            return result;
        }
    }

    async findShowsByName(name : string) : Promise<ResponseData<Show>> {
        try {
            const shows = await Show.findAll({
                where:{
                    name : {
                        [Op.substring]: `${name}`
                    }
                }
            });
            const result = {
                isSuccessful : true,
                data : shows
            }
            return result;
        } catch (e) {
            console.error(e);
            const result = {
                isSuccessful : false,
                data : null
            }
            return result;
        }
    }

    async findShowById ( id : string ) : Promise<ResponseData<Show>> {
        try {
            const show = await Show.findByPk(id);
            const result = {
                isSuccessful : true,
                data : show
            }
            return result;
        } catch (e) {
            console.error(e);
            const result = {
                isSuccessful : false,
                data : null
            }
            return result;
        }
    }

    async createShow( data : ShowInfo ) : Promise<ResponseData<Show>> {
        try {
            const created = await Show.create(data);
            const result = {
                isSuccessful : true,
                data : created
            }
            return result; 
        } catch (e) {
            console.error(e);
            const result = {
                isSuccessful : false,
                data : null
            }
            return result;
        }
    };

    async deleteShow ( id : string ) : Promise<number | null> {
        try {
            const result = await Show.destroy({where:{id}});
            return result;
        } catch (e) {
            return null;
        }
    }
}