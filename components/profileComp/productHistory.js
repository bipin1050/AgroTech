const ProductHistory = ({ myHistory }) => {
  return (
    <div className="self-center justify-center p-10 items-center w-full">
      {!myHistory ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full box-shadow divide-y divide-gray-200 border border-gray-200">
          <thead>
            <tr className=" text-white" style={{ backgroundColor: "#3E9B05" }}>
              <th className="p-2 text-left">Select</th>
              <th className="p-2 text-left">S.N.</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {!myHistory ? (
              <tr>
                <td className="p-2" colSpan={7}>
                  <p className="text-sm text-center text-gray-500">
                    Loading...
                  </p>
                </td>
              </tr>
            ) : (
              myHistory.map((product, idx) => {
                return (
                  <tr key={idx}>
                    <td className="p-2">
                      <input
                        type={"checkbox"}
                        // className="text-[#3E9B05]"
                        style={{ accentColor: "#3E9B05" }}
                      />
                    </td>
                    <td className="p-2">{idx + 1}</td>
                    <td className="p-2">{product.productname}</td>
                    <td className="p-2">{product.price}</td>
                    <td className="p-2">{product.quantity}</td>
                    <td className="p-2">{product.status}</td>
                  </tr>
                );
              })
            )}

            {!myHistory.length && (
              <tr>
                <td className="p-2" colSpan={7}>
                  <p className="text-sm text-center text-gray-500">
                    No records found
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductHistory;
