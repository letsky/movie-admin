import React, { useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { Input, Button, Message } from "@alifd/next";
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError
} from "@icedesign/form-binder";
import IceIcon from "@icedesign/foundation-symbol";
import styles from "./index.module.scss";
import API from "../../api";

function UserLogin(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const formEl = useRef(null);

  const formChange = value => {
    setFormData(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    formEl.current.validateAll((errors, values) => {
      if (errors) {
        console.log("errors", errors);
        return;
      }
      API.post("/login", values)
        .then(res => {
          console.log(res);
          Message.success("登录成功");
          props.history.push("/");
        })
        .catch(res => {
          Message.error("登录失败");
        });
    });
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>登 录</h4>
      <IceFormBinderWrapper value={formData} onChange={formChange} ref={formEl}>
        <div className={styles.formItems}>
          <div className={styles.formItem}>
            <IceIcon type="person" size="small" className={styles.inputIcon} />
            <IceFormBinder name="email" required message="邮箱必填">
              <Input
                size="large"
                maxLength={30}
                placeholder="邮箱"
                className={styles.inputCol}
              />
            </IceFormBinder>
            <IceFormError name="username" />
          </div>

          <div className={styles.formItem}>
            <IceIcon type="lock" size="small" className={styles.inputIcon} />
            <IceFormBinder name="password" required message="密码必填">
              <Input
                size="large"
                htmlType="password"
                placeholder="密码"
                className={styles.inputCol}
              />
            </IceFormBinder>
            <IceFormError name="password" />
          </div>

          <div className={styles.footer}>
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              className={styles.submitBtn}
            >
              登 录
            </Button>
          </div>
        </div>
      </IceFormBinderWrapper>
    </div>
  );
}

export default withRouter(UserLogin);
