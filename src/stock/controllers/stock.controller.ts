import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { StockService } from "../services/stock.service";
import { IProduct } from "../schemas/models/produto.interface";
import { z } from "zod";
import { ZodValidationPipe } from "src/shared/pipe/zod-validation.pipe";
import { AuthGuard } from "src/shared/guards/auth.guard";

const createStockSchema = z.object({
    name: z.string(),
    quantity: z.coerce.number(),
    relationId: z.string(),
})

const updateStockSchema = z.object({
    stock: z.coerce.number(),
});

type CreateStock = z.infer<typeof createStockSchema>;
type UpdateStock = z.infer<typeof updateStockSchema>;

@UseInterceptors(UseInterceptors)
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllStock(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.stockService.getAllStock(limit, page);
  }

  @Get(':productId')
  async getStock(@Param('productId') productId: string) {
    return this.stockService.getStock(productId);
  }
  @UsePipes(new ZodValidationPipe(createStockSchema))
  @Post()
  async createStock(@Body() {name, quantity, relationId} : CreateStock) {
    return this.stockService.createStock({name, quantity, relationId});
  }

  @Put(':productId')
  async updateStock(
    @Param('productId') productId: string,
    @Body(new ZodValidationPipe(updateStockSchema)) { stock }: UpdateStock
  ) {
    return this.stockService.updateStock(productId, stock);
  }

  @Delete(':productId')
  async deleteStock(@Param('productId') productId: string) {
    return this.stockService.deleteStock(productId);
  }

}