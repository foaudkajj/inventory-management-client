import React, { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  CustomRule,
  EmailRule,
} from "devextreme-react/form";
import LoadIndicator from "devextreme-react/load-indicator";

import "./create-account-form.scss";

export default function () {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const formData = useRef({ email: "", password: "" });

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { email, password } = formData.current;
      setLoading(true);

      // Send create account request
      console.log(email, password);

      navigation("/login");
    },
    [navigation],
  );

  const confirmPassword = useCallback(
    ({ value }) => value === formData.current.password,
    [],
  );

  return (
    <form className={"create-account-form"} onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={loading}>
        <Item
          dataField={"email"}
          editorType={"dxTextBox"}
          editorOptions={emailEditorOptions}
        >
          <RequiredRule message="Email is required" />
          <EmailRule message="Email is invalid" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={"password"}
          editorType={"dxTextBox"}
          editorOptions={passwordEditorOptions}
        >
          <RequiredRule message="Password is required" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={"confirmedPassword"}
          editorType={"dxTextBox"}
          editorOptions={confirmedPasswordEditorOptions}
        >
          <RequiredRule message="Password is required" />
          <CustomRule
            message={"Passwords do not match"}
            validationCallback={confirmPassword}
          />
          <Label visible={false} />
        </Item>
        <Item>
          <div className="policy-info">
            By creating an account, you agree to the{" "}
            <Link to="">Terms of Service</Link> and{" "}
            <Link to="">Privacy Policy</Link>
          </div>
        </Item>
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
                "Create a new account"
              )}
            </span>
          </ButtonOptions>
        </ButtonItem>
        <Item>
          <div className={"login-link"}>
            Have an account? <Link to={"/login"}>Sign In</Link>
          </div>
        </Item>
      </Form>
    </form>
  );
}

const emailEditorOptions = {
  stylingMode: "filled",
  placeholder: "Email",
  mode: "email",
};
const passwordEditorOptions = {
  stylingMode: "filled",
  placeholder: "Password",
  mode: "password",
};
const confirmedPasswordEditorOptions = {
  stylingMode: "filled",
  placeholder: "Confirm Password",
  mode: "password",
};
