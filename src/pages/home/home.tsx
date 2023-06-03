import React, { useEffect } from "react";

import appInfo from "../../app-info";
import { useNavigation } from "../../contexts/navigation";

import "./home.scss";
import { useTranslation } from "react-i18next";

export default (props: any) => {
  const { currentPath } = props;
  const { setNavigationData } = useNavigation();
  const { t } = useTranslation()

  useEffect(() => {
    if (setNavigationData) {
      setNavigationData({ currentPath: currentPath });
    }
  }, [currentPath, setNavigationData, useTranslation]);
  console.log(t('home.title'));

  return (
    <React.Fragment>
      <h2 className={"content-block"}>{t('home.title')}</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <div className={"logos-container"}>
            {/* <img src={process.env.PUBLIC_URL + "/el-othman.png"} alt="logo" /> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
