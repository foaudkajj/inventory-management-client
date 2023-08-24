import React from "react";

import "./footer.scss";
import { useNavigation } from "../../contexts/navigation";
import { useFooter } from "../../contexts/footer";

export default ({ ...rest }) => {
  const { navigationData } = useNavigation();
  const { displayed, trigger } = useFooter();
  if (navigationData.currentPath === "/sellingPage") {
    trigger(false);
  } else {
    trigger(true);
  }
  if (displayed) { return <footer className={"footer"} {...rest} />; }

};
