import "reflect-metadata";
import { container, singleton } from "tsyringe";
import ShowService from "../service/showService";
import { Request, Response, NextFunction } from "express";

const showService = container.resolve(ShowService);

@singleton()
export default class ShowController{
    private showService = showService;
}