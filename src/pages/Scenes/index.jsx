import React from "react";
import { withRouter } from "react-router-dom";
import PageHead from "@/components/PageHead";
import Table from "./components/Table";

function Scenes(props) {
  const handleClick = () => {
    props.history.push("add/Scenes");
  };

  return (
    <div>
      <PageHead title="场次管理" buttonText="添加场次" onClick={handleClick} />
      <Table />
    </div>
  );
}

export default withRouter(Scenes);
