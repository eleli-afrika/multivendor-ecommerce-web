import { Form } from "antd";

const AdsForm = () => {
  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "0.25rem",
  };
  return (
    <div className="container mx-auto p-4 bg-gray-light mt-4 rounded w-[650px] m-5">
      <div className="text-center m-4">Create your next ad on Eduka!!!</div>
      <Form>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <input style={inputStyle} type="text" maxLength={20} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <input style={inputStyle} type="text" maxLength={150} />
        </Form.Item>
        <div className="flex">
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <input style={inputStyle} type="number" />
          </Form.Item>
          <Form.Item
            label="Bulk Price"
            name="BulkPrice"
            rules={[{ required: true, message: "Please enter the bulk price" }]}
          >
            <input style={inputStyle} type="number" />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please enter the quantity" }]}
          >
            <input style={inputStyle} type="number" />
          </Form.Item>
        </div>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <input style={inputStyle} type="text" />
        </Form.Item>
        {/* labels */}
        <div className="flex">
          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please select the category",
              },
            ]}
          >
            <select name="" id="" className="h-[35px] p-2 border">
              <option value="electronics">Electronics</option>
              <option value="electronics">Electronics</option>
            </select>
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please select the category",
              },
            ]}
          >
            <select name="" id="" className="h-[35px] p-2 border">
              <option value="fashion">Fashion</option>
              <option value="sports">Sports</option>
            </select>
          </Form.Item>
          <Form.Item
            label="Brand"
            name="brand"
            rules={[
              {
                required: true,
                message: "Please select the subcategory",
              },
            ]}
          >
            <select name="" id="" className="h-[35px] p-2 border">
              <option value="electronics">Electronics</option>
              <option value="electronics">fashion</option>
            </select>
          </Form.Item>
        </div>
        {/* end of lables1  */}

        {/* labels */}
        <div className="flex">
          <Form.Item
            label="Location"
            name="location"
            rules={[
              {
                required: true,
                message: "Please select the location",
              },
            ]}
          >
            <select name="" id="" className="h-[35px] p-2 border">
              <option value="electronics">Nairobi</option>
              <option value="electronics">Kajiando</option>
            </select>
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
                message: "Please select the category",
              },
            ]}
          >
            <select name="" id="" className="h-[35px] p-2 border">
              <option value="fashion">Brand New</option>
              <option value="sports">Refurbished</option>
            </select>
          </Form.Item>
          <Form.Item
            label="Brand"
            name="brand"
            rules={[
              {
                required: true,
                message: "Please select the subcategory",
              },
            ]}
          >
            <select name="" id="" className="h-[35px] p-2 border">
              <option value="electronics">Electronics</option>
              <option value="electronics">Electronics</option>
            </select>
          </Form.Item>
        </div>
        {/* end of lables 2 */}
        {/* the check box features */}

        <div className="flex ">
          <Form.Item
            label="Warrant Available?"
            name="warrant"
            valuePropName="checked"
          >
            <input style={inputStyle} type="checkbox" />
          </Form.Item>
          <Form.Item
            label="Negotiable"
            name="negotiable"
            valuePropName="checked"
          >
            <input style={inputStyle} type="checkbox" />
          </Form.Item>
        </div>

        {/* end of checkbox features */}
        <div>
          <Form.Item label="Upload Image">
            <input style={inputStyle} type="file" />
          </Form.Item>
        </div>
        <button
          type="submit"
          className="w-full bg-primary-orange hover:bg-secondary-orange text-white text-xl h-12 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          Create
        </button>
      </Form>
    </div>
  );
};

export default AdsForm;
