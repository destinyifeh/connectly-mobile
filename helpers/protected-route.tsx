import React, {FC} from 'react';

interface AppProtectedRouteProps {
  children: React.ReactNode;
}

const AppProtectedRoute: FC<AppProtectedRouteProps> = ({children}) => {
  return <>{children}</>;
};

export default AppProtectedRoute;
