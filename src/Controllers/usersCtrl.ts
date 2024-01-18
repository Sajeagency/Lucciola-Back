import { PrismaClient } from '@prisma/client';
import {Request,Response} from 'express';
import DbError from '../errors/dbError';

import CustomError from '../errors/customError';

const prisma=new PrismaClient();

export const createUser= async (req:Request,res:Response)=>{
  
try{
  
const{UserName,contrasena,Email}=req.body;
const usuarioExistente=await prisma.user.findFirst({
where:{Email},

});
if(usuarioExistente){
return res.status(400).json({error:'The user already exist'})

}
const newUser=await prisma.user.create({
data:{
UserName,
Email,
contrasena,


  },
 });
 return res.json(newUser);
 }catch(error){
console.error('Error al crear usuario', error);
res.status(500).json({error:'Error al Crear Usurio'});
 }
};

export const eraseUser=async(req:Request,res:Response)=>{
try{
 
  
const userId:number=parseInt(req.params.id)

const user= await prisma.user.findUnique({
where:{id:userId}

})

if(!user){
  
throw new DbError("user doesnt exist",404)


}
await prisma.user.delete({
  where:{id:userId}
  
  })
  return res.json({message:'User deleted succesfully'})


}catch(error:any){

if(error instanceof CustomError){

 return  res.status(error.statusCode).json({error:error.message})


}
return res.status(500).json({error:error.message}) 


}}




