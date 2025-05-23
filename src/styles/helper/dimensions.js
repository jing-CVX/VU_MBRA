import {Platform, Dimensions} from 'react-native';
import {moderateScale, verticalScale} from './scalingUtils';

const {height, width} = Dimensions.get('window');

/**
 * Defined with, margin, padding... of all objects in any screen
 */

//-- Defined width-margin, width-padding of 2 objects or view with any screen
//-- Ex: padding: dimensions.halfIndent, margin: dimensions.halfIndent
export const moderate = (size, factor) => moderateScale(size, factor);
export const vertical = (size, factor) => verticalScale(size, factor);
export const indent = moderateScale(16, 0.3); //-- 16 is margin size with standar device ~5"
export const halfIndent = moderateScale(indent / 2, 0.3);
export const doubleIndent = moderateScale(indent * 2, 0.3);
//-- Defined vertical-margin, vertical-padding of 2 objects or view with any screen
//-- Ex: marginTop: verticalIndent; marginBottom: halfVerticalIndent/2; marginVertical: verticalIndent; paddingTop: verticalIndent; paddingVertical: verticalIndent
export const verticalIndent = verticalScale(14, 0.3);
export const halfVerticalIndent = verticalScale(7, 0.4);
//-- defined borderRadius
export const borderRadius = 4;
//-- defined iconSize standar(base on 28)
export const iconSize = moderateScale(25, 0.4);
export const bigIconSize = moderateScale(40, 0.3);
export const iconMargin = Platform.OS === 'android' ? 16 : 10;
//-- defined width of any screen
export const containerWidth = Dimensions.get('window').width - indent * 2;
export const WIDTH = width;
export const HEIGHT = height;
export const IOS = Platform.OS === 'ios' ? true : false;
