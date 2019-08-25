import React from "react";
import { withRouter } from "react-router-dom";
import PageHead from "@/components/PageHead";
import Table from "./components/Table";

function Movies(props) {
  const handleClick = () => {
    props.history.push("add/Movies");
  };

  return (
    <div>
      <PageHead title="电影管理" buttonText="添加电影" onClick={handleClick} />
      <Table />
    </div>
  );
}

export default withRouter(Movies);
