import React, { useEffect, useRef, useCallback, useMemo } from "react";
import TreeView from "devextreme-react/tree-view";
import * as events from "devextreme/events";

import { navigation } from "../../app-navigation";
import { useNavigation } from "../../contexts/navigation";
import { useScreenSize } from "../../utils/media-query";

import "./side-navigation-menu.scss";
import { useTranslation } from "react-i18next";

export default function (props: any) {
  const { children, selectedItemChanged, openMenu, compactMode, onMenuReady } =
    props;

  const { t } = useTranslation();
  const { isLarge } = useScreenSize();
  const items = useMemo(
    () =>
      navigation.map((item) => {
        item.text = t(item.text);
        item.items = item?.items?.map((it) => {
          it.text = t(it.text);
          return it;
        }) ?? [];
        return { ...item, expanded: isLarge };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const {
    navigationData: { currentPath },
  } = useNavigation();

  const treeViewRef = useRef<TreeView<any>>(null);
  const wrapperRef = useRef();
  const getWrapperRef = useCallback(
    (element) => {
      const prevElement = wrapperRef.current;
      if (prevElement) {
        events.off(prevElement, "dxclick");
      }

      wrapperRef.current = element;
      events.on(element, "dxclick", (e: any) => {
        openMenu(e);
      });
    },
    [openMenu]
  );

  useEffect(() => {
    const treeView = treeViewRef.current && treeViewRef.current.instance;
    if (!treeView) {
      return;
    }
    if (currentPath !== undefined) {
      treeView.selectItem(currentPath);
      treeView.expandItem(currentPath);
    }

    if (compactMode) {
      treeView.collapseAll();
    }
  }, [currentPath, compactMode]);

  return (
    <div
      className={"dx-swatch-additional side-navigation-menu"}
      ref={getWrapperRef}
    >
      {children}
      <div className={"menu-container"}>
        <TreeView
          ref={treeViewRef}
          items={items}
          keyExpr={"path"}
          selectionMode={"single"}
          focusStateEnabled={false}
          expandEvent={"click"}
          onItemClick={selectedItemChanged}
          onContentReady={onMenuReady}
          width={"100%"}
        />
      </div>
    </div>
  );
}
