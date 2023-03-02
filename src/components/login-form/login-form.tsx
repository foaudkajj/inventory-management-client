import React, { useState, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
} from "devextreme-react/form";
import LoadIndicator from "devextreme-react/load-indicator";
import { useAuth } from "../../contexts/auth";
import "./login-form.scss";
import { useTranslation } from "react-i18next";
import { ToastService } from "../../services";

export default function () {
  const { t } = useTranslation();
  // const navigation = useNavigate();
  const { logIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const formData = useRef({ username: "", password: "" });

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { username, password } = formData.current;
      setLoading(true);
      if (logIn) {
        try {
          await logIn(username, password);
        } catch (e) {
          ToastService.showToast("error", t("messages.not-valid-credentials"));
          setLoading(false);
        }
      }
    },
    [logIn]
  );

  // const onCreateAccountClick = useCallback(() => {
  //   navigation("/create-account");
  // }, [navigation]);

  const usernameEditorOptions = {
    stylingMode: "filled",
    placeholder: t("login.username"),
  };
  const passwordEditorOptions = {
    stylingMode: "filled",
    placeholder: t("login.password"),
    mode: "password",
  };
  // const rememberMeEditorOptions = {
  //   text: t("login.remember-me"),
  //   elementAttr: { class: "form-text" },
  // };

  return (
    <form className={"login-form"} onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={loading}>
        <Item
          dataField={"username"}
          editorType={"dxTextBox"}
          editorOptions={usernameEditorOptions}
        >
          <RequiredRule />
          <Label visible={false} />
        </Item>
        <Item
          dataField={"password"}
          editorType={"dxTextBox"}
          editorOptions={passwordEditorOptions}
        >
          <Label visible={false} />
        </Item>
        {/* <Item
          dataField={"rememberMe"}
          editorType={"dxCheckBox"}
          editorOptions={rememberMeEditorOptions}
        >
          <Label visible={false} />
        </Item> */}
        <ButtonItem>
          <ButtonOptions
            width={"100%"}
            type={"default"}
            useSubmitBehavior={true}
          >
            <span className="dx-button-text">
              {loading ? (
                <LoadIndicator width={"24px"} height={"24px"} visible={true} />
              ) : (
                t("login.sign-in")
              )}
            </span>
          </ButtonOptions>
        </ButtonItem>
        {/* <Item>
          <div className={"link"}>
            <Link to={"/reset-password"}>{t("login.forgot-password")}</Link>
          </div>
        </Item> */}
        {/* <ButtonItem>
          <ButtonOptions
            text={"Create an account"}
            width={"100%"}
            onClick={onCreateAccountClick}
          />
        </ButtonItem> */}
      </Form>
    </form>
  );
}
