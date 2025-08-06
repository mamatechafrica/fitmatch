import { Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const SCREEN_DIMENSIONS = {
  width: screenWidth,
  height: screenHeight,
};

// Responsive breakpoints
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440,
};

// Check if current screen is above certain breakpoint
export const isTablet = screenWidth >= BREAKPOINTS.tablet;
export const isDesktop = screenWidth >= BREAKPOINTS.desktop;
export const isLargeDesktop = screenWidth >= BREAKPOINTS.largeDesktop;
export const isWeb = Platform.OS === 'web';

// Responsive width function
export const getResponsiveWidth = (mobilePercent: number, tabletPercent?: number, desktopPercent?: number) => {
  if (isDesktop && desktopPercent) {
    return Math.min(screenWidth * (desktopPercent / 100), BREAKPOINTS.largeDesktop * 0.8);
  }
  if (isTablet && tabletPercent) {
    return screenWidth * (tabletPercent / 100);
  }
  return screenWidth * (mobilePercent / 100);
};

// Responsive font sizes
export const getResponsiveFontSize = (baseFontSize: number) => {
  if (isDesktop) {
    return Math.min(baseFontSize * 1.1, baseFontSize + 4);
  }
  if (isTablet) {
    return baseFontSize * 1.05;
  }
  return baseFontSize;
};

// Maximum container width for large screens
export const getMaxContainerWidth = () => {
  return Math.min(screenWidth, BREAKPOINTS.largeDesktop * 0.8);
};

// Responsive padding and margins
export const getResponsivePadding = (basePadding: number) => {
  if (isDesktop) {
    return basePadding * 1.5;
  }
  if (isTablet) {
    return basePadding * 1.2;
  }
  return basePadding;
};

// Grid columns for responsive layout
export const getGridColumns = () => {
  if (isDesktop) return 4;
  if (isTablet) return 3;
  return 2;
};

// Card width for responsive grid
export const getCardWidth = () => {
  const columns = getGridColumns();
  const padding = getResponsivePadding(16);
  const availableWidth = Math.min(screenWidth, getMaxContainerWidth());
  return (availableWidth - (padding * (columns + 1))) / columns;
};