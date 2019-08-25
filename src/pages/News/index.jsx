import React from "react";
import { withRouter } from "react-router-dom";
import PageHead from "@/components/PageHead";
import Table from "./components/Table";

function News(props) {
  const handleClick = () => {
    props.history.push("add/news");
  };

  return (
    <div>
      <PageHead title="资讯管理" buttonText="添加资讯" onClick={handleClick} />
      <Table />
    </div>
  );
}

export default withRouter(News);
