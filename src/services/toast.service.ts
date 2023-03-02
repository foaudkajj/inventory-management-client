import i18n from "i18next";
import notify from "devextreme/ui/notify";

const showToast = async (
  status: "error" | "info" | "success" | "warning",
  text: string = undefined,
  timer: number = 3000
) => {
  if (!text) {
    if (status === "error") {
      text = i18n.t("messages.unsucessful");
    } else {
      text = i18n.t("messages.sucessful");
    }
  }
  notify(text, status, timer);
};

export const ToastService = {
  showToast: showToast,
};
