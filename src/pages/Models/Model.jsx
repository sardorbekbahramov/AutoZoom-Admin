// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Table, Form, Upload, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import "./Model.css";
import { useNavigate } from "react-router-dom";

const Models = () => {
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadings, setLoadings] = useState(false);
  const [form] = useForm();
  const navigate = useNavigate();

  const getModels = () => {
    setLoading(true);
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/models")
      .then((response) => {
        setModels(response.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  // Get brands function
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
    getModels();
    getBrands();
  }, []);

  // Add Model function
  const handleOk = () => {
    if (modalType === "add") {
      form.validateFields().then((values) => {
        const formData = new FormData();
        formData.append("name", values?.name);
        formData.append("brand_id", values?.brandId);
        setLoadings(true);
        axios
          .post(
            "https://autoapi.dezinfeksiyatashkent.uz/api/models",
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
            getModels();
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
        formData.append("name", values?.name);
        formData.append("brand_id", values?.brandID);
        setLoadings(true);
        axios
          .put(
            `https://autoapi.dezinfeksiyatashkent.uz/api/models/${selectedModel.id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          )
          .then(() => {
            getModels();
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
    setSelectedModel({
      id: item?.id,
      title: item?.name,
    });

    form.setFieldsValue(item);
  };

  // Delet function
  const deleteModel = (id) => {
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
            `https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`,
            config
          )
          .then(() => {
            getModels();
            setLoading(false);
            toast.success("Model deleted successfully!");
          })
          .catch((error) => {
            setLoading(false);
            toast.error(error.message);
          });
      },
    });
  };
  // Handle function
  const handleCancel = () => {
    setModalOpen(false);
    form.resetFields();
  };

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "model_brand",
      key: "model_brand",
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
  const data = models.map((item, index) => ({
    loading: true,
    key: index,
    name: item.name,
    model_brand: item.brand_title,
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
          <Button type="primary" danger onClick={() => deleteModel(item.id)}>
            <MdDeleteForever style={{ fontSize: "20px" }} />
          </Button>
        </span>
      </>
    ),
  }));

  return (
    <div className="model-header">
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
            label="Model Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Brand Name"
            name="brandId"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Select defaultValue={"Select Brand"} style={{ width: 120 }}>
              {brands.map((brand, index) => {
                return (
                  <Select.Option key={index} value={brand.id}>
                    {brand.title}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Models;
