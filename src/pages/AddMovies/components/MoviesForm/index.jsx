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
    value: 0,
    label: "未上映"
  },
  {
    value: 1,
    label: "上映"
  }
];

export default function MoviesForm() {
  const [categories, setCategories] = useState([]);
  const formEl = useRef(null);
  const [images, setImages] = useState(null);

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
      let data = values;
      data.poster = images;
      console.log("data" + JSON.stringify(data));
      API.post("/movies", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          if (res.status == 200) {
            Message.success("提交成功");
          }
        })
        .catch(err => {
          console.log(err);
          Message.error("参数错误");
        });
    });
  };

  function onPreview(info) {
    console.log("onPreview callback : ", info);
  }

  function onSuccess(res, file) {
    console.log(res.response);
    console.log("onSuccess callback : ", res, file);
    setImages(res.response.url);
    Message.success("上传成功");
  }

  function onError(file) {
    Message.error("上传失败");
    console.log("onError callback : ", file);
  }

  return (
    <div>
      <PageHead title="添加电影" />
      <IceContainer style={{ padding: "40px" }}>
        <IceFormBinderWrapper onChange={formChange} ref={formEl}>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>电影名称：</div>
            <IceFormBinder name="name" required message="名称必填">
              <Input placeholder="请输入电影名称" style={{ width: "400px" }} />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="name" />
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>电影海报：</div>
            <Upload.Card
              listType="card"
              action="http://127.0.0.1:8080/api/upload"
              accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
              name="file"
              limit={1}
              onPreview={onPreview}
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
