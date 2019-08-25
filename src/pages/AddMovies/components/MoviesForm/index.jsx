import React, { useRef, useState, useEffect } from "react";
import IceContainer from "@icedesign/container";
import {
  Input,
  Button,
  Message,
  Upload,
  DatePicker,
  Radio,
  Select,
  NumberPicker
} from "@alifd/next";
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError
} from "@icedesign/form-binder";
import PageHead from "@/components/PageHead";
import styles from "./index.module.scss";
import API from "@/api";

const list = [
  {
    value: "off",
    label: "未上映"
  },
  {
    value: "on",
    label: "上映"
  }
];

function onPreview(info) {
  console.log("onPreview callback : ", info);
}

function onChange(info) {
  console.log("onChange callback : ", info);
}

function onSuccess(res, file) {
  console.log("onSuccess callback : ", res, file);
}

function onError(file) {
  console.log("onError callback : ", file);
}

export default function MoviesForm() {
  const [categories, setCategories] = useState([]);
  const formEl = useRef(null);

  const formChange = value => {
    console.log("value", value);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    API.get("/categories/all").then(res => {
      console.log(res.data);
      let data = res.data;
      let categories = data.map(v => {
        return { label: v.name, value: v.id };
      });
      setCategories(categories);
    });
  };

  //校验并提交
  const validateAllFormField = () => {
    formEl.current.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      API.post("/movies", values)
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
      <PageHead title="添加电影" />
      <IceContainer style={{ padding: "40px" }}>
        <IceFormBinderWrapper onChange={formChange} ref={formEl}>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>电影名称：</div>
            <IceFormBinder name="movieName" required message="名称必填">
              <Input placeholder="请输入电影名称" style={{ width: "400px" }} />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="movieName" />
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>电影海报：</div>
            <Upload.Card
              listType="card"
              action="https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload"
              accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
              onPreview={onPreview}
              onChange={onChange}
              onSuccess={onSuccess}
              onError={onError}
            />
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>电影时长（分钟）：</div>
            <IceFormBinder name="duration" required message="必填">
              <NumberPicker defaultValue={0} min={0} />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="duration" />
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>导演：</div>
            <IceFormBinder name="directors" required message="必填">
              <Input placeholder="请输入导演" style={{ width: "400px" }} />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="directors" />
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>演员：</div>
            <IceFormBinder name="actors" required message="必填">
              <Input placeholder="请输入演员" style={{ width: "400px" }} />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="actors" />
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>电影类别：</div>
            <IceFormBinder name="categoryIds">
              <Select
                placeholder="请选择"
                mode="multiple"
                style={{ width: "400px" }}
                dataSource={categories}
                showSearch={true}
              />
            </IceFormBinder>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>国家：</div>
            <IceFormBinder name="country" required message="必填">
              <Input placeholder="请输入国家" style={{ width: "400px" }} />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="country" />
            </div>
          </div>
          {/* <div className={styles.formItem}>
            <div className={styles.formLabel}>价格：</div>
            <IceFormBinder name="price" required message="价格必填">
              <Input
                placeholder="请输入电影价格: 40"
                style={{ width: "400px" }}
              />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="price" />
            </div>
          </div> */}
          <div className={styles.formItem}>
            <div className={styles.formLabel}>上映时间：</div>
            <IceFormBinder name="releaseDate">
              <DatePicker style={{ width: "400px" }} />
            </IceFormBinder>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>是否上映：</div>
            <IceFormBinder name="status" required message="必填">
              <Radio.Group dataSource={list} />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="status" />
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>剧情：</div>
            <IceFormBinder name="plot">
              <Input.TextArea
                placeholder="请输入剧情"
                style={{ width: "400px" }}
              />
            </IceFormBinder>
          </div>
          <Button type="primary" onClick={validateAllFormField}>
            提 交
          </Button>
        </IceFormBinderWrapper>
      </IceContainer>
    </div>
  );
}
