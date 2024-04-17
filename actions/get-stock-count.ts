import prismadb from "@/lib/prismadb";

export const getStockCount = async (storeId: string): Promise<number> => {
  const stockData = await prismadb.product.findMany({
    where: {
      storeId,
      isArchived: false,
      stock: {
        gt: 0,
      },
    },
    select: {
      stock: true,
    },
  });

  const stockCount = stockData.reduce((acc, curr) => acc + curr.stock, 0);

  return stockCount;
};
