import { ConfiguratorModel, IConfigurator } from "@/models/configuratorModel";
import { IProduct, ProductModel } from "@/models/productModel";
import mongoose from "mongoose";
import { ComponentType } from "@/types/product";
import { calculateConfiguratorPrice } from "@/utils/configurator";

class ConfiguratorService {
  private async recalculatePrice(
    configure: IConfigurator,
  ): Promise<IProduct[]> {
    const updatedParts = await ProductModel.find({
      _id: { $in: configure.parts },
    });
    configure.price = calculateConfiguratorPrice(updatedParts);

    return updatedParts;
  }

  async getConfigure(
    userId: string,
  ): Promise<{ components: IProduct[]; price: number }> {
    const configure = await ConfiguratorModel.findOne({ userId }).populate<{
      parts: IProduct[];
    }>("parts");
    const price = calculateConfiguratorPrice(configure?.parts || []);

    return {
      components: configure?.parts || [],
      price,
    };
  }

  async addComponent(
    userId: string,
    componentId: string,
  ): Promise<{ component: IProduct; price: number }> {
    const component = await ProductModel.findById(componentId);
    if (!component) throw new Error("Товар не найден");

    let configure = await ConfiguratorModel.findOne({ userId });
    if (!configure) {
      configure = await ConfiguratorModel.create({
        userId,
        parts: [new mongoose.Types.ObjectId(componentId)],
        price: component.discountPrice,
      });
    } else {
      const currentParts = await ProductModel.find({
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
      const updatedParts = await this.recalculatePrice(configure);
      await configure.save();
    }

    return {
      component,
      price: configure.price,
    };
  }

  async addComponents(
    userId: string,
    componentIds: string[],
  ): Promise<{ components: IProduct[]; price: number }> {
    const components = await ProductModel.find({ _id: { $in: componentIds } });
    if (!components.length) throw new Error("Товары не найдены");

    let configure = await ConfiguratorModel.findOne({ userId });
    if (!configure) {
      const price = calculateConfiguratorPrice(components);
      configure = await ConfiguratorModel.create({
        userId,
        parts: componentIds.map((id) => new mongoose.Types.ObjectId(id)),
        price: price,
      });
    } else {
      const currentParts = await ProductModel.find({
        _id: { $in: configure.parts },
      });
      const partsMap: Partial<Record<ComponentType, mongoose.Types.ObjectId>> =
        {};

      currentParts.forEach((part) => {
        if (part.componentType)
          partsMap[part.componentType] = part._id as mongoose.Types.ObjectId;
      });
      components.forEach((component) => {
        if (component.componentType)
          partsMap[component.componentType] =
            component._id as mongoose.Types.ObjectId;
      });

      configure.parts = Object.values(partsMap);
      const updatedParts = await this.recalculatePrice(configure);
      await configure.save();
    }

    return {
      components,
      price: configure.price,
    };
  }

  async deleteComponent(
    userId: string,
    componentId: string,
  ): Promise<{ removedId: string; components: IProduct[]; price: number }> {
    let configure = await ConfiguratorModel.findOne({ userId });
    if (!configure) throw new Error("Конфигуратор не найден");

    configure.parts = configure.parts.filter(
      (part) => part.toString() !== componentId,
    );
    const updatedParts = await this.recalculatePrice(configure);
    await configure.save();

    return {
      removedId: componentId,
      components: updatedParts,
      price: configure.price,
    };
  }

  async clearConfigure(
    userId: string,
  ): Promise<{ components: IProduct[]; price: number }> {
    let configure = await ConfiguratorModel.findOne({ userId });
    if (!configure) throw new Error("Конфигуратор не найден");

    configure.parts = [];
    configure.price = 0;
    await configure.save();

    return {
      components: [],
      price: 0,
    };
  }
}

const configuratorService = new ConfiguratorService();

export { configuratorService };
