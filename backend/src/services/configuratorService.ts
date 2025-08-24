import { ConfiguratorModel, IConfigurator } from "@/models/configuratorModel";
import { IProduct, ProductModel } from "@/models/productModel";
import mongoose from "mongoose";
import { ComponentType, ProductWithComponentType } from "@/types/product";
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
    const configure = await this._getConfigureWithParts(userId);
    return configure.parts
      .filter(isProductWithComponentType)
      .map((part) => new ConfiguratorDto(part));
  }

  async getConfigureComponents(
    componentIds: string[],
  ): Promise<IConfiguratorProductDto[]> {
    if (!componentIds.length)
      throw ApiError.BadRequest("Товары не были переданы");

    const validComponents = await this._getValidComponentsOrThrow(componentIds);

    return validComponents.map(
      (component) => new ConfiguratorProductDto(component),
    );
  }

  async setConfigure(
    userId: string,
    componentIds: string[],
  ): Promise<IConfiguratorDto[]> {
    const validComponents = await this._getValidComponentsOrThrow(componentIds);

    await this._createOrUpdateConfigurator(userId, validComponents, true);

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

    await this._createOrUpdateConfigurator(userId, [component], false);

    return new ConfiguratorDto(component);
  }

  async addComponents(
    userId: string,
    componentIds: string[],
  ): Promise<IConfiguratorDto[]> {
    const validComponents = await this._getValidComponentsOrThrow(componentIds);

    await this._createOrUpdateConfigurator(userId, validComponents, false);

    return validComponents.map((component) => new ConfiguratorDto(component));
  }

  async deleteComponent(userId: string, componentId: string): Promise<string> {
    const configure = await this._getConfigure(userId);

    configure.parts = configure.parts.filter(
      (part) => part.toString() !== componentId,
    );
    await configure.save();

    return componentId;
  }

  async clearConfigure(userId: string): Promise<string[]> {
    const configure = await this._getConfigure(userId);

    configure.parts = [];
    await configure.save();

    return [];
  }

  private async _getConfigure(
    userId: string,
    populateParts = false,
  ): Promise<IConfigurator> {
    const configure = await ConfiguratorModel.findOne<IConfigurator>({
      userId,
    });
    if (!configure) throw ApiError.NotFound("Конфигуратор не найден");
    return configure;
  }

  private async _getConfigureWithParts(userId: string, populateParts = false) {
    const configure = await ConfiguratorModel.findOne<IConfigurator>({
      userId,
    }).populate<{ parts: IProduct[] }>("parts");
    if (!configure) throw ApiError.NotFound("Конфигуратор не найден");
    return configure;
  }

  private async _getValidComponentsOrThrow(
    componentIds: string[],
  ): Promise<ProductWithComponentType[]> {
    const components = await ProductModel.find<IProduct>({
      _id: { $in: componentIds },
    });
    if (components.length !== componentIds.length)
      throw ApiError.NotFound("Некоторые товары не найдены");

    const validComponents = components.filter(isProductWithComponentType);
    if (validComponents.length !== components.length)
      throw ApiError.BadRequest("Некоторые товары не являются компонентами");

    return validComponents;
  }

  private async _createOrUpdateConfigurator(
    userId: string,
    components: IProduct[],
    replace = false,
  ): Promise<IConfigurator> {
    let configure = await ConfiguratorModel.findOne<IConfigurator>({ userId });
    if (!configure) {
      configure = await ConfiguratorModel.create({
        userId,
        parts: components.map((c) => new mongoose.Types.ObjectId(c._id)),
      });
    } else if (replace) {
      configure.parts = components.map(
        (c) => new mongoose.Types.ObjectId(c._id),
      );
    } else {
      const currentParts = await ProductModel.find<IProduct>({
        _id: { $in: configure.parts },
      });
      const partsMap: Partial<Record<ComponentType, mongoose.Types.ObjectId>> =
        {};

      currentParts.forEach((part) => {
        if (part.componentType) partsMap[part.componentType] = part._id;
      });
      components.forEach((component) => {
        if (component.componentType)
          partsMap[component.componentType] = component._id;
      });
      configure.parts = Object.values(partsMap);
    }
    await configure.save();
    return configure;
  }
}

const configuratorService = new ConfiguratorService();

export { configuratorService };
