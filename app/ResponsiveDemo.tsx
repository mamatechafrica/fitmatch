import React from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Simple responsive utilities
const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440,
};

const isTablet = width >= BREAKPOINTS.tablet;
const isDesktop = width >= BREAKPOINTS.desktop;
const isWeb = Platform.OS === 'web';

const getResponsiveFontSize = (baseFontSize: number) => {
  if (isDesktop) {
    return Math.min(baseFontSize * 1.1, baseFontSize + 4);
  }
  if (isTablet) {
    return baseFontSize * 1.05;
  }
  return baseFontSize;
};

const getGridColumns = () => {
  if (isDesktop) return 4;
  if (isTablet) return 3;
  return 2;
};

const getCardWidth = () => {
  const columns = getGridColumns();
  const padding = 16;
  const availableWidth = Math.min(width, BREAKPOINTS.largeDesktop * 0.8);
  return (availableWidth - (padding * (columns + 1))) / columns;
};

export default function ResponsiveDemo() {
  const gridColumns = getGridColumns();
  const cardWidth = getCardWidth();

  return (
    <View style={{ flex: 1, backgroundColor: '#0f0e0c' }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View style={{ maxWidth: Math.min(width, 1152), marginHorizontal: 'auto', alignSelf: 'center' }}>
          <Text 
            style={{ 
              color: 'white', 
              fontWeight: 'bold', 
              textAlign: 'center', 
              marginBottom: 32,
              fontSize: getResponsiveFontSize(32)
            }}
          >
            FitMatch - Responsive Design Demo
          </Text>

          {/* Screen Information */}
          <View style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: 16, borderRadius: 16, marginBottom: 24 }}>
            <Text 
              style={{ 
                color: 'white', 
                fontWeight: '600', 
                marginBottom: 8,
                fontSize: getResponsiveFontSize(20)
              }}
            >
              Screen Information
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>Width: {width}px</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>Height: {height}px</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>
              Platform: {Platform.OS}
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>
              Device Type: {isDesktop ? 'Desktop' : isTablet ? 'Tablet' : 'Mobile'}
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>Grid Columns: {gridColumns}</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Card Width: {Math.round(cardWidth)}px</Text>
          </View>

          {/* Responsive Grid Demo */}
          <View style={{ marginBottom: 24 }}>
            <Text 
              style={{ 
                color: 'white', 
                fontWeight: '600', 
                marginBottom: 16,
                fontSize: getResponsiveFontSize(20)
              }}
            >
              Responsive Grid ({gridColumns} columns)
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
              {Array.from({ length: 6 }, (_, i) => (
                <View
                  key={i}
                  style={{ 
                    backgroundColor: '#D32C1C', 
                    borderRadius: 8, 
                    padding: 16, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    width: cardWidth, 
                    height: cardWidth * 0.8 
                  }}
                >
                  <Text 
                    style={{ 
                      color: 'white', 
                      fontWeight: 'bold',
                      fontSize: getResponsiveFontSize(16)
                    }}
                  >
                    Card {i + 1}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Responsive Typography */}
          <View style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: 16, borderRadius: 16, marginBottom: 24 }}>
            <Text 
              style={{ 
                color: 'white', 
                fontWeight: '600', 
                marginBottom: 16,
                fontSize: getResponsiveFontSize(20)
              }}
            >
              Responsive Typography
            </Text>
            <Text 
              style={{ 
                color: 'white', 
                marginBottom: 8,
                fontSize: getResponsiveFontSize(32)
              }}
            >
              Large Title
            </Text>
            <Text 
              style={{ 
                color: 'white', 
                fontWeight: 'bold',
                marginBottom: 8,
                fontSize: getResponsiveFontSize(24)
              }}
            >
              Medium Title
            </Text>
            <Text 
              style={{ 
                color: 'white', 
                marginBottom: 8,
                fontSize: getResponsiveFontSize(16)
              }}
            >
              Body Text - This text scales responsively based on screen size. The app now provides better user experience across mobile, tablet, and desktop devices.
            </Text>
            <Text 
              style={{ 
                color: 'rgba(255,255,255,0.7)',
                fontSize: getResponsiveFontSize(14)
              }}
            >
              Small Text - Captions and helper text that remain readable on all devices
            </Text>
          </View>

          {/* Improvements Made */}
          <View style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: 16, borderRadius: 16, marginBottom: 24 }}>
            <Text 
              style={{ 
                color: 'white', 
                fontWeight: '600', 
                marginBottom: 16,
                fontSize: getResponsiveFontSize(20)
              }}
            >
              UI Improvements Made
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 8, fontSize: getResponsiveFontSize(14) }}>
              ✓ Responsive breakpoint system (Mobile: 480px, Tablet: 768px, Desktop: 1024px)
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 8, fontSize: getResponsiveFontSize(14) }}>
              ✓ Dynamic font scaling with maximum limits
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 8, fontSize: getResponsiveFontSize(14) }}>
              ✓ Flexible grid layouts that adapt to screen size
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 8, fontSize: getResponsiveFontSize(14) }}>
              ✓ Container max-width constraints for large screens
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 8, fontSize: getResponsiveFontSize(14) }}>
              ✓ Improved component spacing and padding
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: getResponsiveFontSize(14) }}>
              ✓ Web-optimized tab navigation and interactions
            </Text>
          </View>

          {/* Breakpoint Information */}
          <View style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: 16, borderRadius: 16 }}>
            <Text 
              style={{ 
                color: 'white', 
                fontWeight: '600', 
                marginBottom: 16,
                fontSize: getResponsiveFontSize(20)
              }}
            >
              Responsive Breakpoints
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>Mobile: {BREAKPOINTS.mobile}px and below</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>Tablet: {BREAKPOINTS.tablet}px - {BREAKPOINTS.desktop - 1}px</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>Desktop: {BREAKPOINTS.desktop}px - {BREAKPOINTS.largeDesktop - 1}px</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Large Desktop: {BREAKPOINTS.largeDesktop}px and above</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}