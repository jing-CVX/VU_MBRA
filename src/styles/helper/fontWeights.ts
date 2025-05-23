import { Platform, TextStyle } from 'react-native';

/**
 * Define font weight list for project
 */
type TFontWeightValue = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined
interface IFontWeights {
  thin: TFontWeightValue
  extraLight: TFontWeightValue
  light: TFontWeightValue
  normal: TFontWeightValue
  medium: TFontWeightValue
  semiBold: TFontWeightValue
  bold: TFontWeightValue
  extraBold: TFontWeightValue
  heavy: TFontWeightValue
}

const fontWeights: IFontWeights = {
  // thin: Platform.select({ios: '100', android: '100'}),
  // extraLight: Platform.select({ios: '200', android: '100'}),
  // light: Platform.select({ios: '300', android: '200'}),
  // normal: Platform.select({ios: '400', android: '300'}),
  // medium: Platform.select({ios: '500', android: '400'}),
  // semiBold: Platform.select({ios: '600', android: '500'}),
  // bold: Platform.select({ios: '700', android: '600'}),
  // extraBold: Platform.select({ios: '800', android: '700'}),
  // heavy: Platform.select({ios: '900', android: '800'}),
  thin: '100',
  extraLight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  heavy: '900',
};

export default fontWeights;
