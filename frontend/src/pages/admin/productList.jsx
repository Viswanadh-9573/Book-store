import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const ProductList = () => {
  const { booksData =[]} = useContext(AppContext);
  console.log("Booksdata:", booksData);
  return (
    <div className="flex-1 py-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-semibold text-gray-800">All Products</h2>

        <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-md bg-white border border-gray-200 shadow-sm">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-900">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Selling Price</th>
               
              </tr>
            </thead>

            <tbody>
              {booksData.length > 0 ? (
                booksData.map((product, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 flex items-center space-x-3">
                      <div className="border border-gray-300 rounded-md overflow-hidden w-14 h-14 flex-shrink-0">
                        <img
                          
                          src={`${import.meta.env.VITE_API_BASE_URL}/images/${product.image}`}
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="truncate">{product.name}</span>
                    </td>

                    <td className="px-4 py-3">{product.category}</td>

                    <td className="px-4 py-3 hidden md:table-cell">
                      ₹{product.offerPrice}
                    </td>

                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No products available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );


};

export default ProductList;
