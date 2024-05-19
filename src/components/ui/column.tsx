import { CartItem } from "@/pages/Cart";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CartItem>[] = [
  {
    accessorKey: "Sr_No",
    header: "Sr No.",
    cell: ({ row }) => (
      <p className="text-center font-medium">{row.index + 1}</p>
    ),
  },
  {
    accessorKey: "Product_Image",
    header: "Product_Image",
    cell: ({ row }) => {
      const Product_Image = row.original.productId.Product_img;
      return (
        <img src={Product_Image} alt="product-Image" className="w-56 h-36" />
      );
    },
  },
  {
    accessorKey: "Product_Name",
    header: "Product Name",
    cell: ({ row }) => {
      const product_Name = row.original.productId.Product_name;
      return <p className="text-center font-medium">{product_Name}</p>;
    },
  },
  {
    accessorKey: "Quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = row.original.quantity;
      return <p className="text-center font-medium">{quantity}</p>;
    },
  },
  {
    accessorKey: "Price",
    header: "Price",
    cell: ({ row }) => {
      const Price = row.original.productId.Price;
      return <p className="text-center font-medium">{Price}</p>;
    },
  },
];
