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
      <h2 className={"content-block"}>الصفحة الرئيسية</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <div className={"logos-container"}>
            <img src={process.env.PUBLIC_URL + "/el-othman.png"} alt="logo" />
          </div>

          <p>
            أهلاً وسهلاً بكم في{" "}
            <b>
              <a
                href={"https://www.facebook.com/elosmanakademi"}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                {appInfo.title}
              </a>
            </b>
            !
          </p>
          <p>أكادمية العثمان توفّر التالي:</p>
          <ul>
            <li>دورات لغات</li>
            <li>دورات تدريبية</li>
            <li>دورات تقوية</li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};
