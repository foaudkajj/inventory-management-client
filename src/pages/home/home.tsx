import React, { useEffect } from "react";

import appInfo from "../../app-info";
import { useNavigation } from "../../contexts/navigation";

import "./home.scss";

export default (props: any) => {
  const { currentPath } = props;
  const { setNavigationData } = useNavigation();

  useEffect(() => {
    if (setNavigationData) {
      setNavigationData({ currentPath: currentPath });
    }
  }, [currentPath, setNavigationData]);
  return (
    <React.Fragment>
      <h2 className={"content-block"}>{appInfo.title}</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <div className={"logos-container"}>
            <img src={process.env.PUBLIC_URL + "/el-othman.png"} alt="logo" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
