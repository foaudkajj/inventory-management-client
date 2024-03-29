import Button from "devextreme-react/button";
import Drawer from "devextreme-react/drawer";
import ScrollView from "devextreme-react/scroll-view";
import Toolbar, { Item } from "devextreme-react/toolbar";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Template } from "devextreme-react/core/template";

import { Header, SideNavigationMenu, Footer } from "../../components";
import { useScreenSize } from "../../utils/media-query";
import { useMenuPatch } from "../../utils/patches";

import "./side-nav-inner-toolbar.scss";
import { ClickEvent } from "devextreme/ui/button";
import { useTranslation } from "react-i18next";
import { useSideNav } from "../../contexts/side-nav";
import { useNavigation } from "../../contexts/navigation";

interface IProps {
  title: string;
  children: any;
}

export default function ({ title, children }: IProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const navigate = useNavigate();
  const { isXSmall, isLarge } = useScreenSize();
  const [patchCssClass, onMenuReady] = useMenuPatch();
  const [menuStatus, setMenuStatus] = useState(
    isLarge ? MenuStatus.Opened : MenuStatus.Closed,
  );
  const { opend } = useSideNav();
  const { navigationData } = useNavigation();
  const { trigger } = useSideNav();

  const toggleMenu = (e: ClickEvent) => {
    setMenuStatus((prevMenuStatus) =>
      prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.Opened
        : MenuStatus.Closed,
    );
    e.event?.stopPropagation();
  };

  const temporaryOpenMenu = useCallback(() => {
    setMenuStatus((prevMenuStatus) =>
      prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.TemporaryOpened
        : prevMenuStatus,
    );
  }, []);

  const onOutsideClick = useCallback(() => {
    setMenuStatus((prevMenuStatus) =>
      prevMenuStatus !== MenuStatus.Closed && !isLarge
        ? MenuStatus.Closed
        : prevMenuStatus,
    );
    return false;
  }, [isLarge]);
  const { t } = useTranslation();
  const onNavigationChanged = useCallback(
    ({ itemData: { path }, event, node }) => {
      if (menuStatus === MenuStatus.Closed || !path || node.selected) {
        event.preventDefault();
        return;
      }
      navigate(path);
      scrollViewRef.current?.instance.scrollTo(0);

      if (!isLarge || menuStatus === MenuStatus.TemporaryOpened) {
        setMenuStatus(MenuStatus.Closed);
        event.stopPropagation();
      }
    },
    [navigate, menuStatus, isLarge],
  );
  useEffect(() => {
    if (navigationData.currentPath === "/sellingPage") {
      trigger(false);
    } else {
      trigger(true);
    }
    if (opend) {
      setMenuStatus(MenuStatus.Opened);
    } else setMenuStatus(MenuStatus.Closed);
  }, [navigationData.currentPath, opend, trigger]);
  return (
    <div className={"side-nav-inner-toolbar"}>
      <Drawer
        className={["drawer", patchCssClass].join(" ")}
        position={"before"}
        closeOnOutsideClick={onOutsideClick}
        openedStateMode={isLarge ? "shrink" : "overlap"}
        revealMode={isXSmall ? "slide" : "expand"}
        minSize={0} //always hide the menu totally when it is closed
        maxSize={250}
        shading={isLarge ? false : true}
        opened={menuStatus === MenuStatus.Closed ? false : true}
        template={"menu"}
      >
        <div className={"container"}>
          <Header menuToggleEnabled={isXSmall} toggleMenu={toggleMenu} />
          <ScrollView ref={scrollViewRef} className={"layout-body with-footer"}>
            <div className={"content"}>
              {React.Children.map(children, (item) => {
                return item.type !== Footer && item;
              })}
            </div>
            <div className={"content-block"}>
              {React.Children.map(children, (item) => {
                return item.type === Footer && item;
              })}
            </div>
          </ScrollView>
        </div>
        <Template name={"menu"}>
          <SideNavigationMenu
            compactMode={menuStatus === MenuStatus.Closed}
            selectedItemChanged={onNavigationChanged}
            openMenu={temporaryOpenMenu}
            onMenuReady={onMenuReady}
          >
            <Toolbar id={"navigation-header"}>
              {!isXSmall && (
                <Item location={"before"} cssClass={"menu-button"}>
                  <Button icon="menu" stylingMode="text" onClick={toggleMenu} />
                </Item>
              )}
              <Item
                location={"before"}
                cssClass={"header-title"}
                text={t("home.title")}
              />
            </Toolbar>
          </SideNavigationMenu>
        </Template>
      </Drawer>
    </div>
  );
}

const MenuStatus = {
  Closed: 1,
  Opened: 2,
  TemporaryOpened: 3,
};
