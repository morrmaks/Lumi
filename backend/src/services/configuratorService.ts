import { ConfiguratorModel, IConfigurator } from "@/models/configuratorModel";
import { IProduct, ProductModel } from "@/models/productModel";
import mongoose from "mongoose";
import { ComponentType } from "@/types/product";
import {
  IConfiguratorDto,
  IConfiguratorProductDto,
} from "@/types/configurator";
import { ConfiguratorDto } from "@/dtos/configuratorDto";
import { isProductWithComponentType } from "@/types/guards";
import { ConfiguratorProductDto } from "@/dtos/configuratorProductDto";
import { ApiError } from "@/exeptions/apiError";

class ConfiguratorService {
  async getConfigure(userId: string): Promise<IConfiguratorDto[]> {
    const configure = await ConfiguratorModel.findOne<IConfigurator>({
      userId,
    }).populate<{
      parts: IProduct[];
    }>("parts");

    if (!configure) throw ApiError.NotFound("Конфигуратор не найден");

    return configure.parts
      .filter(isProductWithComponentType)
      .map((part) => new ConfiguratorDto(part));
  }

  async getConfigureComponents(
    componentIds: string[],
  ): Promise<IConfiguratorProductDto[]> {
    if (!componentIds.length)
      throw ApiError.BadRequest("Товары не были переданы");

    const products = await ProductModel.find<IProduct>({
      _id: { $in: componentIds },
    });
    if (products.length !== componentIds.length)
      throw ApiError.NotFound("Некоторые товары не найдены");

    const validComponents = products.filter(isProductWithComponentType);
    if (validComponents.length !== products.length)
      throw ApiError.BadRequest("Некоторые товары не являются компонентами");

    return validComponents.map(
      (component) => new ConfiguratorProductDto(component),
    );
  }

  async setConfigure(
    userId: string,
    componentIds: string[],
  ): Promise<IConfiguratorDto[]> {
    const components = await ProductModel.find<IProduct>({
      _id: { $in: componentIds },
    });
    if (components.length !== componentIds.length)
      throw ApiError.NotFound("Некоторые товары не найдены");

    const validComponents = components.filter(isProductWithComponentType);
    if (validComponents.length !== components.length)
      throw ApiError.BadRequest("Некоторые товары не являются компонентами");

    let configure = await ConfiguratorModel.findOne<IConfigurator>({ userId });
    if (!configure) {
      configure = await ConfiguratorModel.create({
        userId,
        parts: componentIds.map((id) => new mongoose.Types.ObjectId(id)),
      });
    } else {
      configure.parts = componentIds.map(
        (id) => new mongoose.Types.ObjectId(id),
      );
    }
    await configure.save();

    return validComponents.map((component) => new ConfiguratorDto(component));
  }

  async addComponent(
    userId: string,
    componentId: string,
  ): Promise<IConfiguratorDto> {
    const component = await ProductModel.findById<IProduct>(componentId);
    if (!component) throw ApiError.NotFound("Товар не найден");

    if (!isProductWithComponentType(component))
      throw ApiError.BadRequest("Товар не является компонентом");

    let configure = await ConfiguratorModel.findOne<IConfigurator>({ userId });
    if (!configure) {
      configure = await ConfiguratorModel.create({
        userId,
        parts: [new mongoose.Types.ObjectId(componentId)],
      });
    } else {
      const currentParts = await ProductModel.find<IProduct>({
        _id: { $in: configure.parts },
      });
      const partsMap: Partial<Record<ComponentType, mongoose.Types.ObjectId>> =
        {};

      currentParts.forEach((part) => {
        if (part.componentType)
          partsMap[part.componentType] = part._id as mongoose.Types.ObjectId;
      });

      if (component.componentType)
        partsMap[component.componentType] =
          component._id as mongoose.Types.ObjectId;

      configure.parts = Object.values(partsMap);
    }
    await configure.save();

    return new ConfiguratorDto(component);
  }

  async addComponents(
    userId: string,
    componentIds: string[],
  ): Promise<IConfiguratorDto[]> {
    const components = await ProductModel.find<IProduct>({
      _id: { $in: componentIds },
    });
    if (components.length !== componentIds.length)
      throw ApiError.NotFound("Некоторые товары не найдены");

    const validComponents = components.filter(isProductWithComponentType);
    if (validComponents.length !== components.length)
      throw ApiError.BadRequest("Некоторые товары не являются компонентами");

    let configure = await ConfiguratorModel.findOne<IConfigurator>({ userId });
    if (!configure) {
      configure = await ConfiguratorModel.create({
        userId,
        parts: componentIds.map((id) => new mongoose.Types.ObjectId(id)),
      });
    } else {
      const currentParts = await ProductModel.find<IProduct>({
        _id: { $in: configure.parts },
      });
      const partsMap: Partial<Record<ComponentType, mongoose.Types.ObjectId>> =
        {};

      currentParts.forEach((part) => {
        if (part.componentType)
          partsMap[part.componentType] = part._id as mongoose.Types.ObjectId;
      });
      validComponents.forEach((component) => {
        if (component.componentType)
          partsMap[component.componentType] =
            component._id as mongoose.Types.ObjectId;
      });

      configure.parts = Object.values(partsMap);
    }
    await configure.save();

    return validComponents.map((component) => new ConfiguratorDto(component));
  }

  async deleteComponent(userId: string, componentId: string): Promise<string> {
    let configure = await ConfiguratorModel.findOne<IConfigurator>({ userId });
    if (!configure) throw ApiError.NotFound("Конфигуратор не найден");

    configure.parts = configure.parts.filter(
      (part) => part.toString() !== componentId,
    );
    await configure.save();

    return componentId;
  }

  async clearConfigure(userId: string): Promise<string[]> {
    let configure = await ConfiguratorModel.findOne<IConfigurator>({ userId });
    if (!configure) throw ApiError.NotFound("Конфигуратор не найден");

    configure.parts = [];
    await configure.save();

    return [];
  }
}

const configuratorService = new ConfiguratorService();

export { configuratorService };
