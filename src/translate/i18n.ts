import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './language/en.json';
import vi from './language/vi.json';
import zh from './language/zh.json';
import jp from './language/jp.json';
import ko from './language/ko.json';

const languageDetector: any = {
  type: 'languageDetector',
  async: true,
  detect: (cb: any) => cb('VI'), //-- Mặc định là tiếng Việt
  init: () => {},
  cacheUserLanguage: () => {},
};

const getFile = (lang: string) => {
  switch (lang) {
    case 'vi':
      return vi;
    case 'en':
      return en;
    case 'zh':
      return zh;
    case 'jp':
      return jp;
    case 'ko':
      return ko;
  }
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    compatibilityJSON: 'v3',
    fallbackLng: 'EN',
    debug: false,
    resources: {
      EN: {
        translation: {...en, ...getFile('en')},
      },
      VI: {
        translation: {...vi, ...getFile('vi')},
      },
      JP: {
        translation: {...jp, ...getFile('jp')},
      },
      ZH: {
        translation: {...zh, ...getFile('zh')},
      },
      KO: {
        translation: {...ko, ...getFile('ko')},
      },
    },
  });

export default i18n;
