import {Request, Response} from 'express';
import {HTTP_RESPONSE} from '../middlewares/http-response.middleware'
import {UserService} from "../services/user.service";

const userService = new UserService();
export const createUser = async (req: Request, res: Response) =>{
    try{
        const author = req.body
        const data = await userService.createUser(author);
        res.status(HTTP_RESPONSE.CREATED).json({data: data});
    }catch(err){
        res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({error: 'Internal server error'});
    }
}

export const getByIdUser = async (req: Request, res: Response) => {
    const authorId = Number(req.params.id);
    try {
        const user = await userService.getUserById(authorId);
        if (user) {
            res.status(HTTP_RESPONSE.OK).json(user);
        } else {
            res.status(HTTP_RESPONSE.NOT_FOUND).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({error: 'Internal server error'});
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const authorId: number = Number(req.params.id);
        const author = req.body
        const data = await userService.updateUser(authorId, author);
        res.status(HTTP_RESPONSE.OK).json({data: data});
    } catch (error) {
        res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({error: 'Internal server error'});
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const authorId: number = Number(req.params.id);
        const deletedRows = await userService.deleteUser(authorId);
        if (deletedRows === 0) {
            res.status(HTTP_RESPONSE.NOT_FOUND).json({ message: 'User not found' });
        } else {
            res.status(HTTP_RESPONSE.OK).json({ message: 'User deleted successfully' });
        }
    } catch (error) {
        res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({error: 'Internal server error'});
    }
}