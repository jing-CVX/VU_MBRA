import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];
//-- base on device ~5"
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 1069;
//-- tính tỷ lệ theo chiều rộng
const scale = size => Math.round((shortDimension / guidelineBaseWidth) * size * 1000)/1000;
//-- tính tỷ lệ theo chiều cao
const scaleHeight = size => Math.round((longDimension / guidelineBaseHeight) * size);
// const verticalScale = size => Math.round((height / guidelineBaseHeight) * size);
const verticalScale = (size, factor = 0.3) =>
    Math.round(size + (scaleHeight(size) - size) * factor);
//-- size (tỷ lệ) theo chiều rộng với tỷ lệ zoom nhất định (factor)
const moderateScale = (size, factor = 0.3) =>
  Math.round(size + (scale(size) - size) * factor);
export {scale, verticalScale, moderateScale};