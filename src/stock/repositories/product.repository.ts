import { IProduct } from "../schemas/models/produto.interface";

export abstract class ProductRepository {
    abstract getAllStock(limit: number, page: number): Promise<IProduct[]>;
    abstract getStock(productId: string): Promise<IProduct>;
    abstract create(product: IProduct): Promise<void>;
    abstract update(productId: string, stock: number): Promise<void>;
    abstract delete(productId: string): Promise<void>;

}