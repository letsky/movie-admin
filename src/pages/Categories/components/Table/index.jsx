import React, { useState, useEffect, useCallback } from "react";
import { Table, Pagination, Button, Dialog, Message } from "@alifd/next";
import IceContainer from "@icedesign/container";
import styles from "./index.module.scss";
import API from "@/api";

export default function categoriesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const fetchData = useCallback(p => {
    setLoading(true);
    API.get("/categories", {
      params: {
        page: p
      }
    }).then(res => {
      console.log(res);
      setLoading(false);
      setTotal(res.data.total);
      console.log(res.data.total);
      setDataSource(res.data.list);
    });
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handlePaginationChange = current => {
    setCurrentPage(current);
    fetchData(current);
  };

  const handleDelete = id => {
    console.log(id);
    Dialog.confirm({
      title: "提示",
      content: "确认删除吗",
      onOk: () => {
        API.delete(`/categories/${id}`)
          .then(res => {
            if (res.status == 200) {
              Message.success("删除成功");
              fetchData();
            }
          })
          .catch(err => {
            console.log(err);
            Message.error("删除失败");
          });
      }
    });
  };

  const renderOper = (value, index, record) => {
    return (
      <div>
        <Button
          type="normal"
          warning
          onClick={handleDelete.bind(this, record.id)}
        >
          删除
        </Button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <IceContainer>
        <Table loading={isLoading} dataSource={dataSource} hasBorder={false}>
          <Table.Column title="id" dataIndex="id" />
          <Table.Column title="类别" dataIndex="name" />
          <Table.Column
            title="操作"
            width={50}
            dataIndex="oper"
            cell={renderOper}
          />
        </Table>
        <Pagination
          className={styles.pagination}
          current={currentPage}
          onChange={handlePaginationChange}
          total={total}
          pageSize={20}
        />
      </IceContainer>
    </div>
  );
}
