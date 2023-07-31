import { container, singleton } from "tsyringe";
import ShowRepository from "../repository/show.repository";
import {CreateShowInfo, ShowInfo} from '../../types/show';
import { ShowCategory } from "../../database/modelInterface";

const showRepository = container.resolve(ShowRepository);

@singleton()
export default class ShowService{
    private showRepository = showRepository;

    getShows(){
        return this.showRepository.findAllShows();
    }

    getShowsByCategory( category : string ){
        return this.showRepository.findShowsByCategory(category);
    }

    getShowsByName( name : string ){
        return this.showRepository.findShowsByName(name);
    }

    getShowByShowId( showId : string ){
        return this.showRepository.findShowById( showId );
    }

    createShow( body : CreateShowInfo ){
        const { start , end } = body;
        const periodStart = new Date(start);
        const periodEnd = new Date(end);

        const day = Math.ceil( Math.abs( Number(periodEnd)-Number(periodStart))/(86400000))+1;
        const days = [];

        for(let i=0; i<day; i++){
            days.push(new Date(periodStart.getTime()+( i * ( 1000 * 60 * 60 * 24 ))).toLocaleDateString());
        }
        const period : string = JSON.stringify(days);

        let idxOfShowCategory : string = 'None' ;

        Object.keys(ShowCategory).forEach((v,idx)=>{
            if(v==body.category)idxOfShowCategory=v;
        });

        const data : ShowInfo = {
            name : body.name,
            detail : body.detail,
            image : body.image,
            category : ShowCategory[idxOfShowCategory as keyof typeof ShowCategory],
            location : body.location,
            period
        };

        if(!data.image) delete data.image;

        return this.showRepository.createShow( data );
    };

    deleteShow( showId : string){
        return this.showRepository.deleteShow(showId);
    }
}