import { atom } from "recoil";
import * as Device from "expo-device";
import * as Network from "expo-network";
import * as Application from "expo-application";

export const deviceInfoState = atom({
  key: "deviceInfo",
  default: {
    osName: Device.osName,
    brand: Device.brand,
    productName: Device.productName,
    mac: Application.androidId,
  },
  effects: [
    async ({ node, getLoadable, setSelf }) => {
      const state = getLoadable(node).contents;
      console.log(Application.androidId)
      const mac =
        state.osName === "Android"
          ? Application.androidId
          : state.osName === "iOS"
          ? await Application.getIosIdForVendorAsync()
          : null;
      setSelf({
        ...state,
        ip: await Network.getIpAddressAsync(),
        mac,
      });
    },
  ],
});
