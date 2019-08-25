import React, { useRef } from "react";
import IceContainer from "@icedesign/container";
import {
  Input,
  Button,
  Message,
  Upload,
  DatePicker,
  Radio,
  Select
} from "@alifd/next";
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError
} from "@icedesign/form-binder";
import PageHead from "@/components/PageHead";
import styles from "./index.module.scss";
import API from "@/api";

export default function NewsForm() {
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
      API.post("/news", values)
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
      <PageHead title="添加资讯" />
      <IceContainer style={{ padding: "40px" }}>
        <IceFormBinderWrapper onChange={formChange} ref={formEl}>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>标题：</div>
            <IceFormBinder name="title" required message="标题必填">
              <Input placeholder="请输入标题" style={{ width: "400px" }} />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="title" />
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>内容：</div>
            <IceFormBinder name="content" required message="内容必填">
              <Input.TextArea
                placeholder="请输入内容"
                style={{ width: "400px" }}
              />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="content" />
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
