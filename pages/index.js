import {
  DEFAULT_COLOR,
  DEFAULT_COLOR_TRANSPARENT,
} from "../utils/config/constants";
import { DEVICE_WIDTH } from "../utils/config/device";

const logger = DeviceRuntimeCore.HmLogger.getLogger("random_cat_fact");
const { messageBuilder } = getApp()._options.globalData

let factWidget = null;

Page({
  state: {},
  build() {
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: (DEVICE_WIDTH - px(400)) / 2,
      y: px(260),
      w: px(400),
      h: px(100),
      text_size: px(36),
      radius: px(12),
      normal_color: DEFAULT_COLOR,
      press_color: DEFAULT_COLOR_TRANSPARENT,
      text: "Show fact!",
      click_func: (button_widget) => {
        logger.log("Clicked button");
        this.fetchData();
      },
    });
  },
  fetchData() {
    messageBuilder.request({
      method: "GET_DATA",
    })
    .then(data => {
      logger.log('Received data')
      const { result = {} } = data
      const { text } = result
      // logger.log(text)

      if (!factWidget) {
        factWidget = hmUI.createWidget(hmUI.widget.TEXT, {
          x: px(96),
          y: px(100),
          w: px(288),
          h: px(46),
          color: 0xffffff,
          text_size: px(36),
          align_h: hmUI.align.CENTER_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text
        })
      } else {
        factWidget.setProperty(hmUI.prop.MORE, {
          text
        })
      }      
    })
  }
});
