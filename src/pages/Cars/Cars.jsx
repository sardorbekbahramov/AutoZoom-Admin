import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Table,
  Form,
  Modal,
  Input,
  Upload,
  Select,
  Switch,
} from "antd";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [model, setModel] = useState([]);
  const [location, setLocation] = useState([]);
  const [city, setCity] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadings, setLoadings] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [id, setId] = useState(null);
  const host = "https://autoapi.dezinfeksiyatashkent.uz/api";
  const [form] = useForm();
  modalOpen;
  const imageUrl =
    "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  const getCars = () => {
    setLoading(true);
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
      .then((response) => {
        setCars(response.data.data);

        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  const getCategory = () => {
    axios
      .get(`${host}/categories`)
      .then((response) => {
        setCategory(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching cars data:", error);
      });
  };

  const getBrand = () => {
    axios
      .get(`${host}/brands`)
      .then((response) => {
        setBrand(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching cars data:", error);
      });
  };
  const getModel = () => {
    axios
      .get(`${host}/models`)
      .then((response) => {
        setModel(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching cars data:", error);
      });
  };
  const getLocation = () => {
    axios
      .get(`${host}/locations`)
      .then((response) => {
        setLocation(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching cars data:", error);
      });
  };
  const getCity = () => {
    axios
      .get(`${host}/cities`)
      .then((response) => {
        setCity(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching cars data:", error);
      });
  };

  useEffect(() => {
    getCars();
    getCategory();
    getBrand();
    getModel();
    getLocation();
    getCity();
  }, []);

  // Add brand function
  const handleOk = () => {
    if (modalType === "add") {
      form.validateFields().then((values) => {
        const formData = new FormData();
        formData.append("brand_id", values.brand_id);
        formData.append("model_id", values?.model_id);
        formData.append("city_id", values?.city_id);
        formData.append("color", values?.color);
        formData.append("year", values?.year);
        formData.append("seconds", values?.seconds);
        formData.append("category_id", values?.category_id);
        formData.append("max_speed", values?.max_speed);
        formData.append("max_people", values?.max_people);
        formData.append("transmission", values?.transmission);
        formData.append("motor", values?.motor);
        formData.append("drive_side", values?.drive_side);
        formData.append("limitperday", values?.limitperday);
        formData.append("deposit", values?.deposit);
        formData.append("petrol", values?.petrol);
        formData.append("premium_protection", values?.premium_protection);
        formData.append("price_in_aed", values?.price_in_aed);
        formData.append("price_in_usd", values?.price_in_usd);
        formData.append("price_in_aed_sale", values?.price_in_aed_sale);
        formData.append("price_in_usd_sale", values?.price_in_usd_sale);
        formData.append("location_id", values?.location_id);
        formData.append("inclusive", values?.inclusive);

        if (values?.images1 && values?.images1?.length > 0) {
          values.images1.forEach((image) => {
            if (image && image?.originFileObj) {
              formData.append("images", image?.originFileObj, image.name);
            }
          });
        }
        if (values?.images2 && values?.images2?.length > 0) {
          values.images2.forEach((image) => {
            if (image && image?.originFileObj) {
              formData.append("images", image?.originFileObj, image.name);
            }
          });
        }
        if (values?.cover && values?.cover?.length > 0) {
          values.cover.forEach((image) => {
            if (image && image?.originFileObj) {
              formData.append("cover", image?.originFileObj, image.name);
            }
          });
        }
        setLoadings(true);
        axios
          .post("https://autoapi.dezinfeksiyatashkent.uz/api/cars/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then(() => {
            setLoadings(false);
            setModalOpen(false);
            toast.success("Brand created successfully!");
            getCars();
            form.resetFields();
          })
          .catch((error) => {
            setLoadings(false);
            setModalOpen(false);
            toast.error(error.message);
            form.resetFields();
          });
      });
    } else if (modalType === "edit") {
      form.validateFields().then((values) => {
        const formData = new FormData();
        formData.append("brand_id", values.brand_id);
        formData.append("model_id", values.model_id);
        formData.append("city_id", values.city_id);
        formData.append("color", values?.color);
        formData.append("year", values?.year);
        formData.append("max_speed", values?.max_speed);
        formData.append("max_people", values?.max_people);
        formData.append("category_id", values?.category_id);
        formData.append("seconds", values?.seconds);
        formData.append("transmission", values?.transmission);
        formData.append("motor", values?.motor);
        formData.append("drive_side", values?.drive_side);
        formData.append("limitperday", values?.limitperday);
        formData.append("deposit", values?.deposit);
        formData.append("petrol", values?.petrol);
        formData.append("premium_protection", values?.premium_protection);
        formData.append("price_in_aed", values?.price_in_aed);
        formData.append("price_in_usd", values?.price_in_usd);
        formData.append("price_in_aed_sale", values?.price_in_aed_sale);
        formData.append("price_in_usd_sale", values?.price_in_usd_sale);
        formData.append("location_id", values?.location_id);
        formData.append("inclusive", values?.inclusive);

        if (values.images1 && values.images1.length > 0) {
          values.images1.forEach((image) => {
            if (image && image.originFileObj) {
              formData.append("images", image.originFileObj, image.name);
            }
          });
        }
        if (values.images2 && values.images2.length > 0) {
          values.images2.forEach((image) => {
            if (image && image.originFileObj) {
              formData.append("images", image.originFileObj, image.name);
            }
          });
        }
        if (values?.images && values?.images?.length > 0) {
          values.images.forEach((image) => {
            if (image && image?.originFileObj) {
              formData.append("images", image?.originFileObj, image.name);
            }
          });
        }
        setLoadings(true);
        axios
          .put(
            `https://autoapi.dezinfeksiyatashkent.uz/api/cars/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          )
          .then(() => {
            getCars();
            setLoadings(false);
            setModalOpen(false);
            toast.success("Brands updated successfully!");
          })
          .catch((err) => {
            setLoadings(false);
            setModalOpen(false);
            toast.error(err.message);
          });
      });
    }
  };

  const handleEdit = (item) => {
    setId(item.id);
    const images = `${imageUrl}${item.image_src}`;
    setSelectedCategories({
      brand_id: item?.brand_id,
      model_id: item?.model_id,
      city_id: item?.city_id,
      color: item?.color,
      year: item?.year,
      seconds: item?.seconds,
      category_id: item?.category_id,
      max_speed: item?.max_speed,
      max_people: item?.max_people,
      transmission: item?.transmission,
      motor: item?.motor,
      drive_side: item?.drive_side,
      petrol: item?.petrol,
      limitperday: item?.limitperday,
      deposit: item?.deposit,
      premium_protection: item?.premium_protection,
      price_in_aed: item?.price_in_aed,
      price_in_usd: item?.price_in_usd,
      price_in_aed_sale: item?.price_in_aed_sale,
      price_in_usd_sale: item?.price_in_usd_sale,
      location_id: item?.location_id,
      inclusive: item?.inclusive,
    });

    form.setFieldsValue(item);
  };

  const deleteCars = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    Modal.confirm({
      title: "Do you want to delete this brand?",
      onOk() {
        setLoading(true);
        axios
          .delete(
            `https://autoapi.dezinfeksiyatashkent.uz/api/cars/${id}`,
            config
          )
          .then(() => {
            getCars();
            setLoading(false);
            toast.success("Brand deleted successfully!");
          })
          .catch((error) => {
            setLoading(false);
            toast.error(error.message);
          });
      },
    });
  };

  const handleCancel = () => {
    setModalOpen(false);
    form.resetFields();
  };

  // Table columns
  const columns = [
    {
      title: "brand",
      dataIndex: "brand_id",
      key: "brand",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "model",
      dataIndex: "model_id",
      key: "model",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "color",
      dataIndex: "color",
      key: "color",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "city",
      dataIndex: "city_id",
      key: "city_id",
      render: (text) => <p>{text}</p>,
    },

    {
      title: (
        <div
          className="brand-title"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p>Action</p>
          <Button
            type="primary"
            onClick={() => {
              setModalOpen(true), setModalType("add");
            }}
          >
            Add Cars
          </Button>
        </div>
      ),
      dataIndex: "action",
      key: "action",
    },
  ];
  // Table data
  const data = cars.map((item, index) => ({
    loading: true,
    key: index,
    model_id: item?.model?.name,
    brand_id: item?.brand?.title,
    city_id: item.city.name,
    color: item?.color,
    images: (
      <img
        style={{ width: "100px" }}
        src={`${imageUrl}${item.image_src}`}
        alt="Brand Logo"
      />
    ),
    action: (
      <>
        <span style={{ marginRight: "20px" }}>
          <Button
            type="primary"
            onClick={() => {
              setModalOpen(true), setModalType("edit"), handleEdit(item);
            }}
          >
            <FaEdit style={{ fontSize: "20px" }} />
          </Button>
        </span>
        <span>
          <Button type="primary" danger onClick={() => deleteCars(item.id)}>
            <MdDeleteForever style={{ fontSize: "20px" }} />
          </Button>
        </span>
      </>
    ),
  }));

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div>
      <Input
        addonBefore={<SearchOutlined />}
        style={{ width: "40%", marginBottom: "40px" }}
        placeholder="large size"
      />
      <Table columns={columns} loading={loading} dataSource={data} />
      <ToastContainer />
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loadings}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Category"
            name="category_id"
            rules={[{ required: true, message: "Please select a category!" }]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Select placeholder="Select Category">
              {category.map((item) => (
                <Select.Option
                  key={item.id}
                  value={item.id}
                  disabled={item.disabled}
                >
                  {item.name_en}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Brand"
            name="brand_id"
            rules={[{ required: true, message: "Please input!" }]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Select placeholder="Select Brand">
              {brand.map((item) => (
                <Select.Option
                  key={item.id}
                  value={item.id}
                  disabled={item.disabled}
                >
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Model"
            name="model_id"
            rules={[{ required: true, message: "Please input!" }]}
            style={{ flex: "0 0 33%" }}
          >
            <Select placeholder="Select Model">
              {model.map((item) => (
                <Select.Option
                  key={item.id}
                  value={item.id}
                  disabled={item.disabled}
                >
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Location"
            name="location_id"
            rules={[{ required: true, message: "Please input!" }]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Select placeholder="Select Location">
              {location.map((item) => (
                <Select.Option
                  key={item.id}
                  value={item.id}
                  disabled={item.disabled}
                >
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="City"
            name="city_id"
            rules={[{ required: true, message: "Please input!" }]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Select placeholder="Select City">
              {city.map((item) => (
                <Select.Option
                  key={item.id}
                  value={item.id}
                  disabled={item.disabled}
                >
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: "Please enter the name" }]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="year"
            label="Yil"
            rules={[{ required: true, message: "Please enter the year" }]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="seconds"
            label="Seconds"
            rules={[{ required: true, message: "Please enter the color" }]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="max_speed"
            label="Speed"
            rules={[{ required: true, message: "Please enter the speed" }]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="max_people"
            label="Max People"
            rules={[{ required: true, message: "Please enter the max people" }]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="motor"
            label="Motor"
            rules={[{ required: true, message: "Please enter the motor" }]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="transmission"
            label="Transmission"
            rules={[
              { required: true, message: "Please enter the transmission" },
            ]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="drive_side"
            label="Drive Side"
            rules={[{ required: true, message: "Please enter the drive side" }]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="petrol"
            label="Yoqilg'i"
            rules={[{ required: true, message: "Please enter the yoqilg'i" }]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="limitperday"
            label="Limit Per Day"
            rules={[
              { required: true, message: "Please enter the limit per day" },
            ]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="deposit"
            label="Deposit"
            rules={[{ required: true, message: "Please enter the deposit" }]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="premium_protection"
            label="Premium Protection Price"
            rules={[
              {
                required: true,
                message: "Please enter the premium protection price",
              },
            ]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price_in_aed"
            label="Price in AED"
            rules={[
              { required: true, message: "Please enter the price in AED" },
            ]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price_in_usd"
            label="Price in USD(Otd)"
            rules={[
              { required: true, message: "Please enter the price in USD(Otd)" },
            ]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price_in_aed_sale"
            label="Price in AED (Otd)"
            rules={[
              {
                required: true,
                message: "Please enter the price in AED (Otd)",
              },
            ]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price_in_usd_sale"
            label="Price in USD"
            rules={[
              { required: true, message: "Please enter the price in USD" },
            ]}
            style={{ flex: "0 0 33%", paddingRight: "8px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="inclusive"
            label="Inclusive"
            style={{ flex: "0 0 15%", paddingRight: "8px" }}
            valuePropName="checked"
          >
            <Switch onChange={(checked) => setInclusive(checked)} />
          </Form.Item>
          {!currentItem ? (
            <>
              <Form.Item
                name="images1"
                label="Upload car images"
                rules={[{ required: true, message: "Please upload images" }]}
                valuePropName="fileList"
                getValueFromEvent={normFile}
                style={{ flex: "0 0 25%", paddingRight: "8px" }}
              >
                <Upload
                  customRequest={({ onSuccess }) => {
                    onSuccess("ok");
                  }}
                  listType="picture-card"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item
                name="images2"
                label="Upload the main image"
                rules={[
                  { required: true, message: "Please upload the main image" },
                ]}
                valuePropName="fileList"
                getValueFromEvent={normFile}
                style={{ flex: "0 0 25%", paddingRight: "8px" }}
              >
                <Upload
                  customRequest={({ onSuccess }) => {
                    onSuccess("ok");
                  }}
                  listType="picture-card"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item
                name="cover"
                label="Upload the cover image"
                rules={[
                  { required: true, message: "Please upload the cover image" },
                ]}
                valuePropName="fileList"
                getValueFromEvent={normFile}
                style={{ flex: "0 0 25%", paddingRight: "8px" }}
              >
                <Upload
                  customRequest={({ onSuccess }) => {
                    onSuccess("ok");
                  }}
                  listType="picture-card"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </>
          ) : null}
        </Form>
      </Modal>
    </div>
  );
};
export default Cars;
