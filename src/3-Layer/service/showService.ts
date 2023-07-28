import { container, singleton } from "tsyringe";
import ShowRepository from "../repository/show.repository";

const showRepository = container.resolve(ShowRepository);

@singleton()
export default class ShowService{
    private showRepository = showRepository;
}