import {Server, Request, ResponseToolkit} from "hapi";
import {ProductPlugin} from "./product/index";
import * as HapiAuthBasic from "hapi-auth-basic"; 


const sever = new Server({
    port: "5000",
    routes:{
        cors:{
            origin: ["*"]                          //fixed url
        }
    }
});


async function init() {
    await sever.register(HapiAuthBasic);
    sever.auth.strategy('simple', 'basic', { validate });

    sever.route([
        {
            path: "/",
            method: "GET",                                              //get post push delete
            handler: (request: Request, h: ResponseToolkit) => {                   
                return "Hello !";                                          //get id only...
            },
            options: {
                auth: 'simple'
            }
        },
            {
            path: "/t",
            method: "POST",                                            //get post push delete
            handler: (request: Request, h: ResponseToolkit) => {                
                return request.query;
            },
            options: {
                auth: 'simple'
            }          
        }
    ]);

    try{
        await sever.register(new ProductPlugin(), {  routes: {prefix: "/product"}   });                 //Async
        await sever.start();
        console.log("Sever start");
    }catch (err){
        console.log("Sever eror"+err);
    }
}

init();

const validate = async(require, username, password) => {
    let isValid = false;
    let credentials = {};

    if(username == "admin" && password == "1234"){
        isValid = true;
        console.log("" ,username, password);
        credentials = {
            userID: "test", 
            name: "Cy"
        }
    }
    return {isValid, credentials};
};
