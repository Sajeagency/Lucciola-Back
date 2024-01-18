import { Router } from "express";
import{createUser, eraseUser} from"../Controllers/usersCtrl"

export const userRouter=Router();

userRouter.post('/NewUser',createUser);
userRouter.delete('/deleteUser/:id',eraseUser);