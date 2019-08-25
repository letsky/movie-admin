import React from "react";
import { withRouter } from "react-router-dom";
import PageHead from "@/components/PageHead";
import Table from "./components/Table";

function Caregories(props) {
  const handleClick = () => {
    props.history.push("add/caregories");
  };

  return (
    <div>
      <PageHead title="类别管理" buttonText="添加类别" onClick={handleClick} />
      <Table />
    </div>
  );
}

export default withRouter(Caregories);
