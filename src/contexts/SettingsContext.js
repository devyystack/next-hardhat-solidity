import PropTypes from 'prop-types';
import { createContext } from 'react';
// hooks
import { useLocalStorage } from '../hooks';
// utils
import getColorPresets, { colorPresets } from '../utils/getColorPresets';
// config
import { defaultSettings } from '../config';

// ----------------------------------------------------------------------

const initialState = {
  ...defaultSettings,
  onToggleMode: () => {},
  onToggleDirection: () => {},
  onChangeColorPresets: () => {},
  onResetSetting: () => {},
  setColor: colorPresets[0],
  colorOption: [],
};

const SettingsContext = createContext(initialState);

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('settings', {
    ...defaultSettings,
  });

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
    });
  };

  const onToggleDirection = () => {
    setSettings({
      ...settings,
      themeDirection: settings.themeDirection === 'ltr' ? 'rtl' : 'ltr',
    });
  };

  const onChangeColorPresets = (event) => {
    setSettings({
      ...settings,
      themeColorPresets: event.target.value,
    });
  };

  const onResetSetting = () => {
    setSettings({
      ...defaultSettings,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        // Mode
        onToggleMode,

        // Direction
        onToggleDirection,

        // Color Presets
        onChangeColorPresets,
        setColor: getColorPresets(settings.themeColorPresets),
        colorOption: colorPresets.map((color) => ({
          name: color.name,
          primary: color.primary.main,
          secondary: color.secondary.main,
        })),

        // Reset Setting
        onResetSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
