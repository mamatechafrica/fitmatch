import React, { Suspense, ComponentType } from 'react';
import { ActivityIndicator, View } from 'react-native';

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const LoadingFallback = () => (
  <View className="flex-1 justify-center items-center">
    <ActivityIndicator size="large" color="#3B82F6" />
  </View>
);

const LazyWrapper: React.FC<LazyComponentProps> = ({ 
  children, 
  fallback = <LoadingFallback /> 
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

export const withLazyLoading = <P extends object>(
  Component: ComponentType<P>,
  fallback?: React.ReactNode
) => {
  return React.forwardRef<any, P>((props, ref) => (
    <LazyWrapper fallback={fallback}>
      <Component {...props} ref={ref} />
    </LazyWrapper>
  ));
};

export default LazyWrapper;