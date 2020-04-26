import { Platform, PixelRatio } from 'react-native';

export function getPixel(pixel) {
    return Platform.select({
        ios: pixel,
        android: PixelRatio.getPixelSizeForLayoutSize(pixel),
    });
}
