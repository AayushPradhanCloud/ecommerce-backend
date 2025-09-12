import { useProducts } from "../../entities/product/hooks";


export default function ProductsPage() {
  const { data, isLoading, isError } = useProducts();

  if (isLoading) {
    return <p className="text-gray-600">Loading products...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Failed to load products.</p>;
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {data?.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 shadow hover:shadow-lg transition"
        >
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
          <p className="text-gray-800 font-medium mt-2">
            ${product.price}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Stock: {product.stock}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Category: {product.categoryId ?? "Uncategorized"}
          </p>
        </div>
      ))}
    </div>
  );
}
