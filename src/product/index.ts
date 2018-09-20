import { PluginBase, Server, PluginNameVersion, Request, ResponseToolkit } from "hapi";
import { ProductManager } from "./product_manager";
import { Product } from "./product";
import * as Joi from "joi";

export class ProductPlugin implements PluginBase<Object>, PluginNameVersion{
    name = "product";
    version = "1";
    //server: Server;
    register (server: Server, options: Object) {
        const productManager = new ProductManager([
            new Product("1", "รองเท้า Adidas", "รองเท้า" , 200,"https://s7d4.scene7.com/is/image/JCPenney/DP0803201717061777M.tif?wid=350&hei=350&op_usm=.4,.8,0,0&resmode=sharp2"),
            new Product("2", "เสื้อยืด", "เสื้อ", 300,"https://www.rushordertees.com/design/ZoomImage.php?src=2864256_f&style=g200&colorCode=00&x=240&y=300&width=880&height=880&scale=1.7&watermark=false"),
            new Product("3", "กระเป๋าเป้", "กระเป๋า", 50,"https://target.scene7.com/is/image/Target/52783397?wid=488&hei=488&fmt=pjpeg"),
            new Product("4", "เสื้อไหมพรม", "เสื้อ", 100,"http://www.beautifulgreat.com/wp-content/uploads/2016/09/TB2hayyXBPzQeBjSZFlXXccIVXa_723644356.jpg"),
            new Product("5", "กางเกงยีนส์", "กางเกง", 300,"https://i2.wp.com/www.central.co.th/e-shopping/wp-content/uploads/2016/12/%E0%B8%81%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%81%E0%B8%87%E0%B8%A2%E0%B8%B5%E0%B8%99%E0%B8%AA%E0%B9%8C%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%9A%E0%B8%AD%E0%B8%A2.jpg?fit=600%2C600&w=640"),
            new Product("6", "กางเกงขาม้าเอวสูง", "กางเกง" , 250,"http://my-test-11.slatic.net/original/77409a30bbc4739d6620966110993a25.jpg")
        ]);
        this.registerRoute(server, productManager);
    }

    registerRoute(server: Server, productManager: ProductManager){
        server.route([
            {
                path: "/",
                method: "GET",
                handler: (request: Request, h: ResponseToolkit) => {
                    return productManager.getAll();
                }
            },

            {
                path: "/{product_id}",
                method: "GET",
                handler: (request: Request, h: ResponseToolkit) => {
                        const product = productManager.get(request.params["product_id"]);
                        return product || "ไม่พบรายการสินค้า";
                    },
                    options:{
                        validate: {
                            params:{
                                product_id: Joi.string().min(0) 
                            }
                        }
                    }
                }
            ]);
    }

}