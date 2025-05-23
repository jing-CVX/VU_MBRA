import {moderateScale} from './scalingUtils';
/**
 * Define font size list for project
 * medium = 16 as standar siz in device ~5"
 */
const fontSizes = {
  huge: moderateScale(40,0.3),
  xxbig: moderateScale(34, 0.3),
  xbig: moderateScale(26, 0.3),
  big: moderateScale(22, 0.3),
  xxmedium: moderateScale(20, 0.3),
  xmedium: moderateScale(19, 0.3), // 19
  medium: moderateScale(16, 0.3), // 16
  normal: moderateScale(15, 0.3), // 15
  small: moderateScale(14, 0.3),
  verySmall: moderateScale(12, 0.3),
  tiny: moderateScale(11, 0.3),
  smallest: moderateScale(10, 0.3),
  miniScale: moderateScale(8, 0.3),
};

export default fontSizes;
