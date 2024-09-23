import { Model, ModelCtor } from "sequelize";

interface PaginationResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export default async <T>(
  model: ModelCtor<Model>,
  query: any,
  where: any = {},
  order: any[] = [["createdAt", "DESC"]]
): Promise<PaginationResult<T>> => {
  const { limit = 15, page = 1 } = query;

  const limitValue = parseInt(limit, 10);
  const pageValue = parseInt(page, 10);
  const offset = (pageValue - 1) * limitValue;

  const { rows: data, count: totalItems } = await model.findAndCountAll({
    order,
    limit: limitValue,
    offset,
    where,
  });

  const totalPages = Math.ceil(totalItems / limitValue);

  return { currentPage: pageValue, totalPages, totalItems, data: data as T[] };
};
