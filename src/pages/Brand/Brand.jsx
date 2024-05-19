import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select, message, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import style from "./Brand.module.css";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const Brand = () => {
  const [bradns, setBrands] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);

  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = () => {
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
      .then((response) => {
        setBrands(response.data?.data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const addBrand = () => {};

  const deleteBrand = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    Modal.confirm({
      title: "Do you want to delete this brand?",
      onOk() {
        axios
          .delete(
            `https://autoapi.dezinfeksiyatashkent.uz/api/brands/${id}`,
            config
          )
          .then((response) => {
            message.success("Brand deleted successfully!");
            getBrands();
          })
          .catch((error) => {
            message.error(error.message);
          });
      },
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
          <Button onClick={() => setModal2Open(true)}>Add brand</Button>
        </div>
      ),
      dataIndex: "action",
      key: "action",
    },
  ];

  const data = bradns.map((item, index) => ({
    key: index,
    name: item.title,
    action: (
      <Select
        placeholder="Action"
        style={{
          width: 120,
        }}
        options={[
          {
            value: "edit",
            label: (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  columnGap: "20px",
                }}
              >
                <FiEdit style={{ fontSize: "16px" }} />
                Edit
              </div>
            ),
          },
          {
            value: "delete",
            label: (
              <div
                onClick={() => deleteBrand(item?.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  columnGap: "20px",
                }}
              >
                <RiDeleteBinLine style={{ fontSize: "16px" }} />
                Delete
              </div>
            ),
          },
        ]}
      />
    ),
  }));

  return (
    <div className={style["brand_header"]}>
      <Input
        addonBefore={<SearchOutlined />}
        style={{ width: "40%", marginBottom: "40px" }}
        placeholder="large size"
      />
      <Table columns={columns} dataSource={data} />

      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </div>
  );
};

export default Brand;
