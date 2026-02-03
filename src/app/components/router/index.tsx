import React, { useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Link = ({ to, children, className, replace, state, ...props }: any) => {
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to, { replace, state });
  };

  return (
    <a href={typeof to === 'string' ? to : '#'} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

export function useSearchParams(defaultInit?: URLSearchParams | string | Record<string, string> | string[][]) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchParams = useMemo(() => {
    const params = new URLSearchParams(location.search);
    if (defaultInit && !location.search) {
        // Very basic handling of defaultInit if needed, but usually not required for simple replacement
    }
    return params;
  }, [location.search]);

  const setSearchParams = useCallback((nextInit: any, navigateOptions?: any) => {
    const newSearchParams = new URLSearchParams(
      typeof nextInit === 'function' ? nextInit(searchParams) : nextInit
    );
    navigate({
        search: newSearchParams.toString()
    }, navigateOptions);
  }, [navigate, searchParams]);

  return [searchParams, setSearchParams] as const;
}
