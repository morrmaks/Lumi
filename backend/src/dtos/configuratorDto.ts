import { IProduct } from "@/models/productModel";
import { ComponentType, ProductWithComponentType } from "@/types/product";
import { IConfiguratorDto } from "@/types/configurator";

class ConfiguratorDto implements IConfiguratorDto {
  componentType: ComponentType;
  componentId: string;

  constructor(model: ProductWithComponentType) {
    this.componentType = model.componentType;
    this.componentId = String(model._id);
  }
}

export { ConfiguratorDto };
