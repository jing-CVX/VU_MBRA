import {StyleSheet} from 'react-native';
import mainUI from './structure/mainUI';
import appUI from './structure/appUI';
import {merge} from 'lodash';

const partnerUI = {
  CHIPS: appUI,
};

// TODO: Remove or enhance this features

let activeCode = 'CHIPS';
// for production
if (process.env.NODE_ENV === 'production') {
  activeCode = process.env.ACTIVE_CODE;
}
const appUI = merge(mainUI, partnerUI[activeCode] || {});
// Immutable dữ liệu
const common = Object.assign(appUI.common, {});
const basic = Object.assign(appUI.basic, {});
const component = Object.assign(appUI.component, {});
const layout = Object.assign(appUI.layout, {});
const override = Object.assign(appUI.override, {});
// Create style để sử dụng
const UIcommon = StyleSheet.create(common);
const UIbasic = StyleSheet.create(basic);
const UIcomponent = StyleSheet.create(component);
const UIlayout = StyleSheet.create(layout);
const UIoverride = StyleSheet.create(override);

export {UIcommon, UIbasic, UIcomponent, UIlayout, UIoverride};
