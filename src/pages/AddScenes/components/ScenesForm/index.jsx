import React, { useRef, useState, useEffect } from "react";
import IceContainer from "@icedesign/container";
import { Input, Button, Message, Select, NumberPicker } from "@alifd/next";
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError
} from "@icedesign/form-binder";
import PageHead from "@/components/PageHead";
import styles from "./index.module.scss";
import API from "@/api";

export default function MoviesForm() {
  const [movies, setMovies] = useState([]);
  const formEl = useRef(null);

  const formChange = value => {
    console.log("value", value);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    API.get("/movies/released").then(res => {
      console.log(res.data);
      let data = res.data;
      let movies = data.map(v => {
        return { label: v.name, value: v.id };
      });
      console.log(movies);
      setMovies(movies);
    });
  };

  //校验并提交
  const validateAllFormField = () => {
    formEl.current.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      API.post("/scenes", values)
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
      <PageHead title="添加场次" />
      <IceContainer style={{ padding: "40px" }}>
        <IceFormBinderWrapper onChange={formChange} ref={formEl}>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>电影：</div>
            <IceFormBinder name="movieId">
              <Select
                placeholder="请选择"
                style={{ width: "400px" }}
                dataSource={movies}
                showSearch={true}
              />
            </IceFormBinder>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>价格：</div>
            <IceFormBinder name="price" required message="价格必填">
              <NumberPicker defaultValue={0} min={0} />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="price" />
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>播放时间：</div>
            <IceFormBinder name="showtime" required message="时间必填">
              <Input
                placeholder="请输入播放时间: 12:40"
                style={{ width: "400px" }}
              />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="showtime" />
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
