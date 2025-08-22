import { ComponentType, ProductWithComponentType } from "@/types/product";
import { IConfiguratorProductDto } from "@/types/configurator";

class ConfiguratorProductDto implements IConfiguratorProductDto {
  id: string;
  image: string;
  name: string;
  discountPrice: number;
  componentType: ComponentType;

  constructor(model: ProductWithComponentType) {
    this.id = String(model._id);
    this.name = model.name;
    this.image = model.images[0];
    this.discountPrice = model.discountPrice;
    this.componentType = model.componentType;
  }
}

export { ConfiguratorProductDto };
