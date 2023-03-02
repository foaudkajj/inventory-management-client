import CustomStore, { Options } from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import { ToastService } from "./toast.service";

const getStore = (storeOptions: Options): DataSource => {
  return new DataSource({
    store: new CustomStore({
      key: storeOptions.key,
      loadMode: "raw",
      load: (options) => {
        return storeOptions.load(options);
      },
      insert: (values) => {
        return storeOptions.insert(values);
      },
      update: (key: string, values) => {
        return storeOptions.update(key, values);
      },
      remove: (key: string) => {
        return storeOptions.remove(key);
      },
      onInserted: (values: any, key: string) => {
        if (storeOptions.onInserted) {
          storeOptions.onInserted(values, key);
        }
        if (!values.IsError) ToastService.showToast("success");
      },
      onLoaded: (result: Array<any>, loadOptions) => {
        if (storeOptions.onLoaded) storeOptions?.onLoaded(result, loadOptions);
      },
      onRemoved: (key: string) => {
        if (storeOptions.onRemoved) {
          storeOptions.onRemoved(key);
        }

        ToastService.showToast("success");
      },
      onUpdated: (key: string, values) => {
        if (storeOptions.onUpdated) storeOptions.onUpdated(key, values);
        ToastService.showToast("success");
      },
      errorHandler: (e: Error) => ToastService.showToast("error", e.message),
    }),
  });
};

export const DxStoreService = {
  getStore,
};
