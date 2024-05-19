import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Table, Form, Upload } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import style from "./Brand.module.css";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Brand = () => {
  const [bradns, setBrands] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadings, setLoadings] = useState(false);
  const navigate = useNavigate();
  const [form] = useForm();
  const imageUrl =
    "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  const getBrands = () => {
    setLoading(true);
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
      .then((response) => {
        setBrands(response.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    localStorage.getItem("access_token") ? "" : navigate("/login");
    getBrands();
  }, []);

  // Add brand function
  const handleOk = () => {
    if (modalType === "add") {
      form.validateFields().then((values) => {
        const formData = new FormData();
        formData.append("images", imageFile);
        formData.append("title", values.title);
        setLoadings(true);
        axios
          .post(
            "https://autoapi.dezinfeksiyatashkent.uz/api/brands/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          )
          .then(() => {
            getBrands();
            setLoadings(false);
            setModalOpen(false);
            toast.success("Brand created successfully!");
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
        formData.append("images", imageFile);
        formData.append("title", values?.title);
        setLoadings(true);
        axios
          .put(
            `https://autoapi.dezinfeksiyatashkent.uz/api/brands/${selectedBrand.id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          )
          .then(() => {
            getBrands();
            setLoadings(false);
            setModalOpen(false);
            toast.success("Brands updated successfully!");
            form.resetFields();
          })
          .catch((err) => {
            setLoadings(false);
            setModalOpen(false);
            toast.error(err.message);
            form.resetFields();
          });
      });
    }
  };

  const handleEdit = (item) => {
    const image = `${imageUrl}${item.image_src}`;
    setSelectedBrand({
      id: item?.id,
      title: item?.title,
      images: image,
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
            `https://autoapi.dezinfeksiyatashkent.uz/api/brands/${id}`,
            config
          )
          .then(() => {
            getBrands();
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
      title: "Name",
      dataIndex: "name",
      key: "name",
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
            Add brand
          </Button>
        </div>
      ),
      dataIndex: "action",
      key: "action",
    },
  ];
  // Table data
  const data = bradns.map((item, index) => ({
    loading: true,
    key: index,
    name: item.title,
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
    <div className={style["brand_header"]}>
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
            label="Brand Name"
            name="title"
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
              maxCount={1}
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
export default Brand;
