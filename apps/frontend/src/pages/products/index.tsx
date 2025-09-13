import { useProducts } from "../../entities/product/hooks";
import { useAuthStore } from "../../shared/store/auth";

export default function ProductsPage() {
  const { user } = useAuthStore();
  const { data, isLoading, isError } = useProducts();

  console.log("data:", data);

  // if (!user) return <Navigate to="/login" replace />;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <ul className="grid grid-cols-3 gap-4">
        {data?.map((p) => (
          <li key={p.id} className="border rounded p-4">
            <h2 className="font-semibold">{p.name}</h2>
            <p>${p.price}</p>
            <p className="text-sm text-gray-600">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
