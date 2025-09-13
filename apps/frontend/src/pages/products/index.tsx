import { useProducts } from "../../entities/product/hooks";

export default function ProductsPage() {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul className="grid grid-cols-3 gap-4">
        {data?.map((product) => (
          <li key={product.id} className="border p-4 rounded shadow-sm">
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-gray-700">${product.price}</p>
            <p className="text-sm text-gray-500">{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
