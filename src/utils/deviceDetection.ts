export function detectDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/android/.test(userAgent)) return 'android';
  if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
  if (/win/.test(userAgent)) return 'windows';
  if (/mac/.test(userAgent)) return 'mac';
  return 'unknown';
}

export const walletUrls = {
  android: 'https://play.google.com/store/apps/details?id=com.electraprotocol.omnixep.wallet',
  ios: 'https://apps.apple.com/us/app/omnixep-wallet/id6739203200',
  windows: 'https://github.com/ElectraProtocol/Electra-Protocol-data/releases/download/omnixep-launcher-1.0.0/OmniXEP-Pro-Windows-installer.exe',
  mac: 'https://github.com/ElectraProtocol/Electra-Protocol-data/releases/download/omnixep-launcher-1.0.0/OmniXEP-Pro-macOS-installer.dmg',
  unknown: 'https://play.google.com/store/apps/details?id=com.electraprotocol.omnixep.wallet'
};
