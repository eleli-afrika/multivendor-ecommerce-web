import { Table } from "antd";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchLoggedUsersProducts } from "../../../Redux/slices/AdsSlice";
import { GettingUserById } from "../../../Redux/slices/AuthSlice";
import { AppDispatch } from "../../../Redux/store";
import { ProductData } from "../../../interface/common";
import Loader from "../../../constants/loader";

const AdsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, Ads } = useSelector((state: any) => state.AllAds);
  const user = useSelector((state: any) => state.auth.user);
  const id = user?.userid;
  useEffect(() => {
    dispatch(GettingUserById(id)).then((action) => {
      if (GettingUserById.fulfilled.match(action)) {
        console.log(user);
        dispatch(FetchLoggedUsersProducts(id));
      }
    });
  }, [dispatch, id]);

  const filteredAds = Ads.filter((product: ProductData) => !product.isapproved);

  const TableData = [
    {
      title: "Name",
      dataIndex: "productname",
    },

    {
      title: "Price",
      dataIndex: "productprice",
    },

    {
      title: "CreatedAt",
      dataIndex: "dateadded",
      //   render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text: any, record: any) => {
        console.log(record, text);
        return (
          <div className="flex mr-2 gap-3">
            <Visibility className="text-primary-orange" />
            <Edit className="text-green-500 " />
            <Delete className="text-red-600" />
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="mt-4">
      <Table
        columns={TableData}
        dataSource={filteredAds}
        className="border rounded-sm"
      ></Table>
    </div>
  );
};

export default AdsTable;
