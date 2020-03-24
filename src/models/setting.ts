import { Reducer } from 'redux';
import defaultSettings, { DefaultSettings } from '../../config/defaultSettings';

export interface SettingModelType {
  namespace: 'settings';
  state: DefaultSettings;
  reducers: {
    changeSetting: Reducer<DefaultSettings>;
  };
}

const updateColorWeak: (colorWeak: boolean) => void = colorWeak => {
  const root = document.getElementById('root');
  if (root) {
    root.className = colorWeak ? 'colorWeak' : '';
  }
};

// @ts-ignore
const themeData = JSON.parse(localStorage.getItem('smart-theme'));

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: themeData || defaultSettings,
  reducers: {
    changeSetting(state = defaultSettings, { payload }) {
      const { colorWeak, contentWidth } = payload;

      if (state.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }
      updateColorWeak(!!colorWeak);
      localStorage.setItem('smart-theme', JSON.stringify({ ...state, ...payload }));
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default SettingModel;
