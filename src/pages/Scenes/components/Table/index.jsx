import React, { useState, useEffect, useCallback } from "react";
import { Table, Pagination, Button, Dialog, Message } from "@alifd/next";
import IceContainer from "@icedesign/container";
import styles from "./index.module.scss";
import API from "@/api";

export default function MoviesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const fetchData = useCallback(p => {
    setLoading(true);
    API.get("/scenes", {
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
        API.delete(`/scenes/${id}`)
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

  const renderOperation = (value, index, record) => {
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
          <Table.Column title="电影id" dataIndex="movieId" />
          <Table.Column title="电影名称" dataIndex="movieName" />
          <Table.Column title="价格" dataIndex="price" />
          <Table.Column title="座位数" dataIndex="seatNum" />
          <Table.Column title="播放时间" dataIndex="showtime" />
          <Table.Column title="已预定的座位" dataIndex="bookedSeat" />
          <Table.Column
            title="操作"
            width={50}
            dataIndex="oper"
            cell={renderOperation}
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
