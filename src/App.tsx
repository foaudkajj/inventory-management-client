import React from "react";
import { HashRouter as Router } from "react-router-dom";
import LoadPanel from "devextreme-react/load-panel";

import { NavigationProvider } from "./contexts/navigation";
import { AuthProvider, useAuth } from "./contexts/auth";
import { useScreenSizeClass } from "./utils/media-query";
import Content from "./Content";
import NotAuthenticatedContent from "./NotAuthenticatedContent";

import "devextreme/dist/css/dx.common.css";
import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.css";
import "./dx-styles.scss";
import config from "devextreme/core/config";
import "./i18n/i18n";
import { loadMessages, locale } from "devextreme/localization";
import arMessages from "devextreme/localization/messages/ar.json";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadPanel visible={true} />;
  }

  if (user) {
    return <Content />;
  }

  return <NotAuthenticatedContent />;
}

export default function () {
  const screenSizeClass = useScreenSizeClass();

  loadMessages(arMessages);
  locale("en-US");

  return (
    <Router>
      <AuthProvider>
        <NavigationProvider>
          <div className={`app ${screenSizeClass}`}>
            <App />
          </div>
        </NavigationProvider>
      </AuthProvider>
    </Router>
  );
}
