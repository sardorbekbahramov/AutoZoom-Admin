import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Table, Form, Upload } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadings, setLoadings] = useState(false);
  const navigate = useNavigate();
  const [form] = useForm();
  const imageUrl =
    "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  const getCategories = () => {
    setLoading(true);
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((response) => {
        setCategories(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    localStorage.getItem("access_token") ? "" : navigate("/login");
    getCategories();
  }, []);

  // Add brand function
  const handleOk = () => {
    if (modalType === "add") {
      form.validateFields().then((values) => {
        const formData = new FormData();
        formData.append("name_en", nameEn);
        formData.append("name_ru", nameRu);
        if (values?.images && values?.images?.length > 0) {
          values.images.forEach((image) => {
            if (image && image?.originFileObj) {
              formData.append("images", image?.originFileObj, image.name);
            }
          });
        }
        setLoadings(true);
        axios
          .post(
            "https://autoapi.dezinfeksiyatashkent.uz/api/categories/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          )
          .then(() => {
            setLoadings(false);
            setModalOpen(false);
            toast.success("Brand created successfully!");
            getCategories();
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
        formData.append("name_en", nameEn);
        formData.append("name_ru", nameRu);
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
            `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${selectedCategories.id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          )
          .then(() => {
            getCategories();
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
    const images = `${imageUrl}${item.image_src}`;
    setSelectedCategories({
      id: item?.id,
      name_en: item?.name_en,
      name_ru: item?.name_ru,
    });

    form.setFieldsValue(item);
  };

  const deleteBrand = (id) => {
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
            `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
            config
          )
          .then(() => {
            getCategories();
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
  // Handle functions
  const handleCancel = () => {
    setModalOpen(false);
    form.resetFields();
  };
  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      setImageFile(info.file.originFileObj);
    }
  };

  // Table columns
  const columns = [
    {
      title: "Name_en",
      dataIndex: "name_en",
      key: "nameEn",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Name_ru",
      dataIndex: "name_ru",
      key: "nameRu",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
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
            Add Categories
          </Button>
        </div>
      ),
      dataIndex: "action",
      key: "action",
    },
  ];
  // Table data
  const data = categories.map((item, index) => ({
    loading: true,
    key: index,
    name_en: item.name_en,
    name_ru: item.name_ru,
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
          <Button type="primary" danger onClick={() => deleteBrand(item.id)}>
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
            label="name_en"
            name="name_en"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="name_ru"
            name="name_ru"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Upload Image"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload
              customRequest={({ onSuccess }) => {
                onSuccess("ok");
              }}
              onChange={handleImageChange}
              listType="picture-card"
            >
              <div>
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Settings;
