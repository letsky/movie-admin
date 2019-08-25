import React, { useRef } from "react";
import IceContainer from "@icedesign/container";
import { Input, Button, Message } from "@alifd/next";
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError
} from "@icedesign/form-binder";
import PageHead from "@/components/PageHead";
import styles from "./index.module.scss";
import API from "@/api";

export default function CategoriesForm() {
  const formEl = useRef(null);

  const formChange = value => {
    console.log("value", value);
  };

  //校验并提交
  const validateAllFormField = () => {
    formEl.current.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      API.post("/categories", values)
        .then(res => {
          if (res.status == 200) {
            Message.success("提交成功");
          }
        })
        .catch(err => {
          console.log(err);
          Message.error("参数错误");
        });
      console.log({ values });
    });
  };

  return (
    <div>
      <PageHead title="添加类别" />
      <IceContainer style={{ padding: "40px" }}>
        <IceFormBinderWrapper onChange={formChange} ref={formEl}>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>类别名称：</div>
            <IceFormBinder name="name" required message="类别必填">
              <Input placeholder="请输入类别名称" style={{ width: "400px" }} />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="name" />
            </div>
          </div>
          <Button type="primary" onClick={validateAllFormField}>
            提 交
          </Button>
        </IceFormBinderWrapper>
      </IceContainer>
    </div>
  );
}
