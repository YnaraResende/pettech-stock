import { IProduct } from "src/stock/schemas/models/produto.interface";
import { ProductRepository } from "../product.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "src/stock/schemas/product.schema";

export class ProductMongooseRepository implements ProductRepository{
    constructor(
        @InjectModel(Product.name)
        private productModel: Model<Product>,
    ){}
    
    getAllStock(limit: number, page: number): Promise<IProduct[]> {
        const offSet = (page - 1) * limit;

        return this.productModel.find().skip(offSet).limit(limit).exec();

    }
    getStock(productId: string): Promise<IProduct> {
        return this.productModel.findById(productId).exec();
    }
    async create(product: IProduct): Promise<void> {
        const createStock = new this.productModel(product);
        await createStock.save();
    }
    async update(productId: string, stock: number): Promise<void> {
        await this.productModel.updateOne({_id: productId}, {quantity: stock}).exec();
    }
    async delete(productId: string): Promise<void> {
        await this.productModel.deleteOne({_id: productId}).exec();
    }
    
}