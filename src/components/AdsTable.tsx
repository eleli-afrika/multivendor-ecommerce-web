import { Accordions } from "../data/slider";
import { Table } from "antd";
import { Delete, Edit } from "@mui/icons-material";

const AdsTable = () => {
  const TableData = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Price",
      dataIndex: "price",
    },

    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      //   render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text: any, record: any) => {
        console.log(record, text);
        return (
          <div className="flex mr-2 gap-3">
            <Edit className="text-green-500 " />
            <Delete className="text-red-600" />
          </div>
        );
      },
    },
  ];
  return (
    <div className="mt-4">
      <Table
        columns={TableData}
        dataSource={Accordions}
        className="border rounded-sm"
      ></Table>
    </div>
  );
};

export default AdsTable;
